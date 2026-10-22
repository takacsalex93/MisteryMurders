# Bejárható pixelvilág építése a LimeZu Modern Interiors csomagból.
# Futtatás: python3 tools/world/build_world.py /home/claude/assets_raw/mi /home/claude/assets_raw/chars_out szegfu-villa
# A nyers csomag NEM kerülhet a repóba (licenc): csak a kész, összerakott képek (háttér, atlasz, szereplők).
import sys, os, json, shutil
from PIL import Image, ImageDraw

RAW, CHARS, CASE = sys.argv[1], sys.argv[2], sys.argv[3]
HERE = os.path.dirname(os.path.abspath(__file__)); REPO = os.path.dirname(os.path.dirname(HERE))
SPEC = json.load(open(os.path.join(HERE, CASE + ".json")))
SPR = json.load(open(os.path.join(HERE, "sprites_px.json")))
# hangulati kiegészítők és titkok (tools/world/src/extras.py)
sys.path.insert(0, os.path.join(HERE, "src")); from extras import EXTRAS
_X = EXTRAS.get(CASE, {})
for k in ("clock", "timeline", "shadows", "gather", "fx", "chase", "danger"):
    if k in _X: SPEC[k] = _X[k]
SPEC["secrets"] = [{k: v for k, v in sc.items() if k not in ("map", "x", "b", "alts")} for sc in _X.get("secrets", [])]
for sc in _X.get("secrets", []):
    spots = [[sc["map"], sc["x"], sc["b"]]] + sc.get("alts", [])
    for i, (mp, x, b) in enumerate(spots):
        SPEC["maps"][mp]["objects"].append({"glint": sc["id"], "x": x, "b": b, "label": sc["title"], "secret": True, "alt": i, "nalt": len(spots)})
TS = os.path.join(RAW, "1_Interiors/16x16/Theme_Sorter")
RB = os.path.join(RAW, "1_Interiors/16x16/Room_Builder_subfiles")
FLOORS = Image.open(os.path.join(RB, "Room_Builder_Floors_16x16.png")).convert("RGBA")
WALLS = Image.open(os.path.join(RB, "Room_Builder_Walls_16x16.png")).convert("RGBA")
OUT_IMG = os.path.join(REPO, "images/world", CASE); os.makedirs(OUT_IMG, exist_ok=True)
OUT_CH = os.path.join(REPO, "images/world/chars", CASE); os.makedirs(OUT_CH, exist_ok=True)
T = 16
_sheets = {}
def sheet(f): return _sheets.setdefault(f, Image.open(os.path.join(TS, f)).convert("RGBA"))

# ---------- saját rajzolású apró tárgyak (nem a csomagból) ----------
OUTL = (46, 38, 54, 255)
def px(w, h, rows, pal):
    im = Image.new("RGBA", (w, h), (0, 0, 0, 0))
    for y, r in enumerate(rows):
        for x, ch in enumerate(r):
            if ch in pal: im.putpixel((x, y), pal[ch])
    return im
P = {"o": OUTL, "k": (34, 30, 40, 255), "g": (92, 86, 104, 255), "G": (140, 134, 150, 255), "y": (214, 170, 72, 255), "Y": (240, 206, 112, 255),
     "w": (236, 232, 222, 255), "W": (255, 255, 250, 255), "b": (120, 82, 54, 255), "B": (160, 112, 70, 255), "r": (150, 52, 52, 255), "R": (196, 84, 74, 255),
     "c": (170, 210, 226, 200), "s": (196, 190, 200, 255), "n": (78, 60, 46, 255), "t": (104, 136, 92, 255), "p": (226, 214, 190, 255), "a": (120, 116, 120, 255)}
CUSTOM = {
 "emptyframe": px(16, 14, ["oooooooooooooooo", "oyYYYYYYYYYYYYyo", "oYyooooooooooyYo", "oYo          oYo", "oYo          oYo", "oYo          oYo", "oYo          oYo",
                            "oYo          oYo", "oYo          oYo", "oYo          oYo", "oYo          oYo", "oYyooooooooooyYo", "oyYYYYYYYYYYYYyo", "oooooooooooooooo"], P),
 "glass": px(5, 7, [" ooo ", "ocYco", "occco", " oco ", "  o  ", " ooo ", "     "], P),
 "bag": px(13, 10, ["    ooooo    ", "   oo   oo   ", " ooooooooooo ", "okkkkkkkkkkko", "okgkkkkkkkgko", "okkkkkyykkkko", "okkkkkkkkkkko", "okkkkkkkkkkko", "ooooooooooooo", "             "], P),
 "umbrella": px(7, 18, ["   o   ", "  oko  ", "  oko  ", " okkko ", " okkko ", " okkko ", "okkkkko", "okkkkko", "okkgkko", " okkko ", "  oko  ", "  oko  ", "  oko  ", "  oko  ", "  oko  ", " ooko  ", " o  o  ", "  oo   "], P),
 "papers": px(14, 8, ["  oooooo      ", "  owwwwo oooo ", "oooowwwoowwwo ", "owwwwowoowwwwo", "owsswowowsswwo", "owwwwoooowwwwo", "owsswo  oooooo", "oooooo        "], P),
 "ashtray": px(9, 5, [" ooooooo ", "oGsssssGo", "oGaaaaaGo", " oGGGGGo ", "  ooooo  "], P),
 "typewriter": px(16, 12, ["   oooooooooo   ", "   owwwwwwwwo   ", "  ooooooooooooo ", " okkkkkkkkkkkkko", " okgggggggggggko", " okgGgGgGgGgGgko", " okgggggggggggko", " okGgGgGgGgGgGko", " okkkkkkkkkkkkko", " ooooooooooooooo", "                ", "                "], P),
 "basket": px(11, 12, ["ooooooooooo", "obbbbbbbbbo", "oBbBbBbBbBo", "obBbBbBbBbo", "oBbBbBbBbBo", " obBbBbBbo ", " oBbBbBbBo ", " obBbBbBbo ", " oBbBbBbBo ", " obbbbbbbo ", " ooooooooo ", "           "], P),
 "coat": px(14, 12, [" oooo  oooo   ", "onnnnoonnnno  ", "onnnnnnnnnnno ", "onnnwnnnwnnno ", "onnnnwwwnnnnno", "onnnnnwnnnnnno", "onnnnnwnnnnno ", " onnnnwnnnno  ", " onnnnwnnnno  ", "  oooooooooo  ", "              ", "              "], P),
 "suitcase": px(22, 14, ["       oooooooo       ", "       o      o       ", "oooooooooooooooooooooo", "obbbbbbbbbbbbbbbbbbbbo", "obwwwwsswwwwwwrrrrrrbo", "obwsswwwwswwwwrRRRRrbo", "obwwwwwwwwwwwwrrrrrrbo", "obwwsswwwwsswwwwwwwwbo", "obwwwwwwwwwwwwwwsswwbo", "obbbbbbbbbbbbbbbbbbbbo", "oBBBBBBBBBBBBBBBBBBBBo", "obbbbbbyybbbbbbbbbbbbo", "oooooooooooooooooooooo", "                      "], P),
}
sys.path.insert(0, HERE); import props
def sprite(name):
    if name in CUSTOM: return CUSTOM[name]
    if name in props.PROPS: return props.make(name)
    f, x, y, w, h = SPR[name]; return sheet(f).crop((x, y, x + w, y + h))

def build(mid, M):
    W, H = M["w"], M["h"]
    reg = [[None] * W for _ in range(H)]; kind = [["#"] * W for _ in range(H)]
    rooms = M["rooms"]; regions = []
    for i, r in enumerate(rooms):
        name, x, y, w, h = r[:5]
        for yy in range(y, y + h):
            for xx in range(x, x + w): kind[yy][xx] = "f"; reg[yy][xx] = i
    for x, y, w, h in M["doors"]:
        for yy in range(y, y + h):
            for xx in range(x, x + w): kind[yy][xx] = "d"
    # az ajtó padlója: a lenti, vagy ha nincs, a jobb oldali szoba padlója
    def below_room(x, y):
        for yy in range(y, H):
            if reg[yy][x] is not None: return reg[yy][x]
        for xx in range(x, W):
            if reg[y][xx] is not None: return reg[y][xx]
    img = Image.new("RGBA", (W * T, H * T), (24, 20, 30, 255)); d = ImageDraw.Draw(img)
    def floor_tile(ri, x, y):
        fx, fy = rooms[ri][5]; return FLOORS.crop(((fx + x % 3) * T, (fy + y % 2) * T, (fx + x % 3 + 1) * T, (fy + y % 2 + 1) * T))
    walk = lambda x, y: 0 <= x < W and 0 <= y < H and kind[y][x] in "fd"
    face = [[None] * W for _ in range(H)]
    for y in range(H):
        for x in range(W):
            k = kind[y][x]
            if k == "f": img.paste(floor_tile(reg[y][x], x, y), (x * T, y * T))
            elif k == "d": img.paste(floor_tile(below_room(x, y), x, y), (x * T, y * T))
    for y in range(H):
        for x in range(W):
            if kind[y][x] != "#": continue
            if walk(x, y + 1) and kind[y + 1][x] == "f":
                ri = reg[y + 1][x]; wx, wy = rooms[ri][6]
                col = wx + (0 if not (x > 0 and kind[y][x - 1] == "#" and walk(x - 1, y + 1)) else 2 if not (x + 1 < W and kind[y][x + 1] == "#" and walk(x + 1, y + 1)) else 1)
                col = wx + 1
                img.paste(WALLS.crop((col * T, (wy + 1) * T, (col + 1) * T, (wy + 2) * T)), (x * T, y * T)); face[y][x] = "b"
                if y > 0 and kind[y - 1][x] == "#":
                    img.paste(WALLS.crop((col * T, wy * T, (col + 1) * T, (wy + 1) * T)), (x * T, (y - 1) * T)); face[y - 1][x] = "t"
    CAP, EDGE = (226, 221, 232, 255), (58, 50, 68, 255)
    capc = lambda x, y: 0 <= x < W and 0 <= y < H and kind[y][x] == "#" and not face[y][x]
    for y in range(H):
        for x in range(W):
            if not capc(x, y): continue
            X, Y = x * T, y * T
            d.rectangle([X, Y, X + T - 1, Y + T - 1], fill=CAP)
            if not capc(x, y - 1): d.line([X, Y, X + T - 1, Y], fill=EDGE)
            if not capc(x, y + 1): d.line([X, Y + T - 1, X + T - 1, Y + T - 1], fill=EDGE)
            if not capc(x - 1, y): d.line([X, Y, X, Y + T - 1], fill=EDGE)
            if not capc(x + 1, y): d.line([X + T - 1, Y, X + T - 1, Y + T - 1], fill=EDGE)
    # az ajtónyílások két oldalán árnyék a falon
    for y in range(H):
        for x in range(W):
            if kind[y][x] == "d" and (face[y][x - 1] or face[y][x + 1] if 0 < x < W - 1 else False):
                pass
    # tárgyak: a padló- és falitárgyak, meg a hátsó fal előtti bútorok a háttérbe sülnek, a szabadon állók külön rétegen y szerint rendezve
    objs, fg, solids, inter, warps, lights, ticks, wins = M["objects"], [], [], [], [], [], [], []
    def rect_of(o):
        im = sprite(o["s"]); w, h = im.size
        return im, round(o["x"] * T), round(o["b"] * T) - h, w, h
    order = sorted([o for o in objs if "s" in o], key=lambda o: (0 if o.get("floor") else 1 if o.get("wall") else 2, o["b"] + o.get("z", 0)))
    for o in order:
        im, x, y, w, h = rect_of(o)
        if o.get("fg"): fg.append({"s": o["s"], "x": x, "y": y, "w": w, "h": h, "base": round((o["b"] + o.get("z", 0)) * T), **({"trophy": o["trophy"]} if o.get("trophy") else {})})
        else: img.alpha_composite(im, (x, y))
        if not (o.get("floor") or o.get("wall") or o.get("nosolid") or o.get("z")):
            sd = min(h, round(o.get("sd", 0.9) * T)); solids.append([x + 1, y + h - sd, w - 2, sd])
        if o.get("warp"):
            wr = o.get("wr") or [2, h - 12, w - 4, 24]
            warps.append({"r": [x + wr[0], y + wr[1], wr[2], wr[3]], "to": o["warp"], "label": o.get("label", "")})
        if o.get("light"): lights.append([x + w / 2, y + h * .6, o["light"][0], o["light"][1]])
        if o.get("tick"): ticks.append([x + w / 2, y + h])
        if o["s"].startswith("window") or o["s"] == "curtainwin": wins.append([x + 2, y + 2, w - 4, h - 6])
        for key in ("spot", "puzzle", "secret"):
            if o.get(key): inter.append({"k": key, "id": o[key], "r": [x, y, w, h], "label": o.get("label", "")})
    for o in objs:
        if "glint" in o:
            x, y = round(o["x"] * T), round(o["b"] * T) - 10
            inter.append({"k": "secret" if o.get("secret") else "puzzle" if o.get("puzzle") else "spot", "id": o["glint"], "r": [x - 4, y - 2, 14, 12], "label": o.get("label", ""), "glint": True, **({"alt": o["alt"], "nalt": o["nalt"]} if "nalt" in o else {})})
    img.save(os.path.join(OUT_IMG, mid + ".png"), optimize=True)
    rid = [r[0] for r in rooms]
    return {"name": M["name"], "w": W, "h": H, "bg": f"images/world/{CASE}/{mid}.png",
            "walls": ["".join("1" if kind[y][x] == "#" else "0" for x in range(W)) for y in range(H)],
            "reg": ["".join("." if reg[y][x] is None else chr(97 + reg[y][x]) for x in range(W)) for y in range(H)],
            "rooms": [{"loc": None if r[0].startswith("_") else r[0], "label": r[7] if len(r) > 7 else None, "rect": r[1:5]} for r in rooms],
            "weather": M.get("weather", {}), "fog": M.get("fog"),
            "solids": solids, "fg": fg, "inter": inter, "warps": warps, "npcs": M.get("npcs", []),
            "doors": M["doors"], "snd": M.get("snd", []), "windows": wins, "lights": lights, "ticks": ticks, "decals": M.get("decals", []), "talks": M.get("talks", [])}

out = {"case": CASE, "start": SPEC["start"], "dark": SPEC.get("dark"), "clock": SPEC.get("clock"), "timeline": SPEC.get("timeline", []),
       "shadows": SPEC.get("shadows", []), "gather": SPEC.get("gather"), "chase": SPEC.get("chase"), "danger": SPEC.get("danger"), "secrets": SPEC.get("secrets", []), "fx": SPEC.get("fx"), "maps": {}, "atlas": f"images/world/{CASE}/atlas.png", "chars": {}}
for mid, M in SPEC["maps"].items(): out["maps"][mid] = build(mid, M)
# atlasz a szabadon álló tárgyakból
names = sorted({f["s"] for m in out["maps"].values() for f in m["fg"]} | {"door"})
ims = {n: sprite(n) for n in names}
AW = 256; x = y = rh = 0; pos = {}
for n in names:
    w, h = ims[n].size
    if x + w > AW: x = 0; y += rh + 1; rh = 0
    pos[n] = [x, y, w, h]; x += w + 1; rh = max(rh, h)
atlas = Image.new("RGBA", (AW, y + rh + 1), (0, 0, 0, 0))
for n, (x, y, w, h) in pos.items(): atlas.alpha_composite(ims[n], (x, y))
atlas.save(os.path.join(OUT_IMG, "atlas.png"), optimize=True)
out["sprites"] = pos
for c in SPEC["chars"]:
    shutil.copy(os.path.join(CHARS, CASE, c + ".png"), os.path.join(OUT_CH, c + ".png")); out["chars"][c] = f"images/world/chars/{CASE}/{c}.png"
js = "/* A tools/world/build_world.py generálja, kézzel ne szerkeszd. Grafika: LimeZu, Modern Interiors (limezu.itch.io). */\n"
js += "(window.MM_WORLDS = window.MM_WORLDS || {})[%s] = %s;\n" % (json.dumps(CASE), json.dumps(out, ensure_ascii=False, separators=(",", ":")))
open(os.path.join(REPO, "cases", CASE + ".world.js"), "w").write(js)
print("ok", {k: (v["w"], v["h"], len(v["fg"]), len(v["inter"])) for k, v in out["maps"].items()}, "atlas", atlas.size)
