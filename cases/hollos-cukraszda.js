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
      stmt: "„Kilenckor már a kártyaklubban ültem, kérdezze meg bárkit. A nagybátyámmal veszekedtünk, igen, de ki nem veszekszik a rokonaival? A jégkamrába évek óta be sem tettem a lábam.”" },
    { id: "anna", look: { hair: "bob", clothes: "blouse", lips: true }, name: "Kertész Anna", role: "Pénztárosnő, 35 éves. Hat éve kezeli a kasszát.",
      stmt: "„Fél tízkor lezártam a kasszát, és hazamentem. A kasszában minden fillér stimmel, mindig is stimmelt. Hollós úr nagyon jó volt hozzám.”" },
    { id: "vilma", look: { hair: "bun", clothes: "dress", acc: ["pearls"], lips: true }, name: "Hollós Vilma", role: "A mester felesége, 55 éves.",
      stmt: "„Negyed tízkor még láttam Ernőt a műhelyben, a tortát nézte. Utána hazamentem. Ernő soha nem adta volna el ezt a boltot, ez volt az élete.”" },
    { id: "feher", look: { hair: "bald", hat: "cap", clothes: "uniform", acc: ["mustache"] }, name: "Fehér György", role: "Éjjeliőr, 66 éves. Gyuri bácsi mindenkit ismer a Váci utcában.",
      stmt: "„Tízkor hallottam a gazdát, ahogy mondja: »Megnézem még a tortát a jégben.« Utána egész éjjel ébren voltam a helyemen, egy egér sem mozdult a házban.”" }
  ],

  clues: {
    holttest: { t: "A jégkamra", src: "Jégkamra", x: "Hollós a jégtömbök mellett kuporodott össze, kabát nélkül. Az orvos szerint éjfél körül fagyott meg. A tölgyfa ajtót kívülről zárta a retesz, belülről nincs rajta kilincs. A polcon ott a pisztáciás torta, egy szelet hiányzik belőle." },
    der: { t: "A dérbe írt név", src: "Jégkamra · ajtóüveg", x: "Hollós belülről, az ujjával egy keresztnevet írt az ajtó kis ablakára: BÉLA. A cukrászdában két Béla van: Szendrei Béla, a főcukrász, és Hollós Béla, az unokaöcs." },
    kartya: { t: "Kártyalap a jég között", src: "Jégkamra", x: "A jégtömbök között egy kártyalap: kőr ász, száraz és tiszta. A fűrészporban egyetlen nedvességfolt sincs körülötte, pedig a jég egész éjjel olvadt." },
    retesz: { t: "A krém a reteszen", src: "Cukrászműhely", x: "A retesz fogantyúján megkérgesedett zöld pisztáciakrém, liszttel keverve, egész éjjel száradt. A krémet aznap este csak Szendrei Béla főzte, a kötényén ugyanilyen liszttel kevert, száraz folt." },
    szerzodes: { t: "Az előszerződés", src: "Iroda · páncélszekrény", x: "Előszerződés a Lánchíd Kávéház Rt.-vel: Hollós holnap eladja a cukrászdát, a személyzetet elbocsátják. Mellette egy cetli: „Szendreinek nem szólok. Tizenöt éve ígérem neki, hogy társ lesz. Majd megérti.”" },
    tavozas: { t: "Ki mikor ment haza?", src: "Portásfülke · jelenléti ív", x: "Hollós Béla 21:00, Kertész Anna 21:30, Vilma asszony 21:45, Szendrei Béla 22:30. Fehér György egész éjjel bent maradt. Hollós 22:00-kor indult a jégkamrába." },
    valtok: { t: "Hollós Béla kabátja", src: "Öltöző", x: "Hollós Béla kabátjában háromezer pengőről szóló kártyaváltók. A kabát ujján friss, még nedves zöld krémfolt, liszt nélkül. A kabát este óta a fogason lógott." },
    penzkonyv: { t: "A javított pénztárkönyv", src: "Kassza", x: "A pénztárkönyvben két összeget kijavítottak, más tintával. A javítások mellett apró ceruzás jel: „visszatéve, III. 28.”" },
    palinka: { t: "A pálinkásüveg", src: "Portásfülke", x: "Fehér György fülkéjében egy félig üres szilvapálinkás üveg, a pohár felborulva. A székén mély horpadás, a lámpa kanóca tövig égett." },
    vilmatask: { t: "Vilma asszony táskája", src: "Üzlettér", x: "Vilma asszony táskájában az előszerződés másolata, az ő aláírásával mint tanúéval, egy hete keltezve." },
    arlap: { t: "Az árlap", src: "Üzlettér", x: "A falon a tavaszi árlap: „Pisztáciás Hollós-torta, 4 pengő. Titka a selymes pisztáciakrém.”" }
  },

  contradictions: [
    { id: "c-szendrei", suspect: "szendrei", clue: ["tavozas"],
      reveal: "Szendrei elsápad: „Jó… később mentem el. Takarítottam, ennyi. Tízkor a mester lement, én nem láttam többet.”" },
    { id: "c-szendrei2", suspect: "szendrei", clue: ["valtok"],
      reveal: "Szendrei túl gyorsan felel: „Biztos a műhelyben kente össze magát, az a fiú mindenhez hozzáér.”" },
    { id: "c-hollosbela", suspect: "hollosbela", clue: ["kartya"], lie: false,
      reveal: "Hollós Béla megnézi a lapot: „Az én paklimból való. A paklim tegnap délután óta a műhelyben hevert, mindenki hozzáférhetett. Kilenctől hajnalig a klubban ültem, tíz ember tanúsítja.”" },
    { id: "c-anna", suspect: "anna", clue: ["penzkonyv"],
      reveal: "Anna sírva fakad: „Kölcsönvettem az anyám orvosára. Két hét múlva visszatettem, Hollós úr rájött, és megbocsátott. Fél tízkor tényleg hazamentem.”" },
    { id: "c-vilma", suspect: "vilma", clue: ["vilmatask"],
      reveal: "Vilma halkan mondja: „Tudtam. Én is aláírtam. Nyugdíjba akartunk menni, Ernő is akarta. Szégyelltem bevallani.”" },
    { id: "c-feher", suspect: "feher", clue: ["palinka"],
      reveal: "Gyuri bácsi a sapkáját gyűri: „Tíz után elbóbiskoltam, na. Csak hajnalban ébredtem. Nem láttam, ki ment a jégkamra felé.”" }
  ],

    locations: [
    { id: "jegkamra", name: "Jégkamra", desc: "Hideg pára, jégtömbök fűrészporban, a polcokon torták. Az ajtón egy kis, bederesedett üvegablak.",
      look: "Hideg pára, jégtömbök fűrészporban, csöpög az olvadékvíz. [[Hollós a jégtömbök mellett kuporodik|holttest]], mintha melegedni próbált volna. A polcon [[a pisztáciás torta, egy szelet hiányzik belőle|torta]].\n\n[[A jégtömbök között valami piros-fehér villan a fűrészporban|kartya]]. A sarokban [[egy felborított vödör|vodor]]. Az ajtón egy kis, bederesedett üvegablak.",
      decoys: { torta: "A hiányzó szeletet a mester maga vágta le kóstolni. Az orvos szerint mérgezésnek nyoma sincs.", vodor: "Jeges víz, egy fakanál. Hollós talán ezzel dörömbölt az ajtón." },
      items: [
        { clue: "holttest", label: "A mester", text: "Letérdelsz a mester mellé." },
        { clue: "kartya", label: "A jégtömbök között", text: "Kihúzod a fűrészporból." }],
      puzzle: "der" },
    { id: "muhely", name: "Cukrászműhely", desc: "Márványasztalok, rézüstök, a falon kötények sora. Mindenütt liszt és porcukor.",
      look: "Márványasztalok, rézüstök, mindenütt liszt és porcukor. [[A rézüstben|ust]] zöld krém maradéka. A falon kötények sora, a jégkamra ajtaján kívül [[a nehéz vasretesz|retesz_]]. Az asztalon [[egy sodrófa|sodrofa]].",
      decoys: { ust: "Pisztáciakrém, liszttel sűrítve. Szendrei titka, mondja az inas: senki más nem főz így.", retesz_: "A fogantyún zöld folt. Hogy kié, ahhoz össze kell vetned a ruhák foltjaival.", sodrofa: "Tiszta, a helyén. Senkit sem ütöttek meg vele." },
      requires: "der", puzzle: "retesz" },
    { id: "iroda", name: "Hollós irodája", desc: "Íróasztal, bekeretezett oklevelek, a sarokban egy zöldre festett páncélszekrény.",
      look: "Íróasztal, a falon [[bekeretezett oklevelek|oklevel]], a sarokban egy zöldre festett páncélszekrény. Az asztalon a Hollós-torta receptje és [[egy asztali naptár|naptar]].",
      decoys: { oklevel: "Bécs 1911, Párizs 1925, Budapest 1930. Mindegyiken csak Hollós neve áll, pedig a tortákat évek óta Szendrei készíti.", naptar: "Április 12.: „Lánchíd Rt., 10 óra, aláírás.” Kétszer aláhúzva." },
      puzzle: "szef" },
    { id: "portas", name: "Portásfülke", desc: "Szűk fülke a hátsó kapunál, a falon a jelenléti ív, az asztalon egy üveg.",
      look: "Szűk fülke a hátsó kapunál, a falon az elázott jelenléti ív. [[Az asztalon egy üveg, mellette felborult pohár|palinka]]. A szögön [[Gyuri bácsi lámpása|lampas]].",
      decoys: { lampas: "Hideg, a bura kormos. Ma éjjel senki sem járt vele körbe a házban." },
      items: [{ clue: "palinka", label: "Az asztal", text: "Megszagolod a poharat." }],
      puzzle: "tavozas" },
    { id: "kassza", name: "Kassza", desc: "Rézpénztárgép, vastag pénztárkönyv, a fiókban apró.",
      look: "Rézpénztárgép, [[a vastag pénztárkönyv|penzkonyv]], a fiókban [[apró|apro]].",
      decoys: { apro: "Pontosan annyi, amennyi a kasszaszalag szerint kell. Ma éjjel senki sem nyúlt hozzá." },
      items: [{ clue: "penzkonyv", label: "A pénztárkönyv", text: "Átlapozod az utolsó oldalakat." }] },
    { id: "oltozo", name: "Személyzeti öltöző", desc: "Fogasok, szekrények, egy elegáns férfikabát a kötények között.",
      look: "Fogasok, szekrények, keményített kötények. [[Egy elegáns férfikabát a kötények között|valtok]], az ujján valami zöld. [[Szendrei szekrénye|szekreny]] nyitva, a padon [[egy pár csizma|csizma]].",
      decoys: { szekreny: "Tiszta ing, egy fénykép Hollósról és Szendreiről 1918-ból, karonfogva. A kötény hiányzik a helyéről.", csizma: "Az inasé. Reggel hatkor jött, ő találta meg a mestert." },
      items: [{ clue: "valtok", label: "Az elegáns kabát", text: "Átnézed Hollós Béla kabátját." }] },
    { id: "uzlet", name: "Üzlettér", desc: "Tükrös falak, üvegvitrinek, márványasztalkák. Holnap itt nyitottak volna újra.",
      look: "Tükrös falak, üvegvitrinek, márványasztalkák. A pulton [[Vilma asszony táskája|vilmatask]], ott felejtette, amikor reggel berohant. A pult fölött [[az árlap rézkeretben|arlap]], a vitrinben [[egy cukorból öntött hattyú|hattyu]].",
      decoys: { hattyu: "Szendrei mestermunkája, a párizsi kiállításról. A talapzaton mégis Hollós neve áll." },
      items: [
        { clue: "vilmatask", label: "Vilma asszony táskája", text: "Belenézel a táskába." },
        { clue: "arlap", label: "Az árlap", text: "Elolvasod a kalligrafikus betűket." }] }
  ],

  deductions: [
    { id: "d-csel", from: ["kartya", "valtok"], t: "Reggeli nyomok", x: "A kártya száraz az egész éjjel olvadó jég között, a kabát krémje még nedves, pedig a kabát este óta a fogason lóg. Mindkettőt reggel helyezték el, hogy Hollós Bélára terelje a gyanút.",
      q: "Mi közös a kártyalapban és a kabáton lévő krémben?", ans: 1,
      opts: ["Mindkettő Hollós Béla ellen szól, tehát ő a tettes.", "Mindkettő friss: valaki reggel helyezte el őket, hogy Hollós Bélára terelje a gyanút.", "Hollós Béla reggel visszajött, és akkor hagyta ott őket."] },
    { id: "d-egyedul", from: ["tavozas", "palinka"], t: "Egyedül a házban", x: "Hollós tízkor ment le a jégkamrába. Ekkor már csak Szendrei és az éjjeliőr volt a házban, és Gyuri bácsi tíz után a pálinkától elaludt. Szendrei fél tizenegyig ébren, egyedül maradt.",
      q: "Ki lehetett ébren a házban, amikor Hollós lement a jégkamrába?", ans: 0,
      opts: ["Csak Szendrei Béla: a többiek elmentek, az éjjeliőr aludt.", "Gyuri bácsi, aki egész éjjel ébren volt a helyén.", "Vilma asszony, aki a villamos előtt visszafordult."] },
    { id: "d-bela", from: ["der", "retesz"], t: "Melyik Béla?", x: "A mester a BÉLA nevet írta a dérbe. A reteszen este került, egész éjjel száradt, lisztes krém van, és az ilyet csak Szendrei Béla főzte, az ő kötényén van ugyanez.",
      q: "Melyik Bélára mutat a két nyom együtt?", ans: 2,
      opts: ["Hollós Bélára, az unokaöcsre, aki örököl.", "Egyikre sem: a név a pékségre utal.", "Szendrei Bélára, a főcukrászra."] },
    { id: "d-vilma", from: ["vilmatask", "szerzodes"], t: "Vilma tudott róla", x: "Vilma tanúként aláírta az előszerződést. Ő akarta az eladást, a férje halála semmit sem nyert volna neki: az üzlet nélküle is megköttetett volna.",
      q: "Mit jelent ez Vilmára nézve?", ans: 0,
      opts: ["Nem volt oka megölni a férjét: ő maga is akarta az eladást.", "Vilma meg akarta akadályozni az eladást.", "Vilma hamisította a férje aláírását."] }
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
    questions: [
      { id: "who", legend: "Ki zárta be a mestert?", name: "a tettes", from: "suspects", answer: "szendrei", proof: ["d-bela", "d-egyedul"] },
      { id: "how", legend: "Hogyan halt meg Hollós?", name: "a módszer", answer: "jeg", proof: ["holttest", "retesz"],
        options: [{ v: "jeg", label: "Bezárták a jégkamrába a külső retesszel, és megfagyott" }, { v: "mereg", label: "Megmérgezték a pisztáciás tortával" }, { v: "utes", label: "Leütötték egy sodrófával" }] },
      { id: "why", legend: "Miért tette?", name: "az indíték", answer: "eladas", proof: ["szerzodes"],
        options: [{ v: "orokseg", label: "Hogy megörökölje a cukrászdát" }, { v: "eladas", label: "A titkos eladás és a tizenöt éve megszegett ígéret" }, { v: "kassza", label: "Hogy eltitkolja a kasszából kivett pénzt" }, { v: "adossag", label: "A kártyaadósság miatt" }] },
      { id: "plant", legend: "Melyik nyommal akarták a gyanút a másik Bélára terelni?", name: "a hamis nyom", from: "clues", answer: ["kartya", "valtok"], proof: ["d-csel"] }
    ]
  },

  carnation: { letter: "Z", found: "Szendrei kötényzsebében egy préselt fekete szegfű és egy gépelt cédula. A jobb alsó sarkában pirossal bekarikázva egy betű.", note: "„Hollós holnap eladja a boltot a Lánchíd Rt.-nek, és téged kihagy. A jégkamra retesze kívül van. — F. Sz.”" },

  ending: {
    heading: "Szendrei Béla volt az.",
    paragraphs: [
      "Tizenöt éven át Hollós azt ígérte a főcukrászának, hogy egyszer társ lesz a cukrászdában. Aznap este, amikor Szendrei bevitte a tortát az irodába, meglátta az asztalon a Lánchíd Rt. előszerződését: Hollós másnap eladja a boltot, a személyzetet pedig elbocsátják.",
      "Tízkor Hollós lement a jégkamrába megnézni a tortát. Szendrei, kezén még a pisztáciakrémmel, rátolta a reteszt, és csak fél tizenegykor ment haza. Gyuri bácsi addigra elaludt a pálinkától. A mester az ablakon át látta, ki zárta be, és a dérbe írta a nevét, de csak a keresztnevét.",
      "Reggel Szendrei rájött, hogy a „BÉLA” felirat két emberre is illik. Korán bement, a jég közé dobta az unokaöcs kőr ászát, és friss krémet kent a fogason lógó kabátjára. A kártya azonban száraz volt az olvadó jég között, a krém pedig még nedves. A reteszen lévő folt egész éjjel száradt, és ez döntötte el, melyik Béla volt."
    ]
  }
});
