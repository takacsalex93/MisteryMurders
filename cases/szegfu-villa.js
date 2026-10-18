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
      stmt: "„Vacsora után a szalonban {{zongoráztam|zongorazott}}, Chopint, egész este. Délután volt egy kis vitám a bácsikámmal a könyvtárban, az {{örökségről|orokseg}}, de este oda sem néztem.”" },
    { id: "szirmai", look: { hair: "short", clothes: "suit", acc: ["glasses", "mustache"] }, name: "Dr. Szirmai Ottó", role: "Háziorvos, 52 éves. Régi barát.",
      stmt: "„Fél tíztől kint {{szivaroztam|szivarozott}} az üvegháznál, Matild asszony nem tűri a füstöt. Tízkor benéztem hozzá, aludt. A táskám egész este a hallban volt, nem hiányzik belőle semmi.”" },
    { id: "ilona", look: { hair: "bun", clothes: "blouse", acc: ["glasses"], lips: true }, name: "Bakos Ilona", role: "A báró titkárnője, 31 éves. Négy éve kezeli a gyűjtemény papírjait.",
      stmt: "„Vacsora után felmentem a szobámba, és egész este gépeltem: a báró úr leveleit tisztáztam le. Lefelé egyszer sem jöttem.”" },
    { id: "lukacs", look: { hair: "bald", clothes: "bowtie", acc: ["mustache"] }, name: "Lukács János", role: "Komornyik, 61 éves. Harminc éve szolgálja a családot.",
      stmt: "„Fél tízkor kitöltöttem a báró úr konyakját a könyvtárban, ahogy minden este, aztán visszamentem a konyhába az ezüsthöz. Délután Gábor úrral együtt kerestük a mandzsettagombját a könyvtárban, a karosszék alatt is, de nem találtuk.”" }
  ],

    words: {
    baro: ["a báró", "személy"], kertesz: ["a kertész", "személy"],
    cian: ["cián", "tárgy"], morfium: ["morfium", "tárgy"], konyak: ["konyak", "tárgy"], mandzsetta: ["mandzsettagomb", "tárgy"], continental: ["Continental írógép", "tárgy"], remington: ["Remington írógép", "tárgy"],
    uveghaz: ["üvegház", "hely"], konyvtar: ["könyvtár", "hely"], hall: ["hall", "hely"], titkarsag: ["titkárság", "hely"], szalon: ["szalon", "hely"],
    t2130: ["21:30", "idő"], t2155: ["21:55", "idő"], t22: ["tíz óra", "idő"], delutan: ["délután", "idő"],
    telefonal: ["telefonált", "tett"], viragvagas: ["virágot vágott", "tett"], zongorazott: ["zongorázott", "tett"], szivarozott: ["szivarozott", "tett"],
    hamisitas: ["festményhamisítás", "indíték"], orokseg: ["örökség", "indíték"], adossag: ["adósság", "indíték"], valas: ["válás", "indíték"]
  },

  clues: {
    holttest: { t: "Keserűmandula-szag", src: "Könyvtár", x: "A báró a karosszékben ül, előtte a félig kiürült {{konyakospohár|konyak}}. A pohárból enyhe keserűmandula-szag árad. Dr. Szirmai szerint {{ciánmérgezés|cian}}, a halál azonnal beállt, {{tíz óra|t22}} körül." },
    mandzsetta: { t: "Mandzsettagomb a karosszék alatt", src: "Könyvtár", x: "A karosszék alatt, a pohár közelében egy arany {{mandzsettagomb|mandzsetta}}, K. G. monogrammal. Fényes, por nem ül rajta, pedig a szőnyeg alatta poros." },
    telefon: { t: "A telefonbeszélgetés", src: "Hall", x: "A posta központjának kezelőnője szerint {{a báró|baro}} {{21:30|t2130}}-tól {{21:55|t2155}}-ig a {{halli|hall}} telefonon Budapesttel {{beszélt|telefonal}}. A beszélgetés végén azt mondta: „Holnap mindent elmondok.”" },
    taska: { t: "Az orvosi táska", src: "Hall", x: "Dr. Szirmai táskájában a bársonytartó egyik helye üres: egy {{morfiumampulla|morfium}} hiányzik. Cián vagy cianidtartalmú szer nincs a táskában, és a nyilvántartásában sem szerepel." },
    zalog: { t: "Zálogcédulák", src: "Vendégszoba", x: "Gábor kabátzsebében három budapesti zálogcédula: aranyóra, egy cigarettatárca és egy ezüstfejű sétabot. Az utolsót két hete adta zálogba. Mellette egy uzsorás levele: „Az {{adósságát|adossag}} hétfőig rendezze.”" },
    levelk: { t: "Szerelmes levél", src: "Emeleti szobák", x: "Matild fiókjában egy aláíratlan, rajongó hangú levél egy budapesti festőtől: „Ha {{elválsz|valas}} tőle, tavasszal Párizsban várlak.”" },
    ilonaszoba: { t: "Ilona szobája", src: "Emeleti szobák", x: "Ilona emeleti szobájában ágy, szekrény, mosdó és egy kis asztal. Írógép nincs, és soha nem is volt: a házban csak a földszinti {{titkárságon|titkarsag}} gépelnek." },
    kertesz: { t: "A kertész vallomása", src: "Üvegház", x: "{{A kertész|kertesz}} szerint aznap {{délután|delutan}} egyetlen ember járt az üvegházban: a titkárnő kisasszony, aki {{virágot vágott|viragvagas}} a báró asztalára. Este fél tíz és tíz között valaki a bejáratnál {{szivarozott|szivarozott}}, de be nem ment." },
    darazs: { t: "Az üvegházi darázsirtó", src: "Üvegház", x: "Az {{üvegház|uveghaz}} harmadik polcán álló „Darázsirtó — MÉREG” feliratú bádogdoboz (kálium-{{cianid|cian}}) fedele lazán áll, a porban friss nyom. A polc előtt keskeny, magas sarkú női cipő lenyomata." },
    level: { t: "A báró el nem küldött levele", src: "Könyvtár · íróasztal", x: "„Tekintetes Rendőrkapitányság! Gyűjteményem öt festményét az elmúlt két évben {{hamisítványokra cserélték|hamisitas}}, az eredetieket eladták. Az eladási nyugták a házban, írógépen készültek. Holnap, október 10-én személyesen megnevezem a tettest. — Kendeffy Aurél”" },
    gep: { t: "A hamis nyugta írógépe", src: "Titkárság", x: "A hamis nyugta nem a titkárság új {{Remingtonján|remington}} készült, hanem a zárt szekrényben tartott régi {{Continentalon|continental}}. A szekrény kulcsa csak Ilonánál van. A szekrényben ugyanerről a gépről még két nyugta: Mednyánszky 6 000 és Szinyei 9 000 pengőről." },
    alibi: { t: "Ki hol volt 21:30 és 22:00 között?", src: "Szalon · tanúvallomások", x: "A vallomásokból összerakott idővonal fél tíz és tíz között: Lukács a konyhában, Dr. Szirmai az üvegháznál, Gábor a {{szalonban|szalon}}, Matild az emeleten, Bakos Ilona a {{könyvtárban|konyvtar}}." },
    jegyzet: { t: "Ilona titkosított jegyzete", src: "Emeleti szobák · zsebnaptár", x: "Megfejtve: „{{Üvegház|uveghaz}}, harmadik polc. Konyak fél tíz után, amíg {{telefonál|telefonal}}.” Ilona zsebnaptárából, a gyilkosság napjáról." },
    kereses: { t: "A délutáni keresés", src: "Gábor vallomása", x: "Gábor és Lukács {{délután|delutan}}, a veszekedés után az egész könyvtárat átkutatta az elveszett mandzsettagomb után, a karosszék alatt is. Akkor nem volt ott." },
    hamu: { t: "Égett papír a kályhában", src: "Titkárság", x: "A titkárság kályhájában egy félig elégett gépelt lap: „…ánszky, olaj, vászon… 6 0…” A folyosó szőnyegén nedves, keskeny női cipőnyom vezet a titkárság ajtajáig." },
    ujj: { t: "Ujjlenyomat a darázsirtón", src: "Üvegház", x: "A darázsirtó fedelén talált részleges ujjlenyomat azzal a nyommal egyezik, amelyet Lukács a titkárnő vacsorapoharáról vett le." }
  },
  contradictions: [
    { id: "c-ilona", suspect: "ilona", clue: ["ilonaszoba", "alibi"],
      reveal: "Ilona elsápad: „Jó… nem gépeltem. Lent voltam, a könyvtárban rendeztem a gyűjtemény papírjait. De a konyakhoz hozzá sem nyúltam!”" },
    { id: "c-gabor", suspect: "gabor", clue: ["mandzsetta"], lie: false, gives: "kereses",
      reveal: "Gábor meglepődik: „Ez az enyém, délután veszett el a veszekedésnél. Lukáccsal az egész könyvtárat felforgattuk érte, a karosszék alatt is néztük.”" },
    { id: "c-szirmai", suspect: "szirmai", clue: ["taska"],
      reveal: "Szirmai lesüti a szemét: „Matild asszonynak adtam kilenckor, könyörgött, hogy aludni akar. Nem jegyeztem fel. Ha kitudódik, elveszítem az engedélyemet.”" },
    { id: "c-matild", suspect: "matild", clue: ["levelk"], lie: false,
      reveal: "Matild elvörösödik: „Igen, el akartam válni tőle, ezért veszekedtünk. Ha meg akartam volna ölni, minek írtam volna délután az ügyvédemnek?”" }
  ],

  locations: [
    { id: "konyvtar", name: "Könyvtár", desc: "Bőrfotelek, tölgyfa polcok, odakint vihar. A báró itt halt meg.",
      look: "Bőrfotelek, tölgyfa polcok, a magas ablakokon dobol az eső. A báró [[a karosszékben ül, előtte a kisasztalon egy metszett konyakospohár|holttest]], mintha csak elaludt volna.\n\nA kandallóban [[kihunyó parázs|kandallo]]. A falon, a polcok között [[egy üres képkeret|keret]]. Az íróasztal fiókján négyjegyű számzár. A villámfényben [[a karosszék lába mellett valami megcsillan a szőnyegen|mandzsetta]].",
      decoys: { kandallo: "Csak hamu és egy félig elégett fahasáb. Ma este itt senki sem égetett papírt.", keret: "A keret alatt világosabb a tapéta. Lukács szerint a báró a múlt héten restaurátorhoz küldte a képet." },
      items: [
        { clue: "holttest", label: "A holttest és a pohár", text: "Közelebb hajolsz a pohárhoz." },
        { clue: "mandzsetta", label: "A karosszék alatt", text: "Letérdelsz a szőnyegre." }],
      puzzle: "desk" },
    { id: "hall", name: "Hall", desc: "Márványpadló, állóóra, a falon a ház egyetlen telefonja.",
      look: "Márványpadló, ketyeg az állóóra. A falon a ház egyetlen [[telefonja, mellette a postai kapcsolási jegyzék|telefon]]. A fogason [[Dr. Szirmai fekete orvosi táskája|taska]] és [[egy ázott esernyő|ernyo]]. Az [[állóóra|ora]] mutatói tizenegy felé járnak.",
      decoys: { ernyo: "A doktor esernyője, még csöpög róla a víz. Este tényleg kint járt vele.", ora: "Öt percet késik. Lukács szerint mindig is késett, a báró így szerette." },
      items: [
        { clue: "telefon", label: "A telefon", text: "Felhívod a postai központot. A kezelőnő emlékszik, mikor kapcsolta a bárót." },
        { clue: "taska", label: "Dr. Szirmai táskája", text: "Kinyitod az orvos táskáját." }] },
    { id: "titkarsag", name: "Titkárság", desc: "Szűk iroda a földszinten: iratszekrények, egy új Remington és egy zárt szekrény.",
      look: "Szűk iroda: iratszekrények, az asztalon [[egy új Remington|rem]], a sarokban egy zárt szekrény. [[A papírkosár|kosar]] üres, a [[kályha|hamu]] még langyos.",
      decoys: { rem: "Tegnap cserélték benne a festékszalagot. A próbasort lent találod.", kosar: "Üres. Valaki ma este kiürítette, pedig a takarítónő csak hétfőn jön." },
      items: [{ clue: "hamu", label: "A kályha", text: "Kinyitod a kályha ajtaját." }],
      requires: "desk", puzzle: "type" },
    { id: "szalon", name: "Szalon", desc: "Itt gyűltek össze a vendégek a rendőrség érkezése előtt. A zongora fedele nyitva.",
      look: "Itt várnak a vendégek, senki sem szól. A [[zongora fedele nyitva|zongora]], a kottatartón Chopin-noktürn. [[A dohányzóasztalon egy hamutál|hamutal]], benne cigarettavégek.",
      decoys: { zongora: "A kottán ceruzajelek ugyanannál a futamnál, kétszer is.", hamutal: "Cigaretta, nem szivar. Gábor márkája." },
      puzzle: "alibi" },
    { id: "emelet", name: "Emeleti szobák", desc: "Hálószobák a lépcső tetején: a báróéké, a vendégeké és a titkárnőé.",
      look: "Hosszú folyosó, a lépcső tetején a hálószobák. [[Matild szobájában a fiókos szekrény félig nyitva|levelk]], illatosított levélpapír az asztalon. [[Ilona szobája|ilonaszoba]] rendezett, szinte üres, a párna alól egy zsebnaptár sarka kandikál ki.\n\nA báró hálójában [[a gyógyszeres szekrény|gyogyszer]] ajtaja nyitva. A folyosó végén [[egy nyitott ablak|ablak]] csapkod a szélben.",
      decoys: { gyogyszer: "Szívcseppek és aszpirin. Méregnek nyoma sincs.", ablak: "Befújt az eső, a párkány vizes. Odalent sötét kert, létrának nyoma sincs." },
      items: [
        { clue: "levelk", label: "Matild fiókja", text: "Egy illatosított boríték a fehérnemű alatt." },
        { clue: "ilonaszoba", label: "Ilona szobája", text: "Körülnézel a titkárnő szobájában." }],
      puzzle: "cipher" },
    { id: "vendeg", name: "Vendégszoba", desc: "Gábor szobája, gyűrött ágy, a széken egy kabát.",
      look: "Gábor szobája. Gyűrött ágy, a széken [[egy kabát, a belső zsebéből papírok kandikálnak ki|zalog]]. Az éjjeliszekrényen [[egy félig üres whiskysüveg|whisky]], a földön [[egy nyitott bőrönd|borond]].",
      decoys: { whisky: "Olcsó skót whisky. Gábor ízlése szerényebb, mint a nagybátyjáé.", borond: "Ingek, borotva és egy kölcsönkért frakk. Gábor nem tervezett hosszú maradást." },
      items: [{ clue: "zalog", label: "Gábor kabátja", text: "Átnézed a kabát zsebeit." }] },
    { id: "uveghaz", name: "Üvegház", desc: "Párás meleg, orchideák, a sarokban kerti szerszámok és vegyszerek.",
      look: "Párás meleg, orchideák, a sarokban kerti szerszámok. [[A vegyszerespolcon|darazs]] bádogdobozok sorakoznak, a harmadik polcon egy koponyás címke. Az öreg [[kertész a viharban is a palántáit félti|kertesz]].\n\nA bejárat előtt [[szivarhamu a kavicson|szivar]]. Az asztalon [[egy csokor frissen vágott orchidea|orchidea]].",
      decoys: { szivar: "Havannai szivar hamuja. Valaki sokáig állt itt, de a nedves kavicson befelé nem vezet lábnyom.", orchidea: "Délután vágták, a báró asztalára szánták. A metszőolló még itt hever." },
      items: [
        { clue: "darazs", label: "A vegyszerespolc", text: "Megnézed a harmadik polcot." },
        { clue: "kertesz", label: "A kertész", text: "Megkérdezed a kertészt, ki járt ma itt." }],
      puzzle: "ujj" }
  ],

    deductions: [
    { id: "d-ido", from: ["holttest", "telefon"], t: "A méreg ideje", x: "A báró azonnal meghalt, tíz óra körül, és 21:55-ig telefonált. A mérget tehát 21:30 és 21:55 között tették a konyakba, amíg a pohár őrizetlenül állt.",
      text: "A mérget {} és {} között tették a pohárba, amelyben {} volt, amíg a báró a hallban {}.", b: ["t2130", "t2155", "konyak", "telefonal"] },
    { id: "d-mereg", from: ["darazs", "kertesz"], t: "Ki vitte el a mérget?", x: "Délután egyetlen ember járt az üvegházban, egy nő, és a darázsirtó előtt női cipő nyoma látszik. A cianidot délután a titkárnő vitte el.",
      text: "A cianidot {} vitte el ebből a helyiségből: {}. Akkor történt, amikor {} {}.", b: ["ilona", "uveghaz", "delutan", "viragvagas"] },
    { id: "d-alibi", from: ["ilonaszoba", "alibi"], t: "Ilona hamis alibije", x: "Ilona azt állítja, egész este a szobájában gépelt, de ott nincs írógép, és az idővonal szerint a könyvtárban volt, ahol a konyak állt.",
      text: "{} azt állítja, egész este a szobájában gépelt. Írógép azonban csak itt van: {}. Fél tíz után valójában itt volt: {}.", b: ["ilona", "titkarsag", "konyvtar"] },
    { id: "d-hamis", from: ["level", "gep"], t: "A hamisító", x: "A báró a hamis nyugták gépelőjét akarta másnap megnevezni. A nyugták a zárt szekrény Continentalján készültek, amelynek kulcsa csak Ilonánál van.",
      text: "A hamis nyugták írógépe: {}. Egyedül ő fér hozzá: {}. A báró ezt akarta másnap leleplezni: {}.", b: ["continental", "ilona", "hamisitas"] },
    { id: "d-csel", from: ["mandzsetta", "kereses"], t: "Elültetett mandzsettagomb", x: "Délután még nem volt a karosszék alatt, este már ott volt, por nélkül. Valaki a gyilkosság után tette oda, hogy Gáborra terelje a gyanút.",
      text: "A(z) {} {} még nem volt a karosszék alatt, este mégis por nélkül feküdt ott. Valaki odacsempészte, hogy a gyanú rá essen: {}.", b: ["mandzsetta", "delutan", "gabor"] }
  ],
  events: [
    { id: "aram", afterSolved: "desk", flash: true, gives: "hamu", title: "Kialszik a villany",
      text: "Abban a pillanatban, ahogy a fiók kinyílik, hatalmasat dörren az ég, és a villa elsötétül. A sötétben gyors léptek a folyosón, egy ajtó csapódik, valahol papír sercen.\n\nMire Lukács gyertyát hoz, a titkárság ajtaja résnyire nyitva, a kályhából füst száll. Valaki megpróbált eltüntetni valamit, és sietett." }
  ],

  fates: {
    matild: "A szerelmes levél és a délutáni veszekedés elég volt a vádnak. Matildot gyilkosságért elítélik, a festő hiába várja tavasszal Párizsban.",
    gabor: "A mandzsettagomb és a zálogcédulák meggyőzték az esküdteket. Gábort életfogytiglanra ítélik, az örökséget, amiért állítólag ölt, sosem kapja meg.",
    szirmai: "A hiányzó morfiumampulla mindent eldöntött. Dr. Szirmait elítélik, az orvosi kamara kizárja, és a villát soha többé nem látja.",
    lukacs: "Ő töltötte ki a konyakot, ez elég volt. Harminc év szolgálat után Lukács bilincsben hagyja el a házat, és a börtönben hal meg."
  },

  puzzles: {
        ujj: {
      type: "print", title: "Ujjlenyomat a fedélen", reward: "ujj", answer: "C", refLabel: "A darázsirtó fedeléről",
      body: `<p>A darázsirtó bádogfedelén egy részleges ujjlenyomat maradt. Lukács a vacsoraasztalról minden vendég poharát félretette, és korommal levette róluk a nyomokat. Melyik egyezik?</p>`,
      options: [
        { v: "A", label: "Matild pohara", seed: 11, type: "hurok" },
        { v: "B", label: "Gábor pohara", seed: 23, type: "orveny" },
        { v: "C", label: "Ilona pohara", seed: 37, type: "hurok" },
        { v: "D", label: "Dr. Szirmai pohara", seed: 41, type: "iv" }
      ],
      hints: ["Először a rajzolat típusát nézd: örvény, hurok vagy ív. Aztán a megszakadó vonalakat."]
    },
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
    story: "A gyilkos: {}. A mérget, a(z) {} nevű szert, délután vitte el innen: {}. Este, amíg a báró a hallban {}, a konyakba szórta.\nAzért ölt, mert a báró le akarta leplezni ezt: {}.\nA gyanút egy {} segítségével erre a személyre akarta terelni: {}.",
    b: ["ilona", "cian", "uveghaz", "telefonal", "hamisitas", "mandzsetta", "gabor"], who: [0]
  },

  plan: { w: 12, h: 8,
    rooms: { konyvtar: [0, 0, 4, 3], hall: [4, 0, 4, 3], szalon: [8, 0, 4, 3], titkarsag: [0, 3, 3, 2], _konyha: [3, 3, 3, 2, "Konyha"], uveghaz: [8, 4, 4, 2.6], emelet: [0, 5.8, 5, 2.2], vendeg: [5, 5.8, 3, 2.2] },
    doors: [[4, 1, 4, 2], [8, 1, 8, 2], [1, 3, 2, 3], [4.5, 3, 5.5, 3]],
    marks: [[8.1, 3.75, "kert · kavicsos út"], [6.2, 3.4, ""], [0.1, 5.6, "emelet ↑"]],
    note: "Földszint, fölötte az emelet. Az üvegház a kertben áll, a ház mögött." },
  carnation: { letter: "S", found: "Ilona zsebnaptárában, a kulcsszó mellett egy préselt fekete szegfű és egy gépelt cédula lapult. A jobb alsó sarkában pirossal bekarikázva egy betű.", note: "„A báró tudja. ⟪ido⟫ Holnap a rendőrségre megy. ⟪mereg⟫ A darázsirtó az üvegház harmadik polcán áll. ⟪vevo⟫ A Munkácsykat továbbra is én veszem. — F. Sz.”" },

  ending: {
    heading: "Bakos Ilona volt az.",
    paragraphs: [
      "Négy éven át Ilona kezelte a báró gyűjteményének papírjait. Képről képre cserélte az eredetieket ügyes hamisítványokra, az eredetieket eladta, a nyugtákat pedig a régi Continentalon gépelte, amelynek szekrénykulcsa csak nála volt.",
      "A báró rájött a csalásra, és levelet írt a rendőrségnek. Ilona tudta, hogy csak egy estéje maradt. Délután, amikor virágot vágott, elvette a cianidot az üvegház harmadik polcáról. Ugyanaznap délután felvette a földről Gábor elveszett mandzsettagombját is. Este, amíg a báró a hallban telefonált, a könyvtárba lopózott, a konyakba szórta a mérget, és a gombot a karosszék alá ejtette.",
      "Azt állította, egész este a szobájában gépelt, pedig a szobájában soha nem volt írógép. A mandzsettagomb Gáborra terelte volna a gyanút, csakhogy délután ő és Lukács pont ott keresték. Szirmai morfiuma, Gábor adósságai és Matild levele csak a ház többi titka voltak."
    ]
  }
});
