/* 4. ügy — Fagy a Hollós cukrászdában (könnyű) */
(window.MM_CASES = window.MM_CASES || []).push({
  id: "hollos-cukraszda",
  fx: "dust",
  sound: "clock",
  sounds: { jegkamra: "cold" },
  cover: "generic",
  number: 4,
  title: "Fagy a Hollós cukrászdában",
  meta: "Budapest, Váci utca · 1933. április 11. · Ügyszám 1933/226",
  teaser: "A híres cukrászmestert reggel holtan találják a saját jégkamrájában, amelyet kívülről zártak be. Az ajtó üvegén egy dérbe írt név áll. Csakhogy a házban két ember viseli, és mindkettőjük ellen szól egy nyom.",
  difficulty: "Könnyű",

  intro: {
    eyebrow: "Budapesti Államrendőrség · IV. kerületi kapitányság",
    heading: "Hollós Ernő halála a jégkamrában",
    lead: "1933. április 12-én reggel hatkor a Hollós cukrászda inasa a jégkamrában találta meg a gazdáját, Hollós Ernő cukrászmestert. A vastag tölgyfa ajtót kívülről zárta a retesz, belülről nincs rajta kilincs.",
    body: "Az előző este bemutatták a személyzetnek a cukrászda új büszkeségét, a pisztáciás Hollós-tortát. Öt ember volt aznap este a házban. Egyikük rátolta a reteszt, és hagyta, hogy a mester a jég között töltse az éjszakát. Aztán gondoskodott róla, hogy a gyanú a másik Bélára essen.",
    start: "jegkamra"
  },

  suspects: [
    { id: "szendrei", look: { hair: "short", clothes: "bowtie", acc: ["mustache"] }, name: "Szendrei Béla", role: "Főcukrász, 41 éves. Tizenöt éve dolgozik Hollós mellett.",
      stmt: "„Fél tízkor mentem haza, mint mindig. A torta kész volt, a krém tökéletes. Hollós úr elégedett volt velem, tizenöt éve az. A műhelyben ma reggel még nem is jártam.”" },
    { id: "hollosbela", look: { hair: "slick", clothes: "suit" }, name: "Hollós Béla", role: "Az unokaöcs, 27 éves. A cukrászda egyetlen örököse.",
      stmt: "„Kilenckor már a {{kártyaklubban|klub}} ültem, kérdezze meg bárkit. A nagybátyámmal veszekedtünk, igen, az {{örökségen|orokseg}}, de ki nem veszekszik a rokonaival? A jégkamrába évek óta be sem tettem a lábam.”" },
    { id: "anna", look: { hair: "bob", clothes: "blouse", lips: true }, name: "Kertész Anna", role: "Pénztárosnő, 35 éves. Hat éve kezeli a kasszát.",
      stmt: "„Fél tízkor lezártam a kasszát, és hazamentem. A kasszában minden fillér stimmel, mindig is stimmelt. Hollós úr nagyon jó volt hozzám.”" },
    { id: "vilma", look: { hair: "bun", clothes: "dress", acc: ["pearls"], lips: true }, name: "Hollós Vilma", role: "A mester felesége, 55 éves.",
      stmt: "„Negyed tízkor még láttam Ernőt a műhelyben, a tortát nézte. Utána hazamentem. Ernő soha nem adta volna el ezt a boltot, ez volt az élete.”" },
    { id: "feher", look: { hair: "bald", hat: "cap", clothes: "uniform", acc: ["mustache"] }, name: "Fehér György", role: "Éjjeliőr, 66 éves. Gyuri bácsi mindenkit ismer a Váci utcában.",
      stmt: "„Tízkor hallottam a gazdát, ahogy mondja: »Megnézem még a tortát a jégben.« Utána egész éjjel ébren voltam a helyemen, egy egér sem mozdult a házban.”" }
  ],

    words: {
    hollos: ["Hollós Ernő", "személy"], inas: ["az inas", "személy"],
    retesz: ["vasretesz", "tárgy"], krem: ["pisztáciakrém", "tárgy"], kartya: ["kőr ász", "tárgy"], kabat: ["Hollós Béla kabátja", "tárgy"], torta: ["pisztáciás torta", "tárgy"], palinka: ["pálinka", "tárgy"], koteny: ["kötény", "tárgy"],
    jegkamra: ["jégkamra", "hely"], muhely: ["cukrászműhely", "hely"], oltozo: ["öltöző", "hely"], portasfulke: ["portásfülke", "hely"], klub: ["kártyaklub", "hely"],
    t2100: ["21:00", "idő"], t2200: ["22:00", "idő"], t2230: ["22:30", "idő"], ejfel: ["éjfél", "idő"], reggel: ["reggel", "idő"],
    rateszt: ["rátolta a reteszt", "tett"], elaludt: ["elaludt", "tett"], kartyazott: ["kártyázott", "tett"], kremkent: ["krémet kent rá", "tett"],
    eladas: ["a titkos eladás", "indíték"], orokseg: ["örökség", "indíték"], adossag: ["kártyaadósság", "indíték"], kassza: ["kasszahiány", "indíték"]
  },

  clues: {
    holttest: { t: "A jégkamra", src: "Jégkamra", x: "{{Hollós|hollos}} a jégtömbök mellett kuporodott össze, kabát nélkül. Az orvos szerint {{éjfél|ejfel}} körül fagyott meg. A tölgyfa ajtót kívülről zárta a {{retesz|retesz}}, belülről nincs rajta kilincs. A polcon ott a {{pisztáciás torta|torta}}, egy szelet hiányzik belőle." },
    der: { t: "A dérbe írt név", src: "Jégkamra · ajtóüveg", x: "Hollós belülről, az ujjával egy keresztnevet írt a {{jégkamra|jegkamra}} ajtajának kis ablakára: BÉLA. A cukrászdában két Béla van: Szendrei Béla, a főcukrász, és Hollós Béla, az unokaöcs." },
    kartya: { t: "Kártyalap a jég között", src: "Jégkamra", x: "A jégtömbök között egy kártyalap: {{kőr ász|kartya}}, száraz és tiszta. A fűrészporban egyetlen nedvességfolt sincs körülötte, pedig a jég egész éjjel olvadt." },
    retesz: { t: "A krém a reteszen", src: "Cukrászműhely", x: "A retesz fogantyúján megkérgesedett zöld {{pisztáciakrém|krem}}, liszttel keverve, egész éjjel száradt. A krémet aznap este csak Szendrei Béla főzte, a {{kötényén|koteny}} ugyanilyen liszttel kevert, száraz folt." },
    szerzodes: { t: "Az előszerződés", src: "Iroda · páncélszekrény", x: "Előszerződés a Lánchíd Kávéház Rt.-vel: Hollós holnap {{eladja a cukrászdát|eladas}}, a személyzetet elbocsátják. Mellette egy cetli: „Szendreinek nem szólok. Tizenöt éve ígérem neki, hogy társ lesz. Majd megérti.”" },
    tavozas: { t: "Ki mikor ment haza?", src: "Portásfülke · jelenléti ív", x: "Hollós Béla {{21:00|t2100}}, Kertész Anna 21:30, Vilma asszony 21:45, Szendrei Béla {{22:30|t2230}}. Fehér György egész éjjel bent maradt. Hollós {{22:00|t2200}}-kor indult a jégkamrába." },
    valtok: { t: "Hollós Béla kabátja", src: "Öltöző", x: "{{Hollós Béla kabátjában|kabat}} háromezer pengőről szóló {{kártyaváltók|adossag}}. A kabát ujjára friss, még nedves zöld krémet {{kentek|kremkent}}, liszt nélkül. A kabát este óta az {{öltözőben|oltozo}} lógott a fogason." },
    penzkonyv: { t: "A javított pénztárkönyv", src: "Kassza", x: "A pénztárkönyvben két összeget {{kijavítottak|kassza}}, más tintával. A javítások mellett apró ceruzás jel: „visszatéve, III. 28.”" },
    palinka: { t: "A pálinkásüveg", src: "Portásfülke", x: "Fehér György {{fülkéjében|portasfulke}} egy félig üres {{szilvapálinkás|palinka}} üveg, a pohár felborulva. A székén mély horpadás, a lámpa kanóca tövig égett." },
    vilmatask: { t: "Vilma asszony táskája", src: "Üzlettér", x: "Vilma asszony táskájában az előszerződés másolata, az ő aláírásával mint tanúéval, egy hete keltezve." },
    arlap: { t: "Az árlap", src: "Üzlettér", x: "A falon a tavaszi árlap: „Pisztáciás Hollós-torta, 4 pengő. Titka a selymes pisztáciakrém.”" },
    kesobb: { t: "Szendrei beismerése", src: "Szendrei vallomása", x: "Szendrei beismeri, hogy nem fél tízkor ment haza, hanem jóval később. {{Tízkor|t2200}} még bent volt, amikor a mester lement a jégkamrába." },
    szalag: { t: "A kasszaszalag", src: "Kassza", x: "A kasszaszalag szerint Anna 21:30-kor lezárta a kasszát. Utána még egyszer ütöttek a gépen, 22:20-kor: „Főcukrász, 1 tál krémalap, saját számlára.”" }
  },
contradictions: [
    { id: "c-szendrei", suspect: "szendrei", clue: ["tavozas"], gives: "kesobb",
      reveal: "Szendrei elsápad: „Jó… később mentem el. Takarítottam, ennyi. Tízkor a mester lement, én nem láttam többet.”" },
    { id: "c-szendrei2", suspect: "szendrei", clue: ["valtok"],
      reveal: "Szendrei túl gyorsan felel: „Biztos a műhelyben kente össze magát, az a fiú mindenhez hozzáér.”" },
    { id: "c-hollosbela", suspect: "hollosbela", clue: ["kartya"], lie: false,
      reveal: "Hollós Béla megnézi a lapot: „Az én paklimból való. A paklim tegnap délután óta a {{műhelyben|muhely}} hevert, mindenki hozzáférhetett. Kilenctől hajnalig a klubban {{kártyáztam|kartyazott}}, tíz ember tanúsítja.”" },
    { id: "c-anna", suspect: "anna", clue: ["penzkonyv"],
      reveal: "Anna sírva fakad: „Kölcsönvettem az anyám orvosára. Két hét múlva visszatettem, Hollós úr rájött, és megbocsátott. Fél tízkor tényleg hazamentem.”" },
    { id: "c-vilma", suspect: "vilma", clue: ["vilmatask"],
      reveal: "Vilma halkan mondja: „Tudtam. Én is aláírtam. Nyugdíjba akartunk menni, Ernő is akarta. Szégyelltem bevallani.”" },
    { id: "c-feher", suspect: "feher", clue: ["palinka"],
      reveal: "Gyuri bácsi a sapkáját gyűri: „Tíz után {{elbóbiskoltam|elaludt}}, na. Csak hajnalban ébredtem. Nem láttam, ki ment a jégkamra felé.”" }
  ],

    locations: [
    { id: "jegkamra", spots: { holttest: [40, 60], torta: [25, 30], kartya: [20, 80], vodor: [68, 85] }, name: "Jégkamra", desc: "Hideg pára, jégtömbök fűrészporban, a polcokon torták. Az ajtón egy kis, bederesedett üvegablak.",
      look: "Hideg pára, jégtömbök fűrészporban, csöpög az olvadékvíz. [[Hollós a jégtömbök mellett kuporodik|holttest]], mintha melegedni próbált volna. A polcon [[a pisztáciás torta, egy szelet hiányzik belőle|torta]].\n\n[[A jégtömbök között valami piros-fehér villan a fűrészporban|kartya]]. A sarokban [[egy felborított vödör|vodor]]. Az ajtón egy kis, bederesedett üvegablak.",
      decoys: { torta: "A hiányzó szeletet a mester maga vágta le kóstolni. Az orvos szerint mérgezésnek nyoma sincs.", vodor: "Jeges víz, egy fakanál. Hollós talán ezzel dörömbölt az ajtón." },
      items: [
        { clue: "holttest", label: "A mester", text: "Letérdelsz a mester mellé." },
        { clue: "kartya", label: "A jégtömbök között", text: "Kihúzod a fűrészporból." }],
      puzzle: "der" },
    { id: "muhely", spots: { ust: [45, 58], retesz_: [10, 45], sodrofa: [25, 62] }, name: "Cukrászműhely", desc: "Márványasztalok, rézüstök, a falon kötények sora. Mindenütt liszt és porcukor.",
      look: "Márványasztalok, rézüstök, mindenütt liszt és porcukor. [[A rézüstben|ust]] zöld krém maradéka. A falon kötények sora, a jégkamra ajtaján kívül [[a nehéz vasretesz|retesz_]]. Az asztalon [[egy sodrófa|sodrofa]].",
      decoys: { ust: "Pisztáciakrém, liszttel sűrítve. Szendrei titka, mondja az inas: senki más nem főz így.", retesz_: "A fogantyún zöld folt. Aki {{rátolta a reteszt|rateszt}}, krémes kézzel tette. Hogy kié a krém, ahhoz össze kell vetned a ruhák foltjaival.", sodrofa: "Tiszta, a helyén. Senkit sem ütöttek meg vele." },
      requires: "der", puzzle: "retesz" },
    { id: "iroda", spots: { oklevel: [50, 8], naptar: [90, 80] }, name: "Hollós irodája", desc: "Íróasztal, bekeretezett oklevelek, a sarokban egy zöldre festett páncélszekrény.",
      look: "Íróasztal, a falon [[bekeretezett oklevelek|oklevel]], a sarokban egy zöldre festett páncélszekrény. Az asztalon a Hollós-torta receptje és [[egy asztali naptár|naptar]].",
      decoys: { oklevel: "Bécs 1911, Párizs 1925, Budapest 1930. Mindegyiken csak Hollós neve áll, pedig a tortákat évek óta Szendrei készíti.", naptar: "Április 12.: „Lánchíd Rt., 10 óra, aláírás.” Kétszer aláhúzva." },
      puzzle: "szef" },
    { id: "portas", spots: { palinka: [70, 65], lampas: [68, 8] }, name: "Portásfülke", desc: "Szűk fülke a hátsó kapunál, a falon a jelenléti ív, az asztalon egy üveg.",
      look: "Szűk fülke a hátsó kapunál, a falon az elázott jelenléti ív. [[Az asztalon egy üveg, mellette felborult pohár|palinka]]. A szögön [[Gyuri bácsi lámpása|lampas]].",
      decoys: { lampas: "Hideg, a bura kormos. Ma éjjel senki sem járt vele körbe a házban." },
      items: [{ clue: "palinka", label: "Az asztal", text: "Megszagolod a poharat." }],
      puzzle: "tavozas" },
    { id: "kassza", spots: { penzkonyv: [25, 68], apro: [50, 78] }, name: "Kassza", desc: "Rézpénztárgép, vastag pénztárkönyv, a fiókban apró.",
      look: "Rézpénztárgép, [[a vastag pénztárkönyv|penzkonyv]], a fiókban [[apró|apro]].",
      decoys: { apro: "Pontosan annyi, amennyi a kasszaszalag szerint kell. Ma éjjel senki sem nyúlt hozzá." },
      items: [{ clue: "penzkonyv", label: "A pénztárkönyv", text: "Átlapozod az utolsó oldalakat." }],
      puzzle: "szalag" },
    { id: "oltozo", spots: { valtok: [52, 40], szekreny: [80, 40], csizma: [52, 86] }, name: "Személyzeti öltöző", desc: "Fogasok, szekrények, egy elegáns férfikabát a kötények között.",
      look: "Fogasok, szekrények, keményített kötények. [[Egy elegáns férfikabát a kötények között|valtok]], az ujján valami zöld. [[Szendrei szekrénye|szekreny]] nyitva, a padon [[egy pár csizma|csizma]].",
      decoys: { szekreny: "Tiszta ing, egy fénykép Hollósról és Szendreiről 1918-ból, karonfogva. A kötény hiányzik a helyéről.", csizma: "{{Az inasé|inas}}. {{Reggel|reggel}} hatkor jött, ő találta meg a mestert." },
      items: [{ clue: "valtok", label: "Az elegáns kabát", text: "Átnézed Hollós Béla kabátját." }] },
    { id: "uzlet", spots: { vilmatask: [87, 57], arlap: [55, 35], hattyu: [70, 40] }, name: "Üzlettér", desc: "Tükrös falak, üvegvitrinek, márványasztalkák. Holnap itt nyitottak volna újra.",
      look: "Tükrös falak, üvegvitrinek, márványasztalkák. A pulton [[Vilma asszony táskája|vilmatask]], ott felejtette, amikor reggel berohant. A pult fölött [[az árlap rézkeretben|arlap]], a vitrinben [[egy cukorból öntött hattyú|hattyu]].",
      decoys: { hattyu: "Szendrei mestermunkája, a párizsi kiállításról. A talapzaton mégis Hollós neve áll." },
      items: [
        { clue: "vilmatask", label: "Vilma asszony táskája", text: "Belenézel a táskába." },
        { clue: "arlap", label: "Az árlap", text: "Elolvasod a kalligrafikus betűket." }] }
  ],

    deductions: [
    { id: "d-csel", from: ["kartya", "valtok"], t: "Reggeli nyomok", x: "A kártya száraz az egész éjjel olvadó jég között, a kabát krémje még nedves, pedig a kabát este óta a fogason lóg. Mindkettőt reggel helyezték el, hogy Hollós Bélára terelje a gyanút.",
      text: "A(z) {} száraz az olvadó jég között, és a kabátra is friss krémet {}. Mindkettőt ekkor helyezték el: {}, hogy a gyanú rá essen: {}.", b: ["kartya", "kremkent", "reggel", "hollosbela"] },
    { id: "d-egyedul", from: ["kesobb", "palinka"], t: "Egyedül a házban", x: "Hollós tízkor ment le a jégkamrába. Ekkor már csak Szendrei és az éjjeliőr volt a házban, és Gyuri bácsi tíz után a pálinkától elaludt. Szendrei fél tizenegyig ébren, egyedül maradt.",
      text: "Hollós ekkor ment le a jégkamrába: {}. Gyuri bácsi tíz után {}. Ébren egyedül ő maradt a házban: {}, egészen eddig: {}.", b: ["t2200", "elaludt", "szendrei", "t2230"] },
    { id: "d-bela", from: ["der", "retesz"], t: "Melyik Béla?", x: "A mester a BÉLA nevet írta a dérbe. A reteszen este került, egész éjjel száradt, lisztes krém van, és az ilyet csak Szendrei Béla főzte, az ő kötényén van ugyanez.",
      text: "A mester a dérbe ezt írta: BÉLA. A reteszen este került, lisztes {} van, és ugyanilyen folt van ezen: {}. Ennek a gazdája: {}.", b: ["krem", "koteny", "szendrei"] },
    { id: "d-vilma", from: ["vilmatask", "szerzodes"], t: "Vilma tudott róla", x: "Vilma tanúként aláírta az előszerződést. Ő akarta az eladást, a férje halála semmit sem nyert volna neki: az üzlet nélküle is megköttetett volna.",
      text: "Vilma tanúként aláírta az előszerződést, tehát tudott erről: {}. Nem volt oka megölni a férjét, hiszen az eladást ő maga is akarta: {}.", b: ["eladas", "vilma"] }
  ],
events: [
    { id: "unokaocs", after: 3, title: "Hollós Béla berobban",
      text: "Csapódik a hátsó ajtó. Hollós Béla áll ott, kalap nélkül, a nyakkendője félrecsúszva. „Hallottam, mit írt a nagybátyám! Béla? Hát nem tudják, hány Béla van ebben a városban?”\n\nSzendrei a műhely ajtajából figyeli. Nem szól egy szót sem, csak a kezét törli a kötényébe, újra meg újra." },
    { id: "koteny", afterSolved: "retesz", title: "Füst a műhelyből",
      text: "Égett szag. A műhely sütőjének ajtaja nyitva, és Szendrei Béla egy piszkavassal tolja be a kötényét a lángok közé.\n\nAz inas kirántja, mielőtt elégne. A zöld folt még ott van rajta, megpörkölődve. Szendrei leteszi a piszkavasat. „A kötényem az enyém” mondja halkan." }
  ],

  fates: {
    hollosbela: "A BÉLA felirat, a kőr ász és a krémes kabát tökéletesen összeállt. Az unokaöcsöt elítélik; az örökséget, amelyért a vád szerint ölt, a Lánchíd Rt. veszi meg fillérekért.",
    anna: "A javított pénztárkönyv elég volt. Kertész Annát elítélik, és a beteg anyja sosem tudja meg, miért nem jön haza többé.",
    vilma: "Az aláírt előszerződés és az elhallgatott eladás meggyőzte a bíróságot. Vilmát a férje meggyilkolásáért ítélik el, a cukrászdát idegenek nyitják újra.",
    feher: "Ő volt a házban egész éjjel, és nem tudta megmondani, mit látott. Gyuri bácsit elítélik; a Váci utcában még évekig mesélik, hogy a jó öreg éjjeliőr ölte meg a mestert."
  },
  puzzles: {
    szalag: {
      type: "log", title: "A kasszaszalag", reward: "szalag", answer: 5,
      body: `<p>A rézpénztárgép minden ütést kinyomtat a szalagra. Kertész Anna szerint fél tízkor lezárta a kasszát. Melyik sor nem illik ide?</p>`,
      cols: ["Idő", "Tétel", "Összeg"],
      rows: [
        ["21:12", "Zserbó, 2 db", "1,20 P"],
        ["21:18", "Krémes, 4 db", "2,40 P"],
        ["21:24", "Kávé, 2 csésze", "0,80 P"],
        ["21:30", "ZÁRÁS · Kertész A.", "—"],
        ["21:30", "Napi összesítő", "412,60 P"],
        ["22:20", "Főcukrász, 1 tál krémalap, saját számlára", "0,00 P"]
      ],
      wrong: { 3: "Ez Anna zárása, ahogy mondta.", 4: "A napi összesítő a zárással együtt jár." },
      hints: ["A zárás után már senkinek sem kellett volna a géphez nyúlnia."]
    },
    der: {
      type: "text", title: "Írás a dérben", reward: "der", answers: ["Béla"], placeholder: "Milyen nevet írt?",
      body: `<p>A jégkamra ajtajának kis üvegablakára Hollós belülről, az ujjával írt valamit a dérbe, mielőtt összeesett. Te kívülről nézed:</p>
<div class="typed mirror">BÉLA</div>
<p>Milyen nevet írt fel a mester?</p>`,
      wrong: "Nem ezt írta. Ő belülről írt, te kívülről nézed.",
      hints: [
        "A betűk tükörképek, mert a másik oldalról írták. Olvasd jobbról balra.",
        "Egy négybetűs férfinév. A házban ketten is viselik."
      ]
    },
    retesz: {
      type: "choice", title: "A zöld folt", reward: "retesz", answer: "B",
      body: `<p>A jégkamra reteszének fogantyúján zöld folt: megkérgesedett, liszttel kevert pisztáciakrém. Egész éjjel száradt. Négy ember ruháján is van valami folt. Melyik egyezik a reteszen lévővel?</p>`,
      options: [
        { v: "A", label: "Hollós Béla kabátujja", sample: "Friss, még nedves zöld krém. Liszt nincs benne." },
        { v: "B", label: "Szendrei Béla köténye", sample: "Megszáradt, megkérgesedett zöld krém, liszttel keverve." },
        { v: "C", label: "Kertész Anna kesztyűje", sample: "Lila tintafolt a mutatóujjon." },
        { v: "D", label: "Vilma asszony kendője", sample: "Porcukor és egy csepp málnaszósz." }
      ],
      confirm: "Ez egyezik",
      wrong: "A folt nem egyezik a reteszen lévővel. Nézd meg, mi van benne, és mennyire száraz.",
      hints: [
        "A reteszen lévő krém egész éjjel száradt, és liszt is van benne.",
        "Egy friss, nedves folt nem kerülhetett rá este. Azt valaki reggel tette oda."
      ]
    },
    szef: {
      type: "code", title: "A páncélszekrény", reward: "szerzodes", answers: ["3927"], length: 4,
      body: `<p>A páncélszekrény négyjegyű számzárral nyílik. Vilma szerint a férje mindig azt mondta: „A kód a torta titka.” Az íróasztalon ott a Hollós-torta receptje, a mester kézírásával:</p>
<div class="typed">HOLLÓS-TORTA
Tészta:  4 tojás, 6 dkg vaj, 2 kanál méz, 8 dkg liszt
Krém:    3 tojássárgája, 9 dkg vaj, 2 dl tejszín, 7 dkg pisztácia
Máz:     5 dkg csokoládé, 1 dl tejszín, 8 dkg cukor, 4 dkg vaj</div>`,
      wrong: "A zár nem enged. A recept egyik része a titok, de melyik?",
      hints: [
        "A receptből nem derül ki, melyik rész a titok. Nézz körül az üzlettérben.",
        "Az árlap szerint a torta titka a krém. A krém mennyiségei adják a kódot, sorrendben."
      ]
    },
    tavozas: {
      type: "assign", title: "A jelenléti ív", reward: "tavozas", columnLabel: "Mikor ment el?",
      body: `<p>Gyuri bácsi jelenléti íve elázott, az időpontok elmosódtak. A szemközti trafikos és a szomszédok szavaiból állítsd össze, ki mikor hagyta el a cukrászdát. Mindenki más időpontban távozott, és egy ember egész éjjel bent maradt.</p>`,
      facts: [
        "Az éjjeliőr soha nem hagyja el a házat éjszaka.",
        "A trafikos szerint pontban kilenckor, záráskor egy elegáns fiatalember lépett ki elsőként, kártyapaklit kevergetve.",
        "A pénztárosnő akkor zárta le a kasszát, amikor a Ferences templom fél tízet ütött. A kasszaszalag utolsó bejegyzése is ekkori. Utána rögtön kabátot vett.",
        "Vilma asszonyt a kalauz negyed tizenegykor kezelte a villamoson. A cukrászdától a megállóig fél óra az út.",
        "A trafikos szerint fél tíz után már csak egyetlen férfi lépett ki a kapun, jóval később, amikor a lámpagyújtogató a második körét járta. Ő fél tizenegykor szokott arra járni."
      ],
      choices: ["21:00", "21:30", "21:45", "22:30", "Egész éjjel bent"],
      answer: { szendrei: "22:30", hollosbela: "21:00", anna: "21:30", vilma: "21:45", feher: "Egész éjjel bent" },
      hints: [
        "Vilmánál számolj: mikor kellett elindulnia, hogy negyed tizenegykor a villamoson üljön?",
        "Ha a fiatalember kilenckor ment el, a későbbi férfi csak a főcukrász lehet."
      ]
    }
  },

    accusation: {
    story: "A tettes: {}. Ekkor a mester lement a jégkamrába: {}. A tettes krémes kézzel {}, és a mestert a hidegben hagyta.\nIndíték: {}.\nReggel a gyanút a másik Bélára akarta terelni egy {} és egy krémes kabát segítségével. A másik Béla: {}.",
    b: ["szendrei", "t2200", "rateszt", "eladas", "kartya", "hollosbela"], who: [0]
  },

  plan: { w: 10, h: 8,
    rooms: { uzlet: [0, 0, 5, 3], kassza: [5, 0, 2, 3], iroda: [7, 0, 3, 3], muhely: [0, 3, 5, 3], jegkamra: [5, 3, 2.4, 3], oltozo: [7.4, 3, 2.6, 3], _udvar: [0, 6, 8, 2, "Hátsó udvar"], portas: [8, 6, 2, 2, "Portás"] },
    doors: [[5, 1, 5, 2], [7, 1, 7, 2], [2, 3, 3, 3], [5, 4, 5, 5], [8.5, 6, 9.5, 6], [2, 6, 3, 6]],
    marks: [[4.05, 5.6, "retesz →"]],
    note: "A Váci utcai cukrászda földszintje. A jégkamrába csak a műhelyből lehet bejutni, a retesze a műhely felőli oldalon van." },
carnation: { letter: "Z", found: "Szendrei kötényzsebében egy préselt fekete szegfű és egy gépelt cédula. A jobb alsó sarkában pirossal bekarikázva egy betű.", note: "„⟪ido⟫ Holnap reggel aláírják. ⟪vevo⟫ A Lánchíd Rt. megveszi a boltot, és téged kihagynak. ⟪ajto⟫ A jégkamra retesze kívül van. — F. Sz.”" },

  ending: {
    heading: "Szendrei Béla volt az.",
    paragraphs: [
      "Tizenöt éven át Hollós azt ígérte a főcukrászának, hogy egyszer társ lesz a cukrászdában. Aznap este, amikor Szendrei bevitte a tortát az irodába, meglátta az asztalon a Lánchíd Rt. előszerződését: Hollós másnap eladja a boltot, a személyzetet pedig elbocsátják.",
      "Tízkor Hollós lement a jégkamrába megnézni a tortát. Szendrei, kezén még a pisztáciakrémmel, rátolta a reteszt, és csak fél tizenegykor ment haza. Gyuri bácsi addigra elaludt a pálinkától. A mester az ablakon át látta, ki zárta be, és a dérbe írta a nevét, de csak a keresztnevét.",
      "Reggel Szendrei rájött, hogy a „BÉLA” felirat két emberre is illik. Korán bement, a jég közé dobta az unokaöcs kőr ászát, és friss krémet kent a fogason lógó kabátjára. A kártya azonban száraz volt az olvadó jég között, a krém pedig még nedves. A reteszen lévő folt egész éjjel száradt, és ez döntötte el, melyik Béla volt."
    ]
  }
});
