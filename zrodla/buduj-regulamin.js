/**
 * Sklada regulamin do pliku DOCX w identyfikacji Odporne Slaskie.
 * Uruchomienie: node buduj-regulamin.js
 */
const fs = require("fs");
const path = require("path");
const {
  Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType, BorderStyle,
  Header, Footer, PageNumber, Table, TableRow, TableCell, WidthType, ShadingType,
  ImageRun, TabStopType, convertMillimetersToTwip, PageBreak } = require("docx");

const { META, PARAGRAFY, ZALACZNIKI, KLAUZULA } = require("./tresc-regulamin");

const BAZA = path.resolve(__dirname, "..");
const TUSZ = "1A1712";
const RISO = "FF5C39";
const KOBALT = "2B3FA6";
const SZARY = "6B6152";
const SERIF = "Fraunces";
const SANS = "Lato";

const obraz = (wzgledna) => fs.readFileSync(path.join(BAZA, wzgledna));

/** Odstep miedzy akapitami w twipach (1 pt = 20 twip). */
const po = (pt) => ({ after: pt * 20 });

function naglowekParagrafu(nr, tytul) {
  return [
    new Paragraph({
      spacing: { before: 320, after: 40 },
      keepNext: true,
      children: [
        new TextRun({ text: `§ ${nr}`, font: SANS, bold: true, size: 19, color: RISO,
          characterSpacing: 30 }),
      ],
    }),
    new Paragraph({
      spacing: { after: 140 },
      keepNext: true,
      children: [new TextRun({ text: tytul, font: SERIF, bold: true, size: 26, color: TUSZ })],
    }),
  ];
}

function ustep(numer, tekst) {
  return new Paragraph({
    spacing: po(5),
    indent: { left: 400, hanging: 400 },
    children: [
      new TextRun({ text: `${numer}.`, font: SANS, size: 22, color: TUSZ }),
      new TextRun({ text: "	", font: SANS, size: 22 }),
      new TextRun({ text: tekst, font: SANS, size: 22, color: TUSZ }),
    ],
    tabStops: [{ type: TabStopType.LEFT, position: 400 }],
  });
}

function punkt(litera, tekst) {
  return new Paragraph({
    spacing: po(3),
    indent: { left: 800, hanging: 340 },
    children: [
      new TextRun({ text: `${litera})`, font: SANS, size: 22, color: SZARY }),
      new TextRun({ text: "	", font: SANS, size: 22 }),
      new TextRun({ text: tekst, font: SANS, size: 22, color: TUSZ }),
    ],
    tabStops: [{ type: TabStopType.LEFT, position: 800 }],
  });
}

function cytat(tekst) {
  return new Paragraph({
    spacing: { before: 90, after: 110 },
    indent: { left: 800, right: 300 },
    border: { left: { style: BorderStyle.SINGLE, size: 20, color: RISO, space: 14 } },
    children: [
      new TextRun({ text: `„${tekst}”`, font: SANS, size: 22, color: TUSZ, italics: true }),
    ],
  });
}

const LITERY = "abcdefghijklmnopqrstuvwxyz".split("");

function zlozParagraf(p) {
  const bloki = naglowekParagrafu(p.nr, p.tytul);
  if (p.wstep) {
    bloki.push(new Paragraph({
      spacing: po(7),
      children: [new TextRun({ text: p.wstep, font: SANS, size: 22, color: TUSZ })],
    }));
  }
  const lista = p.u || [];
  lista.forEach((poz, i) => {
    const tekst = typeof poz === "string" ? poz : poz.t;
    bloki.push(ustep(i + 1, tekst));
    if (typeof poz === "object") {
      if (poz.cytat) bloki.push(cytat(poz.cytat));
      (poz.p || []).forEach((pp, j) => bloki.push(punkt(LITERY[j], pp)));
    }
  });
  if (p.tabela) bloki.push(tabelaKryteriow(p.tabela));
  (p.u2 || []).forEach((t, i) => bloki.push(ustep(lista.length + i + 1, t)));
  return bloki;
}

function komorka(tekst, opcje = {}) {
  return new TableCell({
    width: { size: opcje.szer, type: WidthType.DXA },
    shading: opcje.tlo ? { type: ShadingType.CLEAR, fill: opcje.tlo, color: "auto" } : undefined,
    margins: { top: 90, bottom: 90, left: 130, right: 130 },
    children: [new Paragraph({
      alignment: opcje.prawo ? AlignmentType.RIGHT : AlignmentType.LEFT,
      children: [new TextRun({
        text: tekst, font: SANS, size: 21,
        bold: !!opcje.pogrub,
        color: opcje.kolor || TUSZ,
      })],
    })],
  });
}

function tabelaKryteriow(t) {
  const SZER = [6100, 1300, 1300];
  const suma = SZER.reduce((a, b) => a + b, 0);
  const wiersze = [
    new TableRow({
      tableHeader: true,
      children: t.naglowki.map((h, i) =>
        komorka(h, { szer: SZER[i], tlo: TUSZ, kolor: "F2EEE4", pogrub: true, prawo: i > 0 })),
    }),
    ...t.wiersze.map((w, idx) => {
      const ostatni = idx === t.wiersze.length - 1;
      return new TableRow({
        children: w.map((c, i) => komorka(c, {
          szer: SZER[i], prawo: i > 0, pogrub: ostatni,
          tlo: ostatni ? "EDE8DC" : undefined,
        })),
      });
    }),
  ];
  return new Table({
    columnWidths: SZER,
    width: { size: suma, type: WidthType.DXA },
    rows: wiersze,
    borders: {
      top: { style: BorderStyle.SINGLE, size: 8, color: TUSZ },
      bottom: { style: BorderStyle.SINGLE, size: 8, color: TUSZ },
      left: { style: BorderStyle.SINGLE, size: 8, color: TUSZ },
      right: { style: BorderStyle.SINGLE, size: 8, color: TUSZ },
      insideHorizontal: { style: BorderStyle.SINGLE, size: 4, color: "C9C1B2" },
      insideVertical: { style: BorderStyle.SINGLE, size: 4, color: "C9C1B2" },
    },
  });
}

/* ---------- strona tytulowa ---------- */

const stronaTytulowa = [
  new Paragraph({
    spacing: { before: 900, after: 200 },
    children: [new ImageRun({
      type: "png", data: obraz("znak/os-poziomy-320.png"),
      transformation: { width: 232, height: 43 },
    })],
  }),
  new Paragraph({
    spacing: po(9),
    shading: { type: ShadingType.CLEAR, fill: RISO, color: "auto" },
    indent: { left: 90, right: 90 },
    children: [new TextRun({
      text: "REGULAMIN KONKURSU", font: SANS, bold: true, size: 17,
      color: "FFFFFF", characterSpacing: 50,
    })],
  }),
  new Paragraph({
    spacing: { before: 260, after: 60 },
    children: [new TextRun({ text: META.tytul, font: SERIF, bold: true, size: 52, color: TUSZ })],
  }),
  new Paragraph({
    spacing: po(18),
    children: [new TextRun({ text: META.podtytul, font: SERIF, size: 34, color: RISO })],
  }),
  new Paragraph({
    spacing: po(4),
    border: { top: { style: BorderStyle.SINGLE, size: 12, color: TUSZ, space: 10 } },
    children: [],
  }),
];

function meta(etykieta, wartosc) {
  return new Paragraph({
    spacing: po(3),
    tabStops: [{ type: TabStopType.LEFT, position: 2900 }],
    children: [
      new TextRun({ text: etykieta.toUpperCase(), font: SANS, bold: true, size: 17, color: SZARY, characterSpacing: 30 }),
      new TextRun({ text: "	", font: SANS, size: 22 }),
      new TextRun({ text: wartosc, font: SANS, size: 22, color: TUSZ }),
    ],
  });
}

stronaTytulowa.push(
  meta("Konkurs", META.konkurs),
  meta("Zadanie", META.zadanie),
  meta("Program", "Rządowy Program wsparcia organizacji pozarządowych Moc Małych Społeczności 2026, " + META.priorytet),
  meta("Umowa", "nr " + META.umowa + ", oferta nr " + META.wniosek),
  meta("Operator", "Fundacja Klaster Innowacji Społecznych"),
  meta("Współoferent", "Instytut Roździeńskiego"),
  meta("Wersja", META.wersja + ", " + META.data),
);

/* ---------- zalaczniki i oznaczenia ---------- */

const koniec = [
  ...naglowekParagrafu("", "Załączniki do regulaminu"),
  ...ZALACZNIKI.map((z, i) => new Paragraph({
    spacing: po(4),
    indent: { left: 400, hanging: 400 },
    tabStops: [{ type: TabStopType.LEFT, position: 400 }],
    children: [
      new TextRun({ text: `${i + 1}.`, font: SANS, size: 22, color: SZARY }),
      new TextRun({ text: "	", font: SANS, size: 22 }),
      new TextRun({ text: z, font: SANS, size: 22, color: TUSZ }),
    ],
  })),
];

const pasOznaczen = [
  new Paragraph({
    spacing: { before: 360, after: 120 },
    border: { top: { style: BorderStyle.SINGLE, size: 12, color: TUSZ, space: 14 } },
    children: [new TextRun({
      text: "ZADANIE FINANSOWANE ZE ŚRODKÓW BUDŻETU PAŃSTWA", font: SANS, bold: true,
      size: 17, color: SZARY, characterSpacing: 40,
    })],
  }),
  new Paragraph({
    spacing: po(9),
    children: [new ImageRun({
      type: "png", data: obraz("logotypy/web-mms-kolor.png"),
      transformation: { width: 420, height: 77 },
    })],
  }),
  new Paragraph({
    spacing: po(6),
    children: [new TextRun({ text: KLAUZULA + ".", font: SANS, size: 21, color: TUSZ })],
  }),
  new Paragraph({
    spacing: po(14),
    children: [new TextRun({
      text: "Konkurs „" + META.konkurs + "” prowadzony jest w ramach zadania „" + META.zadanie + "”, które realizują wspólnie Fundacja Klaster Innowacji Społecznych, lider oferty wspólnej, oraz Instytut Roździeńskiego, współoferent.",
      font: SANS, size: 21, color: SZARY,
    })],
  }),
  new Paragraph({
    spacing: po(9),
    children: [new ImageRun({
      type: "png", data: obraz("logotypy/kis-logo.png"),
      transformation: { width: 118, height: 71 },
    }), new TextRun({ text: "        ", font: SANS, size: 22 }), new ImageRun({
      type: "png", data: obraz("logotypy/ir-kolor.png"),
      transformation: { width: 85, height: 71 },
    })],
  }),
];

/* ---------- dokument ---------- */

const tresc = [];
PARAGRAFY.forEach((p) => tresc.push(...zlozParagraf(p)));

const doc = new Document({
  creator: "Fundacja Klaster Innowacji Społecznych",
  title: META.tytul + ", " + META.podtytul,
  description: "Regulamin konkursu mikrodotacji, zadanie " + META.zadanie,
  styles: { default: { document: { run: { font: SANS, size: 22, color: TUSZ } } } },
  sections: [{
    properties: {
      page: {
        margin: {
          top: convertMillimetersToTwip(30), bottom: convertMillimetersToTwip(22),
          left: convertMillimetersToTwip(24), right: convertMillimetersToTwip(22),
        },
      },
    },
    headers: {
      default: new Header({
        children: [
          new Paragraph({
            spacing: { after: 40 },
            tabStops: [{ type: TabStopType.RIGHT, position: 9070 }],
            children: [
              new ImageRun({
                type: "png",
                data: obraz("logotypy/mms-zestawienie-stopka.png"),
                transformation: { width: 208, height: 38 },
              }),
              new TextRun({ text: "	", font: SANS, size: 19 }),
              new TextRun({ text: "Odporne Śląskie 2026", font: SERIF, bold: true, size: 19, color: TUSZ }),
            ],
          }),
          new Paragraph({
            spacing: { after: 60 },
            alignment: AlignmentType.RIGHT,
            border: { bottom: { style: BorderStyle.SINGLE, size: 6, color: "C9C1B2", space: 6 } },
            children: [
              new TextRun({ text: "Regulamin konkursu na mikrodotacje", font: SANS, size: 18, color: SZARY }),
            ],
          }),
        ],
      }),
    },
    footers: {
      default: new Footer({
        children: [new Paragraph({
          spacing: { before: 60 },
          border: { top: { style: BorderStyle.SINGLE, size: 6, color: "C9C1B2", space: 8 } },
          tabStops: [{ type: TabStopType.RIGHT, position: 9070 }],
          children: [
            new TextRun({
              text: KLAUZULA + ".",
              font: SANS, size: 15, color: SZARY,
            }),
            new TextRun({ text: "	", font: SANS, size: 16 }),
            new TextRun({ text: "s. ", font: SANS, size: 16, color: SZARY }),
            new TextRun({ children: [PageNumber.CURRENT], font: SANS, size: 16, color: SZARY }),
            new TextRun({ text: " z ", font: SANS, size: 16, color: SZARY }),
            new TextRun({ children: [PageNumber.TOTAL_PAGES], font: SANS, size: 16, color: SZARY }),
          ],
        })],
      }),
    },
    children: [...stronaTytulowa, ...pasOznaczen, new Paragraph({ children: [new PageBreak()] }), ...tresc, ...koniec],
  }],
});

Packer.toBuffer(doc).then((buf) => {
  const wyjscie = path.join(__dirname, "regulamin-odporne-slaskie-2026.docx");
  fs.writeFileSync(wyjscie, buf);
  console.log("zapisano", wyjscie, Math.round(buf.length / 1024) + " KB");
});
