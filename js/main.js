// UI制御（DOM操作・イベント処理）
let engine = null;

// ─── 画面切替 ─────────────────────────────────────────────────────────
function showScreen(id) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  document.getElementById(id).classList.add('active');
}

// ─── イベント補正情報ヘルパー ────────────────────────────────────────
function getBoostInfo(stock, metric, event) {
  if (!engine || !event) return null;
  const raw = stock[metric] || 0;
  const eff = engine.getEffectiveValue(stock, metric, event);
  if (eff === raw || raw === 0) return null;
  const pct = Math.round((eff / raw - 1) * 100);
  const abs = Math.abs(pct);
  // 補正の強さを3段階に分け、矢印の数・太さで「どれだけ乗っているか」を視覚化する
  const mag = abs >= 20 ? 3 : abs >= 10 ? 2 : 1;
  return { raw, eff, pct, isUp: pct > 0, mag };
}

function boostArrow(boost) {
  const arrow = boost.isUp ? '▲' : '▼';
  return arrow.repeat(boost.mag);
}

// ─── カード生成ヘルパー ─────────────────────────────────────────────────
function makeBattleCard(stock, showBoost) {
  const color = getSectorColor(stock.sector);
  const metric = engine ? engine.currentMetric : 'marketCap';
  const event  = engine ? engine.currentEvent : null;
  const boost  = showBoost ? getBoostInfo(stock, metric, event) : null;
  const displayVal = boost ? boost.eff : (stock[metric] || 0);

  const div = document.createElement('div');
  div.className = 'battle-card';
  div.style.setProperty('--sector-color', color);

  const boostBadge = boost
    ? `<span class="bc-boost-badge ${boost.isUp ? 'up' : 'down'} mag-${boost.mag}">${boostArrow(boost)} ${boost.isUp ? '+' : ''}${boost.pct}%</span>`
    : '';

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
  `;
  return div;
}

function makeOpponentCardFace(stock) {
  const color  = getSectorColor(stock.sector);
  const metric = engine ? engine.currentMetric : 'marketCap';
  const event  = engine ? engine.currentEvent : null;
  const boost  = getBoostInfo(stock, metric, event);
  // 相手カードの「目安」は補正前の実力値で判定する（補正後の値・割合は対決まで非公開）
  const hintVal = stock[metric] || 0;

  const div = document.createElement('div');
  let cls = 'battle-card opponent-face';
  if (boost) cls += boost.isUp ? ' evt-boosted-up' : ' evt-boosted-down';
  div.className = cls;
  div.style.setProperty('--sector-color', color);

  // 正確な数値・%は対決まで非公開。強さ（矢印の数）と方向だけを見せる
  const boostNote = boost
    ? `<div class="bc-hint-boost-badge ${boost.isUp ? 'up' : 'down'} mag-${boost.mag}">${boostArrow(boost)} イベント補正</div>`
    : '';

  div.innerHTML = `
    <div class="bc-sector" style="background:${color}20;color:${color}">${stock.sector}</div>
    <div class="bc-name">${stock.name}</div>
    <div class="bc-ticker">${stock.ticker}</div>
    <div class="bc-hint-area">
      <div class="bc-hint-label">${getMetricLabel(metric)}の目安</div>
      <div class="bc-hint-value">${getMetricHint(hintVal, metric)}</div>
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
  `;
  div.addEventListener('click', () => onCardClick(index));
  return div;
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

  // 売上高・営業利益のみに効果があることを明示
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

  // M&A: 2枚重ねて表示
  const wrap = document.createElement('div');
  wrap.className = 'mna-wrap';
  engine.selectedCardIndices.forEach((idx, i) => {
    const card = makeBattleCard(engine.playerHand[idx], true);
    card.classList.add('mna-card', `mna-card-${i}`);
    wrap.appendChild(card);
  });
  const badge = document.createElement('div');
  badge.className = 'mna-center-badge';
  badge.textContent = 'M&A 合体！';
  wrap.appendChild(badge);
  slot.appendChild(wrap);
}

// ─── 手札レンダリング ────────────────────────────────────────────────
function renderHand() {
  const container = document.getElementById('hand-cards');
  container.innerHTML = '';
  engine.playerHand.forEach((stock, i) => {
    container.appendChild(makeHandCard(stock, i));
  });
  document.getElementById('hand-count').textContent = `${engine.playerHand.length}枚`;

  const mnaHint = document.getElementById('mna-hint');
  mnaHint.style.display = engine.canMnA() ? 'inline' : 'none';
}

function renderHeader() {
  document.getElementById('round-num').textContent = `ROUND ${engine.round} / ${engine.maxRounds}`;
  document.getElementById('score-val').textContent = engine.score;
}

// ─── 対決ボタン状態 ──────────────────────────────────────────────────
function updateBattleBtn() {
  const btn = document.getElementById('btn-battle');
  const hasSelection = engine.selectedCardIndices.length > 0;
  btn.disabled = !hasSelection;
  btn.classList.toggle('ready', hasSelection);
  btn.textContent = engine.selectedCardIndices.length >= 2 ? '合体して対決！' : '対決！';
}

// ─── ゲームフロー ────────────────────────────────────────────────────
function startGame() {
  engine = new GameEngine(STOCKS);
  engine.start();
  showScreen('screen-game');
  hideResult();
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
}

function renderOpponentCard(stock) {
  const slot = document.getElementById('opp-slot');
  slot.innerHTML = '';
  slot.appendChild(makeOpponentCardFace(stock));
}

function onCardClick(index) {
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
  document.getElementById('btn-battle').disabled = true;

  const result = engine.battle();
  renderHeader();

  // 相手カードを正式表示（実値＋補正）に切り替え
  const oppSlot = document.getElementById('opp-slot');
  oppSlot.innerHTML = '';
  const revealedCard = makeBattleCard(result.opponentCard, true);
  revealedCard.classList.add('revealed');
  oppSlot.appendChild(revealedCard);

  // 勝敗の枠色
  document.querySelectorAll('#player-slot .battle-card').forEach(el => {
    el.classList.add(result.playerWins ? 'win-card' : 'lose-card');
  });
  revealedCard.classList.add(result.playerWins ? 'lose-card' : 'win-card');

  setTimeout(() => showResult(result), 600);
}

// ─── 結果表示 ────────────────────────────────────────────────────────
function showResult(result) {
  document.getElementById('result-overlay').classList.remove('hidden');

  // 勝敗バナー
  const banner = document.getElementById('result-banner');
  banner.textContent = result.playerWins ? '勝利！' : '敗北…';
  banner.className = 'result-banner ' + (result.playerWins ? 'win' : 'lose');

  // ポイント表示
  document.getElementById('result-base').textContent =
    result.playerWins ? `基本勝利 +${result.basePoints}点` : '±0点';

  const bonusEl = document.getElementById('result-bonus');
  if (result.bonus) {
    bonusEl.textContent = `${result.bonus.label} ボーナス +${result.bonus.extra}点`;
    bonusEl.className = 'result-bonus show';
  } else {
    bonusEl.textContent = '';
    bonusEl.className = 'result-bonus';
  }

  // ジャスト・キル演出はボーナス行に統合済みのため、専用行は非表示にする
  document.getElementById('result-justkill').className = 'result-justkill';

  document.getElementById('result-total').textContent = `合計 +${result.totalPoints}点`;

  // イベント表示
  const evEl = document.getElementById('result-event');
  if (result.event && result.event.effects.length > 0) {
    evEl.textContent = `📰 ${result.event.name} 適用中`;
    evEl.style.display = '';
  } else {
    evEl.style.display = 'none';
  }

  // 企業情報
  fillEduCard('edu-player', result.playerCards[0], result.metric,
    result.isMnA ? result.playerCards[1] : null);
  fillEduCard('edu-opponent', result.opponentCard, result.metric);

  // ボタン切替
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

  // 勝負に使った指標の値を表示
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
  const rank = engine.getScoreRank();
  document.getElementById('final-score').textContent = engine.score;
  document.getElementById('rank-label').textContent = rank.label;
  document.getElementById('rank-stars').textContent =
    '★'.repeat(rank.stars) + '☆'.repeat(5 - rank.stars);

  const histEl = document.getElementById('history-list');
  histEl.innerHTML = '';
  engine.history.forEach(r => {
    const li = document.createElement('div');
    li.className = 'history-item ' + (r.playerWins ? 'h-win' : 'h-lose');
    const playerName = r.isMnA
      ? `${r.playerCards[0].name}＋${r.playerCards[1].name}`
      : r.playerCards[0].name;
    const bonusTxt = r.bonus ? ` ${r.justKill ? '⚡' : ''}${r.bonus.label}` : '';
    li.innerHTML = `
      <span class="h-round">R${r.round}</span>
      <span class="h-result">${r.playerWins ? '勝' : '負'}</span>
      <span class="h-detail">${playerName} vs ${r.opponentCard.name}</span>
      <span class="h-pts">+${r.totalPoints}点${bonusTxt}</span>
    `;
    histEl.appendChild(li);
  });
}

// ─── イベント登録 ────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('btn-start').addEventListener('click', startGame);
  document.getElementById('btn-retry').addEventListener('click', startGame);
  document.getElementById('btn-title').addEventListener('click', () => showScreen('screen-title'));
  document.getElementById('btn-rules').addEventListener('click', () => showScreen('screen-rules'));
  document.getElementById('btn-rules-back').addEventListener('click', () => showScreen('screen-title'));
  document.getElementById('btn-battle').addEventListener('click', onBattle);
  document.getElementById('btn-next').addEventListener('click', onNextRound);

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
});
