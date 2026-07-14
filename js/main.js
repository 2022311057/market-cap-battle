// UI制御（DOM操作・イベント処理）
let engine = null;
let selectedDifficulty = 'normal';
let _isDailyMode = false;
let currentRival = null;
let draftSelectedIndices = [];

// ─── 定数 ────────────────────────────────────────────────────────────

const DIFFICULTY_DESCRIPTIONS = {
  easy:   '対戦相手は小型株寄りに出やすい。目安は5段階で表示され、イベント補正も対決前から%まで見える。',
  normal: '対戦相手は完全ランダム。目安は4段階、イベント補正は方向のみ表示。',
  hard:   '対戦相手は大型株寄りに出やすい。目安は大小2択のみで、イベント補正は対決まで完全非公開。',
};

const ROUND_NAMES = { 1: '序盤戦', 2: '展開', 3: '折り返し', 4: '終盤戦', 5: '最終決戦！' };

const RIVALS = [
  { name: '株の猛者 田中義男',      quote: '市場を甘く見るな。容赦はしない。' },
  { name: '投資の天才 鈴木一朗',    quote: '10年後を見ている。今は仕込み時だ。' },
  { name: '敏腕トレーダー 山田花子', quote: '感情で動く投資家は必ず負ける。' },
  { name: '株職人 佐藤健',          quote: 'チャートは嘘をつかない。人間がつくだけだ。' },
  { name: 'デイトレの鬼 中村太郎',  quote: 'リスクとリターンは常に表裏一体だ。' },
  { name: '市場の女王 高橋美咲',    quote: '相場に楽な道など存在しない。' },
  { name: 'バリュー投資家 伊藤誠',  quote: '知識こそが最大の武器だ。' },
  { name: '連勝師 渡辺翔太',        quote: '一度負けたくらいで折れる者に、大勝はない。' },
];

const RIVAL_COMMENTS = {
  win:  ['完敗だ…認めよう。', 'お前は強かった。次は返す。', '読みが外れた。悔しい。'],
  draw: ['互角だったな。面白かった。', '実力は認める。また対戦しよう。'],
  lose: ['今日は俺の勝ちだ。', '勉強が足りないな。', 'また来い、待ってるぞ。'],
};

// ─── ユーティリティ ──────────────────────────────────────────────────
function randomFrom(arr) { return arr[Math.floor(Math.random() * arr.length)]; }

// ─── localStorage ────────────────────────────────────────────────────
const STATS_KEY     = 'mcb_stats';
const COLL_KEY      = 'mcb_collection';
const DAILY_PREFIX  = 'mcb_daily_';

function loadStats() {
  try { return JSON.parse(localStorage.getItem(STATS_KEY) || '{}'); }
  catch { return {}; }
}
function saveStats(history) {
  const s = loadStats();
  s.plays = (s.plays || 0) + 1;
  s.roundTotal = (s.roundTotal || 0) + history.length;
  let rw = 0, rl = 0;
  history.forEach(r => { if (r.playerWins) rw++; else if (!r.isDraw) rl++; });
  s.roundWins = (s.roundWins || 0) + rw;
  if (rw > rl) s.gameWins = (s.gameWins || 0) + 1;
  else if (rl > rw) s.gameLosses = (s.gameLosses || 0) + 1;
  else s.gameDraws = (s.gameDraws || 0) + 1;
  localStorage.setItem(STATS_KEY, JSON.stringify(s));
  return s;
}

function loadCollection() {
  try { return new Set(JSON.parse(localStorage.getItem(COLL_KEY) || '[]')); }
  catch { return new Set(); }
}
function saveCollection(tickers) {
  const c = loadCollection();
  tickers.forEach(t => c.add(t));
  localStorage.setItem(COLL_KEY, JSON.stringify([...c]));
  return c;
}

function getDailyKey() { return DAILY_PREFIX + new Date().toISOString().slice(0, 10); }
function isDailyPlayed() { return localStorage.getItem(getDailyKey()) !== null; }
function saveDailyResult(score) { localStorage.setItem(getDailyKey(), score); }
function getDailyScore() { return parseInt(localStorage.getItem(getDailyKey()) || '0', 10); }

// ─── 画面切替 ─────────────────────────────────────────────────────────
function showScreen(id) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  document.getElementById(id).classList.add('active');
}

// ─── ライバル生成 ─────────────────────────────────────────────────────
function generateRival() {
  return RIVALS[Math.floor(Math.random() * RIVALS.length)];
}

// ─── イベント補正情報ヘルパー ────────────────────────────────────────
function getBoostInfo(stock, metric, event) {
  if (!engine || !event) return null;
  const raw = stock[metric] || 0;
  const eff = engine.getEffectiveValue(stock, metric, event);
  if (eff === raw || raw === 0) return null;
  const pct = Math.round((eff / raw - 1) * 100);
  const abs = Math.abs(pct);
  const mag = abs >= 20 ? 3 : abs >= 10 ? 2 : 1;
  return { raw, eff, pct, isUp: pct > 0, mag };
}

function boostArrow(boost) {
  const arrow = boost.isUp ? '▲' : '▼';
  return arrow.repeat(boost.mag);
}

// ─── カード生成ヘルパー ──────────────────────────────────────────────
function makeBattleCard(stock, showBoost) {
  const color = getSectorColor(stock.sector);
  const metric = engine ? engine.currentMetric : 'marketCap';
  const event  = engine ? engine.currentEvent : null;
  const boost  = showBoost ? getBoostInfo(stock, metric, event) : null;
  const displayVal = boost ? boost.eff : (stock[metric] || 0);
  const ab = SECTOR_ABILITIES[stock.sector];

  const div = document.createElement('div');
  div.className = 'battle-card';
  div.style.setProperty('--sector-color', color);

  const boostBadge = boost
    ? `<span class="bc-boost-badge ${boost.isUp ? 'up' : 'down'} mag-${boost.mag}">${boostArrow(boost)} ${boost.isUp ? '+' : ''}${boost.pct}%</span>`
    : '';
  const abilityTag = ab ? `<div class="bc-ability-tag">⚡ ${ab.name}</div>` : '';

  div.innerHTML = `
    <div class="bc-sector" style="background:${color}20;color:${color}">${stock.sector}</div>
    <div class="bc-name">${stock.name}</div>
    <div class="bc-ticker">${stock.ticker}</div>
    <div class="bc-cap-area">
      <div class="bc-cap-label">${getMetricLabel(metric)}</div>
      <div class="bc-cap-value ${boost ? (boost.isUp ? 'evt-up' : 'evt-down') : ''}">
        ${formatMetricValue(displayVal, metric)}${boostBadge}
      </div>
      ${boost ? `<div class="bc-original-val">${formatMetricValue(boost.raw, metric)}</div>` : ''}
    </div>
    ${abilityTag}
  `;
  return div;
}

function makeOpponentCardFace(stock) {
  const color  = getSectorColor(stock.sector);
  const metric = engine ? engine.currentMetric : 'marketCap';
  const event  = engine ? engine.currentEvent : null;
  const difficulty = engine ? engine.difficulty : 'normal';
  const boost  = getBoostInfo(stock, metric, event);

  const div = document.createElement('div');
  let cls = 'battle-card opponent-face';
  div.style.setProperty('--sector-color', color);

  let hintBand, boostNote;
  if (difficulty === 'easy') {
    const hintVal = boost ? boost.eff : (stock[metric] || 0);
    hintBand = getMetricHintEasy(hintVal, metric);
    boostNote = boost
      ? `<div class="bc-hint-boost-badge ${boost.isUp ? 'up' : 'down'} mag-${boost.mag}">${boostArrow(boost)} イベント補正 ${boost.isUp ? '+' : ''}${boost.pct}%</div>`
      : '';
    if (boost) cls += boost.isUp ? ' evt-boosted-up' : ' evt-boosted-down';
  } else if (difficulty === 'hard') {
    hintBand = getMetricHintHard(stock[metric] || 0, metric);
    boostNote = '';
  } else {
    const hintVal = stock[metric] || 0;
    hintBand = getMetricHint(hintVal, metric);
    boostNote = boost
      ? `<div class="bc-hint-boost-badge ${boost.isUp ? 'up' : 'down'} mag-${boost.mag}">${boostArrow(boost)} イベント補正</div>`
      : '';
    if (boost) cls += boost.isUp ? ' evt-boosted-up' : ' evt-boosted-down';
  }
  div.className = cls;

  div.innerHTML = `
    <div class="bc-sector" style="background:${color}20;color:${color}">${stock.sector}</div>
    <div class="bc-name">${stock.name}</div>
    <div class="bc-ticker">${stock.ticker}</div>
    <div class="bc-hint-area">
      <div class="bc-hint-label">${getMetricLabel(metric)}の目安</div>
      <div class="bc-hint-value">${hintBand}</div>
      ${boostNote}
    </div>
  `;
  return div;
}

function makeHandCard(stock, index) {
  const color  = getSectorColor(stock.sector);
  const metric = engine ? engine.currentMetric : 'marketCap';
  const event  = engine ? engine.currentEvent : null;
  const selIdx = engine.selectedCardIndices.indexOf(index);
  const isFirst  = selIdx === 0;
  const isSecond = selIdx === 1;
  const boost  = getBoostInfo(stock, metric, event);
  const displayVal = boost ? boost.eff : (stock[metric] || 0);
  const ab = SECTOR_ABILITIES[stock.sector];

  const div = document.createElement('div');
  let cls = 'hand-card';
  if (isFirst)  cls += ' selected';
  if (isSecond) cls += ' mna-selected';
  if (boost)    cls += boost.isUp ? ' evt-boosted-up' : ' evt-boosted-down';
  div.className = cls;
  div.style.setProperty('--sector-color', color);
  div.dataset.index = index;

  const boostBadge = boost
    ? `<span class="hc-evt-badge ${boost.isUp ? 'up' : 'down'} mag-${boost.mag}">${boostArrow(boost)} ${boost.isUp ? '+' : ''}${boost.pct}%</span>`
    : '';
  const originalVal = boost
    ? `<div class="hc-original-val">${formatMetricValue(boost.raw, metric)}</div>`
    : '';
  const abilityTag = ab ? `<div class="hc-ability">⚡ ${ab.name}</div>` : '';

  div.innerHTML = `
    ${isSecond ? '<div class="hc-mna-badge">M&A</div>' : ''}
    <div class="hc-sector" style="color:${color}">${stock.sector}</div>
    <div class="hc-name">${stock.name}</div>
    <div class="hc-metric-row">
      <span class="hc-metric-val ${boost ? (boost.isUp ? 'evt-up' : 'evt-down') : ''}">${formatMetricValue(displayVal, metric)}</span>
      ${boostBadge}
    </div>
    ${originalVal}
    <div class="hc-metric-label">${getMetricLabel(metric)}</div>
    <div class="hc-ticker">${stock.ticker}</div>
    ${abilityTag}
  `;
  div.addEventListener('click', () => onCardClick(index));
  return div;
}

// ─── ドラフトカード ───────────────────────────────────────────────────
function makeDraftCard(stock, index) {
  const color = getSectorColor(stock.sector);
  const isSelected = draftSelectedIndices.includes(index);
  const ab = SECTOR_ABILITIES[stock.sector];

  const div = document.createElement('div');
  div.className = 'draft-card' + (isSelected ? ' selected' : '');
  div.style.setProperty('--sector-color', color);
  div.dataset.index = index;

  const abilityTag = ab ? `<div class="dc-ability">⚡ ${ab.name}</div>` : '';
  const check = isSelected ? '<div class="dc-check">✓</div>' : '';

  div.innerHTML = `
    ${check}
    <div class="dc-sector" style="color:${color}">${stock.sector}</div>
    <div class="dc-name">${stock.name}</div>
    <div class="dc-value">${formatMarketCap(stock.marketCap)}</div>
    ${abilityTag}
    <div class="dc-ticker">${stock.ticker}</div>
  `;
  div.addEventListener('click', () => onDraftCardClick(index));
  return div;
}

function onDraftCardClick(index) {
  const pos = draftSelectedIndices.indexOf(index);
  if (pos >= 0) {
    draftSelectedIndices.splice(pos, 1);
  } else if (draftSelectedIndices.length < 7) {
    draftSelectedIndices.push(index);
    SFX.cardSelect();
  }
  renderDraftCards();
  updateDraftBtn();
}

function renderDraftCards() {
  const container = document.getElementById('draft-cards');
  container.innerHTML = '';
  engine._draftPool.forEach((stock, i) => container.appendChild(makeDraftCard(stock, i)));
}

function updateDraftBtn() {
  const count = draftSelectedIndices.length;
  document.getElementById('draft-selected-count').textContent = count;
  const btn = document.getElementById('btn-draft-confirm');
  btn.disabled = count !== 7;
  btn.textContent = count < 7 ? `あと ${7 - count} 枚選んでください` : 'この7枚で開始！';
}

// ─── イベントバナー ──────────────────────────────────────────────────
function renderEventBanner(event) {
  document.getElementById('event-name').textContent = event.name;
  document.getElementById('event-desc').textContent = event.desc;

  const effectsEl = document.getElementById('event-effects');
  effectsEl.innerHTML = '';
  event.effects.forEach(eff => {
    const pct = Math.round((eff.multiplier - 1) * 100);
    const chip = document.createElement('span');
    chip.className = 'event-effect-chip ' + (eff.multiplier >= 1 ? 'positive' : 'negative');
    chip.textContent = `${eff.sector} ${pct >= 0 ? '+' : ''}${pct}%`;
    effectsEl.appendChild(chip);
  });

  const noteEl = document.getElementById('event-metric-note');
  if (noteEl) noteEl.style.display = event.effects.length > 0 ? '' : 'none';

  const banner = document.getElementById('event-banner');
  banner.classList.remove('hidden', 'no-event');
  if (event.effects.length === 0) banner.classList.add('no-event');
}

// ─── 指標セレクタ ─────────────────────────────────────────────────────
function updateMetricButtons() {
  document.querySelectorAll('.metric-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.metric === engine.currentMetric);
  });
}

// ─── プレイヤースロット ───────────────────────────────────────────────
function renderPlayerSlot() {
  const slot = document.getElementById('player-slot');
  slot.innerHTML = '';

  if (engine.selectedCardIndices.length === 0) {
    slot.innerHTML = '<div class="slot-placeholder">カードを選んでください</div>';
    return;
  }

  if (engine.selectedCardIndices.length === 1) {
    slot.appendChild(makeBattleCard(engine.playerHand[engine.selectedCardIndices[0]], true));
    return;
  }

  const wrap = document.createElement('div');
  wrap.className = 'mna-wrap';
  const cards = engine.selectedCardIndices.map(idx => engine.playerHand[idx]);
  engine.selectedCardIndices.forEach((idx, i) => {
    const card = makeBattleCard(engine.playerHand[idx], true);
    card.classList.add('mna-card', `mna-card-${i}`);
    wrap.appendChild(card);
  });

  const metric = engine.currentMetric;
  const event = engine.currentEvent;
  const rawSum = cards.reduce((sum, c) => sum + engine.getEffectiveValue(c, metric, event), 0);
  const multiplier = engine.getMnaMultiplier(cards);
  const total = Math.round(rawSum * multiplier);
  const sameSector = cards[0].sector === cards[1].sector;
  const pct = Math.round((multiplier - 1) * 100);
  const mnaLabel = sameSector
    ? `⚡ 同業種シナジー +${pct}%`
    : `⚠ 異業種ディシナジー ${pct}%`;

  const badge = document.createElement('div');
  badge.className = 'mna-center-badge';
  badge.innerHTML = `
    <div class="mna-badge-title">M&A 合体！</div>
    <div class="mna-badge-total">合計 ${formatMetricValue(total, metric)}</div>
    <div class="mna-badge-synergy ${sameSector ? 'synergy' : 'dissynergy'}">${mnaLabel}</div>
  `;
  wrap.appendChild(badge);
  slot.appendChild(wrap);
}

// ─── 手札レンダリング ────────────────────────────────────────────────
function renderHand() {
  const container = document.getElementById('hand-cards');
  container.innerHTML = '';
  engine.playerHand.forEach((stock, i) => container.appendChild(makeHandCard(stock, i)));
  document.getElementById('hand-count').textContent = `${engine.playerHand.length}枚`;

  const mnaHint = document.getElementById('mna-hint');
  mnaHint.style.display = engine.canMnA() ? 'inline' : 'none';
}

// ─── スコアアニメーション ─────────────────────────────────────────────
let _scoreAnimId = null;
function animateScore(from, to) {
  if (_scoreAnimId) cancelAnimationFrame(_scoreAnimId);
  const el = document.getElementById('score-val');
  const duration = 500;
  const start = performance.now();
  function tick(now) {
    const t = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - t, 3);
    const val = Math.round(from + (to - from) * eased);
    el.textContent = val;
    if (t < 1) {
      _scoreAnimId = requestAnimationFrame(tick);
    } else {
      el.textContent = to;
      _scoreAnimId = null;
      // 大量得点時はスコア表示を強調
      if (to - from >= 150) {
        el.classList.add('score-big-gain');
        el.addEventListener('animationend', () => el.classList.remove('score-big-gain'), { once: true });
      }
    }
  }
  _scoreAnimId = requestAnimationFrame(tick);
}

let _prevScore = 0;
function renderHeader() {
  document.getElementById('round-num').textContent = `ROUND ${engine.round} / ${engine.maxRounds}`;
  document.getElementById('round-name').textContent = ROUND_NAMES[engine.round] || '';

  if (engine.score !== _prevScore) {
    animateScore(_prevScore, engine.score);
    _prevScore = engine.score;
  }

  const sb = document.getElementById('streak-badge');
  if (engine.winStreak >= 2) {
    const fires = '🔥'.repeat(Math.min(engine.winStreak, 5));
    sb.textContent = `${fires} ${engine.winStreak}連勝中！`;
    sb.classList.remove('hidden');
  } else {
    sb.classList.add('hidden');
  }
}

// ─── 対決ボタン状態 ──────────────────────────────────────────────────
function updateBattleBtn() {
  const btn = document.getElementById('btn-battle');
  const hasSelection = engine.selectedCardIndices.length > 0;
  btn.disabled = !hasSelection;
  btn.classList.toggle('ready', hasSelection);
  btn.textContent = engine.selectedCardIndices.length >= 2 ? '合体して対決！' : '対決！';
}

// ─── 最終ラウンドトースト ─────────────────────────────────────────────
function showFinalRoundToast() {
  const rank = engine.getScoreRank();
  const toast = document.getElementById('final-round-toast');
  if (rank.gap > 0 && rank.gap <= 250) {
    toast.textContent = `🏁 最終ラウンド！あと ${rank.gap}点で「${
      ['','株式初心者','投資家見習い','敏腕トレーダー','株の神様'][
        [100,280,450,660].findIndex(t => engine.score + rank.gap <= t) + 1
      ] || '次のランク'
    }」にランクアップ！`;
    toast.classList.remove('hidden');
    setTimeout(() => toast.classList.add('hidden'), 4000);
  }
}

// ─── ゲームフロー ────────────────────────────────────────────────────
function startGame(skipDraft = false) {
  const dailySeed = _isDailyMode ? dateToSeed(new Date().toISOString().slice(0, 10)) : null;
  engine = new GameEngine(STOCKS, selectedDifficulty, { daily: _isDailyMode, dailySeed });
  currentRival = generateRival();
  _isDailyMode = false;
  _prevScore = 0;
  document.getElementById('score-val').textContent = '0';

  if (skipDraft) {
    engine.start();
    _beginGame();
  } else {
    draftSelectedIndices = [];
    engine.startDraft();
    document.getElementById('draft-mode-label').textContent = engine.dailyMode ? '📅 デイリーチャレンジ' : '手札ドラフト';
    renderDraftCards();
    updateDraftBtn();
    showScreen('screen-draft');
  }
}

function startDailyGame() {
  if (isDailyPlayed()) {
    const score = getDailyScore();
    document.getElementById('dp-score-text').textContent = `今日のスコア：${score}点`;
    document.getElementById('daily-played-overlay').classList.remove('hidden');
    return;
  }
  _isDailyMode = true;
  startGame();
}

function onConfirmDraft() {
  engine.confirmDraft(draftSelectedIndices);
  _beginGame();
}

function _beginGame() {
  showScreen('screen-game');
  hideResult();

  // ライバルバー表示
  if (currentRival) {
    document.getElementById('rival-name-display').textContent = currentRival.name;
    document.getElementById('rival-quote-display').textContent = `「${currentRival.quote}」`;
    document.getElementById('rival-bar').classList.remove('hidden');
  }

  startRound();
}

function startRound() {
  const { opponentCard, event } = engine.startRound();
  renderHeader();
  renderEventBanner(event);
  updateMetricButtons();
  renderOpponentCard(opponentCard);
  renderHand();
  renderPlayerSlot();
  updateBattleBtn();
  document.getElementById('instruction').textContent =
    '手札からカードを選んでください（2枚選ぶとM&A合体！）';

  if (engine.round === engine.maxRounds) showFinalRoundToast();
}

function renderOpponentCard(stock) {
  const slot = document.getElementById('opp-slot');
  const container = document.createElement('div');
  container.className = 'flip-container';
  const inner = document.createElement('div');
  inner.className = 'flip-inner';
  inner.id = 'opp-flip-inner';

  const front = document.createElement('div');
  front.className = 'flip-front';
  front.appendChild(makeOpponentCardFace(stock));

  const back = document.createElement('div');
  back.className = 'flip-back';
  back.id = 'opp-flip-back';

  inner.appendChild(front);
  inner.appendChild(back);
  container.appendChild(inner);
  slot.innerHTML = '';
  slot.appendChild(container);
}

function onCardClick(index) {
  SFX.cardSelect();
  // モバイルバイブレーション
  if (navigator.vibrate) navigator.vibrate(30);
  engine.toggleCardSelection(index);
  renderHand();
  renderPlayerSlot();
  updateBattleBtn();

  const cnt = engine.selectedCardIndices.length;
  if (cnt === 2) {
    document.getElementById('instruction').textContent = 'M&A合体！「合体して対決！」を押してください';
  } else if (cnt === 1) {
    const hint = engine.canMnA() ? '（もう1枚選ぶとM&A！）' : '';
    document.getElementById('instruction').textContent = `対決ボタンを押してください！${hint}`;
  } else {
    document.getElementById('instruction').textContent =
      '手札からカードを選んでください（2枚選ぶとM&A合体！）';
  }
}

function onBattle() {
  if (engine.selectedCardIndices.length === 0) return;
  if (tutorialMgr.active) tutorialMgr.end();
  document.getElementById('btn-battle').disabled = true;

  SFX.battle();
  if (navigator.vibrate) navigator.vibrate([50, 30, 80]);
  const vsEl = document.querySelector('.vs-center');
  vsEl.classList.add('battling');
  vsEl.addEventListener('animationend', () => vsEl.classList.remove('battling'), { once: true });

  const result = engine.battle();
  renderHeader();

  const revealedCard = makeBattleCard(result.opponentCard, true);
  revealedCard.classList.add('revealed');
  const backEl = document.getElementById('opp-flip-back');
  if (backEl) backEl.appendChild(revealedCard);
  const flipInner = document.getElementById('opp-flip-inner');
  if (flipInner) flipInner.classList.add('flipped');

  document.querySelectorAll('#player-slot .battle-card').forEach(el => {
    el.classList.add(result.isDraw ? 'draw-card' : result.playerWins ? 'win-card' : 'lose-card');
  });
  revealedCard.classList.add(result.isDraw ? 'draw-card' : result.playerWins ? 'lose-card' : 'win-card');

  const flash = document.getElementById('battle-flash');
  flash.className = result.isDraw ? 'flash-draw' : result.playerWins ? 'flash-win' : 'flash-lose';
  flash.addEventListener('animationend', () => { flash.className = ''; }, { once: true });

  setTimeout(() => showResult(result), 600);
}

// ─── 結果メッセージ ───────────────────────────────────────────────────
function getResultBannerText(result) {
  if (result.isDraw) return '引き分け';
  if (result.playerWins) {
    if (result.margin > 1.0)   return '圧勝！';
    if (result.margin > 0.5)   return '完勝！';
    if (result.margin < 0.05)  return '薄氷の勝利！';
    return '勝利！';
  } else {
    if (result.margin > 1.0)  return '完敗…';
    if (result.margin < 0.05) return 'わずかの差で…';
    if (result.margin > 0.5)  return '敗北…';
    return '惜敗！';
  }
}

function getResultSubText(result) {
  if (result.isDraw) return randomFrom(['両者互角…', '実力が拮抗している！', '紙一重だった']);
  if (result.playerWins) {
    if (result.margin > 1.0)  return randomFrom(['この差は大きい！', '相手を圧倒した！', '完璧な読みだった！']);
    if (result.margin < 0.05) return randomFrom(['冷や汗が止まらない…', 'ギリギリだったが！', '運も実力のうち！']);
    return randomFrom(['読み通りだ！', 'さすがの眼力！', '良い判断だった！']);
  } else {
    if (result.margin > 1.0)  return randomFrom(['格が違った…', '完全に読み負けた', '研究不足だった']);
    if (result.margin < 0.05) return randomFrom(['あとわずかだったのに…', '惜しすぎる！', 'もう少しで届いたのに']);
    return randomFrom(['次は気をつけよう', '手強かった…', '勉強になった']);
  }
}

// 負けた後に「別の指標なら勝てていた」を探す
function findAlternativeWin(result) {
  if (result.playerWins || result.isDraw) return null;
  const allMetrics = ['marketCap', 'revenue', 'operatingProfit', 'employees'];
  for (const m of allMetrics) {
    if (m === result.metric) continue;
    const playerVal = result.playerCards.reduce(
      (sum, card) => sum + engine.getEffectiveValue(card, m, result.event), 0
    );
    const oppVal = engine.getEffectiveValue(result.opponentCard, m, result.event);
    if (playerVal > oppVal) return m;
  }
  return null;
}

// ─── 結果表示 ────────────────────────────────────────────────────────
function showResult(result) {
  document.getElementById('result-overlay').classList.remove('hidden');

  // 効果音
  if (result.isDraw)                              SFX.draw();
  else if (result.playerWins && result.bonus)     SFX.streak();
  else if (result.playerWins)                     SFX.win();
  else                                            SFX.lose();

  if (navigator.vibrate) {
    if (result.playerWins) navigator.vibrate([100, 50, 100]);
    else if (!result.isDraw) navigator.vibrate([200]);
  }

  // コンボオーバーレイ（3連勝以上）
  if (result.playerWins && engine.winStreak >= 3) {
    const fires = '🔥'.repeat(Math.min(engine.winStreak, 5));
    const combo = document.getElementById('combo-overlay');
    combo.setAttribute('data-text', `${fires}\n${engine.winStreak}連勝！`);
    combo.className = 'combo-overlay show';
    combo.addEventListener('animationend', () => { combo.className = 'combo-overlay hidden'; }, { once: true });
  }

  // バナー + サブテキスト
  const banner = document.getElementById('result-banner');
  banner.textContent = getResultBannerText(result);
  banner.className = 'result-banner ' + (result.isDraw ? 'draw' : result.playerWins ? 'win' : 'lose');
  document.getElementById('result-subtext').textContent = getResultSubText(result);

  // 接戦表示
  const closeEl = document.getElementById('result-close-match');
  if (result.margin < 0.05) {
    const diff = Math.abs(result.playerEffValue - result.opponentEffValue);
    closeEl.textContent = `⚡ わずか ${formatMetricValue(diff, result.metric)}差の激闘！`;
    closeEl.className = 'result-close-match ' + (result.playerWins ? 'close-win' : 'close-lose');
  } else {
    closeEl.className = 'result-close-match hidden';
  }

  // ポイント表示
  const baseLabel = result.isDraw ? '引き分け' : result.playerWins ? '基本勝利' : '敗北';
  document.getElementById('result-base').textContent = result.playerWins || result.isDraw
    ? `${baseLabel} +${result.basePoints}点`
    : '±0点';

  // マージンラベル
  if (result.playerWins) {
    if (result.basePoints === 120) document.getElementById('result-base').textContent += '（大差ボーナス）';
    else if (result.basePoints === 80) document.getElementById('result-base').textContent += '（接戦）';
  }

  const bonusEl = document.getElementById('result-bonus');
  if (result.bonus) {
    bonusEl.textContent = `🔥 ${result.bonus.label}ボーナス！ +${result.bonus.extra}点`;
    bonusEl.className = 'result-bonus show';
  } else {
    bonusEl.textContent = '';
    bonusEl.className = 'result-bonus';
  }

  // 業種能力ボーナス
  const abEl = document.getElementById('result-ability-bonus');
  if (result.abilityBonus) {
    abEl.textContent = `⚡ ${result.abilityBonus.name}ボーナス！ +${result.abilityBonus.extra}点`;
    abEl.className = 'result-ability-bonus show';
  } else {
    abEl.className = 'result-ability-bonus hidden';
  }

  document.getElementById('result-total').textContent = `今回 +${result.totalPoints}点`;
  document.getElementById('result-cumulative').textContent = `累計スコア ${engine.score}点`;

  // イベント表示
  const evEl = document.getElementById('result-event');
  if (result.event && result.event.effects.length > 0) {
    evEl.textContent = `📰 ${result.event.name} 適用中`;
    evEl.style.display = '';
  } else {
    evEl.style.display = 'none';
  }

  // 別指標ヒント（敗北時）
  const hintEl = document.getElementById('result-hint');
  const altMetric = findAlternativeWin(result);
  if (altMetric) {
    hintEl.textContent = `💡 ${getMetricLabel(altMetric)}で勝負していたら勝てていました！`;
    hintEl.className = 'result-hint show';
  } else {
    hintEl.className = 'result-hint hidden';
  }

  // 企業情報
  fillEduCard('edu-player', result.playerCards[0], result.metric,
    result.isMnA ? result.playerCards[1] : null);
  fillEduCard('edu-opponent', result.opponentCard, result.metric);

  document.getElementById('btn-next').textContent =
    engine.isOver() ? '結果を見る' : '次のラウンドへ';
}

function fillEduCard(id, stock, metric, extraCard) {
  const el = document.getElementById(id);
  const color = getSectorColor(stock.sector);

  el.querySelector('.edu-name').textContent = extraCard
    ? `${stock.name} ＋ ${extraCard.name}`
    : stock.name;
  el.querySelector('.edu-sector').textContent = stock.sector;
  el.querySelector('.edu-sector').style.color = color;
  el.querySelector('.edu-cap').textContent = formatMarketCap(stock.marketCap);

  const metricEl = el.querySelector('.edu-metric');
  if (metric !== 'marketCap') {
    const val = stock[metric] || 0;
    metricEl.textContent = `${getMetricLabel(metric)}：${formatMetricValue(val, metric)}`;
    metricEl.style.display = '';
  } else {
    metricEl.style.display = 'none';
  }

  el.querySelector('.edu-rank').textContent = `収録銘柄内 第${stock.rank}位 / ${stock.totalCount}社`;
  el.querySelector('.edu-founded').textContent = `${stock.founded}年`;
  el.querySelector('.edu-hq').textContent = stock.hq;
  el.querySelector('.edu-desc').textContent = stock.desc;
  el.querySelector('.edu-fact').textContent = `💡 ${stock.fact}`;
}

function hideResult() {
  document.getElementById('result-overlay').classList.add('hidden');
}

function onNextRound() {
  if (engine.isOver()) {
    showGameOver();
  } else {
    hideResult();
    startRound();
  }
}

// ─── ゲームオーバー ──────────────────────────────────────────────────
function showGameOver() {
  showScreen('screen-gameover');

  // デイリーモードの場合はタイトルを変える
  if (engine.dailyMode) {
    document.getElementById('gameover-title').textContent = '📅 デイリーチャレンジ 結果！';
    saveDailyResult(engine.score);
  } else {
    document.getElementById('gameover-title').textContent = 'ゲーム終了！';
  }

  const rank = engine.getScoreRank();
  document.getElementById('final-score').textContent = engine.score;
  document.getElementById('rank-label').textContent = rank.label;
  document.getElementById('rank-stars').textContent =
    '★'.repeat(rank.stars) + '☆'.repeat(5 - rank.stars);
  const gapEl = document.getElementById('rank-gap');
  gapEl.textContent = rank.gap > 0 ? `次のランクまであと ${rank.gap}点` : '最高ランク達成！🎉';

  // 難易度別ハイスコア
  const HS_KEY = `mcb_highscore_${engine.difficulty}`;
  const prev = parseInt(localStorage.getItem(HS_KEY) || '0', 10);
  const isNew = engine.score > prev;
  if (isNew) localStorage.setItem(HS_KEY, engine.score);
  const bsEl = document.getElementById('best-score');
  const diffLabel = { easy: 'かんたん', normal: 'ふつう', hard: 'むずかしい' }[engine.difficulty];
  bsEl.textContent = isNew
    ? `🏆 ${diffLabel} NEW BEST!`
    : `${diffLabel} BEST: ${Math.max(prev, engine.score)}点`;

  if (rank.stars === 5) setTimeout(() => SFX.perfectScore(), 300);
  else if (isNew)       setTimeout(() => SFX.win(), 300);

  // 通算成績
  const stats = saveStats(engine.history);
  const statsEl = document.getElementById('gameover-stats');
  const roundWinRate = stats.roundTotal > 0
    ? Math.round(stats.roundWins / stats.roundTotal * 100)
    : 0;
  statsEl.innerHTML = `
    <div class="stats-row">
      <span class="stats-item">🎮 通算 ${stats.plays}回プレイ</span>
      <span class="stats-item">⚔ ラウンド勝率 ${roundWinRate}%</span>
    </div>
  `;

  // 履歴
  const histEl = document.getElementById('history-list');
  histEl.innerHTML = '';
  engine.history.forEach(r => {
    const li = document.createElement('div');
    li.className = 'history-item ' + (r.isDraw ? 'h-draw' : r.playerWins ? 'h-win' : 'h-lose');
    const playerName = r.isMnA
      ? `${r.playerCards[0].name}＋${r.playerCards[1].name}`
      : r.playerCards[0].name;
    const bonusTxt = r.bonus ? ` 🔥${r.bonus.label}ボーナス` : '';
    const abTxt = r.abilityBonus ? ` ⚡${r.abilityBonus.name}` : '';
    li.innerHTML = `
      <span class="h-round">R${r.round}</span>
      <span class="h-result">${r.isDraw ? '分' : r.playerWins ? '勝' : '負'}</span>
      <span class="h-detail">${playerName} vs ${r.opponentCard.name}</span>
      <span class="h-pts">+${r.totalPoints}点${bonusTxt}${abTxt}</span>
    `;
    histEl.appendChild(li);
  });

  // コレクション更新
  const allTickers = engine.history.flatMap(r =>
    [...r.playerCards.map(c => c.ticker), r.opponentCard.ticker]
  );
  const coll = saveCollection(allTickers);
  const collEl = document.getElementById('gameover-collection');
  const pct = Math.round(coll.size / 225 * 100);
  collEl.innerHTML = `
    <div class="coll-label">企業コレクション</div>
    <div class="coll-count">${coll.size} <span class="coll-total">/ 225社 対戦済み</span></div>
    <div class="coll-bar"><div class="coll-fill" style="width:${pct}%"></div></div>
  `;

  // ライバル結果
  const rivalEl = document.getElementById('gameover-rival');
  if (currentRival) {
    const playerWins = engine.history.filter(r => r.playerWins).length;
    const playerLosses = engine.history.filter(r => !r.playerWins && !r.isDraw).length;
    const playerDid = playerWins > playerLosses ? 'win' : playerLosses > playerWins ? 'lose' : 'draw';
    const comment = randomFrom(RIVAL_COMMENTS[playerDid === 'win' ? 'win' : playerDid === 'lose' ? 'lose' : 'draw']);
    rivalEl.innerHTML = `
      <div class="rival-result-name">ライバル：${currentRival.name}</div>
      <div class="rival-result-comment">「${comment}」</div>
      <div class="rival-result-score">${engine.maxRounds - playerWins - engine.history.filter(r=>r.isDraw).length - playerLosses >= 0
        ? `ライバル ${playerLosses}勝 / あなた ${playerWins}勝`
        : ''}</div>
    `;
    rivalEl.classList.remove('hidden');
  }
}

// ─── チュートリアル用ヘルパー ──────────────────────────────────────────
function _tutorialSelectCard() {
  if (!engine || engine.playerHand.length === 0) return;
  if (engine.selectedCardIndices.length === 0) {
    engine.toggleCardSelection(0);
    renderHand();
    renderPlayerSlot();
    updateBattleBtn();
  }
}

// ─── デイリーステータス更新 ───────────────────────────────────────────
function updateDailyStatus() {
  const el = document.getElementById('daily-status');
  const btn = document.getElementById('btn-daily');
  if (isDailyPlayed()) {
    const score = getDailyScore();
    el.textContent = `今日のスコア：${score}点 （クリア済み）`;
    btn.classList.add('daily-done');
  } else {
    el.textContent = '毎日リセット！全員が同じデッキで挑戦します';
  }
}

// ─── イベント登録 ────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  updateDailyStatus();

  document.getElementById('btn-share').addEventListener('click', () => {
    const rank = engine ? engine.getScoreRank() : null;
    if (!rank) return;
    const stars = '★'.repeat(rank.stars) + '☆'.repeat(5 - rank.stars);
    const modeStr = engine.dailyMode ? '【デイリーチャレンジ】' : '【時価総額バトル】';
    const text = `${modeStr}\n${stars} ${rank.label}\nスコア: ${engine.score}点\n#時価総額バトル #日経225\nhttps://2022311057.github.io/market-cap-battle/`;
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`, '_blank', 'noopener');
  });

  document.getElementById('btn-start').addEventListener('click', () => startGame());
  document.getElementById('btn-daily').addEventListener('click', startDailyGame);
  document.getElementById('btn-retry').addEventListener('click', () => startGame());
  document.getElementById('btn-title').addEventListener('click', () => {
    document.getElementById('rival-bar').classList.add('hidden');
    showScreen('screen-title');
    updateDailyStatus();
  });
  document.getElementById('btn-rules').addEventListener('click', () => { startGame(true); tutorialMgr.start(); });
  document.getElementById('btn-tnext').addEventListener('click', () => tutorialMgr.next());
  document.getElementById('btn-tskip').addEventListener('click', () => tutorialMgr.end());
  document.getElementById('btn-battle').addEventListener('click', onBattle);
  document.getElementById('btn-next').addEventListener('click', onNextRound);
  document.getElementById('btn-draft-confirm').addEventListener('click', onConfirmDraft);
  document.getElementById('btn-draft-random').addEventListener('click', () => {
    draftSelectedIndices = [];
    const pool = engine._draftPool;
    const shuffled = [...Array(pool.length).keys()].sort(() => Math.random() - 0.5);
    draftSelectedIndices = shuffled.slice(0, 7);
    renderDraftCards();
    updateDraftBtn();
  });
  document.getElementById('btn-dp-close').addEventListener('click', () => {
    document.getElementById('daily-played-overlay').classList.add('hidden');
  });

  // 指標セレクタ
  document.querySelectorAll('.metric-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      if (!engine) return;
      engine.setMetric(btn.dataset.metric);
      updateMetricButtons();
      renderHand();
      renderPlayerSlot();
      renderOpponentCard(engine.opponentCard);
    });
  });

  // 難易度セレクタ
  document.querySelectorAll('.difficulty-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      selectedDifficulty = btn.dataset.difficulty;
      document.querySelectorAll('.difficulty-btn').forEach(b => {
        b.classList.toggle('active', b.dataset.difficulty === selectedDifficulty);
      });
      document.getElementById('difficulty-desc').textContent = DIFFICULTY_DESCRIPTIONS[selectedDifficulty];
    });
  });
});
