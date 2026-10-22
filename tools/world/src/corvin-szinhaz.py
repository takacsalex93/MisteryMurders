# Corvin Színház: színpad, kellektár, művészbejáró, iroda, öltözősor, súgólyuk, nézőtér, büfé; fölötte a zsinórpadlás
from wgen import room, o, glint, npc, write

fsz = {
 "name": "A színház", "w": 44, "h": 32,
 "rooms": [
  room("kellektar", 1, 3, 8, 5, "planks", "brown"),
  room("porta", 1, 11, 8, 4, "woodgrey", "panel"),
  room("szinpad", 10, 3, 20, 12, "goldwood", "darkgrey"),
  room("iroda", 31, 3, 12, 5, "darkwood", "dred"),
  room("oltozok", 31, 11, 12, 4, "parquet2", "pinkstripe"),
  room("sugolyuk", 17, 18, 6, 3, "darkwood", "darkgrey"),
  room("_nezoter", 1, 24, 29, 7, "purple", "red", "Nézőtér"),
  room("bufe", 31, 24, 12, 7, "checker", "red")],
 "snd": ["wood", "wood", "wood", "wood", "wood", "wood", "carpet", "stone"],
 "doors": [[9, 5, 1, 2], [9, 12, 1, 2], [30, 5, 1, 2], [30, 12, 1, 2], [19, 15, 2, 3], [19, 21, 2, 3], [30, 27, 1, 2]],
 "objects": [
  # színpad
  o("curtain", 10.0, 2.95, wall=True), o("curtain", 22.0, 2.95, wall=True),
  o("ladder_w", 10.3, 4.6, warp=["fent", 3.0, 6.6], label="Létra a zsinórpadlásra"),
  o("spot_l", 27.6, 5.0, spot="reflektor", label="A reflektor"), o("spot_r", 12.2, 5.0),
  o("sofa_red", 13.0, 8.6, fg=True), o("table_round", 23.4, 8.6, fg=True), o("armchair_red", 25.0, 8.8, fg=True),
  o("sandbag_burst", 19.6, 10.9, fg=True, nosolid=True),
  o("chalkmark", 13.0, 12.9, floor=True), o("chalkmark", 16.0, 12.9, floor=True), o("chalkmark", 19.3, 10.6, floor=True), o("chalkmark", 23.0, 12.9, floor=True), o("chalkmark", 26.0, 12.9, floor=True),
  o("plant_a", 10.6, 14.9, fg=True), o("plant_a", 28.4, 14.9, fg=True), o("palm", 15.0, 5.2), o("palm", 24.0, 5.2),
  o("floorlamp", 17.0, 5.0), o("floorlamp", 22.0, 5.0), o("sofa_brown", 12.6, 12.0, fg=True), o("tubchair_y", 26.0, 12.2, fg=True),
  glint("kreta", 22.6, 12.4, "Krétajelek sora a színpadon"),
  # zsinórpadlás és kellektár
  o("candles", 1.4, 4.3, z=0.1), o("shelf_metal", 3.2, 4.4), o("swords", 6.0, 5.6, spot="kardok", label="Fakardok egy hordóban"),
  o("notice", 7.2, 2.6, wall=True, spot="lista", label="A kellékes listája"),
  o("table_wood", 2.6, 7.95, fg=True), o("candle", 3.4, 6.4, fg=True, z=1.6, puzzle="gyertya", label="A gyertya ideje"),
  # művészbejáró
  o("keyboard", 1.6, 10.6, wall=True, spot="tabla", label="A kulcstábla"),
  o("poster", 5.0, 10.6, wall=True, spot="szereposztas", label="A ma esti szereposztás"),
  o("table_wood", 5.4, 14.95, fg=True), o("ledger", 5.9, 13.4, fg=True, z=1.6, puzzle="kulcsnaplo", label="A kulcsnapló"),
  # igazgatói iroda
  o("poster", 32.0, 2.6, wall=True, spot="plakat", label="Plakátok a falon"), o("poster", 33.4, 2.6, wall=True),
  o("table_dark", 36.0, 6.9, fg=True), o("papers", 36.4, 5.4, fg=True, z=1.6, spot="kalman", label="Az igazgató asztala"),
  o("phone", 37.4, 5.2, fg=True, z=1.8),
  o("typewriter", 40.0, 5.6, fg=True, z=0.2, puzzle="vallomas", label="Mimi vallomása"), o("table_wood", 39.6, 7.4, fg=True),
  o("bookcase_dark", 31.2, 4.4),
  # öltözősor
  o("mirror_bulbs", 32.0, 10.7, wall=True), o("mirror_bulbs", 36.0, 10.7, wall=True), o("mirror_bulbs", 40.0, 10.7, wall=True),
  o("vanity", 31.6, 12.6, spot="level", label="Rácz Mimi sminkasztala"),
  o("wardrobe_glass", 35.4, 12.6, spot="bodo", label="Bodó Ferenc öltözője"),
  o("gramophone", 40.4, 12.6, spot="gramofon", label="Egy gramofon"),
  # súgólyuk
  o("promptbox", 21.0, 19.1),
  o("papers", 17.4, 20.6, nosolid=True, spot="pletyka", label="Kézirat a súgópéldány alatt"),
  o("lantern", 22.1, 20.95, spot="lampa", label="A kis lámpa"),
  # nézőtér
  o("seats", 3.0, 26.0, fg=True), o("seats", 3.0, 28.0, fg=True), o("seats", 3.0, 30.0, fg=True),
  o("seats", 22.0, 26.0, fg=True), o("seats", 22.0, 28.0, fg=True), o("seats", 22.0, 30.0, fg=True),
  o("seats", 12.5, 28.0, fg=True), o("seats", 12.5, 30.0, fg=True),
  # büfé
  o("counter", 31.4, 25.4), o("counter", 35.4, 25.4), o("glass", 32.0, 24.9, z=0.6), o("glass", 33.0, 24.9, z=0.6), o("bottle", 36.4, 24.9, z=0.6),
  o("notice", 40.0, 23.6, wall=True, spot="rend", label="A szünetek rendje"),
  o("papers", 34.0, 24.9, z=0.6, puzzle="szunet", label="Az első szünet"),
  o("table_round", 33.0, 29.0, fg=True), o("table_round", 38.0, 29.0, fg=True),
  o("coatrack", 41.4, 29.6, fg=True, spot="vass", label="Vass Tibor kabátja")],
 "npcs": [
  npc("sarkozy", 19.6, 9.8, static=True, lie=True, spot="holttest", label="Sárközy a hetes jelzésnél"),
  npc("klara", 17.9, 19.6, "right", spot="sugo", label="Lengyel Klára, a súgónő", barks=["Harminc éve ülök ebben a lyukban.", "Mindent látok innen, fiam. Mindent."]),
  npc("mimi", 37.0, 13.6, "left", barks=["Ne nézzen rám így. Ő volt a partnerem.", "A színpadon mindig tudtam, hova kell lépnem."]),
  npc("bodo", 34.0, 13.8, "right", route=[[34, 13.8, 6], [39, 13.8, 6]], barks=["Mi-mi-mi-mi… bocsánat, beéneklek.", "Bécsben más a közönség. Hálásabb."]),
  npc("kalman", 34.0, 6.4, "right", barks=["Huszonöt éve igazgatom ezt a színházat.", "Az előadásnak mennie kell. Mindig mennie kell."]),
  npc("vass", 36.0, 28.6, "down", route=[[36, 28.6, 6], [32, 27.4, 5]], barks=["A kötél nem hibázik. Az ember igen.", "Huszonkét éve mászom a zsinórpadlást."])],
 "talks": [{"id": "folyoso", "zone": [31, 11, 12, 4], "after": "level", "lines": [
  ["kalman", "Ferenc, holnap ön énekel. Készüljön."], ["bodo", "Igazgató úr, én… mindig készen álltam."], ["kalman", "Tudom. Éppen ez aggaszt."]]}]
}

fent = {
 "name": "Zsinórpadlás", "w": 24, "h": 10,
 "rooms": [room("zsinorpadlas", 1, 3, 22, 6, "grid", "darkgrey")],
 "snd": ["stone"],
 "doors": [],
 "objects": [
  o("ladder_w", 1.6, 4.6, warp=["fsz", 13.0, 6.4], label="Létra le a színpadra"),
  o("pulleys", 5.0, 2.95, wall=True, spot="csigak", label="Csigák és kötelek"), o("pulleys", 14.0, 2.95, wall=True),
  o("sandbag", 8.0, 5.0), o("sandbag", 9.0, 5.0), o("sandbag", 10.0, 5.0), o("sandbag", 11.0, 5.0, spot="zsakok", label="Homokzsákok sora, mindegyiken egy szám"),
  o("sandbag", 12.0, 5.0), o("sandbag", 14.0, 5.0), o("sandbag", 15.0, 5.0), o("sandbag", 16.0, 5.0), o("sandbag", 17.0, 5.0),
  o("rope", 12.9, 8.6, nosolid=True), glint("kotel", 13.4, 7.6, "A kötél vége", puzzle=True),
  o("candle", 13.6, 4.6, z=0.1)],
 "npcs": []
}

write("corvin-szinhaz", {"case": "corvin-szinhaz", "start": ["fsz", 19.6, 12.0],
  "chars": ["detektiv", "mimi", "kalman", "vass", "klara", "bodo", "sarkozy"],
  "dark": [{"map": "fent", "alpha": .82, "lamp": 70}],
  "maps": {"fsz": fsz, "fent": fent}})
