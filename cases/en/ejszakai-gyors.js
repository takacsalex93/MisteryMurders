/* English: Case 3 — The Night Express */
(window.MM_EN = window.MM_EN || {})["ejszakai-gyors"] = {
  title: "The Night Express",
  meta: "Budapest–Kassa sleeping car · 19 December 1936 · Case no. 1936/1204",
  teaser: "The night express to Kassa is stuck in the snow. By morning the bank director lies dead in his compartment, the security chain hooked on the inside. Six passengers, several lies, and someone did not act alone.",
  intro: {
    eyebrow: "Royal Hungarian State Railways · Railway gendarmerie",
    heading: "The death of Kristóf Ráday in Compartment 3",
    lead: "At 01:20 on the night of 19 December 1936, the night express from Budapest to Kassa (today's Košice) stuck fast in a snowdrift beyond Szikszó. It did not move again until three in the morning. At six the sleeping-car conductor found the bank director Kristóf Ráday dead in Compartment 3.",
    body: "Ráday had been stabbed with his own paper knife. The security chain on the corridor door was hooked from the inside; the window was frozen shut. Six people were travelling in the car, and nobody could have got off in the snow. The conductor swears Ráday was still alive after two. Someone is lying, and not alone."
  },
  suspects: {
    agnes: { name: "Ágnes Ráday", role: "The victim's sister, 50. His sole heir.",
      stmt: "“Around half past one I heard a quarrel through the wall, Kristóf's voice and another man's. I couldn't make out the words. Then it went quiet, and very cold.”" },
    wolf: { name: "Herbert Wolf", role: "Austrian watch salesman, 44. Travels this line often.",
      stmt: "“Around one I went to the dining car because I couldn't sleep. There was singing, we played cards. I didn't know this banker.”" },
    iren: { name: "Irén Csermák", role: "Governess, 35. Travelling alone to Kassa.",
      stmt: "“I didn't know Mr Ráday. I was in my compartment all night, I slept badly.”" },
    kornelia: { name: "Kornélia Vay", role: "Opera singer, 29. On her way to a guest engagement at the Kassa theatre.",
      stmt: "“Mr Ráday was a dear old gentleman. After one I was singing in the dining car, because it was too cold to sleep.”" },
    somlo: { name: "Dezső Somló", role: "Ráday's general manager, 39. Twelve years with the bank.",
      stmt: "“I last saw my chief at midnight; we went over the figures. Then I slept, and just before two I went to play cards. The conductor said himself that he was still alive after two.”" },
    bodnar: { name: "Lajos Bodnár", role: "Sleeping-car conductor, 50. Eighteen years on the line.",
      stmt: "“At 02:10 I took the director a blanket, because the heating had gone. He was alive, grumbling at me not to disturb him again. At six I found him.”" }
  },
  clues: {
    holttest: { t: "The body", src: "Compartment 3", x: "Ráday was stabbed through the heart with his own silver paper knife. The body is completely cold, but so was the compartment. The chain on the corridor door was hooked from the inside; the conductor forced it in the morning. The blanket lies folded on the luggage rack, untouched." },
    medal: { t: "The silver locket", src: "Compartment 3", x: "In Ráday's waistcoat pocket, over his heart, a silver locket. Inside, a photograph of a young woman, engraved on the back: “Klára, 1912.” Ágnes says Klára was her brother's first wife, who died young." },
    naplo: { t: "Ráday's secret entry", src: "Compartment 3 · diary", x: "“Somló is robbing the bank with forged bills of exchange. I shall report him in Kassa. I don't trust the conductor either; they whisper too much.” Ráday knew his manager was a fraud and meant this journey to end at the police." },
    ido: { t: "The night's timeline", src: "Dining car", x: "The order of the night: 01:20 the train stops, Ráday's last entry, a quarrel in the compartment, the heating turned off, Somló sits down shivering to play cards (01:50), the conductor's blanket (02:10), 03:00 departure." },
    fulkek: { t: "Who travelled in which compartment?", src: "Corridor · passenger list", x: "1: Irén Csermák · 2: Ágnes Ráday · 3: Kristóf Ráday · 4: Dezső Somló · 5: Kornélia Vay · 6: empty · 7: Herbert Wolf · conductor's cabin: Lajos Bodnár. Somló's compartment shares a washroom with Ráday's." },
    bejarat: { t: "The way through the washroom", src: "Shared washroom (3–4)", x: "The chain on the corridor door was hooked from the inside; the frost sealed the window. The killer came in from Compartment 4 through the shared washroom and left the same way. The bolt on the 3 side is open, the soap dish knocked over, a wet footprint on the floor heading towards 4." },
    utlevel: { t: "Somló's passport", src: "Somló's compartment", x: "Dezső Somló, general manager. Place and date of birth: Szeged, 9 February 1897. Tucked in the passport, a Kassa hotel's card, booked for two nights." },
    boritek: { t: "The envelope for the conductor", src: "Somló's compartment · briefcase", x: "In the briefcase, a bundle of forged bills of exchange bearing Ráday's signature, and a sealed envelope with 500 pengő. On it, in Somló's hand: “B. L. — the other half in Kassa.” Bodnár Lajos, the conductor (Hungarians put the surname first)." },
    futes: { t: "The heating valve", src: "Conductor's cabin", x: "The sleeping car's heating can only be shut off at the valve in the conductor's cabin, with the conductor's square key. A fresh oily fingerprint on the valve; the key is in Bodnár's pocket." },
    vegrendelet: { t: "The will", src: "Passengers' luggage", x: "In Ágnes's bag, a copy of her brother's will: she inherits everything." },
    orak: { t: "The false-bottomed suitcase", src: "Passengers' luggage", x: "Beneath Wolf's sample collection, in a hidden compartment, thirty Swiss wristwatches on which no duty has been paid." },
    valtok: { t: "Kornélia's bills", src: "Passengers' luggage", x: "In Kornélia's handbag, a letter from Ráday: “Your bills have fallen due. We shall talk in Kassa.” A debt of six thousand pengő." },
    level: { t: "A letter never sent", src: "Passengers' luggage", x: "In Irén's suitcase, a letter beginning “Dear Father”, addressed to Kristóf Ráday. It is still in its envelope, unsealed." }
  },
  contradictions: {
    "c-bodnar": { reveal: "Bodnár looks at the blanket and turns pale: “Maybe… I didn't take it in after all. I was tired, I get muddled.”" },
    "c-bodnar2": { reveal: "Bodnár breaks down: “Mr Somló gave it to me. He said all I had to say was that the director was alive after two. And to turn the heating off. I didn't know what it was for!”" },
    "c-bodnar3": { reveal: "Bodnár's hand shakes: “The valve… it stuck by itself. It happens sometimes.” Only his key fits the valve." },
    "c-somlo": { reveal: "Somló's smile freezes: “A tip. For the night service.” A five-hundred-pengő tip, with the other half in Kassa." },
    "c-somlo2": { reveal: "Somló is silent for a long time. “An old man's obsessions,” he says at last, but his hand is trembling." },
    "c-iren": { reveal: "Irén bows her head: “He was my father. I wanted to speak to him for the first time on this journey. I didn't dare knock. Madame Ágnes heard me coughing in my compartment all night.”" },
    "c-kornelia": { reveal: "Kornélia's face hardens: “Yes, I owed him. A dear old gentleman, bills and all. But after one I was singing in the dining car, the whole carriage heard me.”" },
    "c-wolf": { reveal: "Wolf lowers his voice: “All right, I smuggle. But from one until half past two I was playing cards under the waiter's nose.”" },
    "c-agnes": { reveal: "Ágnes is not flustered: “I inherit everything, everyone knows that. And I reported the quarrel. There's no way through from my compartment to his.”" }
  },
  locations: {
    fulke3: { name: "Compartment 3", desc: "Mahogany panelling, a brass lamp, a frozen window. Kristóf Ráday lies on the lower berth.",
      items: { holttest: { label: "The body", text: "The banker, half dressed, the paper knife still in his chest." },
               medal: { label: "The waistcoat pocket", text: "Something round and cold, right over the heart." } } },
    folyoso: { name: "Corridor", desc: "A narrow carpet, frosted windows, numbered compartment doors and the conductor's passenger list, half torn away." },
    mosdo: { name: "Compartment 3 washroom", desc: "A cramped washroom with two doors: one into Compartment 3, the other into the next one." },
    somlo: { name: "Somló's compartment", desc: "A neat bed, a soaked overcoat on the hook, a black briefcase under the berth.",
      items: { utlevel: { label: "The overcoat pocket", text: "A burgundy passport and a few railway tickets." } } },
    etkezo: { name: "Dining car", desc: "Empty glasses, cards laid out, the waiter dozing on a chair." },
    kalauz: { name: "Conductor's cabin", desc: "A samovar, timetables, valves and switches on the wall.",
      items: { futes: { label: "The heating valve", text: "A red-painted wheel, turned to closed." } } },
    csomagok: { name: "Passengers' luggage", desc: "With the gendarmes' permission you may go through the other passengers' luggage.",
      items: { vegrendelet: { label: "Ágnes Ráday's bag", text: "A thick, sealed envelope." },
               orak: { label: "Herbert Wolf's suitcase", text: "Suspiciously heavy for a sample case." },
               valtok: { label: "Kornélia Vay's handbag", text: "Powder, sheet music and a crumpled letter." },
               level: { label: "Irén Csermák's suitcase", text: "Among carefully folded clothes, an unsealed envelope." } } }
  },
  puzzles: {
    naplo: {
      title: "The secret diary",
      plain: "SOMLO IS ROBBING THE BANK WITH FORGED BILLS. I SHALL REPORT HIM IN KASSA. I DO NOT TRUST THE CONDUCTOR EITHER, THEY WHISPER TOO MUCH.",
      body: `<p>The last page of Ráday's pocket diary is a string of gibberish. Inside the cover, in his hand:</p>
<div class="typed">“The key is the one I carry over my heart.”</div>
<p>The letters are not all shifted by the same amount: a keyword shifts them, letter by letter. Once you have the keyword, type it in.</p>`,
      hints: ["Look at what Ráday literally carried over his heart. The key is a name, without accents."]
    },
    fulkek: {
      title: "The passenger list", columnLabel: "Where did they travel?",
      body: `<p>The conductor's passenger list is half torn away; the compartment numbers beside the names are gone. Ráday travelled in Compartment 3. Work out the others from what the passengers and staff say. One compartment was empty.</p>`,
      facts: [
        "The sleeping car's compartments share washrooms in pairs: 1–2, 3–4 and 5–6. Number 7 has no washroom partner. The conductor travels in his own cabin at the end of the car.",
        "Lajos Bodnár, when he wasn't walking the corridor, rested at his post.",
        "Ágnes Ráday heard the quarrel from her brother's compartment through the wall, but she does not share his washroom.",
        "Irén Csermák's washroom partner was Ágnes.",
        "Herbert Wolf asked for a compartment without a washroom partner, because of his sample collection.",
        "Ráday insisted on having his manager close at hand: Somló was his washroom partner.",
        "Kornélia Vay asked for an odd-numbered compartment out of superstition, and her washroom partner's compartment stayed empty."
      ],
      choices: ["Compartment 1", "Compartment 2", "Compartment 4", "Compartment 5", "Compartment 6", "Compartment 7", "Conductor's cabin"],
      answer: { agnes: "Compartment 2", wolf: "Compartment 7", iren: "Compartment 1", kornelia: "Compartment 5", somlo: "Compartment 4", bodnar: "Conductor's cabin" },
      hints: ["Only Compartments 2 and 4 are next to Ráday's. Only one of them shares his washroom."]
    },
    bejarat: {
      title: "The way in",
      body: `<p>The chain on the corridor door of Compartment 3 was hooked from the inside. How did the killer get in and out? Compare the traces along the three possible routes.</p>`,
      options: {
        A: { label: "Through the corridor door, with the conductor's key", sample: "The chain was hooked from the inside; the conductor had to force it in the morning. It cannot be hooked from outside." },
        B: { label: "Through the shared washroom, from the next compartment", sample: "The bolt on the 3 side is open, the soap dish knocked over. On the linoleum, a wet shoe print heading towards the other door." },
        C: { label: "Through the window, while the train was stopped", sample: "The frost has welded the window into its frame. Outside, the snow on the sill is smooth and untouched." }
      },
      confirm: "This way in",
      wrong: { A: "The chain can only be hooked from the inside. The killer didn't leave this way.", C: "Nobody could have opened the frozen window; the snow is untouched." },
      hints: ["The security chain can only be hooked from the inside. So where did the killer leave the compartment?"]
    },
    aktataska: {
      title: "Somló's briefcase",
      body: `<p>Somló's black briefcase has a six-digit combination lock. Everyone at the bank knew that the manager set every lock, safe and password to his own birthday.</p>`,
      wrong: "The lock won't give. Six digits, but not these.",
      hints: ["The date of birth is in the passport. Six digits: day, month and the last two digits of the year."]
    },
    idorend: {
      title: "The night's timeline",
      body: `<p>The waiter has woken up and now everyone is talking at once. Put the night's events in order. Only two times are known for certain; the rest you must work out.</p>`,
      facts: [
        "The driver's log says the train stuck at 01:20 and started again at 03:00.",
        "Ráday's last, uncoded entry reads: “We have stopped. S. is coming with the figures.”",
        "Ágnes says the quarrel began shortly after the scratching of the pen beyond the wall fell silent.",
        "The heating can only be shut off from the conductor's cabin. Ágnes began to feel cold after the quarrel died down.",
        "The waiter says Somló sat down to cards shivering, because by then the sleeping car was already cold.",
        "The conductor claims he took the blanket in twenty minutes after the card game began, at 02:10."
      ],
      items: { megall: "The train sticks in the snow", naplo: "Ráday writes his last diary entry", veszek: "Ágnes hears a quarrel through the wall", futes: "Someone shuts off the car's heating", kartya: "Somló starts playing cards with Wolf in the dining car", takaro: "According to the conductor, he takes Ráday a blanket and Ráday is alive", indul: "The locomotive starts again" },
      hints: ["The first and last events come from the driver's log. For the rest, watch what caused the cold."]
    }
  },
  accusation: {
    who: { legend: "Who stabbed Ráday?", name: "the culprit" },
    help: { legend: "Who helped him?", name: "the accomplice", extra: { senki: "He had no accomplice" } },
    how: { legend: "How did he get into the compartment?", name: "the way in", options: { folyoso: "Through the corridor door, with the conductor's key", mosdo: "Through the shared washroom, from the next compartment", ablak: "Through the window, while the train was stopped" } },
    why: { legend: "Why did he kill?", name: "the motive", options: { orokseg: "To get the inheritance", valto: "To have overdue bills forgiven", csalas: "Ráday meant to expose his embezzlement in Kassa", csalad: "An old family grievance" } }
  },
  ending: {
    heading: "Dezső Somló, and the conductor helped him.",
    paragraphs: [
      "For years Somló had been robbing the bank with forged bills of exchange. Ráday found out and meant to go to the police in Kassa. Somló knew this night was all he had left. He bought the conductor: five hundred pengő in advance, the other half in Kassa.",
      "When the train stuck in the snow, Ráday was just writing in his diary that Somló was coming with the figures. Somló went in through the shared washroom, and after the quarrel stabbed his chief with his own paper knife and left the same way. Ráday himself had hooked the chain on the corridor door that evening. Bodnár then shut off the heating so that the body would cool quickly, and Somló sat down shivering to play cards.",
      "The 02:10 blanket was the heart of the plan: it showed Ráday alive when Somló already had an alibi. But nobody had used the blanket, the key to the diary hung over the dead man's heart, and the envelope with the conductor's initials stayed in the killer's briefcase. Ágnes's inheritance, Kornélia's bills, Wolf's watches and Irén's letter were simply the train's other secrets."
    ]
  },
  interviews: {
    agnes: {
      a1: { q: "What did you hear of the quarrel?", a: "“Two men's voices. Kristóf shouted: ‘I'll tell everything in Kassa!’ The other spoke more quietly, as if from next door.”" },
      a2: { q: "Who was Klára?", a: "“Kristóf's first wife. She died young. Kristóf never took off her locket; he wore it over his heart.”" },
      a3: { q: "Who was coughing in the night?", a: "“My neighbour, that governess. She coughed through the wall all night; I barely slept.”" }
    },
    wolf: {
      w1: { q: "Who sat with you at the card table?", a: "“The banker's manager. He sat down shivering and said the sleeping car was already freezing. Yet when I left it before one, it was still warm.”" },
      w2: { q: "When did Somló sit down?", a: "“Ten minutes to two. I looked at my watch. Watches are my trade, sir.”" },
      w3: { q: "What is in your suitcase?", a: "“Samples. All right, all right… not only samples. But nobody gets killed over that.”" }
    },
    iren: {
      i1: { q: "Why are you going to Kassa?", a: "“I'm starting a new post with a family.” She does not meet your eyes." },
      i2: { q: "Did you know Mr Ráday?", a: "“He was my father. All my life I only knew his name. I wanted to introduce myself to him on this journey. Now I never will.”" }
    },
    kornelia: {
      k1: { q: "What did you sing in the dining car?", a: "“The Csárdás Princess, three times over. The waiter was begging me to stop.”" },
      k2: { q: "Did you owe Ráday money?", a: "“Six thousand pengő. We were going to settle it in Kassa. It's hard to settle with a dead man, isn't it? I needed him alive.”" }
    },
    somlo: {
      s1: { q: "What did you talk about at midnight?", a: "“The quarterly figures. Mr Ráday was pleased. He said he would put me forward for a decoration in Kassa.”" },
      s2: { q: "Which compartment were you in?", a: "“Next to the director's. He insisted on having me close at hand.” Perhaps he should not have said that." },
      s3: { q: "When is your birthday?", a: "“The ninth of February. Why does that matter?” He glances at his briefcase." }
    },
    bodnar: {
      b1: { q: "Why did the heating go?", a: "“A valve stuck. It happens in this cold. I told the passengers straight away.”" },
      b2: { q: "Did Mr Ráday use the blanket?", a: "“Well… surely. He wrapped up in it, I suppose. I just handed it in.” The folded blanket on the luggage rack says otherwise." },
      b3: { q: "Who can shut off the heating?", a: "“Only from the conductor's cabin, with the square key. I always have it on me.” Then he falls silent." }
    }
  },
  reveal: [
    { say: "The chain on the door of Compartment 3 was hooked from the inside. So the killer did not come from the corridor.",
      objection: "“Then nobody could have got in! It must have been his heart!”",
      win: "A heart attack with a paper knife? The killer came through the shared washroom and left the same way. The wet footprint leads to the next compartment." },
    { say: "Ráday shared that washroom with only one fellow passenger.",
      objection: "“I was asleep the whole time, then I went to play cards!”",
      win: "With you, Mr Somló. Compartment 4 is yours, and the washroom belongs to you both." },
    { say: "Your alibi rests on a single man: the conductor, who says Ráday was still alive at 02:10.",
      objection: "“I took him the blanket, and he grumbled at me not to disturb him!”",
      win: "The blanket lies folded on the luggage rack; nobody used it. And in Somló's briefcase is the envelope: B. L., five hundred pengő, the other half in Kassa." },
    { say: "And why? Ráday wrote it in his diary, coded with the name of his dead wife.",
      objection: "“An old man's obsessions!”",
      win: "“Somló is robbing the bank with forged bills. I shall report him in Kassa.” Ráday never reached Kassa." }
  ],
  confession: "“I served that man for twelve years. One bad year, and he wanted to send me to prison for it. I couldn't let him reach Kassa. The conductor was easy to buy. You, unfortunately, were not.”"
};
