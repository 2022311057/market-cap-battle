// 日経225全構成銘柄データ（225社、時価総額・売上高・営業利益：億円、従業員数：人、2025年初頭概算値）
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
  },
  {
    ticker: "1332", name: "ニッスイ", sector: "水産・農林業",
    marketCap: 2800, revenue: 8200, operatingProfit: 320, employees: 16000,
    founded: 1911, hq: "東京都港区",
    desc: "大洋漁業を前身とする水産大手。冷凍食品やファインケミカルも展開する総合食品企業。",
    fact: "ちくわ等の練り物から冷凍餃子まで手がける。サプリメント原料のDHA・EPAでも世界トップシェアを持つ。"
  },
  {
    ticker: "1605", name: "INPEX", sector: "鉱業",
    marketCap: 26000, revenue: 17500, operatingProfit: 5500, employees: 4300,
    founded: 1966, hq: "東京都港区",
    desc: "日本最大の石油・天然ガス開発企業。豪州イクシスLNGなど海外権益が収益の柱。",
    fact: "国産原油・天然ガスの自主開発を目的に設立。社名のINPEXは「International Petroleum Exploration」の略。"
  },
  {
    ticker: "1721", name: "コムシスホールディングス", sector: "建設業",
    marketCap: 3700, revenue: 4250, operatingProfit: 460, employees: 21000,
    founded: 2001, hq: "東京都渋谷区",
    desc: "NTTグループ系列の電気通信工事大手。通信インフラ工事で国内最大級の規模を持つ。",
    fact: "スマホの通信網を支える電柱・基地局工事の裏方として、KDDIや楽天モバイル向け工事も拡大中。"
  },
  {
    ticker: "1801", name: "大成建設", sector: "建設業",
    marketCap: 9000, revenue: 19500, operatingProfit: 800, employees: 16500,
    founded: 1873, hq: "東京都新宿区",
    desc: "スーパーゼネコン最大手の一角。土木・建築の両分野で大型プロジェクトを多数手がける。",
    fact: "東京スカイツリーや羽田空港など日本を象徴する建造物の建設に携わった老舗ゼネコン。"
  },
  {
    ticker: "1802", name: "大林組", sector: "建設業",
    marketCap: 9500, revenue: 21000, operatingProfit: 890, employees: 9000,
    founded: 1892, hq: "東京都港区",
    desc: "スーパーゼネコンの一社。超高層ビルや橋梁などの大規模建築・土木で高い技術力を持つ。",
    fact: "あべのハルカスや東京スカイツリーの建設に参画。月面基地建設構想など未来技術研究でも知られる。"
  },
  {
    ticker: "1803", name: "清水建設", sector: "建設業",
    marketCap: 8000, revenue: 19000, operatingProfit: 440, employees: 10500,
    founded: 1804, hq: "東京都中央区",
    desc: "江戸時代創業の老舗スーパーゼネコン。寺社建築から最先端ビルまで幅広く手がける。",
    fact: "創業は1804年で200年を超える歴史を持つ。2024年3月期に上場以来初の営業赤字を計上したが翌期に黒字回復した。"
  },
  {
    ticker: "1808", name: "長谷工コーポレーション", sector: "建設業",
    marketCap: 5600, revenue: 12700, operatingProfit: 850, employees: 9000,
    founded: 1946, hq: "東京都港区",
    desc: "マンション建設で国内最大手のゼネコン。設計・施工から管理まで一貫体制を持つ。",
    fact: "国内で建てられる分譲マンションのおよそ4分の1は長谷工が手がけているとされる業界の巨人。"
  },
  {
    ticker: "1812", name: "鹿島", sector: "建設業",
    marketCap: 11000, revenue: 22500, operatingProfit: 950, employees: 8000,
    founded: 1840, hq: "東京都港区",
    desc: "国内最古参のスーパーゼネコン。土木分野で特に高い実績を持ち海外展開も積極的。",
    fact: "創業は江戸時代末期の1840年。社名は創業家の「鹿島」姓に由来し、土木売上では業界トップクラス。"
  },
  {
    ticker: "1925", name: "大和ハウス工業", sector: "建設業",
    marketCap: 25000, revenue: 54300, operatingProfit: 5460, employees: 74000,
    founded: 1955, hq: "大阪府大阪市",
    desc: "戸建てからマンション、商業施設まで手がける総合住宅メーカーの最大手。",
    fact: "プレハブ住宅「ミゼットハウス」で一躍有名になり、現在は物流施設開発でも国内トップクラス。"
  },
  {
    ticker: "1928", name: "積水ハウス", sector: "建設業",
    marketCap: 20000, revenue: 45000, operatingProfit: 3000, employees: 28000,
    founded: 1960, hq: "大阪府大阪市",
    desc: "戸建て住宅で国内最大手の住宅メーカー。賃貸・海外事業にも積極展開する。",
    fact: "2024年度に売上高が初の4兆円を突破。「人間性豊かな住まいの実現」を企業理念に掲げる。"
  },
  {
    ticker: "1963", name: "日揮ホールディングス", sector: "建設業",
    marketCap: 6200, revenue: 8600, operatingProfit: 350, employees: 8400,
    founded: 1928, hq: "横浜市西区",
    desc: "石油・ガスプラントの設計・建設を手がけるエンジニアリング大手。",
    fact: "国内外の大型LNGプラント建設で世界的な実績を持ち、近年は再生可能エネルギー分野にも進出。"
  },
  {
    ticker: "2002", name: "日清製粉グループ本社", sector: "食料品",
    marketCap: 4500, revenue: 6500, operatingProfit: 280, employees: 9700,
    founded: 1900, hq: "東京都千代田区",
    desc: "国内製粉業界の最大手。小麦粉やパスタ、健康食品など幅広い食品事業を展開する。",
    fact: "前身の館林製粉が1901年に日本初の機械製粉を開始。「日清」の名は中国・清国との関係ではなく独自命名。"
  },
  {
    ticker: "2269", name: "明治ホールディングス", sector: "食料品",
    marketCap: 10900, revenue: 11500, operatingProfit: 750, employees: 20000,
    founded: 2009, hq: "東京都中央区",
    desc: "明治製菓と明治乳業が統合した食品・医薬大手。菓子・乳製品・医薬品を展開する。",
    fact: "「きのこの山」「たけのこの里」やヨーグルト「明治ブルガリアヨーグルト」など国民的ロングセラーを抱える。"
  },
  {
    ticker: "2282", name: "日本ハム", sector: "食料品",
    marketCap: 5200, revenue: 14600, operatingProfit: 680, employees: 15700,
    founded: 1942, hq: "大阪府大阪市",
    desc: "国内食肉加工業界の最大手。ハム・ソーセージから加工食品まで幅広く展開する。",
    fact: "プロ野球「北海道日本ハムファイターズ」の親会社。創業者は「食とスポーツで社会貢献」を理念に球団を保有した。"
  },
  {
    ticker: "2413", name: "エムスリー", sector: "サービス業",
    marketCap: 12000, revenue: 1700, operatingProfit: 630, employees: 3000,
    founded: 2000, hq: "東京都港区",
    desc: "医療従事者向け情報サイトを運営するヘルスケアIT企業。製薬会社向けマーケティング支援が主力。",
    fact: "ソニー出身者が創業し、国内医師の大多数が登録する医療プラットフォーム「m3.com」を運営する。"
  },
  {
    ticker: "2432", name: "ディー・エヌ・エー", sector: "情報・通信業",
    marketCap: 3500, revenue: 1150, operatingProfit: 150, employees: 2300,
    founded: 1999, hq: "東京都渋谷区",
    desc: "モバイルゲームやスポーツ事業を手がけるIT企業。プロ野球球団も保有する。",
    fact: "プロ野球「横浜DeNAベイスターズ」の親会社。元々はオークションサイト運営から始まったベンチャー企業。"
  },
  {
    ticker: "2501", name: "サッポロホールディングス", sector: "食料品",
    marketCap: 6200, revenue: 5070, operatingProfit: 200, employees: 6100,
    founded: 1876, hq: "東京都渋谷区",
    desc: "国内ビール業界の老舗。ビール・飲料事業のほか不動産事業（恵比寿ガーデンプレイス等）も展開する。",
    fact: "日本最古のビールブランド「サッポロビール」を持つ。開拓使麦酒醸造所として北海道で誕生した。"
  },
  {
    ticker: "2502", name: "アサヒグループホールディングス", sector: "食料品",
    marketCap: 28000, revenue: 28500, operatingProfit: 2400, employees: 30000,
    founded: 1889, hq: "東京都墨田区",
    desc: "「スーパードライ」で知られる国内ビール最大手。欧州など海外飲料事業も拡大している。",
    fact: "1987年発売の「アサヒスーパードライ」が大ヒットし、ビール業界の勢力図を一変させた。"
  },
  {
    ticker: "2503", name: "キリンホールディングス", sector: "食料品",
    marketCap: 18000, revenue: 24300, operatingProfit: 1900, employees: 30000,
    founded: 1907, hq: "東京都中央区",
    desc: "ビール大手の一角で、医薬・ヘルスサイエンス事業にも積極展開する総合飲料企業。",
    fact: "「キリン一番搾り」など主力ブランドを持つ一方、協和発酵キリンを通じ医薬品事業も強化している。"
  },
  {
    ticker: "2768", name: "双日", sector: "卸売業",
    marketCap: 6800, revenue: 19900, operatingProfit: 1100, employees: 18000,
    founded: 2004, hq: "東京都千代田区",
    desc: "日商岩井とニチメンが合併して発足した総合商社。自動車・航空機・化学品など幅広い分野を扱う。",
    fact: "海外向け中古車輸出や航空機リースなど、大手商社の中でもニッチな分野に強みを持つ。"
  },
  {
    ticker: "2801", name: "キッコーマン", sector: "食料品",
    marketCap: 13700, revenue: 7100, operatingProfit: 650, employees: 11000,
    founded: 1917, hq: "千葉県野田市",
    desc: "しょうゆ業界の世界的リーダー。海外売上比率が高く、国際的な食品メーカーへ成長した。",
    fact: "創業は江戸時代の醸造業に遡る。アメリカでの醤油生産を早期に始め、世界の食卓に和食文化を広めた。"
  },
  {
    ticker: "2802", name: "味の素", sector: "食料品",
    marketCap: 30900, revenue: 11640, operatingProfit: 1140, employees: 34000,
    founded: 1917, hq: "東京都中央区",
    desc: "うま味調味料「味の素」を生んだ食品・アミノ酸大手。バイオ・ヘルスケア分野にも展開する。",
    fact: "うま味成分グルタミン酸の発見から誕生。半導体材料「ABF」は世界シェアのほぼ全てを握る隠れた技術企業。"
  },
  {
    ticker: "285A", name: "キオクシアホールディングス", sector: "電気機器",
    marketCap: 50000, revenue: 23400, operatingProfit: 8700, employees: 6500,
    founded: 2017, hq: "東京都港区",
    desc: "NAND型フラッシュメモリの世界大手。旧東芝メモリ事業を前身に持つ半導体メーカー。",
    fact: "世界初のNAND型フラッシュメモリを発明した東芝の技術を継承。2024年末に新規上場し話題となった。"
  },
  {
    ticker: "2871", name: "ニチレイ", sector: "食料品",
    marketCap: 4400, revenue: 7020, operatingProfit: 380, employees: 9000,
    founded: 1945, hq: "東京都中央区",
    desc: "冷凍食品・低温物流の大手。家庭用冷凍食品から食品物流まで幅広く手がける。",
    fact: "「から揚げ」など冷凍食品のロングセラーを多数抱え、コールドチェーン物流網でも国内最大級。"
  },
  {
    ticker: "2914", name: "JT", sector: "食料品",
    marketCap: 100000, revenue: 31500, operatingProfit: 7000, employees: 52900,
    founded: 1985, hq: "東京都港区",
    desc: "国内たばこ事業の独占的地位を持つ大手。海外たばこ事業や医薬・加工食品も展開する。",
    fact: "日本専売公社の民営化により誕生。海外たばこ事業の売上比率は今や国内をはるかに上回る。"
  },
  {
    ticker: "3086", name: "J.フロント リテイリング", sector: "小売業",
    marketCap: 5000, revenue: 4420, operatingProfit: 280, employees: 8000,
    founded: 2007, hq: "東京都千代田区",
    desc: "大丸・松坂屋を統括する百貨店持株会社。パルコなど商業施設運営も手がける。",
    fact: "大丸と松坂屋という老舗百貨店2社が統合して誕生。インバウンド需要回復の象徴的存在となった。"
  },
  {
    ticker: "3092", name: "ZOZO", sector: "小売業",
    marketCap: 12300, revenue: 2050, operatingProfit: 700, employees: 1800,
    founded: 1998, hq: "千葉県千葉市",
    desc: "ファッションEC「ZOZOTOWN」を運営するアパレル通販大手。",
    fact: "創業者前澤友作氏が「スタートトゥデイ」として創業。月の私的旅行計画でも世界的に話題になった。"
  },
  {
    ticker: "3099", name: "三越伊勢丹ホールディングス", sector: "小売業",
    marketCap: 6500, revenue: 5560, operatingProfit: 350, employees: 12000,
    founded: 2008, hq: "東京都新宿区",
    desc: "三越と伊勢丹が統合した国内最大級の百貨店グループ。",
    fact: "三越は江戸時代の越後屋を起源とする日本最古の百貨店の一つ。インバウンド消費の恩恵を大きく受けた。"
  },
  {
    ticker: "3289", name: "東急不動産ホールディングス", sector: "不動産業",
    marketCap: 6500, revenue: 12460, operatingProfit: 1670, employees: 17000,
    founded: 1953, hq: "東京都渋谷区",
    desc: "東急グループの不動産持株会社。渋谷再開発やリゾート事業を幅広く展開する。",
    fact: "渋谷ヒカリエなど渋谷駅周辺の大規模再開発を主導。5期連続の増収増益を達成した実力企業。"
  },
  {
    ticker: "3401", name: "帝人", sector: "繊維製品",
    marketCap: 3300, revenue: 10060, operatingProfit: 400, employees: 16000,
    founded: 1918, hq: "大阪府大阪市",
    desc: "炭素繊維やヘルスケア事業を展開する総合化学・繊維メーカー。",
    fact: "「テイジン」の名は帝国人造絹絲に由来。人工透析など医療機器分野でも存在感を持つ。"
  },
  {
    ticker: "3402", name: "東レ", sector: "繊維製品",
    marketCap: 15400, revenue: 25850, operatingProfit: 1420, employees: 49000,
    founded: 1926, hq: "東京都中央区",
    desc: "炭素繊維で世界トップシェアを持つ総合化学メーカー。航空機材料から水処理膜まで幅広く展開する。",
    fact: "ボーイング787の主翼に採用される炭素繊維を供給。「東洋レーヨン」の略称が社名の由来。"
  },
  {
    ticker: "3405", name: "クラレ", sector: "化学",
    marketCap: 5179, revenue: 8084, operatingProfit: 589, employees: 11906,
    founded: 1926, hq: "東京都千代田区",
    desc: "ビニロン・PVA樹脂などの機能化学品を世界展開する素材メーカー。多数の世界シェアトップ製品を持つ。",
    fact: "創業のビニロン繊維は世界初の国産合成繊維で、クラレの社名はその「ビニロン」由来とも言われる。"
  },
  {
    ticker: "3436", name: "SUMCO", sector: "化学",
    marketCap: 12791, revenue: 4136, operatingProfit: -180, employees: 9850,
    founded: 1999, hq: "東京都港区",
    desc: "半導体製造に不可欠なシリコンウェーハの世界大手メーカー。300mm品で高シェアを持つ。",
    fact: "シリコンウェーハの純度は99.9999999%（イレブンナイン）以上で、地球上で最も精製された物質の一つとされる。"
  },
  {
    ticker: "3659", name: "ネクソン", sector: "情報・通信業",
    marketCap: 26752, revenue: 4751, operatingProfit: 870, employees: 6683,
    founded: 1994, hq: "東京都港区",
    desc: "韓国・ソウルで創業し2005年に本社を東京へ移転したオンラインゲーム大手。「メイプルストーリー」などが代表作。",
    fact: "韓国発のゲーム会社だが東証プライム上場で日本企業として扱われる珍しい二重国籍的存在。"
  },
  {
    ticker: "3697", name: "SHIFT", sector: "情報・通信業",
    marketCap: 4657, revenue: 1563, operatingProfit: 156, employees: 15768,
    founded: 2005, hq: "東京都港区",
    desc: "ソフトウェアの品質保証・テスト専門会社として急成長し、IT業界の「縁の下の力持ち」的存在。",
    fact: "創業からM&Aを重ね20年弱で従業員数1万5千人超に拡大、東証一部上場後も増収増益を継続中。"
  },
  {
    ticker: "3861", name: "王子ホールディングス", sector: "化学",
    marketCap: 8693, revenue: 18617, operatingProfit: 346, employees: 39136,
    founded: 1949, hq: "東京都中央区",
    desc: "国内製紙業界最大手の持株会社。紙・パルプから機能材料まで幅広く展開する総合製紙グループ。",
    fact: "財閥解体で分割された初代王子製紙の後継3社の一つで、海外の植林事業も大規模に手がける。"
  },
  {
    ticker: "4004", name: "レゾナック・ホールディングス", sector: "化学",
    marketCap: 32043, revenue: 13471, operatingProfit: 400, employees: 26054,
    founded: 1939, hq: "東京都港区",
    desc: "昭和電工と日立化成が統合して誕生した半導体材料・機能化学品メーカー。半導体パッケージング材料で高シェア。",
    fact: "社名のResonacは「Resonance（共鳴）」が由来で、旧昭和電工と旧日立化成の技術融合を象徴している。"
  },
  {
    ticker: "4005", name: "住友化学", sector: "化学",
    marketCap: 10345, revenue: 23285, operatingProfit: 1517, employees: 29279,
    founded: 1925, hq: "東京都中央区",
    desc: "石油化学から農薬・医薬・電子材料まで手がける総合化学大手。住友グループの中核企業。",
    fact: "起源は別子銅山の精錬で出る亜硫酸ガスを肥料に変えた公害対策事業で、環境対策から生まれた会社。"
  },
  {
    ticker: "4021", name: "日産化学", sector: "化学",
    marketCap: 10760, revenue: 2796, operatingProfit: 636, employees: 2044,
    founded: 1887, hq: "東京都中央区",
    desc: "日本初の化学肥料会社として誕生し、現在は農薬・機能化学品・医薬品中間体を手がける高収益企業。",
    fact: "従業員数は他大手化学より少ないが自己資本比率71.9%と非常に高く、効率経営で知られる優良企業。"
  },
  {
    ticker: "4042", name: "東ソー", sector: "化学",
    marketCap: 8520, revenue: 10199, operatingProfit: 955, employees: 14850,
    founded: 1935, hq: "東京都中央区",
    desc: "塩化ビニル・石油化学から機能性ポリマー、バイオサイエンスまで幅広く展開する総合化学メーカー。",
    fact: "南陽事業所を中心に19カ国・約50拠点を展開し、国外従業員比率は約24%とグローバル化が進んでいる。"
  },
  {
    ticker: "4043", name: "トクヤマ", sector: "化学",
    marketCap: 2674, revenue: 3495, operatingProfit: 370, employees: 5734,
    founded: 1918, hq: "山口県周南市",
    desc: "ソーダ工業から発展し、現在は半導体用高純度ポリシリコンとセメント事業を主力とする化学メーカー。",
    fact: "高純度ポリシリコンの生産量は世界第2位で、純度は99.999999999%（イレブンナイン）に達する。"
  },
  {
    ticker: "4061", name: "デンカ", sector: "化学",
    marketCap: 3992, revenue: 3842, operatingProfit: 262, employees: 6542,
    founded: 1915, hq: "東京都中央区",
    desc: "電気化学工業として創業し、特殊セラミックスやリチウムイオン電池材料などの先端素材を手がける。",
    fact: "1915年に水力発電を活用した電気化学から始まり、社名の「デンカ」はその「電気化学」に由来する。"
  },
  {
    ticker: "4062", name: "イビデン", sector: "電気機器",
    marketCap: 5580, revenue: 4162, operatingProfit: 620, employees: 11168,
    founded: 1912, hq: "岐阜県大垣市",
    desc: "ICパッケージ基板やセラミックス製品を手掛ける電子部品メーカーで、半導体向け基板で世界トップシェア。",
    fact: "AI半導体ブームでICパッケージ基板需要が急増し、生成AI関連投資の恩恵を受ける代表企業の一つ。"
  },
  {
    ticker: "4151", name: "協和キリン", sector: "医薬品",
    marketCap: 12281, revenue: 4968, operatingProfit: 872, employees: 5974,
    founded: 1949, hq: "東京都千代田区",
    desc: "キリンホールディングス傘下の製薬会社。バイオ医薬品を中心に腎・がん・免疫領域で強みを持つ。",
    fact: "もとは「協和醱酵工業」という発酵技術の会社で、ビールのキリンとは兄弟会社という珍しい出自を持つ。"
  },
  {
    ticker: "4183", name: "三井化学", sector: "化学",
    marketCap: 8045, revenue: 16687, operatingProfit: 738, employees: 18933,
    founded: 1955, hq: "東京都港区",
    desc: "三井東圧化学と三井石油化学が合併し誕生した総合化学大手。PETやポリプロピレン触媒で世界シェア上位。",
    fact: "歯科材料や不織布のおむつ素材など、生活に密着した世界シェアNo.1製品を多数持つ「隠れた素材王」。"
  },
  {
    ticker: "4188", name: "三菱ケミカルグループ", sector: "化学",
    marketCap: 15322, revenue: 37040, operatingProfit: 301, employees: 56678,
    founded: 1933, hq: "東京都千代田区",
    desc: "国内化学最大手の持株会社。石化製品から炭素繊維、医薬品まで幅広い事業を抱える複合化学グループ。",
    fact: "売上は化学業界トップ級だが2026年3月期は一過性損失で営業利益が79%減少、コア営業利益は底堅く推移した。"
  },
  {
    ticker: "4208", name: "UBE", sector: "化学",
    marketCap: 3378, revenue: 7623, operatingProfit: 189, employees: 11243,
    founded: 1897, hq: "山口県宇部市",
    desc: "旧宇部興産。炭鉱業から発展した山口県発の総合化学メーカーで、ナイロン樹脂やセメント、防衛機器も手がける。",
    fact: "2022年に通称だった「UBE」を正式社名化。本社は今も創業の地・山口県宇部市に置かれている。"
  },
  {
    ticker: "4307", name: "野村総合研究所", sector: "情報・通信業",
    marketCap: 29021, revenue: 7648, operatingProfit: 1349, employees: 16679,
    founded: 1965, hq: "東京都千代田区",
    desc: "日本初の民間総合シンクタンクを起源に持つコンサルティング・ITソリューション大手。",
    fact: "シンクタンクとシステム会社が合併して誕生した経歴を持ち、金融系システムで国内屈指の実績を持つ。"
  },
  {
    ticker: "4324", name: "電通グループ", sector: "サービス業",
    marketCap: 8659, revenue: 14352, operatingProfit: -2892, employees: 67454,
    founded: 1901, hq: "東京都港区",
    desc: "1901年創業の国内最大手広告代理店で、国内外600社超の企業グループを統括する持株会社。",
    fact: "120年以上の歴史を持つが、海外M&A関連の一過性損失で2025年12月期は営業損失を計上した。"
  },
  {
    ticker: "4385", name: "メルカリ", sector: "情報・通信業",
    marketCap: 4231, revenue: 1926, operatingProfit: 278, employees: 2000,
    founded: 2013, hq: "東京都港区",
    desc: "フリマアプリ「メルカリ」を運営する国内最大手のCtoCマーケットプレイス企業。",
    fact: "創業時の社名は「コウゾウ」で、同年中にサービス名と同じ「メルカリ」に商号変更した。"
  },
  {
    ticker: "4452", name: "花王", sector: "化学",
    marketCap: 31513, revenue: 16886, operatingProfit: 1641, employees: 34000,
    founded: 1925, hq: "東京都中央区",
    desc: "洗剤・化粧品で国内最大手の日用品メーカー。「メリーズ」「ビオレ」など多くの定番ブランドを持つ。",
    fact: "社名は当初「花王石鹸」で、顔を洗う上等な石鹸を意味する「顔」と「香」を掛けた語感から名付けられたという説がある。"
  },
  {
    ticker: "4503", name: "アステラス製薬", sector: "医薬品",
    marketCap: 42000, revenue: 21392, operatingProfit: 5557, employees: 14754,
    founded: 2005, hq: "東京都中央区",
    desc: "山之内製薬と藤沢薬品工業が合併して誕生した国内大手製薬会社。がんや泌尿器領域に強い。",
    fact: "合併で生まれた会社だが、源流をたどると江戸時代創業の薬種商にまで遡る老舗の血を引いている。"
  },
  {
    ticker: "4506", name: "住友ファーマ", sector: "医薬品",
    marketCap: 8019, revenue: 3988, operatingProfit: 288, employees: 3832,
    founded: 1897, hq: "大阪府大阪市中央区",
    desc: "住友化学グループの製薬会社。大日本製薬と住友製薬の合併を経て現体制に。北米事業の浮沈が業績を左右。",
    fact: "主力薬の特許切れ「パテントクリフ」で経営危機に陥り、事業再編が大きな経営課題になった代表例。"
  },
  {
    ticker: "4507", name: "塩野義製薬", sector: "医薬品",
    marketCap: 19309, revenue: 4383, operatingProfit: 1566, employees: 5313,
    founded: 1919, hq: "大阪府大阪市中央区",
    desc: "感染症領域に強い大阪発の製薬会社。新型コロナ治療薬の開発でも注目された。",
    fact: "創業者・塩野義三郎が薩摩藩出身の薬種商から身を起こし、感染症分野を一貫して得意としてきた。"
  },
  {
    ticker: "4523", name: "エーザイ", sector: "医薬品",
    marketCap: 11943, revenue: 7894, operatingProfit: 544, employees: 10917,
    founded: 1941, hq: "東京都文京区",
    desc: "認知症治療薬「レケンビ」で知られる研究開発型製薬会社。中枢神経領域に強み。",
    fact: "アルツハイマー病の原因物質を取り除く薬を世界に先駆けて実用化し、数十年来の研究の蓄積が結実した。"
  },
  {
    ticker: "4543", name: "テルモ", sector: "精密機器",
    marketCap: 32483, revenue: 10362, operatingProfit: 2034, employees: 31185,
    founded: 1921, hq: "東京都渋谷区",
    desc: "国産体温計の製造から始まった医療機器大手。カテーテルや輸血関連製品で世界的シェアを持つ。",
    fact: "ドイツ製体温計の輸入が止まった第一次大戦後、国産化を目指す医師たちの出資で生まれた会社が起源。"
  },
  {
    ticker: "4568", name: "第一三共", sector: "医薬品",
    marketCap: 47234, revenue: 21230, operatingProfit: 2291, employees: 16000,
    founded: 2005, hq: "東京都中央区",
    desc: "三共と第一製薬の経営統合で誕生した国内最大手製薬会社。抗体薬物複合体（ADC）で世界をリード。",
    fact: "抗がん剤「エンハーツ」が世界的大ヒットとなり、日本発のADC技術がグローバル製薬大手を脅かす存在になった。"
  },
  {
    ticker: "4578", name: "大塚ホールディングス", sector: "医薬品",
    marketCap: 46861, revenue: 24000, operatingProfit: 4794, employees: 35338,
    founded: 2008, hq: "東京都千代田区",
    desc: "「ポカリスエット」などの消費者向け事業も持つ医療・食品コングロマリット。精神疾患薬にも強い。",
    fact: "もとは徳島の化学原料メーカーで、創業は1921年。オロナインやポカリスエットを生んだ独創的な研究文化が有名。"
  },
  {
    ticker: "4689", name: "LINEヤフー", sector: "情報・通信業",
    marketCap: 36219, revenue: 20363, operatingProfit: 3150, employees: 12131,
    founded: 1996, hq: "東京都千代田区",
    desc: "LINEとヤフーが2023年に経営統合して誕生した、メッセージング・検索・ECを擁する国内最大級のIT企業。",
    fact: "もとは1996年設立のヤフー株式会社で、メッセージアプリLINEとの統合により国民的サービスを一体運営する。"
  },
  {
    ticker: "4704", name: "トレンドマイクロ", sector: "情報・通信業",
    marketCap: 11198, revenue: 2760, operatingProfit: 575, employees: 6717,
    founded: 1989, hq: "東京都新宿区",
    desc: "法人・個人向けサイバーセキュリティ製品を提供する世界的セキュリティベンダー。",
    fact: "日本発ながら世界中で事業展開するグローバルセキュリティ企業で、AI活用の次世代SOCで成長を続けている。"
  },
  {
    ticker: "4751", name: "サイバーエージェント", sector: "サービス業",
    marketCap: 6419, revenue: 2324, operatingProfit: 420, employees: 2588,
    founded: 1998, hq: "東京都渋谷区",
    desc: "ネット広告事業を起点に、ABEMAなどメディア・ゲーム事業を展開する渋谷発のIT企業。",
    fact: "藤田晋氏が26歳で創業し、当時最年少で東証マザーズ上場を果たした「渋谷ベンチャー」の代表格。"
  },
  {
    ticker: "4755", name: "楽天グループ", sector: "情報・通信業",
    marketCap: 18137, revenue: 24965, operatingProfit: 143, employees: 29419,
    founded: 1997, hq: "東京都世田谷区",
    desc: "楽天市場を中核に金融・モバイルまで広く展開する国内最大級のインターネットコングロマリット。",
    fact: "わずか6人のベンチャーから創業し、現在はEC・金融・通信を横断する経済圏「楽天エコシステム」を築いた。"
  },
  {
    ticker: "4901", name: "富士フイルムホールディングス", sector: "化学",
    marketCap: 39555, revenue: 31958, operatingProfit: 3302, employees: 73000,
    founded: 1934, hq: "東京都港区",
    desc: "写真フイルムから医療・ヘルスケア、半導体材料まで事業を多角化した複合企業。",
    fact: "かつて世界2強だった写真フイルム事業の縮小を乗り越え、化粧品や再生医療にも進出した「変身上手」企業。"
  },
  {
    ticker: "4902", name: "コニカミノルタ", sector: "電気機器",
    marketCap: 2975, revenue: 11278, operatingProfit: 80, employees: 35631,
    founded: 1873, hq: "東京都千代田区",
    desc: "複合機・オフィス機器を中核に、ヘルスケアや計測機器事業も展開する精密機器メーカー。",
    fact: "カメラの「コニカ」とプリンターの「ミノルタ」が2003年に統合して誕生した会社。"
  },
  {
    ticker: "4911", name: "資生堂", sector: "化学",
    marketCap: 9128, revenue: 9700, operatingProfit: 445, employees: 31000,
    founded: 1872, hq: "東京都港区",
    desc: "1872年創業の日本最大手化粧品メーカー。世界120以上の国・地域で事業を展開。",
    fact: "創業は西洋薬学を取り入れた調剤薬局からスタート。後に化粧品事業へ転身し世界企業に成長した。"
  },
  {
    ticker: "5019", name: "出光興産", sector: "石油・石炭製品",
    marketCap: 12928, revenue: 91902, operatingProfit: 1622, employees: 14363,
    founded: 1911, hq: "東京都千代田区",
    desc: "昭和シェル石油と統合した国内大手石油元売り。燃料から石油化学まで幅広く展開。",
    fact: "創業者・出光佐三の生涯は小説「海賊と呼ばれた男」のモデルとして有名。"
  },
  {
    ticker: "5020", name: "ENEOSホールディングス", sector: "石油・石炭製品",
    marketCap: 32873, revenue: 126000, operatingProfit: 2500, employees: 34238,
    founded: 1888, hq: "東京都千代田区",
    desc: "国内最大の石油元売り・エネルギー企業グループ。ガソリンスタンド網は国内最大規模。",
    fact: "前身は日本石油・三菱石油などが統合を重ねて誕生。原油価格変動で営業利益が大きく振れやすい業種特性を持つ。"
  },
  {
    ticker: "5101", name: "横浜ゴム", sector: "ゴム製品",
    marketCap: 10100, revenue: 10947, operatingProfit: 1192, employees: 34471,
    founded: 1917, hq: "神奈川県平塚市",
    desc: "「YOKOHAMA」ブランドで知られる大手タイヤメーカー。産業用品事業も展開。",
    fact: "古河電工と米B.F.グッドリッチの合弁で誕生し、2024年度に創業以来初の売上1兆円超えを達成。"
  },
  {
    ticker: "5201", name: "AGC", sector: "ガラス・土石製品",
    marketCap: 15538, revenue: 20588, operatingProfit: 1275, employees: 52900,
    founded: 1907, hq: "東京都千代田区",
    desc: "旧旭硝子。板ガラス・自動車ガラスで世界トップシェアを持つ総合素材メーカー。",
    fact: "三菱財閥の岩崎家が設立。建築用・車用ガラスに加え、半導体材料やフッ素化学品も手がける。"
  },
  {
    ticker: "5214", name: "日本電気硝子", sector: "ガラス・土石製品",
    marketCap: 5767, revenue: 3114, operatingProfit: 341, employees: 17780,
    founded: 1949, hq: "滋賀県大津市",
    desc: "ディスプレイ用ガラスや光通信用ガラス部材で世界的シェアを持つ専門ガラスメーカー。",
    fact: "日本電気硝子の前身は日本電気（NEC）の関連会社として発足。液晶ディスプレイ向けガラス基板で世界をリードした。"
  },
  {
    ticker: "5233", name: "太平洋セメント", sector: "ガラス・土石製品",
    marketCap: 4353, revenue: 9150, operatingProfit: 778, employees: 12586,
    founded: 1881, hq: "東京都港区",
    desc: "国内最大手のセメントメーカー。骨材や環境リサイクル事業も展開する総合素材企業。",
    fact: "1998年に小野田セメントと秩父セメントが合併して誕生。廃棄物をセメント原料に活用する環境技術にも強い。"
  },
  {
    ticker: "5301", name: "東海カーボン", sector: "ガラス・土石製品",
    marketCap: 1500, revenue: 3210, operatingProfit: 250, employees: 7000,
    founded: 1918, hq: "東京都港区",
    desc: "黒鉛電極やカーボンブラックなど特殊炭素製品を製造するグローバル素材メーカー。",
    fact: "製鉄の電炉に使う黒鉛電極で世界トップクラスのシェアを持ち、半導体製造装置部材も手がける。"
  },
  {
    ticker: "5332", name: "TOTO", sector: "ガラス・土石製品",
    marketCap: 14195, revenue: 7374, operatingProfit: 537, employees: 33386,
    founded: 1917, hq: "福岡県北九州市",
    desc: "トイレ・浴室・洗面・キッチンなど水まわり住宅設備の国内最大手メーカー。",
    fact: "節水トイレや温水洗浄便座「ウォシュレット」を生み出し、世界の衛生陶器市場をリードする技術力を持つ。"
  },
  {
    ticker: "5333", name: "日本ガイシ", sector: "ガラス・土石製品",
    marketCap: 21475, revenue: 6701, operatingProfit: 950, employees: 19931,
    founded: 1919, hq: "愛知県名古屋市瑞穂区",
    desc: "碍子（がいし）やセラミック部品を製造し、自動車排ガス浄化触媒担体で世界トップシェアを持つ企業。",
    fact: "自動車用セラミック触媒担体で世界シェア約3割を握り、AI半導体需要拡大で業績が過去最高を更新中。"
  },
  {
    ticker: "5406", name: "神戸製鋼所", sector: "鉄鋼",
    marketCap: 7745, revenue: 25550, operatingProfit: 1587, employees: 39294,
    founded: 1905, hq: "兵庫県神戸市中央区",
    desc: "鉄鋼・アルミ・機械・建設機械・電力など多角的事業を展開する総合素材・機械メーカー。",
    fact: "鉄鋼だけでなく建設機械やコンプレッサ、電力事業も持つ多角経営が特徴。データ偽装問題からの信頼回復を進めた歴史も。"
  },
  {
    ticker: "5411", name: "JFEホールディングス", sector: "鉄鋼",
    marketCap: 10525, revenue: 48596, operatingProfit: 1651, employees: 61296,
    founded: 2002, hq: "東京都千代田区",
    desc: "JFEスチール・JFEエンジニアリング・JFE商事を傘下に持つ国内2位の鉄鋼持株会社。",
    fact: "川崎製鉄と日本鋼管(NKK)が2002年に統合して誕生。粗鋼生産量は国内2位、世界でも上位の規模を誇る。"
  },
  {
    ticker: "543A", name: "ARCHION", sector: "電気機器",
    marketCap: 3000, revenue: 800, operatingProfit: 150, employees: 1200,
    founded: 2021, hq: "東京都品川区",
    desc: "2025年新規上場の半導体関連企業。先端半導体材料・製造装置分野で事業を展開する成長企業。",
    fact: "半導体関連の新興企業は上場直後に時価総額が急変動しやすく、初値が業績の何十倍にもなることがある。"
  },
  {
    ticker: "5631", name: "日本製鋼所", sector: "機械",
    marketCap: 3854, revenue: 2475, operatingProfit: 228, employees: 5419,
    founded: 1907, hq: "東京都品川区",
    desc: "北海道室蘭で創業した老舗重工メーカー。射出成形機や産業機械、医療機器などを製造する。",
    fact: "1907年に英国企業との合弁で日本初の民間兵器工場として室蘭に設立された、日本の重工業の原点的企業。"
  },
  {
    ticker: "5706", name: "三井金属", sector: "非鉄金属",
    marketCap: 2678, revenue: 7585, operatingProfit: 1309, employees: 12285,
    founded: 1950, hq: "東京都品川区",
    desc: "銅箔・電池材料を主力とする非鉄金属大手。2025年に三井金属株式会社へ社名変更した。",
    fact: "EV電池に使われる銅箔の販売拡大で増収増益を続け、社名変更でブランドを一新した注目企業。"
  },
  {
    ticker: "5711", name: "三菱マテリアル", sector: "非鉄金属",
    marketCap: 3866, revenue: 14336, operatingProfit: 231, employees: 5450,
    founded: 1950, hq: "東京都千代田区",
    desc: "銅・セメント・金属加工を手がける総合非鉄金属メーカー。三菱グループの中核企業の一つ。",
    fact: "前期は売上が約4割増となる大幅増収を記録し、資源価格上昇の波を大きく取り込んだ。"
  },
  {
    ticker: "5713", name: "住友金属鉱山", sector: "非鉄金属",
    marketCap: 23134, revenue: 17416, operatingProfit: 2090, employees: 7402,
    founded: 1950, hq: "東京都港区",
    desc: "別子銅山を起源とする住友グループの非鉄金属大手。銅・金の製錬と電池材料事業を展開。",
    fact: "起源は1691年の別子銅山開発で、江戸時代から続く300年以上の歴史が住友財閥の礎となった。"
  },
  {
    ticker: "5714", name: "DOWAホールディングス", sector: "非鉄金属",
    marketCap: 5877, revenue: 7100, operatingProfit: 270, employees: 11337,
    founded: 1884, hq: "東京都千代田区",
    desc: "旧同和鉱業。非鉄金属製錬・リサイクル・環境事業を担う持株会社で藤田財閥が起源。",
    fact: "前身の藤田組は明治期の藤田財閥の中核で、廃棄物から金属を取り出すリサイクル技術にも強い。"
  },
  {
    ticker: "5801", name: "古河電気工業", sector: "非鉄金属",
    marketCap: 37707, revenue: 13076, operatingProfit: 639, employees: 52757,
    founded: 1896, hq: "東京都千代田区",
    desc: "古河財閥系の電線・ケーブル大手。情報通信・自動車部品・電子部品も手がける総合電気メーカー。",
    fact: "創業者古河市兵衛は古河財閥の祖で、光ファイバーなど通信インフラ技術の先駆者として知られる。"
  },
  {
    ticker: "5802", name: "住友電気工業", sector: "非鉄金属",
    marketCap: 79513, revenue: 44028, operatingProfit: 2266, employees: 293266,
    founded: 1897, hq: "大阪府大阪市中央区",
    desc: "電線・ケーブル大手で自動車用ワイヤーハーネスや光通信部品など幅広く展開する総合電線メーカー。",
    fact: "自動車用ワイヤーハーネスで世界トップシェアを持ち、データセンター向け光関連製品の需要急増で過去最高益を記録した。"
  },
  {
    ticker: "5803", name: "フジクラ", sector: "非鉄金属",
    marketCap: 60836, revenue: 9794, operatingProfit: 1355, employees: 51257,
    founded: 1910, hq: "東京都江東区",
    desc: "光ファイバー・電線で知られる老舗電線メーカーで、近年はデータセンター向け通信部品事業が急成長。",
    fact: "生成AI向けデータセンター需要の急拡大で2025年3月期は営業利益が前年比95％増という驚異的な伸びを記録した。"
  },
  {
    ticker: "5831", name: "しずおかフィナンシャルグループ", sector: "銀行業",
    marketCap: 15733, revenue: 4385, operatingProfit: 1302, employees: 4134,
    founded: 1943, hq: "静岡県静岡市葵区",
    desc: "静岡銀行を中核とする地方銀行持株会社で、2022年に単独株式移転により設立された静岡県最大の金融グループ。",
    fact: "静岡銀行の前身を遡ると合併した銀行は128行にも及び、地方銀行の中でも極めて高い健全性を誇る優良地銀として知られる。"
  },
  {
    ticker: "6103", name: "オークマ", sector: "機械",
    marketCap: 3078, revenue: 2068, operatingProfit: 147, employees: 4071,
    founded: 1898, hq: "愛知県丹羽郡大口町",
    desc: "日系大手工作機械メーカーの一つで、NC旋盤やマシニングセンタなど高精度な工作機械を製造する専業メーカー。",
    fact: "創業者は元警察官で、当初は製麺機械を作っていたが、わずか数年後に工作機械製造へ転身し今日の地位を築いた。"
  },
  {
    ticker: "6113", name: "アマダ", sector: "機械",
    marketCap: 8349, revenue: 3967, operatingProfit: 404, employees: 8997,
    founded: 1948, hq: "神奈川県伊勢原市",
    desc: "板金加工機械（レーザー切断機・プレス機など）で国内トップシェアを誇る金属加工機械のグローバルメーカー。",
    fact: "世界100カ国以上で板金・溶接・切削などの機械事業を展開し、グループ会社は国内外で99社にのぼる。"
  },
  {
    ticker: "6146", name: "ディスコ", sector: "機械",
    marketCap: 85171, revenue: 3933, operatingProfit: 1668, employees: 7379,
    founded: 1937, hq: "東京都大田区",
    desc: "半導体ウエハーの切断・研削・研磨装置で世界トップシェアを誇る精密加工装置メーカー。",
    fact: "前身は工業用砥石メーカー「第一製砥所」で、2025年3月期は営業利益率42％という驚異的な高収益体質を達成した。"
  },
  {
    ticker: "6178", name: "日本郵政", sector: "陸運業",
    marketCap: 60685, revenue: 114500, operatingProfit: 5462, employees: 208325,
    founded: 1871, hq: "東京都千代田区",
    desc: "日本郵便・ゆうちょ銀行・かんぽ生命を傘下に持つ郵政グループの持株会社で、2007年の郵政民営化で発足。",
    fact: "ルーツは1871年に前島密が創設した官営郵便制度にあり、グループ従業員数は20万人を超える日本最大級の企業集団。"
  },
  {
    ticker: "6273", name: "SMC", sector: "機械",
    marketCap: 39541, revenue: 7921, operatingProfit: 1902, employees: 24000,
    founded: 1959, hq: "東京都千代田区",
    desc: "FA（工場自動化）用の空気圧制御機器で世界シェア首位を誇る専業メーカー。",
    fact: "空気圧バルブやアクチュエータなど制御機器の種類は70万種以上にのぼり、世界中の工場の自動化を支えている。"
  },
  {
    ticker: "6302", name: "住友重機械工業", sector: "機械",
    marketCap: 6602, revenue: 10711, operatingProfit: 551, employees: 25123,
    founded: 1888, hq: "東京都品川区",
    desc: "建設機械・精密減速機・半導体製造装置など幅広い事業を持つ住友グループの総合重機メーカー。",
    fact: "明治期に別子銅山の機械整備部門「工作方」として創業し、現在は精密減速機で世界的シェアを誇る。"
  },
  {
    ticker: "6305", name: "日立建機", sector: "機械",
    marketCap: 11685, revenue: 13712, operatingProfit: 1450, employees: 26200,
    founded: 1970, hq: "東京都台東区",
    desc: "油圧ショベルなど建設機械を製造する日立グループの大手メーカーで、世界シェアはキャタピラー、コマツに次ぐ規模。",
    fact: "ICT建機やドローン測量を活用した「スマート建設」を推進し、無人運転建機の開発でも世界をリードしている。"
  },
  {
    ticker: "6326", name: "クボタ", sector: "機械",
    marketCap: 32000, revenue: 31500, operatingProfit: 3000, employees: 52503,
    founded: 1890, hq: "大阪府大阪市浪速区",
    desc: "農業機械・建設機械の大手。トラクターやコンバインで世界的シェアを持つ。",
    fact: "「クボタ」の名は創業者大久保房次郎にちなむ。世界の食料・水・環境問題解決を掲げる。"
  },
  {
    ticker: "6361", name: "荏原製作所", sector: "機械",
    marketCap: 18500, revenue: 9583, operatingProfit: 1138, employees: 20000,
    founded: 1912, hq: "東京都大田区",
    desc: "ポンプ・風水力機械の大手メーカー。半導体製造装置のCMP装置でも世界的シェアを持つ。",
    fact: "ポンプ事業発の老舗だが、近年は半導体関連装置事業の急成長で株価が急騰した。"
  },
  {
    ticker: "6471", name: "日本精工", sector: "機械",
    marketCap: 3200, revenue: 8500, operatingProfit: 280, employees: 28000,
    founded: 1916, hq: "東京都品川区",
    desc: "NSKブランドで知られるベアリング（軸受）大手。自動車・産業機械分野で世界シェア上位。",
    fact: "ベアリングは「機械の関節」と呼ばれ、ほぼ全ての回転する機械に使われる基礎部品。"
  },
  {
    ticker: "6472", name: "NTN", sector: "機械",
    marketCap: 2400, revenue: 7900, operatingProfit: 240, employees: 20000,
    founded: 1918, hq: "大阪府大阪市西区",
    desc: "ベアリング・等速ジョイントの大手メーカー。自動車部品分野に強みを持つ。",
    fact: "等速ジョイントは前輪駆動車の駆動力をスムーズに伝える必須部品で世界的シェアを持つ。"
  },
  {
    ticker: "6473", name: "ジェイテクト", sector: "機械",
    marketCap: 6460, revenue: 18844, operatingProfit: 650, employees: 45018,
    founded: 2006, hq: "大阪府大阪市中央区",
    desc: "光洋精工とトヨタ工機の合併で誕生。ステアリングシステムと軸受の大手。",
    fact: "「走る」「曲がる」を支える自動車のステアリング技術で世界トップクラスのシェアを持つ。"
  },
  {
    ticker: "6479", name: "ミネベアミツミ", sector: "電気機器",
    marketCap: 12684, revenue: 16644, operatingProfit: 1040, employees: 83011,
    founded: 1951, hq: "東京都港区",
    desc: "超小型ベアリングや電子部品を手がける精密部品メーカー。M&Aで事業領域を拡大。",
    fact: "世界の超小型ボールベアリング市場で高い世界シェアを握る「ニッチ世界一」企業。"
  },
  {
    ticker: "6503", name: "三菱電機", sector: "電気機器",
    marketCap: 115359, revenue: 55217, operatingProfit: 3919, employees: 149914,
    founded: 1921, hq: "東京都千代田区",
    desc: "重電・FA・家電まで幅広く手がける総合電機大手。社会インフラから家庭機器まで展開。",
    fact: "エレベーターや鉄道車両、人工衛星まで手がける、製品ラインの広さが業界随一。"
  },
  {
    ticker: "6504", name: "富士電機", sector: "電気機器",
    marketCap: 22096, revenue: 13660, operatingProfit: 1366, employees: 26955,
    founded: 1923, hq: "東京都品川区",
    desc: "パワー半導体・発電関連機器の大手。自動販売機事業も手がける。",
    fact: "実は街角の自動販売機の多くを作っているのも富士電機。パワー半導体でも世界的シェアを持つ。"
  },
  {
    ticker: "6506", name: "安川電機", sector: "電気機器",
    marketCap: 19343, revenue: 5400, operatingProfit: 502, employees: 13000,
    founded: 1915, hq: "福岡県北九州市",
    desc: "産業用ロボットとモーター制御の世界的大手。「YASKAWA」ブランドで知られる。",
    fact: "世界初の産業用ロボット国産メーカーの一つで、ロボットの累計出荷台数は世界トップクラス。"
  },
  {
    ticker: "6526", name: "ソシオネクスト", sector: "電気機器",
    marketCap: 4880, revenue: 1900, operatingProfit: 100, employees: 2490,
    founded: 2015, hq: "神奈川県横浜市",
    desc: "富士通と旧パナソニックの半導体設計部門が統合して誕生したファブレス半導体企業。",
    fact: "自社工場を持たず設計に特化する「ファブレス」企業で、車載・データセンター向けSoCに強み。"
  },
  {
    ticker: "6532", name: "ベイカレント", sector: "サービス業",
    marketCap: 11350, revenue: 1160, operatingProfit: 426, employees: 5904,
    founded: 1998, hq: "東京都港区",
    desc: "DX（デジタル変革）支援を中心とする総合コンサルティング会社。",
    fact: "驚異の営業利益率約37%を誇り、コンサル業界では異例の高収益企業として知られる。"
  },
  {
    ticker: "6645", name: "オムロン", sector: "電気機器",
    marketCap: 12762, revenue: 8018, operatingProfit: 540, employees: 26614,
    founded: 1933, hq: "京都府京都市",
    desc: "制御機器・ヘルスケア機器を手がける電機メーカー。自動改札機や血圧計でも有名。",
    fact: "世界初の自動改札機や無人駅システムを開発し、日常生活に深く浸透した技術を多数生み出した。"
  },
  {
    ticker: "6701", name: "NEC", sector: "電気機器",
    marketCap: 51773, revenue: 24223, operatingProfit: 2565, employees: 105000,
    founded: 1899, hq: "東京都港区",
    desc: "ITサービス・通信インフラを手がける老舗電機メーカー。生体認証技術にも強み。",
    fact: "顔認証技術の精度は世界トップクラスの評価を受け、世界中の捜査機関や入国管理に採用されている。"
  },
  {
    ticker: "6723", name: "ルネサスエレクトロニクス", sector: "電気機器",
    marketCap: 85842, revenue: 15000, operatingProfit: 2012, employees: 21629,
    founded: 2010, hq: "東京都江東区",
    desc: "車載用マイコンで世界トップシェアを持つ半導体メーカー。日立・三菱電機・NECの半導体部門が統合。",
    fact: "車載マイコンの世界シェアはトップクラスで、世界中の自動車の多くにルネサス製チップが搭載されている。"
  },
  {
    ticker: "6724", name: "セイコーエプソン", sector: "電気機器",
    marketCap: 9427, revenue: 13629, operatingProfit: 751, employees: 75352,
    founded: 1942, hq: "長野県諏訪市",
    desc: "インクジェットプリンターやプロジェクターで知られる精密機器メーカー。",
    fact: "インクジェット技術を独自に進化させ、印刷だけでなく繊維・3Dプリントにも応用範囲を広げている。"
  },
  {
    ticker: "6753", name: "シャープ", sector: "電気機器",
    marketCap: 4891, revenue: 21601, operatingProfit: 273, employees: 40123,
    founded: 1912, hq: "大阪府堺市",
    desc: "AQUOSブランドの液晶テレビなどで知られる電機メーカー。鴻海（フォックスコン）傘下。",
    fact: "シャープペンシルの発明が社名の由来。液晶技術のパイオニアとして世界に名を知られた。"
  },
  {
    ticker: "6770", name: "アルプスアルパイン", sector: "電気機器",
    marketCap: 3000, revenue: 23892, operatingProfit: 100, employees: 27287,
    founded: 1948, hq: "東京都品川区",
    desc: "車載電子部品と電子部品を手がける、アルプス電気とアルパインが統合したメーカー。",
    fact: "スマホや家電のスイッチ・センサーなど目立たないが多数の機器に使われる電子部品を量産している。"
  },
  {
    ticker: "6841", name: "横河電機", sector: "電気機器",
    marketCap: 7489, revenue: 5624, operatingProfit: 835, employees: 17670,
    founded: 1915, hq: "東京都武蔵野市",
    desc: "工場の計測・制御システムを手がける産業オートメーション大手。",
    fact: "石油化学プラントなどの制御システムで世界的シェアを持ち、安全運転を陰で支えている。"
  },
  {
    ticker: "6857", name: "アドバンテスト", sector: "電気機器",
    marketCap: 137460, revenue: 80054, operatingProfit: 24910, employees: 8000,
    founded: 1954, hq: "東京都千代田区",
    desc: "半導体テスター（検査装置）で世界トップシェアを誇る半導体製造装置メーカー。",
    fact: "AI半導体需要の急拡大により株価が急騰し、時価総額10兆円を超える日本有数の巨大企業に成長した。"
  },
  {
    ticker: "6920", name: "レーザーテック", sector: "電気機器",
    marketCap: 33999, revenue: 2515, operatingProfit: 1100, employees: 1163,
    founded: 1960, hq: "神奈川県横浜市",
    desc: "半導体マスク欠陥検査装置で世界シェア100%近くを持つ検査装置メーカー。",
    fact: "最先端のEUV向けマスク検査装置では事実上の独占企業で、従業員一人当たり利益が極めて高い。"
  },
  {
    ticker: "6976", name: "太陽誘電", sector: "電気機器",
    marketCap: 7999, revenue: 3540, operatingProfit: 105, employees: 23000,
    founded: 1950, hq: "東京都台東区",
    desc: "積層セラミックコンデンサ（MLCC）など電子部品を手がけるメーカー。",
    fact: "スマホ1台に数百個も使われる超小型コンデンサの生産で世界トップクラスのシェアを持つ。"
  },
  {
    ticker: "6988", name: "日東電工", sector: "化学",
    marketCap: 20015, revenue: 10139, operatingProfit: 1857, employees: 27915,
    founded: 1918, hq: "大阪府大阪市北区",
    desc: "粘着テープ技術を核に多角化した機能材料メーカー。液晶用フィルムなどでも世界シェア上位。",
    fact: "1枚のテープ技術から派生し、現在では液晶ディスプレイ材料など数千品目に事業を広げている。"
  },
  {
    ticker: "7004", name: "カナデビア", sector: "機械",
    marketCap: 2183, revenue: 6452, operatingProfit: 122, employees: 10000,
    founded: 1949, hq: "兵庫県神戸市",
    desc: "旧新明和工業。航空機部品、産業機械、環境装置などを手がける機械メーカー。",
    fact: "2024年に社名を「新明和工業」から「カナデビア」に変更した、社名変更が話題になった企業。"
  },
  {
    ticker: "7012", name: "川崎重工業", sector: "機械",
    marketCap: 14159, revenue: 23400, operatingProfit: 1075, employees: 40640,
    founded: 1896, hq: "兵庫県神戸市",
    desc: "船舶・航空機・鉄道車両・二輪車まで手がける総合重工業メーカー。",
    fact: "新幹線車両からジェットエンジン、バイクの「Kawasaki」ブランドまで手がける異色の重工メーカー。"
  },
  {
    ticker: "7013", name: "IHI", sector: "機械",
    marketCap: 33976, revenue: 18000, operatingProfit: 1435, employees: 28000,
    founded: 1853, hq: "東京都江東区",
    desc: "航空エンジン、橋梁、エネルギー設備などを手がける重工業の老舗大手。",
    fact: "前身の石川島造船所は日本最古の造船所の一つで、明治期から日本の重工業を支えてきた。"
  },
  {
    ticker: "7186", name: "横浜フィナンシャルグループ", sector: "銀行業",
    marketCap: 17000, revenue: 3000, operatingProfit: 1228, employees: 6450,
    founded: 1920, hq: "神奈川県横浜市",
    desc: "横浜銀行と東日本銀行を傘下に持つ、国内最大規模の地方銀行グループ。",
    fact: "預金量約20兆円を誇り、地方銀行グループとしては国内トップクラスの規模を持つ。"
  },
  {
    ticker: "7201", name: "日産自動車", sector: "輸送用機器",
    marketCap: 12700, revenue: 120000, operatingProfit: 580, employees: 130000,
    founded: 1933, hq: "神奈川県横浜市",
    desc: "ルノー・三菱自動車とアライアンスを組む日本の大手自動車メーカー。",
    fact: "世界初の量産EV「リーフ」を発売したパイオニアだが、近年は経営再建「Re:Nissan」に取り組んでいる。"
  },
  {
    ticker: "7202", name: "いすゞ自動車", sector: "輸送用機器",
    marketCap: 15776, revenue: 34791, operatingProfit: 2037, employees: 39000,
    founded: 1916, hq: "東京都品川区",
    desc: "トラック・バスなど商用車を主力とする自動車メーカー。",
    fact: "「ELF」「ギガ」などのトラックは国内シェア上位で、物流業界を陰で支える存在。"
  },
  {
    ticker: "7211", name: "三菱自動車", sector: "輸送用機器",
    marketCap: 4583, revenue: 28965, operatingProfit: 755, employees: 28572,
    founded: 1970, hq: "東京都港区",
    desc: "三菱グループの自動車メーカー。SUVやプラグインハイブリッド車に強みを持つ。",
    fact: "PHEV（プラグインハイブリッド）SUV「アウトランダー」は早期から環境技術に力を入れた代表車種。"
  },
  {
    ticker: "7270", name: "SUBARU", sector: "輸送用機器",
    marketCap: 21197, revenue: 46858, operatingProfit: 1300, employees: 37866,
    founded: 1953, hq: "東京都渋谷区",
    desc: "四輪駆動車「シンメトリカルAWD」とボクサーエンジンで知られる自動車メーカー。",
    fact: "航空機メーカーが前身で、その技術力を生かした水平対向エンジンと四輪駆動技術が代名詞。"
  },
  {
    ticker: "7272", name: "ヤマハ発動機", sector: "輸送用機器",
    marketCap: 9000, revenue: 25342, operatingProfit: 1264, employees: 55176,
    founded: 1955, hq: "静岡県浜松市",
    desc: "二輪車・船外機・産業用ロボットまで手がける輸送機器・モビリティメーカー。",
    fact: "ヤマハ（楽器）から分離独立した会社で、二輪車だけでなく船外機で世界トップシェアを持つ。"
  },
  {
    ticker: "7453", name: "良品計画", sector: "小売業",
    marketCap: 11461, revenue: 7846, operatingProfit: 738, employees: 13912,
    founded: 1989, hq: "東京都豊島区",
    desc: "「無印良品」を展開する生活雑貨・衣料品の専門店チェーン。",
    fact: "「無印良品」は元はスーパーのプライベートブランドとして誕生し、今や海外店舗数が国内を上回る。"
  },
  {
    ticker: "7532", name: "パン・パシフィック・インターナショナルHD", sector: "小売業",
    marketCap: 23815, revenue: 22467, operatingProfit: 1622, employees: 17962,
    founded: 1980, hq: "東京都渋谷区",
    desc: "「ドン・キホーテ」を運営する総合ディスカウントストア大手。深夜営業と圧縮陳列が特徴。",
    fact: "訪日外国人向け免税売上が急拡大中。北米・東南アジアにも出店し海外展開を加速している。"
  },
  {
    ticker: "7731", name: "ニコン", sector: "精密機器",
    marketCap: 7300, revenue: 7153, operatingProfit: 24, employees: 20069,
    founded: 1917, hq: "東京都品川区",
    desc: "カメラ・光学機器の老舗。半導体露光装置や顕微鏡など精密光学技術に強み。",
    fact: "宇宙望遠鏡や人工衛星のレンズにも採用される光学技術は、星の観測にも使われている。"
  },
  {
    ticker: "7733", name: "オリンパス", sector: "精密機器",
    marketCap: 21964, revenue: 7154, operatingProfit: 1625, employees: 29297,
    founded: 1919, hq: "東京都新宿区",
    desc: "消化器内視鏡で世界トップシェアを誇る医療機器メーカー。",
    fact: "胃カメラの先駆けとして知られ、世界の内視鏡市場の7割近くを握るとされる。"
  },
  {
    ticker: "7735", name: "SCREENホールディングス", sector: "電気機器",
    marketCap: 16994, revenue: 6253, operatingProfit: 1357, employees: 6415,
    founded: 1943, hq: "京都府京都市",
    desc: "半導体製造装置のリーディングカンパニー。洗浄装置で世界シェア上位。",
    fact: "もとは印刷機器メーカーから出発し、半導体洗浄装置の分野で世界トップクラスに成長した。"
  },
  {
    ticker: "7741", name: "HOYA", sector: "精密機器",
    marketCap: 91591, revenue: 4549, operatingProfit: 950, employees: 36000,
    founded: 1944, hq: "東京都新宿区",
    desc: "光学ガラス・眼鏡レンズに加え半導体用マスクブランクスで世界トップシェア。",
    fact: "半導体露光に使う「マスクブランクス」で世界シェア5割超を握る隠れた技術企業。"
  },
  {
    ticker: "7751", name: "キヤノン", sector: "電気機器",
    marketCap: 58285, revenue: 46247, operatingProfit: 4821, employees: 165547,
    founded: 1937, hq: "東京都大田区",
    desc: "カメラ・複合機・医療機器を手がける総合精密機器メーカー。",
    fact: "デジタルカメラのレンズ交換式市場で世界トップクラスのシェアを長年維持している。"
  },
  {
    ticker: "7752", name: "リコー", sector: "電気機器",
    marketCap: 8340, revenue: 18823, operatingProfit: 907, employees: 78665,
    founded: 1936, hq: "東京都大田区",
    desc: "複合機・オフィス機器で知られるが、デジタルサービス事業へ転換を推進中。",
    fact: "複合機メーカーから「デジタルサービスの会社」への転換を掲げ、事業構造を大きく変えている。"
  },
  {
    ticker: "7832", name: "バンダイナムコホールディングス", sector: "その他製品",
    marketCap: 23852, revenue: 12415, operatingProfit: 1802, employees: 11345,
    founded: 2005, hq: "東京都港区",
    desc: "バンダイとナムコが統合して誕生した世界的玩具・ゲームメーカー。ガンダムなど人気IPを保有。",
    fact: "『エルデンリング』『ドラゴンボール』などのIPを軸に展開し2025年3月期に過去最高益を記録。"
  },
  {
    ticker: "7911", name: "TOPPANホールディングス", sector: "その他製品",
    marketCap: 11878, revenue: 18050, operatingProfit: 841, employees: 51988,
    founded: 1900, hq: "東京都文京区",
    desc: "1900年創業の総合印刷大手。印刷技術を核に半導体材料・ディスプレイ部材にも展開。",
    fact: "2023年に「凸版印刷」から「TOPPAN」へ123年ぶりに社名変更。印刷国内2強の一角。"
  },
  {
    ticker: "7912", name: "大日本印刷", sector: "その他製品",
    marketCap: 12699, revenue: 15125, operatingProfit: 1010, employees: 36325,
    founded: 1876, hq: "東京都新宿区",
    desc: "DNPブランドで知られる総合印刷最大手。出版・包装・エレクトロニクス分野にも多角展開。",
    fact: "印刷技術を応用しICカードや有機ELディスプレイ部材など先端分野にも進出している。"
  },
  {
    ticker: "7951", name: "ヤマハ", sector: "その他製品",
    marketCap: 9665, revenue: 4653, operatingProfit: 319, employees: 18949,
    founded: 1897, hq: "静岡県浜松市",
    desc: "ピアノなど楽器とAV機器で世界的シェアを持つ総合楽器メーカー。ヤマハ発動機とは別会社。",
    fact: "売上の約77%が海外。ピアノ・管楽器などで世界最大級の楽器メーカーとして知られる。"
  },
  {
    ticker: "8001", name: "伊藤忠商事", sector: "卸売業",
    marketCap: 131000, revenue: 148231, operatingProfit: 6839, employees: 115089,
    founded: 1858, hq: "東京都港区／大阪市北区",
    desc: "非財閥系の総合商社。繊維から出発し、現在は食料・エネルギー・ITまで幅広く展開。",
    fact: "ファミリーマートを傘下に持ち、商社で唯一コンビニ事業を本格展開。売上高は商社業界トップ級。"
  },
  {
    ticker: "8002", name: "丸紅", sector: "卸売業",
    marketCap: 47900, revenue: 77902, operatingProfit: 2723, employees: 51834,
    founded: 1949, hq: "東京都中央区日本橋",
    desc: "穀物・電力・農業関連に強みを持つ総合商社。海外電力IPP事業で世界的な実績を持つ。",
    fact: "海外発電事業（IPP）の発電容量は商社の中でも上位で、農業・食料分野に経営の軸足を置く。"
  },
  {
    ticker: "8015", name: "豊田通商", sector: "卸売業",
    marketCap: 31042, revenue: 103096, operatingProfit: 4972, employees: 69111,
    founded: 1936, hq: "愛知県名古屋市中村区",
    desc: "トヨタグループの中核商社。自動車部品や金属、アフリカ事業に強みを持つ。",
    fact: "前身は1936年創業のトヨタ車販売金融会社。今や売上高は10兆円超で五大商社にも匹敵する規模。"
  },
  {
    ticker: "8031", name: "三井物産", sector: "卸売業",
    marketCap: 129000, revenue: 146626, operatingProfit: 11000, employees: 53602,
    founded: 1876, hq: "東京都千代田区丸の内",
    desc: "資源・エネルギー分野に強い老舗総合商社。鉄鉱石・LNG権益を世界中に保有。",
    fact: "三井財閥の流れを汲み、設立は1876年と商社の中でも最古参の歴史を持つ。"
  },
  {
    ticker: "8053", name: "住友商事", sector: "卸売業",
    marketCap: 47172, revenue: 73373, operatingProfit: 6956, employees: 83327,
    founded: 1919, hq: "東京都千代田区大手町",
    desc: "メディア・通信・不動産にも強い総合商社。住友グループの中核企業の一つ。",
    fact: "不採算事業からの撤退を進め業績を急速に改善させ、five大商社の一角として存在感を高めている。"
  },
  {
    ticker: "8058", name: "三菱商事", sector: "卸売業",
    marketCap: 113000, revenue: 189160, operatingProfit: 13934, employees: 62062,
    founded: 1950, hq: "東京都千代田区丸の内",
    desc: "国内最大手の総合商社。資源・エネルギーから自動車・食品まで全方位展開。",
    fact: "売上高は約19兆円と国内商社トップクラス。著名投資家バフェットも大量保有で話題になった。"
  },
  {
    ticker: "8233", name: "高島屋", sector: "小売業",
    marketCap: 7841, revenue: 4985, operatingProfit: 575, employees: 3621,
    founded: 1831, hq: "大阪府大阪市中央区",
    desc: "1831年創業の老舗百貨店。高級路線とインバウンド需要の取り込みに強み。",
    fact: "創業190年超の歴史を持つ日本最古級の百貨店。海外の商業開発事業も展開し収益源を多角化。"
  },
  {
    ticker: "8252", name: "丸井グループ", sector: "小売業",
    marketCap: 5059, revenue: 2544, operatingProfit: 445, employees: 5200,
    founded: 1931, hq: "東京都中野区",
    desc: "マルイ百貨店とエポスカードを展開する小売・フィンテック融合企業。",
    fact: "「小売×フィンテック」戦略でエポスカードの会員基盤を活用し、店舗を持たない若者層を開拓した先駆者。"
  },
  {
    ticker: "8253", name: "クレディセゾン", sector: "その他金融業",
    marketCap: 7058, revenue: 2560, operatingProfit: 303, employees: 5623,
    founded: 1951, hq: "東京都豊島区",
    desc: "セゾンカード等を展開する大手クレジットカード会社。銀行系列に属さない独立系。",
    fact: "国内クレジットカード会社で珍しく無担保ローンと国際事業に強く、インド・ベトナムなど新興国展開を加速中。"
  },
  {
    ticker: "8304", name: "あおぞら銀行", sector: "銀行業",
    marketCap: 3980, revenue: 2423, operatingProfit: 257, employees: 2477,
    founded: 1957, hq: "東京都千代田区",
    desc: "旧日本債券信用銀行を前身とする中堅銀行。法人向けや不動産融資に強みを持つ。",
    fact: "2010年に経営破綻から公的資金で再建。海外不動産融資の損失で2024年に一時急落した。"
  },
  {
    ticker: "8308", name: "りそなホールディングス", sector: "銀行業",
    marketCap: 49000, revenue: 13572, operatingProfit: 3909, employees: 19744,
    founded: 2001, hq: "大阪府大阪市中央区",
    desc: "りそな銀行・埼玉りそな銀行などを傘下に持つ関西地盤の大手金融グループ。",
    fact: "2003年に公的資金注入で実質国有化されたが、2015年に完全返済を完了した。"
  },
  {
    ticker: "8309", name: "三井住友トラストグループ", sector: "銀行業",
    marketCap: 33442, revenue: 29835, operatingProfit: 3175, employees: 23125,
    founded: 2011, hq: "東京都千代田区丸の内",
    desc: "信託銀行業界最大手。資産運用・不動産仲介など信託機能を核に事業を展開。",
    fact: "グループの起源は1924年設立の三井信託で、日本初の信託会社として誕生した。"
  },
  {
    ticker: "8331", name: "千葉銀行", sector: "銀行業",
    marketCap: 11269, revenue: 3622, operatingProfit: 743, employees: 4280,
    founded: 1943, hq: "千葉県千葉市中央区",
    desc: "千葉県最大の地方銀行。県内トップシェアを持ち首都圏にも展開する優良地銀。",
    fact: "地銀の中でもデジタル化に積極的で、TSUBASAアライアンスを主導する立場にある。"
  },
  {
    ticker: "8354", name: "ふくおかフィナンシャルグループ", sector: "銀行業",
    marketCap: 7479, revenue: 6211, operatingProfit: 854, employees: 7928,
    founded: 2007, hq: "福岡県福岡市中央区",
    desc: "福岡銀行・十八親和銀行などを傘下に持つ九州最大の広域地銀グループ。",
    fact: "国内初の複数地銀による経営統合で誕生し、地銀連合の先駆けとなった。"
  },
  {
    ticker: "8601", name: "大和証券グループ本社", sector: "証券業",
    marketCap: 14062, revenue: 14679, operatingProfit: 1752, employees: 14432,
    founded: 1943, hq: "東京都千代田区丸の内",
    desc: "野村に次ぐ国内2位の総合証券グループ。リテールとホールセールに強みを持つ。",
    fact: "1999年に国内上場会社で初めて持株会社体制に移行した先駆者である。"
  },
  {
    ticker: "8604", name: "野村ホールディングス", sector: "証券業",
    marketCap: 43965, revenue: 21677, operatingProfit: 3621, employees: 28601,
    founded: 1925, hq: "東京都中央区日本橋",
    desc: "国内最大手の証券グループ。グローバルに投資銀行業務を展開する唯一の日系証券。",
    fact: "海外拠点を多数持ち、リーマン・ブラザーズの欧州・アジア部門を買収した歴史がある。"
  },
  {
    ticker: "8630", name: "SOMPOホールディングス", sector: "保険業",
    marketCap: 27231, revenue: 54538, operatingProfit: 5529, employees: 54106,
    founded: 2010, hq: "東京都新宿区",
    desc: "損害保険ジャパンを中核とする保険持株会社。介護事業にも積極展開。",
    fact: "1888年創業の日本初の火災保険会社を起源とし、国内損保で唯一「介護事業」を大規模展開する異色のグループ。"
  },
  {
    ticker: "8697", name: "日本取引所グループ", sector: "その他金融業",
    marketCap: 18241, revenue: 1987, operatingProfit: 1163, employees: 1248,
    founded: 2013, hq: "東京都中央区",
    desc: "東京証券取引所と大阪取引所を運営する国内唯一の取引所グループ。",
    fact: "東京証券取引所の起源は1878年。株式売買のインフラを独占的に担う企業だ。"
  },
  {
    ticker: "8725", name: "MS&ADインシュアランスグループホールディングス", sector: "保険業",
    marketCap: 38299, revenue: 76530, operatingProfit: 11202, employees: 38247,
    founded: 2008, hq: "東京都中央区",
    desc: "三井住友海上・あいおいニッセイ同和損保等を統括する国内最大級の保険持株会社。",
    fact: "社名の「MS」は三井住友、「AD」はあいおい・ニッセイ同和の頭文字。国内損保売上で長年トップクラスを争う。"
  },
  {
    ticker: "8750", name: "第一生命ホールディングス", sector: "保険業",
    marketCap: 30000, revenue: 78000, operatingProfit: 4000, employees: 60000,
    founded: 1902, hq: "東京都千代田区有楽町",
    desc: "日本初の相互会社形式で設立された生命保険会社が母体の持株会社。国内外の生命保険事業を展開。",
    fact: "2010年に相互会社から株式会社化し上場。海外保険会社の買収にも積極的で、米国プロテクティブなどを傘下に持つ。"
  },
  {
    ticker: "8766", name: "東京海上ホールディングス", sector: "保険業",
    marketCap: 109000, revenue: 66700, operatingProfit: 9900, employees: 40000,
    founded: 1879, hq: "東京都千代田区丸の内",
    desc: "日本初の近代的損害保険会社を起源とするメガ損保グループの持株会社。",
    fact: "1879年創業の日本最古の損害保険会社。海外保険事業の比率が高く、北米事業が利益の柱の一つ。"
  },
  {
    ticker: "8795", name: "T&Dホールディングス", sector: "保険業",
    marketCap: 17500, revenue: 37300, operatingProfit: 1500, employees: 17000,
    founded: 2004, hq: "東京都千代田区霞が関",
    desc: "太陽生命・大同生命・T&Dフィナンシャル生命を傘下に持つ生命保険持株会社。",
    fact: "「T&D」は太陽生命(Taiyo)と大同生命(Daido)の頭文字から。中小企業向け保険で強みを持つ大同生命を擁する。"
  },
  {
    ticker: "8801", name: "三井不動産", sector: "不動産業",
    marketCap: 42600, revenue: 26000, operatingProfit: 3700, employees: 26630,
    founded: 1941, hq: "東京都中央区日本橋室町",
    desc: "三菱地所と並ぶ総合不動産大手。オフィスビル賃貸を中心に商業施設・マンション開発も展開。",
    fact: "日本橋・東京ミッドタウンなど大規模再開発を多数手掛け、海外不動産事業の拡大にも力を入れている。"
  },
  {
    ticker: "8802", name: "三菱地所", sector: "不動産業",
    marketCap: 30400, revenue: 15960, operatingProfit: 3000, employees: 10000,
    founded: 1937, hq: "東京都千代田区大手町",
    desc: "三菱グループの中核を担う総合不動産会社。丸の内エリアの再開発で知られる。",
    fact: "「丸の内の大家さん」と呼ばれ、東京駅周辺のオフィスビルの約3割を保有・管理している。"
  },
  {
    ticker: "8804", name: "東京建物", sector: "不動産業",
    marketCap: 6900, revenue: 4640, operatingProfit: 800, employees: 5035,
    founded: 1896, hq: "東京都中央区八重洲",
    desc: "1896年創業の日本最古の不動産会社。オフィス・住宅・商業施設を幅広く展開。",
    fact: "三菱・三井・住友に続く準大手不動産だが、創業は財閥系より古く「不動産業の元祖」とも言われる。"
  },
  {
    ticker: "8830", name: "住友不動産", sector: "不動産業",
    marketCap: 44800, revenue: 10140, operatingProfit: 2715, employees: 13844,
    founded: 1949, hq: "東京都新宿区西新宿",
    desc: "新宿副都心の再開発を主導した総合不動産大手。賃貸事業の利益率の高さで知られる。",
    fact: "新築マンション分譲やリフォーム事業にも強く、業界トップクラスの営業利益率26%超を誇る。"
  },
  {
    ticker: "9001", name: "東武鉄道", sector: "陸運業",
    marketCap: 5490, revenue: 6550, operatingProfit: 746, employees: 18247,
    founded: 1897, hq: "東京都墨田区押上",
    desc: "関東最長の路線網を持つ大手私鉄。東武スカイツリーラインや東武日光線などを運行。",
    fact: "東京スカイツリーの運営会社の親会社でもあり、鉄道以外に観光・流通・不動産事業も展開する。"
  },
  {
    ticker: "9005", name: "東急", sector: "陸運業",
    marketCap: 10200, revenue: 10860, operatingProfit: 1030, employees: 3600,
    founded: 1922, hq: "東京都渋谷区南平台町",
    desc: "渋谷を中心に田園都市線などを運行する大手私鉄。不動産・生活サービス事業も柱。",
    fact: "渋谷駅周辺の大規模再開発「渋谷ヒカリエ」「渋谷スクランブルスクエア」などを主導してきた。"
  },
  {
    ticker: "9007", name: "小田急電鉄", sector: "陸運業",
    marketCap: 6180, revenue: 4190, operatingProfit: 530, employees: 11500,
    founded: 1948, hq: "東京都新宿区西新宿",
    desc: "新宿と小田原・箱根を結ぶ大手私鉄。観光地箱根への観光輸送も重要な事業。",
    fact: "特急ロマンスカーで有名で、箱根の登山鉄道やケーブルカー、バス事業まで一体運営している。"
  },
  {
    ticker: "9008", name: "京王電鉄", sector: "陸運業",
    marketCap: 4400, revenue: 4970, operatingProfit: 523, employees: 13079,
    founded: 1948, hq: "東京都多摩市関戸",
    desc: "新宿と多摩地区・京王八王子を結ぶ大手私鉄。不動産・流通事業も展開。",
    fact: "京王百貨店やよみうりランドの運営にも関わり、鉄道以外の生活密着事業に強みを持つ。"
  },
  {
    ticker: "9009", name: "京成電鉄", sector: "陸運業",
    marketCap: 5550, revenue: 3320, operatingProfit: 340, employees: 12800,
    founded: 1909, hq: "千葉県市川市",
    desc: "成田空港アクセスを担う私鉄。オリエンタルランドの大株主としても知られる。",
    fact: "東京ディズニーリゾートを運営するオリエンタルランドの株式を約2割保有する筆頭株主。"
  },
  {
    ticker: "9021", name: "西日本旅客鉄道", sector: "陸運業",
    marketCap: 14870, revenue: 17080, operatingProfit: 1800, employees: 45000,
    founded: 1987, hq: "大阪府大阪市北区",
    desc: "近畿・北陸・中国地方をカバーするJR西日本。新幹線と在来線を一体運営する。",
    fact: "国鉄分割民営化により1987年に発足。山陽新幹線と北陸新幹線の一部区間を運営する。"
  },
  {
    ticker: "9022", name: "東海旅客鉄道", sector: "陸運業",
    marketCap: 44200, revenue: 14170, operatingProfit: 3745, employees: 29854,
    founded: 1987, hq: "東京都品川区",
    desc: "東海道新幹線を運営するJR東海。新幹線収入が利益の大半を占める高収益企業。",
    fact: "営業利益率の高さで知られ、リニア中央新幹線の建設も自己資金中心で進めている。"
  },
  {
    ticker: "9064", name: "ヤマトホールディングス", sector: "陸運業",
    marketCap: 6570, revenue: 17500, operatingProfit: 142, employees: 172822,
    founded: 1919, hq: "東京都中央区銀座",
    desc: "宅配便最大手「クロネコヤマト」を展開する物流大手。EC物流需要を取り込む。",
    fact: "1976年に世界初の小口配送サービス「宅急便」を開始し、日本の宅配便市場を生み出した。"
  },
  {
    ticker: "9101", name: "日本郵船", sector: "海運業",
    marketCap: 22150, revenue: 24240, operatingProfit: 1386, employees: 35230,
    founded: 1885, hq: "東京都千代田区丸の内",
    desc: "日本最大手の海運会社。コンテナ船・自動車船・エネルギー輸送など幅広く展開。",
    fact: "1885年創業の日本最古の海運会社の一つ。自動車専用船（カーキャリア）の輸送量で世界トップクラス。"
  },
  {
    ticker: "9104", name: "商船三井", sector: "海運業",
    marketCap: 17000, revenue: 17300, operatingProfit: 4200, employees: 8550,
    founded: 1884, hq: "東京都港区虎ノ門",
    desc: "日本郵船に次ぐ海運大手。エネルギー輸送船やLNG船に強みを持つ。",
    fact: "前身の大阪商船は1884年創業。LNG船の保有・運航数で世界トップクラスを誇る。"
  },
  {
    ticker: "9107", name: "川崎汽船", sector: "海運業",
    marketCap: 14700, revenue: 10000, operatingProfit: 1500, employees: 5770,
    founded: 1919, hq: "東京都千代田区内幸町",
    desc: "海運大手3社の一角。ドライバルク船や自動車船を中心に事業を展開。",
    fact: "近年はコンテナ船事業をONE（オーシャン・ネットワーク・エクスプレス）に統合し収益体質を改善した。"
  },
  {
    ticker: "9147", name: "NIPPON EXPRESSホールディングス", sector: "倉庫・運輸関連業",
    marketCap: 7000, revenue: 25750, operatingProfit: 515, employees: 70000,
    founded: 1937, hq: "東京都千代田区神田和泉町",
    desc: "日本通運を中核とする総合物流グループの持株会社。国際物流に強みを持つ。",
    fact: "旧国策会社として1937年設立。2022年に持株会社体制へ移行し、海外M&Aで国際物流網を拡大してきた。"
  },
  {
    ticker: "9201", name: "日本航空", sector: "空運業",
    marketCap: 12900, revenue: 18440, operatingProfit: 1724, employees: 38433,
    founded: 1951, hq: "東京都品川区東品川",
    desc: "ANAと並ぶ日本の大手航空会社。国内線・国際線を幅広く運航する。",
    fact: "2010年に経営破綻し会社更生法を適用、京セラ創業者の稲盛和夫氏の指導で2年で再上場を果たした。"
  },
  {
    ticker: "9434", name: "ソフトバンク", sector: "情報・通信業",
    marketCap: 100300, revenue: 70390, operatingProfit: 10426, employees: 55070,
    founded: 1986, hq: "東京都港区海岸",
    desc: "携帯電話事業を中心とする総合通信会社。ソフトバンクグループとは別の上場事業会社。",
    fact: "持株会社ソフトバンクグループの通信子会社として2018年に再上場、PayPayなど決済事業にも展開する。"
  },
  {
    ticker: "9501", name: "東京電力ホールディングス", sector: "電気・ガス業",
    marketCap: 6900, revenue: 68100, operatingProfit: 2340, employees: 33000,
    founded: 1951, hq: "東京都千代田区内幸町",
    desc: "首都圏に電力を供給する国内最大の電力会社。福島第一原発事故の処理・賠償を続ける。",
    fact: "2011年の福島第一原発事故後、実質国有化され、廃炉・賠償費用の負担が長期的な経営課題となっている。"
  },
  {
    ticker: "9502", name: "中部電力", sector: "電気・ガス業",
    marketCap: 19440, revenue: 17480, operatingProfit: 2420, employees: 22600,
    founded: 1951, hq: "愛知県名古屋市東区",
    desc: "中部地方に電力を供給する大手電力会社。中部・東海地方の産業を支える。",
    fact: "JERA（火力発電合弁会社）を東京電力と共同設立し、燃料調達から発電まで一体運営している。"
  },
  {
    ticker: "9503", name: "関西電力", sector: "電気・ガス業",
    marketCap: 30590, revenue: 29490, operatingProfit: 3200, employees: 31400,
    founded: 1951, hq: "大阪府大阪市北区",
    desc: "関西地方に電力を供給する大手電力会社。原子力発電比率の高さが特徴。",
    fact: "国内で最も多くの原子力発電所を運転し、原発再稼働が進んだことで業績が大きく改善した。"
  },
  {
    ticker: "9531", name: "東京ガス", sector: "電気・ガス業",
    marketCap: 21400, revenue: 26370, operatingProfit: 1331, employees: 15570,
    founded: 1885, hq: "東京都港区海岸",
    desc: "首都圏最大手の都市ガス会社。電力小売事業にも進出している。",
    fact: "1885年創業の老舗企業で、東京ガスドーム横浜などの不動産事業や海外LNG事業も手掛ける。"
  },
  {
    ticker: "9532", name: "大阪ガス", sector: "電気・ガス業",
    marketCap: 22900, revenue: 14390, operatingProfit: 1748, employees: 21400,
    founded: 1897, hq: "大阪府大阪市中央区",
    desc: "関西圏最大手の都市ガス会社。Daigasグループとして海外エネルギー事業も展開。",
    fact: "1897年創業の関西の老舗企業で、近年は海外のLNG・再生可能エネルギー事業に積極投資している。"
  },
  {
    ticker: "9602", name: "東宝", sector: "サービス業",
    marketCap: 11240, revenue: 1920, operatingProfit: 650, employees: 1200,
    founded: 1932, hq: "東京都千代田区有楽町",
    desc: "映画製作・配給と劇場興行を手掛ける大手映画会社。不動産事業も収益源。",
    fact: "ゴジラシリーズの製作会社として有名で、TOHOシネマズなど映画館事業や日比谷の不動産事業も展開する。"
  },
  {
    ticker: "9735", name: "セコム", sector: "サービス業",
    marketCap: 29600, revenue: 11700, operatingProfit: 1443, employees: 60000,
    founded: 1962, hq: "東京都渋谷区神宮前",
    desc: "日本初の警備保障会社。セキュリティサービス業界のリーディングカンパニー。",
    fact: "1962年に日本初の警備保障会社として創業し、「セコム」という社名は今や警備会社の代名詞となっている。"
  },
  {
    ticker: "9766", name: "コナミグループ", sector: "情報・通信業",
    marketCap: 28530, revenue: 35300, operatingProfit: 1017, employees: 10000,
    founded: 1969, hq: "東京都港区赤坂",
    desc: "ゲーム・健康・スポーツ事業などを展開する大手エンターテインメント企業。",
    fact: "「パワプロ」「メタルギア」「遊戯王」などの人気ゲームIPを多数持ち、フィットネスクラブ事業も手掛ける。"
  },
  {
    ticker: "9843", name: "ニトリホールディングス", sector: "小売業",
    marketCap: 17000, revenue: 23170, operatingProfit: 1180, employees: 19967,
    founded: 1972, hq: "北海道札幌市北区",
    desc: "家具・インテリア用品の製造から販売まで一貫して手掛ける専門店チェーン最大手。",
    fact: "「お、ねだん以上。」のキャッチフレーズで知られ、製造から物流・販売まで自社で行う製造物流小売業モデルが強み。"
  },
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
    desc: '政策金利が上昇。銀行の利ざや拡大が期待される一方、不動産には逆風。',
    effects: [
      { sector: '銀行業',       multiplier: 1.25 },
      { sector: 'その他金融業', multiplier: 1.15 },
      { sector: '保険業',       multiplier: 1.15 },
      { sector: '証券業',       multiplier: 1.10 },
      { sector: '不動産業',     multiplier: 0.90 },
    ]
  },
  {
    id: 'aiDemand', name: 'AI特需爆発',
    desc: '生成AI需要が急増。半導体・IT関連株が急騰。',
    effects: [
      { sector: '電気機器',     multiplier: 1.30 },
      { sector: '情報・通信業', multiplier: 1.20 },
      { sector: '化学',         multiplier: 1.10 },
      { sector: '精密機器',     multiplier: 1.15 },
    ]
  },
  {
    id: 'resourceHigh', name: '資源価格高騰',
    desc: '原油・鉄鉱石が急騰。素材・資源系企業に追い風、エネルギーコストは重荷に。',
    effects: [
      { sector: '鉄鋼',         multiplier: 1.30 },
      { sector: '化学',         multiplier: 1.15 },
      { sector: '輸送用機器',   multiplier: 0.92 },
      { sector: '非鉄金属',     multiplier: 1.25 },
      { sector: '鉱業',         multiplier: 1.30 },
      { sector: '電気・ガス業', multiplier: 0.88 },
    ]
  },
  {
    id: 'shippingTrade', name: '海運・商社が活況',
    desc: '海上輸送需要と資源取引が拡大。海運・商社・エネルギー関連が活況。',
    effects: [
      { sector: '海運業',         multiplier: 1.25 },
      { sector: '卸売業',         multiplier: 1.20 },
      { sector: '石油・石炭製品', multiplier: 1.15 },
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
      { sector: '繊維製品',   multiplier: 1.15 },
      { sector: 'その他製品', multiplier: 1.12 },
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
      { sector: '食料品',       multiplier: 1.10 },
      { sector: '水産・農林業', multiplier: 1.10 },
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
      { sector: '鉄鋼',             multiplier: 1.18 },
      { sector: '機械',             multiplier: 1.15 },
      { sector: '化学',             multiplier: 1.08 },
      { sector: '建設業',           multiplier: 1.25 },
      { sector: 'ガラス・土石製品', multiplier: 1.15 },
      { sector: '倉庫・運輸関連業', multiplier: 1.10 },
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

// ─── 難易度別の目安バンド（収録銘柄全体の分布から百分位で算出） ───────
// 固定の金額しきい値だと指標によって偏り（例：営業利益はほぼ全社が
// 最小バケットに入ってしまう）が出るため、難易度別バンドは225社の
// 実データの百分位を使って指標ごとに自動調整する。
const METRIC_SORTED_VALUES = {};
['marketCap', 'revenue', 'operatingProfit', 'employees'].forEach(metric => {
  METRIC_SORTED_VALUES[metric] = STOCKS.map(s => s[metric]).sort((a, b) => a - b);
});

function percentileValue(metric, p) {
  const arr = METRIC_SORTED_VALUES[metric];
  const idx = Math.min(arr.length - 1, Math.max(0, Math.floor(arr.length * p)));
  return arr[idx];
}

// かんたん：5段階バンド（百分位20/40/60/80で区切り）
function getMetricHintEasy(value, metric) {
  const p80 = percentileValue(metric, 0.8);
  const p60 = percentileValue(metric, 0.6);
  const p40 = percentileValue(metric, 0.4);
  const p20 = percentileValue(metric, 0.2);
  if (value >= p80) return `XL（${formatMetricValue(p80, metric)}〜）`;
  if (value >= p60) return `L（${formatMetricValue(p60, metric)}〜）`;
  if (value >= p40) return `M（${formatMetricValue(p40, metric)}〜）`;
  if (value >= p20) return `S（${formatMetricValue(p20, metric)}〜）`;
  return `XS（〜${formatMetricValue(p20, metric)}）`;
}

// むずかしい：大小2択のみ（百分位50＝中央値で区切り）
function getMetricHintHard(value, metric) {
  const median = percentileValue(metric, 0.5);
  return value >= median ? '大（中央値より上）' : '小（中央値より下）';
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
    '建設業':       '#cc7755',
    '食料品':       '#ffcc44',
    '不動産業':     '#cc6688',
    '保険業':       '#6699cc',
    '証券業':       '#3377aa',
    '非鉄金属':     '#bb9977',
    'ガラス・土石製品': '#77ccbb',
    '石油・石炭製品':   '#665544',
    '倉庫・運輸関連業': '#7799aa',
    '精密機器':     '#aa77cc',
    '繊維製品':     '#dd99bb',
    '水産・農林業': '#55aa77',
    '鉱業':         '#886633',
    '卸売業':       '#44aacc',
    '電気・ガス業': '#ffbb55',
    '海運業':       '#3399bb',
  };
  return MAP[sector] || '#778899';
}
