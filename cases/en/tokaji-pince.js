/* English: Case 6 — Fog over Tokaj */
(window.MM_EN = window.MM_EN || {})["tokaji-pince"] = {
  title: "Fog over Tokaj",
  meta: "Mád, Tokaj wine region · 14 October 1938 · Case no. 1938/1172",
  teaser: "At harvest time the master of a vineyard estate is found dead at the foot of the cellar stairs. Everyone suspects a fall. But there is not a drop of blood on the steps, and someone was down there with the body during the night.",
  intro: {
    eyebrow: "Royal Hungarian Gendarmerie · Tokaj post",
    heading: "The death of Dr. Lőrinc Récsey in the cellar",
    lead: "At half past five in the morning on 15 October 1938, the grape pickers found the vineyard owner Dr. Lőrinc Récsey at the foot of the cellar stairs. Thick fog had rolled in from the Bodrog river over the hills, and the new must was already fermenting in the press house.",
    body: "The widow says her husband fell down the steep stairs. The gendarmes are inclined to accept it. But the master's head is unhurt, there is not a drop of blood on the stone steps, and fresh must is drying on his boots. Six people were on the estate. At least two of them are lying."
  },
  suspects: {
    ilona: { name: "Ilona Récsey", role: "The widow, 45. Twenty years on the estate.",
      stmt: "“I went to bed at eleven. Lőrinc went down to taste, as he does every harvest. I always told him those stairs would be the death of him.”" },
    andras: { name: "András Récsey", role: "The son, 24. Studying in Budapest, when he isn't playing cards.",
      stmt: "“Yes, we quarrelled this afternoon. My father refused to pay my IOUs. But I played cards in the salon with Herr Lorenz all evening; he can tell you.”" },
    gaspar: { name: "Gáspár Fazekas", role: "Cellar master, 61. Forty years in the cellar. He fell from a barrel as a young man and has limped ever since.",
      stmt: "“The master went down to taste at eleven, as always. I was in the press house watching the must. This cellar is dangerous, sir. The gas from fermenting must has killed more than one man.”" },
    lorenz: { name: "Anton Lorenz", role: "Viennese wine merchant, 50. He buys here every harvest.",
      stmt: "“From eleven until midnight I played cards with the young gentleman. I won four hundred pengő; I'm not proud of it. I was on excellent terms with the master.”" },
    rozalia: { name: "Rozália Kiss", role: "Cook, 22. A girl from Mád, three years in service at the house.",
      stmt: "“I was washing up in the kitchen until midnight. I didn't see anything. Nothing, please. I didn't even look out of the window.”" },
    barany: { name: "Péter Bárány", role: "The estate steward, 40. He has run the farm for twelve years.",
      stmt: "“I sat up with the sick horse in the stable. I didn't set foot in the cellar that evening.”" }
  },
  clues: {
    holttest: { t: "At the foot of the stairs", src: "Cellar stairs", x: "The master lies at the foot of the stairs, but his head is unhurt and there is not a drop of blood on the stone steps. Fresh must is drying on his boots. His candle and tasting glass are not beside him." },
    erjeszto: { t: "The extinguished candle", src: "Fermenting cellar", x: "On the table in the fermenting cellar, the master's half-burned, extinguished candle and his tasting glass. The candle went out the way it does in the gas from fermenting must. Two marks on the floor lead towards the stairs." },
    hordo: { t: "Gáspár's barrel", src: "Fermenting cellar", x: "Chalked on barrel number seven: FURMINT 1937. The cellar hands say Gáspár calls it “his own barrel” and lets nobody near it." },
    vasrud: { t: "The iron bar", src: "Fermenting cellar", x: "The iron door of the fermenting cellar can be barred from the outside with an iron bar. The bar now leans against the wall, fresh wear on its end. Nobody can open the door from inside." },
    hol: { t: "Who was where between 23:00 and 23:30?", src: "Courtyard · statements", x: "András and Lorenz in the salon, Ilona in her bedroom, Rozália in the kitchen, Bárány in the stable. Gáspár Fazekas in the courtyard by the ventilation shaft." },
    ejszaka: { t: "The order of the night", src: "Salon · summary", x: "23:00 the master goes down. Someone puts the iron bar across the door, then closes the shaft. Within half an hour the candle goes out. Around one someone opens the shaft and removes the bar. At half past one Ilona finds her husband, and she and Bárány carry him to the foot of the stairs. At half past five the pickers find him." },
    lada: { t: "The cellar master's chest", src: "Cellar master's house", x: "In the chest, three thousand pengő in cash, a bundle of forged aszú labels reading “1935, 6 puttonyos”, and a coded notebook." },
    fuzet: { t: "The secret notebook", src: "The cellar master's chest", x: "“Lorenz got fifty bottles of fake aszú. Tonight the master wants to taste from barrel seven. If he finds out, I'm finished. The shaft must be closed.”" },
    penesz: { t: "Cellar mould", src: "Ilona's room", x: "Black, fluffy mould on Ilona's slippers and dressing gown. The noble mould that covers the walls of Tokaj cellars only clings if someone brushes against the wall down there." },
    hazugsag: { t: "A contradiction in Ilona's statement", src: "Ilona's room · statement", x: "In her statement Ilona claimed she took her drops and never left her room until morning." },
    lorenz: { t: "Lorenz's accounts", src: "Salon", x: "Lorenz's ledger: fifty bottles of 1935 six-puttonyos aszú, for cash, from Gáspár Fazekas in person." },
    andras: { t: "András's IOUs", src: "Salon", x: "In András's pocket, IOUs for six thousand pengő. The servants heard his father threaten to disinherit him that afternoon." },
    rozalia: { t: "Rozália's letters", src: "Kitchen", x: "In Rozália's apron, letters from András. A tender, secret love." },
    barany: { t: "Bárány's handkerchief", src: "Stable", x: "Black cellar mould on steward Bárány's handkerchief, must on his coat sleeve. He claims he didn't set foot in the cellar that evening." }
  },
  contradictions: {
    "c-ilona": { reveal: "Ilona breaks down: “I went down for him at half past one. He was lying among the barrels. I thought András had done it after the quarrel… I woke Bárány, and we carried him up to the foot of the stairs, so it would look like an accident.”" },
    "c-barany": { reveal: "Bárány lowers his eyes: “Madame asked me. The master was already dead when I got there. I touched nothing, I only carried him.”" },
    "c-gaspar": { reveal: "Gáspár limps back a step: “The shaft… I only checked the shaft. That's my job.” The press-house door was untouched in the morning." },
    "c-gaspar2": { reveal: "Gáspár is silent for a long time. “The master never understood wine,” he says at last. “Only labels.”" },
    "c-rozalia": { reveal: "Rozália blushes, then whispers: “I looked out of the window. I saw a lantern by the shaft, and someone limping. I didn't dare say, I was afraid they'd suspect András.”" },
    "c-lorenz": { reveal: "Lorenz raises his eyebrows: “I bought from Gáspár, with the master's knowledge. At least, that's what he told me.”" },
    "c-andras": { reveal: "András looks defiant: “Yes, I owe money, and my father threatened to disinherit me. But from eleven until midnight I played cards with Herr Lorenz and lost four hundred pengő.”" }
  },
    locations: {
    lepcso: { name: "Cellar stairs", desc: "Steep, damp stone steps into the depths, black furry mould on the walls. The master lies at the bottom.",
      look: "Steep, damp stone steps into the depths. On the walls, [[black, furry mould|penesz_]]; [[the handrail|korlat]] is cold and wet. [[At the foot of the stairs lies the master|holttest]], his eyes open.",
      decoys: { penesz_: "The noble mould of Tokaj. Whoever touches the wall carries it away on clothes and shoes.", korlat: "Solid, loose nowhere. Anyone who stumbled could have grabbed it." },
      items: { holttest: { label: "The master", text: "You examine the body and the stairs." } } },
    erjeszto: { name: "Fermenting cellar", desc: "Rows of barrels, gas hissing up from the must. An extinguished candle on the table.",
      look: "Rows of barrels, gas hissing up from the must; the air is heavy and sweetish. [[A chalked inscription on barrel seven|hordo]]. [[Outside the iron door, a heavy iron bar leaning against the wall|vasrud]]. In the ceiling, [[the ventilation opening|nyilas]].",
      decoys: { nyilas: "It leads up into the shaft. If its cover is closed, the gas cannot escape." },
      items: { hordo: { label: "Barrel seven", text: "You read the chalked inscription." },
               vasrud: { label: "The iron door", text: "You examine the door and the bar." } } },
    udvar: { name: "Courtyard and ventilation shaft", desc: "A foggy courtyard; above the cellar a stone ventilation shaft whose cover can be screwed shut.",
      look: "A foggy courtyard. Above the cellar, a stone ventilation shaft; [[its cover can be screwed shut|fedel]]. In the mud, [[footprints from the shaft towards the press house|nyom]]; on the press-house door, [[a twist of wire|drot]].",
      decoys: { fedel: "The screw is freshly oiled and the cover open. Someone knew how to handle it.", nyom: "Uneven steps: one short, one long, one short, one long.", drot: "The press-house door was wired shut in the evening, and the wire is untouched." } },
    mester: { name: "The cellar master's house", desc: "A small adobe house behind the press house. A vintage chart on the wall, an iron-bound chest under the bed.",
      look: "A small adobe house behind the press house. A vintage chart on the wall, an iron-bound chest under the bed. In the corner, [[a walking stick|bot]]; on the table, [[a bottle of aszú|asz]].",
      decoys: { bot: "A worn oak walking stick with an iron tip. Gáspár has limped for forty years.", asz: "A bottle without a label. If you taste it: genuine six-puttonyos aszú." } },
    lada: { name: "The cellar master's chest", desc: "In the opened chest: money, labels and a worn notebook.",
      look: "In the opened chest, bundles of money, labels, and at the very bottom [[a worn oilcloth notebook|fuzet_]].",
      decoys: { fuzet_: "Its last page is a meaningless string of letters. It will have to be deciphered." } },
    haloszoba: { name: "Ilona's room", desc: "Camomile tea on the bedside table, a dressing gown over the chair, slippers by the bed.",
      look: "[[Camomile tea on the bedside table|tea]], beside it [[a bottle of sleeping drops|csepp]]. [[A dressing gown over the back of the chair, slippers by the bed|penesz]].",
      decoys: { tea: "Cold and untouched. The maid brought it at half past eleven.", csepp: "The bottle is full. Nobody took any tonight." },
      items: { penesz: { label: "The slippers and the dressing gown", text: "You look more closely at the slippers and the gown." } } },
    szalon: { name: "Salon", desc: "A card table, half-empty wine glasses, ash in the fireplace.",
      look: "A card table, [[cards laid out|kartya]], half-empty wine glasses. [[Mr Lorenz's document case|lorenz]] on a chair, [[András's coat|andras]] over the arm of a chair.",
      decoys: { kartya: "Ulti. On the score sheet, four hundred pengő in Lorenz's favour, closed at midnight." },
      items: { lorenz: { label: "Mr Lorenz's document case", text: "You look through the carefully kept accounts." },
               andras: { label: "András's coat", text: "You pull the crumpled papers out of the pocket." } } },
    konyha: { name: "Kitchen", desc: "Unwashed dishes; the window looks straight out at the ventilation shaft.",
      look: "Unwashed dishes. [[From the window|ablak]] you can see straight out to the ventilation shaft. On a hook, [[Rozália's apron|rozalia]].",
      decoys: { ablak: "You can see the shaft clearly from here, even in fog, if someone stands beside it with a lantern." },
      items: { rozalia: { label: "Rozália's apron", text: "Letters show at the top of the pocket." } } },
    istallo: { name: "Stable", desc: "Straw, a lantern, a sick horse under a blanket.",
      look: "Straw, a lantern, [[a sick horse under a blanket|lo]]. On a nail, [[Bárány's coat, a handkerchief hanging out of the pocket|barany]]. In the corner, [[the coachman|kocsis]] is dozing.",
      decoys: { lo: "Colic, but it will pull through. Someone sat up with it all night.", kocsis: "“Mr Bárány was with me; he only ran off at half past one, when the mistress was shouting. Around one I heard the shaft cover creak.”" },
      items: { barany: { label: "Bárány's coat", text: "You pull out the handkerchief." } } }
  },
  deductions: {
    "d-attett": { t: "He didn't die on the stairs", x: "There is no blood on the stairs; the candle and the glass stayed down in the fermenting cellar, and there are drag marks on the floor. The master died in the fermenting cellar and was carried to the foot of the stairs afterwards.",
      q: "What do the two tell you together?", opts: ["The master fell on the stairs and his candle flew off.", "The master was struck on the stairs and dragged into the cellar.", "The master died in the fermenting cellar and was carried to the foot of the stairs afterwards."] },
    "d-gaz": { t: "Locked in with the gas", x: "The fermenting cellar door can be barred from outside with an iron bar, and the bar shows fresh wear. The candle went out in the gas from the must. The master was locked in, and the gas killed him.",
      q: "How did the master die?", opts: ["He was locked in the fermenting cellar and the gas from the must killed him.", "He was poisoned with the tasting wine.", "The gas made him dizzy and he fell down the stairs."] },
    "d-gaspar": { t: "At the shaft", x: "Between eleven and half past eleven Gáspár Fazekas was at the shaft, not in the press house, and his notebook says: “The shaft must be closed.”",
      q: "Who closed the shaft?", opts: ["Bárány, who passed that way to the horse.", "Gáspár Fazekas, the cellar master.", "Rozália, who saw everything from the window."] },
    "d-ilona": { t: "Ilona was down there", x: "Ilona claims she never left her room, but there is cellar mould on her slippers and gown, and it only clings down below.",
      q: "What does the mould reveal about Ilona's statement?", opts: ["She lied: she was down in the cellar in the night.", "She told the truth: the mould comes from her wardrobe.", "Someone else carried the mould into her room."] },
    "d-cipelok": { t: "Two of them carried him", x: "Ilona was down there in the night, and Bárány's handkerchief has cellar mould on it too, his coat must. Together they carried the master to the foot of the stairs.",
      q: "Who carried the body to the stairs?", opts: ["Gáspár alone, to make it look like an accident.", "András and Lorenz, after the card game.", "Ilona and Bárány the steward, together."] },
    "d-hamis": { t: "The fake aszú", x: "In Gáspár's chest, fake “1935, 6 puttonyos” labels and three thousand pengő; and Lorenz bought fifty bottles of exactly that aszú from him, for cash, in person.",
      q: "What was Gáspár doing behind the master's back?", opts: ["Spying on the master on Lorenz's behalf.", "Selling fake aszú to Lorenz and keeping the money.", "Taking out a loan against the estate."] }
  },
  events: {
    lang: { title: "The flame turns blue", text: "As you step into the fermenting cellar, your candle flame suddenly turns blue and shrinks. Your throat starts to burn, your temples throb.\n\nSomeone grabs your arm from behind and pulls you out through the door. It is Gáspár Fazekas. “The must gas, sir! One more minute and you'd have stayed down there too.” His eyes glint strangely in the lantern light." },
    kod: { title: "Gáspár in the fog", text: "The moment the chest lid springs open, boots crunch outside. Through the window you see Gáspár limping off towards the vineyard, into the fog.\n\nBárány the steward runs after him and catches his arm at the end of a row of vines. Gáspár doesn't resist. All he says is: “For forty years I made this wine.”" }
  },
  fates: {
    ilona: "Ilona really had been down there, really had staged the fall, and that was enough. The murder is pinned on her too. At the funeral the real killer even helps carry the coffin.",
    andras: "Disinheritance and the bills made a perfect motive. András is convicted of his father's murder, and Rozália never dares say what she saw from the window.",
    lorenz: "The fake aszú went to his cellar; the money came out of his pocket. Anton Lorenz is convicted, and his creditors auction off his Viennese wine house.",
    rozalia: "She saw the lantern and said nothing. Rozália, the cook from Mád, is convicted; for years the village whispers that the quiet girls are the most dangerous.",
    barany: "Bárány really did carry the body, and that was enough for the court. The steward is convicted of murder, and the cellar master goes on bottling fake aszú."
  },
puzzles: {
    halal: {
      title: "Where did he die?",
      body: `<p>The master lies at the foot of the stairs, but he did not necessarily die there. Look at the three branches of the cellar where he might have gone that evening.</p>`,
      options: {
        A: { label: "The foot of the cellar stairs", sample: "Not a drop of blood on the stone steps, the master's head unhurt. No candle and no glass beside him." },
        B: { label: "The fermenting cellar", sample: "On the table, a half-burned, extinguished candle and a tasting glass. Must footprints, and two drag marks on the floor towards the stairs." },
        C: { label: "The aszú chamber", sample: "A rusty padlock on the iron door, the dust on the threshold undisturbed. Nobody has opened it for weeks." }
      },
      confirm: "He died here",
      wrong: { A: "A fatal fall leaves traces. There is nothing here.", C: "Nobody walked through that undisturbed dust." },
      hints: ["In a cellar, an extinguished candle tells you more than a body. Where did one go out half burned?"]
    },
    hol: {
      title: "The night of the shaft", columnLabel: "Where between 23:00 and 23:30?",
      body: `<p>Someone closed the ventilation shaft while the master was down below. Who was where between eleven and half past? Here, several people may have been in the same place.</p>`,
      facts: [
        "Herr Lorenz and András played cards in the salon all evening. After eleven Lorenz won four hundred pengő, which András mentions angrily.",
        "Madame Ilona went up to her bedroom at eleven. At half past eleven the maid took her chamomile tea.",
        "Steward Bárány sat up with the sick horse in the stable; the coachman was with him the whole time.",
        "From the kitchen window Rozália saw a lantern by the ventilation shaft, and a limping figure. She herself was washing up until midnight.",
        "The press-house door was wired shut in the evening and found the same way, untouched, in the morning.",
        "Only one person on the estate limps."
      ],
      choices: ["Salon", "Bedroom", "Kitchen", "Stable", "Press house", "Courtyard, by the shaft"],
      answer: { ilona: "Bedroom", andras: "Salon", gaspar: "Courtyard, by the shaft", lorenz: "Salon", rozalia: "Kitchen", barany: "Stable" },
      hints: ["Read the suspects' descriptions. Who limps?"]
    },
    ido: {
      title: "The order of the night",
      body: `<p>Put in order what happened at the cellar that night. Only a few times are certain; the rest you must deduce from the witnesses.</p>`,
      facts: [
        "The master went down to the cellar at eleven sharp, with a candle and a tasting glass.",
        "First Rozália heard an iron bar clang by the cellar door, and a few minutes later she saw the lantern by the shaft.",
        "The cellar master said it himself: in a closed cellar the gas from fermenting must fills everything in half an hour, and the candle always goes out first.",
        "Around one the coachman heard the shaft cover creak from the stable. After that there was no bar on the door.",
        "Bárány says that at half past one Madame woke him, shouting, and together they carried the master up to the foot of the stairs. By then Ilona had already been down: she found the cellar door open and her husband inside.",
        "The pickers reached the cellar at half past five in the morning."
      ],
      items: { le: "The master goes down to the fermenting cellar", rud: "Someone puts the iron bar across the cellar door", kurto: "Someone closes the ventilation shaft", gyertya: "The candle goes out in the fermenting cellar", nyit: "Someone opens the shaft and removes the iron bar", talal: "Ilona goes down and finds her husband", visz: "The body is carried to the foot of the stairs", reggel: "The pickers find the master" },
      hints: ["The candle going out depends on the gas: it has to come after the shaft is closed, but before one o'clock."]
    },
    kod: {
      title: "The iron-bound chest",
      body: `<p>The cellar master's chest has a four-digit combination lock. The cellar boy says Gáspár likes to say: “All my locks open on my greatest year.” On the wall, Gáspár's handwritten vintage chart (puttonyos measures how sweet and rich an aszú is):</p>
<div class="typed">1932 · 3 puttonyos · weak year
1933 · 4 puttonyos
1934 · 5 puttonyos
1935 · 6 puttonyos
1936 · 3 puttonyos · hail
1937 · 5 puttonyos</div>`,
      wrong: "The lock won't open. Which was the greatest year?",
      hints: ["The number of puttonyos measures the rank of the aszú: the more, the greater the year."]
    },
    konyv: {
      title: "The secret notebook",
      plain: "LORENZ GOT FIFTY BOTTLES OF FAKE ASZU. TONIGHT THE MASTER WANTS TO TASTE FROM BARREL SEVEN. IF HE FINDS OUT, I AM FINISHED. THE SHAFT MUST BE CLOSED.",
      body: `<p>The last page of the notebook is a string of gibberish. The letters are not all shifted by the same amount: a keyword shifts them, letter by letter. Gáspár had little schooling; he certainly didn't take his key from books, but from the cellar.</p>`,
      hints: ["The keyword is on the barrel Gáspár calls his own. Only the word, not the year."]
    },
    vallomas: {
      title: "Ilona's statement",
      body: `<p>The widow's statement from the gendarmerie record. One highlighted part of it is not true. Compare it with what you found in her room.</p>`,
      statement: "[[I went to bed at eleven]], and [[Lőrinc went down to taste]], as he does every harvest. I took my drops and [[I never left my room until morning]]. [[I woke to the pickers shouting]]. [[I always told him those stairs were dangerous]].",
      wrong: {
        0: "That's true: the maid confirms she went up at eleven.",
        1: "That's true, everyone saw him go down.",
        3: "That may be so. It isn't the lie.",
        4: "Everyone has heard her say it. It isn't the lie."
      },
      hints: ["Cellar mould only grows on the cellar walls, and only clings if someone has been down there."]
    }
  },
  accusation: {
    who: { legend: "Who killed the master?", name: "the killer" },
    moved: { legend: "Who rearranged the scene?", name: "whoever rearranged the scene", extra: { senki: "Nobody; the master really did die on the stairs" } },
    how: { legend: "How did the master die?", name: "the cause of death", options: { lepcso: "He fell down the cellar stairs", gaz: "He suffocated on the gas from fermenting must in the closed cellar", mereg: "He was poisoned with the tasting wine" } },
    why: { legend: "Why did the killer kill?", name: "the motive", options: { orokseg: "For the inheritance", valto: "Because of the unpaid IOUs", hamis: "The master would have exposed the sale of fake aszú", szerelem: "Out of jealousy" } }
  },
  carnation: { found: "In Gáspár's chest, under the forged labels, a pressed black carnation and a typed note. In its bottom right corner, a letter circled in red.", note: "“Tonight the master tastes from barrel seven. Lorenz won't buy from you again. The shaft cover closes with a screw. — F. Sz.”" },
  ending: {
    heading: "Gáspár Fazekas, and the widow covered the tracks.",
    paragraphs: [
      "For years the cellar master had been selling the estate's finest aszú behind the master's back and topping the barrels up with cheap wine. That evening the master announced he wanted to taste from barrel seven. Gáspár knew there was no real wine left in it, and he knew the master would find out.",
      "When Récsey went down at eleven, Gáspár barred the door of the fermenting cellar, then limped up to the courtyard and closed the ventilation shaft. In half an hour the gas from the fermenting must filled the cellar. At one he opened the shaft and took away the bar, so that by morning it would look like an accident: every year the must gas kills someone in the Tokaj hills.",
      "But at half past one Ilona went down for her husband. She thought her son had killed him after the afternoon's quarrel. She woke Bárány, and together they carried the master to the foot of the stairs to make it look like a fall. So a gas accident became a badly staged fall, and that is why someone looked at everything twice. The mould on Ilona's slippers, the limping figure by the shaft and the keyword FURMINT gave it all away in the end."
    ]
  },
  interviews: {
    ilona: {
      i1: { q: "How did you sleep last night?", a: "“I took my drops and didn't stir until morning.” Meanwhile she keeps straightening her slippers." },
      i2: { q: "What did your husband and son argue about?", a: "“The IOUs. Lőrinc threatened to disinherit András. They said terrible things to each other.” As if she fears what her son said." }
    },
    andras: {
      a1: { q: "Where were you between eleven and midnight?", a: "“Playing cards with Herr Lorenz, and losing four hundred pengő. Ask him, I'm sure he remembers.”" },
      a2: { q: "Who knows about fake aszú?", a: "“Fake aszú? In my father's cellar? Uncle Gáspár has guarded those barrels for forty years…” He falls silent." }
    },
    gaspar: {
      g1: { q: "How can someone die in the cellar?", a: "“The must gas, sir. In a closed cellar it fills the air in half an hour. The candle always goes out first. Anyone who doesn't know that is no cellarman.”" },
      g2: { q: "Which is your best barrel?", a: "“Number seven. Nobody may touch it. That's my furmint.”" },
      g3: { q: "What was your greatest year?", a: "“Thirty-five. Six puttonyos. There'll never be aszú like it again in these hills.”" }
    },
    lorenz: {
      l1: { q: "Whom did you buy wine from this year?", a: "“From the cellar master, as always. Fifty bottles of thirty-five six-puttonyos. Cash; he asked for it that way.”" },
      l2: { q: "What do you know about the master's tasting?", a: "“This evening he announced he wanted to taste from barrel seven. The cellar master went oddly pale.”" }
    },
    rozalia: {
      r1: { q: "Did you see anything from the kitchen window?", a: "“Nothing. I was washing up.” The window looks straight at the ventilation shaft." },
      r2: { q: "What do you know about András?", a: "She blushes. “He's a good man. He wouldn't do such a thing. I… I saw someone by the shaft, and it certainly wasn't him. Whoever it was limped.”" }
    },
    barany: {
      b1: { q: "What's wrong with the horse?", a: "“Colic. I sat up with him all night with the coachman.” He rubs his coat sleeve." },
      b2: { q: "Did you hear anything in the night?", a: "“Around one the shaft cover creaked. The coachman heard it too. After that… after that, nothing.”" }
    }
  },
  reveal: [
    { say: "Ladies and gentlemen, the master did not die on the stairs. There is no blood on the steps, his head is unhurt, must is drying on his boots.",
      objection: "“He fell! I always said those stairs would be the death of him!”",
      win: "He died in the fermenting cellar. That is where his candle went out half burned, and from there the body was dragged towards the stairs." },
    { say: "Someone carried the body to the foot of the stairs to make it look like a fall.",
      objection: "“I never left my room until morning!”",
      win: "There is cellar mould on your slippers, madame. It only grows on the cellar walls. At half past one you were down there, with steward Bárány." },
    { say: "But you did not kill the master. He suffocated: someone barred the door and closed the ventilation shaft.",
      objection: "“I was in the press house watching the must!”",
      win: "The press-house door was untouched in the morning. From the kitchen window Rozália saw a limping figure by the shaft, with a lantern. You are the only one on the estate who limps." },
    { say: "And why. The master wanted to taste from barrel seven.",
      objection: "“That's my best furmint!”",
      win: "There is no aszú left in barrel seven. You sold it to Herr Lorenz under forged labels. You even wrote it in your notebook: if he finds out, I'm finished. The shaft must be closed." }
  ],
  confession: "“Forty years I made the wine and he put his name on it. A little aszú for my old age, that's all I needed. When he said barrel seven, I knew it was over. The cellar would see to it. The cellar always sees to it.”"
};
