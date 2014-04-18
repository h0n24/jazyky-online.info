# Jazyky online, redesign 2014

pracovní verze pro redesign stránky [jazyky-online.info](http://www.jazyky-online.info/)

## Instalace

Postup instalace:

### 1) Github

Stáhnout [Github for Windows](https://windows.github.com/). A naklonovat do něj tento projekt - stačí kliknout na tlačítko vpravo dole, nebo ručně vložit adresu

```
https://github.com/h0n24/jazyky-online.info
```

### 2) Prepros

Stáhnout [Prepros](http://alphapixels.com/prepros/). Přidat nový projekt (= celá složka, kterou stáhne klient githubu).

#### Pozor!
Pro správné generování souborů je třeba ručně nastavit cestu:
* souboru `haml/script.js` → `html/min/script.min.js`
* souboru `haml/style.sass` → `html/min/style.min.css`

[![prepros nastavení](http://dev.sablatura.info/jazyky-online.info/github.png)](https://github.com/subash/Prepros/issues/42#issuecomment-18397524)

### Další možné záludnosti
`haml/script.js` je soubor kompilující několik javascriptů, hlavní script pro práci s webovkou je umístěn v `/haml/js/_app.js`

## Použití

### Doporučené nástroje

* [Sublime Text](http://www.sublimetext.com/) - pro editaci jakéhokoli textu/zdrojového kódu vítězí na plné čáře. Dokonalý nástroj.
* [Sublime Text, haml syntaxe](https://github.com/n00ge/sublime-text-haml-sass)

### Dokumentace k používaným nástrojům
* [Jquery](http://api.jquery.com/) - framework ulehčující práci s javascriptem
* [Bootstrap](http://getbootstrap.com/getting-started/) - framework ulehčující práci s css, responsivitou
* [Haml](http://haml.info/docs/yardoc/file.REFERENCE.html) - jazyk ulehčující práci s html, musí být zkompilován (např. pomocí aplikace prepros)
* [Sass](http://sass-lang.com/guide) - jazyk ulehčující práci s css, přidává proměnné, funkce a stará se o browser specific funkce (přidává ke kódu -webkit-, -moz atd.)

### Základní struktura webové aplikace

```
html/
├── img/
│   ├── icons.png
│   ├── flags.png
│   ├── ...
│   └── a další obrázky
├── min/
│   ├── script.min.js
│   ├── style.min.css
│   ├── vocabulary-simple.min.json
│   ├── rockets.eot
│   ├── ...
│   └── a další soubory pro chod aplikace, optimálně minifikované
└── download/
    ├── abeceda.pdf
    ├── ...
    └── a cokoli, co bude uživatel stahovat
```

### Funkce použité pro generování

* `= render(partial,locals = {})` - pomáhá includovat soubory + zároveň předává informace v objectu locals
* `= reklama("slim")` - vytvoří div s reklamou, do budoucna počítá s různými velikostmi reklamy