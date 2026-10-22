# Heti rejtély 1.: az órásbolt és a műhely
from wgen import room, o, glint, npc, write
M = {
 "name": "Az órásbolt", "w": 24, "h": 11,
 "rooms": [room("bolt", 1, 3, 12, 7, "parquet", "brownwood"), room("muhely", 14, 3, 9, 7, "olive", "brick")],
 "snd": ["wood", "wood"], "doors": [[13, 6, 1, 2]],
 "objects": [
  o("clock", 1.6, 4.1), o("clock2", 3.0, 4.0), o("clock", 4.4, 4.1, spot="orak", label="Tizenkét falióra, mind áll"), o("clock2", 5.8, 4.0), o("clock", 9.2, 4.1), o("clock2", 10.6, 4.0),
  o("vitrine", 1.4, 8.4, spot="kirakat", label="Aranyórák a kirakatban"),
  o("counter", 6.8, 5.6), o("cashreg", 7.4, 5.1, z=0.6, spot="kassza", label="A pénztárgép"),
  o("coatrack", 11.6, 9.6, spot="kabat", label="A fogason hagyott kabát"),
  o("table_round", 5.2, 9.6, fg=True), o("papers", 5.3, 9.1, fg=True, z=0.6, puzzle="alibi", label="A vallomások"),
  o("runner_r", 7.0, 9.95, floor=True), o("plant_a", 12.0, 5.0),
  o("table_wood", 15.2, 6.6, fg=True), o("ledger", 15.6, 5.2, fg=True, z=1.5, spot="konyv", label="A javítási könyv"),
  o("glass", 16.7, 5.2, fg=True, z=1.5, spot="kave", label="Egy kihűlt kávéscsésze"), o("lamp_red", 17.2, 5.4, fg=True, z=1.3, spot="lampa", label="A nagyító lámpa"),
  o("shelf_metal", 20.4, 4.4), o("filing", 22.0, 4.6), o("chair_b", 16.0, 7.4, fg=True, nosolid=True)],
 "npcs": [
  npc("oras", 18.4, 8.0, static=True, lie=True, spot="holttest", label="A mester a munkapad mellett"),
  npc("kun", 8.6, 7.4, "left", barks=["Három éve söpröm ezt a boltot.", "A mester sosem fizetett időben."]),
  npc("bardos", 3.6, 6.6, "right", barks=["Egy Breguet, uram, az nem óra. Az műremek.", "Harminc éve gyűjtök. Engem nem lehet becsapni."]),
  npc("szalai", 10.4, 6.2, "down", barks=["A falon át mindent hallok, de mindent ám.", "Kalapot, uram? Ilyen fagyban jól jönne."])]
}
write("heti-oras", {"case": "heti-oras", "start": ["m", 17.0, 8.6], "chars": ["detektiv", "kun", "bardos", "szalai", "oras"], "maps": {"m": M}})
