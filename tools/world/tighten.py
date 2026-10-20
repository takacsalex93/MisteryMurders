# tighten.py RAWROOT -> tools/world/sprites_px.json : exact pixel rects (alpha bbox inside each tile box)
import sys, json, os
from PIL import Image
ROOT = os.path.join(sys.argv[1], "1_Interiors/16x16/Theme_Sorter")
H = os.path.dirname(__file__); spec = json.load(open(os.path.join(H, "sprites.json"))); sh = spec.pop("_sheets")
cache, out = {}, {}
for k, (s, x0, y0, x1, y1) in spec.items():
    im = cache.setdefault(s, Image.open(os.path.join(ROOT, sh[s])).convert("RGBA"))
    box = tuple(int(round(v * 16)) for v in (x0, y0, x1, y1))
    bb = im.crop(box).getchannel("A").point(lambda a: 255 if a > 0 else 0).getbbox()
    if not bb: print("EMPTY", k); continue
    out[k] = [sh[s], box[0] + bb[0], box[1] + bb[1], bb[2] - bb[0], bb[3] - bb[1]]
json.dump(out, open(os.path.join(H, "sprites_px.json"), "w"), indent=0)
# montage
S, pad, W = 3, 8, 1500; x = y = rh = 0; pl = []
for k, (f, sx, sy, w, h) in out.items():
    ww, hh = w * S + pad * 2, h * S + 18
    if x + ww > W: x = 0; y += rh; rh = 0
    pl.append((k, x, y)); x += ww; rh = max(rh, hh)
from PIL import ImageDraw
m = Image.new("RGBA", (W, y + rh), (110, 130, 110, 255)); d = ImageDraw.Draw(m)
for k, px, py in pl:
    f, sx, sy, w, h = out[k]; im = cache[[a for a, b in sh.items() if b == f][0]]
    m.alpha_composite(im.crop((sx, sy, sx + w, sy + h)).resize((w * S, h * S), Image.NEAREST), (px + pad, py + 14)); d.text((px + 2, py + 1), k, fill=(255, 255, 0))
m.save(sys.argv[2]); print(len(out), m.size)
