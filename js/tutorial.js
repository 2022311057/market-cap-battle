const TUTORIAL_STEPS = [
  {
    focus: '#hand-cards',
    title: '① あなたの手札',
    body: '7枚の企業カードが配られました。カードには会社名・業種・時価総額などの指標が書かれています。クリックして対戦に使う1枚を選びましょう。',
  },
  {
    focus: '#opp-slot',
    title: '② 対戦相手のカード',
    body: '上に相手のカードが出ています。実際の数値ではなく「目安」のみが表示されます。難易度によって情報の詳しさが変わります（かんたん：5段階 ／ ふつう：4段階 ／ むずかしい：上か下かのみ）。',
  },
  {
    focus: '#event-banner',
    title: '③ ラウンドイベント',
    body: 'ラウンドごとに特定の業種を有利・不利にするイベントが発生します。手札カードには ▲（有利） ▼（不利） バッジが付くので、イベントを活かせる業種のカードを選ぶと有利です。',
  },
  {
    focus: '.metric-selector',
    title: '④ 勝負指標を選ぶ',
    body: '時価総額・売上高・営業利益・従業員数の4つから「比べる指標」を選べます。イベント補正後の値で比較されます。相手の業種とイベントを読んで自分が有利な指標を選びましょう。',
  },
  {
    focus: '#hand-cards .hand-card',
    title: '⑤ カードを選んでバトル！',
    body: '試しに1枚自動で選択しました。このまま「対決！」を押すと勝負が始まります。差の大きさで得点が変わります（大差勝利+120点・通常+100点・薄氷勝利+80点）。連続して勝つと連勝ボーナスも！手札に余裕があれば2枚合体（M&A）もできます。',
    action: 'selectFirstCard',
  },
  {
    focus: null,
    title: '⑥ スコアと評価',
    body: '5ラウンド戦って合計スコアで評価されます。大差勝利+120点・連勝ボーナス・業種特殊能力ボーナスで高得点を狙えます。660点以上で最高ランク「株の神様」！毎日デイリーチャレンジも挑戦できます。',
    isFinal: true,
  },
];

class TutorialManager {
  constructor() {
    this.step = -1;
    this.active = false;
    this.focusedEl = null;
  }

  start() {
    this.active = true;
    this.step = 0;
    document.getElementById('tutorial-overlay').classList.remove('hidden');
    document.getElementById('screen-game').classList.add('tut-active');
    document.getElementById('tutorial-total').textContent = TUTORIAL_STEPS.length;
    this._show();
  }

  next() {
    if (this.step >= TUTORIAL_STEPS.length - 1) { this.end(); return; }
    this.step++;
    this._show();
  }

  end() {
    this.active = false;
    this._unfocus();
    document.getElementById('tutorial-overlay').classList.add('hidden');
    const gs = document.getElementById('screen-game');
    if (gs) gs.classList.remove('tut-active');
  }

  _unfocus() {
    if (this.focusedEl) {
      this.focusedEl.classList.remove('tutorial-focus');
      this.focusedEl = null;
    }
  }

  _show() {
    this._unfocus();
    const s = TUTORIAL_STEPS[this.step];

    document.getElementById('tutorial-cur').textContent = this.step + 1;
    document.getElementById('tutorial-heading').textContent = s.title;
    document.getElementById('tutorial-body').textContent = s.body;
    document.getElementById('btn-tnext').textContent = s.isFinal ? 'プレイ開始！' : '次へ →';

    // アクション（DOMが変わる可能性があるのでフォーカス適用より先に実行）
    if (s.action === 'selectFirstCard' && typeof _tutorialSelectCard === 'function') {
      _tutorialSelectCard();
    }

    // フォーカスハイライト
    if (s.focus) {
      const el = document.querySelector(s.focus);
      if (el) {
        el.classList.add('tutorial-focus');
        el.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        this.focusedEl = el;
      }
    }
  }
}

const tutorialMgr = new TutorialManager();
