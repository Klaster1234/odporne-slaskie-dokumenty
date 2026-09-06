# Dokumenty konkursowe Moc Malych Spolecznosci - Slaskie

Dokumenty konkursu regrantingowego prowadzonego w ramach zadania publicznego
"Wielka Moc Malych Spolecznosci - Odporne Slaskie 2026", umowa nr 12/2/MMS/2026.

Operator: Fundacja Klaster Innowacji Spolecznych (lider oferty wspolnej)
Wspoloferent: Instytut Rozdzienskiego

Wersja 1.6, 6 wrzesnia 2026.

## Co tu jest

- PDF-y w katalogu glownym to wersja obowiazujaca, ta sama, ktora serwuje mms.klaster.org.pl/dokumenty.
- `zrodla/` to sklad: tresc regulaminu (`tresc-regulamin.js`), uklad (`uklad.js`) i trzy skrypty docx-js
  (`buduj-regulamin.js`, `buduj-wzory.js`, `buduj-zalaczniki.js`). Pliki `.docx` w `zrodla/` to wynik posredni.
- `logotypy/` i `znak/` to grafiki wstawiane do dokumentow.
- `oznaczenia-mms-slaskie.zip` to paczka znakow dla grantobiorcow (zalacznik 8).

## Jak przebudowac

```
cd zrodla
npm install
node buduj-regulamin.js && node buduj-wzory.js && node buduj-zalaczniki.js
"C:\Program Files\LibreOffice\program\soffice.exe" --headless --convert-to pdf --outdir .. *.docx
```

Fonty Lato i Fraunces musza byc zainstalowane w systemie, inaczej LibreOffice podmieni krój.
Nie eksportuj PDF z Worda, psuje uklad.

Kazda zmiana tresci: najpierw tu (zrodla, docx, PDF, commit), potem podmiana PDF-ow na stronie
i przegenerowanie korpusu asystenta (`scripts/korpus-regulaminu.py` w projekcie Lovable).

Sfinansowano ze srodkow Narodowego Instytutu Wolnosci - Centrum Rozwoju Spoleczenstwa
Obywatelskiego w ramach Rzadowego Programu wsparcia organizacji pozarzadowych
Moc Malych Spolecznosci.
