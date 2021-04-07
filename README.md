### Instalacja & Uruchomienie serwera

Aby zainstalować biblioteki:

```
npm install
```

Aby uruchomić aplikacje lokalnie ( 127.0.0.1:8080 ):

```
npm run dev
```

Wygenerowane pliki aplikacji dostępne są pod /dist/
Po tym aplikacja powinna być dostępna pod: [http://127.0.0.1:8080](http://127.0.0.1:8080)

### Budowanie aplikacji (bez uruchamiania)

Dobrze jest usunąć wszystko z /dist/

```
npm run build
```

Wygenerowane pliki aplikacji dostępne są pod /dist/

### Generowanie plików w formacie MPEG-DASH

MPEG-DASH potrzebuje trzech rzeczy żeby działać:
- plik manifestu
- pliki (segmenty) video
- pliki (segmenty) audio

Plik manifestu jest w formacie XML i określa segmenty audio oraz video. Segmenty video mogą instnieć dla różnych jakości, ale ścieżka audio może być tylko jedna.

Aby łatwo konwertować instniejące pliki video do formatu MPEG-DASH stworzony został skrypt batch `convert.bat` używający
narzędzi `x264` oraz `MP4Box`. (muszą być one dostępne poprzez wierz poleceń, czyli ich pliki wykonywalne muszą być w zmiennej środowiskowej PATH)

Linki:
- [Instalki x264](https://artifacts.videolan.org/x264/release-win64/)
- [Instalki MP4Box](https://www.videohelp.com/software/MP4Box)
- [Link do pliku convert.bat wraz z przykładowymi plikami video](https://drive.google.com/drive/folders/1e-TAymXZ5P2-HLOZ3diCdyiywbVxXBgp?usp=sharing)

Zakładamy poniższy układ plików i folderów:

```
.
+-- data
|   +-- 144p.mp4
|   +-- 240p.mp4
|   +-- 360p.mp4
|   +-- 480p.mp4
|   +-- 720p.mp4
|   +-- 1080p.mp4
+-- convert.bat
```

Po uruchomieniu skryptu zostanie wygenerowany plik manifestu wraz z segmentami.
Finalny układ plików:

```
.
+-- data
+-- out_144p_300k
+-- out_240p_400k
+-- out_360p_1200k
+-- out_480p_1500k
+-- out_720p_2750k
+-- out_1080p_6000k
+-- audio_segments
+-- manifest.mpd
+-- convert.bat
```

out_\*_\* to foldery z segmentami video. audio_segments to folder z segmentami audio.

### Jak to uruchomić aby można było testować adaptacyjny streaming ?

Żeby uniezaleznić testy od sieci należy uruchomić wszystko lokalnie:

1. Trzeba wygenerować pliki z "Generowanie plików w formacie MPEG-DASH" oraz "Budowanie aplikacji (bez uruchamiania)"
2. Trzeba skopiować pliki z /dist/ oraz wszystkie foldery out_\*, audio_segments i manifest jednego folderu

Np. folder `webapp` a w nim:
```
+-- App.81e103fe.css.map
+-- App.92ba1062.js
+-- App.92ba1062.js.map
+-- audio_segments
+-- index.html
+-- manifest.mpd
+-- out_1080p_6000k
+-- out_144p_300k
+-- out_240p_400k
+-- out_360p_1200k
+-- out_480p_1500k
+-- out_720p_2750k
```

i teraz w tym folderze trzeba uruchomić serwer http lokalny np. poprzez xammp'a (wtedy wszystko trzeba skopiować do htdocs) albo jak ma się pythona w wersji 3
to wystarczy wejść wierszem poleceń w ten folder ze wszystkim i wpisać:

```
python -m http.server --bind 127.0.0.1 8080
```

W każdym razie folder w którym jest bezpośrednio index.html ma byc tzw. webroot'em ("web root is simply the physical directory on the server OS that your HTTP server is treating as root (/) for the domain.")

### Demo

link: [http://rolzwy7.usermd.net/](http://rolzwy7.usermd.net/)

