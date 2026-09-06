# -*- coding: utf-8 -*-
"""Wersja 1.6, 6 wrzesnia 2026: zmiany z audytu przedstartowego. Jednorazowy skrypt, zostaje jako zapis zmian."""
import sys

def patch(path, pairs):
    s = open(path, encoding='utf-8').read()
    for old, new in pairs:
        if old not in s:
            print('BRAK w', path, ':', old[:80]); sys.exit(1)
        s = s.replace(old, new, 1)
    open(path, 'w', encoding='utf-8').write(s)
    print('ok', path, len(pairs))

patch('tresc-regulamin.js', [
 ('wersja: "wersja 1.5",\n  data: "7 września 2026",', 'wersja: "wersja 1.6",\n  data: "6 września 2026",'),
 ('"Warunkiem udziału jest siedziba albo miejsce zamieszkania w województwie śląskim, w miejscowości liczącej nie więcej niż 100 000 mieszkańców.",',
  '"Warunkiem udziału jest siedziba albo miejsce zamieszkania w województwie śląskim, w miejscowości liczącej nie więcej niż 100 000 mieszkańców. Przy grupie nieformalnej działającej samodzielnie liczy się miejsce zamieszkania osoby do kontaktu wskazanej we wniosku.",'),
 ('t: "Przyporządkowanie do subregionu wynika z siedziby wnioskodawcy:",',
  't: "Przyporządkowanie do subregionu wynika z siedziby wnioskodawcy, a przy grupie nieformalnej działającej samodzielnie z miejsca zamieszkania osoby do kontaktu wskazanej we wniosku:",'),
 ('indywidualnego mentoringu oraz kontaktu mailowego z biurem Operatora.",',
  'indywidualnego mentoringu oraz kontaktu mailowego z biurem Operatora pod adresem mms@klaster.org.pl.",'),
 ('50 punktów, zgodnych z ofertą realizacji zadania.",', '50 punktów, opracowanych na podstawie oferty realizacji zadania.",'),
 ('"Ekspert uzasadnia ocenę w każdym kryterium. Uzasadnienie liczy nie mniej niż 500 znaków dla całej karty.",\n    ],',
  '"Ekspert uzasadnia ocenę w każdym kryterium. Uzasadnienie liczy nie mniej niż 500 znaków dla całej karty.",\n      "Ekspert może rekomendować wniosek warunkowo, z korektą budżetu. Korekta dotyczy wyłącznie pozycji niekwalifikowalnych z § 10 albo pozycji wskazanych przez eksperta jako nieuzasadnione. Ekspert wskazuje te pozycje i ich wartość w karcie oceny, a Operator obniża kwotę mikrodotacji o ich wartość przed zawarciem umowy. Korekta nie zmienia punktacji ani miejsca na liście rankingowej.",\n    ],'),
 ('"Wnioski mieszczące się w limicie środków subregionu otrzymują rekomendację do dofinansowania. Pozostałe wnioski rekomendowane trafiają na listę rezerwową tego samego subregionu.",',
  '"Wnioski mieszczące się w limicie środków subregionu otrzymują rekomendację do dofinansowania. Pozostałe wnioski rekomendowane trafiają na listę rezerwową tego samego subregionu.",\n      "Jeżeli pozostała kwota limitu subregionu jest niższa od wnioskowanej, Operator proponuje wnioskodawcy mikrodotację w wysokości pozostałej kwoty, nie niższej niż 1 000 zł. Brak zgody w terminie 3 dni roboczych oznacza przejście do kolejnego wniosku z listy.",'),
 ('"Klauzula informacyjna o przetwarzaniu danych osobowych",\n  "Pakiet oznaczeń', '"Klauzule informacyjne RODO i wzory zgód",\n  "Pakiet oznaczeń'),
])

patch('uklad.js', [
 ('(m.wersja || "wersja 1.5") + ", " + (m.data || "7 września 2026")', '(m.wersja || "wersja 1.6") + ", " + (m.data || "6 września 2026")'),
])

patch('buduj-wzory.js', [
 ('["Miejscowość siedziby", ""],', '["Miejscowość siedziby albo zamieszkania", "grupa nieformalna działająca samodzielnie: miejscowość osoby do kontaktu"],'),
 ('"Podmiot nie zalega z należnościami publicznoprawnymi.",\n    "Podmiot składa',
  '"Podmiot nie zalega z należnościami publicznoprawnymi.",\n    "Wobec podmiotu nie toczy się postępowanie egzekucyjne dotyczące zobowiązań publicznoprawnych.",\n    "Podmiot spełnia warunki formalne Rządowego Programu wsparcia organizacji pozarządowych Moc Małych Społeczności.",\n    "Podmiot składa'),
 ('"Siedziba albo miejsce zamieszkania wnioskodawcy jest w województwie śląskim, w miejscowości liczącej nie więcej niż 100 000 mieszkańców.",',
  '"Siedziba albo miejsce zamieszkania wnioskodawcy jest w województwie śląskim, w miejscowości liczącej nie więcej niż 100 000 mieszkańców (przy grupie nieformalnej działającej samodzielnie: miejsce zamieszkania osoby do kontaktu).",'),
 ('"Siedziba w województwie śląskim",\n    "Miejscowość siedziby liczy nie więcej niż 100 000 mieszkańców",',
  '"Siedziba albo miejsce zamieszkania (grupa nieformalna: osoby do kontaktu) w województwie śląskim",\n    "Miejscowość siedziby albo zamieszkania liczy nie więcej niż 100 000 mieszkańców",'),
 ('"Wskazano numer rachunku bankowego",', '"Wskazano numer rachunku bankowego (brak nie jest brakiem formalnym, rachunek uzupełnia się przed podpisaniem umowy, § 18 ust. 7)",'),
 ('Minimum wymagane do rekomendacji: ${k.min} punktów.', 'Minimum wymagane do rekomendacji: ${k.min} ${k.min === 1 ? "punkt" : k.min >= 2 && k.min <= 4 ? "punkty" : "punktów"}.'),
 ('b.push(U.kratka("Rekomendowany warunkowo, z korektą budżetu"));',
  'b.push(U.kratka("Rekomendowany warunkowo, z korektą budżetu"));\n  b.push(U.akapit("Korekta budżetu dotyczy wyłącznie pozycji niekwalifikowalnych z § 10 regulaminu albo pozycji nieuzasadnionych. Ekspert wskazuje te pozycje i ich wartość, a Operator obniża kwotę mikrodotacji o ich wartość przed zawarciem umowy. Korekta nie zmienia punktacji ani miejsca na liście rankingowej.", { rozmiar: 20, kolor: SZARY, odstep: 5 }));\n  b.push(...U.pole("Pozycje budżetu do korekty, ich wartość i uzasadnienie", 4, "Wypełnij tylko przy rekomendacji warunkowej."));'),
 ('"Mikroprojekt jest realizowany w ramach zadania publicznego „Wielka Moc Małych Społeczności, Odporne Śląskie 2026”, finansowanego ze środków Narodowego Instytutu Wolności, Centrum Rozwoju Społeczeństwa Obywatelskiego, w ramach',
  '"Mikroprojekt jest realizowany w ramach zadania publicznego „Wielka Moc Małych Społeczności – Odporne Śląskie 2026”, finansowanego ze środków Narodowego Instytutu Wolności – Centrum Rozwoju Społeczeństwa Obywatelskiego, w ramach'),
 ('"Grantobiorca oświadcza, że zapoznał się z regulaminem konkursu i realizuje Mikroprojekt zgodnie z nim.",',
  '"Grantobiorca oświadcza, że zapoznał się z regulaminem konkursu i realizuje Mikroprojekt zgodnie z nim.",\n        "Wskaźniki rezultatu Mikroprojektu oraz harmonogram działań określa wniosek, o którym mowa w ustępie 1. Osiągnięcie wskaźników jest podstawą rozliczenia mikrodotacji.",'),
 ('"Grantobiorca przechowuje dokumentację Mikroprojektu przez 5 lat od zakończenia roku, w którym rozliczono mikrodotację.",',
  '"Grantobiorca przechowuje dokumentację Mikroprojektu, w tym dokumentację finansowo-księgową, przez okres 5 lat, licząc od początku roku następującego po roku, w którym realizował Mikroprojekt.",'),
 ('"Grantobiorca umożliwia przeprowadzenie wizyty i udostępnia dokumentację Mikroprojektu na żądanie Operatora oraz Narodowego Instytutu Wolności.",',
  '"Grantobiorca poddaje się kontroli prowadzonej przez Operatora, przez Narodowy Instytut Wolności oraz przez Kancelarię Prezesa Rady Ministrów, umożliwia wizytę w miejscu realizacji Mikroprojektu i udostępnia dokumentację na żądanie kontrolującego w wyznaczonym terminie.",'),
 ('["Wniosek o mikrodotację", "Budżet Mikroprojektu", "Wzór sprawozdania końcowego",\n    "Pakiet oznaczeń wraz z instrukcją stosowania", "Klauzula informacyjna o przetwarzaniu danych osobowych"]',
  '["Wniosek o mikrodotację wraz ze wskaźnikami rezultatu", "Budżet Mikroprojektu", "Harmonogram działań Mikroprojektu", "Wzór sprawozdania końcowego",\n    "Pakiet oznaczeń wraz z instrukcją stosowania", "Klauzule informacyjne RODO i wzory zgód"]'),
 ('opisane zgodnie z wymogami umowy i są przechowywane w siedzibie Grantobiorcy.",', 'opisane zgodnie z wymogami umowy i są przechowywane u Grantobiorcy.",'),
 ('"Dokumentację mikroprojektu przechowamy przez 5 lat od zakończenia roku, w którym rozliczono mikrodotację.",\n    "Wyrażamy zgodę na kontrolę prowadzoną przez Operatora oraz Narodowy Instytut Wolności.",',
  '"Dokumentację mikroprojektu przechowamy przez 5 lat, licząc od początku roku następującego po roku, w którym realizowaliśmy mikroprojekt.",\n    "Wyrażamy zgodę na kontrolę prowadzoną przez Operatora, Narodowy Instytut Wolności oraz Kancelarię Prezesa Rady Ministrów.",'),
])

patch('buduj-zalaczniki.js', [
 ('przez 5 lat, licząc od początku roku następującego po zakończeniu mikroprojektu.",', 'przez 5 lat, licząc od początku roku następującego po roku, w którym realizowano mikroprojekt.",'),
 ('Dane grantobiorców przechowujemy przez 5 lat, licząc od początku roku następującego po roku zakończenia zadania.', 'Dane grantobiorców przechowujemy przez 5 lat, licząc od początku roku następującego po roku, w którym realizowali mikroprojekt.'),
 ('W przypadku grupy nieformalnej administratorem jest organizacja patronacka [NAZWA], a grupa działa w jej imieniu.",',
  'W przypadku grupy nieformalnej działającej przez organizację patronacką administratorem jest ta organizacja [NAZWA], a grupa działa w jej imieniu. W przypadku grupy nieformalnej działającej samodzielnie administratorem jest osoba do kontaktu wskazana we wniosku [IMIĘ I NAZWISKO, KONTAKT], działająca w imieniu grupy.",'),
 ('"Dane przechowujemy przez 5 lat, licząc od początku roku następującego po roku zakończenia mikroprojektu, zgodnie z obowiązkiem przechowywania dokumentacji.",', '"Dane przechowujemy przez 5 lat, licząc od początku roku następującego po roku, w którym realizowano mikroprojekt, zgodnie z obowiązkiem przechowywania dokumentacji.",'),
 ('b.push(U.cytat("Mikroprojekt [TYTUŁ] realizowany w ramach konkursu Moc Małych Społeczności – Śląskie, zadanie publiczne Wielka Moc Małych Społeczności – Odporne Śląskie 2026"));',
  'b.push(U.cytat("Mikroprojekt [TYTUŁ] realizowany w ramach konkursu Moc Małych Społeczności – Śląskie, zadanie publiczne Wielka Moc Małych Społeczności – Odporne Śląskie 2026"));\n  b.push(U.akapit("Na własnej stronie internetowej albo w profilu w mediach społecznościowych, jeżeli je prowadzisz, publikujesz pięć elementów z § 20 ust. 4 regulaminu: informację, że mikroprojekt jest finansowany ze środków budżetu państwa, nazwę Programu, nazwę zadania, wartość dofinansowania (kwotę mikrodotacji) oraz krótki opis mikroprojektu. Informacja zostaje opublikowana przez 90 dni od zakończenia mikroprojektu."));'),
 ('naklejki na sprzęcie zostają przez 3 lata od zakończenia zadania."', 'naklejki na sprzęcie zostają tak długo, jak sprzęt jest w użyciu, a co najmniej przez 5 lat od dnia zakupu, przez które nie wolno go zbyć zgodnie z § 19 ust. 9 regulaminu."'),
 ('zgodnie z § 19 ust. 2 regulaminu; grupy nieformalne', 'zgodnie z § 19 ust. 3 regulaminu; grupy nieformalne'),
])
print('PATCH OK')
