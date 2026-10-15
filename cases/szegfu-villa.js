/* 1. ügy — Gyilkosság a Szegfű-villában
   Egy ügy = egy ilyen fájl. Új ügyhöz másold le, írd át, és vedd fel az index.html-be. */
(window.MM_CASES = window.MM_CASES || []).push({
  id: "szegfu-villa",
  number: 1,
  title: "Gyilkosság a Szegfű-villában",
  meta: "Balatonfüred · 1931. október 9. · Ügyszám 1931/417",
  teaser: "Egy viharos estén a gazdag műgyűjtő bárót holtan találják a könyvtárában. Öt ember van a házban, és az utat elzárták a kidőlt fák.",
  difficulty: "Könnyű",

  intro: {
    eyebrow: "Bizalmas · a vármegyei rendőrkapitányság részére",
    heading: "Kendeffy Aurél báró halála",
    lead: "1931. október 9-én, péntek este tíz órakor Kendeffy Aurél bárót holtan találták balatonfüredi villájának könyvtárában. Odakint vihar tombolt, az utat a fák elzárták: a házból senki sem távozhatott.",
    body: "Téged, a fővárosból épp a villában vendégeskedő magánnyomozót kérik fel, hogy reggelig, a csendőrök megérkezéséig derítsd ki az igazságot. Öt ember tartózkodott a házban. Egyikük gyilkos.",
    start: "konyvtar"
  },

  suspects: [
    { id: "matild", name: "Kendeffy Matild", role: "Az özvegy, 29 éves. A báró második felesége.",
      stmt: "„Délután összevesztünk Auréllal. Egész este be sem tettem a lábam a könyvtárba. Fájt a fejem, fent voltam.”",
      extra: { after: "alibi", text: "Az emeleten volt, és egész este nem hallott írógép-kopogást." } },
    { id: "gabor", name: "Kendeffy Gábor", role: "Az unokaöcs, 34 éves. Az örökség fő várományosa.",
      stmt: "„Zongoráztam a szalonban, Chopint. Mindenki hallhatta. Igen, tartozom néhány embernek, de ettől még nem vagyok gyilkos.”",
      extra: { after: "zalog", text: "A zálogcédulák szerint súlyos adósságai vannak. Indíték, de az alibije szilárd." } },
    { id: "szirmai", name: "Dr. Szirmai Ottó", role: "Háziorvos, 52 éves. Régi barát.",
      stmt: "„Kint szivaroztam az üvegháznál. Matild asszony nem tűri a füstöt a házban. A kertész látott, kérdezze csak meg.”",
      extra: { after: "taska", text: "Táskájából hiányzik egy morfiumampulla. Ideges, valamit titkol, de méreg nincs nála." } },
    { id: "ilona", name: "Bakos Ilona", role: "A báró titkárnője, 31 éves. Négy éve kezeli a gyűjtemény papírjait.",
      stmt: "„Fent gépeltem a dolgozószobámban egész este. A báró úr leveleit tisztáztam le.”",
      extra: { after: "alibi", text: "Nem fent volt: a beosztás szerint ő tartózkodott a könyvtárban.", lie: true } },
    { id: "lukacs", name: "Lukács János", role: "Komornyik, 61 éves. Harminc éve szolgálja a családot.",
      stmt: "„A konyhában tisztítottam az ezüstöt, Teréz, a szakácsné végig ott volt. A báró úr minden este pontban tízkor iszik egy pohár konyakot a könyvtárban. Én töltöttem ki fél tízkor, ahogy mindig.”" }
  ],

  clues: {
    holttest: { t: "Keserűmandula-szag", src: "Könyvtár", x: "A báró a karosszékben ült, előtte a félig kiürült konyakospohár. A pohárból enyhe keserűmandula-szag árad. Dr. Szirmai szerint ciánmérgezés, a halál azonnal beállt, 22:00 körül." },
    telefon: { t: "Telefonbeszélgetés", src: "Hall", x: "A posta központja igazolja: a báró 21:30 és 21:55 között a halli telefonon Budapesttel beszélt. A konyakot tehát ebben az időben, üres könyvtárban mérgezték meg." },
    taska: { t: "Az orvosi táska", src: "Hall", x: "Dr. Szirmai táskájából hiányzik egy morfiumampulla. Cián vagy cianidtartalmú szer viszont nincs benne, és a nyilvántartásában sem szerepel." },
    zalog: { t: "Zálogcédulák", src: "Vendégszoba", x: "Gábor kabátzsebében három budapesti zálogcédula: aranyóra, mandzsettagombok, egy cigarettatárca. Nagyon kell neki a pénz." },
    levelk: { t: "Szerelmes levél", src: "Emeleti szobák", x: "Matild fiókjában egy aláíratlan, rajongó hangú levél egy budapesti festőtől. Matildnak titka van, de a levél szerint épp el akart válni, nem gyilkolni." },
    darazs: { t: "Az üvegházi darázsirtó", src: "Üvegház", x: "A harmadik polcon álló „Darázsirtó — MÉREG” feliratú bádogdoboz (kálium-cianid) fedele lazán áll, a porban friss nyom: valaki a minap kinyitotta. A polc előtt keskeny, magas sarkú női cipő lenyomata." },
    level: { t: "A báró el nem küldött levele", src: "Könyvtár · íróasztal", x: "„Tekintetes Rendőrkapitányság! Gyűjteményem öt festményét az elmúlt két évben hamisítványokra cserélték, az eredetieket eladták. Az eladási nyugták a házban, egy irodai írógépen készültek. Holnap, október 10-én személyesen megnevezem a tettest. — Kendeffy Aurél”" },
    gep: { t: "A hamis nyugta írógépe", src: "Titkárság", x: "A Munkácsy-festmény hamis eladási nyugtája a titkárság Remington írógépén készült: az „é” helyett „e”-t üt, és az „a” betű kissé felcsúszik. Ezt a gépet Bakos Ilona használja." },
    alibi: { t: "Ki hol volt 21:30 és 21:45 között?", src: "Szalon · tanúvallomások", x: "Lukács: konyha. Dr. Szirmai: üvegház. Gábor: szalon (zongora). Matild: emelet. Bakos Ilona: könyvtár, pedig azt állította, fent gépelt." },
    jegyzet: { t: "Ilona titkosított jegyzete", src: "Ilona szobája", x: "Kódolva, 7-es eltolással: „ÜVEGHÁZ, HARMADIK POLC. KONYAK HÁROMNEGYED TÍZ ELŐTT.” Ilona előre megtervezte, honnan veszi a mérget, és mikor teszi a pohárba." }
  },

  locations: [
    { id: "konyvtar", name: "Könyvtár", desc: "Bőrfotelek, tölgyfa polcok, odakint vihar. A báró itt halt meg.",
      items: [{ clue: "holttest", label: "A holttest és a pohár", text: "A báró a karosszékben ül, mintha elaludt volna. A kisasztalon egy metszett konyakospohár." }],
      puzzle: "desk" },
    { id: "hall", name: "Hall", desc: "Márványpadló, állóóra, a falon a ház egyetlen telefonja.",
      items: [
        { clue: "telefon", label: "A telefon", text: "A postai központ kezelőnője emlékszik, mikor kapcsolta a bárót." },
        { clue: "taska", label: "Dr. Szirmai táskája", text: "Az orvos fekete bőrtáskája a fogason lóg." }] },
    { id: "titkarsag", name: "Titkárság", desc: "Szűk iroda a földszinten, iratszekrények és egy nehéz Remington.",
      requires: "desk", puzzle: "type" },
    { id: "szalon", name: "Szalon", desc: "Itt gyűltek össze a vendégek a rendőrség érkezése előtt. A zongora fedele nyitva.", puzzle: "alibi" },
    { id: "emelet", name: "Emeleti szobák", desc: "Hálószobák és a titkárnő kis dolgozószobája.",
      items: [{ clue: "levelk", label: "Matild fiókja", text: "Egy illatosított boríték a fehérnemű alatt." }],
      puzzle: "cipher" },
    { id: "vendeg", name: "Vendégszoba", desc: "Gábor szobája, gyűrött ágy, a széken egy kabát.",
      items: [{ clue: "zalog", label: "Gábor kabátja", text: "A belső zsebből papírok kandikálnak ki." }] },
    { id: "uveghaz", name: "Üvegház", desc: "Párás meleg, orchideák, a sarokban kerti szerszámok és vegyszerek.",
      items: [{ clue: "darazs", label: "A vegyszerespolc", text: "Bádogdobozok, permetezők, a harmadik polcon egy koponyás címke." }] }
  ],

  puzzles: {
    desk: {
      type: "code", title: "Az íróasztal számzára", reward: "level", answers: ["1405", "0514"], length: 4,
      body: `<p>A báró íróasztalának fiókja négyjegyű számzárral nyílik. Lukács, a komornyik szerint a gazdája minden zárat „a legboldogabb napjára” állított.</p>
<p>Az asztalon bekeretezett fénykép: egy fiatal pár galambok között. A hátoldalára írva:</p>
<div class="typed">Velence, Szent Márk tér, 1919. V. 14.
A legboldogabb napom. — A. &amp; K.</div>`,
      wrong: "A zár nem enged. Kattan, de nem nyílik.",
      afterSolve: "<p>A levél alatt egy gépelt adásvételi nyugta is lapul. Érdemes lenne összevetni a ház írógépeivel. A titkárság most már nyitva áll.</p>",
      hints: [
        "A fénykép hátoldalán lévő dátum a kulcs.",
        "A római V a hónapot jelöli: május. Négy számjegyhez a nap és a hónap kell.",
        "Nap, aztán hónap, két-két jeggyel."
      ]
    },
    type: {
      type: "choice", title: "Az írógépek", reward: "gep", answer: "C",
      body: `<p>A báró fiókjában talált nyugta szerint a Munkácsy-képet „eladták”. A gépelés jellegzetes: nézd meg alaposan a betűket. Melyik gépen készült?</p>
<div class="typed">ADÁSVETELI NYUGTA
Munkácsy M.: Poros út, ol<span class="r">a</span>j, vászon.
<span class="r">A</span> vetelár<span class="r">a</span>t, 14 000 pengőt keszpenzben átvettem.
Bud<span class="r">a</span>pest, 1931. VI. 2.</div>`,
      options: [
        { v: "A", label: "A könyvtár Underwoodja (a báróé)", sample: "A vetelárat keszpenzben átvettem." },
        { v: "B", label: "A vendégszobai hordozható gép (Gáboré)", sample: `<span class="r">A</span> vételár<span class="r">a</span>t készpénzben átvettem.` },
        { v: "C", label: "A titkárság Remingtonja", sample: `<span class="r">A</span> vetelár<span class="r">a</span>t keszpenzben átvettem.` }
      ],
      confirm: "Ez a gép",
      wrong: {
        A: "Az „é” hibája stimmel, de nézd meg az „a” betűket is.",
        B: "A felcsúszó „a” stimmel, de mi a helyzet az ékezetes „é”-vel?"
      },
      hints: [
        "Két jellegzetes hibát keress: az ékezeteket és a betűk magasságát.",
        "A nyugtán „é” helyett „e” áll, és az „a” betűk kissé feljebb ülnek.",
        "Csak egy gépnek van meg mindkét hibája."
      ]
    },
    alibi: {
      type: "assign", title: "A vallomások", reward: "alibi", columnLabel: "Helyiség 21:30–21:45",
      body: `<p>A konyakot 21:30 és 21:45 között mérgezték meg. Ekkor mind az öten más-más helyiségben voltak. A vallomásokból és a tanúk szavaiból állítsd össze, ki hol volt.</p>`,
      facts: [
        "Teréz, a szakácsné szerint Lukács egész idő alatt mellette tisztította az ezüstöt.",
        "A kertész az ablakból látta, ahogy valaki az üvegháznál szivarozik. A házban senki sem gyújthatott rá.",
        "Dr. Szirmai az egyetlen dohányos a vendégek közül.",
        "A szalonban egyetlen ember volt, aki végig Chopint játszott.",
        "Matild nem tud zongorázni, és délután óta nem lépett be a könyvtárba.",
        "Bakos Ilona soha életében nem tanult zongorázni."
      ],
      choices: ["Szalon", "Konyha", "Üvegház", "Emeleti szobák", "Könyvtár"],
      answer: { lukacs: "Konyha", szirmai: "Üvegház", gabor: "Szalon", matild: "Emeleti szobák", ilona: "Könyvtár" },
      hints: [
        "Kezdd azokkal, akiket tanú igazol: Lukáccsal és az orvossal.",
        "A szalonban a zongorista volt. Matild és Ilona nem tud zongorázni, így csak egyvalaki maradhatott ott.",
        "Matild sem a szalonban, sem a könyvtárban nem lehetett. Ami utoljára marad, az Ilonáé."
      ]
    },
    cipher: {
      type: "caesar", title: "A titkosírás", reward: "jegyzet", shift: 7,
      plain: "UVEGHAZ, HARMADIK POLC. KONYAK HAROMNEGYED TIZ ELOTT.",
      body: `<p>Bakos Ilona kis dolgozószobájában, a gépelt levelek alatt egy zsebnaptár. Az október 9-i oldalon egyetlen értelmetlen sor áll. Úgy tűnik, minden betűt ugyanannyival tolt el az ábécében. Forgasd a tárcsát, amíg a szöveg értelmet nyer.</p>`,
      hints: [
        "Ez Caesar-rejtjel: minden betű ugyanannyi hellyel csúszott arrébb az ábécében.",
        "Figyeld a rövid szavakat: a négybetűs szó egy bútordarab, amire dobozokat raknak.",
        "Az eltolás 5 és 10 közötti páratlan szám."
      ]
    }
  },

  accusation: {
    questions: [
      { id: "who", legend: "Ki a gyilkos?", name: "a tettes", from: "suspects", answer: "ilona" },
      { id: "how", legend: "Mivel ölt?", name: "az eszköz", answer: "cian",
        options: [{ v: "morfium", label: "Morfium az orvosi táskából" }, { v: "cian", label: "Cián az üvegházi darázsirtóból" }, { v: "altato", label: "Altató Matild éjjeliszekrényéről" }] },
      { id: "why", legend: "Miért?", name: "az indíték", answer: "hamisitas",
        options: [{ v: "orokseg", label: "Az örökség megszerzése" }, { v: "feltekenyseg", label: "Féltékenység, megcsalt házasság" }, { v: "hamisitas", label: "A festményhamisítás leleplezésének megakadályozása" }, { v: "adossag", label: "Felhalmozott kártyaadósság" }] }
    ]
  },

  ending: {
    heading: "Bakos Ilona volt az.",
    paragraphs: [
      "Négy éven át Ilona kezelte a báró gyűjteményének papírjait. Lassan, képről képre cserélte az eredetieket ügyes hamisítványokra, az eredetieket pedig eladta, a nyugtákat a saját Remingtonján gépelve.",
      "A báró rájött a csalásra, és levelet írt a rendőrségnek: másnap meg akarta nevezni a tettest. Ilona tudta, hogy csak egy estéje maradt. Délután elvette a cianidot az üvegház harmadik polcáról, este pedig, amíg a báró a hallban telefonált, a könyvtárba lopózott és a konyakba szórta. Azt hazudta, hogy fent gépelt, de Matild egész este egyetlen kopogást sem hallott.",
      "A titkosított jegyzet, a hamis nyugta és a hazug alibi együtt döntötte el az ügyet. Dr. Szirmai morfiuma, Gábor adósságai és Matild levele csak a ház többi titka voltak."
    ]
  }
});
