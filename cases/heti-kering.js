/* Heti rejtély 2. — Az utolsó keringő (két változat: más a tettes) */
(window.MM_CASES = window.MM_CASES || []).push({
  id: "heti-kering",
  weekly: "2026-10-19", weeklyLabel: "2. hét",
  fx: "snow", sound: "jazz", cover: "_generic",
  number: 102,
  title: "Az utolsó keringő",
  meta: "Budapest, Gellért szálló · 1934. december 31. · Heti rejtély",
  teaser: "Szilveszter éjjel, öt perccel éjfél előtt a híres táncmester összeesik a hóban, a terasz korlátjánál. A pezsgőjében méreg volt.",
  difficulty: "Könnyű",
  maxTries: 2,

  intro: {
    eyebrow: "Heti rejtély · rövid eset",
    heading: "Moldován Rudolf halála",
    lead: "Szilveszter éjjel, öt perccel éjfél előtt Moldován Rudolf, Pest leghíresebb táncmestere összeesett a Gellért szálló havas teraszán. Mire az orvos odaért, halott volt.",
    body: "A bálteremben háromszáz vendég, de a pohara közelében csak hárman jártak. Éjfélkor kezdődik az újév, addig kell megnevezned a tettest. Ha újrakezded, más lehet a történet.",
    start: "terasz"
  },

  suspects: [
    { id: "zsuzsa", look: { hair: "wave", clothes: "dress", acc: ["pearls"], lips: true }, name: "Vágó Zsuzsa", role: "Táncpartner, 25 éves. Öt éve táncol Moldovánnal.",
      stmt: "„Egész este a parketten táncoltam. A teraszra ki sem mentem, ilyen hidegben!”" },
    { id: "hegedus", look: { hair: "slick", clothes: "bowtie" }, name: "Hegedűs Ernő", role: "Zongorista, 40 éves. A szálló zenekarának vezetője.",
      stmt: "„Végig a zongoránál ültem, egyetlen ütemet sem hagytam ki. Kérdezze a zenekart.”" },
    { id: "tornai", look: { hair: "short", clothes: "suit", acc: ["mustache"] }, name: "Tornai Gusztáv", role: "A szálló igazgatója, 55 éves.",
      stmt: "„Én a bejáratnál fogadtam a késő vendégeket. Moldován úr a szálló dísze volt, miért ártottam volna neki?”" }
  ],

  words: {
    pezsgo: ["pezsgőspohár", "tárgy"], por: ["fehér por", "tárgy"], legyezo: ["tolllegyező", "tárgy"],
    terasz: ["terasz", "hely"], zongora_w: ["zongora", "hely"],
    t2350: ["23:50", "idő"], t2355: ["23:55", "idő"],
    vitte: ["kivitte neki a pezsgőt", "tett"], szorta: ["a pohárba szórta", "tett"],
    feltekenyseg: ["féltékenység", "indíték"], dal: ["ellopott dal", "indíték"]
  },

  clues: {
    holttest: { t: "A táncmester", src: "Terasz", x: "Moldován a hóban fekszik a {{terasz|terasz}} korlátjánál, ajka kékes. Az orvos szerint valaki {{a pohárba szórta|szorta}} a mérget, ami {{23:55|t2355}} körül hatott." }
  },

  locations: [
    { id: "terasz", name: "Terasz", desc: "Havas kőterasz a Duna fölött. Odabent a zenekar a záró keringőre készül.",
      look: "Havas kőterasz, alattunk a Duna és a kivilágított Lánchíd. [[Moldován a korlátnál fekszik a hóban|holttest]]. A korlát tövében [[egy elejtett tolllegyező|legyezo]]. A hóban [[konfetti és egy elgurult trombita|konfetti]], a korláton [[vastag zúzmara|korlat]].",
      decoys: { konfetti: "Valaki már ünnepelt. A hóban csak a vendégek tánccipőinek nyoma.", korlat: "Érintetlen zúzmara. Senki sem támaszkodott rá, mielőtt Moldován összeesett." },
      items: [
        { clue: "holttest", label: "A táncmester", text: "Letérdelsz mellé a hóba." },
        { clue: "legyezo", label: "A tolllegyező", text: "Felveszed a legyezőt." }] },
    { id: "tancterem", name: "Bálterem", desc: "Kristálycsillárok, háromszáz vendég, a zenekar hallgat. Mindenki a teraszajtót nézi.",
      look: "Kristálycsillárok, szerpentin, háromszáz vendég, aki most egyszerre hallgat. [[Moldován pezsgőspohara|pohar]]. A zongorán [[a kotta és egy levél|kotta]], a színpadon [[a dobos felszerelése|dob]].",
      decoys: { dob: "A dobos ma este végig a helyén ült, a zenekar szerint." },
      items: [
        { clue: "pohar", label: "A pezsgőspohár", text: "Megszagolod a pohár alját." },
        { clue: "kotta", label: "A zongorán", text: "Felemeled a kottát." }],
      puzzle: "alibi" }
  ],

  deductions: [],

  variants: [
    { id: "partner",
      clues: {
        pohar: { t: "A pohár", src: "Bálterem", x: "Moldován {{pezsgőspohara|pezsgo}} a teraszajtónál, az alján {{fehér por|por}}. A pincér szerint a záró keringő előtt Vágó Zsuzsa {{kivitte neki a pezsgőt|vitte}} a teraszra." },
        legyezo: { t: "A legyező", src: "Terasz", x: "Vágó Zsuzsa {{tolllegyezője|legyezo}} a korlát tövében. A bordái közé {{fehér por|por}} szóródott." },
        kotta: { t: "A levél a zongorán", src: "Bálterem", x: "Moldován levele egy bécsi táncosnőnek: „Januártól veled táncolok. Zsuzsának még nem szóltam.” Zsuzsa megtalálta. A {{féltékenység|feltekenyseg}} rossz tanácsadó." },
        idovonal: { t: "Ki hol volt 23:50-kor?", src: "Vallomások", x: "Hegedűs a zongoránál játszott, Tornai a bejáratnál fogadta a vendégeket. Vágó Zsuzsa a teraszon volt, Moldovánnal." }
      },
      contradictions: [
        { id: "c-zsuzsa", suspect: "zsuzsa", clue: ["legyezo", "idovonal", "pohar"], reveal: "Zsuzsa keze remeg: „Kimentem hozzá, igen. Csak beszélni akartam vele. Csak beszélni…”" },
        { id: "c-tornai", suspect: "tornai", clue: "kotta", lie: false, reveal: "Tornai sóhajt: „Tudtam a bécsi szerződésről. A szálló elvesztette volna a sztárját. De ezért nem ölnék.”" }
      ],
      deductions: [
        { id: "d-mereg", from: ["holttest", "pohar"], t: "A méreg útja", x: "A mérget a pezsgőbe szórták, és Moldován a záró keringő előtt itta meg.",
          text: "A mérget valaki {} ebbe: {}. 23:55 körül hatott.", b: ["szorta", "pezsgo"] },
        { id: "d-tettes", from: ["legyezo", "kotta"], t: "A féltékeny partner", x: "Zsuzsa tudta, hogy Moldován januártól mással táncol. A legyezőjén a méreg pora.",
          text: "{} legyezőjén {} van. Az indítéka: {}.", b: ["zsuzsa", "por", "feltekenyseg"] }
      ],
      puzzles: {
        alibi: { type: "assign", title: "A záró keringő előtt", reward: "idovonal", columnLabel: "Hol volt 23:50-kor?",
          body: "<p>Rakd össze a tanúk szavaiból, ki hol volt öt perccel a végzetes korty előtt.</p>",
          facts: ["Hárman voltak, három különböző helyen.", "A zenekar szerint a zongorista egyetlen ütemet sem hagyott ki.", "A portás szerint az igazgató 23:40 és éjfél között végig a bejáratnál állt.", "A teraszajtó üvegén át egy estélyi ruhás alakot láttak kint."],
          choices: ["Zongora", "Bejárat", "Terasz"], answer: { hegedus: "Zongora", tornai: "Bejárat", zsuzsa: "Terasz" },
          hints: ["Kezdd a zenekarral és a portással.", "Az estélyi ruhás alak csak egyvalaki lehetett a három közül."] }
      },
      accusation: { story: "A tettes: {}. A záró keringő előtt {}, és {} a mérget. A {} bordái közé por szóródott.\nIndíték: {}.",
        b: ["zsuzsa", "vitte", "szorta", "legyezo", "feltekenyseg"], who: [0] },
      fates: { hegedus: "Hegedűst elítélik. Zsuzsa januárban Bécsben táncol, egy új partnerrel.", tornai: "Tornait elítélik, a szálló új igazgatót kap. Zsuzsa minden szilveszterkor kimegy a teraszra." },
      ending: { heading: "Vágó Zsuzsa volt az.", paragraphs: [
        "Zsuzsa megtalálta Moldován levelét a bécsi táncosnőnek. Öt év után a partnere szó nélkül cserélte volna le.",
        "A záró keringő előtt pezsgőt vitt ki neki a teraszra, és a legyezője mögött a pohárba szórta a port. A legyezőt a korlátnál ejtette el, amikor Moldován összeesett."] } },
    { id: "zongorista",
      suspectsPatch: { hegedus: { stmt: "„Végig a zongoránál voltam, a zenekar a tanúm. Egy percre sem mentem el onnan.”" } },
      clues: {
        pohar: { t: "A pohár", src: "Bálterem", x: "Moldován {{pezsgőspohara|pezsgo}} a {{zongora|zongora_w}} tetején, az alján {{fehér por|por}}. A záró keringő előtt ott állt, amíg Moldován a parketten integetett a vendégeknek." },
        legyezo: { t: "A legyező", src: "Terasz", x: "Vágó Zsuzsa {{tolllegyezője|legyezo}} a korlát tövében. Zsuzsa sírva keresi: délután ejtette le, amikor a teraszon próbáltak. A bordái tiszták." },
        kotta: { t: "A kotta", src: "Bálterem", x: "A zongora fedele alatt a Hajnali keringő kottája. A szerző neve, Hegedűs Ernő, áthúzva, fölötte Moldováné. Egy {{ellopott dal|dal}}, amelyből Moldován meggazdagodott." },
        idovonal: { t: "Ki hol volt 23:50-kor?", src: "Vallomások", x: "Zsuzsa a parketten táncolt, Tornai a bejáratnál állt. Hegedűs szünetet tartott, a zenekar gramofonnal játszott, ő pedig egyedül állt a zongoránál." }
      },
      contradictions: [
        { id: "c-hegedus", suspect: "hegedus", clue: ["idovonal", "kotta"], reveal: "Hegedűs ujjai megfeszülnek: „Igen, szünetet tartottam. Hét percet. Tizenöt éve ezt a dalt játszom más neve alatt. Tizenöt éve.”" },
        { id: "c-zsuzsa", suspect: "zsuzsa", clue: "legyezo", reveal: "Zsuzsa elpirul: „Délután kint voltam vele, próbáltunk. Nem akartam, hogy azt higgyék… ma este nem mentem ki.”" }
      ],
      deductions: [
        { id: "d-mereg", from: ["holttest", "pohar"], t: "A méreg útja", x: "A mérget a pezsgőbe szórták, és Moldován a záró keringő előtt itta meg.",
          text: "A mérget valaki {} ebbe: {}. 23:55 körül hatott.", b: ["szorta", "pezsgo"] },
        { id: "d-tettes", from: ["kotta", "pohar"], t: "Az ellopott dal", x: "A Hajnali keringőt Hegedűs írta, Moldován ellopta. 23:50-kor a pohár mellett egyedül a zongorista állt.",
          text: "{} írta a dalt, de Moldován ellopta: {}. A pohár ott állt: {}.", b: ["hegedus", "dal", "zongora_w"] }
      ],
      puzzles: {
        alibi: { type: "assign", title: "A záró keringő előtt", reward: "idovonal", columnLabel: "Hol volt 23:50-kor?",
          body: "<p>Rakd össze a tanúk szavaiból, ki hol volt öt perccel a végzetes korty előtt.</p>",
          facts: ["Hárman voltak, három különböző helyen.", "Egy huszárhadnagy esküszik, hogy 23:45 és 23:55 között Zsuzsával táncolt.", "A portás szerint az igazgató 23:40 és éjfél között végig a bejáratnál állt.", "23:45-kor a zenekar gramofonra váltott, mert valaki szünetet tartott."],
          choices: ["Parkett", "Bejárat", "Zongora"], answer: { zsuzsa: "Parkett", tornai: "Bejárat", hegedus: "Zongora" },
          hints: ["Kezdd a hadnaggyal és a portással.", "Miért kellett gramofonra váltani?"] }
      },
      accusation: { story: "A tettes: {}. 23:50-kor, amikor a zenekar gramofonra váltott, a {} mellett állva {} a mérget Moldován poharába.\nIndíték: {}.",
        b: ["hegedus", "zongora_w", "szorta", "dal"], who: [0] },
      fates: { zsuzsa: "Zsuzsát elítélik. Hegedűs a következő szilveszteren is a Hajnali keringőt játssza, a saját neve alatt.", tornai: "Tornait elítélik. A zongorista nevét még abban az évben ráírják a kottára." },
      ending: { heading: "Hegedűs Ernő volt az.", paragraphs: [
        "A Hajnali keringőt Hegedűs írta tizenöt éve. Moldován a saját neve alatt adta ki, és meggazdagodott belőle.",
        "23:45-kor Hegedűs szünetet kért, a zenekar gramofonra váltott. Amíg Moldován a parketten integetett, ő a zongora tetején álló pohárba szórta a port."] } }
  ],

  fates: {},
  puzzles: {},
  accusation: { story: "", b: [], who: [0] },
  ending: { heading: "", paragraphs: [] },
  plan: { w: 10, h: 5, rooms: { tancterem: [0, 0, 7, 5], terasz: [7, 0, 3, 5] }, doors: [[7, 2, 7, 3]], note: "A bálterem és a havas terasz a Duna fölött." }
});
