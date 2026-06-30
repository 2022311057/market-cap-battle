// ゲームロジック（UIに依存しない純粋なロジック）
class GameEngine {
  constructor(stocks) {
    this.allStocks = stocks;
    this.playerHand = [];
    this.deck = [];
    this.opponentCard = null;
    this.selectedCardIndices = [];
    this.round = 0;
    this.maxRounds = 5;
    this.score = 0;
    this.history = [];
    this.currentEvent = null;
    this.currentMetric = 'marketCap';
  }

  start() {
    const shuffled = shuffle([...this.allStocks]);
    this.playerHand = shuffled.slice(0, 7);   // 7枚：M&A用に余裕を持たせる
    this.deck = shuffled.slice(7);
    this.round = 0;
    this.score = 0;
    this.history = [];
    this.opponentCard = null;
    this.selectedCardIndices = [];
    this.currentEvent = null;
    this.currentMetric = 'marketCap';
  }

  startRound() {
    this.round++;
    this.selectedCardIndices = [];
    this.opponentCard = this.deck.shift();
    this.currentEvent = EVENTS[Math.floor(Math.random() * EVENTS.length)];
    return { opponentCard: this.opponentCard, event: this.currentEvent };
  }

  setMetric(metric) {
    this.currentMetric = metric;
  }

  // M&A可能か（手札が残りラウンド+1以上ある場合のみ許可）
  canMnA() {
    return this.playerHand.length > (this.maxRounds - this.round + 1);
  }

  // カード選択トグル（1枚目=選択、2枚目=M&A追加、選択済み=解除）
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
      // M&A不可の場合は差し替え
      this.selectedCardIndices = [index];
    }
  }

  // イベント補正込みの有効値を取得（時価総額・売上高・営業利益に適用。従業員数は対象外）
  getEffectiveValue(stock, metric, event) {
    const raw = stock[metric] || 0;
    if (metric === 'employees') return raw;
    if (!event || !event.effects || event.effects.length === 0) return raw;
    const eff = event.effects.find(e => e.sector === stock.sector);
    return eff ? Math.round(raw * eff.multiplier) : raw;
  }

  // M&Aの合体倍率：同業種同士は「シナジー」で+10%、異業種は「ディシナジー」で-5%
  getMnaMultiplier(cards) {
    if (cards.length < 2) return 1;
    const sameSector = cards.every(c => c.sector === cards[0].sector);
    return sameSector ? 1.10 : 0.95;
  }

  battle() {
    if (this.selectedCardIndices.length === 0) return null;

    const metric = this.currentMetric;
    const event = this.currentEvent;
    const playerCards = this.selectedCardIndices.map(i => this.playerHand[i]);
    const isMnA = playerCards.length > 1;

    // プレイヤー側：複数カードは合算した上でM&A倍率（シナジー/ディシナジー）を適用
    const playerRawSum = playerCards.reduce((sum, card) => {
      return sum + this.getEffectiveValue(card, metric, event);
    }, 0);
    const mnaMultiplier = this.getMnaMultiplier(playerCards);
    const mnaSameSector = isMnA ? playerCards.every(c => c.sector === playerCards[0].sector) : null;
    const playerEffValue = isMnA ? Math.round(playerRawSum * mnaMultiplier) : playerRawSum;

    const opponentEffValue = this.getEffectiveValue(this.opponentCard, metric, event);

    const playerWins = playerEffValue > opponentEffValue;
    const margin = opponentEffValue > 0
      ? Math.abs(playerEffValue - opponentEffValue) / opponentEffValue
      : 1;

    let basePoints = 0;
    let bonus = null;   // 効率ボーナス（最高1件、基本点の50%まで）
    let justKill = false;

    if (playerWins) {
      basePoints = 100;

      // 効率ボーナス（ギリギリ勝ちほど高得点。2段階のみ、最大+50点）
      if (margin < 0.05) {
        bonus = { label: 'ジャスト・キル！', extra: 50 };
        justKill = true;
      } else if (margin < 0.15) {
        bonus = { label: '絶妙！', extra: 30 };
      }
    }

    const totalPoints = basePoints + (bonus ? bonus.extra : 0);

    this.score += totalPoints;

    const result = {
      round: this.round,
      playerCards,
      playerCard: playerCards[0],   // 後方互換
      opponentCard: this.opponentCard,
      playerWins,
      margin,
      basePoints,
      bonus,
      justKill,
      isMnA,
      mnaMultiplier,
      mnaSameSector,
      metric,
      event,
      playerEffValue,
      opponentEffValue,
      totalPoints,
    };

    this.history.push(result);

    // 使用したカードを手札から除去（インデックスが大きい方から削除してズレを防ぐ）
    const sorted = [...this.selectedCardIndices].sort((a, b) => b - a);
    sorted.forEach(i => this.playerHand.splice(i, 1));
    this.selectedCardIndices = [];

    return result;
  }

  isOver() {
    return this.round >= this.maxRounds;
  }

  getScoreRank() {
    // シミュレーション（完全情報での最適プレイ）の得点分布に基づき設定。
    // 660点は最適プレイでも上位1割程度というラインで、実戦では純粋な実力＋運が
    // 噛み合った時だけ届く「特別な達成」になるよう調整した。
    if (this.score >= 660) return { label: '株の神様',      stars: 5 };
    if (this.score >= 580) return { label: '敏腕トレーダー', stars: 4 };
    if (this.score >= 480) return { label: '投資家見習い',   stars: 3 };
    if (this.score >= 300) return { label: '株式初心者',     stars: 2 };
    return                        { label: 'もっと勉強が必要', stars: 1 };
  }
}

function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}
