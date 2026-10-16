/* 7. ügy — A fekete szegfű (záró ügy, a hat ügy megoldása után nyílik meg) */
(window.MM_CASES = window.MM_CASES || []).push({
  id: "fekete-szegfu",
  fx: "rain",
  sound: "city",
  sounds: { sotetkamra: "cold", irattar: "loft" },
  cover: "generic",
  number: 7,
  finale: true,
  requiresAll: ["szegfu-villa", "hollos-cukraszda", "arany-griff", "ejszakai-gyors", "corvin-szinhaz", "tokaji-pince"],
  title: "A fekete szegfű",
  meta: "Budapest, Andrássy út · 1939. március 15. · Ügyszám 1939/301",
  teaser: "Hat ügy, hat gyilkos, és mindegyiküknél egy préselt fekete szegfű. Most egy titkárnő halt meg, aki tudta, kinek a keze van mind a hat mögött. A rendőrség szerint öngyilkos lett.",
  difficulty: "Zárás",

  intro: {
    eyebrow: "Magánlevél · személyesen kézbesítve",
    heading: "Varga Edit halála az Andrássy úti irodában",
    lead: "1939. március 15-én reggel egy levél vár az asztalodon. Varga Edit írta, Dr. Fekete Szilárd ügyvédi irodájának titkárnője: „Tudom, ki a fekete szegfű. Hat ügy, hat cédula, és mindegyik mögött ugyanaz a kéz. Ma este hétkor elhozom a bizonyítékot.” Este hétkor Editet holtan találják az íróasztalánál.",
    body: "Előtte kihűlt tea, keserűmandula-szag és egy gépelt búcsúlevél. A rendőrség öngyilkosságnak tartja. Te tudod, hogy nem az. Ennek az ügynek a kulcsát az előző hat nyomozásodban gyűjtötted össze, csak még nem tudod, mit jelent.",
    start: "titkarsag"
  },

  dossier: {
    heading: "A hat cédula",
    text: "Mind a hat gyilkosnál egy préselt fekete szegfű és egy gépelt cédula volt, F. Sz. aláírással. Mindegyik sarkában egy pirossal bekarikázott betű. Időrendben:"
  },

  suspects: [
    { id: "fekete", look: { hair: "slick", clothes: "suit", acc: ["monocle", "mustache"] }, name: "Dr. Fekete Szilárd", role: "Ügyvéd, 58 éves. Az iroda tulajdonosa, a pesti üzleti élet tekintélyes alakja.",
      stmt: "„Szegény Edit. Kilenc évig dolgozott nálam. Az utóbbi időben ideges volt, magánéleti gondjai voltak. Hatkor eljöttem az irodából, és hétig a Gerbeaud-ban ültem.”" },
    { id: "irma", look: { hair: "wave", clothes: "coat", acc: ["pearls", "earrings"], lips: true }, name: "Fekete Irma", role: "Az ügyvéd felesége, 50 éves.",
      stmt: "„Egész délután otthon voltam a Rózsadombon. Az irodába évek óta be sem teszem a lábam, a férjem nem szereti.”" },
    { id: "halmi", look: { hair: "short", clothes: "bowtie", acc: ["glasses"] }, name: "Dr. Halmi Tamás", role: "Ifjabb társ, 35 éves. Öt éve dolgozik Fekete mellett.",
      stmt: "„Fél hétig a bíróságon tárgyaltam, aztán egyenesen hazamentem. Edittel jóban voltunk, semmi okom nem volt bántani.”" },
    { id: "pinter", look: { hair: "bald", clothes: "uniform", acc: ["mustache"] }, name: "Pintér József", role: "Irodaszolga, 62 éves. Harminc éve hordja az iratokat.",
      stmt: "„Hatkor bezártam az iroda ajtaját, ahogy mindig. A kulcs egész este nálam volt. Edit kisasszony még bent maradt, mint minden este.”" },
    { id: "rozsa", look: { hair: "bun", clothes: "maid", lips: true }, name: "Kovács Józsefné", short: "Rózsa néni", role: "Házmesterné, 56 éves. Rózsa néni a kapu mellől mindent lát.",
      stmt: "„Hat után senki sem jött be a kapun, csak a postás. Én a fülkémből mindent látok, kérem, nekem egy légy sem kerüli el a figyelmemet.”" }
  ],

  clues: {
    holttest: { t: "Edit az íróasztalnál", src: "Titkárság", x: "Varga Edit az íróasztalra borulva. Előtte kihűlt teáscsésze, keserűmandula-szaggal. Az orvos szerint cián, a halál fél hét és háromnegyed hét között állt be. Pintér szerint Edit minden este fél hétkor főzött magának teát." },
    bucsu: { t: "A búcsúlevél", src: "Titkárság", x: "Gépelt levél Edit írógépén: „Nem bírom tovább. Bocsássatok meg.” Alatta tintával aláírva: Varga Edit. Az aláírás tintája zöldeskék, a vonal széles." },
    szegfu: { t: "Fekete szegfű a vázában", src: "Titkárság", x: "Edit asztalán egy vázában egyetlen friss, sötét, szinte fekete szegfű. A virágos szerint ilyet Pesten csak egy úr hord a gomblyukában, minden áldott nap." },
    fuzet: { t: "Edit füzete", src: "Titkárság", x: "Edit gyorsírásos füzete. Az utolsó oldalon: „A sötétkamra kódja az a nap és hónap, amikor az első fekete szegfű nyílt. A bizonyíték az irattárban, titkosítva. A kulcs a hat cédula sarkában.”" },
    tinta: { t: "Az aláírás tintája", src: "Titkárság", x: "A búcsúlevél aláírása zöldeskék tintával, széles hegyű tollal készült. Edit csak finom hegyű lila tintás tollat használt. Zöldeskék tinta és széles hegy csak egy tollban van az irodában: Dr. Fekete Pelikan töltőtollában." },
    toll: { t: "Fekete töltőtolla", src: "Fekete irodája", x: "Dr. Fekete íróasztalán a zöldeskék tintás, széles hegyű Pelikan töltőtoll. A kupakja félrecsúszva, a hegyén még nedves a tinta." },
    naptar: { t: "Az asztali naptár", src: "Fekete irodája", x: "Fekete asztali naptárában március 15-nél ceruzával: „18.30 — E.” A bejegyzést utólag kiradírozták, de a lenyomata még olvasható." },
    cianid: { t: "A kálium-cianid", src: "Sötétkamra", x: "Fekete sötétkamrájában, a fényképészeti vegyszerek között egy „Kálium-cianid — fixáló” feliratú üveg. Ma délután még tele volt, most hiányzik belőle egy kanálnyi. Mellette egy teáskanál, rajta fehér maradvány." },
    galos: { t: "Nedves sárcipőnyomok", src: "Hátsó lépcső", x: "A hátsó lépcsőn nedves, 44-es angol sárcipő nyomai vezetnek fel az irodához, és vissza le. Az iroda kabátfogasán Fekete angol sárcipője, még vizes." },
    kulcs: { t: "A hátsó ajtó kulcsa", src: "Hátsó lépcső", x: "A hátsó lépcső ajtaját kívülről csak kulccsal lehet kinyitni. Két kulcs van: az egyik Pintéré, a másik Dr. Fekete kulcscsomóján." },
    ido: { t: "Ki hol volt fél hétkor?", src: "Porta · tanúvallomások", x: "Irma asszony otthon, a Rózsadombon. Halmi a kaszinóban. Pintér a Kék Macska kocsmában. Rózsa néni a házmesterlakásban. Dr. Fekete nem a Gerbeaud-ban volt, hanem az irodában: negyed héttől öt perccel hét előttig üresen állt a széke a kávéházban." },
    penz: { t: "A boríték a házmesternénél", src: "Porta", x: "Rózsa néni kötényzsebében egy boríték száz pengővel. A borítékon zöldeskék tintával egyetlen betű: R." },
    kesztyu: { t: "Egy női kesztyű", src: "Váróterem", x: "A váróterem fogasán egy finom női kesztyű, erős ibolyaillattal. A bélésébe hímezve: F. I." },
    zseton: { t: "Kaszinózsetonok", src: "Váróterem", x: "Halmi kabátzsebében két kaszinózseton és egy bírósági értesítő: „Március 15-én, nemzeti ünnep alkalmából a törvényszék zárva tart.”" },
    kocsma: { t: "A kocsmai blokk", src: "Porta", x: "Pintér mellényzsebében a Kék Macska kocsma blokkja: két fröccs, 18:05 és 19:20 között." },
    hazugsag: { t: "Fekete hazugsága", src: "Váróterem · vallomás", x: "Fekete azt vallotta, egy percre sem állt fel a Gerbeaud asztalától. A pincér szerint negyed hétkor elment, és csak öt perccel hét előtt jött vissza." },
    dosszie: { t: "Edit titkos dossziéja", src: "Irattár", x: "Megfejtve: „A fekete szegfű: Dr. Fekete Szilárd. Hat cédula, hat gyilkos, hat vétel: a Kendeffy-képek, a Hollós cukrászda, Az utolsó tánc jogai, a Ráday-részvények, a Corvin Színház, a Récsey-birtok. Mindet a Lánchíd Rt. vette meg, áron alul. A Lánchíd Rt. tulajdonosa: Dr. Fekete Szilárd.”" },
    fenykepek: { t: "Száradó fényképek", src: "Sötétkamra", x: "A sötétkamra zsinórján hat fénykép szárad: a Szegfű-villa, a Hollós cukrászda, az Arany Griff, egy hálókocsi a Keleti pályaudvaron, a Corvin Színház zsinórpadlása és a Récsey-birtok pincéje. Mindegyiken egy dátum, mindig néhány nappal a gyilkosság előttről." },
    lanchid: { t: "A cégjegyzék", src: "Irattár", x: "A Lánchíd Rt. cégkivonata: egyedüli részvényese Dr. Fekete Szilárd. Az elmúlt nyolc évben hat nagy vásárlás, mindegyik közvetlenül egy gyilkossági botrány után." }
  },

  contradictions: [
    { id: "c-fekete", suspect: "fekete", clue: ["galos", "kulcs"], reveal: "Fekete mosolya meg sem rezdül: „Gyakran használom a hátsó lépcsőt, a kocsimtól közelebb van.” Csakhogy azt állította, hat és hét között a Gerbeaud-ban ült." },
    { id: "c-fekete2", suspect: "fekete", clue: ["tinta", "toll"], reveal: "„Bárki kölcsönvehette a tollamat” mondja Fekete. Közben a gomblyukában lévő sötét szegfűt igazgatja." },
    { id: "c-irma", suspect: "irma", clue: ["kesztyu"], reveal: "Irma elsápad: „Jó, itt voltam ötkor. Meg akartam kérdezni Editet, van-e a férjemnek valakije. Azt mondta, sokkal rosszabb a helyzet, de még nem mondhatja el. Fél hatkor hazamentem.”" },
    { id: "c-halmi", suspect: "halmi", clue: ["zseton"], reveal: "Halmi elvörösödik: „A bíróság zárva volt, igen. A kaszinóban voltam. Ha Fekete megtudja, kirúg. De Editet nem bántottam.”" },
    { id: "c-pinter", suspect: "pinter", clue: ["kocsma"], reveal: "Pintér a sapkáját gyűri: „Nem zártam be az ajtót, Edit kisasszony benn maradt, minek. Átugrottam egy fröccsre. Hétkor jöttem vissza, akkor találtam meg.”" },
    { id: "c-rozsa", suspect: "rozsa", clue: ["penz"], reveal: "Rózsa néni összetöri a kezét: „Fekete úr adta. Fél hétkor jött vissza a hátsó lépcsőn, és azt mondta, felejtsem el. Száz pengő, kérem. Nekem az egy havi lakbér.”" }
  ],

  locations: [
    { id: "titkarsag", name: "Edit szobája", desc: "Iratszekrények, egy írógép, a radiátoron kihűlt teáskanna. Az asztalon egy váza egyetlen virággal.",
      items: [
        { clue: "holttest", label: "Edit", text: "Az íróasztalra borult, a keze még a teáscsésze mellett." },
        { clue: "bucsu", label: "A búcsúlevél", text: "Az írógépben maradt, alul tintás aláírás." },
        { clue: "szegfu", label: "A váza", text: "Egyetlen szál, szinte fekete virág." },
        { clue: "fuzet", label: "A gyorsírásos füzet", text: "A fiókban, egy köteg iktatókönyv alatt." }],
      puzzle: "alairas" },
    { id: "fekete_iroda", name: "Fekete irodája", desc: "Bőrfotelek, mahagóni íróasztal, a falon bekeretezett fényképek a Balatonról, Tokajról, egy színházról. Hátul egy zárt ajtó.",
      items: [
        { clue: "toll", label: "Az íróasztal", text: "Egy töltőtoll, a kupakja félrecsúszva." },
        { clue: "naptar", label: "Az asztali naptár", text: "A március 15-i lapon valami ki van radírozva." }],
      puzzle: "sotetkod" },
    { id: "sotetkamra", name: "Sötétkamra", desc: "Vörös lámpa, előhívótálak, száradó fényképek egy zsinóron. Mindegyiken egy-egy ismerős helyszín.",
      requires: "sotetkod",
      items: [{ clue: "cianid", label: "A vegyszerespolc", text: "Barna üvegek, címkék, egy teáskanál ott, ahol nem kellene lennie." }] },
    { id: "porta", name: "Házmesterlakás és kapu", desc: "Szűk fülke a kapualjban, ablak az udvarra, a falon a lakók névsora.",
      items: [
        { clue: "penz", label: "Rózsa néni köténye", text: "Valami zizeg a zsebében." },
        { clue: "kocsma", label: "Pintér mellénye", text: "A fogason lóg, a zsebéből papír kandikál ki." }],
      puzzle: "hol" },
    { id: "hatso", name: "Hátsó lépcső", desc: "Keskeny cselédlépcső az udvar felől, egy vasajtó, a lépcsőfokokon víz.",
      items: [
        { clue: "galos", label: "A lépcsőfokok", text: "Nedves nyomok, felfelé és lefelé is." },
        { clue: "kulcs", label: "A vasajtó", text: "Kívülről csak kulccsal nyílik." }] },
    { id: "varo", name: "Váróterem", desc: "Bőr kanapék, újságok, a rendőrség itt veszi fel a vallomásokat. A fogason kabátok.",
      items: [
        { clue: "kesztyu", label: "A fogas", text: "Egy finom női kesztyű, ibolyaillattal." },
        { clue: "zseton", label: "Halmi kabátja", text: "Valami kerek csörög a zsebében." }],
      puzzle: "vallomas" },
    { id: "irattar", name: "Irattár", desc: "Polcok a mennyezetig, dossziék évszámokkal. Egy virágcserépben elszáradt szegfű.",
      items: [{ clue: "lanchid", label: "A cégjegyzékek", text: "A Lánchíd Rt. dossziéja, vastagabb a többinél." }],
      puzzle: "dosszie" }
  ],

  puzzles: {
    alairas: {
      type: "choice", title: "Az aláírás", reward: "tinta", answer: "D",
      body: `<p>A búcsúlevél gépelt, de az aláírás tintával készült. A tinta zöldeskék, a vonal széles, a „V” betűnél a toll hegye szétnyílt. Négy toll van az irodában. Hasonlítsd össze a próbavonalaikat.</p>`,
      options: [
        { v: "A", label: "Edit tolla", sample: "Lila tinta, finom hegy, vékony, egyenletes vonal." },
        { v: "B", label: "Halmi tolla", sample: "Kékeszöld tinta, finom hegy, vékony vonal." },
        { v: "C", label: "Pintér ceruzája", sample: "Grafit, szürke, a papírba mélyed." },
        { v: "D", label: "Dr. Fekete Pelikan töltőtolla", sample: "Zöldeskék tinta, széles hegy, a vonal elején szétnyíló nyom." }
      ],
      confirm: "Ezzel írták alá",
      wrong: "A szín vagy a vonal nem egyezik. Mindkettőnek stimmelnie kell.",
      hints: [
        "A tinta színe csak az egyik jel. Nézd a vonal vastagságát is.",
        "Halmi tintája hasonló színű, de a hegye finom. Melyik tollnak széles a hegye?"
      ]
    },
    sotetkod: {
      type: "code", title: "A sötétkamra ajtaja", reward: "fenykepek", answers: ["0910", "1009"], length: 4,
      body: `<p>Fekete irodájából egy zárt ajtó nyílik a sötétkamrába. Négyjegyű számzár. Edit füzetében: „A kód az a nap és hónap, amikor az első fekete szegfű nyílt.”</p>
<p>Az első cédulát az első ügyedben találtad, egy viharos estén, a Balaton partján.</p>`,
      wrong: "A zár nem nyílik. Melyik nap volt az első gyilkosság?",
      hints: ["Az első ügy a Szegfű-villa. Az ügyirat tetején ott a dátum. Nap és hónap, két-két jeggyel."]
    },
    hol: {
      type: "assign", title: "Fél hét", reward: "ido", columnLabel: "Hol volt 18:15 és 18:55 között?",
      body: `<p>Edit fél hét és háromnegyed hét között halt meg. Ki hol volt ekkor? A tanúk szavaiból rakd össze. Mindenki máshol volt.</p>`,
      facts: [
        "A Gerbeaud pincére szerint Fekete úr hatkor leült, de negyed hétkor felállt, és csak öt perccel hét előtt jött vissza. A kalapját és a konyakját közben az asztalon hagyta.",
        "A Gerbeaud-tól az iroda hátsó bejáratáig hét perc gyalog.",
        "Irma asszonyt a cselédje negyed hétkor engedte be a rózsadombi villába, és este ki sem mozdult.",
        "Március 15-én a bíróság zárva volt. A kaszinó portása Halmi urat fél hattól nyolcig a rulettasztalnál látta.",
        "A Kék Macska kocsmárosa szerint Pintér hat után öt perccel rendelt egy fröccsöt, és húsz perccel hét után ment el.",
        "A házmesterné nem hagyhatja el a lakását, amíg a kapu nyitva van. A kapu hétig nyitva volt."
      ],
      choices: ["Gerbeaud", "Otthon, a Rózsadombon", "Kaszinó", "Kék Macska kocsma", "Házmesterlakás", "Az iroda"],
      answer: { fekete: "Az iroda", irma: "Otthon, a Rózsadombon", halmi: "Kaszinó", pinter: "Kék Macska kocsma", rozsa: "Házmesterlakás" },
      hints: ["A Gerbeaud csapda: valaki ott hagyta a kalapját, de nem ült ott. Hová ér el hét perc alatt?"]
    },
    vallomas: {
      type: "spot", title: "Fekete vallomása", reward: "hazugsag", answer: 3,
      body: `<p>Dr. Fekete vallomása a rendőrségi jegyzőkönyvből. Egy kiemelt mondatrésze nem igaz. Vesd össze azzal, amit a tanúk mondtak.</p>`,
      statement: "[[Hatkor eljöttem az irodából]], [[ahogy minden szerdán]]. Átsétáltam a Vörösmarty térre, [[leültem a Gerbeaud-ban]], és [[egy percre sem álltam fel az asztaltól]] egészen hétig. [[Edit az utóbbi időben ideges volt]], [[magánéleti gondjai voltak]].",
      wrong: {
        0: "Ez igaz: Pintér látta elmenni hatkor.",
        1: "1939. március 15. valóban szerda volt.",
        2: "Ez is igaz: a pincér szerint hatkor leült.",
        4: "Edit tényleg ideges volt, csak nem a magánélete miatt.",
        5: "Ezt nem lehet bizonyítani, de nem is cáfolja semmi. Keress egy biztos hazugságot."
      },
      hints: ["A pincér pontosan emlékszik, mikor üres a széke. Mit mondott?"]
    },
    dosszie: {
      type: "keyword", title: "Edit dossziéja", reward: "dosszie", key: "SZEGFU",
      plain: "A FEKETE SZEGFU: DR. FEKETE SZILARD. HAT CEDULA, HAT GYILKOS, HAT VETEL. MINDET A LANCHID RT. VETTE MEG. A LANCHID RT. TULAJDONOSA O MAGA.",
      body: `<p>Az irattárban, egy elszáradt szegfű cserepe alatt Edit titkosított jegyzete. A betűk nem egyformán csúsznak el: egy kulcsszó tolja el őket, betűről betűre.</p>
<p>Edit füzete szerint a kulcs a hat cédula sarkában áll. Az ügyirat lapon megtalálod mind a hatot, időrendben.</p>`,
      hints: ["Olvasd össze a hat bekarikázott betűt az ügyiratban, az első ügytől az utolsóig. Egy szó lesz, ékezet nélkül."]
    }
  },

  accusation: {
    questions: [
      { id: "who", legend: "Ki ölte meg Varga Editet?", name: "a tettes", from: "suspects", answer: "fekete", proof: ["ido", "galos", "hazugsag", "kulcs"] },
      { id: "how", legend: "Hogyan halt meg Edit?", name: "a módszer", answer: "cian", proof: ["cianid", "holttest"],
        options: [{ v: "ongyilkos", label: "Öngyilkos lett, ahogy a búcsúlevél írja" }, { v: "cian", label: "Ciánt tettek a teájába a sötétkamra fixálójából" }, { v: "gaz", label: "Gázzal mérgezték meg a radiátorból" }] },
      { id: "why", legend: "Miért kellett meghalnia?", name: "az indíték", answer: "szegfu", proof: ["dosszie", "lanchid", "fuzet"],
        options: [{ v: "szerelem", label: "Fekete viszonyt folytatott vele, és szakítani akart" }, { v: "sikkasztas", label: "Rájött Halmi sikkasztására" }, { v: "szegfu", label: "Rájött, hogy Fekete a fekete szegfű, és le akarta leplezni" }, { v: "orokseg", label: "Örökölt volna Feketétől" }] },
      { id: "plant", legend: "Melyik nyommal akarták öngyilkosságnak láttatni a halálát?", name: "a hamis nyom", from: "clues", answer: "bucsu" }
    ]
  },

  ending: {
    heading: "Dr. Fekete Szilárd volt a fekete szegfű.",
    paragraphs: [
      "Nyolc éven át Fekete az ügyvédi irodájában tudta meg mindenki titkát: végrendeleteket, szerződéseket, adósságokat, válóperes leveleket. Hatszor talált valakit, aki már a szakadék szélén állt, és hatszor küldött neki egy cédulát egy préselt fekete szegfűvel: hol a méreg, melyik ajtó szabad, mikor üres a padlás. A gyilkosságot mindig más követte el. A botrány után pedig mindig a Lánchíd Rt. vásárolt, áron alul.",
      "Edit kilenc évig gépelte a leveleit. Egy napon a Lánchíd Rt. számláit iktatva rájött az összefüggésre, és titkosítva elrejtette a bizonyítékot az irattárban. Fekete megtudta. Hatkor feltűnően leült a Gerbeaud-ban, negyed hétkor otthagyta a kalapját, a hátsó lépcsőn felment, és amíg Edit a teáját főzte, a sötétkamra fixálójából ciánt tett a csészéjébe. Saját tollával írta alá a búcsúlevelet, és a vázába tette a gomblyukából a szegfűt. Száz pengő a házmesternének, és öt perccel hét előtt már újra a Gerbeaud-ban ült.",
      "Csakhogy most az egyszer neki magának kellett cselekednie, és hibázott: a zöld tinta, a nedves sárcipő és a pincér, aki az üres széket figyelte. A hetedik szegfű a saját gomblyukából hullott ki."
    ]
  }
});
