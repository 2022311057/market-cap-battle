// 日経225銘柄データ（時価総額・売上高・営業利益：億円、従業員数：人、2025年初頭概算値）
// J-Quants API連携時はこのファイルをfetch(data/stocks.json)に置き換える
const STOCKS = [
  {
    ticker: "7203", name: "トヨタ自動車", sector: "輸送用機器",
    marketCap: 480000, revenue: 450000, operatingProfit: 50000, employees: 372817,
    founded: 1937, hq: "愛知県豊田市",
    desc: "世界最大の自動車メーカー。ハイブリッド車のパイオニア。",
    fact: "「カイゼン」と「ジャストインタイム」を世界に広めた。年間生産台数は約1,000万台超。"
  },
  {
    ticker: "8306", name: "三菱UFJフィナンシャル・グループ", sector: "銀行業",
    marketCap: 210000, revenue: 78000, operatingProfit: 21000, employees: 120000,
    founded: 2001, hq: "東京都千代田区",
    desc: "日本最大の金融グループ。銀行・証券・信託など幅広く展開。",
    fact: "総資産は400兆円超で、アジア最大級の銀行グループのひとつ。世界50カ国以上に拠点を持つ。"
  },
  {
    ticker: "6758", name: "ソニーグループ", sector: "電気機器",
    marketCap: 205000, revenue: 130000, operatingProfit: 12000, employees: 109700,
    founded: 1946, hq: "東京都港区",
    desc: "ゲーム・音楽・映画・半導体など多角経営の総合エンタメ企業。",
    fact: "PlayStation 5は発売後4年で累計6,500万台超を販売。音楽部門はビートルズの楽曲も管理する。"
  },
  {
    ticker: "8035", name: "東京エレクトロン", sector: "電気機器",
    marketCap: 185000, revenue: 22000, operatingProfit: 7000, employees: 15829,
    founded: 1963, hq: "東京都港区",
    desc: "半導体製造装置の世界トップメーカー。AI半導体需要で急成長。",
    fact: "半導体製造装置の世界シェア約15%。AI・データセンター需要急増で株価は10年で約15倍に。"
  },
  {
    ticker: "6861", name: "キーエンス", sector: "電気機器",
    marketCap: 180000, revenue: 9200, operatingProfit: 5000, employees: 10500,
    founded: 1974, hq: "大阪府大阪市",
    desc: "センサー・計測機器の世界的リーダー。驚異的な高利益率を誇る。",
    fact: "営業利益率は約55%と製造業最高水準。従業員の平均年収は約2,000万円超と日本最高クラス。"
  },
  {
    ticker: "9983", name: "ファーストリテイリング", sector: "小売業",
    marketCap: 165000, revenue: 27000, operatingProfit: 4000, employees: 56000,
    founded: 1963, hq: "山口県山口市",
    desc: "ユニクロを世界展開するアパレル企業。シンプルで高機能な服が人気。",
    fact: "「ヒートテック」の累計販売枚数は10億枚超。創業者・柳井正氏は日本有数の大富豪。"
  },
  {
    ticker: "6501", name: "日立製作所", sector: "電気機器",
    marketCap: 160000, revenue: 97000, operatingProfit: 8000, employees: 304000,
    founded: 1910, hq: "東京都千代田区",
    desc: "インフラ・デジタル・建設機械など幅広く展開するコングロマリット。",
    fact: "創業100年超。英国の鉄道事業も運営し、ロンドン市内を走る列車を製造している。"
  },
  {
    ticker: "6098", name: "リクルートホールディングス", sector: "サービス業",
    marketCap: 145000, revenue: 36000, operatingProfit: 4500, employees: 89000,
    founded: 1960, hq: "東京都千代田区",
    desc: "求人・HR・不動産など情報サービスで世界展開。Indeedも傘下。",
    fact: "世界最大の求人サイト「Indeed」を運営。「じゃらん」「ホットペッパー」も展開する。"
  },
  {
    ticker: "4063", name: "信越化学工業", sector: "化学",
    marketCap: 125000, revenue: 24000, operatingProfit: 9000, employees: 34000,
    founded: 1926, hq: "東京都千代田区",
    desc: "半導体シリコンウエハと塩化ビニル樹脂で世界トップシェア。",
    fact: "半導体シリコンウエハの世界シェアは約30%でNo.1。株主への高い利益還元でも知られる。"
  },
  {
    ticker: "9984", name: "ソフトバンクグループ", sector: "情報・通信業",
    marketCap: 120000, revenue: 73000, operatingProfit: 10000, employees: 80000,
    founded: 1981, hq: "東京都港区",
    desc: "AIへの巨額投資で知られる投資持株会社。Armも傘下に持つ。",
    fact: "孫正義氏は「300年ビジョン」を掲げる。半導体設計のArmの株式を約90%保有する。"
  },
  {
    ticker: "8316", name: "三井住友フィナンシャルグループ", sector: "銀行業",
    marketCap: 115000, revenue: 65000, operatingProfit: 15000, employees: 100000,
    founded: 2002, hq: "東京都千代田区",
    desc: "三井住友銀行・SMBC日興証券などを傘下に持つ大手金融グループ。",
    fact: "インド・東南アジアなど新興国市場への投資を積極的に拡大。海外収益比率が急上昇中。"
  },
  {
    ticker: "9432", name: "日本電信電話（NTT）", sector: "情報・通信業",
    marketCap: 110000, revenue: 130000, operatingProfit: 18000, employees: 330000,
    founded: 1985, hq: "東京都千代田区",
    desc: "日本最大の通信グループ。光ファイバー網を全国に整備。",
    fact: "IOWN構想として光を使った次世代通信インフラを開発中。世界100カ国以上でサービス展開。"
  },
  {
    ticker: "9433", name: "KDDI", sector: "情報・通信業",
    marketCap: 95000, revenue: 58000, operatingProfit: 11000, employees: 47000,
    founded: 2000, hq: "東京都千代田区",
    desc: "auブランドで通信を提供。ミャンマーなど海外通信インフラも整備。",
    fact: "30年以上連続増配という安定した株主還元が特徴。衛星通信サービスにも参入。"
  },
  {
    ticker: "6902", name: "デンソー", sector: "輸送用機器",
    marketCap: 85000, revenue: 73000, operatingProfit: 5500, employees: 168000,
    founded: 1949, hq: "愛知県刈谷市",
    desc: "トヨタグループの主要自動車部品メーカー。カーエアコンなどで世界シェア高い。",
    fact: "自動車のエアコンシステムで世界トップシェア。EVシフトに対応した電動化部品を積極的に開発。"
  },
  {
    ticker: "7974", name: "任天堂", sector: "その他製品",
    marketCap: 82000, revenue: 17000, operatingProfit: 5500, employees: 7500,
    founded: 1889, hq: "京都府京都市",
    desc: "ゲーム機・ゲームソフトの世界的リーダー。マリオ・ゼルダが世界的に著名。",
    fact: "Nintendo Switchは全世界で累計1.5億台超を販売。1889年創業で、もともとはトランプ会社だった。"
  },
  {
    ticker: "6367", name: "ダイキン工業", sector: "機械",
    marketCap: 77000, revenue: 43000, operatingProfit: 4700, employees: 97000,
    founded: 1924, hq: "大阪府大阪市",
    desc: "エアコンの世界シェアNo.1。省エネ技術と冷媒開発で世界をリード。",
    fact: "エアコンの世界市場シェアは約15%でトップ。フロン代替冷媒の開発など環境技術でも先進的。"
  },
  {
    ticker: "7267", name: "本田技研工業", sector: "輸送用機器",
    marketCap: 75000, revenue: 200000, operatingProfit: 13000, employees: 197000,
    founded: 1948, hq: "東京都港区",
    desc: "四輪車・二輪車・航空機エンジンまで製造。二輪車の世界販売台数はトップ。",
    fact: "二輪車の世界販売台数はNo.1。小型航空機エンジンでも世界シェア首位を誇る。"
  },
  {
    ticker: "8411", name: "みずほフィナンシャルグループ", sector: "銀行業",
    marketCap: 70000, revenue: 45000, operatingProfit: 12000, employees: 87000,
    founded: 2003, hq: "東京都千代田区",
    desc: "旧第一勧業・富士・日本興業銀行が合併した大手金融グループ。",
    fact: "過去のシステム障害を教訓にDX推進を強化中。デジタル通貨「J-Coin Pay」も展開する。"
  },
  {
    ticker: "7011", name: "三菱重工業", sector: "機械",
    marketCap: 67000, revenue: 47000, operatingProfit: 3500, employees: 83000,
    founded: 1884, hq: "東京都千代田区",
    desc: "航空機・艦艇・エネルギーシステムを製造する重工業の雄。",
    fact: "防衛産業の主要メーカーとして、戦闘機のエンジン開発にも参加。火力・原子力発電でも存在感。"
  },
  {
    ticker: "4502", name: "武田薬品工業", sector: "医薬品",
    marketCap: 68000, revenue: 41000, operatingProfit: 5000, employees: 50000,
    founded: 1781, hq: "大阪府大阪市",
    desc: "日本最大の製薬会社。アイルランドのシャイアー買収でグローバル展開。",
    fact: "1781年創業で日本最古の製薬会社のひとつ。シャイアー買収（約6兆円）でグローバルトップ20入り。"
  },
  {
    ticker: "6702", name: "富士通", sector: "情報・通信業",
    marketCap: 65000, revenue: 36000, operatingProfit: 2500, employees: 124000,
    founded: 1935, hq: "神奈川県川崎市",
    desc: "日本最大のITサービス企業のひとつ。量子コンピューターの研究開発にも注力。",
    fact: "独自の量子コンピューター「富岳」はスーパーコンピューターとして世界トップクラスの性能。"
  },
  {
    ticker: "4661", name: "オリエンタルランド", sector: "サービス業",
    marketCap: 62000, revenue: 5500, operatingProfit: 1700, employees: 12000,
    founded: 1960, hq: "千葉県浦安市",
    desc: "東京ディズニーランド・ディズニーシーを運営。ライセンスを受け独自開発。",
    fact: "ディズニーのライセンスを受けつつ、パーク内の開発・運営は独自に行う。年間来場者数は約3,000万人。"
  },
  {
    ticker: "6954", name: "ファナック", sector: "電気機器",
    marketCap: 58000, revenue: 7900, operatingProfit: 1700, employees: 8600,
    founded: 1972, hq: "山梨県忍野村",
    desc: "産業用ロボットと数値制御（NC）装置の世界トップメーカー。",
    fact: "山梨の山中に黄色い建物群を持つ独特の企業。NC装置の世界シェアは約50%と圧倒的。"
  },
  {
    ticker: "4519", name: "中外製薬", sector: "医薬品",
    marketCap: 55000, revenue: 9500, operatingProfit: 3500, employees: 7500,
    founded: 1925, hq: "東京都文京区",
    desc: "スイスのロシュグループ傘下。がん・リウマチ治療薬で高い競争力。",
    fact: "スイス製薬大手ロシュが株主として支援。抗体医薬品の研究開発力は世界トップクラス。"
  },
  {
    ticker: "3382", name: "セブン&アイ・ホールディングス", sector: "小売業",
    marketCap: 48000, revenue: 115000, operatingProfit: 4200, employees: 166000,
    founded: 2005, hq: "東京都千代田区",
    desc: "セブン-イレブンを世界展開する小売グループ。イトーヨーカドーも傘下。",
    fact: "セブン-イレブンの世界店舗数は8万店超で、業界世界No.1。米国でも主要CVSブランドに成長。"
  },
  {
    ticker: "6981", name: "村田製作所", sector: "電気機器",
    marketCap: 46000, revenue: 16000, operatingProfit: 2700, employees: 76000,
    founded: 1944, hq: "京都府長岡京市",
    desc: "スマートフォン等に必須の電子部品（MLCC）で世界トップシェア。",
    fact: "積層セラミックコンデンサ（MLCC）の世界シェアは約40%。1台のスマホに数百個使われる。"
  },
  {
    ticker: "5108", name: "ブリヂストン", sector: "ゴム製品",
    marketCap: 44000, revenue: 43000, operatingProfit: 4100, employees: 144000,
    founded: 1931, hq: "東京都中央区",
    desc: "タイヤの世界シェアNo.1。自転車タイヤやゴルフボールも製造。",
    fact: "「石橋」の姓を英語に逆訳した社名（Bridge＋Stone）。F1タイヤも長年供給していた。"
  },
  {
    ticker: "6971", name: "京セラ", sector: "電気機器",
    marketCap: 42000, revenue: 21000, operatingProfit: 1200, employees: 77000,
    founded: 1959, hq: "京都府京都市",
    desc: "セラミック電子部品で世界的リーダー。多角経営で通信・太陽光も展開。",
    fact: "創業者・稲盛和夫氏の「アメーバ経営」は世界中のビジネス書で紹介される経営哲学。"
  },
  {
    ticker: "8591", name: "オリックス", sector: "その他金融業",
    marketCap: 37000, revenue: 27000, operatingProfit: 4000, employees: 32000,
    founded: 1964, hq: "大阪府大阪市",
    desc: "リース・保険・不動産など多角的な金融サービス企業。",
    fact: "プロ野球「オリックス・バファローズ」の親会社でもある。関西国際空港の運営にも参画。"
  },
  {
    ticker: "6301", name: "小松製作所（コマツ）", sector: "機械",
    marketCap: 36000, revenue: 36000, operatingProfit: 5500, employees: 62000,
    founded: 1921, hq: "東京都港区",
    desc: "建設機械・鉱山機械の世界2位。ICT建機で世界の現場をDX化。",
    fact: "全世界の建機にGPSを搭載し稼働状況を管理。「スマートコンストラクション」で建設DXを牽引。"
  },
  {
    ticker: "9613", name: "NTTデータグループ", sector: "情報・通信業",
    marketCap: 34000, revenue: 23000, operatingProfit: 1700, employees: 196000,
    founded: 1988, hq: "東京都江東区",
    desc: "官公庁・金融機関のシステムを多数受注する大手ITサービス企業。",
    fact: "全銀システム（日本の銀行間送金網）の設計・運用を担う。障害発生時のニュース露出度も高い。"
  },
  {
    ticker: "6762", name: "TDK", sector: "電気機器",
    marketCap: 32000, revenue: 20000, operatingProfit: 1500, employees: 100000,
    founded: 1935, hq: "東京都中央区",
    desc: "電子部品の総合メーカー。スマホ向け電池や磁石でも世界的な存在感。",
    fact: "もとは磁気テープを開発した会社。今はEV用電池・センサーなど最先端分野に注力する。"
  },
  {
    ticker: "8267", name: "イオン", sector: "小売業",
    marketCap: 30000, revenue: 90000, operatingProfit: 2000, employees: 200000,
    founded: 1969, hq: "千葉県幕張市",
    desc: "日本最大の小売グループ。全国各地にイオンモールを展開。",
    fact: "グループ売上高は約9兆円で日本最大の小売業。アジアにも積極的に出店中。"
  },
  {
    ticker: "5401", name: "日本製鉄", sector: "鉄鋼",
    marketCap: 25000, revenue: 72000, operatingProfit: 5000, employees: 106000,
    founded: 1950, hq: "東京都千代田区",
    desc: "世界3〜4位の粗鋼生産量を誇る総合鉄鋼メーカー。",
    fact: "米国鉄鋼大手USスチールの買収を試みた。自動車用高張力鋼板（ハイテン）で高いシェア。"
  },
  {
    ticker: "9020", name: "東日本旅客鉄道（JR東日本）", sector: "陸運業",
    marketCap: 27000, revenue: 26000, operatingProfit: 3000, employees: 72000,
    founded: 1987, hq: "東京都渋谷区",
    desc: "東北・上越・北陸新幹線などを運営する日本最大の鉄道会社。",
    fact: "Suicaの発行枚数は約9,000万枚超。エキナカ商業施設など鉄道以外の事業も拡大している。"
  },
  {
    ticker: "7269", name: "スズキ", sector: "輸送用機器",
    marketCap: 26000, revenue: 47000, operatingProfit: 3500, employees: 66000,
    founded: 1920, hq: "静岡県浜松市",
    desc: "軽自動車と二輪車に強みを持つ自動車メーカー。インド市場を席巻。",
    fact: "インド自動車市場でのシェアは約40%超でNo.1。インド人にとってスズキは国民的ブランド。"
  },
  {
    ticker: "6752", name: "パナソニックホールディングス", sector: "電気機器",
    marketCap: 23000, revenue: 82000, operatingProfit: 2500, employees: 240000,
    founded: 1918, hq: "大阪府門真市",
    desc: "家電から車載電池まで展開する老舗電機メーカー。テスラにも電池供給。",
    fact: "テスラのEV向け円筒形電池を供給。米ネバダ州に巨大電池工場「ギガファクトリー」を共同運営。"
  },
  {
    ticker: "3407", name: "旭化成", sector: "化学",
    marketCap: 22000, revenue: 26000, operatingProfit: 1500, employees: 50000,
    founded: 1931, hq: "東京都千代田区",
    desc: "住宅・繊維・医療・電池材料まで多角展開する化学メーカー。",
    fact: "リチウムイオン電池の基礎研究でノーベル化学賞（2019年）を受賞した吉野彰氏が在籍。"
  },
  {
    ticker: "9202", name: "ANAホールディングス", sector: "空運業",
    marketCap: 18000, revenue: 21000, operatingProfit: 2000, employees: 45000,
    founded: 1952, hq: "東京都港区",
    desc: "国内最大の航空グループ。スターアライアンス加盟で世界各地に就航。",
    fact: "航空機保有数は約280機超。空飛ぶクルマや宇宙旅行など新たな移動ビジネスにも参入検討中。"
  },
  {
    ticker: "7261", name: "マツダ", sector: "輸送用機器",
    marketCap: 14000, revenue: 40000, operatingProfit: 2500, employees: 51000,
    founded: 1920, hq: "広島県安芸郡府中町",
    desc: "広島を拠点とする自動車メーカー。独自のロータリーエンジン技術を持つ。",
    fact: "「魂動（こどう）」デザインで世界的に評価が高い。ロータリーエンジンを搭載したスポーツカーRX-7は今も伝説的。"
  }
];

// 時価総額ランク（降順）を計算
const STOCKS_RANKED = [...STOCKS].sort((a, b) => b.marketCap - a.marketCap);
STOCKS.forEach(s => {
  s.rank = STOCKS_RANKED.findIndex(r => r.ticker === s.ticker) + 1;
  s.totalCount = STOCKS.length;
});

// ─── マクロイベント定義 ───────────────────────────────────────────────
const EVENTS = [
  {
    id: 'yenWeak', name: '円安進行',
    desc: '1ドル=155円台。輸出企業の円換算収益が膨らむ。',
    effects: [
      { sector: '輸送用機器', multiplier: 1.20 },
      { sector: '電気機器',   multiplier: 1.12 },
      { sector: 'ゴム製品',   multiplier: 1.08 },
      { sector: '機械',       multiplier: 1.05 },
    ]
  },
  {
    id: 'yenStrong', name: '急激な円高',
    desc: '1ドル=130円台に急騰。輸出型製造業に逆風。',
    effects: [
      { sector: '輸送用機器', multiplier: 0.85 },
      { sector: '電気機器',   multiplier: 0.88 },
      { sector: '機械',       multiplier: 0.90 },
    ]
  },
  {
    id: 'rateHike', name: '日銀利上げ',
    desc: '政策金利が上昇。銀行の利ざや拡大が期待される。',
    effects: [
      { sector: '銀行業',       multiplier: 1.25 },
      { sector: 'その他金融業', multiplier: 1.15 },
    ]
  },
  {
    id: 'aiDemand', name: 'AI特需爆発',
    desc: '生成AI需要が急増。半導体・IT関連株が急騰。',
    effects: [
      { sector: '電気機器',     multiplier: 1.30 },
      { sector: '情報・通信業', multiplier: 1.20 },
      { sector: '化学',         multiplier: 1.10 },
    ]
  },
  {
    id: 'resourceHigh', name: '資源価格高騰',
    desc: '原油・鉄鉱石が急騰。素材系企業に追い風。',
    effects: [
      { sector: '鉄鋼',       multiplier: 1.30 },
      { sector: '化学',       multiplier: 1.15 },
      { sector: '輸送用機器', multiplier: 0.92 },
    ]
  },
  {
    id: 'inbound', name: 'インバウンド急増',
    desc: '訪日外国人が過去最多を更新。観光・消費関連が恩恵。',
    effects: [
      { sector: 'サービス業', multiplier: 1.25 },
      { sector: '小売業',     multiplier: 1.20 },
      { sector: '空運業',     multiplier: 1.20 },
      { sector: '陸運業',     multiplier: 1.10 },
    ]
  },
  {
    id: 'evShift', name: 'EV化加速',
    desc: '世界でEV需要が急拡大。電池・部品メーカーに商機。',
    effects: [
      { sector: '電気機器',   multiplier: 1.18 },
      { sector: '化学',       multiplier: 1.12 },
      { sector: '輸送用機器', multiplier: 1.08 },
    ]
  },
  {
    id: 'drugApproval', name: '新薬承認ラッシュ',
    desc: '画期的新薬が相次いで承認。製薬セクターが急騰。',
    effects: [
      { sector: '医薬品', multiplier: 1.35 },
    ]
  },
  {
    id: 'tradeWar', name: '米中貿易摩擦激化',
    desc: '関税引き上げ合戦で製造業に打撃。',
    effects: [
      { sector: '輸送用機器', multiplier: 0.88 },
      { sector: '機械',       multiplier: 0.90 },
      { sector: '電気機器',   multiplier: 0.93 },
      { sector: '鉄鋼',       multiplier: 0.85 },
    ]
  },
  {
    id: 'digitalGovt', name: 'デジタル政府推進',
    desc: '政府がDX投資を大幅拡大。IT・通信企業に特需。',
    effects: [
      { sector: '情報・通信業', multiplier: 1.20 },
      { sector: 'サービス業',   multiplier: 1.10 },
    ]
  },
  {
    id: 'recession', name: '景気後退懸念',
    desc: '消費が冷え込む。ディフェンシブ銘柄が相対優位に。',
    effects: [
      { sector: '医薬品',       multiplier: 1.12 },
      { sector: '情報・通信業', multiplier: 1.05 },
      { sector: 'サービス業',   multiplier: 0.88 },
      { sector: '小売業',       multiplier: 0.92 },
    ]
  },
  {
    id: 'defense', name: '防衛費増額決定',
    desc: '防衛予算を大幅拡大。重工業・機械メーカーに期待。',
    effects: [
      { sector: '機械',     multiplier: 1.30 },
      { sector: '電気機器', multiplier: 1.10 },
    ]
  },
  {
    id: 'infrastructure', name: 'インフラ整備ブーム',
    desc: '大規模インフラ投資が始動。建設・素材セクターが上昇。',
    effects: [
      { sector: '鉄鋼', multiplier: 1.18 },
      { sector: '機械', multiplier: 1.15 },
      { sector: '化学', multiplier: 1.08 },
    ]
  },
  {
    id: 'tourism', name: '国内旅行ブーム',
    desc: '国内旅行需要が急回復。交通・サービスが好調。',
    effects: [
      { sector: '陸運業',     multiplier: 1.20 },
      { sector: '空運業',     multiplier: 1.25 },
      { sector: 'サービス業', multiplier: 1.10 },
    ]
  },
  {
    id: 'normal', name: '特になし',
    desc: '今ラウンドはイベントなし。純粋な実力勝負！',
    effects: []
  }
];

// ─── 指標定義 ─────────────────────────────────────────────────────────
const METRICS = [
  { id: 'marketCap',       label: '時価総額' },
  { id: 'revenue',         label: '売上高' },
  { id: 'operatingProfit', label: '営業利益' },
  { id: 'employees',       label: '従業員数' },
];

// ─── ヘルパー関数 ─────────────────────────────────────────────────────
function formatMarketCap(cap) {
  if (cap >= 10000) return `${(cap / 10000).toFixed(1)}兆円`;
  return `${cap.toLocaleString()}億円`;
}

function formatMetricValue(value, metric) {
  if (metric === 'employees') return `${value.toLocaleString()}人`;
  return formatMarketCap(value);
}

function getMetricLabel(metric) {
  const m = METRICS.find(x => x.id === metric);
  return m ? m.label : metric;
}

function getCapHint(cap) {
  if (cap >= 150000) return 'XL（15兆円〜）';
  if (cap >= 50000)  return 'L（5〜15兆円）';
  if (cap >= 10000)  return 'M（1〜5兆円）';
  return 'S（〜1兆円）';
}

function getMetricHint(value, metric) {
  if (metric === 'employees') {
    if (value >= 200000) return 'XL（20万人〜）';
    if (value >= 50000)  return 'L（5〜20万人）';
    if (value >= 10000)  return 'M（1〜5万人）';
    return 'S（〜1万人）';
  }
  return getCapHint(value);
}

function getSectorColor(sector) {
  const MAP = {
    '輸送用機器':   '#4488ff',
    '電気機器':     '#9966ff',
    '情報・通信業': '#00ccff',
    '銀行業':       '#ffaa00',
    '医薬品':       '#00cc66',
    '小売業':       '#ff8833',
    '化学':         '#00bbaa',
    '機械':         '#99aacc',
    'サービス業':   '#ff6699',
    'その他製品':   '#ff9966',
    'ゴム製品':     '#aacc00',
    'その他金融業': '#cc9900',
    '鉄鋼':         '#aa8866',
    '陸運業':       '#88bbcc',
    '空運業':       '#66aadd',
  };
  return MAP[sector] || '#778899';
}
