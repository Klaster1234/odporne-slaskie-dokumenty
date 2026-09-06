# -*- coding: utf-8 -*-
"""Poprawki po drugim audycie 6.09.2026 (wieczor). Uruchamiac raz, z katalogu zrodla."""
import io, sys

def patch(path, pairs):
    s = io.open(path, encoding="utf-8").read()
    for old, new in pairs:
        if old not in s:
            print("BRAK:", path, "|", old[:70]); sys.exit(1)
        if s.count(old) > 1:
            print("WIELE:", path, "|", old[:70]); sys.exit(1)
        s = s.replace(old, new)
    io.open(path, "w", encoding="utf-8", newline="\n").write(s)
    print("OK", path, len(pairs))

# ---------------- regulamin ----------------
patch("tresc-regulamin.js", [
    # § 1 ust. 6, nazwa instytucji z polpauza
    ('"Zadanie jest finansowane ze środków Narodowego Instytutu Wolności, Centrum Rozwoju Społeczeństwa Obywatelskiego, w ramach',
     '"Zadanie jest finansowane ze środków Narodowego Instytutu Wolności – Centrum Rozwoju Społeczeństwa Obywatelskiego w ramach'),
    # § 7 ust. 7, mechanizm puli MiSLOP
    ('"Operator prowadzi w każdym subregionie wyodrębnioną pulę dla MiŚLOP, tak aby osiągnąć minimum 69 mikrodotacji dla tej kategorii podmiotów w skali Konkursu.",',
     '"Operator prowadzi w każdym subregionie wyodrębnioną pulę dla MiŚLOP, tak aby osiągnąć minimum 69 mikrodotacji dla tej kategorii podmiotów w skali Konkursu. Jeżeli na liście rankingowej subregionu liczba wniosków MiŚLOP rekomendowanych w limicie środków jest niższa niż 18, Operator rekomenduje kolejne wnioski MiŚLOP z listy rezerwowej tego subregionu, w kolejności liczby punktów, w miejsce najniżej ocenionych wniosków innych podmiotów, aż do osiągnięcia 18 wniosków MiŚLOP.",'),
    # § 9 ust. 3, rachunek czlonka grupy
    ('"Wszystkie płatności są dokonywane bezgotówkowo, z rachunku bankowego Grantobiorcy albo organizacji patronackiej.",',
     '"Wszystkie płatności są dokonywane bezgotówkowo, z rachunku bankowego Grantobiorcy, organizacji patronackiej albo członka grupy nieformalnej wskazanego w umowie.",'),
    # § 12 ust. 1
    ('"Nabór trwa 30 dni i jest prowadzony wyłącznie w systemie konkursowym Operatora.",',
     '"Nabór trwa co najmniej 30 dni i jest prowadzony wyłącznie w systemie konkursowym Operatora.",'),
    # § 15 ust. 1, minimum liczone od kazdej karty
    ('oraz osiągnęły minimum punktowe w każdym z pięciu kryteriów.",',
     'oraz osiągnęły minimum punktowe w każdym z pięciu kryteriów w każdej ze złożonych kart oceny.",'),
    # § 15 ust. 3, uzasadnienia
    ('"Ekspert uzasadnia ocenę w każdym kryterium. Uzasadnienie liczy nie mniej niż 500 znaków dla całej karty.",',
     '"Ekspert uzasadnia ocenę w każdym kryterium, nie mniej niż 100 znaków na kryterium i nie mniej niż 500 znaków dla całej karty.",'),
    # § 18 ust. 7, reprezentacja grupy
    ('na który Operator przekazuje mikrodotację. Osoby tworzące grupę odpowiadają za wydatkowanie i rozliczenie mikrodotacji solidarnie.",',
     'na który Operator przekazuje mikrodotację. Umowę w imieniu grupy podpisują osoby wskazane we wniosku jako uprawnione do jej reprezentacji. Osoby tworzące grupę odpowiadają za wydatkowanie i rozliczenie mikrodotacji solidarnie.",'),
    # § 26 ust. 6, wejscie w zycie
    ('"Regulamin wchodzi w życie z dniem ogłoszenia Konkursu.",',
     '"Regulamin wchodzi w życie z dniem publikacji na stronie Konkursu, 6 września 2026, i obowiązuje od pierwszego dnia naboru.",'),
])

# ---------------- wzory (wniosek, karty, umowa, sprawozdanie) ----------------
patch("buduj-wzory.js", [
    # wniosek, czesc A: reprezentacja grupy, tabela grupy jak w kreatorze, bez osobnego bloku patrona
    ('  b.push(U.akapit("Osoby uprawnione do reprezentacji podmiotu", { pogrub: true, odstep: 3 }));',
     '  b.push(U.akapit("Osoby uprawnione do reprezentacji podmiotu", { pogrub: true, odstep: 3 }));\n  b.push(U.podpowiedz("Grupa nieformalna działająca samodzielnie wpisuje tu osoby, które podpiszą umowę w jej imieniu."));'),
    ('  b.push(U.podpowiedz("Poniższą tabelę wypełniają wyłącznie grupy nieformalne. Wymagane są co najmniej trzy osoby."));\n  b.push(U.tabelaPusta([3200, 3000, 2870], ["Imię i nazwisko", "Telefon", "Adres e-mail"], 3));\n  b.push(U.podpowiedz("Poniższe pola wypełnia grupa nieformalna działająca przez organizację patronacką."));\n  b.push(U.polaKrotkie([\n    ["Nazwa organizacji patronackiej", ""], ["KRS i NIP", ""], ["Adres siedziby", ""],\n    ["Osoba do kontaktu", ""],',
     '  b.push(U.podpowiedz("Poniższą tabelę wypełniają grupy nieformalne, także działające przez organizację patronacką. Wymagane są co najmniej trzy pełnoletnie osoby zamieszkałe w województwie śląskim."));\n  b.push(U.tabelaPusta([3200, 3000, 2870], ["Imię i nazwisko", "Rola w grupie", "Uwagi"], 3));\n  b.push(U.podpowiedz("Grupa nieformalna działająca przez organizację patronacką: wnioskodawcą jest organizacja patronacka, jej dane wpisuje się wyżej jako dane podmiotu."));\n  b.push(U.polaKrotkie([\n    ["Nazwa grupy nieformalnej", "jeżeli grupa działa przez organizację patronacką"],'),
    # wniosek, czesc E: terminy i miejsce dzialania
    ('  b.push(U.podpowiedz("Od jednego do dziesięciu działań. Przy każdym podajcie nazwę, opis i liczbę uczestników."));\n  b.push(U.tabelaPusta([600, 5670, 2800],\n    ["Lp.", "Nazwa i opis działania", "Liczba uczestników"], 6, 240));',
     '  b.push(U.podpowiedz("Od jednego do dziesięciu działań. Przy każdym podajcie nazwę, opis, termin od i do, miejsce oraz liczbę uczestników. Terminy działań są harmonogramem mikroprojektu."));\n  b.push(U.tabelaPusta([600, 4070, 1600, 1500, 1300],\n    ["Lp.", "Nazwa i opis działania", "Termin od i do", "Miejsce", "Liczba uczestników"], 6, 240));'),
    # wniosek, czesc J: oswiadczenia jak w kreatorze
    ('    "Zobowiązujemy się do zapewnienia apartyjnego charakteru wydarzeń w mikroprojekcie.",\n  ].forEach((o) => b.push(U.kratka(o)));',
     '    "Zobowiązujemy się do zapewnienia apartyjnego charakteru wydarzeń w mikroprojekcie.",\n    "Podmiot nie jest wpisany do rejestru podmiotów wykluczonych z możliwości otrzymania środków publicznych, nie zalega z należnościami publicznoprawnymi i nie toczy się wobec niego postępowanie egzekucyjne dotyczące zobowiązań publicznoprawnych.",\n    "Podmiot spełnia warunki formalne Rządowego Programu wsparcia organizacji pozarządowych Moc Małych Społeczności.",\n    "Wśród osób reprezentujących wnioskodawcę albo tworzących grupę nieformalną nie ma członków komisji oceniającej ani osób zatrudnionych u Operatora lub współoferenta, a osoby te nie pełnią funkcji w organach wnioskodawcy.",\n    "Składamy w tym naborze tylko jeden wniosek.",\n  ].forEach((o) => b.push(U.kratka(o)));'),
    ('  b.push(U.podpowiedz("Poniższe oświadczenie składa się tylko wtedy, gdy w działaniach uczestniczą osoby małoletnie."));\n  b.push(U.kratka("Wdrożymy standardy ochrony małoletnich i zweryfikujemy osoby pracujące z małoletnimi w Rejestrze Sprawców Przestępstw na Tle Seksualnym."));',
     '  b.push(U.podpowiedz("Poniższe oświadczenia składa się tylko wtedy, gdy w działaniach uczestniczą osoby małoletnie."));\n  b.push(U.kratka("Przed udziałem osób małoletnich zbierzemy pisemne zgody rodziców lub opiekunów prawnych."));\n  b.push(U.kratka("Wdrożymy standardy ochrony małoletnich i zweryfikujemy osoby pracujące z małoletnimi w Rejestrze Sprawców Przestępstw na Tle Seksualnym."));'),
    ('  b.push(U.kratka("Przyjmujemy odpowiedzialność za wydatkowanie i rozliczenie mikrodotacji przyznanej grupie nieformalnej."));\n\n  b.push(kreska());\n  b.push(U.miejsceNaPodpis(["Data i podpis osoby uprawnionej", "Data i podpis drugiej osoby uprawnionej"]));',
     '  b.push(U.kratka("Grupa nieformalna i organizacja patronacka uzgodniły złożenie wniosku. Organizacja jest stroną umowy i przyjmuje odpowiedzialność za wydatkowanie i rozliczenie mikrodotacji."));\n\n  b.push(kreska());\n  b.push(U.podpowiedz("Wniosek składa się wyłącznie w systemie konkursowym. Złożenie w systemie zastępuje podpis; poniższe pola służą tylko wersji roboczej na papierze."));\n  b.push(U.miejsceNaPodpis(["Data i podpis osoby uprawnionej", "Data i podpis drugiej osoby uprawnionej"]));'),
    # karta formalna
    ('uwaga: "Kartę wypełnia jeden ekspert. Odpowiedź NIE w którymkolwiek wierszu oznacza wezwanie do jednokrotnego uzupełnienia w terminie 3 dni roboczych albo pozostawienie wniosku bez rozpatrzenia, zgodnie z § 13 regulaminu.",',
     'uwaga: "Kartę wypełnia jeden ekspert. Odpowiedź NIE w wierszach 1 do 18 oznacza wezwanie do jednokrotnego uzupełnienia w terminie 3 dni roboczych albo pozostawienie wniosku bez rozpatrzenia, zgodnie z § 13 regulaminu. Wiersz 19 ma charakter informacyjny.",'),
    ('    ["Numer wniosku", ""], ["Nazwa wnioskodawcy", ""], ["Subregion", ""],\n    ["Typ podmiotu", "MiŚLOP, grupa nieformalna, organizacja patronacka"],',
     '    ["Numer wniosku", ""], ["Nazwa wnioskodawcy", ""], ["Subregion", ""],\n    ["Typ podmiotu", "MiŚLOP albo grupa nieformalna albo organizacja patronacka"],'),
    ('rachunek uzupełnia się przed podpisaniem umowy, § 18 ust. 7)",',
     'rachunek uzupełnia się przed podpisaniem umowy, § 18 ust. 6 i 7)",'),
    ('  b.push(U.miejsceNaPodpis(["Data i podpis eksperta", "Data i podpis koordynatora oceny"]));',
     '  b.push(U.miejsceNaPodpis(["Data i podpis eksperta"]));'),
    # karta merytoryczna: uzasadnienia jak w systemie
    ('    b.push(...U.pole("Uzasadnienie oceny w tym kryterium", 3));',
     '    b.push(...U.pole("Uzasadnienie oceny w tym kryterium", 3, "Co najmniej 100 znaków. Wnioskodawca ma prawo wglądu w tę treść."));'),
    ('  b.push(...U.pole("Uzasadnienie łączne", 6,\n    "Nie mniej niż 500 znaków dla całej karty. Wnioskodawca ma prawo wglądu w tę treść, więc pisz tak, żeby dało się z niej wyciągnąć wnioski na przyszłość."));\n  b.push(...U.pole("Zalecenia dla wnioskodawcy", 3, "Pole nieobowiązkowe."));',
     '  b.push(U.akapit("Uzasadnienia w pięciu kryteriach liczą łącznie nie mniej niż 500 znaków. Wnioskodawca ma prawo wglądu w tę treść, więc pisz tak, żeby dało się z niej wyciągnąć wnioski na przyszłość.", { rozmiar: 20, kolor: SZARY, odstep: 8 }));\n  b.push(...U.pole("Uwagi dodatkowe", 3, "Pole nieobowiązkowe, na przykład zalecenia dla wnioskodawcy."));'),
    # umowa: komparycja dla grupy
    ('  b.push(U.akapit("....................................................... z siedzibą w ......................................., numer w rejestrze ......................., NIP ......................., reprezentowanym przez ......................................., zwanym dalej Grantobiorcą,", { odstep: 5 }));',
     '  b.push(U.akapit("....................................................... z siedzibą w ......................................., numer w rejestrze ......................., NIP ......................., reprezentowanym przez ......................................., zwanym dalej Grantobiorcą,", { odstep: 5 }));\n  b.push(U.akapit("albo, gdy Grantobiorcą jest grupa nieformalna działająca samodzielnie: grupą nieformalną ......................................., którą tworzą: ......................................., ......................................., ......................................., zamieszkali w województwie śląskim, reprezentowaną przez ......................................., zwaną dalej Grantobiorcą,", { odstep: 5 }));'),
    # umowa § 1: oswiadczenia grantobiorcy
    ('        "Grantobiorca oświadcza, że zapoznał się z regulaminem konkursu i realizuje Mikroprojekt zgodnie z nim.",',
     '        "Grantobiorca oświadcza, że zapoznał się z regulaminem konkursu i realizuje Mikroprojekt zgodnie z nim.",\n        "Grantobiorca oświadcza, że dane podane we wniosku są zgodne ze stanem faktycznym i prawnym, że nie jest wpisany do rejestru podmiotów wykluczonych z możliwości otrzymania środków publicznych, nie zalega z należnościami publicznoprawnymi i nie toczy się wobec niego postępowanie egzekucyjne dotyczące zobowiązań publicznoprawnych. Oświadczenia te stanowią zabezpieczenie umowy w rozumieniu § 18 ust. 3 regulaminu.",'),
    # umowa § 3 ust. 3: termin realizacji
    ('        "Zmiana terminu realizacji wymaga uprzedniej zgody Operatora wyrażonej w systemie konkursowym i nie może wykraczać poza termin zakończenia zadania publicznego.",',
     '        "Zmiana terminów działań w obrębie okresu, o którym mowa w ustępie 1, wymaga uprzedniej zgody Operatora wyrażonej w systemie konkursowym. Okres realizacji nie może wykraczać poza termin zakończenia zadania publicznego.",'),
    # umowa § 4: zmiana zakresu, zbycie, oplaty
    ('        "Przesunięcia między pozycjami budżetu do 20 procent wartości pozycji nie wymagają zgody Operatora. Przesunięcia większe wymagają zgody wyrażonej przed dokonaniem wydatku.",',
     '        "Przesunięcia między pozycjami budżetu do 20 procent wartości pozycji nie wymagają zgody Operatora. Przesunięcia większe oraz zmiana zakresu działań wymagają zgody Operatora wyrażonej w systemie konkursowym przed dokonaniem wydatku.",'),
    ('        "Wszystkie płatności są dokonywane bezgotówkowo.",',
     '        "Wszystkie płatności są dokonywane bezgotówkowo.",\n        "Rzeczy zakupione ze środków mikrodotacji Grantobiorca nie zbywa przez 5 lat od dnia zakupu. Zgodę na wcześniejsze zbycie może wyrazić Operator, pod warunkiem przeznaczenia uzyskanych środków na cele statutowe Grantobiorcy.",\n        "Grantobiorca nie pobiera od odbiorców Mikroprojektu żadnych świadczeń pieniężnych. Udział w działaniach jest bezpłatny.",\n        "Grantobiorca opisuje dowody księgowe Mikroprojektu w sposób trwały, adnotacją o treści określonej w § 23 ust. 7 regulaminu.",'),
    # umowa: ustawa z tytulem
    ('wdraża standardy ochrony małoletnich zgodnie z ustawą z dnia 13 maja 2016 r. oraz weryfikuje',
     'wdraża standardy ochrony małoletnich zgodnie z ustawą z dnia 13 maja 2016 r. o przeciwdziałaniu zagrożeniom przestępczością na tle seksualnym i ochronie małoletnich oraz weryfikuje'),
    # umowa § 9: numer zalacznika
    ('na wzorze stanowiącym załącznik nr 3 do umowy.",',
     'na wzorze stanowiącym załącznik nr 4 do umowy.",'),
    # sprawozdanie: wskaznik swiadomosci, zalaczniki, maloletni
    ('    ["Liczba osób objętych ankietą na wejściu i na wyjściu", "dotyczy MiŚLOP, minimum 2 osoby"],\n  ]));',
     '    ["Liczba osób objętych ankietą na wejściu i na wyjściu", "dotyczy MiŚLOP, minimum 2 osoby"],\n    ["Liczba osób, u których ankieta wykazała wzrost świadomości", "dotyczy MiŚLOP, z tabeli zbiorczej załącznika 9, minimum 2 osoby"],\n    ["Czy w działaniach uczestniczyły osoby małoletnie", "tak albo nie"],\n  ]));'),
    ('  b.push(U.kratka("Dokumentacja zdjęciowa, co najmniej pięć zdjęć"));',
     '  b.push(U.kratka("Dokumentacja zdjęciowa działań"));'),
    ('  b.push(U.kratka("Ankiety na wejściu i na wyjściu, jeżeli dotyczy"));\n  b.push(U.kratka("Dokumentacja weryfikacji w Rejestrze Sprawców Przestępstw na Tle Seksualnym, jeżeli dotyczy"));',
     '  b.push(U.kratka("Ankiety na wejściu i na wyjściu wraz z tabelą zbiorczą z załącznika 9, dotyczy MiŚLOP"));\n  b.push(U.kratka("Podpisane standardy ochrony małoletnich oraz dokumentacja weryfikacji w Rejestrze Sprawców Przestępstw na Tle Seksualnym, jeżeli w działaniach uczestniczyły osoby małoletnie"));'),
    ('    "Sprzęt, procedura, przeszkolone osoby, nowe kontakty. To pole weryfikujemy przy ocenie wskaźnika trwałości."));',
     '    "Sprzęt, procedura, przeszkolone osoby, nowe kontakty. To pole porównujemy z częścią G wniosku, trwałość rezultatów."));'),
])

# ---------------- zalaczniki 7 i 8 ----------------
patch("buduj-zalaczniki.js", [
    # zal. 7 czesc D: zgoda na dane o zdrowiu (art. 9)
    ('  b.push(U.polaKrotkie([["Telefon do rodzica albo opiekuna", "na wypadek nagłej sytuacji"], ["Istotne informacje o zdrowiu dziecka", "alergie, leki, dobrowolnie"]]));',
     '  b.push(U.polaKrotkie([["Telefon do rodzica albo opiekuna", "na wypadek nagłej sytuacji"], ["Istotne informacje o zdrowiu dziecka", "alergie, leki, dobrowolnie"]]));\n  b.push(U.akapit("Informacje o zdrowiu dziecka podaję dobrowolnie i wyrażam zgodę na ich przetwarzanie przez grantobiorcę wyłącznie w celu zapewnienia dziecku bezpieczeństwa podczas działań (art. 9 ust. 2 lit. a RODO). Zgodę mogę wycofać w każdej chwili.", { rozmiar: 21 }));\n  b.push(U.kratka("Wyrażam zgodę na przetwarzanie informacji o zdrowiu dziecka w podanym zakresie"));'),
    # zal. 8: sankcja i plansza zgodnie z regulaminem
    ('  b.push(U.akapit("Brak oznaczenia jest naruszeniem umowy o powierzenie mikrodotacji i może skutkować uznaniem kosztu materiału za niekwalifikowalny.", { kolor: U.SZARY, rozmiar: 20 }));',
     '  b.push(U.akapit("Wykonanie obowiązków informacyjnych sprawdzamy podczas monitoringu i przy rozliczeniu (§ 20 ust. 7 regulaminu).", { kolor: U.SZARY, rozmiar: 20 }));'),
    ('    "W centralnym miejscu wydarzenia, na przykład przy stole prowadzącego, na scenie albo przy wejściu do sali, stoi pełnokolorowe zestawienie znaków w formie planszy, roll-upu albo wydruku formatu co najmniej A3.",',
     '    "W widocznym miejscu wydarzenia, na przykład przy stole prowadzącego albo przy wejściu do sali, zalecamy postawić pełnokolorowe zestawienie znaków w formie planszy, roll-upu albo wydruku, najlepiej formatu A3. Gotowy plik do druku jest w paczce.",'),
])

print("GOTOWE")
