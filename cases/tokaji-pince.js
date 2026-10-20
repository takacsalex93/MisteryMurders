/* 6. ügy — Köd a Hegyalján (nehéz) */
(window.MM_CASES = window.MM_CASES || []).push({
  id: "tokaji-pince",
  fx: "fog",
  sound: "country",
  sounds: { lepcso: "cellar", erjeszto: "cellar", lada: "cellar" },
  cover: "generic",
  number: 6,
  title: "Köd a Hegyalján",
  meta: "Mád, Tokaj-Hegyalja · 1938. október 14. · Ügyszám 1938/1172",
  teaser: "Szüret idején a szőlőbirtok gazdáját holtan találják a pincelépcső alján. Mindenki zuhanásra gyanakszik. De a lépcsőn nincs egy csepp vér sem, és valaki az éjjel a holttesttel is járt odalent.",
  difficulty: "Nehéz",

  intro: {
    eyebrow: "M. kir. csendőrség · Tokaji őrs",
    heading: "Dr. Récsey Lőrinc halála a pincében",
    lead: "1938. október 15-én hajnali fél hatkor a szüretelők a pincelépcső alján találták meg Dr. Récsey Lőrinc szőlőbirtokost. A Bodrog felől sűrű köd ült a dombokra, a présházban már forrt az új must.",
    body: "Az özvegy szerint a férje leesett a meredek lépcsőn. A csendőrség hajlana rá, hogy elfogadja. De a gazda feje sértetlen, a kőlépcsőn egy csepp vér sincs, és a csizmáján friss must szárad. Hat ember volt a birtokon. Legalább kettő hazudik.",
    start: "lepcso"
  },

  suspects: [
    { id: "ilona", look: { hair: "bun", clothes: "dress", acc: ["pearls"], lips: true }, name: "Récsey Ilona", role: "Az özvegy, 45 éves. Húsz éve él a birtokon.",
      stmt: "„Tizenegykor lefeküdtem. Lőrinc még lement kóstolni, mint minden szüretkor. Mindig mondtam neki, hogy az a lépcső egyszer a halála lesz.”" },
    { id: "andras", look: { hair: "slick", clothes: "suit" }, name: "Récsey András", role: "A fiú, 24 éves. Pesten tanul, ha éppen nem kártyázik.",
      stmt: "„Igen, összevesztünk délután. Apám nem volt hajlandó kifizetni a váltóimat. De egész este a szalonban {{kártyáztam|kartyazott}} Lorenz úrral, ő is megmondhatja.”" },
    { id: "gaspar", look: { hair: "bald", clothes: "uniform", acc: ["mustache"] }, name: "Fazekas Gáspár", role: "Pincemester, 61 éves. Negyven éve dolgozik a pincében. Fiatalon leesett egy hordóról, azóta biceg.",
      stmt: "„A gazda tizenegykor lement kóstolni, mint mindig. Én a {{présházban|preshaz}} voltam, a mustot figyeltem. Ez a pince veszélyes, uram. Az erjedő must gáza már nem egy embert megölt.”" },
    { id: "lorenz", look: { hair: "short", hat: "bowler", clothes: "suit", acc: ["monocle"] }, name: "Anton Lorenz", role: "Bécsi borkereskedő, 50 éves. Minden szüretkor itt vásárol.",
      stmt: "„Tizenegytől éjfélig kártyáztam a fiatalúrral. Négyszáz pengőt nyertem, nem büszkélkedem vele. A gazdával kitűnő viszonyban voltam.”" },
    { id: "rozalia", look: { hair: "bob", hat: "maid", clothes: "maid", lips: true }, name: "Kiss Rozália", role: "Szakácsné, 22 éves. Mádi lány, három éve szolgál a házban.",
      stmt: "„Én a konyhában {{mosogattam|mosogatott}} éjfélig. Nem láttam semmit. Semmit, kérem. Az ablakon sem néztem ki.”" },
    { id: "barany", look: { hair: "short", clothes: "trench" }, name: "Bárány Péter", role: "A birtok intézője, 40 éves. Tizenkét éve vezeti a gazdaságot.",
      stmt: "„A beteg lóval virrasztottam az istállóban. A pincébe aznap este be sem tettem a lábam.”" }
  ],

    words: {
    gazda: ["Récsey Lőrinc, a gazda", "személy"],
    vasrud: ["vasrúd", "tárgy"], kurto: ["a kürtő fedele", "tárgy"], gyertya: ["gyertya", "tárgy"], must: ["erjedő must gáza", "tárgy"], cimke: ["hamis aszúcímkék", "tárgy"], lampas: ["lámpás", "tárgy"], kostolo: ["kóstolóbor", "tárgy"],
    erjeszto: ["erjesztőpince", "hely"], lepcso: ["pincelépcső", "hely"], preshaz: ["présház", "hely"], udvar: ["udvar, a kürtő mellett", "hely"],
    t2300: ["23:00", "idő"], t0100: ["egy óra", "idő"], t0130: ["fél kettő", "idő"], hajnal: ["fél hat", "idő"],
    lezarta: ["lezárta a kürtőt", "tett"], cipelte: ["a lépcsőhöz vitték", "tett"], kartyazott: ["kártyázott", "tett"], mosogatott: ["mosogatott", "tett"],
    hamisasz: ["a hamis aszú eladása", "indíték"], orokseg: ["kitagadás", "indíték"], szerelem: ["titkolt szerelem", "indíték"], valto: ["kifizetetlen váltók", "indíték"]
  },

  clues: {
    holttest: { t: "A lépcső alján", src: "Pincelépcső", x: "{{A gazda|gazda}} a {{lépcső|lepcso}} alján fekszik, de a feje sértetlen, a kőlépcsőn egy csepp vér sincs. A csizmáján friss must szárad. A {{gyertyája|gyertya}} és a {{kóstolópohara|kostolo}} nincs mellette." },
    erjeszto: { t: "A kialudt gyertya", src: "Erjesztőpince", x: "Az {{erjesztőpince|erjeszto}} asztalán a gazda félig égett, kialudt gyertyája és a kóstolópohara. A gyertya úgy aludt ki, ahogy az {{erjedő must gázától|must}} szokott. A padlón két csík vezet a lépcső felé." },
    hordo: { t: "Gáspár hordója", src: "Erjesztőpince", x: "A hetes hordón krétával: FURMINT 1937. A pincészek szerint Gáspár ezt „a saját hordójának” nevezi, és senkit sem enged a közelébe." },
    vasrud: { t: "A vasrúd", src: "Erjesztőpince", x: "Az erjesztőpince vasajtaja kívülről egy {{vasrúddal|vasrud}} reteszelhető. A rúd most a falnak támasztva áll, a végén friss kopás. Bentről senki sem tudja kinyitni." },
    hol: { t: "Ki hol volt 23:00 és 23:30 között?", src: "Udvar · tanúvallomások", x: "András és Lorenz a szalonban, Ilona a hálószobában, Rozália a konyhában, Bárány az istállóban. Fazekas Gáspár az {{udvaron, a szellőzőkürtőnél|udvar}}." },
    ejszaka: { t: "Az éjszaka sorrendje", src: "Szalon · összesítés", x: "{{23:00|t2300}}: a gazda lemegy. Valaki rárakja a vasrudat az ajtóra, aztán {{lezárja a kürtőt|lezarta}}. Fél órán belül kialszik a gyertya. {{Egy óra|t0100}} körül valaki kinyitja a kürtőt és leveszi a rudat. {{Fél kettőkor|t0130}} Ilona megtalálja a férjét, és Báránnyal a lépcső aljára {{viszik|cipelte}}. {{Fél hatkor|hajnal}} a szüretelők rátalálnak." },
    lada: { t: "A pincemester ládája", src: "Pincemester háza", x: "A ládában háromezer pengő készpénz, egy köteg {{hamis aszúcímke|cimke}} „1935, 6 puttonyos” felirattal, és egy titkosított füzet." },
    fuzet: { t: "A titkos füzet", src: "A pincemester ládája", x: "„Lorenz ötven palack {{hamis aszút|hamisasz}} kapott. A gazda ma este a hetes hordóból akar kóstolni. Ha rájön, végem. A {{kürtőt|kurto}} be kell zárni.”" },
    penesz: { t: "Pincepenész", src: "Ilona szobája", x: "Ilona papucsán és pongyoláján fekete, bolyhos penész. A tokaji pincék falát borító nemes penész csak akkor tapad meg, ha valaki odalent a falhoz ér." },
    hazugsag: { t: "Ellentmondás Ilona vallomásában", src: "Ilona szobája · vallomás", x: "Ilona a jegyzőkönyvben azt állította, hogy bevette a cseppjeit, és reggelig ki sem mozdult a szobájából." },
    lorenz: { t: "Lorenz számlái", src: "Szalon", x: "Lorenz jegyzéke: ötven palack 1935-ös hatputtonyos aszú, készpénzért, Fazekas Gáspártól személyesen." },
    andras: { t: "András váltói", src: "Szalon", x: "András zsebében hatezer pengőről szóló {{váltók|valto}}. A cselédek hallották, hogy délután az apja {{kitagadással|orokseg}} fenyegette." },
    rozalia: { t: "Rozália levelei", src: "Konyha", x: "Rozália kötényében András levelei. Gyengéd, {{titkolt szerelem|szerelem}}." },
    barany: { t: "Bárány zsebkendője", src: "Istálló", x: "Bárány intéző zsebkendőjén fekete pincepenész, a kabátja ujján must. Azt állítja, aznap este be sem tette a lábát a pincébe." },
    baranyvall: { t: "Bárány beismerése", src: "Bárány vallomása", x: "Bárány beismeri: fél kettőkor az asszony kérésére lement a pincébe, és segített a gazdát a lépcső aljára vinni. A gazda akkor már halott volt." },
    mustnaplo: { t: "A mustnapló", src: "Présház", x: "Gáspár mustnaplójában 23:30-kor és 0:30-kor is mérés áll, a saját kézírásával. A présház ajtaja azonban este óta bedrótozva volt, és a drót reggel érintetlen." }
  },
contradictions: [
    {"id": "c-ilona", "suspect": "ilona", "clue": ["penesz", "hazugsag"], "reveal": "Ilona összeomlik: „Lementem érte fél kettőkor. Ott feküdt a hordók között. Azt hittem, András tette a veszekedés után… Felkeltettem Bárányt, és felvittük a lépcső aljára, hogy baleset legyen.”"},
    {"id": "c-barany", "suspect": "barany", "clue": ["barany"], "gives": "baranyvall", "reveal": "Bárány lesüti a szemét: „Az asszony kért meg. A gazda már halott volt, amikor odaértem. Nem nyúltam semmihez, csak cipeltem.”"},
    {"id": "c-gaspar", "suspect": "gaspar", "clue": ["hol"], "reveal": "Gáspár bicegve hátrál egy lépést: „A kürtőt… a kürtőt csak megnéztem. Ez a dolgom.” A présház ajtaja reggel érintetlen volt."},
    {"id": "c-gaspar2", "suspect": "gaspar", "clue": ["fuzet", "lada"], "reveal": "Gáspár sokáig hallgat. „A gazda sosem értett a borhoz” mondja végül. „Csak a címkéhez.”"},
    {"id": "c-rozalia", "suspect": "rozalia", "clue": ["rozalia"], "reveal": "Rozália elpirul, aztán suttogva mondja: „Kinéztem az ablakon. Egy {{lámpást|lampas}} láttam a kürtőnél, és valaki bicegett. Nem mertem szólni, féltem, hogy Andrást gyanúsítják.”"},
    {"id": "c-lorenz", "suspect": "lorenz", "clue": ["lorenz"], "lie": false, "reveal": "Lorenz felhúzza a szemöldökét: „Gáspártól vettem, a gazda tudtával. Legalábbis ő ezt mondta.”"},
    {"id": "c-andras", "suspect": "andras", "clue": ["andras"], "lie": false, "reveal": "András dacosan néz: „Igen, tartozom, és apám kitagadással fenyegetett. De tizenegytől éjfélig Lorenz úrral kártyáztam, és négyszáz pengőt vesztettem.”"}
  ],

    locations: [
    { id: "lepcso", spots: { penesz_: [15, 40], korlat: [30, 50], holttest: [60, 60] }, name: "Pincelépcső", desc: "Meredek, nyirkos kőlépcső a mélybe, a falon fekete, bolyhos penész. Lent a gazda.",
      look: "Meredek, nyirkos kőlépcső a mélybe. A falon [[fekete, bolyhos penész|penesz_]], [[a korlát|korlat]] hideg és nedves. [[A lépcső aljánál fekszik a gazda|holttest]], a szeme nyitva.",
      decoys: { penesz_: "A tokaji nemes penész. Aki a falhoz ér, annak a ruháján, cipőjén is megmarad.", korlat: "Szilárd, sehol sem lazult meg. Aki megbotlik, ebbe kapaszkodhat." },
      items: [{ clue: "holttest", label: "A gazda", text: "Megvizsgálod a holttestet és a lépcsőt." }],
      puzzle: "halal" },
    { id: "erjeszto", spots: { hordo: [18, 25], vasrud: [92, 60], nyilas: [67, 10] }, name: "Erjesztőpince", desc: "Hordósorok, a mustból sustorogva száll fel a gáz. Az asztalon kialudt gyertya.",
      look: "Hordósorok, a mustból sustorogva száll fel a gáz, a levegő nehéz és édeskés. [[A hetes hordón krétával írt felirat|hordo]]. [[A vasajtón kívül egy nehéz vasrúd, a falnak támasztva|vasrud]]. A mennyezeten [[a szellőzőnyílás|nyilas]].",
      decoys: { nyilas: "Felfelé vezet, a kürtőbe. Ha a fedelét lezárják, a gáz nem tud távozni." },
      requires: "halal",
      items: [
        { clue: "hordo", label: "A hetes hordó", text: "Elolvasod a krétával írt feliratot." },
        { clue: "vasrud", label: "A vasajtó", text: "Megvizsgálod az ajtót és a rudat." }] },
    { id: "udvar", spots: { fedel: [55, 35], nyom: [50, 85], drot: [25, 55] }, name: "Udvar és szellőzőkürtő", desc: "Ködös udvar, a pince fölött kőből rakott kürtő, a fedele egy csavarral zárható.",
      look: "Ködös udvar. A pince fölött kőből rakott kürtő, [[a fedele egy csavarral zárható|fedel]]. A sárban [[lábnyomok a kürtőtől a présház felé|nyom]], a présház ajtaján [[drót|drot]].",
      decoys: { fedel: "A csavar frissen olajozott, a fedél nyitva. Valaki tudta, hogyan kell bánni vele.", nyom: "Egyenetlen lépések: egy rövid, egy hosszú, egy rövid, egy hosszú.", drot: "A présház ajtaját este dróttal kötötték be, és a drót érintetlen." },
      puzzle: "hol" },
    { id: "mester", spots: { bot: [32, 30], asz: [12, 38] }, name: "A pincemester háza", desc: "Kis vályogház a présház mögött. A falon évjárat-táblázat, az ágy alatt egy vasalt láda.",
      look: "Kis vályogház a présház mögött. A falon évjárat-táblázat, az ágy alatt egy vasalt láda. A sarokban [[egy sétabot|bot]], az asztalon [[egy üveg aszú|asz]].",
      decoys: { bot: "Kopott tölgyfa sétabot, a vége vasalt. Gáspár negyven éve biceg.", asz: "Címke nélküli palack. Ha megkóstolod: igazi, hatputtonyos aszú." },
      puzzle: "kod" },
    { id: "lada", spots: { fuzet_: [85, 60] }, name: "A pincemester ládája", desc: "A felnyitott ládában pénz, címkék és egy kopott füzet.",
      look: "A felnyitott ládában pénzkötegek, címkék, és legalul [[egy kopott, viaszosvászon füzet|fuzet_]].",
      decoys: { fuzet_: "Az utolsó oldala értelmetlen betűsor. Ezt meg kell fejteni." },
      requires: "kod", puzzle: "konyv" },
    { id: "haloszoba", spots: { tea: [42, 30], csepp: [50, 32], penesz: [60, 85] }, name: "Ilona szobája", desc: "Kamillatea az éjjeliszekrényen, a szék támláján pongyola, az ágy előtt papucs.",
      look: "[[Kamillatea az éjjeliszekrényen|tea]], mellette [[egy üveg altatócsepp|csepp]]. [[A szék támláján pongyola, az ágy előtt papucs|penesz]].",
      decoys: { tea: "Kihűlt, érintetlen. A szobalány fél tizenkettőkor hozta.", csepp: "Az üveg tele van. Ma este senki sem vett be belőle." },
      items: [{ clue: "penesz", label: "A papucs és a pongyola", text: "Közelebbről megnézed a papucsot és a pongyolát." }],
      puzzle: "vallomas" },
    { id: "szalon", spots: { kartya: [30, 55], lorenz: [72, 80], andras: [22, 70] }, name: "Szalon", desc: "Kártyaasztal, félig üres borospoharak, a kandallóban hamu.",
      look: "Kártyaasztal, [[kiterített kártyák|kartya]], félig üres borospoharak. [[Lorenz úr irattáskája|lorenz]] egy széken, [[András kabátja|andras]] a fotel karfáján.",
      decoys: { kartya: "Ulti. A jegyzőlapon Lorenz javára négyszáz pengő, éjfélkor lezárva." },
      items: [
        { clue: "lorenz", label: "Lorenz úr irattáskája", text: "Átnézed a gondosan vezetett jegyzékeket." },
        { clue: "andras", label: "András kabátja", text: "Kihúzod a gyűrött papírokat a zsebből." }],
      puzzle: "ido" },
    { id: "preshaz", spots: { pres: [35, 50], homero: [70, 60] }, name: "Présház", desc: "Kádak, prések, mustos dézsák. Az ajtót este dróttal kötötték be.",
      look: "Kádak, faprések, a levegőben erjedő must szaga. [[A nagy prés|pres]] mellett [[egy hőmérő egy dézsában|homero]]. A falon egy szögön lóg Gáspár mustnaplója, mellette egy ceruza.",
      decoys: { pres: "Tegnap délután óta nem préseltek. A törkölyön vékony, száraz kéreg.", homero: "Tizennyolc fok. A mustot óránként kell mérni, mondja az inas, ezt Gáspár sosem mulasztja el." },
      puzzle: "mustnaplo" },
    { id: "konyha", spots: { ablak: [70, 25], rozalia: [20, 50] }, name: "Konyha", desc: "Mosatlan edények, az ablakból éppen a szellőzőkürtőre látni.",
      look: "Mosatlan edények. [[Az ablakból|ablak]] éppen a szellőzőkürtőre látni. A szögön [[Rozália köténye|rozalia]].",
      decoys: { ablak: "Innen tisztán látni a kürtőt, ködben is, ha valaki lámpással áll mellette." },
      items: [{ clue: "rozalia", label: "Rozália köténye", text: "A zsebéből levelek látszanak." }] },
    { id: "istallo", spots: { lo: [60, 50], barany: [32, 30], kocsis: [15, 55] }, name: "Istálló", desc: "Szalma, lámpás, egy beteg ló pokróccal letakarva.",
      look: "Szalma, lámpás, [[egy beteg ló pokróccal letakarva|lo]]. A szögön [[Bárány kabátja, a zsebéből zsebkendő lóg ki|barany]]. A sarokban [[a kocsis|kocsis]] bóbiskol.",
      decoys: { lo: "Kólikás, de túléli. Valaki egész éjjel itt virrasztott mellette.", kocsis: "„Bárány úr velem volt, csak fél kettőkor szaladt el, amikor az asszony kiabált. Egy óra körül nyikorgott a kürtő fedele.”" },
      items: [{ clue: "barany", label: "Bárány kabátja", text: "Kihúzod a zsebkendőt." }] }
  ],

    deductions: [
    { id: "d-attett", from: ["holttest", "erjeszto"], t: "Nem a lépcsőn halt meg", x: "A lépcsőn nincs vér, a gyertya és a pohár lent maradt az erjesztőpincében, a padlón húzásnyom. A gazda az erjesztőpincében halt meg, és utána vitték a lépcső aljára.",
      text: "A gazda itt halt meg: {}. Csak utána vitték ide: {}.", b: ["erjeszto", "lepcso"] },
    { id: "d-gaz", from: ["erjeszto", "vasrud"], t: "Bezárva a gázba", x: "Az erjesztőpince ajtaját kívülről vasrúddal lehet reteszelni, és a rúdon friss a kopás. A gyertya a must gázától aludt ki. A gazdát bezárták, és a gáz ölte meg.",
      text: "Valaki egy {} segítségével kívülről bezárta az ajtót. A gazdát ez ölte meg: {}.", b: ["vasrud", "must"] },
    { id: "d-gaspar", from: ["hol", "fuzet"], t: "A kürtőnél", x: "Fazekas Gáspár tizenegy és fél tizenkettő között a kürtőnél állt, nem a présházban, és a füzetében ez áll: „A kürtőt be kell zárni.”",
      text: "Tizenegy után ezen a helyen: {} ez a személy állt: {}. A füzete szerint pontosan ezt akarta: {}.", b: ["udvar", "gaspar", "lezarta"] },
    { id: "d-ilona", from: ["penesz", "hazugsag"], t: "Ilona lent járt", x: "Ilona azt állítja, ki sem mozdult a szobájából, de a papucsán és a pongyoláján pincepenész van, ami csak odalent tapad meg.",
      text: "Az özvegy, {}, hazudott: éjjel lent járt a pincében, ekkor: {}.", b: ["ilona", "t0130"] },
    { id: "d-cipelok", from: ["d-ilona", "baranyvall"], t: "Ketten cipelték", x: "Ilona éjjel lent járt, és Bárány zsebkendőjén is pincepenész, a kabátján must. Ketten vitték fel a gazdát a lépcső aljára.",
      text: "A holttestet ketten {}: Ilona és {}.", b: ["cipelte", "barany"] },
    { id: "d-hamis", from: ["lada", "lorenz"], t: "A hamis aszú", x: "Gáspár ládájában hamis „1935, 6 puttonyos” címkék és háromezer pengő, Lorenz pedig ötven palack ilyen aszút vett tőle készpénzért, személyesen.",
      text: "Gáspár ezeket ragasztotta az olcsó borra: {}. A vevő: {}. Ezt titkolta a gazda elől: {}.", b: ["cimke", "lorenz", "hamisasz"] }
  ],
events: [
    { id: "lang", afterSolved: "halal", title: "Elkékül a láng",
      text: "Ahogy belépsz az erjesztőpincébe, a gyertyád lángja hirtelen elkékül és összezsugorodik. A torkod kaparni kezd, a halántékod lüktet.\n\nValaki hátulról megragadja a karodat, és kiránt az ajtón. Fazekas Gáspár az. „A must gáza, uram! Még egy perc, és ön is ott marad.” A szeme furcsán csillog a lámpás fényében." },
    { id: "kod", afterSolved: "kod", title: "Gáspár a ködben",
      text: "Abban a pillanatban, ahogy a láda fedele felpattan, odakint csizmák csikorognak. Az ablakon át látod: Gáspár bicegve indul a szőlőhegy felé, be a ködbe.\n\nBárány intéző fut utána, és a szőlősor végén elkapja a karját. Gáspár nem ellenkezik. Csak annyit mond: „Negyven évig én csináltam ezt a bort.”" }
  ],

  fates: {
    ilona: "Ilona tényleg lent járt, tényleg megrendezte a zuhanást, és ez elég volt. A gyilkosságot is rá bizonyítják. A valódi tettes a temetésen még a koporsót is segít vinni.",
    andras: "A kitagadás és a váltók tökéletes indítékot adtak. Andrást elítélik az apja meggyilkolásáért, és Rozália sosem meri elmondani, mit látott az ablakból.",
    lorenz: "A hamis aszú az ő pincéjébe került, a pénz az ő zsebéből jött. Anton Lorenzet elítélik, és a bécsi borházát a hitelezők árverezik el.",
    rozalia: "Ő látta a lámpást, és hallgatott. Rozáliát, a mádi szakácslányt elítélik; a falu még évekig suttog arról, hogy a csendes lányok a legveszélyesebbek.",
    barany: "Bárány tényleg cipelte a holttestet, és ez elég volt a bíróságnak. Az intézőt gyilkosságért ítélik el, a pincemester pedig tovább tölti a hamis aszút."
  },
  puzzles: {
    mustnaplo: {
      type: "log", title: "A mustnapló", reward: "mustnaplo", answer: [3, 4],
      body: `<p>Gáspár óránként feljegyzi a must hőmérsékletét és cukorfokát. Azt mondja, egész este a présházban volt. A présház ajtaját este dróttal kötötték be, és reggel érintetlenül találták. Melyik két bejegyzés nem lehet igaz?</p>`,
      cols: ["Idő", "Hőmérséklet", "Cukorfok", "Megjegyzés"],
      rows: [
        ["20:30", "17 °C", "22", "—"],
        ["21:30", "17 °C", "22", "—"],
        ["22:30", "18 °C", "21", "ajtó bedrótozva éjszakára"],
        ["23:30", "18 °C", "21", "—"],
        ["00:30", "18 °C", "21", "—"],
        ["06:00", "19 °C", "20", "drót leszedve"]
      ],
      wrong: { 2: "Ez a bezárás bejegyzése, Gáspár ekkor még bent volt.", 5: "Reggel, a drót leszedése után mérte." },
      hints: ["Ki írhatott a naplóba, amíg az ajtó bedrótozva állt?"]
    },
    halal: {
      type: "choice", title: "Hol halt meg?", reward: "erjeszto", answer: "B",
      body: `<p>A gazda a lépcső alján fekszik, de nem biztos, hogy ott is halt meg. Nézd meg a pince három ágát, ahová aznap este mehetett.</p>`,
      options: [
        { v: "A", label: "A pincelépcső alja", sample: "A kőlépcsőn egy csepp vér sincs, a gazda feje sértetlen. Sem gyertya, sem pohár nincs mellette." },
        { v: "B", label: "Az erjesztőpince", sample: "Az asztalon félig égett, kialudt gyertya és egy kóstolópohár. Mustos lábnyomok, és a padlón két csík a lépcső felé." },
        { v: "C", label: "Az aszús kamra", sample: "A vasajtón rozsdás lakat, a küszöbön a por érintetlen. Hetek óta senki sem nyitotta ki." }
      ],
      confirm: "Itt halt meg",
      wrong: { A: "Egy halálos zuhanás nyomot hagy. Itt nincs semmi.", C: "Az érintetlen porban senki sem járt." },
      hints: ["Egy kialudt gyertya a pincében többet mond, mint egy holttest. Hol aludt ki félig égve?"]
    },
    hol: {
      type: "assign", title: "A kürtő éjszakája", reward: "hol", columnLabel: "Hol volt 23:00 és 23:30 között?", unique: false,
      body: `<p>Valaki lezárta a szellőzőkürtőt, amíg a gazda lent volt. Ki hol tartózkodott tizenegy és fél tizenkettő között? Itt többen is lehettek ugyanott.</p>`,
      facts: [
        "Lorenz úr és András egész este a szalonban kártyázott. Lorenz tizenegy után négyszáz pengőt nyert, ezt András dühösen emlegeti.",
        "Ilona asszony tizenegykor felment a hálószobájába. A szobalány fél tizenkettőkor kamillateát vitt neki.",
        "Bárány intéző a beteg lóval virrasztott az istállóban, a kocsis végig vele volt.",
        "Rozália a konyhaablakból egy lámpást látott a szellőzőkürtőnél, és egy bicegő alakot. Ő maga éjfélig mosogatott.",
        "A présház ajtaját este dróttal kötötték be, és reggel ugyanúgy, érintetlenül találták.",
        "A birtokon csak egyetlen ember biceg."
      ],
      choices: ["Szalon", "Hálószoba", "Konyha", "Istálló", "Présház", "Udvar, a kürtőnél"],
      answer: { ilona: "Hálószoba", andras: "Szalon", gaspar: "Udvar, a kürtőnél", lorenz: "Szalon", rozalia: "Konyha", barany: "Istálló" },
      hints: ["Olvasd el a gyanúsítottak bemutatkozását. Ki biceg?"]
    },
    ido: {
      type: "order", title: "Az éjszaka sorrendje", reward: "ejszaka",
      body: `<p>Rakd sorba, mi történt aznap éjjel a pincénél. Csak néhány időpont biztos, a többit a tanúk szavaiból kell kikövetkeztetned.</p>`,
      facts: [
        "A gazda pontban tizenegykor indult le a pincébe, gyertyával és kóstolópohárral.",
        "Rozália előbb egy vasrúd csendülését hallotta a pinceajtó felől, pár perccel később pedig a lámpást látta a kürtőnél.",
        "A pincemester maga mondta: zárt pincében az erjedő must gáza fél óra alatt mindent megtölt, és először mindig a gyertya alszik ki.",
        "Egy óra körül a kocsis az istállóból hallotta, hogy nyikorog a kürtő fedele. Az ajtón azóta nem volt vasrúd.",
        "Bárány szerint fél kettőkor az asszony kiabálva keltette, és együtt vitték fel a gazdát a lépcső aljáig. Ilona addigra már lent volt: a pinceajtót nyitva találta, és bent a férjét.",
        "A szüretelők hajnali fél hatkor értek a pincéhez."
      ],
      items: [
        { id: "le", text: "A gazda lemegy az erjesztőpincébe" },
        { id: "rud", text: "Valaki rárakja a vasrudat a pinceajtóra" },
        { id: "kurto", text: "Valaki lezárja a szellőzőkürtőt" },
        { id: "gyertya", text: "Kialszik a gyertya az erjesztőpincében" },
        { id: "nyit", text: "Valaki kinyitja a kürtőt, és leveszi a vasrudat" },
        { id: "talal", text: "Ilona lemegy, és megtalálja a férjét" },
        { id: "visz", text: "A holttestet a lépcső aljára viszik" },
        { id: "reggel", text: "A szüretelők rátalálnak a gazdára" }
      ],
      initial: ["visz", "gyertya", "reggel", "kurto", "le", "talal", "rud", "nyit"],
      answer: ["le", "rud", "kurto", "gyertya", "nyit", "talal", "visz", "reggel"],
      hints: ["A gyertya kialvása a gázhoz kötődik: annak a kürtő lezárása után kell jönnie, de egy óra előtt."]
    },
    kod: {
      type: "code", title: "A vasalt láda", reward: "lada", answers: ["1935"], length: 4,
      body: `<p>A pincemester ládáján négyjegyű számzár. Az inas szerint Gáspár azt mondogatja: „Minden zárom a legnagyobb évemre nyílik.” A falon Gáspár saját kezű évjárat-táblázata:</p>
<div class="typed">1932 · 3 puttonyos · gyenge év
1933 · 4 puttonyos
1934 · 5 puttonyos
1935 · 6 puttonyos
1936 · 3 puttonyos · jég verte el
1937 · 5 puttonyos</div>`,
      wrong: "A zár nem nyílik. Melyik év volt a legnagyobb?",
      hints: ["A puttonyszám az aszú rangját méri: minél több, annál nagyobb az év."]
    },
    konyv: {
      type: "keyword", title: "A titkos füzet", reward: "fuzet", key: "FURMINT",
      plain: "LORENZ OTVEN PALACK HAMIS ASZUT KAPOTT. A GAZDA MA ESTE A HETES HORDOBOL AKAR KOSTOLNI. HA RAJON, VEGEM. A KURTOT BE KELL ZARNI.",
      body: `<p>A füzet utolsó oldala értelmetlen betűsor. A betűk nem egyformán csúsznak el: egy kulcsszó tolja el őket, betűről betűre. Gáspár nem tanult sokat, a kulcsát biztosan nem a könyvekből vette, hanem a pincéből.</p>`,
      hints: ["A kulcsszó azon a hordón áll, amelyet Gáspár a sajátjának nevez. Csak a szó kell, az évszám nem."]
    },
    vallomas: {
      type: "spot", title: "Ilona vallomása", reward: "hazugsag", answer: 2,
      body: `<p>Az özvegy vallomása a csendőrségi jegyzőkönyvből. Egy kiemelt mondatrésze nem igaz. Vesd össze azzal, amit a szobájában találtál.</p>`,
      statement: "[[Tizenegykor lefeküdtem]], [[Lőrinc még lement kóstolni]], mint minden szüretkor. Bevettem a cseppjeimet, és [[reggelig ki sem mozdultam a szobámból]]. [[A szüretelők kiabálására ébredtem]]. [[Mindig mondtam neki, hogy az a lépcső veszélyes]].",
      wrong: {
        0: "Ez igaz: a szobalány tanúsítja, hogy tizenegykor felment.",
        1: "Ez igaz, mindenki látta lemenni.",
        3: "Lehet, hogy így volt. Nem ez a hazugság.",
        4: "Ezt mindenki hallotta tőle. Nem ez a hazugság."
      },
      hints: ["A pincepenész csak a pince falán nő, és csak akkor tapad meg, ha valaki odalent jár."]
    }
  },

    accusation: {
    story: "A gyilkos: {}. A gazda ekkor ment le a pincébe: {}. A gyilkos egy {} segítségével kívülről bezárta az erjesztőpince ajtaját, aztán felment az udvarra, és {}. A gazdát ez ölte meg: {}.\nIndíték: {}.\nA helyszínt utólag ez a személy rendezte át: {}, aki Báránnyal a lépcső aljára vitte a gazdát.",
    b: ["gaspar", "t2300", "vasrud", "lezarta", "must", "hamisasz", "ilona"], who: [0]
  },

  plan: { w: 12, h: 7.2,
    rooms: { haloszoba: [0, 0, 3, 2.4], szalon: [3, 0, 3.4, 2.4], konyha: [6.4, 0, 2.6, 2.4], istallo: [9, 0, 3, 2.4], udvar: [0, 2.4, 9, 1.8, "Udvar és kürtő"], preshaz: [9, 2.4, 3, 1.8], mester: [9, 4.2, 2.2, 1.8, "Pincemester"], lada: [11.2, 4.2, .8, 1.8, "Láda"], lepcso: [0, 4.8, 2, 2.4, "Lépcső"], erjeszto: [2, 4.8, 6, 2.4] },
    doors: [[2, 5.6, 2, 6.4], [1, 4.8, 1, 4.2], [7, 2.4, 8, 2.4], [10, 2.4, 11, 2.4]],
    marks: [[2.1, 4.65, "a pince, föld alatt"], [4.4, 4, "▲ kürtő"], [6.5, 2.75, "konyhaablak"]],
    note: "A Récsey-birtok udvara felülről. A pince a föld alatt fut, a kürtője az udvar közepén áll, éppen a konyhaablakkal szemben." },
carnation: { letter: "U", found: "Gáspár ládájában, a hamis címkék alatt egy préselt fekete szegfű és egy gépelt cédula. A jobb alsó sarkában pirossal bekarikázva egy betű.", note: "„⟪ido⟫ A gazda ma este a hetes hordóból kóstol. ⟪penz⟫ Lorenz többet nem fizet neked. ⟪lent⟫ A pince kürtőjének fedele csavarral zárható. — F. Sz.”" },

  ending: {
    heading: "Fazekas Gáspár, és az özvegy eltakarta a nyomokat.",
    paragraphs: [
      "Évek óta a pincemester adta el a birtok legjobb aszúját a gazda háta mögött, a hordókat pedig olcsó borral töltötte vissza. Aznap este a gazda bejelentette, hogy kóstolni akar a hetes hordóból. Gáspár tudta, hogy abban már nincs igazi bor, és tudta azt is, hogy a gazda rájön.",
      "Amikor Récsey tizenegykor lement, Gáspár rátette a vasrudat az erjesztőpince ajtajára, aztán felbicegett az udvarra, és lezárta a szellőzőkürtőt. Az erjedő must gáza fél óra alatt megtöltötte a pincét. Egy órakor kinyitotta a kürtőt, levette a rudat, hogy reggel baleset legyen belőle: a must gáza minden évben megöl valakit a Hegyalján.",
      "Csakhogy fél kettőkor Ilona lement a férjéért. Azt hitte, a fia ölte meg a délutáni veszekedés után. Felkeltette Báránt, és együtt a lépcső aljára vitték a gazdát, hogy zuhanásnak tűnjön. Egy gázbalesetből így lett egy rosszul megrendezett zuhanás, és ezért nézett meg valaki mindent kétszer. A pincepenész Ilona papucsán, a bicegő alak a kürtőnél és a FURMINT kulcsszó végül mindent elárult."
    ]
  }
});
