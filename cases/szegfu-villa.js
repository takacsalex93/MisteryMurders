/* 1. ügy — Gyilkosság a Szegfű-villában (könnyű) */
(window.MM_CASES = window.MM_CASES || []).push({
  id: "szegfu-villa",
  fx: "storm",
  sound: "storm",
  sounds: { szalon: "storm-piano" },
  cover: "villa",
  number: 1,
  title: "Gyilkosság a Szegfű-villában",
  meta: "Balatonfüred · 1931. október 9. · Ügyszám 1931/417",
  teaser: "Egy viharos estén a gazdag műgyűjtő bárót holtan találják a könyvtárában. Öt ember van a házban, az utat elzárták a kidőlt fák, és valaki már gondoskodott róla, hogy a gyanú ne rá essen.",
  difficulty: "Könnyű",

  intro: {
    eyebrow: "Bizalmas · a vármegyei rendőrkapitányság részére",
    heading: "Kendeffy Aurél báró halála",
    lead: "1931. október 9-én, péntek este tíz órakor Kendeffy Aurél bárót holtan találták balatonfüredi villájának könyvtárában. Odakint vihar tombolt, az utat a fák elzárták: a házból senki sem távozhatott.",
    body: "Téged, a fővárosból épp a villában vendégeskedő magánnyomozót kérik fel, hogy reggelig, a csendőrök megérkezéséig derítsd ki az igazságot. Öt ember tartózkodott a házban. Mindegyiküknek van titka, és egyikük gyilkos.",
    start: "konyvtar"
  },

  suspects: [
    { id: "matild", look: { hair: "wave", clothes: "dress", acc: ["pearls", "earrings"], lips: true }, name: "Kendeffy Matild", role: "Az özvegy, 29 éves. A báró második felesége.",
      stmt: "„Délután összevesztünk Auréllal, utána ki sem jöttem a szobámból. Fájt a fejem, a doktor adott valamit, és elaludtam. A könyvtárba aznap be sem tettem a lábam.”" },
    { id: "gabor", look: { hair: "slick", clothes: "bowtie" }, name: "Kendeffy Gábor", role: "Az unokaöcs, 34 éves. Az örökség fő várományosa.",
      stmt: "„Vacsora után a szalonban zongoráztam, Chopint, egész este. Délután volt egy kis vitám a bácsikámmal a könyvtárban, de este oda sem néztem.”" },
    { id: "szirmai", look: { hair: "short", clothes: "suit", acc: ["glasses", "mustache"] }, name: "Dr. Szirmai Ottó", role: "Háziorvos, 52 éves. Régi barát.",
      stmt: "„Fél tíztől kint szivaroztam az üvegháznál, Matild asszony nem tűri a füstöt. Tízkor benéztem hozzá, aludt. A táskám egész este a hallban volt, nem hiányzik belőle semmi.”" },
    { id: "ilona", look: { hair: "bun", clothes: "blouse", acc: ["glasses"], lips: true }, name: "Bakos Ilona", role: "A báró titkárnője, 31 éves. Négy éve kezeli a gyűjtemény papírjait.",
      stmt: "„Vacsora után felmentem a szobámba, és egész este gépeltem: a báró úr leveleit tisztáztam le. Lefelé egyszer sem jöttem.”" },
    { id: "lukacs", look: { hair: "bald", clothes: "bowtie", acc: ["mustache"] }, name: "Lukács János", role: "Komornyik, 61 éves. Harminc éve szolgálja a családot.",
      stmt: "„Fél tízkor kitöltöttem a báró úr konyakját a könyvtárban, ahogy minden este, aztán visszamentem a konyhába az ezüsthöz. Délután Gábor úrral együtt kerestük a mandzsettagombját a könyvtárban, a karosszék alatt is, de nem találtuk.”" }
  ],

  clues: {
    holttest: { t: "Keserűmandula-szag", src: "Könyvtár", x: "A báró a karosszékben ül, előtte a félig kiürült konyakospohár. A pohárból enyhe keserűmandula-szag árad. Dr. Szirmai szerint ciánmérgezés, a halál azonnal beállt, tíz óra körül." },
    mandzsetta: { t: "Mandzsettagomb a karosszék alatt", src: "Könyvtár", x: "A karosszék alatt, a pohár közelében egy arany mandzsettagomb, K. G. monogrammal. Kendeffy Gábor monogramja. Fényes, por nem ül rajta." },
    telefon: { t: "A telefonbeszélgetés", src: "Hall", x: "A posta központjának kezelőnője szerint a báró 21:30-tól 21:55-ig a halli telefonon Budapesttel beszélt. A konyak 21:30-tól őrizetlenül állt a könyvtárban." },
    taska: { t: "Az orvosi táska", src: "Hall", x: "Dr. Szirmai táskájában a bársonytartó egyik helye üres: egy morfiumampulla hiányzik. Cián vagy cianidtartalmú szer nincs a táskában, és a nyilvántartásában sem szerepel." },
    zalog: { t: "Zálogcédulák", src: "Vendégszoba", x: "Gábor kabátzsebében három budapesti zálogcédula: aranyóra, egy cigarettatárca és egy ezüstfejű sétabot. Az utolsót két hete adta zálogba." },
    levelk: { t: "Szerelmes levél", src: "Emeleti szobák", x: "Matild fiókjában egy aláíratlan, rajongó hangú levél egy budapesti festőtől: „Ha elválsz tőle, tavasszal Párizsban várlak.”" },
    ilonaszoba: { t: "Ilona szobája", src: "Emeleti szobák", x: "Ilona emeleti szobájában ágy, szekrény, mosdó és egy kis asztal. Írógép nincs, és soha nem is volt: a házban csak a földszinti titkárságon gépelnek." },
    kertesz: { t: "A kertész vallomása", src: "Üvegház", x: "A kertész szerint aznap délután egyetlen ember járt az üvegházban: a titkárnő kisasszony, aki virágot vágott a báró asztalára. Este fél tíz és tíz között valaki a bejáratnál szivarozott, de be nem ment." },
    darazs: { t: "Az üvegházi darázsirtó", src: "Üvegház", x: "A harmadik polcon álló „Darázsirtó — MÉREG” feliratú bádogdoboz (kálium-cianid) fedele lazán áll, a porban friss nyom. A polc előtt keskeny, magas sarkú női cipő lenyomata." },
    level: { t: "A báró el nem küldött levele", src: "Könyvtár · íróasztal", x: "„Tekintetes Rendőrkapitányság! Gyűjteményem öt festményét az elmúlt két évben hamisítványokra cserélték, az eredetieket eladták. Az eladási nyugták a házban, írógépen készültek. Holnap, október 10-én személyesen megnevezem a tettest. — Kendeffy Aurél”" },
    gep: { t: "A hamis nyugta írógépe", src: "Titkárság", x: "A hamis nyugta nem a titkárság új Remingtonján készült, hanem a zárt szekrényben tartott régi Continentalon. A szekrény kulcsa csak Ilonánál van. A szekrényben ugyanerről a gépről még két nyugta: Mednyánszky 6 000 és Szinyei 9 000 pengőről." },
    alibi: { t: "Ki hol volt 21:30 és 22:00 között?", src: "Szalon · tanúvallomások", x: "Lukács a konyhában, Dr. Szirmai az üvegháznál, Gábor a szalonban a zongoránál, Matild az emeleten aludt. Bakos Ilonának egyetlen hely maradt: a könyvtár, ahol a konyak állt." },
    jegyzet: { t: "Ilona titkosított jegyzete", src: "Emeleti szobák · zsebnaptár", x: "Megfejtve: „Üvegház, harmadik polc. Konyak fél tíz után, amíg telefonál.” Ilona zsebnaptárából, a gyilkosság napjáról." }
  },

  contradictions: [
    { id: "c-ilona", suspect: "ilona", clue: ["ilonaszoba", "alibi"],
      reveal: "Ilona elsápad: „Jó… nem gépeltem. Lent voltam, a könyvtárban rendeztem a gyűjtemény papírjait. De a konyakhoz hozzá sem nyúltam!”" },
    { id: "c-gabor", suspect: "gabor", clue: ["mandzsetta"], lie: false,
      reveal: "Gábor meglepődik: „Ez az enyém, délután veszett el a veszekedésnél. Lukáccsal az egész könyvtárat felforgattuk érte, a karosszék alatt is néztük, és akkor nem volt ott.” Valaki később tette oda." },
    { id: "c-szirmai", suspect: "szirmai", clue: ["taska"],
      reveal: "Szirmai lesüti a szemét: „Matild asszonynak adtam kilenckor, könyörgött, hogy aludni akar. Nem jegyeztem fel. Ha kitudódik, elveszítem az engedélyemet.”" },
    { id: "c-matild", suspect: "matild", clue: ["levelk"], lie: false,
      reveal: "Matild elvörösödik: „Igen, el akartam válni tőle, ezért veszekedtünk. Ha meg akartam volna ölni, minek írtam volna délután az ügyvédemnek?”" }
  ],

  locations: [
    { id: "konyvtar", name: "Könyvtár", desc: "Bőrfotelek, tölgyfa polcok, odakint vihar. A báró itt halt meg.",
      items: [
        { clue: "holttest", label: "A holttest és a pohár", text: "A báró a karosszékben ül, mintha elaludt volna. A kisasztalon egy metszett konyakospohár." },
        { clue: "mandzsetta", label: "A karosszék alatt", text: "Valami megcsillan a szőnyegen, a karosszék lába mellett." }],
      puzzle: "desk" },
    { id: "hall", name: "Hall", desc: "Márványpadló, állóóra, a falon a ház egyetlen telefonja.",
      items: [
        { clue: "telefon", label: "A telefon", text: "A postai központ kezelőnője emlékszik, mikor kapcsolta a bárót." },
        { clue: "taska", label: "Dr. Szirmai táskája", text: "Az orvos fekete bőrtáskája a fogason lóg." }] },
    { id: "titkarsag", name: "Titkárság", desc: "Szűk iroda a földszinten: iratszekrények, egy új Remington és egy zárt szekrény.",
      requires: "desk", puzzle: "type" },
    { id: "szalon", name: "Szalon", desc: "Itt gyűltek össze a vendégek a rendőrség érkezése előtt. A zongora fedele nyitva.", puzzle: "alibi" },
    { id: "emelet", name: "Emeleti szobák", desc: "Hálószobák a lépcső tetején: a báróéké, a vendégeké és a titkárnőé.",
      items: [
        { clue: "levelk", label: "Matild fiókja", text: "Egy illatosított boríték a fehérnemű alatt." },
        { clue: "ilonaszoba", label: "Ilona szobája", text: "Rendezett, szinte üres szoba. A párna alatt egy zsebnaptár." }],
      puzzle: "cipher" },
    { id: "vendeg", name: "Vendégszoba", desc: "Gábor szobája, gyűrött ágy, a széken egy kabát.",
      items: [{ clue: "zalog", label: "Gábor kabátja", text: "A belső zsebből papírok kandikálnak ki." }] },
    { id: "uveghaz", name: "Üvegház", desc: "Párás meleg, orchideák, a sarokban kerti szerszámok és vegyszerek.",
      items: [
        { clue: "darazs", label: "A vegyszerespolc", text: "Bádogdobozok, permetezők, a harmadik polcon egy koponyás címke." },
        { clue: "kertesz", label: "A kertész", text: "Az öreg kertész a viharban is a palántáit félti." }] }
  ],

  puzzles: {
    desk: {
      type: "code", title: "Az íróasztal számzára", reward: "level", answers: ["1405", "0514"], length: 4,
      body: `<p>A báró íróasztalának fiókja négyjegyű számzárral nyílik. Lukács szerint a gazdája minden zárat ugyanarra a napra állított: arra, amikor életében először meglátta Katalint, az első feleségét.</p>
<p>Az asztalon két bekeretezett fénykép áll. Az egyiken Matild, alatta: „Matildnak, az esküvőnk napján. 1929. X. 9.” A másikon egy fiatal pár galambok között, a hátoldalán:</p>
<div class="typed">Velence, Szent Márk tér, 1920. V. 14.
Ma egy éve, hogy épp itt láttalak meg először. — K.</div>`,
      wrong: "A zár kattan, de nem nyílik.",
      afterSolve: "<p>A levél alatt egy gépelt adásvételi nyugta is lapul. Érdemes összevetni a ház írógépeivel: a titkárság most már nyitva áll.</p>",
      hints: [
        "Nem Matild a kulcs, és nem is a fénykép évszáma. Katalin azt írja: ma egy éve.",
        "Az első találkozás napja és hónapja ugyanaz, mint a fényképé, csak egy évvel korábban. Négy számjegy: nap, aztán hónap."
      ]
    },
    type: {
      type: "choice", title: "Az írógépek", reward: "gep", answer: "D",
      body: `<p>A báró fiókjában talált nyugta szerint a Munkácsy-képet „eladták”. A gépelésnek három jellegzetessége van. Hasonlítsd össze a ház négy írógépének próbasorával, betűről betűre.</p>
<div class="typed">ADÁSVETELI NYUGTA
Munkácsy M.: Poros út, ol<span class="r">a</span>j, vászon.
<span class="r">A</span> vetelár<span class="r">a</span>t, l4 000 pengőt keszpenzben átvettem.
Bud<span class="r">a</span>pest, l93l. VI. 2.</div>`,
      options: [
        { v: "A", label: "A könyvtár Underwoodja (a báróé)", sample: "A vetelárat, l4 000 pengőt keszpenzben átvettem. l93l." },
        { v: "B", label: "Gábor hordozható gépe", sample: `<span class="r">A</span> vételár<span class="r">a</span>t, l4 000 pengőt készpénzben átvettem. l93l.` },
        { v: "C", label: "A titkárság új Remingtonja", sample: `<span class="r">A</span> vetelár<span class="r">a</span>t, 14 000 pengőt keszpenzben átvettem. 1931.` },
        { v: "D", label: "Régi Continental a titkárság zárt szekrényéből", sample: `<span class="r">A</span> vetelár<span class="r">a</span>t, l4 000 pengőt keszpenzben átvettem. l93l.` }
      ],
      confirm: "Ez a gép",
      wrong: "Nem egyezik minden jellegzetesség. Nézd meg betűről betűre, a számokat is.",
      hints: [
        "Három dolgot figyelj: az é betűt, az a betű magasságát és a számokat.",
        "A régi írógépeken nem volt 1-es billentyű, helyette kis l betűt ütöttek."
      ]
    },
    alibi: {
      type: "assign", title: "A vallomások", reward: "alibi", columnLabel: "Hol volt 21:30 és 22:00 között?",
      body: `<p>A konyak fél tíz és tíz között állt őrizetlenül. Rakd össze a tanúk szavaiból, ki hol volt ekkor.</p>`,
      facts: [
        "A villa öt helyén öt ember tartózkodott, mindegyikük máshol.",
        "Teréz, a szakácsné: „Fél tíz után velem csak az volt a konyhában, aki előtte a konyakot kitöltötte. Az ezüstöt fényesítette, ki sem mozdult.”",
        "A kertész az üvegház bejáratánál egy szivar parazsát látta. A dohányzó zsebéből egy sztetoszkóp lógott ki.",
        "A szalonból végig zongoraszó hallatszott. A zongorista kétszer elrontotta ugyanazt a futamot, és újrakezdte. Gramofonlemez nem téved.",
        "A házban csak ketten tudnak zongorázni: Gábor és a doktor.",
        "Tízkor a doktor benézett a bárónőhöz: mélyen aludt az emeleten, ott, ahol kilenc óta feküdt."
      ],
      choices: ["Szalon", "Konyha", "Üvegház", "Emeleti szobák", "Könyvtár"],
      answer: { lukacs: "Konyha", szirmai: "Üvegház", gabor: "Szalon", matild: "Emeleti szobák", ilona: "Könyvtár" },
      hints: [
        "Kezdd a komornyikkal és a dohányzóval. Ha a doktor kint volt, ki játszhatott a zongorán?",
        "Ha mindenki máshol volt, és Matild fent aludt, Ilonának csak egy hely marad, bármit is állít."
      ]
    },
    cipher: {
      type: "keyword", title: "A zsebnaptár", reward: "jegyzet", key: "MUNKACSY",
      plain: "UVEGHAZ, HARMADIK POLC. KONYAK FEL TIZ UTAN, AMIG TELEFONAL.",
      body: `<p>Ilona párnája alatt egy zsebnaptár. Az október 9-i oldalon egyetlen értelmetlen sor. A naptár belső borítóján ceruzával:</p>
<div class="typed">„Kulcs: akit a legdrágábban adtam el.”</div>
<p>A betűket egy kulcsszó tolja el, betűről betűre. Ha megvan a kulcsszó, írd be.</p>`,
      hints: [
        "Ilona festményeket adott el. A nyugtákat a titkárság zárt szekrényében találod.",
        "Hasonlítsd össze mindhárom nyugta összegét. A legdrágább festő neve a kulcs, ékezet nélkül."
      ]
    }
  },

  accusation: {
    questions: [
      { id: "who", legend: "Ki a gyilkos?", name: "a tettes", from: "suspects", answer: "ilona", proof: ["alibi", "jegyzet", "ilonaszoba"] },
      { id: "how", legend: "Mivel ölt?", name: "az eszköz", answer: "cian", proof: ["darazs", "jegyzet", "kertesz"],
        options: [{ v: "morfium", label: "Morfium az orvosi táskából" }, { v: "cian", label: "Cián az üvegházi darázsirtóból" }, { v: "altato", label: "Altató Matild éjjeliszekrényéről" }] },
      { id: "why", legend: "Miért?", name: "az indíték", answer: "hamisitas", proof: ["level", "gep"],
        options: [{ v: "orokseg", label: "Az örökség megszerzése" }, { v: "feltekenyseg", label: "Féltékenység, megcsalt házasság" }, { v: "hamisitas", label: "A festményhamisítás leleplezésének megakadályozása" }, { v: "adossag", label: "Felhalmozott kártyaadósság" }] },
      { id: "plant", legend: "Melyik nyomot csempészték oda, hogy másra terelje a gyanút?", name: "a hamis nyom", from: "clues", answer: "mandzsetta" }
    ]
  },

  ending: {
    heading: "Bakos Ilona volt az.",
    paragraphs: [
      "Négy éven át Ilona kezelte a báró gyűjteményének papírjait. Képről képre cserélte az eredetieket ügyes hamisítványokra, az eredetieket eladta, a nyugtákat pedig a régi Continentalon gépelte, amelynek szekrénykulcsa csak nála volt.",
      "A báró rájött a csalásra, és levelet írt a rendőrségnek. Ilona tudta, hogy csak egy estéje maradt. Délután, amikor virágot vágott, elvette a cianidot az üvegház harmadik polcáról. Ugyanaznap délután felvette a földről Gábor elveszett mandzsettagombját is. Este, amíg a báró a hallban telefonált, a könyvtárba lopózott, a konyakba szórta a mérget, és a gombot a karosszék alá ejtette.",
      "Azt állította, egész este a szobájában gépelt, pedig a szobájában soha nem volt írógép. A mandzsettagomb Gáborra terelte volna a gyanút, csakhogy délután ő és Lukács pont ott keresték. Szirmai morfiuma, Gábor adósságai és Matild levele csak a ház többi titka voltak."
    ]
  }
});
