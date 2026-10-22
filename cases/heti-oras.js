/* Heti rejtély 1. — Megállt idő (két változat: más a tettes) */
(window.MM_CASES = window.MM_CASES || []).push({
  id: "heti-oras",
  weekly: "2026-10-12", weeklyLabel: "1. hét",
  fx: "dust", sound: "clock", cover: "_generic",
  number: 101,
  title: "Megállt idő",
  meta: "Budapest, Király utca · 1933. január 14. · Heti rejtély",
  teaser: "Reggel holtan találják az órásmestert a műhelyében. A falon minden óra ugyanabban a percben állt meg. Három ember járt nála zárás után.",
  difficulty: "Könnyű",
  maxTries: 2,

  intro: {
    eyebrow: "Heti rejtély · rövid eset",
    heading: "Rácz Ödön órásmester halála",
    lead: "Reggel nyolckor az inas holtan találta Rácz Ödön órásmestert a Király utcai műhely padlóján. A falon minden óra ugyanabban a percben állt meg.",
    body: "Tegnap este, zárás után hárman jártak a boltban. Egyikük hazudik. Mire a rendőrorvos ideér, derítsd ki, ki volt. Vigyázz: ha újrakezded, más lehet a történet.",
    start: "muhely"
  },

  suspects: [
    { id: "kun", look: { hair: "short", clothes: "vest" }, name: "Kun Péter", role: "Inas, 19 éves. Három éve tanul a mesternél.",
      stmt: "„Hétkor bezártam a boltot, és hazamentem. A mester még dolgozott, egy zsebórát javított.”" },
    { id: "bardos", look: { hair: "slick", clothes: "suit", acc: ["monocle"] }, name: "Dr. Bárdos Leó", role: "Gyűjtő, 50 éves. A mester legjobb vevője.",
      stmt: "„Fél nyolckor jöttem a megrendelt Breguet-ért. A mester azt mondta, nincs kész, és nyolc előtt elmentem. Haragudtam, de nem ennyire.”" },
    { id: "szalai", look: { hair: "bun", clothes: "dress", acc: ["earrings"], lips: true }, name: "Szalai Erzsébet", role: "Kalaposnő, 38 éves. A szomszéd üzlet tulajdonosa.",
      stmt: "„Egész este a kalapszalonomban voltam. A falon át hallottam a mester óráit. Hét negyven körül elhallgattak mind. Ijesztő volt.”" }
  ],

  words: {
    nehezek: ["óranehezék", "tárgy"], breguet: ["Breguet zsebóra", "tárgy"], zalogcedula: ["zálogcédula", "tárgy"], orak_w: ["a faliórák", "tárgy"],
    muhely: ["műhely", "hely"], zaloghaz: ["zálogház", "hely"],
    t1940: ["19:40", "idő"], t1955: ["19:55", "idő"],
    megallitotta: ["megállította az órákat", "tett"], elzalogosit: ["zálogba adta", "tett"],
    tartozas: ["adósság", "indíték"], hamis: ["hamis szerkezet", "indíték"]
  },

  clues: {
    holttest: { t: "A mester", src: "Műhely", x: "A mester a munkapad mellett fekszik, a halántékán ütés nyoma. Mellette egy nehéz sárgaréz {{óranehezék|nehezek}}. Az orvos szerint este hét és nyolc között halt meg, itt, a {{műhelyben|muhely}}." },
    orak: { t: "A megállt órák", src: "Órásbolt", x: "Mind a tizenkét {{faliórát|orak_w}} kézzel {{állították meg|megallitotta}}, ugyanakkor: {{19:40|t1940}}-kor. Az ingákon friss ujjnyomok." }
  },

  locations: [
    { id: "muhely", name: "Műhely", desc: "Szűk hátsó szoba: munkapad, nagyító lámpa, százféle apró csavar. Itt találták meg a mestert.",
      look: "Szűk hátsó szoba, a munkapadon szétszedett zsebórák. [[A mester a munkapad mellett fekszik|holttest]]. A pad sarkán [[a javítási könyv, nyitva|konyv]], mellette [[egy kihűlt kávéscsésze|kave]]. Fölötte [[a nagyító lámpa|lampa]] még ég.",
      decoys: { kave: "Feketekávé, cukor nélkül. A mester mindig így itta, este hétkor.", lampa: "Égve hagyták. Aki elment, nem gondolt a villanyszámlára." },
      items: [
        { clue: "holttest", label: "A mester", text: "Letérdelsz mellé." },
        { clue: "konyv", label: "A javítási könyv", text: "Átlapozod az utolsó oldalakat." }] },
    { id: "bolt", name: "Órásbolt", desc: "Kirakat, pult, a falon tizenkét falióra. Mind ugyanabban a percben áll.",
      look: "A falon [[tizenkét falióra, mind áll|orak]]. A kirakatban [[aranyórák bársonyon|kirakat]], a pulton [[a pénztárgép|kassza]]. Az ajtó mellett [[a fogason egy ottfelejtett kabát|kabat]].",
      decoys: { kirakat: "Egy sem hiányzik. Aki ölt, nem a kirakatot akarta.", kassza: "A napi bevétel benne van. Rablásnak nem tűnik." },
      items: [
        { clue: "orak", label: "A faliórák", text: "Megnézed az ingákat." },
        { clue: "kabat", label: "A fogason hagyott kabát", text: "Átnézed a zsebeit." }],
      puzzle: "alibi" }
  ],

  deductions: [
    { id: "d-ido", from: ["holttest", "orak"], t: "A halál perce", x: "A mestert 19:40-kor ölték meg; a gyilkos ugyanekkor állította meg az órákat.",
      text: "A mester ekkor halt meg: {}. A gyilkos utána {}, hogy összezavarja az időt.", b: ["t1940", "megallitotta"] }
  ],

  variants: [
    { id: "inas",
      clues: {
        kabat: { t: "Kun Péter kabátja", src: "Órásbolt", x: "A fogason Kun Péter kabátja: az ujján sárgaréz por, a zsebében egy {{zálogcédula|zalogcedula}}. Egy {{Breguet zsebóra|breguet}}, tegnap {{19:55|t1955}}-kor {{adták zálogba|elzalogosit}} a sarki {{zálogházban|zaloghaz}}." },
        konyv: { t: "A javítási könyv", src: "Műhely", x: "Utolsó sor: „Breguet zsebóra, Dr. Bárdos L. — kész, átadás jan. 13-án este.” Alatta a mester kézírása: „Péter megint előleget kért. Nem adtam. Tele van {{adóssággal|tartozas}}.”" },
        idovonal: { t: "Ki hol volt 19:40-kor?", src: "Vallomások", x: "Szalai Erzsébet a kalapszalonjában, Bárdos már a 6-os villamoson. Kun Péterről senki sem tudja, hol volt." }
      },
      contradictions: [
        { id: "c-kun", suspect: "kun", clue: ["kabat", "idovonal"], reveal: "Kun elsápad: „Jó, nem mentem haza. Visszajöttem a fizetésemért… a mester már a földön feküdt! Az órát csak… felvettem.”" },
        { id: "c-bardos", suspect: "bardos", clue: "konyv", lie: false, reveal: "Bárdos bólint: „A könyv szerint kész volt az órám, igen. De a mester azt mondta, az inas elvitte fényezni. Ezért mentem el dühösen.”" }
      ],
      deductions: [
        { id: "d-ido", from: ["holttest", "orak"], t: "A halál perce", x: "A mestert 19:40-kor ölték meg; a gyilkos ugyanekkor állította meg az órákat.",
          text: "A mester ekkor halt meg: {}. A gyilkos utána {}, hogy összezavarja az időt.", b: ["t1940", "megallitotta"] },
        { id: "d-tettes", from: ["kabat", "konyv"], t: "Az eltűnt Breguet", x: "Kun Péter adósságai miatt elvitte a Breguet-t, és negyedórával a gyilkosság után már zálogba is adta.",
          text: "{} {} miatt elvitte ezt: {}, és {}-kor már {}.", b: ["kun", "tartozas", "breguet", "t1955", "elzalogosit"] }
      ],
      puzzles: {
        alibi: { type: "assign", title: "A vallomások", reward: "idovonal", columnLabel: "Hol volt 19:40-kor?",
          body: "<p>Rakd össze a tanúk szavaiból, ki hol volt, amikor az órák megálltak.</p>",
          facts: ["Hárman voltak, három különböző helyen.", "A villamoskalauz szerint Bárdos 19:35-kor szállt fel a 6-osra a ház előtt.", "Szalai Erzsébet falán át a kalaposinas végig hallotta őt énekelni.", "A harmadik helyen senki sem látta azt, aki ott volt."],
          choices: ["Kalapszalon", "Villamos", "Műhely"], answer: { szalai: "Kalapszalon", bardos: "Villamos", kun: "Műhely" },
          hints: ["Kezdd azzal, akit tanú látott felszállni.", "Ha kettő megvan, a harmadiknak egy hely marad."] }
      },
      accusation: { story: "A tettes: {}. 19:40-kor egy {} ütötte le a mestert, aztán {}. Elvitte ezt: {}, és {}-kor a zálogházban pénzzé tette.\nIndíték: {}.",
        b: ["kun", "nehezek", "megallitotta", "breguet", "t1955", "tartozas"], who: [0] },
      fates: { bardos: "Bárdost elítélik. Az inas a zálogpénzből elutazik Bécsbe, és soha többé nem javít órát.", szalai: "Szalai Erzsébetet elítélik. A kalapszalon bezár, a falon túl örökre csend lesz." },
      ending: { heading: "Kun Péter volt az.", paragraphs: [
        "Az inasnak tartozásai voltak, és a mester nem adott több előleget. Este visszament a boltba, és meglátta a kész Breguet-t a pulton. Amikor a mester rajtakapta, lecsapott az óranehezékkel.",
        "Utána egyenként megállította az órákat, hogy a halál idejét összezavarja, és negyedórával később a sarki zálogházban pénzzé tette a zsebórát. A kabátját a sietségben a fogason felejtette, benne a zálogcédulával."] } },
    { id: "gyujto",
      clues: {
        kabat: { t: "Bárdos felöltője", src: "Órásbolt", x: "A fogason Dr. Bárdos Leó felöltője: elfelejtette, amikor sietve távozott. A zsebében egy {{Breguet zsebóra|breguet}}, a fedele alatt egy friss karcolás: valaki kifeszítette, és a {{hamis szerkezet|hamis}} kilátszik." },
        konyv: { t: "A javítási könyv", src: "Műhely", x: "Utolsó sor: „Breguet zsebóra, Dr. Bárdos L. — a szerkezet nem eredeti! Tavaly ő adta el nekem eredetiként, ezer pengőért. Holnap feljelentem.”" },
        idovonal: { t: "Ki hol volt 19:40-kor?", src: "Vallomások", x: "Szalai Erzsébet a kalapszalonjában, Kun Péter a sarki kocsmában. Bárdos 19:40-kor még a boltban volt." }
      },
      contradictions: [
        { id: "c-bardos", suspect: "bardos", clue: ["kabat", "idovonal"], reveal: "Bárdos összerezzen: „Az a felöltő… igen, az enyém. Nem nyolc előtt mentem el. Később. De amikor kiléptem, a mester még…” Elhallgat." },
        { id: "c-kun", suspect: "kun", clue: "idovonal", reveal: "Kun lesüti a szemét: „Jó, nem mentem haza, a kocsmában ültem. Nem akartam, hogy a mester megtudja.”" }
      ],
      deductions: [
        { id: "d-ido", from: ["holttest", "orak"], t: "A halál perce", x: "A mestert 19:40-kor ölték meg; a gyilkos ugyanekkor állította meg az órákat.",
          text: "A mester ekkor halt meg: {}. A gyilkos utána {}, hogy összezavarja az időt.", b: ["t1940", "megallitotta"] },
        { id: "d-tettes", from: ["kabat", "konyv"], t: "A hamis Breguet", x: "Bárdos tavaly hamis szerkezetű Breguet-t adott el a mesternek. A mester rájött, és fel akarta jelenteni.",
          text: "{} tavaly egy {} adott el a mesternek, benne ezzel: {}. A mester másnap fel akarta jelenteni.", b: ["bardos", "breguet", "hamis"] }
      ],
      puzzles: {
        alibi: { type: "assign", title: "A vallomások", reward: "idovonal", columnLabel: "Hol volt 19:40-kor?",
          body: "<p>Rakd össze a tanúk szavaiból, ki hol volt, amikor az órák megálltak.</p>",
          facts: ["Hárman voltak, három különböző helyen.", "A sarki kocsmáros szerint az inas hét után végig nála ült, és nyolckor ment haza.", "Szalai Erzsébet falán át a kalaposinas végig hallotta őt énekelni.", "A villamoskalauz szerint egy úr csak 19:50-kor szállt fel a 6-osra, kabát nélkül, pedig fagyott."],
          choices: ["Kalapszalon", "Kocsma", "Műhely"], answer: { szalai: "Kalapszalon", kun: "Kocsma", bardos: "Műhely" },
          hints: ["Kezdd azzal, akit a kocsmáros látott.", "Aki kabát nélkül szállt fel a villamosra, az addig valahol bent volt."] }
      },
      accusation: { story: "A tettes: {}. 19:40-kor egy {} ütötte le a mestert, aztán {}. A mester rájött, hogy a tőle vett {} szerkezete: {}. Sietségében a fogason hagyta a felöltőjét.",
        b: ["bardos", "nehezek", "megallitotta", "breguet", "hamis"], who: [0] },
      fates: { kun: "Az inast elítélik. Bárdos még évekig árul hamis órákat a pesti gyűjtőknek.", szalai: "Szalai Erzsébetet elítélik. Bárdos a temetésen a koszorút is ő fizeti." },
      ending: { heading: "Dr. Bárdos Leó volt az.", paragraphs: [
        "Bárdos tavaly hamis szerkezetű Breguet-t adott el a mesternek, eredetiként. Este, amikor átvette a javított órát, a mester közölte vele, hogy másnap feljelenti.",
        "Bárdos lecsapott az óranehezékkel, megállította az órákat, hogy úgy tűnjön, korábban történt, aztán pánikban elrohant. A felöltője, benne a hamis órával, a fogason maradt."] } }
  ],

  fates: {},
  puzzles: {},
  accusation: { story: "", b: [], who: [0] },
  ending: { heading: "", paragraphs: [] },
  plan: { w: 10, h: 5, rooms: { bolt: [0, 0, 6, 5], muhely: [6, 0, 4, 5] }, doors: [[6, 2, 6, 3]], note: "Elöl a bolt, hátul a műhely." }
});
