/* Nyelvválasztás. A magyar az alap; angolul a felületet ez a szótár, az ügyeket a cases/en/*.js fájlok fordítják.
   Kulcs: a magyar szöveg; {0}, {1} a behelyettesítendő értékek. */
(function () {
  "use strict";
  const KEY = "mm:lang";
  let lang = "hu";
  try { lang = localStorage.getItem(KEY) || (/^hu\b/i.test(navigator.language || "hu") ? "hu" : "en"); } catch (e) {}
  lang = "hu"; // az angol változat egyelőre ki van kapcsolva (cases/en/*.js)
  document.documentElement.lang = lang;

  const EN = {
    "Kutasd át a helyszíneket. A nyomok a leírásban rejtőznek: kattints arra, ami gyanús, de vigyázz, nem minden részlet nyom.": "Search the locations. The clues hide in the descriptions: click whatever looks suspicious, but beware, not every detail is a clue.",
    "Vesd össze a nyomokat, és vond le a következtetéseket. A játék nem mondja meg helyetted, mit jelentenek.": "Compare clues and draw your own conclusions. The game won't tell you what they mean.",
    "Emelj vádat, és minden állításodhoz jelöld meg a döntő bizonyítékot. Ha ártatlant nevezel meg, azt letartóztatják, és az ügy elveszett.": "Bring a charge and back every claim with the decisive evidence. If you name an innocent person, they are arrested and the case is lost.",
    "Következtetés": "Deduction",
    "Mester mód": "Master mode",
    "TEENDŐ:\n1. Járd végig a helyszíneket. Olvasd figyelmesen a leírást: a nyomokra neked kell rábukkannod, és nem minden gyanús részlet nyom.\n2. Oldd meg a(z) {0} rejtvényt.\n3. A Jegyzetfüzetben vesd össze a nyomokat. A következtetést neked kell levonnod.\n4. Szembesítsd a gyanúsítottakat. Aki hazudik, nem feltétlenül gyilkos.\n5. Emelj vádat bizonyítékokkal. Ha ártatlant nevezel meg, azt letartóztatják, és nincs visszaút.": "TO DO:\n1. Search the locations. Read the descriptions carefully: you have to spot the clues yourself, and not every suspicious detail is a clue.\n2. Solve the {0} puzzles.\n3. Compare clues in the Notebook. Drawing the conclusion is up to you.\n4. Confront the suspects. A liar is not necessarily a killer.\n5. Bring a charge with evidence. If you name an innocent person, they will be arrested, and there is no going back.",
    "{0} nyom innen": "{0} clue(s) from here",
    "Válassz egy helyiséget.": "Choose a room.",
    "Következtetéseid": "Your deductions",
    "Nyomok": "Clues",
    "{0} nyom": "{0} clues",
    "Kattints arra a részletre, amit közelebbről megnéznél. Nem minden gyanús dolog nyom.": "Click any detail you want to look at more closely. Not everything suspicious is a clue.",
    "Megnézted:": "Examined:",
    "Nem stimmel.": "That doesn't add up.",
    "nincs súgó, nincs ✦ jelölés és számláló, és senki sem mondja meg, mennyire jársz közel.": "no hints, no ✦ marks or counters, and nobody tells you how close you are.",
    "Összevetés": "Compare clues",
    "Válassz két nyomot, amelyek együtt többet árulnak el, mint külön-külön, és vond le a következtetést. Az elhamarkodott összevetés pontlevonással jár.": "Pick two clues that reveal more together than apart, and draw the conclusion. Hasty comparisons cost points.",
    "Ehhez legalább két nyom kell.": "You need at least two clues for this.",
    "Első nyom…": "First clue…",
    "Második nyom…": "Second clue…",
    "Összevetem": "Compare",
    "Összevetve:": "Compared:",
    "Ez a következtetésem": "That's my conclusion",
    "Levont következtetések: {0}": "Deductions drawn: {0}",
    "Levont következtetések: {0} / {1}": "Deductions drawn: {0} / {1}",
    "Válassz két különböző nyomot.": "Choose two different clues.",
    "Ezt a következtetést már levontad.": "You have already drawn that conclusion.",
    "Ez a kettő együtt sem mond többet, mint külön-külön.": "Together these two say no more than they do apart.",
    "Ez nem következik belőle. Gondold végig újra.": "That doesn't follow. Think it through again.",
    "Váratlan fordulat": "An unexpected turn",
    "Új nyom:": "New clue:",
    "Folytatom a nyomozást": "Continue the investigation",
    "Vigyázz: akit tettesként megnevezel, azt a csendőrök letartóztatják. Ha ártatlan, nincs visszaút. A bizonyítékokban tévedhetsz, a személyben nem.": "Careful: whoever you name as the killer will be arrested by the gendarmes. If they are innocent, there is no going back. You may get the evidence wrong, but not the person.",
    "Az ügyvéd közbevág: a vád így nem áll meg. Még {0} próbálkozásod van.": "The lawyer cuts in: the charge doesn't hold up like this. You have {0} tries left.",
    "{0} hiába bizonygatta az ártatlanságát. A bíróság a te vallomásod alapján ítélte el.": "{0} protested their innocence in vain. The court convicted them on your testimony.",
    "Az ügyet balesetként zárták le, és senki sem kereste tovább a tettest.": "The case was closed as an accident, and nobody looked for the killer again.",
    "Téves vád": "Wrong accusation",
    "{0} letartóztatása": "The arrest of {0}",
    "Lezárt akta": "Case closed",
    "A valódi tettes végignézte, ahogy elvezetik a megvádoltat. Másnap reggel ő is elhagyta a házat, szabadon.": "The real killer watched as the accused was led away. The next morning they too left the house, free.",
    "Újrakezdheted az ügyet, vagy megnézheted, mi történt valójában.": "You can start the case again, or see what really happened.",
    "Ami kiderült, és ami rejtve maradt": "What came to light, and what stayed hidden",
    "Semmi sem maradt rejtve. A ház minden titka napvilágra került, és a vádirat egyetlen kérdést sem hagyott nyitva.": "Nothing stayed hidden. Every secret in the house came to light, and the charge left not a single question open.",
    "Nem mindenki titka került napvilágra. {0} elhallgatott valamit, amire sosem kérdeztél rá, és ez a titok velük együtt távozott a házból.": "Not every secret came to light. {0} kept something back that you never asked about, and that secret left the house with them.",
    "Minden hazugságot leleplezted, de nem minden következtetést vontál le.": "You exposed every lie, but you didn't draw every conclusion.",
    "Mesterdetektív: Poirot is tőled tanulna": "Master detective: Poirot could learn from you",
    "{0} elhamarkodott összevetés": "{0} hasty comparison(s)",
    "A helyszín alaprajza": "Floor plan",
    "A játékállás ebben a böngészőben mentődik, bármikor folytathatod.": "Your progress is saved in this browser, so you can come back any time.",
    "A kapitányság dicséretét kapod": "Commended by the chief of police",
    "A leleplezés · {0}. lépés / {1}": "The reveal · step {0} of {1}",
    "A megoldás, amit nem sikerült bizonyítanod": "The solution you could not prove",
    "A nyomozó parafatáblája": "The detective's corkboard",
    "A szöveg még mindig értelmetlen. Rossz a kulcs.": "Still gibberish. Wrong key.",
    "A tettes kicsúszott a kezeid közül.": "The killer slipped through your fingers.",
    "A vád megállt. Most mondd el nekik, hogyan történt. Minden ellenvetésre felelj a megfelelő bizonyítékkal.": "The charge holds. Now tell them how it happened. Answer every objection with the right piece of evidence.",
    "Az időrend összeállt": "The timeline is complete",
    "Az idővonal összeállt": "The timeline is complete",
    "Az igazság pillanata": "The moment of truth",
    "Az ügyvéd közbevág: a vádból {0} pont nem áll meg. Hogy melyik, azt neked kell kitalálnod. Még {1} próbálkozásod van.": "The lawyer cuts in: {0} point(s) of your charge don't hold up. Which ones, you will have to work out. {1} attempt(s) left.",
    "Azonosítva": "Identified",
    "Bezárás": "Close",
    "Bizonyíték": "Evidence",
    "Biztosan? Kattints újra a törléshez": "Are you sure? Click again to erase",
    "Döntő bizonyíték:": "Decisive evidence:",
    "Ellenőrzöm": "Check",
    "Elszalasztva": "Case lost",
    "Eltolás": "Shift",
    "Eltolás csökkentése": "Decrease shift",
    "Eltolás növelése": "Increase shift",
    "Előbb válassz egy nyomot.": "Pick a clue first.",
    "Előbb válassz egyet.": "Pick one first.",
    "Emelj vádat, és minden állításodhoz jelöld meg a döntő bizonyítékot. Három próbálkozásod van.": "Make your accusation and back every claim with decisive evidence. You have three attempts.",
    "Eredménykártya": "Result card",
    "Ez a mondat megáll. Keress tovább.": "That part holds up. Keep looking.",
    "Ez az": "This one",
    "Ez még mindig zagyvaság. Forgasd tovább.": "Still gibberish. Keep turning.",
    "Ezt már tisztáztátok.": "You have already cleared that up.",
    "Feljebb": "Move up",
    "Felmutatom": "Present it",
    "Felmutatom a bizonyítékot…": "Present the evidence…",
    "Feltárt ellentmondások": "Contradictions uncovered",
    "Folytatom": "Continue",
    "Fonal húzása": "Draw string",
    "Fonalak le": "Remove strings",
    "Gyanúsított": "Suspect",
    "Gyanúsítottak": "Suspects",
    "Hajnal előtt megoldva, {0} tartalékkal": "Solved before dawn with {0} to spare",
    "Hajnal előtt, {0} tartalékkal": "Before dawn, {0} to spare",
    "Hajnalig, időre": "Against the clock",
    "Halott a házban, mindenkinek van titka, és csak egyikük gyilkos. Járd be a helyszíneket, fejtsd meg a rejtvényeket, és nevezd meg a tettest.": "A body in the house, everyone with a secret, and only one of them a killer. Search the rooms, crack the puzzles and name the culprit.",
    "Harmadszor sem állt meg a vád. Reggel megérkeztek a csendőrök, de a bizonyítékok addigra összekuszálódtak, és a gyilkos szabadon távozott. Ilyen is előfordul a legjobbakkal.": "The charge failed a third time. The police arrived in the morning, but by then the evidence was in tatters and the killer walked free. It happens to the best of us.",
    "Hat gyanúsított, egymásra épülő rejtvények, és egynél több embert kell leleplezned. Csak egy súgó rejtvényenként.": "Six suspects, interlocking puzzles, and more than one person to unmask. Only one hint per puzzle.",
    "Hazudott": "Lied",
    "Helyszín": "Location",
    "Helyszínek": "Locations",
    "Helyszínelés indítása": "Start the investigation",
    "Hercule Poirot is megsüvegelné": "Hercule Poirot would tip his hat",
    "Hogyan játssz?": "How to play",
    "Hogyan nyomozol?": "How will you investigate?",
    "Húzd a kártyákat oda, ahová szeretnéd, és köss össze piros fonallal mindent, ami összetartozik.": "Drag the cards wherever you like and tie together everything that belongs together with red string.",
    "Időre játszva minden lépés perceket visz el, és a csendőrök {0} múlva megérkeznek.": "Against the clock, every action costs minutes, and the police arrive in {0}.",
    "Jegyzetfüzet": "Notebook",
    "Kattints két kártyára, hogy összekösd őket. Fonalra kattintva levághatod.": "Click two cards to tie them together. Click a string to cut it.",
    "Kifutottál az időből. Hajnalban megérkeztek a csendőrök, és a bizonyítékok hiányában mindenkit elengedtek. A gyilkos még aznap reggel eltűnt.": "You ran out of time. The police arrived at dawn and, for lack of evidence, let everyone go. The killer vanished that same morning.",
    "Kihagyom": "Skip",
    "Kihallgatási jegyzőkönyvek": "Interview transcripts",
    "Kimondom a vádat": "Make the accusation",
    "Kimásolva, beillesztheted bárhová.": "Copied. Paste it anywhere.",
    "Kinyílt": "Unlocked",
    "Kipróbálom": "Try it",
    "Klasszikus krimik a böngészőben": "Classic whodunnits in your browser",
    "Kulcsszó": "Keyword",
    "Kutasd át a helyszíneket, és gyűjtsd a nyomokat a jegyzetfüzetbe.": "Search the locations and collect clues in your notebook.",
    "Kép letöltése": "Download image",
    "Könnyű": "Easy",
    "Közepes": "Medium",
    "Lejjebb": "Move down",
    "Megbízható nyomozó": "A reliable detective",
    "Megfejtve": "Deciphered",
    "Megmutatom a megoldást": "Show me the solution",
    "Megnézem": "View",
    "Megoldva": "Solved",
    "Megoldás": "Solution",
    "Megosztás": "Share",
    "Megvan az ellentmondás": "Contradiction found",
    "Megvan!": "Got it!",
    "Megvizsgálom": "Examine",
    "Megérkeztek a csendőrök.": "The police have arrived.",
    "Minden kérdésre válaszolj, és mindenhol jelöld meg a bizonyítékot.": "Answer every question and pick evidence for each one.",
    "Minden sort tölts ki.": "Fill in every row.",
    "Mindenki mond valamit, és mindenki elhallgat valamit.": "Everyone says something, and everyone keeps something back.",
    "Mindenki máshol volt: egy lehetőség csak egyszer szerepelhet.": "Everyone was somewhere different: each option can only be used once.",
    "Mindenki rád vár": "Everyone is waiting for you",
    "Még nincs egyetlen nyomod sem.": "You have no clues yet.",
    "Még nincs nyomod, amivel szembesíthetnéd.": "You have no clues to confront them with yet.",
    "Még nincs nyomod: a talált nyomok maguktól felkerülnek a táblára.": "No clues yet: the ones you find will be pinned here automatically.",
    "Még {0} a csendőrök érkezéséig": "{0} until the police arrive",
    "Még {0} próbálkozásod van.": "{0} attempt(s) left.",
    "Még üres a füzet. Kezdd ott, ahol a holttestet megtalálták.": "Your notebook is empty. Start where the body was found.",
    "Nehéz": "Hard",
    "Nem ez a megoldás.": "That is not the answer.",
    "Nem ez az. Nézd meg újra.": "Not that one. Look again.",
    "Nyom a szembesítéshez": "Clue to confront with",
    "Nyom feljegyezve:": "Clue noted:",
    "Nyomozás folyamatban": "Investigation open",
    "Nyomozás indítása": "Open the case",
    "Néma csend. A vádlott felnevet: semmi sem stimmel. Még {0} próbálkozásod van.": "Dead silence. The accused laughs: none of it adds up. {0} attempt(s) left.",
    "Oldd meg a rejtvényeket. Ha elakadsz, kérj súgót, de az a végén látszani fog.": "Solve the puzzles. Ask for a hint if you get stuck, but it will show in your score.",
    "Olvasd el a vallomásokat, és szembesítsd a gyanúsítottakat a nyomokkal. Mindenki elhallgat valamit, de csak egyikük gyilkos.": "Read the statements and confront the suspects with your clues. Everyone hides something, but only one is a killer.",
    "Rejtélyes gyilkosságok": "Mystery Murders",
    "Rendezés": "Tidy up",
    "Saját jegyzeteid": "Your notes",
    "Szabad nyomozás": "Take your time",
    "Szembesítem": "Confront",
    "Szembesítés nyommal…": "Confront with a clue…",
    "Szerencsés kezdő": "A lucky beginner",
    "Szöveg másolása": "Copy text",
    "Súgó kérése": "Ask for a hint",
    "TEENDŐ:\n1. Járd végig a helyszíneket, gyűjts nyomokat.\n2. Oldd meg a(z) {0} rejtvényt, mindegyik döntő bizonyítékot ad.\n3. Szembesítsd a gyanúsítottakat a nyomokkal. Aki hazudik, nem feltétlenül gyilkos.\n4. Emelj vádat, és támaszd alá bizonyítékkal. Három próbálkozásod van, utána a tettes kicsúszik a kezeid közül.":
      "TO DO:\n1. Go through the locations and collect clues.\n2. Solve the {0} puzzles; each one yields decisive evidence.\n3. Confront the suspects with your clues. A liar is not necessarily a killer.\n4. Make your accusation and back it with evidence. You have three attempts before the culprit slips away.",
    "Trükkös tetthelyek, több hazug, új rejtvénytípusok. Kétlépcsős súgó.": "Tricky crime scenes, several liars, new puzzle types. Two hints per puzzle.",
    "Tábla": "Board",
    "Valaki": "Someone",
    "Vissza az alaprajzhoz": "Back to the floor plan",
    "Vissza az ügyekhez": "Back to the cases",
    "Vádemelés": "Accusation",
    "Válassz egy bizonyítékot a jegyzetfüzetből.": "Pick a piece of evidence from your notebook.",
    "Válassz egy helyiséget. A rejtvényt rejtő helyszíneket ✦ jelöli.": "Pick a room. Locations hiding a puzzle are marked ✦.",
    "Válassz egy nyomot a jegyzetfüzetből, és szembesítsd vele azt, akinek a vallomásával ütközik. A téves szembesítés pontlevonással jár.": "Pick a clue from your notebook and confront the suspect whose statement it contradicts. A wrong confrontation costs points.",
    "Válasz": "Answer",
    "Zárva": "Locked",
    "elneveti magát: »Ezzel akar sarokba szorítani?«": "laughs: “Is that supposed to corner me?”",
    "felhúzza a szemöldökét: »Ehhez nekem semmi közöm.«": "raises an eyebrow: “That has nothing to do with me.”",
    "hajnal előtt": "before dawn",
    "pont": "points",
    "rezzenéstelen arccal néz rád.": "looks at you without a flicker.",
    "súgó nélkül": "no hints",
    "válassz": "choose",
    "válassz a jegyzetfüzetből": "choose from your notebook",
    "vállat von: »Ez semmit sem bizonyít.«": "shrugs: “That proves nothing.”",
    "{0} / {1} esemény van a helyén.": "{0} of {1} events are in the right place.",
    "{0} / {1} helyes. Olvasd újra a vallomásokat.": "{0} of {1} correct. Read the statements again.",
    "{0} / {1} nyom": "{0} of {1} clues",
    "{0} elhibázott bizonyíték": "{0} wrong exhibit(s)",
    "{0} felnevet: „Ez semmit sem bizonyít!” A teremben morajlás támad.": "{0} laughs: “That proves nothing!” A murmur runs through the room.",
    "{0} perc": "{0} min",
    "{0} pont": "{0} points",
    "{0} rejtvény megoldatlan.": "{0} puzzle(s) unsolved.",
    "{0} számjegy kell.": "It needs {0} digits.",
    "{0} súgó": "{0} hint(s)",
    "{0} súgóval": "with {0} hint(s)",
    "{0} téves szembesítés": "{0} wrong confrontation(s)",
    "{0} óra {1} perc": "{0} h {1} min",
    "{0}. számjegy": "Digit {0}",
    "{0}. vádra": "on attempt {0}",
    "{0}. ügy": "Case {0}",
    "{0}. ügy · {1} rejtvény · {2} gyanúsított": "Case {0} · {1} puzzles · {2} suspects",
    "{0}/{1} ellentmondás": "{0}/{1} contradictions",
    "{0}/{1} felderítve": "{0}/{1} searched",
    "{0}/{1} nyom": "{0}/{1} clues",
    "{0}/{1} rejtvény · {2}/{3} nyom": "{0}/{1} puzzles · {2}/{3} clues",
    "Átkutatva": "Searched",
    "Írd be a kulcsszót, és a szöveg itt rögtön visszafejtődik.": "Type the keyword and the text deciphers right here.",
    "Írj be valamit.": "Type something.",
    "Összehívod a ház lakóit, és elmondod, mi történt. Minden állításodhoz jelöld meg a döntő bizonyítékot a jegyzetfüzetből: egy jó ügyvéd csak a bizonyítéknak hisz.": "You gather everyone together and tell them what happened. Back every claim with decisive evidence from your notebook: a good lawyer believes nothing but evidence.",
    "Összes ügy": "All cases",
    "Öt gyanúsított, egy elültetett hamis nyom. Kétlépcsős súgó rejtvényenként.": "Five suspects and one planted false clue. Two hints per puzzle.",
    "Újrakezdem az ügyet": "Restart the case",
    "Újrakezdheted az ügyet tiszta lappal, vagy megnézheted, mi történt valójában.": "You can start the case over with a clean slate, or see what really happened.",
    "Újraolvasom": "Read again",
    "Ügy lezárva": "Case closed",
    "Ügy újrakezdése": "Restart case",
    "Ügyirat": "Case file",
    "Zárás": "Finale",
    "A titkos szál": "The secret thread",
    "Hat gyilkosság, hat cédula, egy aláírás: F. Sz.": "Six murders, six notes, one signature: F. Sz.",
    "Lezárt ügy": "Sealed case",
    "Mind a hat ügy végén egy préselt fekete szegfű és egy cédula vár. Ha mindet megtalálod, kiderül, ki áll mögöttük.": "At the end of each of the six cases a pressed black carnation and a note are waiting. Find them all and you will learn who is behind them.",
    "{0} / {1} cédula": "{0} of {1} notes",
    "Még megoldatlan": "Not solved yet",
    "Bekarikázott betű": "Circled letter",
    "Megvan mind a hat cédula. A címoldalon megnyílt a záró ügy.": "You have all six notes. The final case is now open on the home page.",
    "{0} / {1} cédula a címoldalon, A titkos szál alatt.": "{0} of {1} notes, under The secret thread on the home page.",
    "♪ Hang: be": "♪ Sound: on",
    "♪ Hang: ki": "♪ Sound: off"
  };

  const T = (s, ...a) => { let t = (lang === "en" && EN[s]) || s; a.forEach((v, i) => { t = t.split("{" + i + "}").join(v); }); return t; };

  // az angol ügyfordítás ráolvasztása az eredeti ügyre (azonosítók szerint)
  function apply(c) {
    if (lang !== "en") return;
    const X = (window.MM_EN || {})[c.id]; if (!X) return;
    const set = (o, k, v) => { if (v !== undefined) o[k] = v; };
    ["title", "meta", "teaser", "confession"].forEach(k => set(c, k, X[k]));
    if (X.intro) Object.assign(c.intro, X.intro);
    if (X.ending) Object.assign(c.ending, X.ending);
    if (X.carnation && c.carnation) Object.assign(c.carnation, X.carnation);
    if (X.dossier && c.dossier) Object.assign(c.dossier, X.dossier);
    c.suspects.forEach(s => Object.assign(s, (X.suspects || {})[s.id] || {}));
    Object.entries(X.clues || {}).forEach(([k, v]) => c.clues[k] && Object.assign(c.clues[k], v));
    (c.contradictions || []).forEach(k => Object.assign(k, (X.contradictions || {})[k.id] || {}));
    c.locations.forEach(l => {
      const L = (X.locations || {})[l.id]; if (!L) return;
      set(l, "name", L.name); set(l, "desc", L.desc); set(l, "look", L.look);
      if (L.decoys && l.decoys) Object.assign(l.decoys, L.decoys);
      (l.items || []).forEach(it => Object.assign(it, (L.items || {})[it.clue] || {}));
    });
    Object.entries(X.puzzles || {}).forEach(([pid, P]) => {
      const p = c.puzzles[pid]; if (!p) return;
      Object.entries(P).forEach(([k, v]) => {
        if (k === "options") p.options.forEach(o => Object.assign(o, v[o.v] || {}));
        else if (k === "items") p.items.forEach(i => { if (v[i.id]) i.text = v[i.id]; });
        else p[k] = v;
      });
    });
    (c.accusation.questions || []).forEach(q => {
      const Q = (X.accusation || {})[q.id]; if (!Q) return;
      set(q, "legend", Q.legend); set(q, "name", Q.name);
      if (Q.options && q.options) q.options.forEach(o => { if (Q.options[o.v]) o.label = Q.options[o.v]; });
      if (Q.extra && q.extra) q.extra.forEach(o => { if (Q.extra[o.v]) o.label = Q.extra[o.v]; });
    });
    Object.entries(X.interviews || {}).forEach(([sid, qs]) => (c.interviews && c.interviews[sid] || []).forEach(q => Object.assign(q, qs[q.id] || {})));
    (c.deductions || []).forEach(d => Object.assign(d, (X.deductions || {})[d.id] || {}));
    (c.events || []).forEach(e => Object.assign(e, (X.events || {})[e.id] || {}));
    if (X.fates && c.fates) Object.assign(c.fates, X.fates);
    (X.reveal || []).forEach((r, i) => c.reveal && c.reveal[i] && Object.assign(c.reveal[i], r));
  }

  function set(l) { try { localStorage.setItem(KEY, l); } catch (e) {} location.reload(); }

  window.MM_I18N = { lang, T, apply, set };
})();
