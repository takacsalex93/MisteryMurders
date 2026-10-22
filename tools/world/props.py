# Saját rajzolású pixeles tárgyak (nem a LimeZu csomagból): kóddal rajzolt, egyszerű formák a csomag színvilágában.
from PIL import Image, ImageDraw

O = (46, 38, 54, 255)          # körvonal
def C(*c): return tuple(c) + ((255,) if len(c) == 3 else ())
WOOD, WOOD_D, WOOD_L = C(150, 98, 60), C(108, 68, 44), C(186, 132, 82)
IRON, IRON_D, IRON_L = C(92, 90, 104), C(60, 58, 70), C(140, 138, 152)
BRASS, BRASS_L = C(196, 152, 64), C(236, 200, 110)
RED, RED_D, RED_L = C(158, 44, 48), C(112, 30, 38), C(200, 78, 72)
PAPER, PAPER_D = C(240, 234, 220), C(200, 192, 176)

def new(w, h): im = Image.new("RGBA", (w, h), (0, 0, 0, 0)); return im, ImageDraw.Draw(im)
def rect(d, x0, y0, x1, y1, fill, line=O): d.rectangle([x0, y0, x1, y1], fill=fill, outline=line)

def barrel():
    im, d = new(16, 20)
    d.ellipse([1, 12, 14, 19], fill=WOOD_D, outline=O); rect(d, 1, 4, 14, 15, WOOD, None)
    d.line([1, 4, 1, 15], fill=O); d.line([14, 4, 14, 15], fill=O)
    d.ellipse([1, 0, 14, 8], fill=WOOD_L, outline=O); d.ellipse([4, 2, 11, 6], outline=WOOD_D)
    for y in (8, 13): d.line([2, y, 13, y], fill=IRON_D)
    d.line([4, 9, 4, 12], fill=WOOD_L); return im

def cask():  # fekvő hordó oldalról
    im, d = new(30, 18)
    d.rounded_rectangle([0, 2, 29, 17], 6, fill=WOOD, outline=O)
    for x in (6, 23): d.line([x, 3, x, 16], fill=IRON_D)
    for x in (11, 18): d.line([x, 3, x, 16], fill=WOOD_D)
    d.line([3, 5, 26, 5], fill=WOOD_L); d.ellipse([13, 8, 16, 11], fill=WOOD_D, outline=O)
    d.rectangle([10, 15, 19, 17], fill=WOOD_D, outline=O); return im

def vat():
    im, d = new(26, 22)
    d.ellipse([0, 10, 25, 21], fill=WOOD_D, outline=O); rect(d, 0, 6, 25, 16, WOOD, None)
    d.line([0, 6, 0, 16], fill=O); d.line([25, 6, 25, 16], fill=O)
    d.ellipse([0, 0, 25, 12], fill=WOOD_L, outline=O); d.ellipse([3, 2, 22, 10], fill=C(110, 40, 70), outline=WOOD_D)
    d.line([1, 14, 24, 14], fill=IRON_D); return im

def press():
    im, d = new(24, 30)
    rect(d, 2, 4, 5, 29, WOOD_D); rect(d, 18, 4, 21, 29, WOOD_D); rect(d, 0, 2, 23, 7, WOOD)
    rect(d, 10, 7, 13, 18, IRON); rect(d, 4, 18, 19, 22, WOOD_L); d.ellipse([3, 20, 20, 29], fill=WOOD, outline=O)
    d.line([6, 12, 17, 12], fill=IRON_D, width=2); return im

def iceblock():
    im, d = new(14, 13)
    rect(d, 0, 3, 13, 12, C(150, 206, 226)); rect(d, 0, 0, 13, 4, C(206, 240, 250))
    d.line([2, 6, 2, 10], fill=C(230, 250, 255)); d.line([9, 7, 11, 5], fill=C(230, 250, 255)); return im

def cake(col=(236, 150, 170)):
    im, d = new(12, 11)
    d.ellipse([0, 6, 11, 10], fill=PAPER_D, outline=O); rect(d, 1, 2, 10, 8, C(*col))
    d.ellipse([1, 0, 10, 4], fill=C(min(255, col[0] + 16), min(255, col[1] + 40), min(255, col[2] + 40)), outline=O)
    d.point([4, 1], fill=RED); d.point([7, 2], fill=RED); return im

def cake_cut(): im = cake((150, 196, 120)); d = ImageDraw.Draw(im); d.polygon([(6, 2), (11, 2), (11, 8), (6, 8)], fill=(0, 0, 0, 0)); d.line([6, 2, 6, 8], fill=O); return im

def copperpot():
    im, d = new(16, 12)
    d.ellipse([1, 2, 14, 11], fill=C(196, 110, 60), outline=O); d.ellipse([2, 1, 13, 6], fill=C(90, 50, 34), outline=O)
    d.line([4, 8, 8, 9], fill=C(236, 160, 110)); d.line([14, 4, 15, 4], fill=O); return im

def oven():
    im, d = new(32, 30)
    rect(d, 0, 6, 31, 29, C(160, 80, 62)); d.pieslice([0, 0, 31, 14], 180, 360, fill=C(180, 96, 72), outline=O)
    for y in range(9, 28, 4):
        for x in range(1 + (y // 4 % 2) * 3, 30, 6): d.line([x, y, x + 3, y], fill=C(120, 56, 48))
    rect(d, 9, 15, 22, 27, C(40, 30, 30)); d.rectangle([11, 22, 20, 26], fill=C(240, 140, 50)); return im

def safe(col=(70, 120, 80)):
    im, d = new(18, 22)
    rect(d, 0, 2, 17, 21, C(*col)); rect(d, 0, 0, 17, 4, C(min(255, col[0] + 30), min(255, col[1] + 30), min(255, col[2] + 30)))
    d.ellipse([5, 8, 12, 15], fill=IRON_L, outline=O); d.point([8, 11], fill=O); rect(d, 13, 10, 15, 13, BRASS); return im

def cashreg():
    im, d = new(18, 16)
    rect(d, 0, 6, 17, 15, BRASS); rect(d, 2, 0, 15, 7, C(176, 130, 50))
    for x in range(3, 15, 3): d.rectangle([x, 9, x + 1, 10], fill=PAPER)
    rect(d, 5, 1, 12, 4, PAPER); return im

def switchboard():
    im, d = new(32, 30)
    rect(d, 0, 0, 31, 22, WOOD_D); rect(d, 2, 2, 29, 16, C(40, 34, 38))
    for y in range(4, 16, 4):
        for x in range(4, 29, 4): d.point([x, y], fill=BRASS_L)
    for x, c in ((6, RED), (14, C(60, 110, 190)), (22, C(220, 190, 80))): d.line([x, 6, x + 3, 20], fill=c)
    rect(d, 0, 20, 31, 29, WOOD); d.line([2, 24, 29, 24], fill=WOOD_L); return im

def headphones():
    im, d = new(12, 9)
    d.arc([1, 0, 10, 10], 180, 360, fill=O, width=2); rect(d, 0, 4, 3, 8, C(40, 40, 46)); rect(d, 8, 4, 11, 8, C(40, 40, 46)); return im

def liftcage():
    im, d = new(32, 42)
    rect(d, 0, 0, 31, 41, C(40, 34, 30)); rect(d, 3, 6, 28, 41, C(70, 60, 54), None)
    for x in range(4, 29, 3): d.line([x, 6, x, 41], fill=BRASS)
    d.line([3, 6, 28, 6], fill=BRASS_L); d.line([3, 23, 28, 23], fill=BRASS_L)
    rect(d, 10, 1, 21, 4, BRASS); d.point([15, 2], fill=RED); return im

def keyboard():
    im, d = new(22, 14)
    rect(d, 0, 0, 21, 13, WOOD)
    for i, x in enumerate(range(3, 20, 4)):
        for y in (3, 8):
            d.point([x, y], fill=O)
            if (i + y) % 3: d.line([x, y + 1, x, y + 3], fill=BRASS_L)
    return im

def seats(n=6):
    im, d = new(n * 8 + 1, 14)
    for i in range(n):
        x = i * 8; rect(d, x, 0, x + 8, 7, RED_D); rect(d, x + 1, 6, x + 7, 12, RED); d.line([x + 2, 8, x + 6, 8], fill=RED_L)
    return im

def curtain(w=96):
    im, d = new(w, 28)
    rect(d, 0, 0, w - 1, 27, RED)
    for x in range(3, w - 2, 6): d.line([x, 2, x, 26], fill=RED_D); d.line([x + 2, 2, x + 2, 26], fill=RED_L)
    rect(d, 0, 0, w - 1, 3, BRASS); return im

def sandbag(n=""):
    im, d = new(10, 11)
    d.rounded_rectangle([0, 2, 9, 10], 3, fill=C(196, 172, 120), outline=O); d.line([3, 0, 6, 0], fill=O); d.line([4, 1, 5, 2], fill=O)
    d.line([2, 5, 7, 5], fill=C(150, 128, 90)); return im

def sandbag_burst():
    im, d = new(18, 10)
    d.ellipse([0, 3, 17, 9], fill=C(214, 196, 150)); d.rounded_rectangle([4, 0, 13, 7], 3, fill=C(196, 172, 120), outline=O); d.line([6, 3, 11, 6], fill=O); return im

def pulleys():
    im, d = new(30, 22)
    d.line([0, 2, 29, 2], fill=IRON_D, width=2)
    for x in (5, 15, 25):
        d.ellipse([x - 3, 3, x + 3, 9], fill=IRON_L, outline=O); d.line([x, 9, x, 21], fill=C(200, 176, 120))
    return im

def rope():
    im, d = new(12, 9)
    for r in (5, 3, 1): d.ellipse([6 - r - 1, 4 - r * .7, 6 + r, 4 + r * .7 + 1], outline=C(200, 176, 120))
    d.ellipse([0, 0, 11, 8], outline=O); return im

def promptbox():
    im, d = new(24, 14)
    d.pieslice([0, 0, 23, 22], 180, 360, fill=C(60, 50, 44), outline=O); rect(d, 0, 10, 23, 13, WOOD_D)
    rect(d, 9, 4, 14, 9, C(240, 210, 120)); return im

def mirror_bulbs():
    im, d = new(22, 22)
    rect(d, 0, 0, 21, 21, C(214, 200, 170)); rect(d, 4, 4, 17, 17, C(170, 200, 214))
    for p in [(2, 2), (2, 10), (2, 18), (19, 2), (19, 10), (19, 18), (10, 2), (10, 19)]: d.ellipse([p[0] - 1, p[1] - 1, p[0] + 1, p[1] + 1], fill=C(255, 236, 150))
    d.line([6, 7, 9, 5], fill=C(230, 245, 250)); return im

def hay():
    im, d = new(22, 15)
    rect(d, 0, 3, 21, 14, C(206, 172, 80)); rect(d, 0, 0, 21, 4, C(236, 206, 110))
    for x in range(3, 20, 4): d.line([x, 5, x + 1, 13], fill=C(170, 136, 60))
    d.line([0, 8, 21, 8], fill=WOOD_D); return im

def horse():
    im, d = new(34, 22)
    d.ellipse([2, 6, 30, 21], fill=C(120, 78, 50), outline=O); d.ellipse([24, 2, 33, 12], fill=C(120, 78, 50), outline=O)
    rect(d, 8, 7, 24, 18, C(150, 40, 46)); d.line([8, 10, 24, 10], fill=C(220, 200, 120)); d.point([30, 6], fill=O)
    d.line([25, 3, 22, 1], fill=O); return im

def lantern():
    im, d = new(9, 13)
    d.arc([2, 0, 6, 4], 180, 360, fill=O); rect(d, 1, 3, 7, 11, C(250, 210, 110)); d.line([1, 7, 7, 7], fill=IRON_D); rect(d, 0, 11, 8, 12, IRON); return im

def trays():
    im, d = new(28, 10)
    for x, c in ((0, C(200, 200, 190)), (9, C(150, 170, 160)), (18, C(170, 150, 140))): rect(d, x, 1, x + 9, 9, IRON_L); rect(d, x + 2, 3, x + 7, 7, c, None)
    return im

def redlamp():
    im, d = new(8, 11)
    d.line([4, 0, 4, 3], fill=O); d.ellipse([0, 3, 7, 10], fill=C(230, 40, 40), outline=O); d.point([2, 5], fill=C(255, 160, 150)); return im

def photoline():
    im, d = new(44, 12)
    d.line([0, 1, 43, 1], fill=O)
    for x in range(3, 40, 9): rect(d, x, 2, x + 6, 10, PAPER); d.rectangle([x + 2, 4, x + 4, 8], fill=C(110, 100, 100))
    return im

def filing():
    im, d = new(16, 26)
    rect(d, 0, 0, 15, 25, C(120, 120, 128))
    for y in (2, 10, 18): rect(d, 2, y, 13, y + 6, IRON_L); d.line([6, y + 3, 9, y + 3], fill=O)
    return im

def coatrack():
    im, d = new(14, 28)
    d.line([7, 2, 7, 26], fill=WOOD_D, width=2); d.line([2, 26, 12, 26], fill=WOOD_D, width=2)
    d.rounded_rectangle([1, 3, 6, 16], 2, fill=C(60, 60, 72), outline=O); d.rounded_rectangle([8, 4, 13, 14], 2, fill=C(110, 80, 60), outline=O)
    d.ellipse([5, 0, 9, 3], fill=WOOD, outline=O); return im

def samovar():
    im, d = new(12, 18)
    rect(d, 3, 0, 8, 3, BRASS); d.ellipse([0, 3, 11, 14], fill=BRASS, outline=O); d.line([3, 6, 3, 11], fill=BRASS_L)
    rect(d, 2, 14, 9, 17, C(150, 110, 40)); d.line([11, 9, 11, 11], fill=O); return im

def valve():
    im, d = new(14, 14)
    d.ellipse([0, 0, 13, 13], outline=RED, width=2); d.line([7, 1, 7, 12], fill=RED_D); d.line([1, 7, 12, 7], fill=RED_D)
    d.ellipse([5, 5, 8, 8], fill=IRON, outline=O); return im

def pipevalve():
    im, d = new(16, 18)
    rect(d, 6, 0, 9, 17, IRON); d.ellipse([2, 5, 13, 13], fill=IRON_L, outline=O); rect(d, 6, 7, 9, 10, BRASS); return im

def handbag(col=(150, 60, 80)):
    im, d = new(12, 10)
    d.arc([3, 0, 8, 6], 180, 360, fill=O); rect(d, 0, 3, 11, 9, C(*col)); d.line([1, 5, 10, 5], fill=C(min(255, col[0] + 40), min(255, col[1] + 40), min(255, col[2] + 40))); d.point([5, 6], fill=BRASS_L); return im

def suitcase2(col=(90, 110, 140)):
    im, d = new(20, 13)
    rect(d, 7, 0, 12, 3, None); rect(d, 0, 2, 19, 12, C(*col)); d.line([0, 6, 19, 6], fill=O); rect(d, 8, 5, 11, 7, BRASS); return im

def hatbox():
    im, d = new(14, 12)
    d.ellipse([0, 6, 13, 11], fill=C(200, 160, 170), outline=O); rect(d, 0, 3, 13, 8, C(220, 180, 190), None)
    d.line([0, 3, 0, 8], fill=O); d.line([13, 3, 13, 8], fill=O); d.ellipse([0, 0, 13, 6], fill=C(236, 206, 214), outline=O); d.line([2, 7, 11, 7], fill=C(120, 60, 90)); return im

def briefcase(col=(110, 70, 44)):
    im, d = new(16, 12)
    d.arc([5, 0, 10, 5], 180, 360, fill=O); rect(d, 0, 2, 15, 11, C(*col)); d.line([0, 5, 15, 5], fill=O); rect(d, 3, 4, 4, 6, BRASS); rect(d, 11, 4, 12, 6, BRASS); return im

def sink():
    im, d = new(16, 14)
    rect(d, 0, 4, 15, 13, C(230, 232, 236)); d.ellipse([3, 6, 12, 11], fill=C(190, 200, 210), outline=O); rect(d, 7, 0, 8, 5, IRON_L); return im

def chimney():
    im, d = new(22, 30)
    rect(d, 1, 6, 20, 29, C(150, 146, 140))
    for y in range(9, 29, 4):
        for x in range(2 + (y // 4 % 2) * 3, 19, 6): d.line([x, y, x + 3, y], fill=C(110, 106, 100))
    rect(d, 0, 2, 21, 7, IRON); d.ellipse([9, 0, 12, 3], fill=IRON_L, outline=O); return im

def cellardoor():
    im, d = new(32, 22)
    rect(d, 0, 4, 31, 21, C(110, 106, 100)); rect(d, 3, 6, 15, 19, WOOD); rect(d, 16, 6, 28, 19, WOOD)
    for x in (6, 10, 19, 23): d.line([x, 7, x, 18], fill=WOOD_D)
    rect(d, 13, 11, 18, 13, IRON); return im

def candles():
    im, d = new(16, 10)
    rect(d, 0, 4, 15, 9, WOOD)
    for x in (3, 7, 11): rect(d, x, 0, x + 2, 5, PAPER)
    return im

def candle():
    im, d = new(6, 12)
    rect(d, 1, 4, 4, 11, PAPER); d.point([2, 2], fill=C(255, 200, 80)); d.point([2, 3], fill=C(255, 150, 50)); return im

def swords():
    im, d = new(14, 24)
    for x, y in ((4, 0), (7, 2), (10, 1)): d.line([x, y, x, 14], fill=IRON_L, width=1); d.line([x - 2, y + 3, x + 2, y + 3], fill=BRASS)
    im.alpha_composite(barrel().resize((14, 14)), (0, 10)); return im

def gramophone():
    im, d = new(18, 20)
    rect(d, 2, 12, 15, 19, WOOD); d.ellipse([3, 10, 14, 14], fill=C(30, 30, 34), outline=O)
    d.polygon([(9, 11), (2, 0), (16, 2)], fill=BRASS, outline=O); return im

def poster(col=(190, 60, 60)):
    im, d = new(14, 18)
    rect(d, 0, 0, 13, 17, PAPER); rect(d, 2, 2, 11, 10, C(*col), None); d.line([2, 12, 11, 12], fill=O); d.line([2, 14, 8, 14], fill=O); return im

def notice():
    im, d = new(16, 14)
    rect(d, 0, 0, 15, 13, C(176, 136, 90))
    for x, y in ((2, 2), (8, 3), (3, 8)): rect(d, x, y, x + 5, y + 4, PAPER)
    return im

def calendar():
    im, d = new(8, 8); rect(d, 0, 1, 7, 7, PAPER); rect(d, 0, 0, 7, 2, RED); d.point([3, 4], fill=O); d.point([5, 5], fill=O); return im

def book():
    im, d = new(10, 8); rect(d, 0, 1, 9, 7, C(100, 50, 40)); rect(d, 1, 0, 8, 2, PAPER); d.line([5, 1, 5, 7], fill=O); return im

def ledger():
    im, d = new(14, 9); rect(d, 0, 0, 13, 8, PAPER); d.line([7, 0, 7, 8], fill=O)
    for y in (2, 4, 6): d.line([2, y, 5, y], fill=PAPER_D); d.line([9, y, 12, y], fill=PAPER_D)
    return im

def guestbook():
    im, d = new(16, 10); rect(d, 0, 0, 15, 9, PAPER); d.line([8, 0, 8, 9], fill=O); rect(d, 0, 0, 15, 1, RED_D); return im

def tape():
    im, d = new(10, 12); d.ellipse([0, 0, 9, 7], fill=PAPER, outline=O); rect(d, 3, 6, 6, 11, PAPER); return im

def swan():
    im, d = new(14, 12)
    d.ellipse([1, 5, 13, 11], fill=C(250, 250, 250), outline=O); d.line([4, 6, 3, 1], fill=C(250, 250, 250), width=2); d.line([3, 1, 5, 1], fill=C(250, 170, 60))
    d.line([4, 6, 3, 1], fill=O); return im

def boots():
    im, d = new(14, 10); rect(d, 0, 0, 5, 9, C(50, 40, 36)); rect(d, 7, 0, 12, 9, C(50, 40, 36)); rect(d, 0, 7, 7, 9, C(50, 40, 36)); rect(d, 7, 7, 13, 9, C(50, 40, 36)); return im

def bucket():
    im, d = new(12, 11); d.polygon([(0, 2), (11, 2), (9, 10), (2, 10)], fill=IRON_L, outline=O); d.ellipse([0, 0, 11, 4], fill=IRON_D, outline=O); return im

def bucket_tipped():
    im, d = new(16, 10); d.polygon([(0, 2), (10, 0), (12, 8), (2, 9)], fill=IRON_L, outline=O); d.ellipse([12, 4, 15, 9], fill=C(170, 210, 230)); return im

def apron():
    im, d = new(10, 14); d.polygon([(2, 0), (7, 0), (9, 13), (0, 13)], fill=PAPER, outline=O); d.line([0, 4, 9, 4], fill=O); return im

def vase_flower(col=(30, 26, 34)):
    im, d = new(10, 16)
    d.line([5, 2, 5, 9], fill=C(60, 110, 60)); d.ellipse([2, 0, 8, 5], fill=C(*col), outline=O)
    d.polygon([(2, 9), (8, 9), (9, 15), (1, 15)], fill=C(170, 200, 214), outline=O); return im

def decanter():
    im, d = new(8, 12); d.ellipse([0, 4, 7, 11], fill=C(190, 120, 60), outline=O); rect(d, 2, 1, 5, 5, C(200, 220, 230)); d.ellipse([2, 0, 5, 2], fill=C(200, 220, 230), outline=O); return im

def gasmeter():
    im, d = new(14, 16); rect(d, 0, 2, 13, 15, C(150, 150, 140)); d.ellipse([3, 4, 10, 11], fill=PAPER, outline=O); d.line([6, 8, 8, 6], fill=RED); rect(d, 5, 0, 8, 2, IRON); return im

def irondoor():
    im, d = new(16, 26); rect(d, 0, 0, 15, 25, IRON); rect(d, 2, 2, 13, 23, IRON_D, None)
    for y in (6, 13, 20): d.line([1, y, 14, y], fill=IRON_L)
    rect(d, 11, 12, 13, 14, BRASS); return im

def radiator():
    im, d = new(22, 12); rect(d, 0, 0, 21, 11, C(210, 206, 196))
    for x in range(3, 20, 3): d.line([x, 1, x, 10], fill=C(160, 156, 150))
    return im

def cards():
    im, d = new(12, 8)
    for x, y in ((0, 2), (4, 0), (7, 3)): rect(d, x, y, x + 4, y + 5, PAPER); d.point([x + 2, y + 2], fill=RED)
    return im

def coins():
    im, d = new(10, 6)
    for x, y in ((0, 2), (3, 0), (6, 2)): d.ellipse([x, y, x + 3, y + 3], fill=BRASS_L, outline=O)
    return im

def ashstand():
    im, d = new(10, 22); d.ellipse([0, 0, 9, 5], fill=IRON_L, outline=O); rect(d, 4, 4, 5, 19, BRASS); d.ellipse([1, 18, 8, 21], fill=IRON, outline=O); return im

def chute():
    im, d = new(16, 14); rect(d, 0, 0, 15, 13, IRON); rect(d, 2, 2, 13, 11, C(20, 18, 24)); d.line([2, 3, 13, 3], fill=IRON_L); return im

def ironboard():
    im, d = new(28, 10); d.ellipse([0, 0, 10, 7], fill=PAPER, outline=O); rect(d, 5, 0, 27, 7, PAPER); d.line([10, 7, 16, 9], fill=IRON); d.line([22, 7, 16, 9], fill=IRON); return im

def chalkmark():
    im, d = new(12, 8); d.line([1, 1, 10, 1], fill=C(240, 240, 240)); d.text((3, -2), "7", fill=C(240, 240, 240)); return im

def bench():
    im, d = new(32, 14); rect(d, 0, 0, 31, 6, RED_D); rect(d, 0, 5, 31, 13, RED); d.line([2, 8, 29, 8], fill=RED_L)
    for x in (10, 21): d.line([x, 6, x, 13], fill=RED_D)
    return im

def bench_green():
    im = bench(); px = im.load()
    for y in range(im.height):
        for x in range(im.width):
            r, g, b, a = px[x, y]
            if a and r > g + 40: px[x, y] = (g, r, b + 10, a)
    return im

def window_frost():
    im, d = new(26, 20); rect(d, 0, 0, 25, 19, WOOD_D); rect(d, 2, 2, 23, 17, C(200, 222, 236), None)
    for x, y in ((4, 4), (10, 9), (18, 5), (7, 13), (20, 14)): d.point([x, y], fill=(255, 255, 255, 255)); d.point([x + 1, y + 1], fill=(240, 250, 255, 255))
    d.line([12, 2, 12, 17], fill=WOOD_D); return im

def pongyola():
    im, d = new(14, 14); d.polygon([(1, 0), (12, 0), (13, 13), (0, 13)], fill=C(170, 150, 200), outline=O); d.line([6, 0, 6, 13], fill=C(130, 110, 160)); return im

def chest():
    im, d = new(22, 14); rect(d, 0, 3, 21, 13, WOOD); rect(d, 0, 0, 21, 5, WOOD_L)
    for x in (3, 18): d.line([x, 0, x, 13], fill=IRON)
    rect(d, 9, 5, 12, 8, IRON_L); return im

def chest_open():
    im, d = new(22, 18); rect(d, 0, 0, 21, 6, WOOD_D); rect(d, 0, 7, 21, 17, WOOD); rect(d, 2, 8, 19, 12, C(60, 44, 34), None)
    rect(d, 4, 9, 9, 11, C(120, 160, 110)); rect(d, 11, 9, 17, 12, PAPER)
    for x in (3, 18): d.line([x, 7, x, 17], fill=IRON)
    return im

def thermometer():
    im, d = new(5, 14); rect(d, 1, 0, 3, 11, PAPER); d.ellipse([0, 9, 4, 13], fill=RED, outline=O); d.line([2, 5, 2, 10], fill=RED); return im

def cane():
    im, d = new(10, 18); d.line([7, 3, 4, 17], fill=WOOD_D, width=2); d.arc([3, 0, 9, 6], 180, 360, fill=WOOD_D, width=2); return im

def crate():
    im, d = new(16, 16); rect(d, 0, 0, 15, 15, WOOD); d.line([0, 0, 15, 15], fill=WOOD_D); d.line([1, 5, 14, 5], fill=WOOD_D); d.line([1, 10, 14, 10], fill=WOOD_D); return im

def cart():
    im, d = new(34, 22); rect(d, 2, 2, 31, 14, WOOD); d.line([3, 6, 30, 6], fill=WOOD_D); d.line([3, 10, 30, 10], fill=WOOD_D)
    d.ellipse([4, 12, 13, 21], fill=WOOD_D, outline=O); d.ellipse([21, 12, 30, 21], fill=WOOD_D, outline=O); return im

def ladder():
    im, d = new(16, 46)
    d.line([3, 0, 3, 45], fill=WOOD_D, width=2); d.line([12, 0, 12, 45], fill=WOOD_D, width=2)
    for y in range(4, 45, 6): d.line([3, y, 12, y], fill=WOOD_L, width=2)
    return im

def mold():
    im, d = new(14, 10)
    for x, y, r in ((3, 4, 3), (8, 3, 3), (11, 6, 2), (5, 7, 2)): d.ellipse([x - r, y - r, x + r, y + r], fill=C(30, 34, 30))
    return im

def rag():
    im, d = new(10, 6); d.polygon([(0, 2), (6, 0), (9, 3), (3, 5)], fill=C(80, 76, 60), outline=O); return im

PROPS = {k: v for k, v in globals().items() if callable(v) and k[0].islower() and k not in ("new", "rect")}
def make(name):
    return PROPS[name]()

def compact():
    im, d = new(12, 8); d.ellipse([0, 1, 7, 7], fill=BRASS, outline=O); d.ellipse([2, 2, 5, 5], fill=C(200, 225, 240)); rect(d, 9, 0, 11, 7, RED); return im
PROPS["compact"] = compact
