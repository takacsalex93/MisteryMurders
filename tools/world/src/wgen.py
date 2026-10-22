# Segédfüggvények a térképleírások megírásához: a tools/world/src/<ügy>.py fájlok ezzel írják a tools/world/<ügy>.json-t.
import json, os
HERE = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
# padlóminták és falminták a Room_Builder lapokon (oszlop, sor)
F = {"herring": [8, 10], "checker": [12, 4], "parquet": [0, 26], "olive": [0, 16], "redtile": [8, 14], "stone": [4, 32], "parquet2": [0, 20],
     "cream": [4, 4], "darkwood": [12, 26], "planks": [4, 22], "lightwood": [0, 24], "purple": [8, 18], "pink": [8, 2], "greytile": [0, 6],
     "blueorn": [8, 20], "greyorn": [8, 22], "woodgrey": [0, 32], "goldwood": [0, 12], "brownsq": [8, 4], "beige": [4, 6], "bricks": [0, 28],
     "grid": [8, 28], "grey": [4, 34], "teal": [8, 24], "cookie": [4, 16], "orange": [8, 12], "whitetile": [0, 4], "diag": [0, 30], "squares": [4, 8], "lightgrey": [4, 28]}
Wl = {"red": [22, 2], "salmon": [22, 0], "purple": [22, 4], "grey": [22, 6], "lblue": [22, 8], "teal": [22, 12], "tile": [22, 14], "mint": [22, 18],
      "greygreen": [22, 20], "brick": [22, 22], "green": [22, 28], "glass": [22, 30], "cream": [0, 6], "beige": [0, 8], "white": [0, 2], "stone": [0, 4],
      "stripes": [11, 6], "panel": [11, 16], "brownwood": [11, 18], "corridor": [11, 12], "brown": [11, 14], "redstripe": [11, 24], "pinkstripe": [11, 26],
      "planks": [11, 0], "orange": [11, 20], "darkgrey": [0, 30], "tan": [0, 22], "brickb": [0, 16], "dred": [11, 32], "blue": [11, 34]}
def room(loc, x, y, w, h, floor, wall, label=None):
    r = [loc, x, y, w, h, F[floor], Wl[wall]]
    return r + [label] if label else r
def o(s, x, b, **kw): d = {"s": s, "x": x, "b": b}; d.update(kw); return d
def glint(i, x, b, label, puzzle=False): d = {"glint": i, "x": x, "b": b, "label": label}; return dict(d, puzzle=True) if puzzle else d
def npc(i, x, y, dir="down", **kw): d = {"id": i, "x": x, "y": y, "dir": dir}; d.update(kw); return d
def write(case, spec):
    json.dump(spec, open(os.path.join(HERE, case + ".json"), "w"), ensure_ascii=False, indent=1)
    print("írva:", case)
