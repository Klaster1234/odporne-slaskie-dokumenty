# -*- coding: utf-8 -*-
"""Grafiki na post o naborze, wariant "dla kogo", w trzech formatach.

Zdjecie zespolu wchodzi w calosci: kadr liczy sie tak, zeby prostokat z ludzmi
zawsze miescil sie w wycinku, niezaleznie od proporcji formatu. Wczesniejsze
wersje mialy pas o stalej wysokosci i object-fit cover, ktory ucinal postacie.
"""
import os
import sys

from PIL import Image, ImageDraw, ImageFont

KAT = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, KAT)
from grafiki_mms import PAPIER, TUSZ, POM, KOB, BIEL, f_lato, papier, tekst_lam  # noqa: E402

sys.stdout.reconfigure(encoding="utf-8")

REPO = r"C:/dev/odporne-slaskie-dokumenty"
LOGO = os.path.join(REPO, "logotypy")
ZDJECIE = (r"C:/Users/ptovm/AppData/Local/Temp/claude/C--dev/"
           r"1c322336-2b5a-48e6-b5e2-32bc67a44dd5/scratchpad/album/hi/p085.jpg")
FRAUNCES = r"C:/tmp/fonty/Fraunces-700.ttf"
OUT = os.path.join(KAT, "dla-gmin")
os.makedirs(OUT, exist_ok=True)

# Prostokat z ludzmi na p085 (4608 x 3072), zmierzony na podgladzie.
LUDZIE = (520, 1290, 3940, 2800)
MARGINES = 1.05

KLAUZULA = ("Sfinansowano ze środków Narodowego Instytutu Wolności – Centrum Rozwoju Społeczeństwa "
            "Obywatelskiego w ramach Rządowego Programu wsparcia organizacji pozarządowych "
            "Moc Małych Społeczności. Zadanie publiczne „Wielka Moc Małych Społeczności, Odporne "
            "Śląskie 2026”, umowa nr 12/2/MMS/2026.")


def f_fraunces(sz):
    return ImageFont.truetype(FRAUNCES, sz)


def kadr(proporcja):
    """Wycinek zdjecia o zadanej proporcji, zawsze z calym prostokatem ludzi."""
    zdj = Image.open(ZDJECIE).convert("RGB")
    W, H = zdj.size
    x1, y1, x2, y2 = LUDZIE
    lw, lh = x2 - x1, y2 - y1
    h = max(lh, lw / proporcja) * MARGINES
    w = h * proporcja
    if w > W:
        w = W
        h = w / proporcja
    if h > H:
        h = H
        w = h * proporcja
    cx, cy = (x1 + x2) / 2.0, (y1 + y2) / 2.0
    kx = min(max(cx - w / 2, 0), W - w)
    ky = min(max(cy - h / 2, 0), H - h)
    assert kx <= x1 and ky <= y1 and kx + w >= x2 and ky + h >= y2, "kadr ucina postacie"
    return zdj.crop((int(kx), int(ky), int(kx + w), int(ky + h)))


def wklej(im, plik, x, y, h, na_bialo=False):
    lg = Image.open(os.path.join(LOGO, plik)).convert("RGBA")
    if na_bialo:  # logo czarne na przezroczystym, na ciemnym pasie musi byc biale
        piksele = lg.load()
        for py in range(lg.height):
            for px in range(lg.width):
                r, g, b, a = piksele[px, py]
                if a:
                    piksele[px, py] = (255, 255, 255, a)
    w = int(round(lg.width * h / float(lg.height)))
    lg = lg.resize((w, int(h)), Image.LANCZOS)
    im.paste(lg, (int(x), int(y)), lg)
    return w


def etykieta_kobalt(d, x, y, tekst, sz):
    f = f_lato(sz, bold=True)
    t = tekst.upper()
    szer = sum(d.textlength(ch, font=f) + sz * 0.09 for ch in t) + sz * 2.2
    d.rectangle([x, y, x + szer, y + sz * 2.1], fill=KOB)
    cx = x + sz * 1.1
    for ch in t:
        d.text((cx, y + sz * 0.52), ch, font=f, fill=PAPIER)
        cx += d.textlength(ch, font=f) + sz * 0.09
    return y + sz * 2.1


def naglowek_dwubarwny(d, x, y, wiersze, sz, maxw):
    """Naglowek z wyroznionym fragmentem, laman recznie, bo kolor zmienia sie w srodku."""
    f = f_fraunces(sz)
    lh = int(sz * 1.06)
    for wiersz in wiersze:
        cx = x
        for tekst, kolor in wiersz:
            d.text((cx, y), tekst, font=f, fill=kolor)
            cx += d.textlength(tekst, font=f)
        y += lh
    return y


def chipsy(d, x, y, pozycje, sz):
    f = f_lato(sz, bold=True)
    cx = x
    for tekst in pozycje:
        d.rectangle([cx, y + sz * 0.28, cx + sz * 0.62, y + sz * 0.9], fill=POM)
        cx += sz * 0.62 + sz * 0.5
        t = tekst.upper()
        for ch in t:
            d.text((cx, y), ch, font=f, fill=TUSZ)
            cx += d.textlength(ch, font=f) + sz * 0.07
        cx += sz * 1.5
    return y + sz * 1.6


def stopka(im, d, W, H, gora, wys_logo=72, klauzula_sz=15):
    """Czarny pas: wezwanie, adres, zestawienie znakow i klauzula."""
    d.rectangle([0, gora, W, H], fill=TUSZ)
    pad = int(W * 0.055)
    y = gora + pad * 0.62
    f_kiedy = f_fraunces(int(W * 0.031))
    d.text((pad, y), "Złóż wniosek do ", font=f_kiedy, fill=PAPIER)
    szer = d.textlength("Złóż wniosek do ", font=f_kiedy)
    d.text((pad + szer, y), "6 października 2026", font=f_kiedy, fill=POM)
    y += int(W * 0.031 * 1.12)
    f_adres = f_fraunces(int(W * 0.052))
    d.text((pad, y), "mms.klaster.org.pl", font=f_adres, fill=PAPIER)
    y += int(W * 0.052 * 1.18) + pad * 0.35

    f_kl = f_lato(klauzula_sz)
    y = tekst_lam(d, pad, y, KLAUZULA, f_kl, (183, 175, 162), W - 2 * pad,
                  lh=int(klauzula_sz * 1.32)) or y
    y = H - pad * 0.5 - wys_logo
    wklej(im, "web-mms-inwersja.png", pad, y, wys_logo)
    maly = int(wys_logo * 0.82)
    prawa = W - pad
    for plik, biale in (("ir-white.png", False), ("kis-logo.png", True)):
        lg = Image.open(os.path.join(LOGO, plik))
        w = int(round(lg.width * maly / float(lg.height)))
        prawa -= w
        wklej(im, plik, prawa, y + (wys_logo - maly) / 2, maly, na_bialo=biale)
        prawa -= int(pad * 0.45)


NAGLOWEK = [
    [("Konkurs dla miejscowości ", TUSZ), ("do", POM)],
    [("100 tysięcy mieszkańców", POM)],
    [("w województwie śląskim.", TUSZ)],
]
NAGLOWEK_WASKI = [
    [("Konkurs dla ", TUSZ), ("miejscowości", POM)],
    [("do 100 tysięcy", POM)],
    [("mieszkańców", POM), (" w śląskim.", TUSZ)],
]


def stopka_waska(im, d, W, H, gora, pad, klauzula_sz=13):
    """Stopka do formatu poziomego: wezwanie po lewej, zestawienie po prawej."""
    d.rectangle([0, gora, W, H], fill=TUSZ)
    y = gora + int(H * 0.028)
    sz_kiedy = int(W * 0.021)
    f_kiedy = f_lato(sz_kiedy, bold=True)
    d.text((pad, y), "ZŁÓŻ WNIOSEK DO ", font=f_kiedy, fill=PAPIER)
    szer = d.textlength("ZŁÓŻ WNIOSEK DO ", font=f_kiedy)
    d.text((pad + szer, y), "6 PAŹDZIERNIKA 2026", font=f_kiedy, fill=POM)
    y += int(sz_kiedy * 1.5)
    sz_adres = int(W * 0.040)
    d.text((pad, y), "mms.klaster.org.pl", font=f_fraunces(sz_adres), fill=PAPIER)

    wys_logo = int(W * 0.052)
    wklej(im, "web-mms-inwersja.png", W - pad - int(wys_logo * 5.45),
          gora + int(H * 0.045), wys_logo)

    y += int(sz_adres * 1.30)
    f_kl = f_lato(klauzula_sz)
    tekst_lam(d, pad, y, KLAUZULA, f_kl, (168, 161, 149), W - 2 * pad,
              lh=int(klauzula_sz * 1.3))


def buduj(nazwa, W, H, prop_zdjecia, sz_naglowka, wys_stopki, naglowek=None, sz_chipsow=None,
          szer_zdjecia=None, waska_stopka=False, chipsy_wl=True, gora_etykiety=None):
    im, d = papier(W, H)
    pad = int(W * 0.055)
    y = etykieta_kobalt(d, pad, gora_etykiety or int(H * 0.045),
                        "Moc Małych Społeczności – Śląskie", int(W * 0.021))
    y += int(H * 0.022)
    y = naglowek_dwubarwny(d, pad, y, naglowek or NAGLOWEK, sz_naglowka, W - 2 * pad)
    if chipsy_wl:
        y += int(H * 0.012)
        y = chipsy(d, pad, y, ["stowarzyszenia", "fundacje", "koła gospodyń"],
                   sz_chipsow or int(W * 0.023))

    gora_stopki = H - wys_stopki
    szer_foto = szer_zdjecia or W
    wys = int(round(szer_foto / prop_zdjecia))
    dostepne = gora_stopki - int(y + H * 0.012)
    if wys > dostepne:  # zdjecie zwezamy, zamiast przycinac ludzi albo wchodzic na stopke
        wys = dostepne
        szer_foto = int(round(wys * prop_zdjecia))
    gora_foto = gora_stopki - wys  # zdjecie przykleja sie do stopki, bez dziury nad pasem
    foto = kadr(prop_zdjecia).resize((szer_foto, wys), Image.LANCZOS)
    im.paste(foto, ((W - szer_foto) // 2, gora_foto))

    if waska_stopka:
        stopka_waska(im, d, W, H, gora_stopki, pad)
    else:
        stopka(im, d, W, H, gora_stopki,
               wys_logo=int(W * 0.067), klauzula_sz=max(12, int(W * 0.0135)))
    cel = os.path.join(OUT, nazwa)
    im.save(cel, quality=95)
    print("%-52s %s  zdjecie %dx%d" % (nazwa, im.size, szer_foto, wys))


if __name__ == "__main__":
    buduj("MMS Slaskie - dla kogo, kwadrat-1080.png", 1080, 1080, 2.30,
          int(1080 * 0.052), 322, sz_chipsow=21, gora_etykiety=40)
    buduj("MMS Slaskie - dla kogo, pion-1080x1350.png", 1080, 1350, 1.95,
          int(1080 * 0.062), 380)
    buduj("MMS Slaskie - dla kogo, poziom-1200x630.png", 1200, 630, 3.05,
          int(1200 * 0.034), 178, waska_stopka=True, chipsy_wl=False, gora_etykiety=24,
          naglowek=[
              [("Konkurs dla miejscowości ", TUSZ), ("do 100 tysięcy mieszkańców", POM)],
          ])
