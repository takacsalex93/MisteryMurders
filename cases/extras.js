/* Kihallgatási kérdések és a Poirot-féle leleplezés jelenetei, ügyenként.
   interviews: gyanúsítottanként kérdések; az "after" nyommal vagy "afterConf" ellentmondással nyílnak meg.
   reveal: a leleplezés lépései; minden ellenvetésre a megfelelő bizonyítékkal kell felelni. */
window.MM_EXTRAS = {
  "szegfu-villa": {
    interviews: {
      matild: [
        { id: "m1", q: "Miért vesztek össze délután?", a: "„Azt mondtam neki, hogy elhagyom. Ő azt felelte, előbb rendbe tesz valamit a gyűjteményben, aztán beszélünk. Mindig a gyűjtemény volt az első.”" },
        { id: "m2", q: "Ki adott önnek gyógyszert este?", a: "„A doktor. Kilenckor hozta fel, egy kis pohár vízben. Utána már semmire sem emlékszem.”" },
        { id: "m3", q: "Ki ez a festő, akitől a levél jött?", after: "levelk", a: "„Nem tartozik önre. De ha tudni akarja: tavasszal Párizsba megyek hozzá. Élve akartam elhagyni Aurélt, nem holtan.”" }
      ],
      gabor: [
        { id: "g1", q: "Miről vitatkozott a bácsikájával?", a: "„Pénzről, mi másról. Azt mondta, egy fillért sem kapok tőle többet. Aztán valami hamisítványokról motyogott, de nem figyeltem.”" },
        { id: "g2", q: "Mikor veszett el a mandzsettagombja?", after: "mandzsetta", a: "„Délután, a veszekedés közben. Lukáccsal együtt kerestük négykor, a karosszék alatt is. Nem volt ott, erre megesküszöm.”" },
        { id: "g3", q: "Ki járt még délután a könyvtárban?", a: "„A titkárnő hordta ki-be a papírokat, mint mindig. Meg egy csokor virágot is hozott a bácsikámnak, az üvegházból.”" }
      ],
      szirmai: [
        { id: "s1", q: "Mit látott, amíg szivarozott?", a: "„Esőt. Meg a kertészt, ahogy a palántáit takargatja. Az üvegházba nem mentem be, ott fojtogat a vegyszerszag.”" },
        { id: "s2", q: "Ért a mérgekhez, doktor úr?", a: "„Annyira, mint bármelyik orvos. A keserűmandula-szag ciánt jelent. A kálium-cianidot a kertészek darázsirtónak használják, bárhol beszerezhető.”" },
        { id: "s3", q: "Hová lett az ampulla?", after: "taska", a: "„Egy kis morfium nem öl meg senkit, legfeljebb elaltat. A báró konyakjában nem morfium volt, azt a szagból is tudom.”" }
      ],
      ilona: [
        { id: "i1", q: "Mióta kezeli a gyűjtemény papírjait?", a: "„Négy éve. Minden nyugta és levél az én kezemen megy át. A báró úr megbízott bennem.”" },
        { id: "i2", q: "Járt ma az üvegházban?", a: "„Délután vágtam néhány szál virágot a báró úr asztalára. Ennyi.”" },
        { id: "i3", q: "Hány írógép van a házban?", after: "gep", a: "„Néhány. Nem számoltam meg őket. A régi Continentalt már évek óta senki sem használja.” Kicsit túl gyorsan felel." }
      ],
      lukacs: [
        { id: "l1", q: "Kitöltés után ki maradt a könyvtár közelében?", a: "„Senki, uram. A báró úr a hallba ment telefonálni, én a konyhába. Az ajtót nem zártam be, sosem szoktuk.”" },
        { id: "l2", q: "Mit tud a titkárnőről?", a: "„Szorgalmas teremtés. Sokszor éjjel is lent dolgozik a titkárságon. Fent a szobájában? Ott írni sem tudna, nincs is ott semmi.”" },
        { id: "l3", q: "Biztos, hogy a gomb délután nem volt a szék alatt?", after: "mandzsetta", a: "„Térden állva néztem meg, uram, a lámpával. Ha ott lett volna, megtalálom. Harminc éve takarítom azt a szobát.”" }
      ]
    },
    reveal: [
      { say: "Hölgyeim és uraim, a báró nem zuhant össze magától. Ciánt ivott, amelyet fél tíz és tíz között szórtak a konyakjába, miközben ő a hallban telefonált.",
        who: "gabor", objection: "„De hiszen az én gombom volt a szék alatt! Ugye nem gondolja, hogy…”", proof: ["mandzsetta", "kereses", "d-csel"],
        win: "Nem, kedves Gábor. A gombját valaki csak később csempészte oda: délután ön és Lukács pont ott kereste. Ez egy elültetett nyom." },
      { say: "Aki a gombot odatette, ugyanaz, aki a mérget is. Fél tíz és tíz között mindenkit látott valaki. Mindenkit, egyetlen embert kivéve.",
        who: "ilona", objection: "„Én fent gépeltem a szobámban, egész este!”", proof: ["ilonaszoba", "alibi", "d-alibi"],
        win: "A szobájában nincs írógép, Bakos kisasszony. Soha nem is volt. Fél tízkor csak egy helyen lehetett: a könyvtárban." },
      { say: "A mérget az üvegházból hozták. A darázsirtó fedele lazán állt, előtte keskeny női cipő nyoma.",
        who: "ilona", objection: "„Bárki bemehetett oda!”", proof: ["kertesz", "jegyzet", "d-mereg"],
        win: "A kertész szerint aznap délután egyetlen ember járt bent: ön, virágot vágni. És a saját zsebnaptárában ott áll: harmadik polc, konyak fél tíz után." },
      { say: "És hogy miért? A báró rájött, hogy a festményeit hamisítványokra cserélték, és másnap meg akarta nevezni a tettest.",
        who: "ilona", objection: "„Ezt nem tudja bizonyítani. Nyugtát bárki gépelhet!”", proof: ["gep", "d-hamis"],
        win: "Nem bárki. A hamis nyugták a régi Continentalon készültek, amelynek szekrénykulcsa csak önnél van." }
    ],
    confession: "„Négy év… négy év, amíg ő a festményeiben gyönyörködött, én pedig a nyugtáit gépeltem. Csak egyszer akartam én is valamit, ami szép. Nem bántam meg. Csak azt, hogy elkaptak.”"
  },

  "arany-griff": {
    interviews: {
      lili: [
        { id: "l1", q: "Miért akarta Vándor felbontani a szerződését?", a: "„Mert öregszem, azt mondta. Huszonhét évesen! Talált egy fiatalabbat Bécsben.”" },
        { id: "l2", q: "Mikor hívta utoljára a 412-t?", a: "„Fél tizenkettőkor. Kicsengett, de senki sem vette fel. Pedig Elemér mindig felvette, még éjjel is.”" },
        { id: "l3", q: "Ismeri Kardos Endrét?", a: "„A fiatal írót? Egyszer itt járt a varietében, és ordítozott Elemérrel. Azt mondta, Elemér tolvaj. Azóta nem láttam.”" }
      ],
      hartmann: [
        { id: "h1", q: "Kinek a darabja „Az utolsó tánc”?", a: "„Elemér neve áll rajta. Hogy ki írta… hát, a színházban sok minden történik, amit nem kell mindenkinek tudnia.”" },
        { id: "h2", q: "Hová tűnt negyvenezer pengő?", after: "fokonyv", a: "„Kölcsön. Vissza akartam tenni. Elemér nem tudott róla, de ha tudott volna, sem ölöm meg érte: a bárból egy percre sem mozdultam.”" },
        { id: "h3", q: "Mi a széf kódja?", a: "„Fogalmam sincs. Elemér mindig azt mondta, arra az évre állítja, amikor először tapsolták állva. Ő ezt jobban számon tartotta, mint a születésnapját.”" }
      ],
      margit: [
        { id: "m1", q: "Mit hallott pontosan?", a: "„Egy tompa puffanást a 412-ből. Aztán nem sokkal utána egy reteszcsattanást, de nem onnan, hanem kicsit odébbról.”" },
        { id: "m2", q: "Kivel volt a vasalóban?", a: "„Annával, a másik szobalánnyal. Ő is hallotta a puffanást, kérdezze meg.”" },
        { id: "m3", q: "Honnan vannak a mandzsettagombok?", after: "mandzsetta", a: "„Délután… takarítás közben. Bocsásson meg! De a puffanáskor a vasalóban voltam, esküszöm.”" }
      ],
      ferenczy: [
        { id: "f1", q: "Ki vette ki ma este a 414-et?", a: "„Egy úr, készpénzért. Nem néztem az arcát, a kalapja mélyen ült. Jó borravalót adott.”" },
        { id: "f2", q: "Milyen volt az idő este?", a: "„Háromnegyed tizenegyig száraz, utána leszakadt az ég. Aki ezután jött be, csuromvizesen érkezett.”" },
        { id: "f3", q: "Mi volt a vendég neve?", after: "derkes", a: "„Derkes. Derkes Andor. Különös név, mintha valaki összekeverte volna a betűket.”" }
      ],
      kardos: [
        { id: "k1", q: "Miről ír most?", a: "„Egy darabról, amelyben valaki ellopja egy másik ember életművét, és az nem tudja visszaszerezni. Kitalált történet, persze.”" },
        { id: "k2", q: "Mikor eredt el az eső?", a: "„Hajnalban, amikor hazaértem. Száraz lábbal mentem haza a New Yorkból.”" },
        { id: "k3", q: "Ön írta „Az utolsó táncot”?", after: "szerzodes", a: "Kardos keze megremeg. „Ezt honnan tudja? A borítón Vándor neve áll. Mindenki tudja, hogy az ő darabja.” Keserűen elneveti magát." }
      ]
    },
    reveal: [
      { say: "A 412-es szoba belülről volt zárva. Csakhogy zárt szoba nincs, hölgyeim és uraim. Csak olyan ajtó van, amelyre nem gondolunk.",
        who: "ferenczy", objection: "„De a kulcs belülről a zárban volt, és a pótkulcs nálam!”", proof: ["kijarat", "d-szomszed"],
        win: "A gyilkos nem a folyosói ajtón ment ki, hanem az összekötőn, a 414-es szobába. És a saját oldalán bereteszelte maga mögött." },
      { say: "A 414-et aznap este egy bizonyos Derkes Andor vette ki. Olyan ember, aki nem létezik.",
        who: "kardos", objection: "„Mi közöm nekem ehhez? Én egész este a New Yorkban ültem!”", proof: ["derkes", "d-tettes"],
        win: "Derkes Andor, Kardos Endre. Ugyanazok a betűk. Ön vette ki a szobát a saját nevének anagrammájával." },
      { say: "És a kávéház? Ön azt mondta, száraz lábbal ment haza, az eső csak hajnalban eredt el.",
        who: "kardos", objection: "„Így is volt!”", proof: ["eso", "liftes", "d-kivul"],
        win: "Háromnegyed tizenegykor szakadt le az eső. A liftesfiú csuromvizes kabátú férfit vitt fel a negyedikre, bőr irattartóval. Ugyanazzal, amelyiket a 414-es szekrényben találtunk." },
      { say: "Végül az indíték. Vándor nem csak a pénzt és a hírnevet vitte el.",
        who: "hartmann", objection: "„Elemér rengeteg embert megbántott. Bárki lehetett!”", proof: ["szerzodes"],
        win: "De csak egy embertől lopta el az életművét. A széfben ott a kézirat, a borítón kivakarva még olvasható az eredeti szerző neve: Kardos Endre." }
    ],
    confession: "„Négy évig írtam azt a darabot. Ő két hét alatt a sajátjává tette. Csak azt akartam, hogy kimondja: az enyém. Nevetett. Akkor ott volt a kezem ügyében az a szobor…”"
  },

  "ejszakai-gyors": {
    interviews: {
      agnes: [
        { id: "a1", q: "Mit hallott a veszekedésből?", a: "„Két férfihangot. Kristóf azt kiabálta: »Kassán mindent elmondok!« A másik halkabban beszélt, mintha a szomszédból jött volna.”" },
        { id: "a2", q: "Ki volt Klára?", after: "medal", a: "„Kristóf első felesége. Fiatalon meghalt. Kristóf sosem tette le a medálját, a szíve fölött hordta.”" },
        { id: "a3", q: "Ki köhögött éjjel?", a: "„A szomszédom, az a nevelőnő. Egész éjjel köhögött a falon át, alig aludtam tőle.”" }
      ],
      wolf: [
        { id: "w1", q: "Ki ült önnel a kártyaasztalnál?", a: "„A bankár cégvezetője. Dideregve ült le, azt mondta, a hálókocsiban már jéghideg van. Pedig én egy óra előtt jöttem el onnan, és akkor még meleg volt.”" },
        { id: "w2", q: "Mikor ült le Somló?", a: "„Tíz perccel kettő előtt. Megnéztem az órámat. Az órák a mesterségem, uram.”" },
        { id: "w3", q: "Mi van a bőröndjében?", after: "orak", a: "„Minták. Jó, jó… nem csak minták. De ezért nem ölnek embert.”" }
      ],
      iren: [
        { id: "i1", q: "Miért utazik Kassára?", a: "„Új állásom lesz egy családnál.” Nem néz a szemedbe." },
        { id: "i2", q: "Ismerte Ráday urat?", after: "level", a: "„Az apám volt. Egész életemben csak a nevét ismertem. Ezen az úton akartam bemutatkozni neki. Most már soha.”" }
      ],
      kornelia: [
        { id: "k1", q: "Mit énekelt az étkezőkocsiban?", a: "„A Csárdáskirálynőt, háromszor egymás után. A pincér már könyörgött, hogy hagyjam abba.”" },
        { id: "k2", q: "Tartozott Rádaynak?", after: "valtok", a: "„Hatezer pengővel. Kassán meg akartunk egyezni. Halottal nehéz egyezkedni, nem igaz? Nekem élve kellett volna.”" }
      ],
      somlo: [
        { id: "s1", q: "Miről beszéltek éjfélkor?", a: "„A negyedéves számokról. Ráday úr elégedett volt. Azt mondta, Kassán kitüntetésre terjeszt fel.”" },
        { id: "s2", q: "Melyik fülkében utazott?", a: "„A vezérigazgató úr mellett. Ragaszkodott hozzá, hogy kéznél legyek.” Lehet, hogy ezt nem kellett volna mondania." },
        { id: "s3", q: "Mi a születésnapja?", after: "utlevel", a: "„Február kilencedike. Miért fontos ez?” Az aktatáskájára pillant." }
      ],
      bodnar: [
        { id: "b1", q: "Miért ment el a fűtés?", a: "„Egy szelep elakadt. Megesik az ilyen hidegben. Én rögtön szóltam az utasoknak.”" },
        { id: "b2", q: "Használta Ráday úr a takarót?", after: "holttest", a: "„Hát… biztos. Betakarózott, gondolom. Én csak beadtam.” Az összehajtott takaró a csomagtartón mást mond." },
        { id: "b3", q: "Ki tudja elzárni a fűtést?", a: "„Csak a kalauzfülkéből lehet, a négyszögkulccsal. Az nálam van mindig.” Aztán elhallgat." }
      ]
    },
    reveal: [
      { say: "A 3-as fülke ajtaján belülről be volt akasztva a lánc. A gyilkos tehát nem a folyosóról jött.",
        who: "bodnar", objection: "„Akkor senki sem mehetett be! Biztos szívroham volt!”", proof: ["bejarat", "d-hideg"],
        win: "Szívroham levélbontó késsel? A gyilkos a közös mosdón át jött, és ugyanott ment ki. A nedves lábnyom a szomszéd fülke felé vezet." },
      { say: "A közös mosdón Ráday egyetlen utastárssal osztozott.",
        who: "somlo", objection: "„Én egész idő alatt aludtam, aztán kártyázni mentem!”", proof: ["fulkek", "d-ut"],
        win: "Önnel, Somló úr. A 4-es fülke az öné, és a mosdó a kettőjüké." },
      { say: "Az alibije egyetlen emberen múlik: a kalauzon, aki szerint Ráday 02:10-kor még élt.",
        who: "bodnar", objection: "„Bevittem neki a takarót, és morgott, hogy ne zavarjam!”", proof: ["holttest", "boritek", "d-takaro", "d-bl"],
        win: "A takaró összehajtva fekszik a csomagtartón, senki sem használta. Somló aktatáskájában pedig ott a boríték: B. L., ötszáz pengő, a másik fele Kassán." },
      { say: "És hogy miért? Ráday a naplójába írta, a halott felesége nevével titkosítva.",
        who: "somlo", objection: "„Egy öregember rögeszméi!”", proof: ["naplo"],
        win: "„Somló hamis váltókkal lopja a bankot. Kassán feljelentem.” Ráday nem érkezett meg Kassára." }
    ],
    confession: "„Tizenkét évig szolgáltam azt az embert. Egyetlen rossz évem volt, és ő a börtönbe akart küldeni érte. Nem hagyhattam, hogy Kassára érjen. A kalauzt könnyű volt megvenni. Önt sajnos nem.”"
  },

  "hollos-cukraszda": {
    interviews: {
      szendrei: [
        { id: "s1", q: "Ki főzte este a pisztáciakrémet?", a: "„Én, ki más. Ez a torta lelke. Hollós úr receptje, persze. Legalábbis az ő neve áll rajta.”" },
        { id: "s2", q: "Mit ígért önnek a mester?", a: "„Hogy egyszer társ leszek. Tizenöt éve ígéri. Jövőre, mindig jövőre.”" },
        { id: "s3", q: "Tudott a bolt eladásáról?", after: "szerzodes", a: "Szendrei elsápad. „Milyen eladásról? Ez… ez nem lehet igaz.” De a hangja mást mond." }
      ],
      hollosbela: [
        { id: "h1", q: "Mit csinált a kártyaklubban?", a: "„Vesztettem, mint mindig. Tíz ember látott, hajnalig ültem ott. A pakli, amit délután a műhelyben felejtettem, hiányzott is.”" },
        { id: "h2", q: "Mikor viselte utoljára a kabátját?", after: "valtok", a: "„Délután, amikor bejöttem. Felakasztottam az öltözőben, és ott is hagytam, mert a klubban volt a másik.”" }
      ],
      anna: [
        { id: "a1", q: "Ki ment el utolsóként?", a: "„Én fél tízkor mentem, akkor a mester és Szendrei úr még bent volt. Meg Vilma asszony, az irodában.”" },
        { id: "a2", q: "Mi a kassza titka?", after: "penzkonyv", a: "„Nincs titok. Kivettem, visszatettem. Hollós úr megbocsátott. Neki nem volt oka haragudni rám.”" }
      ],
      vilma: [
        { id: "v1", q: "Hogyan ment haza?", a: "„Villamossal, mint mindig. A kalauz ismer, minden este kezeli a jegyemet.”" },
        { id: "v2", q: "Tudott az eladásról?", after: "vilmatask", a: "„Igen. Én is aláírtam tanúként. Ernő szégyellte a személyzet előtt, ezért titkolta.”" }
      ],
      feher: [
        { id: "f1", q: "Mit hallott tíz után?", a: "„A gazdát, ahogy lemegy a jégkamrába. Aztán csend. Ilyenkor szoktam egy kicsit… pihentetni a szemem.”" },
        { id: "f2", q: "Látta, ki ment ki utoljára?", a: "„Hallottam, hogy valaki fél tizenegy körül kimegy a kapun. Férfi volt, nehéz léptekkel. A lámpagyújtogató akkor járt arra.”" }
      ]
    },
    reveal: [
      { say: "A mester a dérbe írta a gyilkosa nevét: BÉLA. A házban két Béla van.",
        who: "hollosbela", objection: "„Ne nézzenek rám! A klubban voltam!”", proof: ["kartya", "d-csel"],
        win: "Igaz. A kártyáját a jégbe dobták, de száraz maradt az olvadó jég között. Valaki reggel tette oda, nem este." },
      { say: "És a krém a kabátja ujján még nedves volt, liszt nélkül. A reteszen lévő viszont egész éjjel száradt, liszttel keverve.",
        who: "szendrei", objection: "„Mindenki krémes ebben a házban!”", proof: ["retesz", "d-bela"],
        win: "De csak egy kötényen van megkérgesedett, liszttel kevert pisztáciakrém. Az önén, Szendrei úr. Ön főzte este az egyetlen adagot." },
      { say: "Ön azt mondta, fél tízkor ment haza.",
        who: "szendrei", objection: "„Így volt, mint minden este!”", proof: ["tavozas", "d-egyedul"],
        win: "Fél tízkor csak a pénztárosnő ment ki. Ön fél tizenegykor, amikor a mester már lent volt a jégkamrában." },
      { say: "Végül, hogy miért. Tizenöt év ígéret után a mester titokban eladta a boltot.",
        who: "vilma", objection: "„Ernő soha nem bántott senkit!”", proof: ["szerzodes"],
        win: "Nem akarta bántani. Csak elfelejtette megmondani. „Szendreinek nem szólok. Majd megérti.” Szendrei megértette." }
    ],
    confession: "„A torta az enyém volt. A recept az enyém volt. Tizenöt év az enyém volt. Csak rátoltam a reteszt. Azt hittem, reggelre rájön, milyen hideg egyedül maradni.”"
  },

  "corvin-szinhaz": {
    interviews: {
      mimi: [
        { id: "m1", q: "Ki kérte, hogy Iván a hetes jelzéshez álljon?", a: "„Az igazgató úr rendezte így. Ott szebb a fény.” Felszegi az állát." },
        { id: "m2", q: "Tudott Iván eljegyzéséről?", after: "level", a: "„Tudtam. Ma délután mondta meg. Gratuláltam neki. Mit tehettem volna?”" },
        { id: "m3", q: "Hol volt a szünetben?", a: "„Az öltözőmben. Mindig ott pihenek.”" }
      ],
      kalman: [
        { id: "k1", q: "Miért változtatta meg a jelenetet?", a: "„Mimi kérte délután, és igaza volt, a hetes jelzésen gyönyörű a fény. Egy jó rendező hallgat a primadonnájára.”" },
        { id: "k2", q: "Mit mond a kellékes a gyertyákról?", a: "„A templomi gyertyákat? Hat darab maradt a dobozban, holnapra kellenek a második felvonáshoz. Egy hiányzik? Furcsa.”" }
      ],
      vass: [
        { id: "v1", q: "Kik mehetnek fel a zsinórpadlásra?", a: "„Bárki, aki nem fél a magasságtól. A lépcső a színfalak mögül indul, nincs rajta zár. A szünetben én a büfében voltam, fent senki.”" },
        { id: "v2", q: "Mi lehet egy kötél alatt, ami átégeti?", after: "kotel", a: "„Gyertya? Lassan égetné, de biztosan. Órákig is eltartana. Ördögi.”" }
      ],
      klara: [
        { id: "c1", q: "Mit látott a súgólyukból?", a: "„Mindent, fiam. A színészek arcát. Mimi felnézett a zsinórpadlásra az utolsó strófa előtt. Harminc éve súgok, ilyet még nem tett.”" },
        { id: "c2", q: "Ki írja a Színházi Élet pletykarovatát?", after: "pletyka", a: "Klára elmosolyodik. „Valakinek muszáj.”" }
      ],
      bodo: [
        { id: "b1", q: "Hol volt a szünetben?", a: "„Skáláztam. A szomszéd kórista panaszkodott, hogy nem tud tőle aludni. Élőben, nem gramofonról.”" },
        { id: "b2", q: "Mit nyer Sárközy halálával?", after: "bodo", a: "„A bécsi turnét. Tudom, hogy ez rosszul hangzik. De nem így akartam megkapni.”" }
      ]
    },
    reveal: [
      { say: "Hölgyeim és uraim, a kötél nem kopott el, és nem is vágták el. Átégették.",
        who: "kalman", objection: "„Ez baleset volt! Régi kötelek, régi színház!”", proof: ["kotel", "d-idozito"],
        win: "A szálak vége megpörkölődött, alatta viaszcseppek, a korláthoz drótozva egy gyertyacsonk. Ezt valaki szándékosan tette oda." },
      { say: "A gyertya két órán át égett. A zuhanáskor mindenkinek tökéletes alibije volt. De a gyertyát nem akkor gyújtották meg.",
        who: "bodo", objection: "„Akkor mikor?”", proof: ["gyertya", "d-idozito"],
        win: "Két órával korábban, 20:41-kor, az első szünetben. A végzetes pillanat alibijei semmit sem érnek." },
      { say: "Az első szünetben mindenki látható helyen volt. Egyetlen embert kivéve.",
        who: "mimi", objection: "„Az öltözőmben pihentem!”", proof: ["szunet", "d-padlas"],
        win: "Az öltözője zárva volt, a kulcsa végig a portán lógott. Önnek egyetlen helye maradt: a zsinórpadlás." },
      { say: "És amikor a zsák lezuhant, ön tudta, mi következik.",
        who: "mimi", objection: "„Fel sem néztem!”", proof: ["felnezett", "sugo", "d-tudta"],
        win: "Lengyel Klára látta, hogy felnéz, aztán balra ugrik. Ön volt az egyetlen, aki tudta, mikor ég át a kötél." }
    ],
    confession: "„Hét évig vártam, hogy elvegyen. Ma délután egy levélben közölte, hogy mást. Azt akartam, hogy a színpadon haljon meg, ahol olyan szerettük egymást. Egy lépéssel arrébb álltam. Csak egy lépéssel.”"
  },

  "tokaji-pince": {
    interviews: {
      ilona: [
        { id: "i1", q: "Hogy aludt az éjjel?", a: "„Bevettem a cseppjeimet, és reggelig ki sem mozdultam.” Közben a papucsát igazgatja." },
        { id: "i2", q: "Miről vitatkozott a férje és a fia?", a: "„A váltókról. Lőrinc kitagadással fenyegette Andrást. Szörnyű dolgokat mondtak egymásnak.” Mintha attól félne, mit mondott a fia." }
      ],
      andras: [
        { id: "a1", q: "Hol volt tizenegy és éjfél között?", a: "„Lorenz úrral kártyáztam, és négyszáz pengőt vesztettem. Kérdezze meg tőle, ő biztosan emlékszik rá.”" },
        { id: "a2", q: "Ki tud a hamis aszúról?", after: "lada", a: "„Hamis aszú? Apám pincéjében? Gáspár bácsi negyven éve vigyáz azokra a hordókra…” Elhallgat." }
      ],
      gaspar: [
        { id: "g1", q: "Hogyan halhat meg valaki a pincében?", a: "„A must gáza, uram. Zárt pincében fél óra alatt megtölti a levegőt. Először mindig a gyertya alszik ki. Aki ezt nem tudja, nem pincész.”" },
        { id: "g2", q: "Melyik a legjobb hordója?", a: "„A hetes. Senki sem nyúlhat hozzá. Az az én furmintom.”" },
        { id: "g3", q: "Mi a legnagyobb éve?", a: "„Harmincöt. Hat puttony. Olyan aszú nem lesz többet a Hegyalján.”" }
      ],
      lorenz: [
        { id: "l1", q: "Kitől vásárolt bort idén?", a: "„A pincemestertől, mint mindig. Ötven palack harmincötös hatputtonyost. Készpénzért, ő kérte így.”" },
        { id: "l2", q: "Mit tud a gazda kóstolójáról?", a: "„Este bejelentette, hogy a hetes hordóból akar kóstolni. A pincemester furcsán elsápadt.”" }
      ],
      rozalia: [
        { id: "r1", q: "Látott valamit a konyhaablakból?", a: "„Semmit. Mosogattam.” Az ablak pont a szellőzőkürtőre néz." },
        { id: "r2", q: "Mit tud Andrásról?", after: "rozalia", a: "Elpirul. „Jó ember. Nem tenne ilyet. Én… én láttam valakit a kürtőnél, és az biztosan nem ő volt. Az illető bicegett.”" }
      ],
      barany: [
        { id: "b1", q: "Mi baja a lónak?", a: "„Kólika. Egész éjjel virrasztottam mellette a kocsissal.” Megdörzsöli a kabátja ujját." },
        { id: "b2", q: "Hallott valamit éjjel?", a: "„Egy óra körül nyikorgott a kürtő fedele. A kocsis is hallotta. Utána… utána semmit.”" }
      ]
    },
    reveal: [
      { say: "Hölgyeim és uraim, a gazda nem a lépcsőn halt meg. A lépcsőn nincs vér, a feje sértetlen, a csizmáján must szárad.",
        who: "ilona", objection: "„Leesett! Mindig mondtam, hogy az a lépcső a halála lesz!”", proof: ["erjeszto", "d-attett", "d-gaz"],
        win: "Az erjesztőpincében halt meg. Ott aludt ki félig égve a gyertyája, és onnan húzták a testet a lépcső felé." },
      { say: "Valaki a holttestet a lépcső aljára vitte, hogy zuhanásnak tűnjön.",
        who: "ilona", objection: "„Én reggelig ki sem mozdultam a szobámból!”", proof: ["penesz", "hazugsag", "d-ilona"],
        win: "A papucsán pincepenész, asszonyom. Az csak a pince falán nő. Fél kettőkor ön lent járt, Bárány intézővel." },
      { say: "De a gazdát nem ön ölte meg. A gazda megfulladt: valaki rárakta a vasrudat az ajtóra, és lezárta a szellőzőkürtőt.",
        who: "gaspar", objection: "„A présházban voltam, a mustot figyeltem!”", proof: ["hol", "d-gaspar"],
        win: "A présház ajtaja reggel érintetlen volt. Rozália a konyhaablakból egy bicegő alakot látott a kürtőnél, lámpással. A birtokon csak ön biceg." },
      { say: "És hogy miért. A gazda a hetes hordóból akart kóstolni.",
        who: "gaspar", objection: "„Az a legjobb furmintom!”", proof: ["fuzet", "lada", "d-hamis"],
        win: "A hetes hordóban már nincs aszú. Ön eladta Lorenz úrnak, hamis címkékkel. Le is írta a füzetébe: ha rájön, végem. A kürtőt be kell zárni." }
    ],
    confession: "„Negyven évig én csináltam a bort, ő a nevét adta rá. Egy kis aszú a nyugdíjamra, ennyi kellett. Amikor a hetes hordót mondta, tudtam, hogy vége. A pince elintézi. A pince mindig elintézi.”"
  },
  "fekete-szegfu": {
    interviews: {
      fekete: [
        { id: "f1", q: "Mit tud a Lánchíd Rt.-ről?", a: "„Ügyfelem. Ingatlanokkal, műtárgyakkal kereskedik. Ennél többet az ügyvédi titoktartás miatt nem mondhatok.” Elmosolyodik." },
        { id: "f2", q: "Miért hord mindig szegfűt a gomblyukában?", a: "„A feleségem első ajándéka volt. Azóta minden reggel veszek egy szálat. A sötétebbeket szeretem.”" },
        { id: "f3", q: "Mit fényképez a sötétkamrájában?", after: "fenykepek", a: "„Tájakat. Épületeket. Szép helyeket, mielőtt megváltoznak.” Egy pillanatig hallgat. „Minden szép hely megváltozik egyszer.”" }
      ],
      irma: [
        { id: "i1", q: "Milyen volt a férje az utóbbi időben?", a: "„Nyugtalan. Éjjelente a sötétkamrában ült. Egyszer azt mondta, Edit túl sokat iktat.”" },
        { id: "i2", q: "Mit mondott önnek Edit?", after: "kesztyu", a: "„Azt, hogy nem nő van a dologban. Hogy sokkal rosszabb. Hogy holnap mindenki megtudja.” Elcsuklik a hangja." }
      ],
      halmi: [
        { id: "h1", q: "Ki kezeli a Lánchíd Rt. ügyeit?", a: "„Csak Fekete úr. Engem soha nem engedett a közelébe. Edit iktatta a számláit, ő látott mindent.”" },
        { id: "h2", q: "Látott ma valami szokatlant?", a: "„Délben Fekete úr egy szál szegfűvel jött be, de este a gomblyuka üres volt. Ezt csak most veszem észre, hogy furcsa.”" }
      ],
      pinter: [
        { id: "p1", q: "Kinek van kulcsa a hátsó lépcsőhöz?", a: "„Nekem, meg Fekete úrnak. Senki másnak. Azt a lépcsőt a kutya sem használja, csak ő, ha a kocsijával jön.”" },
        { id: "p2", q: "Mikor főzött Edit teát?", a: "„Fél hétkor, minden este. Óramű pontossággal. Ezt az egész iroda tudta.”" }
      ],
      rozsa: [
        { id: "r1", q: "Ki jött be hat után?", a: "„Csak a postás, kérem.” Közben a kötényét gyűri." },
        { id: "r2", q: "Honnan van ez a boríték?", after: "penz", a: "„Megtakarítás.” Aztán halkan: „Ugye nem kell visszaadnom?”" }
      ]
    },
    reveal: [
      { say: "Hölgyeim és uraim, Varga Edit nem lett öngyilkos. A búcsúlevelet valaki más írta alá.",
        who: "fekete", objection: "„Szegény lány ideges volt. A levél egyértelmű.”", proof: ["tinta", "d-hamislevel"],
        win: "Az aláírás zöldeskék tintával, széles hegyű tollal készült. Edit csak lila tintát használt. Az irodában egyetlen ilyen toll van: az öné." },
      { say: "A mérget a sötétkamrából hozták, a fényképészeti fixálóból.",
        who: "fekete", objection: "„Én hatkor eljöttem, és hétig a Gerbeaud-ban ültem!”", proof: ["ido", "hazugsag", "d-ures"],
        win: "A pincér szerint negyed hétkor felállt, és csak öt perccel hét előtt ült vissza. A kalapja és a konyakja vigyázott a helyére. Hét perc gyalog az iroda hátsó bejáratáig." },
      { say: "A főkapun nem jött be. A hátsó lépcsőn igen.",
        who: "rozsa", objection: "„Hat után senki sem jött be, csak a postás!”", proof: ["penz", "galos", "kulcs", "d-rozsa", "d-hatso"],
        win: "Száz pengő egy borítékban, zöld tintával. A hátsó lépcsőn 44-es angol sárcipő nyoma, a kulcs csak két embernél van, és Pintér a kocsmában ült." },
      { say: "És hogy miért. Edit rájött arra, amire én csak most: hat ügyem mögött ugyanaz a kéz állt.",
        who: "fekete", objection: "„Egy titkárnő fantáziálása!”", proof: ["dosszie", "lanchid", "d-lanchid"],
        win: "Hat cédula, hat gyilkos, hat vétel, és mindet a Lánchíd Rt. vette meg. A Lánchíd Rt. egyetlen részvényese ön. Ön a fekete szegfű." }
    ],
    confession: "„Én soha senkit nem öltem meg. Hat embernek csak megmutattam az ajtót, amelyen már amúgy is ki akartak lépni. Edit volt az egyetlen, akit magamnak kellett… Látja, ez a baj azzal, ha az ember maga csinálja. Elfelejtettem tollat cserélni.”"
  }
};
