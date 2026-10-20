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

    words: {
    sarkozy: ["Sárközy Iván", "személy"], liza: ["Kálmán Liza", "személy"],
    gyertya: ["templomi gyertya", "tárgy"], kotel: ["kötél", "tárgy"], homokzsak: ["homokzsák", "tárgy"], reflektor: ["reflektor", "tárgy"], gramofon: ["gramofon", "tárgy"],
    zsinorpadlas: ["zsinórpadlás", "hely"], hetes: ["hetes jelzés", "hely"], oltozo: ["Mimi öltözője", "hely"], bufe: ["büfé", "hely"], sugolyuk: ["súgólyuk", "hely"],
    t2041: ["20:41", "idő"], szunet: ["az első szünet", "idő"], t2241: ["22:41", "idő"], kettos: ["a záró kettős", "idő"],
    felnezett: ["felnézett", "tett"], balra: ["balra ugrott", "tett"], skalazott: ["skálázott", "tett"], frocs: ["fröccsöt ivott", "tett"],
    eljegyzes: ["az eljegyzés", "indíték"], turne: ["a bécsi turné", "indíték"], tartozas: ["tartozás", "indíték"], gazsi: ["a dupla gázsi", "indíték"]
  },

  clues: {
    holttest: { t: "A színpadon", src: "Színpad", x: "{{Sárközy|sarkozy}} a {{hetes jelzésnél|hetes}} fekszik, mellette a szétrepedt {{homokzsák|homokzsak}}. A zsákot tartó {{kötél|kotel}} vége fentről lóg le. A zsák {{22:41|t2241}}-kor zuhant le. Rácz Mimi a jelzéstől egy lépésre balra állt." },
    kotel: { t: "Az elégett kötél", src: "Zsinórpadlás", x: "A kötelet nem elvágták, és nem is kopott el: átégett. A vége megpörkölődött, alatta viaszcseppek, és a korláthoz drótozva egy {{templomi gyertya|gyertya}} csonkja." },
    gyertya: { t: "Mikor gyújtották meg a gyertyát?", src: "Kellektár", x: "A gyertyát {{20:41|t2041}}-kor gyújtották meg. {{Az első szünet|szunet}} 20:35-től 20:55-ig tartott." },
    szunet: { t: "Ki hol volt az első szünetben?", src: "Büfé · tanúvallomások", x: "A vallomásokból összerakva, az első szünetben: Vass Tibor a {{büfében|bufe}}, Kálmán igazgató az irodájában, Lengyel Klára a {{súgólyukban|sugolyuk}}, Bodó Ferenc a saját öltözőjében, Rácz Mimi (zárt öltözővel, kulcsa a portán) a {{zsinórpadláson|zsinorpadlas}}." },
    felnezett: { t: "Ellentmondás Mimi vallomásában", src: "Igazgatói iroda · vallomás", x: "Mimi a jegyzőkönyvben azt állította, fel sem nézett a zsinórpadlásra. A súgónő szerint a zuhanás előtt {{felnézett|felnezett}}, és {{balra ugrott|balra}}." },
    sugo: { t: "A súgónő megfigyelése", src: "Súgólyuk", x: "Lengyel Klára: „A {{kettős utolsó strófájánál|kettos}} Mimi felnézett, egyenesen a zsinórpadlásra, aztán szinte ugrott egyet balra. Harminc éve súgok, ilyet még nem láttam tőle.”" },
    level: { t: "Sárközy levele", src: "Öltözősor · Mimi öltözője", x: "Mimi sminkasztalán Sárközy levele: „Ne haragudj, Mimi. Holnap bejelentem az {{eljegyzésemet|eljegyzes}} {{Kálmán Lizával|liza}}. Ami köztünk volt, vége. Te is tudtad, hogy egyszer vége lesz.”" },
    bodo: { t: "A beugró szerződése", src: "Öltözősor · Bodó öltözője", x: "Bodó Ferenc szerződése: ha Sárközy bármi okból kiesik, ő énekli a {{bécsi turnét|turne}}. A szomszéd kórista szerint a szünetben végig {{skálázást|skalazott}} hallott Bodó öltözőjéből." },
    vass: { t: "A váltó", src: "Büfé", x: "Vass Tibor zsebében egy ezer pengőről szóló váltó, Sárközy aláírásával. Vass régi {{tartozása|tartozas}}." },
    pletyka: { t: "A pletykarovat kézirata", src: "Súgólyuk", x: "A súgólyukban kézirat: a Színházi Élet következő heti pletykarovata. „Igaz-e, hogy a Corvin bonvivánja a direktor lányát veszi el, és egy primadonnának hamarosan fáj majd a feje?”" },
    kalman: { t: "Sárközy követelése", src: "Igazgatói iroda", x: "Sárközy levele az igazgatónak: {{dupla gázsit|gazsi}} követel, különben januártól Bécsben énekel." },
    hetes: { t: "Ki kérte a hetes jelzést?", src: "Kálmán vallomása", x: "Kálmán szerint délután Mimi kérte, hogy Iván a záró jelenetben a hetes jelzéshez álljon, mert ott szebb a fény. A hetes jelzés fölött a hetes homokzsák lóg." },
    kulcs: { t: "A kulcsnapló", src: "Művészbejáró", x: "A porta kulcsnaplója szerint Rácz Mimi 20:33-kor leadta az öltözője kulcsát, és csak 20:54-kor vette fel újra. Az egész első szünetben nem volt az öltözőjében." }
  },
contradictions: [
    {"id": "c-mimi", "suspect": "mimi", "clue": ["szunet"], "reveal": "Mimi felcsattan: „Jó, nem az {{öltözőben|oltozo}} voltam! Csak… friss levegőt akartam.” Hogy hol, azt nem mondja meg."},
    {"id": "c-mimi2", "suspect": "mimi", "clue": ["felnezett", "sugo"], "reveal": "Mimi elsápad: „Bárki felnéz, ha recseg valami!”"},
    {"id": "c-kalman", "suspect": "kalman", "clue": ["level"], "gives": "hetes", "reveal": "Kálmán leül: „A lányom… Igen, tudtam az eljegyzésről. És a hetes jelzést nem én találtam ki. Mimi kérte délután, hogy Iván ott álljon, mert ott szebb a fény.”"},
    {"id": "c-kalman2", "suspect": "kalman", "clue": ["kalman"], "lie": false, "reveal": "„Igen, többet akart. Mindig többet akart. De a szünetben a könyvelővel számoltam a bevételt, kérdezze meg.”"},
    {"id": "c-vass", "suspect": "vass", "clue": ["vass"], "lie": false, "reveal": "Vass vállat von: „Tartoztam neki, igen. De a szünetet a büfében töltöttem, három {{fröccsöt ittam|frocs}}. A büfés megmondja.”"},
    {"id": "c-klara", "suspect": "klara", "clue": ["pletyka"], "lie": false, "reveal": "Klára elmosolyodik: „Igen, én írom. Ezért tudom, hogy Iván mást akart elvenni. És hogy kinek fáj majd a feje miatta.”"},
    {"id": "c-bodo", "suspect": "bodo", "clue": ["bodo"], "lie": false, "reveal": "Bodó elvörösödik: „Igen, most én kapom a turnét. De élőben skáláztam, a kórista hallotta, nem gramofon volt.”"}
  ],

    locations: [
    { id: "szinpad", spots: { holttest: [50, 75], reflektor: [60, 8], kreta: [30, 85] }, name: "Színpad", desc: "Bécsi bálterem díszlete, félig leeresztett függöny. A reflektor még mindig a hetes jelzésre világít.",
      look: "Bécsi bálterem díszlete, félig leeresztett függöny, a nézőtér üres és sötét. [[Sárközy a krétával jelölt hetes számon fekszik|holttest]], mellette a szétrepedt homokzsák. [[A reflektor|reflektor]] még mindig rá világít. A deszkákon [[krétajelek sora|kreta]], egytől tizenkettőig.",
      decoys: { reflektor: "A {{reflektor|reflektor}} forró és vakító. Aki ide néz, a zsinórpadlásból semmit sem lát.", kreta: "A rendező jelzései. A hetesnél frissebb a kréta: ma délután húzták újra." },
      items: [{ clue: "holttest", label: "A hetes jelzés", text: "Megvizsgálod a holttestet és a zsákot." }] },
    { id: "zsinorpadlas", spots: { csigak: [75, 15], zsakok: [90, 50] }, name: "Zsinórpadlás", desc: "Keskeny vasjárdák a színpad fölött, kötelek, csigák, homokzsákok sora. Szédítő mélység.",
      look: "Keskeny vasjárdák a színpad fölött, szédítő mélység. [[Csigák és kötelek|csigak]] mindenütt, a korlátnál [[homokzsákok sora, mindegyiken egy szám|zsakok]]. A hetes helyén csak a kötél lóg.",
      decoys: { csigak: "Jól olajozott, rendben tartott csigák. Vass Tibor érti a dolgát.", zsakok: "Tizenkét zsák, tizenegy a helyén. Mindegyik pontosan a színpadi jelzés fölött lóg, amelyiknek a számát viseli." },
      puzzle: "kotel" },
    { id: "kellektar", spots: { kardok: [25, 72], lista: [88, 72] }, name: "Kellektár", desc: "Gyertyatartók, kardok, papírmasé gyümölcsök, egy doboz templomi gyertya.",
      look: "Papírmasé gyümölcsök, [[fakardok egy hordóban|kardok]], gyertyatartók, egy doboz templomi gyertya. Az asztalon [[a kellékes listája|lista]].",
      decoys: { kardok: "Fából vannak, ezüstre festve. Egyik sem vág.", lista: "„Templomi gyertya, 7 db — III. felvonás.” Valaki áthúzta a hetest, és odaírta: 6." },
      requires: "kotel", puzzle: "gyertya" },
    { id: "bufe", spots: { rend: [82, 35], vass: [90, 50] }, name: "Büfé", desc: "Vörös plüss, pezsgőspoharak, a falon a szünetek rendje. A büfés még a pultnál áll.",
      look: "Vörös plüss, pezsgőspoharak, a falon [[a szünetek rendje|rend]]. A büfés még a pultnál áll. A fogason [[Vass Tibor kabátja, a zsebéből papír kandikál ki|vass]].",
      decoys: { rend: "I. szünet: 20:35–20:55. II. szünet: 21:50–22:05. A záró kettős 22:38-kor kezdődik." },
      items: [{ clue: "vass", label: "Vass Tibor kabátja", text: "Kihúzod a papírt a zsebből." }],
      puzzle: "szunet" },
    { id: "sugolyuk", spots: { sugo: [12, 55], pletyka: [55, 72], lampa: [65, 52] }, name: "Súgólyuk", desc: "Szűk kis odú a színpad elején, egy lámpa, egy szék és a súgópéldány.",
      look: "Szűk kis odú a színpad elején, innen a színészek arcát látni, nem a hátukat. [[Lengyel Klára|sugo]] a széken ül, szívesen beszél. [[A súgópéldány alatt egy gépelt kézirat|pletyka]], a margón javítások. [[A kis lámpa|lampa]] zöld ernyővel.",
      decoys: { lampa: "Csak a súgópéldányra világít, a nézőtérről nem látszik." },
      items: [
        { clue: "sugo", label: "Lengyel Klára", text: "Megkérdezed, mit látott." },
        { clue: "pletyka", label: "A súgópéldány alatt", text: "Elolvasod a kéziratot." }] },
    { id: "oltozok", spots: { level: [55, 72], bodo: [12, 30], gramofon: [75, 30] }, name: "Öltözősor", desc: "Hosszú folyosó, ajtókon névtáblák, bent tükrök körbe izzókkal.",
      look: "Hosszú folyosó, az ajtókon névtáblák. [[Rácz Mimi sminkasztalán|level]] púder, rúzs és egy összegyűrt levél. [[Bodó Ferenc öltözőjében|bodo]] kottahalom, egy aláírt szerződés. A sarokban [[egy gramofon|gramofon]].",
      decoys: { gramofon: "A {{gramofont|gramofon}} vastag por lepi. Aki ma este skálázott, élőben tette." },
      items: [
        { clue: "level", label: "Rácz Mimi sminkasztala", text: "Kisimítod az összegyűrt levelet." },
        { clue: "bodo", label: "Bodó Ferenc öltözője", text: "Átlapozod a szerződést." }] },
    { id: "porta", spots: { tabla: [35, 40], szereposztas: [72, 50] }, name: "Művészbejáró", desc: "A színészbejáró portásfülkéje: kulcstábla, egy vastag kulcsnapló, a falon a ma esti szereposztás.",
      look: "Huzatos kis fülke a színészbejárónál. A falon [[a kulcstábla|tabla]], az ablakpárkányon [[a ma esti szereposztás|szereposztas]]. A pulton a kulcsnapló: a portás minden kulcs leadását és felvételét beírja, percre pontosan.",
      decoys: { tabla: "Minden öltözőnek saját szöge van. Mimié üres, a kulcs most a csendőröknél van.", szereposztas: "„Bécsi vér” — Sárközy Iván, Rácz Mimi. A beugró neve ceruzával: Bodó Ferenc." },
      puzzle: "kulcsnaplo" },
    { id: "iroda", spots: { plakat: [42, 15], kalman: [62, 72] }, name: "Igazgatói iroda", desc: "Plakátok a falon, telefon, a rendőrség itt veszi fel a vallomásokat.",
      look: "A falon [[plakátok|plakat]], a rendőrség itt veszi fel a vallomásokat. [[Az igazgató asztalán|kalman]] levelek, számlák, egy dühösen aláhúzott levél.",
      decoys: { plakat: "„Bécsi vér” — Sárközy Iván és Rácz Mimi. A plakáton Mimi neve kisebb betűkkel áll." },
      items: [{ clue: "kalman", label: "Az igazgató asztala", text: "Elolvasod az aláhúzott levelet." }],
      puzzle: "vallomas" }
  ],

    deductions: [
    { id: "d-idozito", from: ["kotel", "gyertya"], t: "Időzítő gyertya", x: "A kötelet egy alá drótozott gyertya égette át, amelyet 20:41-kor, az első szünetben gyújtottak meg. A gyilkosnak a zuhanáskor nem kellett a padláson lennie.",
      text: "A kötelet egy {} égette át, amelyet ekkor gyújtottak meg: {}, az első szünetben. A gyilkosnak a zuhanáskor nem kellett fent lennie.", b: ["gyertya", "t2041"] },
    { id: "d-padlas", from: ["szunet", "d-idozito"], t: "Ki volt fent 20:41-kor?", x: "A gyertyát az első szünetben gyújtották meg. Az első szünetben egyedül Rácz Mimi volt a zsinórpadláson.",
      text: "Az első szünetben ezen a helyen: {} egyetlen ember tartózkodott: {}.", b: ["zsinorpadlas", "mimi"] },
    { id: "d-tudta", from: ["felnezett", "holttest"], t: "Mimi tudta", x: "Mimi a zuhanás előtt felnézett, és egy lépéssel balra ugrott, ki a zsák alól. Tudta, mikor és hova esik.",
      text: "Mimi a zuhanás előtt {}, és {}. Tudta, mikor és hova zuhan a zsák.", b: ["felnezett", "balra"] },
    { id: "d-hely", from: ["hetes", "holttest"], t: "Ki állította a zsák alá?", x: "A hetes zsák a hetes jelzés fölött lógott, és Mimi kérte délután, hogy Iván pont ott álljon.",
      text: "Iván azért állt itt: {}, mert délután ő kérte: {}.", b: ["hetes", "mimi"] }
  ],
events: [
    { id: "recseg", after: 3, title: "Recsegés odafent",
      text: "A sötét színpad fölött megreccsen valami. Egy lámpás fénye imbolyog a zsinórpadláson, és egy homokzsák lassan megleng.\n\nVass Tibor mászik le a létrán. „Csak a köteleimet nézem” mondja rekedten. „Huszonkét éve egy sem szakadt el. Egy sem.”" },
    { id: "ajul", afterSolved: "gyertya", title: "Mimi összeesik",
      text: "Amikor a folyosón kimondod: húsz óra negyvenegy, az öltözősor végén Rácz Mimi megtántorodik, és összeesik az ajtóban.\n\nKálmán igazgató odarohan, sóoldatot kiált. Mimi lassan kinyitja a szemét, és először nem rád néz, hanem felfelé, a mennyezetre." }
  ],

  fates: {
    kalman: "Ő rendezte át a jelenetet, és a lánya jövője volt a tét. Kálmán Ödönt elítélik, a Corvin Színházat bezárják, a lánya eljegyzésére sosem kerül sor.",
    vass: "Az ő kötele volt, az ő zsinórpadlása, és tartozott az áldozatnak. Vass Tibort elítélik; huszonkét év után az első kötél, amelyik elszakadt, őt is magával rántja.",
    klara: "Ő írta a pletykarovatot, és ő tudott mindent. A súgónőt elítélik, és a börtönben senki sem kíváncsi arra, mit látott a súgólyukból.",
    bodo: "Ő kapta meg a szerepet és a bécsi turnét. Bodó Ferencet elítélik; a turnét végül egy harmadik tenor énekli el."
  },
  puzzles: {
    kulcsnaplo: {
      type: "log", title: "A kulcsnapló", reward: "kulcs", answer: [0, 4],
      body: `<p>Az öltözők kulcsát a színészek a portán adják le, ha kimennek, és ott veszik fel, ha visszatérnek. Keresd meg azt a két sort, amely együtt elárulja, hol nem volt valaki az első szünetben.</p>`,
      cols: ["Idő", "Név", "Bejegyzés"],
      rows: [
        ["20:33", "Rácz M.", "öltöző kulcsa leadva"],
        ["20:35", "—", "I. szünet kezdete (csengő)"],
        ["20:36", "Bodó F.", "öltöző kulcsa nála"],
        ["20:40", "Kálmán Ö.", "iroda kulcsa nála (könyvelővel)"],
        ["20:54", "Rácz M.", "öltöző kulcsa felvéve"],
        ["20:55", "—", "I. szünet vége (csengő)"],
        ["21:52", "Vass T.", "szerszámosláda kulcsa felvéve"],
        ["22:05", "Vass T.", "szerszámosláda kulcsa leadva"]
      ],
      wrong: { 6: "Ez a második szünet, a gyertya addigra rég égett.", 7: "Ez a második szünet, a gyertya addigra rég égett." },
      hints: ["Akinek a kulcsa a portán lóg, az nincs bent az öltözőjében."]
    },
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
        "Figyeld a kötél végének színét, és azt, mi van alatta a járdán.",
        "Fekete, kemény szálvégek és viaszcseppek. Mi okozza mindkettőt?"
      ]
    },
    gyertya: {
      type: "code", title: "A gyertya ideje", reward: "gyertya", answers: ["2041"], length: 4,
      body: `<p>A kellektárban egy doboz templomi gyertya: hat darab, mind pontosan 12 centi hosszú. A hetedik hiányzik. A zsinórpadláson talált csonk 4 centi magas, a kötél épp ennél a magasságnál volt átvetve a lángon.</p>
<p>A doboz címkéje szerint egy ilyen gyertya három óra alatt ég le teljesen. A kötél 22:41-kor szakadt el.</p>
<p>Mikor gyújtották meg a gyertyát? Írd be óra és perc szerint, négy számjeggyel.</p>`,
      wrong: "Ekkor még nem gyújthatták meg. Számold újra, mennyi égett le.",
      hints: [
        "Számold ki, óránként hány centit ég a gyertya, és mennyi égett le belőle.",
        "12 centi három óra alatt: 4 centi óránként. 8 centi égett le, az két óra. Vond le a 22:41-ből."
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
    story: "A tettes: {}. Az első szünetben felment ide: {}. A hetes zsák kötele alá egy {} drótozott, és ekkor meggyújtotta: {}.\nDélután ő kérte, hogy Iván ide álljon: {}. A zuhanás előtt {}, és félreugrott.\nIndíték: {}.",
    b: ["mimi", "zsinorpadlas", "gyertya", "t2041", "hetes", "felnezett", "eljegyzes"], who: [0]
  },

  plan: { w: 11, h: 8,
    rooms: { zsinorpadlas: [2, 0, 6, 1.8, "Zsinórpadlás (fent)"], iroda: [8, 0, 3, 2], kellektar: [0, 1.8, 2, 1.7], porta: [0, 3.5, 2, 1.5, "Művészbejáró"], szinpad: [2, 1.8, 6, 3.2], oltozok: [8, 2, 3, 3], sugolyuk: [4.3, 5, 1.4, 1, "Súgó"], _nezoter: [1, 6, 7.4, 2, "Nézőtér"], bufe: [8.6, 6, 2.4, 2] },
    doors: [[2, 2.3, 2, 3.1], [8, 3, 8, 4], [1, 3.5, 1.6, 3.5], [9, 2, 10, 2]],
    marks: [[5.15, 3.6, "7 ↓"]],
    note: "A Corvin Színház metszete és alaprajza egyben: a zsinórpadlás a színpad fölött, a súgólyuk a színpad elején van." },
carnation: { letter: "F", found: "Mimi púderdobozában egy préselt fekete szegfű és egy gépelt cédula. A jobb alsó sarkában pirossal bekarikázva egy betű.", note: "„⟪ido⟫ Holnap bejelentik az eljegyzést. ⟪fent⟫ A szünetben a zsinórpadlás üres. ⟪tuz⟫ A kellektárban templomi gyertya van. — F. Sz.”" },

  ending: {
    heading: "Rácz Mimi volt az.",
    paragraphs: [
      "Mimi évekig hitte, hogy Sárközy egyszer elveszi feleségül. Aznap délután megtudta, hogy másnap az igazgató lányával jelenti be az eljegyzését. A próbán ő kérte meg Kálmánt, hogy Iván a hetes jelzéshez álljon, mert ott szebb a fény. Az igazgató szívesen teljesítette.",
      "Az első szünetben, amíg mindenki a büfében vagy az öltözőjében volt, Mimi felment a zsinórpadlásra. A hetes zsák kötele alá egy templomi gyertyát drótozott, és 20:41-kor meggyújtotta. Két óra múlva, a záró kettős közben a láng átégette a kötelet. Mimi addigra lent állt a színpadon, a közönség szeme láttára, tökéletes alibivel.",
      "Csakhogy tudnia kellett, mikor lép el. A súgólyukból Lengyel Klára látta, hogy a zuhanás előtt felnéz, aztán balra ugrik. A gyertya ideje, a zárt öltöző és a felnézés elárulta. Vass adóssága, Bodó szerződése és az igazgató gázsivitája csak a színház többi titka volt."
    ]
  }
});
