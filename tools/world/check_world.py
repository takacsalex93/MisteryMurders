# Térkép-ellenőrző: minden helyiség, vizsgálható tárgy, rejtvény, szereplő és lépcső elérhető-e a kezdőpontból.
# Futtatás: python3 tools/world/check_world.py <ügy>
import sys, json, os, subprocess, math
CASE = sys.argv[1]
REPO = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
src = open(os.path.join(REPO, "cases", CASE + ".world.js")).read()
D = json.loads(src[src.index("] = ") + 4:].rstrip().rstrip(";"))
js = "global.window={};const fs=require('fs');eval(fs.readFileSync('cases/%s.js','utf8'));try{eval(fs.readFileSync('cases/extras.js','utf8'))}catch(e){};const c=window.MM_CASES[0];console.log(JSON.stringify({locations:c.locations,puzzles:Object.keys(c.puzzles),suspects:c.suspects.map(s=>s.id)}))" % CASE
Cd = json.loads(subprocess.check_output(["node", "-e", js], cwd=REPO))
TS, G = 16, 4
errs, warns = [], []

def overlap(a, b): return a[0] < b[0] + b[2] and a[0] + a[2] > b[0] and a[1] < b[1] + b[3] and a[1] + a[3] > b[1]
def blocked(m, x, y):
    box = [x - 5, y - 6, 10, 6]
    if box[0] < 0 or box[1] < 0 or x + 5 > m["w"] * TS or y > m["h"] * TS: return True
    for ty in range(int(box[1] // TS), int((y - .01) // TS) + 1):
        for tx in range(int(box[0] // TS), int((x + 4.99) // TS) + 1):
            if m["walls"][ty][tx] == "1": return True
    return any(overlap(box, s) for s in m["solids"])
def room(m, x, y):
    tx, ty = int(x // TS), int((y - 1) // TS)
    if not (0 <= ty < m["h"] and 0 <= tx < m["w"]): return None
    r = m["reg"][ty][tx]; return None if r == "." else ord(r) - 97
def dist(r, x, y):
    dx = max(r[0] - x, 0, x - (r[0] + r[2])); dy = max(r[1] - y, 0, y - (r[1] + r[3])); return math.hypot(dx, dy)

def reach(m, starts):
    gw, gh = int(m["w"] * TS // G), int(m["h"] * TS // G)
    ok = lambda i, j: 0 <= i < gw and 0 <= j < gh and not blocked(m, i * G + 2, j * G + 2)
    seen = set(); q = []
    for x, y in starts:
        i, j = int(x // G), int(y // G)
        if ok(i, j): seen.add((i, j)); q.append((i, j))
        else: errs.append(f"{m['_id']}: a kezdőpont ({x/TS:.1f}, {y/TS:.1f}) foglalt")
    while q:
        i, j = q.pop()
        for di, dj in ((1, 0), (-1, 0), (0, 1), (0, -1), (1, 1), (1, -1), (-1, 1), (-1, -1)):
            n = (i + di, j + dj)
            if n in seen or not ok(*n): continue
            if di and dj and (not ok(i + di, j) or not ok(i, j + dj)): continue
            seen.add(n); q.append(n)
    return [(i * G + 2, j * G + 2) for i, j in seen]

starts = {mid: [] for mid in D["maps"]}
s0 = D["start"]; starts[s0[0]].append((s0[1] * TS, s0[2] * TS))
for mid, m in D["maps"].items():
    m["_id"] = mid
    for w in m["warps"]: starts[w["to"][0]].append((w["to"][1] * TS, w["to"][2] * TS))
for mid, m in D["maps"].items():
    pts = reach(m, starts[mid])
    rooms_hit = {room(m, x, y) for x, y in pts}
    for i, r in enumerate(m["rooms"]):
        if i not in rooms_hit: errs.append(f"{mid}: nem elérhető helyiség: {r['loc'] or r['label']}")
    for t in m["inter"]:
        if not any(dist(t["r"], x, y - 3) <= 14 for x, y in pts): errs.append(f"{mid}: nem érhető el: {t['k']} {t['id']}")
    for w in m["warps"]:
        if not any(w["r"][0] < x < w["r"][0] + w["r"][2] and w["r"][1] < y < w["r"][1] + w["r"][3] for x, y in pts): errs.append(f"{mid}: lépcső nem érhető el: {w['label']}")
        tm = D["maps"][w["to"][0]]
        if any(w2["r"][0] < w["to"][1] * TS < w2["r"][0] + w2["r"][2] and w2["r"][1] < w["to"][2] * TS < w2["r"][1] + w2["r"][3] for w2 in tm["warps"]):
            errs.append(f"{mid}: a lépcső érkezési pontja egy másik lépcsőn van: {w['label']}")
    for n in m["npcs"]:
        if n.get("static"): continue
        p = [(n["x"] * TS, n["y"] * TS)] + [(a * TS, b * TS) for a, b, _ in n.get("route", [])]
        for x, y in p:
            if blocked(m, x, y): errs.append(f"{mid}: {n['id']} útpontja foglalt: ({x/TS:.1f}, {y/TS:.1f})")
        if not any(math.hypot(px - p[0][0], py - p[0][1]) < 20 for px, py in pts): errs.append(f"{mid}: {n['id']} nem érhető el")
        r = n.get("route", [])
        for a, b in zip(r, r[1:] + r[:1]):
            L = math.hypot((b[0] - a[0]) * TS, (b[1] - a[1]) * TS); k = max(1, int(L // 2))
            for s in range(k + 1):
                x, y = (a[0] + (b[0] - a[0]) * s / k) * TS, (a[1] + (b[1] - a[1]) * s / k) * TS
                if blocked(m, x, y): errs.append(f"{mid}: {n['id']} útvonala falon/tárgyon megy át ({x/TS:.1f}, {y/TS:.1f})"); break
    for d in m.get("decals", []): pass
# zárak: a "requires" helyiségek csak a rejtvényük megoldása után nyílnak; játsszuk végig, hogy minden helyszín elérhető-e
LOC = {l["id"]: l for l in Cd["locations"]}
def reach_locked(locked):
    seen_pts = {}; todo = [(s0[0], s0[1] * TS, s0[2] * TS)]; done = set()
    while todo:
        mid, x, y = todo.pop()
        if (mid, x, y) in done: continue
        done.add((mid, x, y)); m = D["maps"][mid]
        gw, gh = int(m["w"] * TS // G), int(m["h"] * TS // G)
        def ok(i, j):
            if not (0 <= i < gw and 0 <= j < gh) or blocked(m, i * G + 2, j * G + 2): return False
            r = room(m, i * G + 2, j * G + 2); return r is None or m["rooms"][r]["loc"] not in locked
        st = (int(x // G), int(y // G)); seen = seen_pts.setdefault(mid, set())
        if not ok(*st) or st in seen: continue
        q = [st]; seen.add(st)
        while q:
            i, j = q.pop()
            for di, dj in ((1, 0), (-1, 0), (0, 1), (0, -1)):
                n = (i + di, j + dj)
                if n in seen or not ok(*n): continue
                seen.add(n); q.append(n)
        for w in m["warps"]:
            if any(w["r"][0] < i * G + 2 < w["r"][0] + w["r"][2] and w["r"][1] < j * G + 2 < w["r"][1] + w["r"][3] for i, j in seen):
                todo.append((w["to"][0], w["to"][1] * TS, w["to"][2] * TS))
    vis = set()
    for mid, seen in seen_pts.items():
        m = D["maps"][mid]
        for i, j in seen:
            r = room(m, i * G + 2, j * G + 2)
            if r is not None and m["rooms"][r]["loc"]: vis.add(m["rooms"][r]["loc"])
    return vis
solved = set()
while True:
    locked = {k for k, l in LOC.items() if l.get("requires") and l["requires"] not in solved}
    vis = reach_locked(locked)
    new = {LOC[v]["puzzle"] for v in vis if LOC[v].get("puzzle")} - solved
    if not new: break
    solved |= new
miss = set(LOC) - vis
if miss: errs.append("a zárak miatt soha nem érhető el: " + ", ".join(sorted(miss)))
for key in ("chase", "gather"):
    g = D.get(key)
    if g and blocked(D["maps"][g["map"]], g["x"] * TS, g["y"] * TS): errs.append(f"{key}: a pont ({g['x']}, {g['y']}) foglalt")
# az ügy minden helyszíne, részlete és rejtvénye szerepel-e a térképen
have_loc = {r["loc"] for m in D["maps"].values() for r in m["rooms"] if r["loc"]}
have_spot = {t["id"] for m in D["maps"].values() for t in m["inter"] if t["k"] == "spot"} | {n["spot"] for m in D["maps"].values() for n in m["npcs"] if n.get("spot")}
have_puz = {t["id"] for m in D["maps"].values() for t in m["inter"] if t["k"] == "puzzle"}
have_npc = {n["id"] for m in D["maps"].values() for n in m["npcs"]}
import re
for l in Cd["locations"]:
    if l["id"] not in have_loc: errs.append(f"hiányzó helyszín: {l['id']}")
    for sid in re.findall(r"\[\[.+?\|(.+?)\]\]", l.get("look", "")):
        if sid not in have_spot: errs.append(f"hiányzó részlet: {l['id']}/{sid}")
    if l.get("puzzle") and l["puzzle"] not in have_puz: errs.append(f"hiányzó rejtvény: {l['puzzle']}")
for s in Cd["suspects"]:
    if s not in have_npc: errs.append(f"hiányzó szereplő: {s}")
for c in D["chars"]:
    if not os.path.exists(os.path.join(REPO, D["chars"][c])): errs.append(f"hiányzó szereplőkép: {c}")
print(CASE, "HIBA" if errs else "rendben", len(errs))
for e in errs: print("  -", e)
sys.exit(1 if errs else 0)
