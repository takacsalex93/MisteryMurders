/* 0. ügy — Próbanap: rövid, vezetett oktató eset. Minden alapmechanikát egyszer bemutat:
   helyszín átkutatása, csalinyom, szókártya, rejtvény, kihallgatás, szembesítés, Tábla és következtetés, vádemelés.
   Nincs hozzá pixeles pálya (noWorld), a klasszikus nézetben fut. A "tutor" szövegek a Következő lépés sávban jelennek meg. */
(window.MM_CASES = window.MM_CASES || []).push({
  id: "oktato",
  tutorial: true, noWorld: true,
  fx: "rain", sound: "jazz", cover: "_generic",
  number: 0,
  title: "Próbanap",
  meta: "Budapest, Rózsa utca · 1930. november 3. · Oktató eset",
  teaser: "Az első napod a kapitányságon. Vámos főfelügyelő egy régi, lezárt aktát tesz eléd: ha öt perc alatt megoldod, a tiéd az íróasztal.",
  difficulty: "Könnyű",
  maxTries: 3,

  intro: {
    eyebrow: "0. ügy · Oktató eset · kb. 5 perc",
    heading: "Halál zárás után",
    lead: "Vámos főfelügyelő ledob eléd egy vékony aktát. „Halász Ernő, a Rózsa utcai kávéház tulajdonosa. Zárás után holtan találták az irodájában. Hárman voltak a házban. Mutassa meg, mit tud.”",
    body: "Ez egy rövid gyakorló eset. Lépésről lépésre végigvezet mindenen, amire a nagy ügyekben szükséged lesz. Figyeld a lap alján a Következő lépés sávot: mindig megmondja, mi a dolgod és miért.",
    start: "terem"
  },

  suspects: [
    { id: "pinter", look: { hair: "slick", clothes: "vest" }, name: "Pintér Lajos", short: "Pintér", role: "Főpincér, 41 éves. Húsz éve dolgozik a kávéházban.",
      stmt: "„Tíz után végig a teremben takarítottam. Az irodába be sem tettem a lábam, a gazda nem szerette, ha zavarják.”" },
    { id: "gal", look: { hair: "bun", clothes: "dress", acc: ["earrings"], lips: true }, name: "Gál Ilona", short: "Ilona", role: "Pénztárosnő, 29 éves.",
      stmt: "„Tízkor lezártam a kasszát, aláírtam a naplót, és hazamentem. Halász úr akkor még élt, jó éjszakát kívánt.”" },
    { id: "weisz", look: { hair: "short", clothes: "suit", acc: ["glasses"] }, name: "Weisz Ármin", short: "Weisz", role: "Törzsvendég, 55 éves. Szenvedélyes kártyás.",
      stmt: "„Negyed tizenegykor átmentem a szomszéd kártyaklubba, és éjfélig ott ültem. Kérdezzék meg a klubtitkárt.”" }
  ],

  words: {
    gyertyatarto: ["rézgyertyatartó", "tárgy"], viasz: ["viaszfolt", "tárgy"], adoslevel: ["adóslevél", "tárgy"],
    iroda_w: ["iroda", "hely"], klub: ["kártyaklub", "hely"],
    t2200: ["22:00", "idő"], t2230: ["22:30", "idő"],
    takaritott: ["takarított", "tett"],
    elbocsat: ["elbocsátás", "indíték"], tartozas: ["tartozás", "indíték"]
  },

  clues: {
    holttest: { t: "Halász Ernő", src: "Iroda", x: "Halász az íróasztalra borulva fekszik, a tarkóján ütés nyoma. A szőnyegen egy {{rézgyertyatartó|gyertyatarto}}, a gyertya kitörve. Az orvos szerint {{22:30|t2230}} körül halt meg, itt, az {{irodában|iroda_w}}." },
    naplo: { t: "A pénztárnapló", src: "Kávéház terme", x: "Az utolsó bejegyzés Gál Ilona kézírása: „Kassza lezárva {{22:00|t2200}}. G. I.” Alatta Halász: „Pintér marad, ő {{takarít|takaritott}} és zár.” Tíz után tehát csak a főpincér maradt a gazdával." },
    kabat: { t: "Weisz kabátja", src: "Kávéház terme", x: "A ruhatárban felejtett felöltő zsebében egy {{adóslevél|adoslevel}}: Weisz Ármin kétezer pengővel tartozik Halásznak, a határidő ma járt le. Komoly {{tartozás|tartozas}}." },
    klubjegyzek: { t: "A kártyaklub jegyzéke", src: "Weisz vallomása", x: "A klubtitkár jegyzéke szerint Weisz Ármin 22:15-kor érkezett a {{kártyaklubba|klub}}, és éjfélig egyfolytában kártyázott. Fél tizenegykor nem lehetett az irodában." },
    koteny: { t: "Pintér köténye", src: "Kávéház terme", x: "A pult mögött Pintér fehér köténye. Az alján friss {{viaszfolt|viasz}}, ugyanolyan vörös, mint a kitört gyertya az irodában. A teremben nincs egyetlen gyertya sem." },
    felmondas: { t: "A felmondólevél", src: "Iroda · páncélszekrény", x: "Halász kézírása, tegnapi dátummal: „Pintér Lajost lopás miatt holnaptól {{elbocsátom|elbocsat}}. Ma este közlöm vele.”" }
  },

  locations: [
    { id: "terem", name: "Kávéház terme", desc: "Márványasztalok, felrakott székek, a pult mögött rézkávéfőző. Zárás utáni csend.",
      look: "Márványasztalok, a székek már felrakva. A pultnál [[a pénztárnapló, nyitva|naplo]], mögötte a fogason [[egy fehér kötény|koteny]]. A ruhatárban [[egy ottfelejtett felöltő|kabat]]. A bejárat fölött [[a régi cégtábla|cegtabla]], a sarokban [[egy zongora|zongora]].",
      decoys: { zongora: "Por a fedelén. Hetek óta senki sem játszott rajta. Nem minden nyom, ami gyanúsnak látszik.", cegtabla: "Aranybetűk: „Halász Kávéház · alapítva 1898”. Ez az évszám még jól jöhet." },
      items: [
        { clue: "naplo", label: "A pénztárnapló", text: "Fellapozod az utolsó oldalt." },
        { clue: "kabat", label: "Az ottfelejtett felöltő", text: "Átnézed a zsebeit." },
        { clue: "koteny", label: "A fehér kötény", text: "Közelebbről megnézed." }] },
    { id: "iroda", name: "Az iroda", desc: "Íróasztal, zöld ernyős lámpa, a sarokban páncélszekrény. Itt találták meg Halászt.",
      look: "Szűk szoba, zöld ernyős lámpa. [[Halász az íróasztalra borulva fekszik|holttest]]. A sarokban [[egy páncélszekrény|pancel]], a falon [[egy bekeretezett fénykép|kep]].",
      decoys: { kep: "Halász fiatalon, a kávéház megnyitásán. Mellette egy fiatal pincér: talán Pintér." },
      items: [
        { clue: "holttest", label: "Halász Ernő", text: "Letérdelsz mellé." }],
      puzzle: "pancel" }
  ],

  puzzles: {
    pancel: {
      type: "code", title: "A páncélszekrény", reward: "felmondas", answers: ["1898"], length: 4,
      body: `<p>A páncélszekrény négyjegyű számzárral nyílik. Pintér szerint a gazda minden zárat ugyanarra a számra állított: arra az évre, amikor a kávéházat megnyitotta.</p>
<p>Ezt az évszámot valahol már láttad: talán a kávéház termében.</p>`,
      wrong: "A zár nem enged.",
      hints: ["Nézd meg a terem bejárata fölötti cégtáblát.", "A cégtáblán: „alapítva 1898”. Ez a kód."]
    }
  },

  contradictions: [
    { id: "c-pinter", suspect: "pinter", clue: "koteny", reveal: "Pintér elsápad: „Jó… bementem. A gazda behívott, hogy közölje: holnaptól nincs állásom. De amikor kijöttem, még élt!”" },
    { id: "c-weisz", suspect: "weisz", clue: "kabat", lie: false, reveal: "Weisz sóhajt: „Igen, tartoztam neki. Ezért mentem át a klubba: abban reménykedtem, hogy éjfélig visszanyerem. Nem nyertem.”" }
  ],

  deductions: [
    { id: "d-ido", from: ["holttest", "naplo"], t: "Ki maradt a házban?", x: "Halász 22:30 körül halt meg. Ilona már tízkor hazament, így a gazdával csak Pintér maradt.",
      text: "Halász {} körül halt meg. Ilona már {}-kor elment, a gazdával csak {} maradt.", b: ["t2230", "t2200", "pinter"] },
    { id: "d-indok", from: ["koteny", "felmondas"], t: "A főpincér titka", x: "Pintér hazudott: bent járt az irodában, ahol a gyertyatartó volt, és aznap este tudta meg, hogy elbocsátják.",
      text: "{} kötényén {} van, pedig gyertya csak az irodában volt. Aznap este tudta meg az {} hírét.", b: ["pinter", "viasz", "elbocsat"] }
  ],

  accusation: {
    story: "A tettes: {}. {} körül egy {} ütötte le Halászt az irodában.\nIndíték: {}.",
    b: ["pinter", "t2230", "gyertyatarto", "elbocsat"], who: [0]
  },

  fates: {
    gal: "Gál Ilonát letartóztatják, pedig a napló szerint tízkor már hazament. Vámos főfelügyelő a fejét csóválja: „Olvassa el újra a pénztárnaplót. Ilyenkor kezdje elölről.”",
    weisz: "Weisz Ármint letartóztatják, de a klubtitkár jegyzéke másnap tisztázza. Vámos főfelügyelő a fejét csóválja: „Az indíték még nem bizonyíték. Kezdje elölről.”"
  },

  ending: {
    heading: "Pintér Lajos volt az.",
    paragraphs: [
      "Halász aznap este behívta az irodába, és közölte, hogy lopás miatt elbocsátja. Húsz év után. Pintér felkapta az íróasztalról a rézgyertyatartót. Amikor rájött, mit tett, visszament a terembe, és tovább takarított, mintha mi sem történt volna. A kitört gyertya viasza a kötényén maradt.",
      "Vámos főfelügyelő becsukja az aktát. „Nem rossz. Egyáltalán nem rossz. Az íróasztal az öné. Holnap reggel egy igazi ügy vár: Balatonfüreden, a Szegfű-villában.”"
    ]
  },

  // a vezetett oktatás magyarázatai: a Következő lépés sáv a lépés fajtája szerint ezt írja ki
  tutor: {
    look: "Minden helyszín leírásában vannak kiemelt részletek. Kattints rájuk: amelyik nyom, az bekerül a jegyzetfüzetbe. Vigyázz, nem minden részlet nyom, egy-kettő csak csali.",
    go: "A helyszínek között a Helyszínek fülön válthatsz. Ha egy helyszínen már minden nyomot megtaláltál, menj tovább.",
    puzzle: "A rejtvények lezárt dolgokat nyitnak ki. A megoldás mindig ott van valahol a nyomokban vagy a leírásokban. Ha elakadsz, kérhetsz súgót, de az levon pár pontot.",
    talk: "A Gyanúsítottak fülön kérdezheted ki az embereket. Az új nyomok új kérdéseket nyitnak meg.",
    confront: "Ha egy nyom ellentmond valakinek a vallomásának, szembesítsd vele: a Gyanúsítottak fülön válaszd ki a nyomot a vallomása alatt. A leleplezett hazugság új információt hoz.",
    words: "A nyomok szövegében aláhúzott szavak a szókártyák. Ezekből raksz össze mondatokat a következtetéseknél és a vádnál.",
    deduce: "A Táblán két összetartozó nyomot köss össze: húzd az egyik kártyát a másikra, vagy kattints egymás után a kettőre. Ha jól választottál, megnyílik egy hiányos mondat.",
    fill: "Töltsd ki a hiányos mondatot a szókártyáiddal. Ha kétszer mellényúlsz, megkérdezheted, melyik szó a rossz.",
    accuse: "Minden bizonyíték megvan. A Vádemelés fülön mondd el a történetet a szókártyáidból. Ha ártatlant nevezel meg, az ügy elveszett, úgyhogy gondold végig."
  }
});
// az extras.js után töltődik be, ezért itt egészíti ki a közös kihallgatási listát
window.MM_EXTRAS = window.MM_EXTRAS || {};
Object.assign(window.MM_EXTRAS, {
  oktato: {
    interviews: {
      pinter: [
        { id: "p1", q: "Mit csinált tíz után?", a: "„Takarítottam. Felraktam a székeket, elmostam a poharakat. A gazda az irodában volt, nem zavartam.”" },
        { id: "p2", q: "Miért kellett a gazdának páncélszekrény?", after: "felmondas", a: "„A bevétel miatt. És… a papírjai miatt.” Kerüli a tekinteted." }
      ],
      gal: [
        { id: "g1", q: "Látott valami szokatlant este?", a: "„Halász úr ideges volt. Délután sokáig számolt, aztán azt mondta, valaki lop a kasszából.”" }
      ],
      weisz: [
        { id: "w1", q: "Miért hagyta itt a felöltőjét?", after: "kabat", a: "„Siettem a klubba, és elfelejtettem. Fél éjszaka fáztam miatta.”" }
      ]
    }
  }
});
