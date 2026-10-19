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
      stmt: "„Szegény Edit. Kilenc évig dolgozott nálam. Az utóbbi időben ideges volt, {{magánéleti gondjai|viszony}} voltak. {{Hatkor|t1800}} eljöttem az {{irodából|iroda}}, és hétig a Gerbeaud-ban ültem.”" },
    { id: "irma", look: { hair: "wave", clothes: "coat", acc: ["pearls", "earrings"], lips: true }, name: "Fekete Irma", role: "Az ügyvéd felesége, 50 éves.",
      stmt: "„Egész délután otthon voltam a Rózsadombon. Az irodába évek óta be sem teszem a lábam, a férjem nem szereti.”" },
    { id: "halmi", look: { hair: "short", clothes: "bowtie", acc: ["glasses"] }, name: "Dr. Halmi Tamás", role: "Ifjabb társ, 35 éves. Öt éve dolgozik Fekete mellett.",
      stmt: "„Fél hétig a bíróságon tárgyaltam, aztán egyenesen hazamentem. Edittel jóban voltunk, semmi okom nem volt bántani.”" },
    { id: "pinter", look: { hair: "bald", clothes: "uniform", acc: ["mustache"] }, name: "Pintér József", role: "Irodaszolga, 62 éves. Harminc éve hordja az iratokat.",
      stmt: "„Hatkor bezártam az iroda ajtaját, ahogy mindig. A kulcs egész este nálam volt. Edit kisasszony még bent maradt, mint minden este.”" },
    { id: "rozsa", look: { hair: "bun", clothes: "maid", lips: true }, name: "Kovács Józsefné", short: "Rózsa néni", role: "Házmesterné, 56 éves. Rózsa néni a kapu mellől mindent lát.",
      stmt: "„Hat után senki sem jött be a kapun, csak a postás. Én a fülkémből mindent látok, kérem, nekem egy légy sem kerüli el a figyelmemet.”" }
  ],

    words: {
    edit: ["Varga Edit", "személy"],
    cian: ["kálium-cianid", "tárgy"], tea: ["tea", "tárgy"], toll: ["Pelikan töltőtoll", "tárgy"], bucsu: ["búcsúlevél", "tárgy"], galos: ["angol sárcipő", "tárgy"], kulcs: ["a hátsó ajtó kulcsa", "tárgy"], penz: ["száz pengő", "tárgy"], gaz: ["gáz", "tárgy"],
    sotetkamra: ["sötétkamra", "hely"], hatso: ["hátsó lépcső", "hely"], gerbeaud: ["Gerbeaud", "hely"], kaszino: ["kaszinó", "hely"], iroda: ["Fekete irodája", "hely"],
    t1800: ["hat óra", "idő"], t1815: ["negyed hét", "idő"], t1830: ["fél hét", "idő"], t1855: ["öt perccel hét előtt", "idő"],
    alairta: ["aláírta a búcsúlevelet", "tett"], teat: ["teát főzött", "tett"], lefizette: ["lefizette a házmesternét", "tett"], rulett: ["rulettezett", "tett"],
    leleplezes: ["a fekete szegfű leleplezése", "indíték"], viszony: ["szerelmi viszony", "indíték"], sikkasztas: ["sikkasztás", "indíték"], kartyaadossag: ["kaszinóadósság", "indíték"]
  },

  clues: {
    holttest: { t: "Edit az íróasztalnál", src: "Titkárság", x: "{{Varga Edit|edit}} az íróasztalra borulva. Előtte kihűlt {{teáscsésze|tea}}, keserűmandula-szaggal. Az orvos szerint cián, a halál {{fél hét|t1830}} és háromnegyed hét között állt be. Pintér szerint Edit minden este fél hétkor {{főzött magának teát|teat}}." },
    bucsu: { t: "A búcsúlevél", src: "Titkárság", x: "Gépelt {{levél|bucsu}} Edit írógépén: „Nem bírom tovább. Bocsássatok meg.” Alatta tintával aláírva: Varga Edit. Az aláírás tintája zöldeskék, a vonal széles." },
    szegfu: { t: "Fekete szegfű a vázában", src: "Titkárság", x: "Edit asztalán egy vázában egyetlen friss, sötét, szinte fekete szegfű. A virágos szerint ilyet Pesten csak egy úr hord a gomblyukában, minden áldott nap." },
    fuzet: { t: "Edit füzete", src: "Titkárság", x: "Edit gyorsírásos füzete. Az utolsó oldalon: „A sötétkamra kódja az a nap és hónap, amikor az első fekete szegfű nyílt. A bizonyíték az irattárban, titkosítva. A kulcs a hat cédula sarkában.”" },
    tinta: { t: "Az aláírás tintája", src: "Titkárság", x: "A búcsúlevél aláírása zöldeskék tintával, széles hegyű tollal készült. Edit csak finom hegyű lila tintás tollat használt. Zöldeskék tinta és széles hegy csak egy tollban van az irodában: Dr. Fekete {{Pelikan töltőtollában|toll}}." },
    toll: { t: "Fekete töltőtolla", src: "Fekete irodája", x: "Dr. Fekete íróasztalán a zöldeskék tintás, széles hegyű Pelikan töltőtoll. A kupakja félrecsúszva, a hegyén még nedves a tinta. Valaki nemrég {{aláírt vele valamit|alairta}}." },
    naptar: { t: "Az asztali naptár", src: "Fekete irodája", x: "Fekete asztali naptárában március 15-nél ceruzával: „18.30 — E.” A bejegyzést utólag kiradírozták, de a lenyomata még olvasható." },
    cianid: { t: "A kálium-cianid", src: "Sötétkamra", x: "Fekete {{sötétkamrájában|sotetkamra}}, a fényképészeti vegyszerek között egy „{{Kálium-cianid|cian}} — fixáló” feliratú üveg. Ma délután még tele volt, most hiányzik belőle egy kanálnyi. Mellette egy teáskanál, rajta fehér maradvány." },
    galos: { t: "Nedves sárcipőnyomok", src: "Hátsó lépcső", x: "A {{hátsó lépcsőn|hatso}} nedves, 44-es {{angol sárcipő|galos}} nyomai vezetnek fel az irodához, és vissza le. Az iroda kabátfogasán Fekete angol sárcipője, még vizes." },
    kulcs: { t: "A hátsó ajtó kulcsa", src: "Hátsó lépcső", x: "A hátsó lépcső ajtaját kívülről csak kulccsal lehet kinyitni. Két {{kulcs|kulcs}} van: az egyik Pintéré, a másik Dr. Fekete kulcscsomóján." },
    ido: { t: "Ki hol volt fél hétkor?", src: "Porta · tanúvallomások", x: "Irma asszony otthon, a Rózsadombon. Halmi a {{kaszinóban|kaszino}}. Pintér a Kék Macska kocsmában. Rózsa néni a házmesterlakásban. Dr. Fekete az irodában (a {{Gerbeaud|gerbeaud}}-ban {{negyed héttől|t1815}} {{öt perccel hét előttig|t1855}} üresen állt a széke)." },
    penz: { t: "A boríték a házmesternénél", src: "Porta", x: "Rózsa néni kötényzsebében egy boríték {{száz pengővel|penz}}. A borítékon zöldeskék tintával egyetlen betű: R." },
    kesztyu: { t: "Egy női kesztyű", src: "Váróterem", x: "A váróterem fogasán egy finom női kesztyű, erős ibolyaillattal. A bélésébe hímezve: F. I." },
    zseton: { t: "Kaszinózsetonok", src: "Váróterem", x: "Halmi kabátzsebében két kaszinózseton, egy {{adóslevél|kartyaadossag}} és egy bírósági értesítő: „Március 15-én, nemzeti ünnep alkalmából a törvényszék zárva tart.”" },
    kocsma: { t: "A kocsmai blokk", src: "Porta", x: "Pintér mellényzsebében a Kék Macska kocsma blokkja: két fröccs, 18:05 és 19:20 között." },
    hazugsag: { t: "Ellentmondás Fekete vallomásában", src: "Váróterem · vallomás", x: "Fekete azt vallotta, egy percre sem állt fel a Gerbeaud asztalától. A pincér szerint negyed hétkor elment, és csak öt perccel hét előtt jött vissza." },
    dosszie: { t: "Edit titkos dossziéja", src: "Irattár", x: "Megfejtve: „A fekete szegfű: Dr. Fekete Szilárd. Hat cédula, hat gyilkos, hat vétel: a Kendeffy-képek, a Hollós cukrászda, Az utolsó tánc jogai, a Ráday-részvények, a Corvin Színház, a Récsey-birtok. Mindet a Lánchíd Rt. vette meg, áron alul. A Lánchíd Rt. tulajdonosa: Dr. Fekete Szilárd.” Edit ezt akarta {{nyilvánosságra hozni|leleplezes}}." },
    fenykepek: { t: "Száradó fényképek", src: "Sötétkamra", x: "A sötétkamra zsinórján hat fénykép szárad: a Szegfű-villa, a Hollós cukrászda, az Arany Griff, egy hálókocsi a Keleti pályaudvaron, a Corvin Színház zsinórpadlása és a Récsey-birtok pincéje. Mindegyiken egy dátum, mindig néhány nappal a gyilkosság előttről." },
    lanchid: { t: "A cégjegyzék", src: "Irattár", x: "A Lánchíd Rt. cégkivonata: egyedüli részvényese Dr. Fekete Szilárd. Az elmúlt nyolc évben hat nagy vásárlás, mindegyik közvetlenül egy gyilkossági botrány után." },
    rozsavall: { t: "Rózsa néni beismerése", src: "Rózsa néni vallomása", x: "Rózsa néni szerint Fekete úr fél hétkor a hátsó lépcső felől jött vissza, és száz pengőt adott neki, hogy felejtse el, amit látott." },
    hetedik: { t: "A hetedik cédula", src: "Sötétkamra · jelírással", x: "A fényképek mögött egy cédula, csak jelekkel írva, Fekete saját kézírásával. Megfejtve: „Ma este. Méreg. Fent. Hátsó ajtó. Pénz.” A hetedik cédula, amelyet nem küldött el senkinek: ezt a tervet maga hajtotta végre." }
  },
contradictions: [
    { id: "c-fekete", suspect: "fekete", clue: ["galos", "kulcs"], reveal: "Fekete mosolya meg sem rezdül: „Gyakran használom a hátsó lépcsőt, a kocsimtól közelebb van.”" },
    { id: "c-fekete2", suspect: "fekete", clue: ["tinta", "toll"], reveal: "„Bárki kölcsönvehette a tollamat” mondja Fekete. Közben a gomblyukában lévő sötét szegfűt igazgatja." },
    { id: "c-irma", suspect: "irma", clue: ["kesztyu"], reveal: "Irma elsápad: „Jó, itt voltam ötkor. Meg akartam kérdezni Editet, van-e a férjemnek valakije. Azt mondta, sokkal rosszabb a helyzet, de még nem mondhatja el. Fél hatkor hazamentem.”" },
    { id: "c-halmi", suspect: "halmi", clue: ["zseton"], reveal: "Halmi elvörösödik: „A bíróság zárva volt, igen. A kaszinóban {{ruletteztem|rulett}}. Ha Fekete megtudja, kirúg. De Editet nem bántottam.”" },
    { id: "c-pinter", suspect: "pinter", clue: ["kocsma"], reveal: "Pintér a sapkáját gyűri: „Nem zártam be az ajtót, Edit kisasszony benn maradt, minek. Átugrottam egy fröccsre. Hétkor jöttem vissza, akkor találtam meg.”" },
    { id: "c-rozsa", suspect: "rozsa", clue: ["penz"], gives: "rozsavall", reveal: "Rózsa néni összetöri a kezét: „Fekete úr adta. Fél hétkor jött vissza a hátsó lépcsőn, és azt mondta, felejtsem el. {{Lefizetett|lefizette}}, na. Száz pengő, kérem. Nekem az egy havi lakbér.”" }
  ],

    locations: [
    { id: "titkarsag", name: "Edit szobája", desc: "Iratszekrények, egy írógép, a radiátoron kihűlt teáskanna. Az asztalon egy váza egyetlen virággal.",
      look: "Iratszekrények, a radiátoron kihűlt teáskanna. [[Edit az íróasztalra borult, a keze még a teáscsésze mellett|holttest]]. [[Az írógépben egy levél maradt, alul tintás aláírással|bucsu]]. Az asztalon [[egy váza, benne egyetlen szál, szinte fekete virág|szegfu]].\n\nA fiókban, [[egy köteg iktatókönyv alatt|fuzet]], valami vékonyabb lapul. Az ablakpárkányon [[egy kis tükör és egy rúzs|rouge]].",
      decoys: { rouge: "Edit rúzsa, halvány rózsaszín. A csésze peremén nincs nyoma: a teát már nem itta meg nyugodtan." },
      items: [
        { clue: "holttest", label: "Edit", text: "Megvizsgálod Editet és a csészét." },
        { clue: "bucsu", label: "A búcsúlevél", text: "Kihúzod a levelet az írógépből." },
        { clue: "szegfu", label: "A váza", text: "Megnézed a virágot." },
        { clue: "fuzet", label: "A gyorsírásos füzet", text: "Előhúzod a füzetet." }],
      puzzle: "alairas" },
    { id: "fekete_iroda", name: "Fekete irodája", desc: "Bőrfotelek, mahagóni íróasztal, a falon bekeretezett fényképek a Balatonról, Tokajról, egy színházról. Hátul egy zárt ajtó.",
      look: "Bőrfotelek, mahagóni íróasztal. A falon [[bekeretezett fényképek a Balatonról, Tokajról, egy színházról|kepek]]. [[Az íróasztalon egy töltőtoll, a kupakja félrecsúszva|toll]], mellette [[az asztali naptár|naptar]]. A kisasztalon [[egy kristálykancsó konyakkal|konyak]]. Hátul egy zárt ajtó számzárral.",
      decoys: { kepek: "Szép, gondos felvételek, mindegyik napnyugtakor. A Corvin Színház képén a zsinórpadlás ablaka világít.", konyak: "Drága francia konyak, két pohár. Az egyik még nedves." },
      items: [
        { clue: "toll", label: "Az íróasztal", text: "Megvizsgálod a töltőtollat." },
        { clue: "naptar", label: "Az asztali naptár", text: "Fény felé tartod a március 15-i lapot." }],
      puzzle: "sotetkod" },
    { id: "sotetkamra", name: "Sötétkamra", desc: "Vörös lámpa, előhívótálak, száradó fényképek egy zsinóron. Mindegyiken egy-egy ismerős helyszín.",
      look: "Vörös lámpa, ecetszag. [[Előhívótálak|talak]] sorban, a falon [[a vegyszerespolc: barna üvegek, és egy teáskanál ott, ahol nem kellene lennie|cianid]]. A zsinóron fényképek száradnak.",
      decoys: { talak: "Előhívó, stopfürdő, fixáló. A fixálós tál üres, mintha ma nem is hívtak volna elő semmit." },
      requires: "sotetkod",
      items: [{ clue: "cianid", label: "A vegyszerespolc", text: "Leemeled az üveget és a kanalat." }],
      puzzle: "jelek" },
    { id: "porta", name: "Házmesterlakás és kapu", desc: "Szűk fülke a kapualjban, ablak az udvarra, a falon a lakók névsora.",
      look: "Szűk fülke a kapualjban, ablak az udvarra. A falon [[a lakók névsora|nevsor]]. [[Rózsa néni kötényzsebében|penz]] valami zizeg. A fogason [[Pintér mellénye, a zsebéből papír kandikál ki|kocsma]]. Az ablakban [[egy szál szegfű egy befőttesüvegben|uveg]].",
      decoys: { nevsor: "Harmadik emelet: Dr. Fekete Szilárd, ügyvédi iroda. Hátsó bejárat az udvarról.", uveg: "Sötét, majdnem fekete szegfű. Rózsa néni szerint „egy úr” adta ma este, és mosolygott hozzá." },
      items: [
        { clue: "penz", label: "Rózsa néni köténye", text: "Megkéred Rózsa nénit, hogy ürítse ki a zsebét." },
        { clue: "kocsma", label: "Pintér mellénye", text: "Kihúzod a papírt a zsebből." }],
      puzzle: "hol" },
    { id: "hatso", name: "Hátsó lépcső", desc: "Keskeny cselédlépcső az udvar felől, egy vasajtó, a lépcsőfokokon víz.",
      look: "Keskeny cselédlépcső az udvar felől. [[A lépcsőfokokon nedves nyomok, felfelé és lefelé is|galos]]. Fent [[egy vasajtó, kívülről csak kulccsal nyílik|kulcs]]. A fordulóban [[egy gázóra|gazora]].",
      decoys: { gazora: "Rendesen jár. A radiátoron át senki sem engedett {{gázt|gaz}} a szobákba." },
      items: [
        { clue: "galos", label: "A lépcsőfokok", text: "Leguggolsz a nyomokhoz." },
        { clue: "kulcs", label: "A vasajtó", text: "Megvizsgálod a zárat." }] },
    { id: "varo", name: "Váróterem", desc: "Bőr kanapék, újságok, a rendőrség itt veszi fel a vallomásokat. A fogason kabátok.",
      look: "Bőr kanapék, a rendőrség itt veszi fel a vallomásokat. [[Az asztalon a mai újságok|ujsag]]. A fogason kabátok: [[egy finom női kesztyű, ibolyaillattal|kesztyu]], és [[Halmi kabátja, a zsebében valami kerek csörög|zseton]].",
      decoys: { ujsag: "Pesti Hírlap, március 15.: „A Lánchíd Rt. megvásárolta a tokaji Récsey-birtokot.” A cikk mellett Fekete fényképe. Lejjebb egy rövidhír: {{sikkasztás|sikkasztas}} gyanúja egy belvárosi ügyvédi irodában, név nélkül." },
      items: [
        { clue: "kesztyu", label: "A fogas", text: "Leveszed a kesztyűt a fogasról." },
        { clue: "zseton", label: "Halmi kabátja", text: "Belenyúlsz a zsebébe." }],
      puzzle: "vallomas" },
    { id: "irattar", name: "Irattár", desc: "Polcok a mennyezetig, dossziék évszámokkal. Egy virágcserépben elszáradt szegfű.",
      look: "Polcok a mennyezetig, [[dossziék évszámokkal|evszam]]. [[A cégjegyzékek között egy dosszié vastagabb a többinél|lanchid]]. Az ablakban egy virágcserép, benne elszáradt szegfű.",
      decoys: { evszam: "1931, 1933, 1934, 1936, 1937, 1938. Ugyanazok az évek, mint a hat cédulán." },
      items: [{ clue: "lanchid", label: "A cégjegyzékek", text: "Kihúzod a Lánchíd Rt. dossziéját." }],
      puzzle: "dosszie" }
  ],

    deductions: [
    { id: "d-hamislevel", from: ["bucsu", "tinta"], t: "Nem Edit írta alá", x: "A búcsúlevél aláírása zöldeskék tintával, széles hegyű tollal készült, Edit pedig csak lila tintás, finom hegyű tollat használt. A levelet más írta alá: nem öngyilkosság volt.",
      text: "A(z) {} aláírása ezzel a tollal készült: {}. Edit soha nem használt ilyet, tehát nem ő írta alá.", b: ["bucsu", "toll"] },
    { id: "d-hatso", from: ["galos", "rozsavall"], t: "A hátsó lépcsőn jött", x: "A hátsó ajtó kívülről csak kulccsal nyílik, kulcs Pintérnél és Feketénél van. A nyomok 44-es angol sárcipőtől valók, és Fekete sárcipője vizesen lóg a fogason.",
      text: "Aki este feljött ide: {}, annak kulcsa volt, és ilyen lábbelit viselt: {}. Ő volt az: {}.", b: ["hatso", "galos", "fekete"] },
    { id: "d-ures", from: ["ido", "holttest"], t: "Az üres szék", x: "Edit fél hétkor főzte a teáját, és fél hét és háromnegyed hét között halt meg. Fekete széke a Gerbeaud-ban negyed héttől öt perccel hét előttig üres volt, és az iroda hét percre van.",
      text: "Edit ekkor halt meg: {} után. Fekete széke itt: {} ekkortól üresen állt: {}, egészen eddig: {}.", b: ["t1830", "gerbeaud", "t1815", "t1855"] },
    { id: "d-mereg", from: ["cianid", "holttest"], t: "A sötétkamra mérge", x: "Edit teájában cián volt, és Fekete zárt sötétkamrájának fixálójából ma délután hiányzik egy kanálnyi, a kanálon fehér maradvány. A mérget onnan vitték át.",
      text: "Edit {} ivott, amelybe ezt tették: {}. A méreg innen származik: {}.", b: ["tea", "cian", "sotetkamra"] },
    { id: "d-rozsa", from: ["penz", "tinta"], t: "A zöld R betű", x: "A Rózsa néninél talált borítékon zöldeskék tintával áll az R. Ilyen tinta csak Fekete tollában van. Fekete fizette le a házmesternét.",
      text: "A boríték, benne {}, ugyanazzal a tintával van megcímezve, mint ami ebben van: {}. Tehát ő adta: {}.", b: ["penz", "toll", "fekete"] },
    { id: "d-lanchid", from: ["dosszie", "lanchid"], t: "A Lánchíd Rt.", x: "Mind a hat gyilkosság után a Lánchíd Rt. vásárolt áron alul, és a Lánchíd Rt. egyedüli részvényese Dr. Fekete Szilárd. Edit erre jött rá.",
      text: "A Lánchíd Rt. egyedüli tulajdonosa: {}. Edit erre készült: {}.", b: ["fekete", "leleplezes"] }
  ],
events: [
    { id: "gomblyuk", after: 3, title: "Friss szegfű",
      text: "Nyílik az ajtó. Dr. Fekete Szilárd lép be, kalapban, a gomblyukában egy friss, sötét, szinte fekete szegfű.\n\n„Ugye nem zavarom, nyomozó úr? Szegény Edit.” A pillantása egy másodpercre a vázára esik, aztán rád. Mosolyog. „Ha bármiben segíthetek, tudja, hol talál.”" },
    { id: "voros", afterSolved: "sotetkod", title: "Kialszik a vörös lámpa",
      text: "Alig lépsz be a sötétkamrába, mögötted halkan kattan a zár. A vörös lámpa kialszik. Vaksötét, ecetszag, és valahol a polcon üvegek csilingelnek.\n\nPerceknek tűnik, mire Pintér rád nyitja az ajtót. A kilincs még meleg, a folyosón drága kölni illata. „Senkit sem láttam” mondja Pintér, de a keze remeg." }
  ],

  fates: {
    irma: "A kesztyű és az elhallgatott délutáni látogatás elég volt. Irmát a férje titkárnőjének megölésével vádolják és elítélik. Dr. Fekete megrendülten nyilatkozik a lapoknak, a gomblyukában egy sötét szegfűvel.",
    halmi: "A kaszinó, a hazugság és a zárva tartó bíróság mindent eldöntött. Halmit elítélik; az ügyvédi kamara kizárja, Fekete pedig új ifjabb társat vesz fel.",
    pinter: "Nem zárta be az ajtót, és hétkor ő találta meg. Pintér Józsefet harminc év szolgálat után elítélik. A Lánchíd Rt. aktái a polcon maradnak, érintetlenül.",
    rozsa: "A száz pengő a zsebében volt, és ez elég volt. Rózsa nénit elítélik; a fekete szegfű pedig nyolcadszor is vásárol, áron alul."
  },
  puzzles: {
    jelek: {
      type: "glyph", title: "A hetedik cédula", reward: "hetedik", msg: ["ido", "mereg", "fent", "ajto", "penz"],
      body: `<p>A száradó fényképek mögött egy cédula lapul, Fekete kézírásával. Egyetlen szó sincs rajta, csak jelek, ugyanazok, amelyeket a hat cédulán láttál, mindig valami fontos előtt. Mit jelentenek?</p>`,
      hints: ["Nézd meg a címoldalon A titkos szál cédulait: melyik jel milyen szó előtt áll? Ott a Jelírás szótárban is kipróbálhatod."]
    },
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
    story: "A gyilkos: {}. Hatkor feltűnően leült itt: {}, de ekkor felállt: {}, és a hátsó lépcsőn felment az irodába.\nAmíg Edit a teáját főzte, a csészébe ezt tette: {}, a saját sötétkamrájából. Aztán a saját tollával {}, és a vázába tette a gomblyukából a szegfűt.\nA házmesternét {} hallgattatta el. Indíték: {}.",
    b: ["fekete", "gerbeaud", "t1815", "cian", "alairta", "penz", "leleplezes"], who: [0]
  },

  plan: { w: 12, h: 8,
    rooms: { titkarsag: [0, 0, 3.4, 3], fekete_iroda: [3.4, 0, 4, 3], sotetkamra: [7.4, 0, 2.2, 3], irattar: [9.6, 0, 2.4, 3], varo: [0, 3, 4, 2.2, "Váróterem"], _lepcsohaz: [4, 3, 5.6, 2.2, "Főlépcső, harmadik emelet"], hatso: [9.6, 3, 2.4, 2.2, "Hátsó lépcső"], porta: [0, 6, 4, 2, "Kapu és házmester"], _udvar: [4, 6, 8, 2, "Udvar"] },
    doors: [[3.4, 1, 3.4, 2], [7.4, 1, 7.4, 2], [1.4, 3, 2.4, 3], [10.3, 3, 11.3, 3], [4, 3.8, 4, 4.6], [10.3, 5.2, 11.3, 5.2]],
    marks: [[7.45, .35, "számzár"], [4.1, 5.95, "Gerbeaud: hét perc gyalog →"]],
    note: "Az iroda a harmadik emeleten. A hátsó lépcső az udvarról, a házmester fülkéje mellől indul." },
ending: {
    heading: "Dr. Fekete Szilárd volt a fekete szegfű.",
    paragraphs: [
      "Nyolc éven át Fekete az ügyvédi irodájában tudta meg mindenki titkát: végrendeleteket, szerződéseket, adósságokat, válóperes leveleket. Hatszor talált valakit, aki már a szakadék szélén állt, és hatszor küldött neki egy cédulát egy préselt fekete szegfűvel: hol a méreg, melyik ajtó szabad, mikor üres a padlás. A gyilkosságot mindig más követte el. A botrány után pedig mindig a Lánchíd Rt. vásárolt, áron alul.",
      "Edit kilenc évig gépelte a leveleit. Egy napon a Lánchíd Rt. számláit iktatva rájött az összefüggésre, és titkosítva elrejtette a bizonyítékot az irattárban. Fekete megtudta. Hatkor feltűnően leült a Gerbeaud-ban, negyed hétkor otthagyta a kalapját, a hátsó lépcsőn felment, és amíg Edit a teáját főzte, a sötétkamra fixálójából ciánt tett a csészéjébe. Saját tollával írta alá a búcsúlevelet, és a vázába tette a gomblyukából a szegfűt. Száz pengő a házmesternének, és öt perccel hét előtt már újra a Gerbeaud-ban ült.",
      "Csakhogy most az egyszer neki magának kellett cselekednie, és hibázott: a zöld tinta, a nedves sárcipő és a pincér, aki az üres széket figyelte. A hetedik szegfű a saját gomblyukából hullott ki."
    ]
  }
});
