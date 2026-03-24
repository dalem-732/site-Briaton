# site-Briaton

Статическая веб-страница интернет-магазина **Briaton** (осветительная техника): каталог товаров с фильтрами, сортировкой, пагинацией, корзиной (клиентская логика) и вспомогательными блоками (FAQ, форма обратной связи и т.д.).

## Стек

- HTML5, CSS (исходники в **SCSS**, в репозитории уже есть собранный `css/style.css`)
- JavaScript (ES modules), без сборщика в репозитории
- Данные каталога: `data/data.json`
- Сторонние скрипты в `js/vendor/` (Swiper, Just-validate, Tippy.js и др.)

## Структура проекта

| Путь | Назначение |
|------|------------|
| `catalog.html` | Главная (и пока единственная) HTML-страница сайта |
| `css/` | Скомпилированные стили |
| `scss/` | Исходники стилей |
| `js/` | Скрипты: `main.js` и модули в `components/` |
| `images/` | SVG-спрайт и иконки |
| `data/data.json` | Каталог товаров для отрисовки |

**Замечание:** в `data.json` указаны пути вида `../images/item-*.png`. В текущем наборе файлов в `images/` могут отсутствовать растровые превью товаров — при необходимости добавьте их или обновите пути в JSON.

## Локальный запуск

Страница подключает `main.js` как **ES module** (`type="module"`). Из-за политики браузера модули не работают при открытии файла напрямую с диска (`file://`). Нужен любой локальный HTTP-сервер.

**Node.js** (рекомендуется):

```bash
npx --yes serve .
```

**Python:**

```bash
python -m http.server 8080
```

Затем откройте в браузере `http://localhost:3000/catalog.html` (порт у `serve` по умолчанию часто 3000; у Python — указанный порт, например `http://localhost:8080/catalog.html`).

## Docker

Сборка и запуск контейнера с [nginx](https://hub.docker.com/_/nginx), раздающим файлы проекта:

```bash
docker build -t briaton-catalog .
docker run --rm -p 8080:80 briaton-catalog
```

Сайт: [http://localhost:8080/catalog.html](http://localhost:8080/catalog.html)

## Редактирование стилей

Если меняете SCSS, пересоберите CSS своим прежним процессом (например Live Sass Compiler в редакторе или CLI `sass`). В репозитории уже лежит актуальный `css/style.css` для работы без пересборки.

## Публикация на GitHub

```bash
git init
git add .
git commit -m "Initial commit: Briaton catalog frontend"
git branch -M main
git remote add origin https://github.com/dalem-732/site-Briaton.git
git push -u origin main
```

Если на GitHub уже есть коммиты (например с README при создании репозитория):

```bash
git pull origin main --rebase
# при конфликтах — правим файлы, затем:
git add .
git rebase --continue
git push -u origin main
```

Файлы вроде `.idea/` и служебные артефакты ОС игнорируются — см. `.gitignore`.

## Лицензия

MIT — текст в файле [`LICENSE`](LICENSE). При необходимости замените строку с copyright на своё имя или организацию.
