# -*- coding: utf-8 -*-
"""Grafiki reklamowe Meta (FB/IG) dla naboru MMS: kwadrat 1080x1080, pion 1080x1350, story 1080x1920."""
import os, sys
from PIL import Image, ImageDraw, ImageFont
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from grafiki_mms import papier, f_lato, f_fraunces, etykieta, tekst_lam, PAPIER, TUSZ, POM, KOB, BIEL, SZARY
sys.stdout.reconfigure(encoding="utf-8")

LOGO = r"C:\dev\odporne-slaskie-dokumenty\logotypy"
OUT = os.path.dirname(os.path.abspath(__file__)) + "/reklamy"
os.makedirs(OUT, exist_ok=True)
KLAUZULA = "Sfinansowano ze środków Narodowego Instytutu Wolności – Centrum Rozwoju Społeczeństwa Obywatelskiego w ramach Rządowego Programu wsparcia organizacji pozarządowych Moc Małych Społeczności"

def wklej(im, sciezka, x, y, h):
    lg = Image.open(sciezka).convert("RGBA")
    w = int(lg.width * h / lg.height)
    lg = lg.resize((w, h), Image.LANCZOS)
    im.paste(lg, (int(x), int(y)), lg)
    return w

def chip(d, x, y, tekst, f, kolor=TUSZ, tlo=BIEL):
    tw = d.textlength(tekst, font=f) + 44
    d.rounded_rectangle([x, y, x + tw, y + f.size + 26], radius=(f.size + 26) // 2, fill=tlo, outline=(214, 208, 196), width=2)
    d.text((x + 22, y + 12), tekst, font=f, fill=kolor)
    return tw

def pasek_dolny(im, d, W, H, hb, klauzula_sz):
    # czarny pas z zestawieniem NIW (inwersja), adresem i klauzula
    d.rectangle([0, H - hb, W, H], fill=TUSZ)
    lw = wklej(im, os.path.join(LOGO, "web-mms-inwersja.png"), 60, H - hb + 34, 78)
    f = f_lato(klauzula_sz)
    tekst_lam(d, 60, H - hb + 34 + 78 + 22, KLAUZULA, f, (200, 195, 185), W - 120, lh=int(klauzula_sz * 1.3))

def organizatorzy(im, d, x, y, h=64):
    w1 = wklej(im, os.path.join(LOGO, "kis-logo.png"), x, y, h)
    d.line([x + w1 + 28, y + 4, x + w1 + 28, y + h - 4], fill=(200, 195, 185), width=2)
    wklej(im, os.path.join(LOGO, "ir-kolor-bez-tla.png"), x + w1 + 56, y, h)

def grafika(W, H, naglowek_sz, top, story=False):
    im, d = papier(W, H)
    hb = 300 if story else 250
    sz = 300 if story else 230
    by = H - hb - (150 if story else 110)
    # znak S z kropka: w prawym gornym rogu, a w story nad przyciskiem po prawej
    sx, sy = (W - sz - 70, by - sz - 60) if story else (W - sz - 70, top - 30)
    d.text((sx, sy), "Ś", font=f_fraunces(sz, 700), fill=TUSZ)
    kx = sx + int(sz * 0.72); ky = sy + int(sz * 0.62)
    d.ellipse([kx, ky, kx + int(sz * 0.11), ky + int(sz * 0.11)], fill=POM)
    y = top
    etykieta(d, 70, y, "Nabór do 6 października 2026", sz=30 if story else 26)
    y += 70 if story else 60
    y = tekst_lam(d, 70, y, "Do 10 000 zł dla organizacji i grup nieformalnych", f_fraunces(naglowek_sz, 700), TUSZ, W - 140 - (0 if story else sz + 40), lh=int(naglowek_sz * 1.08))
    y += 22
    y = tekst_lam(d, 70, y, "Stowarzyszenie, koło gospodyń, OSP, klub sportowy albo trzech sąsiadów bez rejestracji.", f_lato(34 if story else 28), TUSZ, W - 140 - (0 if story else sz + 40), lh=int((34 if story else 28) * 1.35))
    y += 34
    f = f_lato(36 if story else 32, bold=True)
    chipy = ["bez wkładu własnego", "wystarczą 3 osoby", "wniosek w całości online", "miejscowości do 100 tys. mieszkańców"]
    for t in chipy:
        if y + f.size + 26 > by - 24: break
        chip(d, 70, y, t, f); y += f.size + 26 + 18
    # adres jako przycisk
    f = f_lato(40 if story else 34, bold=True); t = "mms.klaster.org.pl"
    bw = d.textlength(t, font=f) + 80; bh = f.size + 40
    d.rounded_rectangle([70, by, 70 + bw, by + bh], radius=14, fill=KOB)
    d.text((110, by + 20), t, font=f, fill=BIEL)
    if 70 + bw + 60 + 400 < W:
        organizatorzy(im, d, 70 + bw + 60, by + (bh - 64) // 2, 64)
    else:
        organizatorzy(im, d, 70, by - 100, 64)
    pasek_dolny(im, d, W, H, hb, 20 if story else 18)
    return im

grafika(1080, 1080, 70, 80).save(OUT + "/reklama-kwadrat-1080x1080.png", optimize=True)
grafika(1080, 1350, 88, 120).save(OUT + "/reklama-pion-1080x1350.png", optimize=True)
grafika(1080, 1920, 104, 320, story=True).save(OUT + "/reklama-story-1080x1920.png", optimize=True)
print("OK", os.listdir(OUT))
