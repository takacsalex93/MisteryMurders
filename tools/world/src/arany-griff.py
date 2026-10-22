# Arany Griff szálló: negyedik emelet (412, 414, Lili szobája, személyzeti folyosó) és földszint (központ, porta, bár, lift)
from wgen import room, o, glint, npc, write

f4 = {
 "name": "Negyedik emelet", "w": 40, "h": 17,
 "rooms": [
  room("szoba412", 1, 3, 9, 6, "purple", "red"),
  room("szoba414", 11, 3, 8, 6, "purple", "salmon"),
  room("lili", 20, 3, 9, 6, "pink", "pinkstripe"),
  room("szemelyzet", 30, 3, 9, 6, "greytile", "stone"),
  room("_folyoso", 1, 12, 38, 4, "blueorn", "redstripe", "Negyedik emeleti folyosó")],
 "snd": ["carpet", "carpet", "carpet", "tile", "carpet"],
 "doors": [[4, 9, 2, 3], [14, 9, 2, 3], [23, 9, 2, 3], [33, 9, 2, 3], [10, 6, 1, 2]],
 "objects": [
  # 412-es szoba
  o("rug_red", 3.7, 7.4, floor=True),
  o("fireplace", 4.0, 3.9, light=[40, "fire"]),
  o("poster", 6.6, 2.6, wall=True), o("poster", 7.6, 2.6, wall=True),
  o("window_red", 1.5, 2.8, wall=True, spot="ablak", label="A muskátlis ablak"),
  o("safe", 8.3, 4.3, puzzle="szef", label="A széf"),
  o("bed_a", 1.2, 8.9),
  o("table_round", 6.9, 7.6, fg=True),
  o("bottle", 7.15, 7.0, fg=True, z=0.7, spot="pezsgo", label="Pezsgősüveg és két pohár"), o("glass", 7.5, 7.1, fg=True, z=0.6),
  glint("ajto", 9.3, 7.6, "A keskeny, tapétázott ajtó"),
  # 414-es szoba
  o("bed_b", 11.3, 6.4, spot="agy", label="A bevetetlen ágy"),
  o("window", 15.4, 2.6, wall=True, puzzle="kijarat", label="Az út kifelé"),
  o("wardrobe_old", 17.2, 4.3),
  o("table_round", 15.6, 7.2, fg=True), o("ashtray", 15.8, 6.7, fg=True, z=0.6, spot="cigi", label="Hamutartó, benne egy félig szívott cigaretta"),
  # Lili szobája
  o("rug_blue", 23.4, 8.2, floor=True),
  o("wardrobe_glass", 20.3, 4.3, spot="ruha", label="A flitteres ruha"),
  o("vanity", 22.4, 4.3, spot="nevjegy", label="Névjegyek és szerelmes levelek"),
  o("nightstand", 25.4, 4.3), o("papers", 25.4, 3.5, z=1.0, spot="tavirat", label="Gyűrött papírok az éjjeliszekrényen"),
  o("bed_b", 26.8, 6.4), o("plant_pot", 24.5, 4.0), o("bush", 20.4, 8.8, fg=True),
  # személyzeti folyosó
  o("hooks", 30.6, 2.4, wall=True), o("apron", 30.8, 3.0, wall=True, z=0.1, spot="mandzsetta", label="A szobalányok kötényei"),
  o("hooks", 32.0, 2.4, wall=True), o("apron", 32.2, 3.0, wall=True, z=0.1),
  o("chute", 35.6, 2.7, wall=True, spot="ledobo", label="A szennyesledobó nyílása"),
  o("shelf_metal", 37.0, 4.4),
  o("basket_l", 30.5, 8.7, fg=True), o("basket_p", 31.7, 8.7, fg=True),
  o("ironboard", 33.4, 6.6, fg=True),
  # folyosó
  o("rug_brown", 15.0, 15.4, floor=True),
  o("landscape2", 7.0, 11.2, wall=True), o("landscape1", 18.0, 11.2, wall=True), o("frame_s2", 27.5, 11.0, wall=True),
  o("plant_b", 1.3, 13.8), o("palm", 26.6, 15.95),
  o("liftcage", 35.4, 12.4, warp=["fsz", 35.6, 7.6], label="A lift: le a földszintre")],
 "npcs": [
  npc("vandor", 5.1, 5.6, static=True, lie=True, spot="holttest", label="Vándor a kandalló előtt"),
  npc("lili", 24.0, 6.8, "left", barks=["Vándor mindig azt mondta, nélkülem nincs varieté.", "Kérem, ne nézzen így rám. Én szerettem őt… a magam módján.", "Bécs vár. Bécs mindig vár."]),
  npc("margit", 8.0, 13.8, route=[[8, 13.8, 4], [30, 13.8, 4]], barks=["Elnézést, sietek, a negyedik emelet az enyém.", "Minden szobát én takarítok. Majdnem mindet.", "Ilyen esőben a szennyes sosem szárad meg."]),
  npc("anna", 37.0, 6.4, "left", spot="anna", label="Anna, a másik szobalány", barks=["Margit ma este nagyon ideges volt.", "A kötényeket minden reggel én számolom."])],
 "talks": [{"id": "szobalanyok", "zone": [26, 12, 12, 4], "after": "tavirat", "lines": [
  ["margit", "Anna, ha kérdezik, egész este vasaltunk, ugye?"], ["anna", "Hát persze. Te mondtad, hogy ne beszéljek a kötényekről."], ["margit", "Csitt! Valaki jön."]]}]
}

fsz = {
 "name": "Földszint", "w": 40, "h": 12,
 "rooms": [
  room("kozpont", 1, 3, 6, 8, "woodgrey", "panel"),
  room("porta", 8, 3, 10, 8, "checker", "brownwood"),
  room("bar", 19, 3, 12, 8, "darkwood", "red"),
  room("lift", 32, 3, 7, 8, "redtile", "beige")],
 "snd": ["wood", "stone", "wood", "carpet"],
 "doors": [[7, 7, 1, 2], [18, 7, 1, 2], [31, 7, 1, 2]],
 "objects": [
  # telefonközpont
  o("switchboard", 1.3, 4.6, spot="tabla", label="A dugaszolótábla"),
  o("table_wood", 4.0, 8.0, fg=True), o("headphones", 4.5, 6.6, fg=True, z=1.5, spot="fejhallgato", label="A kezelőnő fejhallgatója"),
  o("table_round", 1.6, 9.8, fg=True), o("ledger", 1.65, 9.3, fg=True, z=0.6, puzzle="naplo", label="A központ naplója"),
  # porta
  o("keyboard", 9.2, 2.6, wall=True), o("frame_s3", 13.5, 2.5, wall=True, spot="keret", label="A keretezett levél"),
  o("desk_rec", 10.2, 7.4, fg=True),
  o("guestbook", 11.0, 6.0, fg=True, z=1.5, puzzle="anagramma", label="A vendégkönyv"),
  o("papers", 13.4, 6.0, fg=True, z=1.5, spot="blokk", label="A táviratblokk"),
  o("umbrella", 16.4, 10.4, fg=True, spot="eso", label="Az ernyőtartó, alatta tócsa"),
  o("runner_r", 12.3, 10.95, floor=True), o("plant_a", 8.3, 10.6, fg=True), o("palm", 16.3, 4.6),
  # bár
  o("counter", 19.3, 4.3), o("counter", 23.3, 4.3), o("drinkshelf", 27.3, 4.2),
  o("piano_up", 29.0, 4.6),
  o("poker", 26.0, 9.8, fg=True, spot="poker", label="Egy elhagyott pókerasztal"),
  o("table_round", 20.2, 8.8, fg=True), o("stool", 22.6, 8.9, fg=True, nosolid=True),
  o("briefcase", 22.55, 8.2, fg=True, z=0.8, spot="fokonyv", label="Hartmann aktatáskája a bárszéken"),
  # lift és lépcsőház
  o("stairs", 32.4, 4.2), o("runner_r", 32.8, 10.0, floor=True),
  glint("folt", 33.3, 8.2, "Sötét foltok a vörös szőnyegen"),
  o("liftcage", 35.3, 4.6, warp=["f4", 36.4, 14.6], label="A lift: fel a negyedikre"),
  o("ashstand", 37.6, 9.9, fg=True, spot="hamu", label="A hamutartó oszlop"),
  o("notice", 37.2, 2.6, wall=True, puzzle="idorend", label="Az este időrendje")],
 "npcs": [
  npc("ferenczy", 12.0, 4.9, "down", barks=["Húsz éve állok ennél a pultnál, uram.", "Az esernyőket mindig ide teszik. Ma este mind csöpögött.", "A vendégkönyvben minden benne van. Ha valaki el tudja olvasni."]),
  npc("pultos", 22.0, 5.7, "down", spot="pultos", label="A pultos", barks=["Egy fröccsöt, uram? Vagy valami erősebbet?", "Ma este mindenki többet ivott a kelleténél."]),
  npc("hartmann", 24.6, 7.4, "left", barks=["A számok nem hazudnak, nyomozó úr. Az emberek igen.", "Holnap reggel a bankba kell mennem. Remélem, elengednek."]),
  npc("kardos", 28.6, 7.2, "left", route=[[28.6, 7.2, 6], [24.0, 9.9, 5]], barks=["Egyszer még megírom ezt az estét. Darabnak.", "Esik. Pesten mindig esik, amikor valami véget ér."]),
  npc("liftes", 34.3, 6.2, "down", spot="liftes", label="Az egyenruhás liftesfiú", barks=["Melyik emeletre, uram?", "Én csak le-fel járok. Mindent látok, semmit sem mondok."])]
}

write("arany-griff", {"case": "arany-griff", "start": ["f4", 6.0, 7.9],
  "chars": ["detektiv", "lili", "hartmann", "margit", "ferenczy", "kardos", "liftes", "pultos", "anna", "vandor"],
  "maps": {"f4": f4, "fsz": fsz}})
