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
  teaser: "A híres cukrászmestert reggel holtan találják a saját jégkamrájában, amelyet kívülről zártak be. Az ajtó üvegén egy dérbe írt név áll. Csakhogy a házban két ember viseli.",
  difficulty: "Könnyű",

  intro: {
    eyebrow: "Budapesti Államrendőrség · IV. kerületi kapitányság",
    heading: "Hollós Ernő halála a jégkamrában",
    lead: "1933. április 12-én reggel hatkor a Hollós cukrászda inasa a jégkamrában találta meg a gazdáját, Hollós Ernő cukrászmestert. A vastag tölgyfa ajtót kívülről zárta a retesz, belülről nincs rajta kilincs.",
    body: "Az előző este bemutatták a személyzetnek a cukrászda új büszkeségét, a pisztáciás Hollós-tortát. Öt ember volt aznap este a házban. Egyikük rátolta a reteszt, és hagyta, hogy a mester a jég között töltse az éjszakát.",
    start: "jegkamra"
  },

  suspects: [
    { id: "szendrei", look: { hair: "short", clothes: "bowtie", acc: ["mustache"] }, name: "Szendrei Béla", role: "Főcukrász, 41 éves. Tizenöt éve dolgozik Hollós mellett.",
      stmt: "„Fél tízkor mentem haza, mint mindig. A torta kész volt, a krém tökéletes. Hollós úr elégedett volt velem, tizenöt éve az.”",
      extra: { after: "tavozas", text: "Nem fél tízkor ment el, hanem fél tizenegykor, utolsóként. Fél tízkor csak a pénztárosnő lépett ki az ajtón.", lie: true } },
    { id: "hollosbela", look: { hair: "slick", clothes: "suit" }, name: "Hollós Béla", role: "Az unokaöcs, 27 éves. A cukrászda egyetlen örököse.",
      stmt: "„Kilenckor már a kártyaklubban ültem, kérdezze meg bárkit. A nagybátyámmal veszekedtünk, igen, de ki nem veszekszik a rokonaival?”",
      extra: { after: "valtok", text: "Kártyaadósságai vannak, és ő örökölne. De kilenctől hajnalig a klubban ült, ezt tíz ember látta." } },
    { id: "anna", look: { hair: "bob", clothes: "blouse", lips: true }, name: "Kertész Anna", role: "Pénztárosnő, 35 éves. Hat éve kezeli a kasszát.",
      stmt: "„Fél tízkor lezártam a kasszát, és hazamentem. Hollós úr nagyon jó volt hozzám. Nem értem, ki tehetett ilyet.”",
      extra: { after: "penzkonyv", text: "Kölcsönvett a kasszából, de visszatette, és Hollós megbocsátott neki. Fél tízkor tényleg elment." } },
    { id: "vilma", look: { hair: "bun", clothes: "dress", acc: ["pearls"], lips: true }, name: "Hollós Vilma", role: "A mester felesége, 55 éves.",
      stmt: "„Negyed tízkor még láttam Ernőt a műhelyben, a tortát nézte. Utána hazamentem. Ő mindig utolsóként zárt.”",
      extra: { after: "vilmatask", text: "Tudott a cukrászda eladásáról, és örült neki. Háromnegyed tízkor ment el, a férje akkor még élt." } },
    { id: "feher", look: { hair: "bald", hat: "cap", clothes: "uniform", acc: ["mustache"] }, name: "Fehér György", role: "Éjjeliőr, 66 éves. Gyuri bácsi mindenkit ismer a Váci utcában.",
      stmt: "„Tízkor hallottam a gazdát, ahogy mondja: »Megnézem még a tortát a jégben.« Utána csend volt. Én a helyemen voltam egész éjjel.”",
      extra: { after: "palinka", text: "Tíz után elbóbiskolt a pálinkától, ezért nem látta, ki ment a jégkamra felé." } }
  ],

  clues: {
    holttest: { t: "A jégkamra", src: "Jégkamra", x: "Hollós a jégtömbök mellett kuporodott össze, kabát nélkül. Az orvos szerint éjfél körül fagyott meg. A tölgyfa ajtót kívülről zárta a retesz, belülről nincs rajta kilincs. A polcon ott a pisztáciás torta, egy szelet hiányzik belőle." },
    der: { t: "A dérbe írt név", src: "Jégkamra · ajtóüveg", x: "Hollós belülről, az ujjával egy nevet írt az ajtó üvegére: BÉLA. Kívülről tükörírásnak látszik. Csakhogy a cukrászdában két Béla van: Szendrei Béla, a főcukrász, és Hollós Béla, az unokaöcs." },
    retesz: { t: "Zöld folt a reteszen", src: "Cukrászműhely", x: "A retesz fogantyúján zöld pisztáciakrém és liszt. A krémet aznap este csak Szendrei Béla főzte, és az ő kötényén ugyanez a folt." },
    szerzodes: { t: "Az előszerződés", src: "Iroda · széf", x: "Előszerződés a Lánchíd Kávéház Rt.-vel: Hollós holnap eladja a cukrászdát, a személyzetet elbocsátják. Mellette egy cetli: „Szendreinek nem szólok. Tizenöt éve ígérem neki, hogy társ lesz. Majd megérti.”" },
    tavozas: { t: "Ki mikor ment haza?", src: "Portásfülke · jelenléti ív", x: "Hollós Béla 21:00, Kertész Anna 21:30, Vilma asszony 21:45, Szendrei Béla 22:30. Fehér György egész éjjel bent maradt. Hollós 22:00-kor indult a jégkamrába. Akkor már csak a főcukrász és az éjjeliőr volt a házban." },
    valtok: { t: "Kártyaváltók", src: "Öltöző", x: "Hollós Béla kabátjában háromezer pengőről szóló kártyaváltók. Ő örökölné a boltot. De kilenckor már a klubban ült, és hajnalig ott maradt, ezt tíz ember látta." },
    penzkonyv: { t: "A javított pénztárkönyv", src: "Kassza", x: "A pénztárkönyvben két kijavított összeg. Anna kölcsönvett a kasszából az édesanyja orvosára, és két hét múlva visszatette. Hollós rájött, de megbocsátott neki." },
    palinka: { t: "A pálinkásüveg", src: "Portásfülke", x: "Fehér György fülkéjében egy félig üres szilvapálinkás üveg. Bevallja, tíz után elbóbiskolt, és csak hajnalban ébredt fel." },
    vilmatask: { t: "Vilma asszony táskája", src: "Üzlettér", x: "Vilma asszony táskájában az előszerződés másolata, az ő aláírásával. Tudott az eladásról, és örült neki: végre nyugdíjba mehettek volna." }
  },

  locations: [
    { id: "jegkamra", name: "Jégkamra", desc: "Hideg pára, jégtömbök fűrészporban, a polcokon torták. Az ajtón egy kis, bederesedett üvegablak.",
      items: [{ clue: "holttest", label: "A mester", text: "Hollós a jégtömbök mellett kuporodik, mintha melegedni próbált volna." }],
      puzzle: "der" },
    { id: "muhely", name: "Cukrászműhely", desc: "Márványasztalok, rézüstök, a falon kötények sora. Mindenütt liszt és porcukor.",
      requires: "der", puzzle: "retesz" },
    { id: "iroda", name: "Hollós irodája", desc: "Íróasztal, bekeretezett oklevelek, a sarokban egy zöldre festett páncélszekrény.",
      puzzle: "szef" },
    { id: "portas", name: "Portásfülke", desc: "Szűk fülke a hátsó kapunál, a falon a jelenléti ív, az asztalon egy üveg.",
      items: [{ clue: "palinka", label: "Az asztal", text: "Egy üveg, pohár nélkül." }],
      puzzle: "tavozas" },
    { id: "kassza", name: "Kassza", desc: "Rézpénztárgép, vastag pénztárkönyv, a fiókban apró.",
      items: [{ clue: "penzkonyv", label: "A pénztárkönyv", text: "Az utolsó oldalakon kijavított számok." }] },
    { id: "oltozo", name: "Személyzeti öltöző", desc: "Fogasok, szekrények, egy elegáns férfikabát a kötények között.",
      items: [{ clue: "valtok", label: "Az elegáns kabát", text: "Hollós Béla kabátja, a zsebéből papírok lógnak ki." }] },
    { id: "uzlet", name: "Üzlettér", desc: "Tükrös falak, üvegvitrinek, márványasztalkák. Holnap itt nyitottak volna újra.",
      items: [{ clue: "vilmatask", label: "Vilma asszony táskája", text: "A pulton felejtette, amikor reggel berohant." }] }
  ],

  puzzles: {
    der: {
      type: "text", title: "Írás a dérben", reward: "der", answers: ["Béla"], placeholder: "Milyen nevet írt?",
      body: `<p>A jégkamra ajtajának kis üvegablakára Hollós belülről, az ujjával írt valamit a dérbe. Kívülről nézve a betűk fordítva látszanak:</p>
<div class="typed mirror">BÉLA</div>
<p>Milyen nevet írt fel a mester?</p>`,
      wrong: "Nem ezt írta. Olvasd el jobbról balra, mintha tükörben néznéd.",
      hints: [
        "Belülről írta, te pedig kívülről nézed. A betűk tükörképek.",
        "Olvasd jobbról balra. Egy keresztnév, négy betű.",
        "Egy férfinév, B-vel kezdődik."
      ]
    },
    retesz: {
      type: "choice", title: "A zöld folt", reward: "retesz", answer: "B",
      body: `<p>A jégkamra reteszének fogantyúján zöldes, ragacsos folt. Két Béla van a házban, és a pénztárosnő is megfordult a műhelyben. Hasonlítsd össze, mi van a ruhájukon.</p>`,
      options: [
        { v: "A", label: "Hollós Béla kabátujja", sample: "Csokoládéfolt és szivarhamu. Zöld nyomnak semmi jele." },
        { v: "B", label: "Szendrei Béla köténye", sample: "Liszt, tojássárgája és zöld pisztáciakrém. A krémet aznap este csak ő főzte." },
        { v: "C", label: "Kertész Anna kesztyűje", sample: "Lila tintafolt a mutatóujjon. Krémnek, lisztnek nyoma sincs." }
      ],
      confirm: "Ez egyezik",
      wrong: { A: "A csokoládé barna, nem zöld.", C: "A tinta lila, és nincs rajta liszt." },
      hints: [
        "A foltban két dolog van: zöld krém és liszt.",
        "Melyik krém zöld? Ki főzte aznap este?",
        "A pisztáciakrém zöld. Csak egy ember ruháján van belőle."
      ]
    },
    szef: {
      type: "code", title: "A páncélszekrény", reward: "szerzodes", answers: ["3927"], length: 4,
      body: `<p>A páncélszekrény négyjegyű számzárral nyílik. Az özvegy szerint a férje mindig azt mondta: „A kód a torta lelke.” Az íróasztalon ott a Hollós-torta receptje, a mester kézírásával:</p>
<div class="typed">HOLLÓS-TORTA
Tészta: 4 tojás, 15 dkg liszt, 12 dkg cukor
Krém, a torta lelke: 3 tojássárgája, 9 dkg vaj, 2 dl tejszín, 7 dkg pisztácia</div>`,
      wrong: "A zár nem enged. Csak a lelke kell, nem az egész torta.",
      hints: [
        "A recept két részből áll. Melyiket nevezi a mester a torta lelkének?",
        "A krém hozzávalóinak mennyiségei adják a kódot.",
        "Sorrendben: tojássárgája, vaj, tejszín, pisztácia."
      ]
    },
    tavozas: {
      type: "assign", title: "A jelenléti ív", reward: "tavozas", columnLabel: "Mikor ment el?",
      body: `<p>Gyuri bácsi jelenléti íve elázott, az időpontok elmosódtak. A tanúk és a szomszédok szavaiból állítsd össze, ki mikor hagyta el a cukrászdát. Mindenki más időpontban távozott, és egy ember egész éjjel bent maradt.</p>`,
      facts: [
        "Az éjjeliőr soha nem hagyja el a házat éjszaka.",
        "Az unokaöcs ment el elsőként, pontban kilenckor, amikor bezárt az üzlet.",
        "A pénztárosnő akkor zárta le a kasszát, amikor a Ferences templom órája fél tízet ütött, és rögtön utána távozott.",
        "Vilma asszony negyedórával a pénztárosnő után ment el.",
        "A szemközti trafikos szerint fél tízkor csak egyetlen nő lépett ki a cukrászda ajtaján, férfi nem."
      ],
      choices: ["21:00", "21:30", "21:45", "22:30", "Egész éjjel bent"],
      answer: { szendrei: "22:30", hollosbela: "21:00", anna: "21:30", vilma: "21:45", feher: "Egész éjjel bent" },
      hints: [
        "Kezdd az éjjeliőrrel és az unokaöccsel, róluk egyértelmű a tanúvallomás.",
        "A pénztárosnő 21:30-kor ment el, Vilma negyedórával később.",
        "Ami időpont maradt, az a főcukrászé. Akkor viszont hazudott."
      ]
    }
  },

  accusation: {
    questions: [
      { id: "who", legend: "Ki zárta be a mestert?", name: "a tettes", from: "suspects", answer: "szendrei" },
      { id: "how", legend: "Hogyan halt meg Hollós?", name: "a módszer", answer: "jeg",
        options: [{ v: "jeg", label: "Bezárták a jégkamrába a külső retesszel, és megfagyott" }, { v: "mereg", label: "Megmérgezték a pisztáciás tortával" }, { v: "utes", label: "Leütötték egy sodrófával" }] },
      { id: "why", legend: "Miért tette?", name: "az indíték", answer: "eladas",
        options: [{ v: "orokseg", label: "Hogy megörökölje a cukrászdát" }, { v: "eladas", label: "A titkos eladás és a tizenöt éve megszegett ígéret" }, { v: "kassza", label: "Hogy eltitkolja a kasszából kivett pénzt" }, { v: "adossag", label: "A kártyaadósság miatt" }] }
    ]
  },

  ending: {
    heading: "Szendrei Béla volt az.",
    paragraphs: [
      "Tizenöt éven át Hollós azt ígérte a főcukrászának, hogy egyszer társ lesz a cukrászdában. A Hollós-torta receptje is Szendreié volt, csak a mester neve került rá. Aznap este, amikor Szendrei bevitte a tortát az irodába, meglátta az asztalon a Lánchíd Rt. előszerződését: Hollós másnap eladja a boltot, a személyzetet pedig elbocsátják.",
      "Tízkor Hollós lement a jégkamrába megnézni a tortát. Szendrei, kezén még a pisztáciakrémmel, rátolta a reteszt. Fél tizenegykor elment, és azt mondta, már fél tízkor hazaindult. Gyuri bácsi addigra elaludt a pálinkától.",
      "A mester tudta, ki zárta rá az ajtót: a kis ablakon át látta. Az ujjával felírta a nevét a dérbe, de nem írta ki a vezetéknevet. A zöld krém a reteszen és a hazug időpont döntötte el, melyik Béla volt. Az unokaöcs adóssága, Anna kölcsöne és Vilma aláírása csak a cukrászda többi titka volt."
    ]
  }
});
