# Éjszakai gyors: étkezőkocsi, hálókocsi (kalauzfülke, fülkék, mosdó, folyosó) és poggyászkocsi egy hosszú szerelvényben
from wgen import room, o, glint, npc, write

train = {
 "name": "A szerelvény", "w": 63, "h": 15,
 "rooms": [
  room("etkezo", 1, 3, 10, 11, "parquet", "panel"),
  room("kalauz", 13, 3, 4, 5, "woodgrey", "brown"),
  room("_f1", 18, 3, 4, 5, "darkwood", "panel", "1-es fülke"),
  room("_f2", 23, 3, 4, 5, "darkwood", "panel", "2-es fülke"),
  room("fulke3", 28, 3, 4, 5, "darkwood", "panel"),
  room("mosdo", 33, 3, 2, 5, "whitetile", "tile"),
  room("somlo", 36, 3, 4, 5, "darkwood", "panel"),
  room("_f5", 41, 3, 4, 5, "darkwood", "panel", "5-ös fülke"),
  room("_f6", 46, 3, 4, 5, "darkwood", "panel", "6-os fülke"),
  room("folyoso", 13, 11, 37, 3, "purple", "brownwood"),
  room("csomagok", 52, 3, 10, 11, "planks", "planks")],
 "snd": ["wood", "wood", "carpet", "carpet", "carpet", "tile", "carpet", "carpet", "carpet", "carpet", "wood"],
 "doors": [[11, 11, 2, 2], [50, 11, 2, 2], [14, 8, 2, 3], [19, 8, 2, 3], [24, 8, 2, 3], [29, 8, 2, 3], [37, 8, 2, 3], [42, 8, 2, 3], [47, 8, 2, 3], [32, 5, 1, 2], [35, 5, 1, 2]],
 "objects": [
  # étkezőkocsi
  o("window_frost", 2.0, 2.6, wall=True), o("window_frost", 5.5, 2.6, wall=True),
  o("piano_up", 8.6, 4.6, spot="zongora", label="A zongora"),
  o("table_light", 2.0, 7.4, fg=True), o("chair_d", 1.2, 6.9, fg=True, nosolid=True),
  o("table_light", 2.0, 11.4, fg=True), o("papers", 2.5, 10.0, fg=True, z=1.5, puzzle="idorend", label="Az éjszaka időrendje"),
  o("table_light", 6.6, 9.4, fg=True), o("cards", 7.0, 8.0, fg=True, z=1.5),
  o("glass", 3.0, 6.0, fg=True, z=1.5), o("glass", 7.6, 8.1, fg=True, z=1.4),
  o("drinkshelf", 9.0, 13.95),
  # kalauzfülke
  o("valve", 15.6, 2.7, wall=True, spot="futes", label="Egy vörösre festett kerék: a fűtésszelep"),
  o("pipevalve", 13.3, 4.4, puzzle="ujjnyom", label="Ujjnyom a szelepen"),
  o("samovar", 16.1, 4.3),
  o("table_round", 13.3, 7.8, fg=True), o("ledger", 13.35, 7.2, fg=True, z=0.7, spot="menetnaplo", label="A kalauz menetnaplója"),
  o("rag", 16.0, 7.6, nosolid=True, spot="rongy", label="Egy olajos rongy"),
  # díszfülkék
  o("bench", 18.1, 4.5), o("window_frost", 19.0, 2.6, wall=True),
  o("bench_green", 23.1, 4.5), o("window_frost", 24.0, 2.6, wall=True),
  o("bench", 41.1, 4.5), o("window_frost", 42.0, 2.6, wall=True),
  o("bench_green", 46.1, 4.5), o("window_frost", 47.0, 2.6, wall=True), o("hatbox", 48.5, 7.7),
  # a 3-as fülke
  o("window_frost", 29.0, 2.6, wall=True, spot="ablak", label="A befagyott ablak"),
  o("bench", 28.6, 6.9),
  o("table_round", 30.9, 7.8, fg=True), o("bottle", 31.1, 7.3, fg=True, z=0.6), o("glass", 31.5, 7.3, fg=True, z=0.6, spot="poharak", label="Két pohár és egy üveg tokaji"),
  glint("medal", 30.6, 6.4, "A kidudorodó mellényzseb"),
  o("papers", 28.2, 4.4, nosolid=True, puzzle="naplo", label="A titkos napló"),
  # mosdó
  o("mirror", 33.4, 2.9, wall=True, spot="tukor", label="A tükör"),
  o("sink", 33.4, 4.5, spot="csap", label="A csap"),
  glint("bejarat", 34.3, 7.6, "Az út befelé: a két ajtó", puzzle=True),
  # Somló fülkéje
  o("bench", 36.1, 4.5), o("window_frost", 37.0, 2.6, wall=True),
  o("coatrack", 39.0, 5.4, spot="utlevel", label="A fogason egy átázott felöltő"),
  o("table_round", 36.3, 7.8, fg=True), o("cards", 36.4, 7.2, fg=True, z=0.7, spot="kartya", label="Egy pakli kártya"),
  o("decanter", 37.5, 7.3, fg=True, z=0.6, spot="kolni", label="Egy félig üres kölnisüveg"),
  o("briefcase", 38.6, 8.0, fg=True, puzzle="aktataska", label="Somló aktatáskája"),
  # folyosó
  o("window_frost", 17.0, 10.6, wall=True), o("window_frost", 27.0, 10.6, wall=True), o("window_frost", 40.0, 10.6, wall=True),
  o("notice", 22.0, 10.6, wall=True, puzzle="fulkek", label="Az utaslista"),
  glint("folt", 33.6, 13.6, "Olvadt hó foltjai a szőnyegen"),
  glint("lanc", 31.0, 12.0, "A lefeszített biztonsági lánc"),
  # poggyászkocsi
  o("shelf_metal", 52.4, 4.4), o("shelf_metal", 54.4, 4.4), o("crate", 60.2, 4.2), o("crate", 60.2, 5.3),
  o("handbag", 53.5, 8.0, fg=True, spot="vegrendelet", label="Ráday Ágnes táskája"),
  o("suitcase", 56.0, 8.4, fg=True, spot="orak", label="Herbert Wolf bőröndje"),
  o("handbag", 59.0, 8.0, fg=True, spot="valtok", label="Vay Kornélia kézitáskája"),
  o("suitcase2", 54.0, 11.6, fg=True, spot="level", label="Csermák Irén bőröndje"),
  o("hatbox", 58.4, 11.6, fg=True, spot="kalap", label="Egy kalapdoboz"),
  o("crate", 60.4, 13.9)],
 "npcs": [
  npc("raday", 29.6, 6.3, static=True, lie=True, spot="holttest", label="Ráday Kristóf az alsó ágyon"),
  npc("pincer", 5.0, 5.2, "down", spot="pincer", label="A bóbiskoló pincér", barks=["Hm? Igen, uram… egy pillanat… zzz…"]),
  npc("agnes", 4.2, 8.8, "right", barks=["A bátyám mindig mindent megoldott pénzzel.", "Kassán vár a családi kripta. Szép gondolat."]),
  npc("wolf", 8.6, 10.2, "left", barks=["Az órák pontosak, uram. Az emberek nem.", "Bécsben ilyenkor már esik a hó."]),
  npc("kornelia", 4.6, 12.8, "up", barks=["Holnap főpróba Kassán. Ha ez a vonat valaha odaér.", "Énekeljek valamit? Ebben a csendben megőrülök."]),
  npc("iren", 8.0, 12.6, "left", barks=["A gyerekek már alszanak? Ó, persze, egyedül utazom.", "Hideg van. Ugye ön is érzi?"]),
  npc("somlo", 20.0, 12.4, "down", route=[[20, 12.4, 5], [45, 12.4, 5]], barks=["Tizenkét éve dolgozom Ráday úrnak. Dolgoztam.", "Kártyázik, nyomozó úr? Most nincs kedvem."]),
  npc("bodnar", 15.0, 12.6, "right", route=[[15, 12.6, 6], [36, 12.6, 3]], barks=["Tizennyolc éve járom ezt a vonalat.", "A fűtés? Megjavítottam, uram. Megint."])],
 "talks": [{"id": "suttogas", "zone": [13, 11, 10, 3], "after": "futes", "lines": [
  ["somlo", "Bodnár, rendben van már a fűtés?"], ["bodnar", "Rendben, uram. Ahogy megbeszéltük… vagyis ahogy kell."], ["somlo", "Jól van. Menjen a dolgára."]]}]
}

write("ejszakai-gyors", {"case": "ejszakai-gyors", "start": ["train", 29.4, 7.8],
  "chars": ["detektiv", "agnes", "wolf", "iren", "kornelia", "somlo", "bodnar", "pincer", "raday"],
  "maps": {"train": train}})
