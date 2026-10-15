/* 2. ügy — Halál az Arany Griffben (közepes) */
(window.MM_CASES = window.MM_CASES || []).push({
  id: "arany-griff",
  fx: "rain",
  sound: "city",
  sounds: { bar: "jazz" },
  cover: "hotel",
  number: 2,
  title: "Halál az Arany Griffben",
  meta: "Budapest · 1934. március 3. · Ügyszám 1934/88",
  teaser: "Egy ünnepelt színházi impresszáriót holtan találnak belülről bezárt szállodai szobájában. A kulcs a zárban, az ablak a negyediken. Hogyan jutott ki a gyilkos?",
  difficulty: "Közepes",

  intro: {
    eyebrow: "Budapesti Államrendőrség · Bűnügyi osztály",
    heading: "Vándor Elemér halála a 412-es szobában",
    lead: "1934. március 3-án, szombat éjjel fél tizenkettőkor a Hotel Arany Griff éjszakai portása pótkulccsal nyitotta ki a 412-es szobát. Vándor Elemér, a Pesti Varieté igazgatója holtan feküdt a szőnyegen, mellette a saját bronz díjszobra.",
    body: "Az ajtó belülről volt bezárva, a kulcs a zárban. Az ablak alatt negyven méter mélység és a Duna-part. A rendőrség zárt szobás rejtélyről beszél. Te tudod, hogy ilyen nincs: valaki kiment azon a szobán, csak még nem tudjuk, hol.",
    start: "szoba412"
  },

  suspects: [
    { id: "lili", look: { hair: "bob", hat: "headband", clothes: "dress", acc: ["earrings"], lips: true }, name: "Fodor Lili", role: "Primadonna, 27 éves. Vándor sztárja, és a pletykák szerint több is annál.",
      stmt: "„Elemér meg akart szabadulni tőlem, ezt mindenki tudta. De egész este a szobámban voltam. Tizenegy után Bécsbe telefonáltam, fél tizenkettőkor pedig őt hívtam, mert nem vette fel. Akkor szóltam a portásnak.”" },
    { id: "hartmann", look: { hair: "slick", clothes: "suit", acc: ["monocle", "mustache"] }, name: "Hartmann Viktor", role: "Üzlettárs, 48 éves. A varieté pénzügyeit viszi.",
      stmt: "„Fél tizenegytől éjfélig a bárban ültem, a pultos mindent látott. A varieté könyvei rendben vannak, ha erre gondol. Harminc éve dolgozunk együtt Elemérrel.”" },
    { id: "margit", look: { hair: "bun", hat: "maid", clothes: "maid", lips: true }, name: "Szabó Margit", role: "Szobalány, 22 éves. Ő takarítja a negyedik emeletet.",
      stmt: "„A tompa puffanást én hallottam, a vasalószobából. Nem mentem be, féltem. A vendégek dolgaihoz soha nem nyúlok.”" },
    { id: "ferenczy", look: { hair: "short", hat: "cap", clothes: "uniform", acc: ["mustache"] }, name: "Ferenczy Pál", role: "Éjszakai portás, 56 éves. Húsz éve áll a pult mögött.",
      stmt: "„Egész este a pultnál álltam. A negyediken csak törzsvendégek laknak, idegen ma este nem ment fel, arra mérget veszek.”" },
    { id: "kardos", look: { hair: "short", hat: "fedora", clothes: "trench" }, name: "Kardos Endre", role: "Fiatal drámaíró, 31 éves. Vándor egyszer bemutatott tőle egy darabot.",
      stmt: "„Az egész estét a New York kávéházban töltöttem, a darabomon dolgoztam. Éjfél után értem haza, száraz lábbal: az eső csak hajnalban eredt el. Vándorral évek óta nem beszéltem.”" }
  ],

  clues: {
    eso: { t: "Az eső", src: "Porta", x: "A portás szerint háromnegyed tizenegykor szakadt le az eső, és éjfélig zuhogott. Az ernyőtartó azóta tele csöpögő esernyőkkel." },
    holttest: { t: "A holttest és a díjszobor", src: "412-es szoba", x: "Vándort egy bronz Pallas-szobor ütése ölte meg, a díjat 1930-ban kapta. A szobrot letörölték. Az ajtó belülről zárva, a kulcs a zárban. A szőnyegen nedves, sáros nyomok, pedig Vándor egész este ki sem lépett a szobájából." },
    szerzodes: { t: "Az ellopott darab", src: "412-es szoba · széf", x: "A széfben „Az utolsó tánc” kézirata. A borítón Vándor neve áll, de alatta, kivakarva, még olvasható az eredeti szerző: Kardos Endre. A darab most fut telt házzal, és minden bevétel Vándoré." },
    ido: { t: "Az este időrendje", src: "Lift és lépcsőház", x: "Az este sorrendje: Vándor pezsgőt rendel, a pincér felviszi, a lift egy nedves kabátos férfit visz a negyedikre, tompa puffanás a 412-ből, reteszcsattanás odébb a folyosón, Lili hiába telefonál, a portás benyit." },
    liftes: { t: "A liftesfiú vallomása", src: "Lift és lépcsőház", x: "„Csuromvizes volt a kabátja, mintha végiggyalogolt volna a rakparton. A kalapját a szemébe húzta, és egy kopott bőr irattartót szorongatott. A negyediken szállt ki, de nem ment a 412 felé, hanem jobbra fordult.”" },
    derkes: { t: "Derkes Andor nem létezik", src: "Porta · vendégkönyv", x: "A 414-es szobát aznap este készpénzért egy „Derkes Andor” vette ki, és soha többé nem jelent meg a pultnál. A név pontosan Kardos Endre betűiből áll." },
    kijarat: { t: "Az összekötő ajtó", src: "414-es szoba", x: "A 412 és 414 közötti összekötő ajtón a 412-es oldali retesz nyitva, a 414-es oldali zárva. A gyilkos a szomszéd szobából jött át, és oda is tért vissza, majd a saját oldalán bereteszelte az ajtót. A 414-es szekrényben egy kopott, nedves bőr irattartó." },
    tavirat: { t: "Vándor táviratpiszkozata", src: "Lili szobája", x: "„Fodor kisasszony szerződését azonnali hatállyal felbontom, kártérítési per következik.” Vándor táviratának másolata Lili éjjeliszekrényén." },
    fokonyv: { t: "A titkos főkönyv", src: "Bár", x: "Hartmann aktatáskájában egy második főkönyv: két év alatt negyvenezer pengő tűnt el a varieté kasszájából." },
    mandzsetta: { t: "Az arany mandzsettagombok", src: "Személyzeti folyosó", x: "Margit kötényzsebében Vándor monogramos arany mandzsettagombjai." }
  },

  contradictions: [
    {"id": "c-kardos", "suspect": "kardos", "clue": ["derkes"], "reveal": "Kardos sokáig hallgat. „Igen, én vettem ki a szobát. Beszélni akartam vele, az ajtón át. Nem engedett be. Aztán elmentem.”"},
    {"id": "c-kardos2", "suspect": "kardos", "clue": ["eso", "liftes"], "reveal": "Kardos keze ökölbe szorul: „Hát jó, eláztam. Gyalog jöttem a kávéházból. Ettől még nem vagyok gyilkos.”"},
    {"id": "c-hartmann", "suspect": "hartmann", "clue": ["fokonyv"], "reveal": "Hartmann leveszi a szemüvegét: „Kölcsönvettem. Vissza akartam tenni. Elemér nem tudott róla. De a bárból egy percre sem mozdultam, a pultos megmondja.”"},
    {"id": "c-margit", "suspect": "margit", "clue": ["mandzsetta"], "reveal": "Margit sírva fakad: „Délután vettem el, takarításkor. Annával voltam a vasalóban, amikor puffant, ő is megmondja.”"},
    {"id": "c-ferenczy", "suspect": "ferenczy", "clue": ["derkes"], "reveal": "Ferenczy izzad: „Készpénzzel fizetett, jó borravalót adott, nem kérdeztem semmit. Azt mondta, Derkes. Nem gondoltam, hogy baj lesz belőle.”"},
    {"id": "c-lili", "suspect": "lili", "clue": ["tavirat"], "lie": false, "reveal": "Lili felszegi a fejét: „Igen, perrel fenyegetett. De a központ megmondja: tizenegytől húsz percen át Béccsel beszéltem.”"}
  ],

  locations: [
    { id: "szoba412", name: "412-es szoba", desc: "Bordó tapéta, félig kiürült pezsgősüveg, a kandallópárkányon színlapok. Itt történt.",
      items: [{ clue: "holttest", label: "A holttest", text: "Vándor a kandalló előtt fekszik, mellette a bronz Pallas." }],
      puzzle: "szef" },
    { id: "lift", name: "Lift és lépcsőház", desc: "Kovácsoltvas liftkalitka, egyenruhás liftesfiú, a lépcsőn vörös szőnyeg.",
      items: [{ clue: "liftes", label: "A liftesfiú", text: "Tizenhat éves, és nagyon szeretne segíteni." }],
      puzzle: "idorend" },
    { id: "porta", name: "Porta", desc: "Mahagóni pult, kulcstábla, nyitott vendégkönyv. Ferenczy Pál idegesen igazgatja a nyakkendőjét.",
      items: [{ clue: "eso", label: "Az ernyőtartó", text: "Tele csöpögő esernyőkkel, alatta tócsa." }],
      puzzle: "anagramma" },
    { id: "szoba414", name: "414-es szoba", desc: "A 412 szomszédja. Bevetetlen ágy, a hamutartóban egy félig szívott cigaretta.",
      requires: "anagramma", puzzle: "kijarat" },
    { id: "lili", name: "Lili szobája", desc: "Virágcsokrok, parfümillat, az éjjeliszekrényen papírok.",
      items: [{ clue: "tavirat", label: "Az éjjeliszekrény", text: "Egy gyűrött táviratmásolat." }] },
    { id: "bar", name: "Bár", desc: "Jazz zongora, cigarettafüst, Hartmann aktatáskája a bárszéken.",
      items: [{ clue: "fokonyv", label: "Hartmann aktatáskája", text: "Nyitva maradt, kilóg belőle egy vastag főkönyv." }] },
    { id: "szemelyzet", name: "Személyzeti folyosó", desc: "Szennyeskosarak, vasalódeszkák, a falon a szobalányok kötényei.",
      items: [{ clue: "mandzsetta", label: "Margit köténye", text: "Valami fémes koccan a zsebében." }] }
  ],

  puzzles: {
    szef: {
      type: "code", title: "A széf", reward: "szerzodes", answers: ["1924"], length: 4,
      body: `<p>A falba süllyesztett széf négyjegyű számzárral nyílik. Hartmann szerint Vándor minden kódot arra az évre állított, amikor a közönség először állva tapsolta.</p>
<p>A kandallópárkányon három bekeretezett színlap:</p>
<div class="typed">A KÉK LEPKE — Anno MCMXXII
(három előadás után levéve)

PESTI CSILLAGOK — Anno MCMXXIV
(„a közönség felállva ünnepelt” — Pesti Hírlap)

AZ UTOLSÓ TÁNC — Anno MCMXXXIII
(kétszázadik előadás)</div>`,
      wrong: "A tárcsa visszaugrik. Nem ez az év.",
      hints: [
        "Nem az első bemutató a kulcs, és nem is a leghosszabb sorozat. Mikor tapsolt állva a közönség?",
        "Római számok: M = 1000, CM = 900, XX = 20, IV = 4."
      ]
    },
    idorend: {
      type: "order", title: "Az este időrendje", reward: "ido",
      body: `<p>A szálloda dolgozói mind láttak valamit, de senki sem figyelt az órára. Rakd sorba az eseményeket a vallomások alapján.</p>`,
      facts: [
        "A konyhai cédula szerint Vándor 22:40-kor pezsgőt rendelt. A pincér húsz perc múlva vitte fel.",
        "A liftesfiú a nedves kabátos férfit tíz perccel azután vitte fel, hogy a pincér lejött a negyedikről.",
        "Margit szerint a puffanás akkor hallatszott, amikor a lift már rég újra lent járt.",
        "Margit szerint a puffanás után alig egy perccel retesz csattant, de nem a 412 ajtaján, hanem odébb.",
        "Lili azt mondja, negyedóra csengetés és várakozás után szólt a portásnak.",
        "A portás akkor ment fel, amikor Lili lerohant hozzá."
      ],
      items: [
        { id: "rendel", text: "Vándor pezsgőt rendel a szobájába" },
        { id: "pincer", text: "A pincér felviszi a tálcát, Vándor ingerülten átveszi" },
        { id: "lift", text: "A lift felvisz egy nedves kabátos férfit a negyedikre" },
        { id: "puff", text: "Tompa puffanás hallatszik a 412-ből" },
        { id: "retesz", text: "Reteszcsattanás hallatszik a folyosó végéről" },
        { id: "telefon", text: "Lili hiába hívja telefonon a 412-t" },
        { id: "porta", text: "A portás pótkulccsal kinyitja a 412-t" }
      ],
      initial: ["telefon", "puff", "porta", "rendel", "retesz", "lift", "pincer"],
      answer: ["rendel", "pincer", "lift", "puff", "retesz", "telefon", "porta"],
      hints: [
        "Kezdd a pezsgővel: azon van időpont. A többit ehhez képest helyezd el.",
        "A gyilkosság a lift után történt, a felfedezés pedig a két utolsó lépés."
      ]
    },
    anagramma: {
      type: "text", title: "A vendégkönyv", reward: "derkes", answers: ["Kardos Endre"], placeholder: "Vezetéknév Keresztnév",
      body: `<p>Ferenczy kelletlenül megmutatja a vendégkönyvet. A 414-es szobát aznap este egy bizonyos úr vette ki, aki készpénzzel fizetett, és soha többé nem jelent meg a pultnál:</p>
<div class="typed">414 · DERKES ANDOR · Budapest · 1 éj · fizetve</div>
<p>A portás vállat von: „Különös név. Mintha valaki csak összekeverte volna a betűket.” Kinek a valódi neve rejtőzik benne?</p>`,
      wrong: "Nem jön ki a betűkből. Számold meg őket újra.",
      hints: [
        "Anagramma: ugyanaz a tizenegy betű, más sorrendben. Egy gyanúsított nevére kell gondolni.",
        "Írd fel a betűket: D, E, R, K, E, S, A, N, D, O, R. Melyik gyanúsított nevében van két D és két R?"
      ]
    },
    kijarat: {
      type: "choice", title: "Az út kifelé", reward: "kijarat", answer: "B",
      body: `<p>A 412-es szoba ajtaja belülről volt bezárva, a kulcs a zárban. A gyilkosnak valahogy ki kellett jutnia. Hasonlítsd össze, amit a három lehetséges útvonalon találtál.</p>`,
      options: [
        { v: "A", label: "Az ablakon át a párkányra", sample: "Az ablak belülről bezárva. A keskeny párkányon sorban állnak a muskátlis cserepek, a nedves koromréteg érintetlen." },
        { v: "B", label: "Az összekötő ajtón a 414-be", sample: "A 412-es oldalon a retesz nyitva, a 414-es oldalon zárva. A küszöbön nedves sárfolt." },
        { v: "C", label: "A folyosói ajtón, pótkulccsal", sample: "A pótkulcs egész este a portán lógott a táblán, a portás csak 23:35-kor vette le." }
      ],
      confirm: "Erre ment ki",
      wrong: {
        A: "A korom érintetlen, a cserepek a helyükön. Erre senki sem járt.",
        C: "A pótkulcs a porta tábláján lógott, amíg a portás fel nem vitte."
      },
      hints: [
        "Az a helyes út, ahol a nyomok mozgást mutatnak, nem érintetlenséget.",
        "Egy retesz két oldalról is zárható. Melyik oldalon maradt nyitva?"
      ]
    }
  },

  accusation: {
    questions: [
      { id: "who", legend: "Ki a gyilkos?", name: "a tettes", from: "suspects", answer: "kardos", proof: ["derkes", "kijarat", "liftes", "eso"] },
      { id: "how", legend: "Hogyan hagyta el a szobát?", name: "a menekülés útja", answer: "ajto", proof: ["kijarat"],
        options: [{ v: "ablak", label: "Az ablakon és a párkányon át" }, { v: "ajto", label: "Az összekötő ajtón a 414-es szobába" }, { v: "potkulcs", label: "A folyosón át, a portás pótkulcsával" }] },
      { id: "why", legend: "Miért ölt?", name: "az indíték", answer: "darab", proof: ["szerzodes"],
        options: [{ v: "szerzodes", label: "A felbontott szerződés és a per" }, { v: "sikkasztas", label: "A sikkasztás eltitkolása" }, { v: "darab", label: "Vándor ellopta és a sajátjaként vitte színre a darabját" }, { v: "lopas", label: "Rajtakapták egy lopáson" }] }
    ]
  },

  ending: {
    heading: "Kardos Endre volt az.",
    paragraphs: [
      "Négy éve Kardos odaadta Vándornak élete első darabját, „Az utolsó tánc”-ot. Vándor elutasította, aztán két évvel később a saját neve alatt mutatta be. A darab azóta telt házzal fut, Kardos pedig egy albérleti szobában írja a következőt.",
      "Aznap este Kardos esőben gyalogolt át a városon, és Derkes Andor néven kivette a 412 melletti szobát. Kopogott az összekötő ajtón. Vándor kinyitotta, mert azt hitte, a pincér jön vissza. A veszekedés után Kardos felkapta a bronz díjszobrot, a pénzt és a hírnevet jelképező Pallast.",
      "Visszament a 414-be, és a saját oldalán bereteszelte az ajtót. A 412-es oldali retesz nyitva maradt, és ezzel a zárt szoba rejtélye megoldódott. A betűkkel játszó név, a nedves irattartó és a kivakart kézirat elárulta. Lili pere, Hartmann sikkasztása és Margit lopása csak a szálloda többi titka volt."
    ]
  }
});
