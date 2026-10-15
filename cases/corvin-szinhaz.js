/* 5. ügy — Utolsó felvonás (közepes) */
(window.MM_CASES = window.MM_CASES || []).push({
  id: "corvin-szinhaz",
  fx: "dust",
  sound: "theatre",
  sounds: { zsinorpadlas: "loft", kellektar: "loft" },
  cover: "generic",
  number: 5,
  title: "Utolsó felvonás",
  meta: "Budapest, Corvin Színház · 1937. november 20. · Ügyszám 1937/915",
  teaser: "A záró kettős közben egy homokzsák zuhan le a zsinórpadlásról, és agyonüti a társulat sztárját. Az igazgató balesetről beszél. De amikor a kötél elszakadt, mindenki alibije tökéletes volt. Túl tökéletes.",
  difficulty: "Közepes",

  intro: {
    eyebrow: "Budapesti Államrendőrség · Bűnügyi osztály",
    heading: "Sárközy Iván halála a színpadon",
    lead: "1937. november 20-án este 22:41-kor, A bécsi csalogány záró kettőse alatt egy húszkilós homokzsák zuhant le a zsinórpadlásról. Sárközy Iván, a Corvin Színház ünnepelt bonvivánja azonnal meghalt. Partnere, Rácz Mimi egy lépéssel arrébb állt, és megúszta.",
    body: "Az igazgató szerint elkopott a kötél. A zsinórpadlásmester esküszik, hogy délután még ép volt. A végzetes pillanatban mindenki látható helyen volt: a színpadon, a súgólyukban, a nézőtéren. Pont ez a gyanús.",
    start: "szinpad"
  },

  suspects: [
    { id: "mimi", look: { hair: "wave", clothes: "dress", acc: ["earrings", "pearls"], lips: true }, name: "Rácz Mimi", role: "Primadonna, 28 éves. Sárközy színpadi partnere, és a pletykák szerint több is annál.",
      stmt: "„Ott álltam mellette! Ha egy lépéssel balrább vagyok, engem is elvisz. A szünetben az öltözőmben pihentem, mint mindig.”" },
    { id: "kalman", look: { hair: "bald", clothes: "suit", acc: ["glasses", "mustache"] }, name: "Kálmán Ödön", role: "A színház igazgatója és rendezője, 55 éves.",
      stmt: "„Szörnyű baleset. Délután még átrendeztem a záró jelenetet, hogy Iván a hetes jelzéshez álljon, ott szebb a fény. Istenem, ha tudtam volna…”" },
    { id: "vass", look: { hair: "short", hat: "cap", clothes: "uniform", acc: ["mustache"] }, name: "Vass Tibor", role: "Zsinórpadlásmester, 48 éves. Huszonkét éve felel a díszletekért és a kötelekért.",
      stmt: "„Az én köteleim nem szakadnak el maguktól. Délután mindet végignéztem. A második felvonás alatt fent voltam, de a hetes zsákhoz senki sem nyúlt.”" },
    { id: "klara", look: { hair: "bun", clothes: "blouse", acc: ["glasses"], lips: true }, name: "Lengyel Klára", role: "Súgónő, 60 éves. Harminc éve ül a súgólyukban.",
      stmt: "„Én mindent látok, fiam. Onnan lentről az ember a színészek arcát látja, nem a hátukat. Kérdezze csak, amit tud.”" },
    { id: "bodo", look: { hair: "slick", clothes: "bowtie" }, name: "Bodó Ferenc", role: "Sárközy beugrója, 30 éves. Évek óta a második szereposztásban énekel.",
      stmt: "„Tudom, mit gondolnak. Most én kapom a szerepet. De a szünetben skáláztam az öltözőmben, az egész folyosó hallotta.”" }
  ],

  clues: {
    holttest: { t: "A színpadon", src: "Színpad", x: "Sárközy a hetes jelzésnél fekszik, mellette a szétrepedt homokzsák. A zsákot tartó kötél vége fentről lóg le. Rácz Mimi a jelzéstől egy lépésre balra állt, amikor a zsák lezuhant." },
    kotel: { t: "Az elégett kötél", src: "Zsinórpadlás", x: "A kötelet nem elvágták, és nem is kopott el: átégett. A vége megpörkölődött, alatta viaszcseppek, és a korláthoz drótozva egy templomi gyertya csonkja. Valaki előre felrakta, hogy a kötél magától szakadjon el." },
    gyertya: { t: "Mikor gyújtották meg a gyertyát?", src: "Kellektár", x: "A gyertyát 20:41-kor gyújtották meg. Az első szünet 20:35-től 20:55-ig tartott." },
    szunet: { t: "Ki hol volt az első szünetben?", src: "Büfé · tanúvallomások", x: "Az első szünetben Vass Tibor a büfében, Kálmán igazgató az irodájában, Lengyel Klára a súgólyukban, Bodó Ferenc a saját öltözőjében volt. Rácz Mimi öltözője zárva volt, a kulcsa a portán lógott. Egyetlen hely marad neki: a zsinórpadlás." },
    felnezett: { t: "Mimi tudta, mi következik", src: "Igazgatói iroda · vallomás", x: "A súgónő szerint Mimi a zuhanás előtt felnézett a zsinórpadlásra, és balra ugrott. Mimi a jegyzőkönyvben azt állította, fel sem nézett." },
    sugo: { t: "A súgónő megfigyelése", src: "Súgólyuk", x: "Lengyel Klára: „A kettős utolsó strófájánál Mimi felnézett, egyenesen a zsinórpadlásra, aztán szinte ugrott egyet balra. Harminc éve súgok, ilyet még nem láttam tőle.”" },
    level: { t: "Sárközy levele", src: "Öltözősor · Mimi öltözője", x: "Mimi sminkasztalán Sárközy levele: „Ne haragudj, Mimi. Holnap bejelentem az eljegyzésemet Kálmán Lizával. Ami köztünk volt, vége. Te is tudtad, hogy egyszer vége lesz.”" },
    bodo: { t: "A beugró szerződése", src: "Öltözősor · Bodó öltözője", x: "Bodó Ferenc szerződése: ha Sárközy bármi okból kiesik, ő énekli a bécsi turnét. A szomszéd kórista szerint a szünetben végig skálázást hallott Bodó öltözőjéből." },
    vass: { t: "A váltó", src: "Büfé", x: "Vass Tibor zsebében egy ezer pengőről szóló váltó, Sárközy aláírásával." },
    pletyka: { t: "A pletykarovat kézirata", src: "Súgólyuk", x: "A súgólyukban kézirat: a Színházi Élet következő heti pletykarovata. „Igaz-e, hogy a Corvin bonvivánja a direktor lányát veszi el, és egy primadonnának hamarosan fáj majd a feje?”" },
    kalman: { t: "Sárközy követelése", src: "Igazgatói iroda", x: "Sárközy levele az igazgatónak: dupla gázsit követel, különben januártól Bécsben énekel." }
  },

  contradictions: [
    {"id": "c-mimi", "suspect": "mimi", "clue": ["szunet"], "reveal": "Mimi felcsattan: „Jó, nem az öltözőben voltam! Csak… friss levegőt akartam.” Hogy hol, azt nem mondja meg."},
    {"id": "c-mimi2", "suspect": "mimi", "clue": ["felnezett", "sugo"], "reveal": "Mimi elsápad: „Bárki felnéz, ha recseg valami!” De a robaj csak utána jött."},
    {"id": "c-kalman", "suspect": "kalman", "clue": ["level"], "reveal": "Kálmán leül: „A lányom… Igen, tudtam az eljegyzésről. És a hetes jelzést nem én találtam ki. Mimi kérte délután, hogy Iván ott álljon, mert ott szebb a fény.”"},
    {"id": "c-kalman2", "suspect": "kalman", "clue": ["kalman"], "lie": false, "reveal": "„Igen, többet akart. Mindig többet akart. De a szünetben a könyvelővel számoltam a bevételt, kérdezze meg.”"},
    {"id": "c-vass", "suspect": "vass", "clue": ["vass"], "lie": false, "reveal": "Vass vállat von: „Tartoztam neki, igen. De a szünetet a büfében töltöttem, három fröccsöt ittam. A büfés megmondja.”"},
    {"id": "c-klara", "suspect": "klara", "clue": ["pletyka"], "lie": false, "reveal": "Klára elmosolyodik: „Igen, én írom. Ezért tudom, hogy Iván mást akart elvenni. És hogy kinek fáj majd a feje miatta.”"},
    {"id": "c-bodo", "suspect": "bodo", "clue": ["bodo"], "lie": false, "reveal": "Bodó elvörösödik: „Igen, most én kapom a turnét. De élőben skáláztam, a kórista hallotta, nem gramofon volt.”"}
  ],

  locations: [
    { id: "szinpad", name: "Színpad", desc: "Bécsi bálterem díszlete, félig leeresztett függöny. A reflektor még mindig a hetes jelzésre világít.",
      items: [{ clue: "holttest", label: "A hetes jelzés", text: "Sárközy a krétával jelölt hetes számon fekszik." }] },
    { id: "zsinorpadlas", name: "Zsinórpadlás", desc: "Keskeny vasjárdák a színpad fölött, kötelek, csigák, homokzsákok sora. Szédítő mélység.",
      puzzle: "kotel" },
    { id: "kellektar", name: "Kellektár", desc: "Gyertyatartók, kardok, papírmasé gyümölcsök, egy doboz templomi gyertya.",
      requires: "kotel", puzzle: "gyertya" },
    { id: "bufe", name: "Büfé", desc: "Vörös plüss, pezsgőspoharak, a falon a szünetek rendje. A büfés még a pultnál áll.",
      items: [{ clue: "vass", label: "Vass Tibor kabátja", text: "A fogason lóg, a zsebéből papír kandikál ki." }],
      puzzle: "szunet" },
    { id: "sugolyuk", name: "Súgólyuk", desc: "Szűk kis odú a színpad elején, egy lámpa, egy szék és a súgópéldány.",
      items: [
        { clue: "sugo", label: "Lengyel Klára", text: "A súgónő szívesen beszél, csak kérdezni kell." },
        { clue: "pletyka", label: "A súgópéldány alatt", text: "Egy gépelt kézirat, a margón javítások." }] },
    { id: "oltozok", name: "Öltözősor", desc: "Hosszú folyosó, ajtókon névtáblák, bent tükrök körbe izzókkal.",
      items: [
        { clue: "level", label: "Rácz Mimi sminkasztala", text: "Púder, rúzs és egy összegyűrt levél." },
        { clue: "bodo", label: "Bodó Ferenc öltözője", text: "Kottahalom, egy aláírt szerződés." }] },
    { id: "iroda", name: "Igazgatói iroda", desc: "Plakátok a falon, telefon, a rendőrség itt veszi fel a vallomásokat.",
      items: [{ clue: "kalman", label: "Az igazgató asztala", text: "Levelek, számlák, egy dühösen aláhúzott levél." }],
      puzzle: "vallomas" }
  ],

  puzzles: {
    kotel: {
      type: "choice", title: "A kötél vége", reward: "kotel", answer: "C",
      body: `<p>A hetes homokzsák kötelének vége ott lóg a korlátnál. Az igazgató szerint elkopott, a zsinórpadlásmester szerint valaki elvágta. Nézd meg alaposan, és válassz.</p>`,
      options: [
        { v: "A", label: "Elkopott", sample: "A kopott kötél szálai hosszan, egyenetlenül foszlanak szét. Itt viszont a szálak vége egyforma hosszú." },
        { v: "B", label: "Elvágták", sample: "A vágott kötél vége éles és tiszta. Itt viszont a szálak vége fekete és megkeményedett." },
        { v: "C", label: "Átégették", sample: "A szálak vége megpörkölődött, alatta viaszcseppek a vasjárdán. A korláthoz drótozva egy gyertyacsonk." }
      ],
      confirm: "Így szakadt el",
      wrong: { A: "A kopott kötél szálai egyenetlenek. Ezek egyformák és feketék.", B: "A vágás tiszta nyomot hagy. Ez a vég megpörkölődött." },
      hints: [
        "Számold ki, óránként hány centit ég a gyertya, és mennyi égett le belőle.",
        "12 centi három óra alatt: 4 centi óránként. 8 centi égett le, az két óra. Vond le a 22:41-ből."
      ]
    },
    gyertya: {
      type: "code", title: "A gyertya ideje", reward: "gyertya", answers: ["2041"], length: 4,
      body: `<p>A kellektárban egy doboz templomi gyertya: hat darab, mind pontosan 12 centi hosszú. A hetedik hiányzik. A zsinórpadláson talált csonk 4 centi magas, a kötél épp ennél a magasságnál volt átvetve a lángon.</p>
<p>A doboz címkéje szerint egy ilyen gyertya három óra alatt ég le teljesen. A kötél 22:41-kor szakadt el.</p>
<p>Mikor gyújtották meg a gyertyát? Írd be óra és perc szerint, négy számjeggyel.</p>`,
      wrong: "Ekkor még nem gyújthatták meg. Számold újra, mennyi égett le.",
      hints: [
        "A 12 centis gyertyából 4 centi maradt. Mennyi égett le, és az hány óra?",
        "8 centi, óránként 4 centi: két óra. Vond le a 22:41-ből."
      ]
    },
    szunet: {
      type: "assign", title: "Az első szünet", reward: "szunet", columnLabel: "Hol volt 20:35 és 20:55 között?",
      body: `<p>A gyertyát az első szünetben gyújtották meg. Ki hol volt ekkor? A büfés, a könyvelő és a kórusból többen is vallottak. Mindenki más helyen volt.</p>`,
      facts: [
        "A büfés szerint Vass Tibor a szünet egészét nála töltötte, és három fröccsöt ivott.",
        "Kálmán igazgató a könyvelővel a szünetben a bevételt számolta az irodájában.",
        "Lengyel Klára sosem hagyja el a súgólyukat, még a szünetben sem: a térde miatt nem tud lemászni a létrán.",
        "Bodó Ferenc öltözőjéből a szünet alatt végig skálázás hallatszott, és a szomszéd kórista szerint ez élő hang volt.",
        "Rácz Mimi azt mondja, az öltözőjében pihent. Az öltözője kulcsa azonban a szünet alatt végig a portán lógott, az ajtó zárva volt."
      ],
      choices: ["Büfé", "Igazgatói iroda", "Súgólyuk", "Saját öltöző", "Zsinórpadlás"],
      answer: { mimi: "Zsinórpadlás", kalman: "Igazgatói iroda", vass: "Büfé", klara: "Súgólyuk", bodo: "Saját öltöző" },
      hints: [
        "Négy embernek van tanúja. Kezdd velük.",
        "Ha Mimi öltözője zárva volt, és a kulcs a portán lógott, hol lehetett?"
      ]
    },
    vallomas: {
      type: "spot", title: "Mimi vallomása", reward: "felnezett", answer: 4,
      body: `<p>A rendőrség jegyzőkönyvbe vette Rácz Mimi vallomását a végzetes pillanatról. Egy kiemelt mondatrésze nem igaz. Vesd össze azzal, amit a színházban hallottál, és kattints a hazugságra.</p>`,
      statement: "Iván és én a kettős utolsó strófáját énekeltük. [[Ő a hetes jelzésnél állt]], [[ahogy délután próbáltuk]]. Én [[a rendezés szerint]] [[balra léptem egyet]], mert ott jön a meghajlás. [[Fel sem néztem a zsinórpadlásra]], hiszen [[a reflektor ilyenkor elvakít]]. [[Csak egy nagy robajt hallottam]], és Iván már feküdt.",
      wrong: {
        0: "Ez igaz: a holttest a hetes jelzésnél feküdt.",
        1: "Ez igaz: az igazgató délután így rendezte át a jelenetet.",
        2: "A rendező valóban balra küldte a meghajláshoz.",
        3: "Igaz, egy lépéssel balra állt, ezért élte túl.",
        5: "A reflektor tényleg vakít, ezzel nincs gond.",
        6: "Ez is igaz: a robajt mindenki hallotta."
      },
      hints: [
        "A súgólyukból valaki a színészek arcát látja, nem a hátukat. Mit mondott Lengyel Klára?",
        "Klára látta, merre nézett Mimi a zuhanás előtt."
      ]
    }
  },

  accusation: {
    questions: [
      { id: "who", legend: "Ki ölte meg Sárközy Ivánt?", name: "a tettes", from: "suspects", answer: "mimi", proof: ["szunet", "felnezett", "sugo"] },
      { id: "how", legend: "Hogyan szakadt el a kötél?", name: "a módszer", answer: "gyertya", proof: ["kotel", "gyertya"],
        options: [{ v: "vagas", label: "Elvágták a záró kettős alatt" }, { v: "gyertya", label: "Gyertyát drótoztak alá az első szünetben, és átégette a kötelet" }, { v: "kopas", label: "Elkopott, és magától szakadt el" }] },
      { id: "why", legend: "Miért tette?", name: "az indíték", answer: "feltekenyseg", proof: ["level"],
        options: [{ v: "feltekenyseg", label: "Sárközy másnap mást akart eljegyezni" }, { v: "turne", label: "Hogy megkapja a bécsi turnét" }, { v: "adossag", label: "Hogy ne kelljen visszafizetni a tartozást" }, { v: "gazsi", label: "A dupla gázsi követelése miatt" }] }
    ]
  },

  ending: {
    heading: "Rácz Mimi volt az.",
    paragraphs: [
      "Mimi évekig hitte, hogy Sárközy egyszer elveszi feleségül. Aznap délután megtudta, hogy másnap az igazgató lányával jelenti be az eljegyzését. A próbán ő kérte meg Kálmánt, hogy Iván a hetes jelzéshez álljon, mert ott szebb a fény. Az igazgató szívesen teljesítette.",
      "Az első szünetben, amíg mindenki a büfében vagy az öltözőjében volt, Mimi felment a zsinórpadlásra. A hetes zsák kötele alá egy templomi gyertyát drótozott, és 20:41-kor meggyújtotta. Két óra múlva, a záró kettős közben a láng átégette a kötelet. Mimi addigra lent állt a színpadon, a közönség szeme láttára, tökéletes alibivel.",
      "Csakhogy tudnia kellett, mikor lép el. A súgólyukból Lengyel Klára látta, hogy a zuhanás előtt felnéz, aztán balra ugrik. A gyertya ideje, a zárt öltöző és a felnézés elárulta. Vass adóssága, Bodó szerződése és az igazgató gázsivitája csak a színház többi titka volt."
    ]
  }
});
