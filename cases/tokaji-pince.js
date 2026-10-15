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
      stmt: "„Igen, összevesztünk délután. Apám nem volt hajlandó kifizetni a váltóimat. De egész este a szalonban kártyáztam Lorenz úrral, ő is megmondhatja.”" },
    { id: "gaspar", look: { hair: "bald", clothes: "uniform", acc: ["mustache"] }, name: "Fazekas Gáspár", role: "Pincemester, 61 éves. Negyven éve dolgozik a pincében. Fiatalon leesett egy hordóról, azóta biceg.",
      stmt: "„A gazda tizenegykor lement kóstolni, mint mindig. Én a présházban voltam, a mustot figyeltem. Ez a pince veszélyes, uram. Az erjedő must gáza már nem egy embert megölt.”" },
    { id: "lorenz", look: { hair: "short", hat: "bowler", clothes: "suit", acc: ["monocle"] }, name: "Anton Lorenz", role: "Bécsi borkereskedő, 50 éves. Minden szüretkor itt vásárol.",
      stmt: "„Tizenegytől éjfélig kártyáztam a fiatalúrral. Négyszáz pengőt nyertem, nem büszkélkedem vele. A gazdával kitűnő viszonyban voltam.”" },
    { id: "rozalia", look: { hair: "bob", hat: "maid", clothes: "maid", lips: true }, name: "Kiss Rozália", role: "Szakácsné, 22 éves. Mádi lány, három éve szolgál a házban.",
      stmt: "„Én a konyhában mosogattam éjfélig. Nem láttam semmit. Semmit, kérem. Az ablakon sem néztem ki.”" },
    { id: "barany", look: { hair: "short", clothes: "trench" }, name: "Bárány Péter", role: "A birtok intézője, 40 éves. Tizenkét éve vezeti a gazdaságot.",
      stmt: "„A beteg lóval virrasztottam az istállóban. A pincébe aznap este be sem tettem a lábam.”" }
  ],

  clues: {
    holttest: { t: "A lépcső alján", src: "Pincelépcső", x: "A gazda a lépcső alján fekszik, de a feje sértetlen, a kőlépcsőn egy csepp vér sincs. A csizmáján friss must szárad. A gyertyája és a kóstolópohara nincs mellette." },
    erjeszto: { t: "Ahol valóban meghalt", src: "Erjesztőpince", x: "A gazda az erjesztőpincében halt meg. A gyertyája félig égve aludt ki, ahogy az erjedő must gázától szokott. A padlón két csík: a testet a lépcső felé húzták." },
    hordo: { t: "Gáspár hordója", src: "Erjesztőpince", x: "A hetes hordón krétával: FURMINT 1937. A pincészek szerint Gáspár ezt „a saját hordójának” nevezi, és senkit sem enged a közelébe." },
    vasrud: { t: "A vasrúd", src: "Erjesztőpince", x: "Az erjesztőpince vasajtaja kívülről egy vasrúddal reteszelhető. A rúd most a falnak támasztva áll, a végén friss kopás. Bentről senki sem tudja kinyitni." },
    hol: { t: "Ki hol volt 23:00 és 23:30 között?", src: "Udvar · tanúvallomások", x: "András és Lorenz a szalonban, Ilona a hálószobában, Rozália a konyhában, Bárány az istállóban. Fazekas Gáspár az udvaron, a szellőzőkürtőnél, pedig azt állítja, a présházban volt." },
    ejszaka: { t: "Az éjszaka sorrendje", src: "Szalon · összesítés", x: "23:00 a gazda lemegy. Valaki rárakja a vasrudat az ajtóra, aztán lezárja a kürtőt. Fél órán belül kialszik a gyertya. Egy óra körül valaki kinyitja a kürtőt és leveszi a rudat. Fél kettőkor Ilona megtalálja a férjét, és Báránnyal a lépcső aljára viszik. Fél hatkor a szüretelők rátalálnak." },
    lada: { t: "A pincemester ládája", src: "Pincemester háza", x: "A ládában háromezer pengő készpénz, egy köteg hamis aszúcímke „1935, 6 puttonyos” felirattal, és egy titkosított füzet." },
    fuzet: { t: "A titkos füzet", src: "A pincemester ládája", x: "„Lorenz ötven palack hamis aszút kapott. A gazda ma este a hetes hordóból akar kóstolni. Ha rájön, végem. A kürtőt be kell zárni.”" },
    penesz: { t: "Pincepenész", src: "Ilona szobája", x: "Ilona papucsán és pongyoláján fekete, bolyhos penész. A tokaji pincék falát borító nemes penész csak akkor tapad meg, ha valaki odalent a falhoz ér." },
    hazugsag: { t: "Ilona éjjel lent járt", src: "Ilona szobája · vallomás", x: "Ilona azt mondta, reggelig ki sem mozdult a szobájából. A papucsán lévő pincepenész szerint éjjel lent járt a pincében." },
    lorenz: { t: "Lorenz számlái", src: "Szalon", x: "Lorenz jegyzéke: ötven palack 1935-ös hatputtonyos aszú, készpénzért, Fazekas Gáspártól személyesen." },
    andras: { t: "András váltói", src: "Szalon", x: "András zsebében hatezer pengőről szóló váltók. A cselédek hallották, hogy délután az apja kitagadással fenyegette." },
    rozalia: { t: "Rozália levelei", src: "Konyha", x: "Rozália kötényében András levelei. Gyengéd, titkolt szerelem." },
    barany: { t: "Bárány zsebkendője", src: "Istálló", x: "Bárány intéző zsebkendőjén fekete pincepenész, a kabátja ujján must. Azt állítja, aznap este be sem tette a lábát a pincébe." }
  },

  contradictions: [
    {"id": "c-ilona", "suspect": "ilona", "clue": ["penesz", "hazugsag"], "reveal": "Ilona összeomlik: „Lementem érte fél kettőkor. Ott feküdt a hordók között. Azt hittem, András tette a veszekedés után… Felkeltettem Bárányt, és felvittük a lépcső aljára, hogy baleset legyen.”"},
    {"id": "c-barany", "suspect": "barany", "clue": ["barany"], "reveal": "Bárány lesüti a szemét: „Az asszony kért meg. A gazda már halott volt, amikor odaértem. Nem nyúltam semmihez, csak cipeltem.”"},
    {"id": "c-gaspar", "suspect": "gaspar", "clue": ["hol"], "reveal": "Gáspár bicegve hátrál egy lépést: „A kürtőt… a kürtőt csak megnéztem. Ez a dolgom.” A présház ajtaja reggel érintetlen volt."},
    {"id": "c-gaspar2", "suspect": "gaspar", "clue": ["fuzet", "lada"], "reveal": "Gáspár sokáig hallgat. „A gazda sosem értett a borhoz” mondja végül. „Csak a címkéhez.”"},
    {"id": "c-rozalia", "suspect": "rozalia", "clue": ["rozalia"], "reveal": "Rozália elpirul, aztán suttogva mondja: „Kinéztem az ablakon. Egy lámpást láttam a kürtőnél, és valaki bicegett. Nem mertem szólni, féltem, hogy Andrást gyanúsítják.”"},
    {"id": "c-lorenz", "suspect": "lorenz", "clue": ["lorenz"], "lie": false, "reveal": "Lorenz felhúzza a szemöldökét: „Gáspártól vettem, a gazda tudtával. Legalábbis ő ezt mondta.”"},
    {"id": "c-andras", "suspect": "andras", "clue": ["andras"], "lie": false, "reveal": "András dacosan néz: „Igen, tartozom, és apám kitagadással fenyegetett. De tizenegytől éjfélig Lorenz úrral kártyáztam, és négyszáz pengőt vesztettem.”"}
  ],

  locations: [
    { id: "lepcso", name: "Pincelépcső", desc: "Meredek, nyirkos kőlépcső a mélybe, a falon fekete, bolyhos penész. Lent a gazda.",
      items: [{ clue: "holttest", label: "A gazda", text: "A lépcső aljánál fekszik, a szeme nyitva." }],
      puzzle: "halal" },
    { id: "erjeszto", name: "Erjesztőpince", desc: "Hordósorok, a mustból sustorogva száll fel a gáz. Az asztalon kialudt gyertya.",
      requires: "halal",
      items: [
        { clue: "hordo", label: "A hetes hordó", text: "Krétával írt felirat az elején." },
        { clue: "vasrud", label: "A vasajtó", text: "Kívül egy nehéz vasrúd, a falnak támasztva." }] },
    { id: "udvar", name: "Udvar és szellőzőkürtő", desc: "Ködös udvar, a pince fölött kőből rakott kürtő, a fedele egy csavarral zárható.",
      puzzle: "hol" },
    { id: "mester", name: "A pincemester háza", desc: "Kis vályogház a présház mögött. A falon évjárat-táblázat, az ágy alatt egy vasalt láda.",
      puzzle: "kod" },
    { id: "lada", name: "A pincemester ládája", desc: "A felnyitott ládában pénz, címkék és egy kopott füzet.",
      requires: "kod", puzzle: "konyv" },
    { id: "haloszoba", name: "Ilona szobája", desc: "Kamillatea az éjjeliszekrényen, a szék támláján pongyola, az ágy előtt papucs.",
      items: [{ clue: "penesz", label: "A papucs és a pongyola", text: "Valami fekete, bolyhos tapad rájuk." }],
      puzzle: "vallomas" },
    { id: "szalon", name: "Szalon", desc: "Kártyaasztal, félig üres borospoharak, a kandallóban hamu.",
      items: [
        { clue: "lorenz", label: "Lorenz úr irattáskája", text: "Gondosan vezetett jegyzékek." },
        { clue: "andras", label: "András kabátja", text: "Gyűrött papírok a zsebben." }],
      puzzle: "ido" },
    { id: "konyha", name: "Konyha", desc: "Mosatlan edények, az ablakból éppen a szellőzőkürtőre látni.",
      items: [{ clue: "rozalia", label: "Rozália köténye", text: "A zsebéből levelek látszanak." }] },
    { id: "istallo", name: "Istálló", desc: "Szalma, lámpás, egy beteg ló pokróccal letakarva.",
      items: [{ clue: "barany", label: "Bárány kabátja", text: "A szögön lóg, a zsebéből zsebkendő lóg ki." }] }
  ],

  puzzles: {
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
    questions: [
      { id: "who", legend: "Ki ölte meg a gazdát?", name: "a gyilkos", from: "suspects", answer: "gaspar", proof: ["fuzet", "hol"] },
      { id: "moved", legend: "Ki rendezte át a helyszínt?", name: "a helyszín átrendezője", from: "suspects", answer: "ilona", proof: ["penesz", "hazugsag", "barany"],
        extra: [{ v: "senki", label: "Senki, a gazda tényleg a lépcsőn halt meg" }] },
      { id: "how", legend: "Hogyan halt meg a gazda?", name: "a halál módja", answer: "gaz", proof: ["erjeszto", "vasrud", "ejszaka"],
        options: [{ v: "lepcso", label: "Leesett a pincelépcsőn" }, { v: "gaz", label: "Megfulladt az erjedő must gázától a bezárt pincében" }, { v: "mereg", label: "Megmérgezték a kóstolóborral" }] },
      { id: "why", legend: "Miért ölt a gyilkos?", name: "az indíték", answer: "hamis", proof: ["fuzet", "lada", "lorenz"],
        options: [{ v: "orokseg", label: "Az örökségért" }, { v: "valto", label: "A kifizetetlen váltók miatt" }, { v: "hamis", label: "A gazda leleplezte volna a hamis aszú eladását" }, { v: "szerelem", label: "Szerelemféltésből" }] }
    ]
  },

  ending: {
    heading: "Fazekas Gáspár, és az özvegy eltakarta a nyomokat.",
    paragraphs: [
      "Évek óta a pincemester adta el a birtok legjobb aszúját a gazda háta mögött, a hordókat pedig olcsó borral töltötte vissza. Aznap este a gazda bejelentette, hogy kóstolni akar a hetes hordóból. Gáspár tudta, hogy abban már nincs igazi bor, és tudta azt is, hogy a gazda rájön.",
      "Amikor Récsey tizenegykor lement, Gáspár rátette a vasrudat az erjesztőpince ajtajára, aztán felbicegett az udvarra, és lezárta a szellőzőkürtőt. Az erjedő must gáza fél óra alatt megtöltötte a pincét. Egy órakor kinyitotta a kürtőt, levette a rudat, hogy reggel baleset legyen belőle: a must gáza minden évben megöl valakit a Hegyalján.",
      "Csakhogy fél kettőkor Ilona lement a férjéért. Azt hitte, a fia ölte meg a délutáni veszekedés után. Felkeltette Báránt, és együtt a lépcső aljára vitték a gazdát, hogy zuhanásnak tűnjön. Egy gázbalesetből így lett egy rosszul megrendezett zuhanás, és ezért nézett meg valaki mindent kétszer. A pincepenész Ilona papucsán, a bicegő alak a kürtőnél és a FURMINT kulcsszó végül mindent elárult."
    ]
  }
});
