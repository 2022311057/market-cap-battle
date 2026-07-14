// ゲームロジック（UIに依存しない純粋なロジック）

// ─── 業種特殊能力 ──────────────────────────────────────────────────────
const SECTOR_ABILITIES = {
  '電気機器':     { id: 'tech_mna',  name: 'テクノロジー融合', desc: 'M&A同業種シナジー +15%（通常+10%）' },
  '銀行業':       { id: 'draw_up',   name: '安定配当',         desc: '引き分けで +15点追加（合計+65点）' },
  '輸送用機器':   { id: 'streak_up', name: 'モビリティ力',     desc: '連勝ボーナス発生時にさらに +10点' },
  '化学':         { id: 'rev_bonus', name: '素材優位',         desc: '売上高指標で勝利 → +20点ボーナス' },
  '小売業':       { id: 'emp_bonus', name: '人海戦術',         desc: '従業員数指標で勝利 → +20点ボーナス' },
  'サービス業':   { id: 'dis_red',   name: '多角経営',         desc: 'M&A異業種ディシナジーが -2%（通常-5%）' },
  '保険業':       { id: 'rescue',    name: 'リスク分散',       desc: '接戦敗北（差5%未満）でも +20点獲得' },
  '情報・通信業': { id: 'prof_up',   name: 'DXアドバンテージ', desc: '営業利益指標で勝利 → +15点ボーナス' },
};

// ─── シード乱数（デイリーチャレンジ用） ───────────────────────────────
class SeededRandom {
  constructor(seed) { this.seed = seed >>> 0; }
  next() {
    this.seed = (Math.imul(1664525, this.seed) + 1013904223) >>> 0;
    return this.seed / 0x100000000;
  }
}
function dateToSeed(dateStr) {
  let h = 5381;
  for (let i = 0; i < dateStr.length; i++) h = (Math.imul(h, 33) ^ dateStr.charCodeAt(i)) >>> 0;
  return h || 1;
}
function seededShuffle(arr, rng) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rng.next() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

class GameEngine {
  constructor(stocks, difficulty = 'normal', options = {}) {
    this.allStocks = stocks;
    this.difficulty = difficulty;
    this.dailyMode = !!options.daily;
    this.dailySeed = options.dailySeed || null;
    this.playerHand = [];
    this.deck = [];
    this._draftPool = [];
    this._draftDeck = [];
    this.opponentCard = null;
    this.selectedCardIndices = [];
    this.round = 0;
    this.maxRounds = 5;
    this.score = 0;
    this.history = [];
    this.currentEvent = null;
    this.currentMetric = 'marketCap';
    this.winStreak = 0;
  }

  _shuffledStocks() {
    if (this.dailyMode && this.dailySeed) {
      return seededShuffle([...this.allStocks], new SeededRandom(this.dailySeed));
    }
    return shuffle([...this.allStocks]);
  }

  // ─── ドラフトフェーズ ──────────────────────────────────────────────
  startDraft() {
    const shuffled = this._shuffledStocks();
    this._draftPool = shuffled.slice(0, 12);
    this._draftDeck = shuffled.slice(12);
    return this._draftPool;
  }

  confirmDraft(indices) {
    this.playerHand = indices.map(i => this._draftPool[i]);
    const used = new Set(this.playerHand.map(c => c.ticker));
    this.deck = this._draftDeck.filter(c => !used.has(c.ticker));
    this._resetGameState();
  }

  // ─── 通常スタート ──────────────────────────────────────────────────
  start() {
    const shuffled = this._shuffledStocks();
    this.playerHand = shuffled.slice(0, 7);
    this.deck = shuffled.slice(7);
    this._resetGameState();
  }

  _resetGameState() {
    this.round = 0;
    this.score = 0;
    this.history = [];
    this.opponentCard = null;
    this.selectedCardIndices = [];
    this.currentEvent = null;
    this.currentMetric = 'marketCap';
    this.winStreak = 0;
  }

  startRound() {
    this.round++;
    this.selectedCardIndices = [];
    this.opponentCard = this.pickOpponent();
    this.currentEvent = this._pickEvent();
    return { opponentCard: this.opponentCard, event: this.currentEvent };
  }

  _pickEvent() {
    if (this.dailyMode && this.dailySeed) {
      const rng = new SeededRandom(this.dailySeed + this.round * 997);
      return EVENTS[Math.floor(rng.next() * EVENTS.length)];
    }
    return EVENTS[Math.floor(Math.random() * EVENTS.length)];
  }

  pickOpponent() {
    if (this.difficulty === 'normal' || this.deck.length === 0) return this.deck.shift();
    const sorted = [...this.deck].sort((a, b) => a.marketCap - b.marketCap);
    const n = sorted.length;
    const r = Math.random();
    const skewed = this.difficulty === 'easy' ? Math.pow(r, 2.2) : 1 - Math.pow(1 - r, 2.2);
    const idx = Math.min(n - 1, Math.floor(skewed * n));
    const card = sorted[idx];
    this.deck.splice(this.deck.indexOf(card), 1);
    return card;
  }

  setMetric(metric) { this.currentMetric = metric; }

  canMnA() { return this.playerHand.length > (this.maxRounds - this.round + 1); }

  toggleCardSelection(index) {
    if (index < 0 || index >= this.playerHand.length) return;
    const pos = this.selectedCardIndices.indexOf(index);
    if (pos >= 0) {
      this.selectedCardIndices.splice(pos, 1);
    } else if (this.selectedCardIndices.length === 0) {
      this.selectedCardIndices.push(index);
    } else if (this.selectedCardIndices.length === 1 && this.canMnA()) {
      this.selectedCardIndices.push(index);
    } else {
      this.selectedCardIndices = [index];
    }
  }

  getEffectiveValue(stock, metric, event) {
    const raw = stock[metric] || 0;
    if (metric === 'employees') return raw;
    if (!event || !event.effects || event.effects.length === 0) return raw;
    const eff = event.effects.find(e => e.sector === stock.sector);
    return eff ? Math.round(raw * eff.multiplier) : raw;
  }

  getMnaMultiplier(cards) {
    if (cards.length < 2) return 1;
    const sameSector = cards.every(c => c.sector === cards[0].sector);
    if (!sameSector) {
      const hasService = cards.some(c => c.sector === 'サービス業');
      return hasService ? 0.98 : 0.95;
    }
    const allElec = cards.every(c => c.sector === '電気機器');
    return allElec ? 1.15 : 1.10;
  }

  battle() {
    if (this.selectedCardIndices.length === 0) return null;

    const metric = this.currentMetric;
    const event = this.currentEvent;
    const playerCards = this.selectedCardIndices.map(i => this.playerHand[i]);
    const isMnA = playerCards.length > 1;

    const playerRawSum = playerCards.reduce(
      (sum, card) => sum + this.getEffectiveValue(card, metric, event), 0
    );
    const mnaMultiplier = this.getMnaMultiplier(playerCards);
    const mnaSameSector = isMnA ? playerCards.every(c => c.sector === playerCards[0].sector) : null;
    const playerEffValue = isMnA ? Math.round(playerRawSum * mnaMultiplier) : playerRawSum;
    const opponentEffValue = this.getEffectiveValue(this.opponentCard, metric, event);

    const isDraw = playerEffValue === opponentEffValue;
    const playerWins = playerEffValue > opponentEffValue;
    const margin = opponentEffValue > 0
      ? Math.abs(playerEffValue - opponentEffValue) / opponentEffValue
      : 1;

    const abilityIds = new Set(
      playerCards.map(c => SECTOR_ABILITIES[c.sector]?.id).filter(Boolean)
    );

    let basePoints = 0;
    let bonus = null;
    let abilityBonus = null;
    const STREAK_BONUS = { 2: 30, 3: 50, 4: 50, 5: 70 };

    if (playerWins) {
      // マージン連動スコア
      if (margin > 1.0)       basePoints = 120;
      else if (margin < 0.05) basePoints = 80;
      else                    basePoints = 100;

      this.winStreak++;
      const streakBase = STREAK_BONUS[this.winStreak];
      if (streakBase) {
        const extra = abilityIds.has('streak_up') ? streakBase + 10 : streakBase;
        bonus = { label: `${this.winStreak}連勝`, extra };
      }

      if      (metric === 'revenue'         && abilityIds.has('rev_bonus')) abilityBonus = { name: '素材優位',         extra: 20 };
      else if (metric === 'employees'       && abilityIds.has('emp_bonus')) abilityBonus = { name: '人海戦術',         extra: 20 };
      else if (metric === 'operatingProfit' && abilityIds.has('prof_up'))   abilityBonus = { name: 'DXアドバンテージ', extra: 15 };

    } else if (isDraw) {
      basePoints = 50;
      if (abilityIds.has('draw_up')) abilityBonus = { name: '安定配当', extra: 15 };
    } else {
      this.winStreak = 0;
      if (margin < 0.05 && abilityIds.has('rescue')) abilityBonus = { name: 'リスク分散', extra: 20 };
    }

    const abilityExtra = abilityBonus ? abilityBonus.extra : 0;
    const totalPoints = basePoints + (bonus ? bonus.extra : 0) + abilityExtra;
    this.score += totalPoints;

    const result = {
      round: this.round,
      playerCards,
      playerCard: playerCards[0],
      opponentCard: this.opponentCard,
      playerWins,
      isDraw,
      margin,
      basePoints,
      bonus,
      abilityBonus,
      isMnA,
      mnaMultiplier,
      mnaSameSector,
      metric,
      event,
      playerEffValue,
      opponentEffValue,
      totalPoints,
      abilityIds: [...abilityIds],
    };

    this.history.push(result);
    [...this.selectedCardIndices].sort((a, b) => b - a).forEach(i => this.playerHand.splice(i, 1));
    this.selectedCardIndices = [];

    return result;
  }

  isOver() { return this.round >= this.maxRounds; }

  getScoreRank() {
    const RANKS = [
      { threshold: 660, label: '株の神様',       stars: 5, next: null },
      { threshold: 450, label: '敏腕トレーダー',  stars: 4, next: 660 },
      { threshold: 280, label: '投資家見習い',    stars: 3, next: 450 },
      { threshold: 100, label: '株式初心者',      stars: 2, next: 280 },
      { threshold: 0,   label: 'もっと勉強が必要', stars: 1, next: 100 },
    ];
    const rank = RANKS.find(r => this.score >= r.threshold);
    return { ...rank, gap: rank.next != null ? rank.next - this.score : 0 };
  }
}

function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}
