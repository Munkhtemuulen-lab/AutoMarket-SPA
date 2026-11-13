# AutoMarket SPA — Автомашины худалдаа

Хавсаргасан номын **2.1–2.5** бүтэц, `HOOLSPANISH-master` жишээний router/pages/layout/navbar/i18n зарчмыг автомашины худалдааны шинэ сэдвээр боловсруулсан.

## Ажиллуулах (хамгийн хялбар)
1. ZIP-г задлаад **AutoMarket-SPA** хавтсыг VS Code > File > Open Folder цэсээр нээнэ.
2. VS Code Extensions > **Live Server** суулгана.
3. **src/index.html** дээр Right click > **Open with Live Server**.
4. `http://127.0.0.1:5500/src/index.html` (порт өөр байж болно) дээр нээгдэнэ.

**Анхаар:** `index.html` дээр хоёр дарж `file://`-ээр нээвэл ES module ажиллахгүй байж болно. HTTP сервер хэрэгтэй.

## Номын бүлгүүдтэй холбогдох нь
- 2.1 `src/js/router.js`, `routes.js`, `app.js`, `src/index.html` — hash router
- 2.2 `src/js/pages/*.js` — тусгаарласан хуудсууд
- 2.3 `src/js/layouts/pageLayout.js` — reusable layout
- 2.4 `src/js/components/navbar.js` — responsive navbar
- 2.5 `src/js/i18n/{translations,i18n}.js` — Монгол/Англи хэл

## Хуудасны зураглал
`#/overview` нүүр, `#/search` автомашин хайлт, `#/calculation` лизинг, `#/books` зар оруулах (номын books route-г дахин ашигласан), `#/contact` холбоо, `#/404` алдаа.

## Нэмэлт боломжууд
Үнэ, марк, оноор шүүх, эрэмбэлэх, машин дэлгэрэнгүй, хадгалсан машин, localStorage-д демо зар хадгалах, санхүүгийн тооцоолуур. Бодит зар/банк/мессеж серверт илгээгдэхгүй. Машины үнэ болон гүйлт бол **зохиомол жишээ өгөгдөл**.

## Sass/Bulma
SCSS-ийн эх файл: `src/scss/main.scss`. Шууд ажиллах CSS: `src/css/main.css` (ZIP-д бэлэн). Sass-г дахин хөрвүүлэх бол `npm install` дараа нь `npm run build:css` эсвэл `npm run sass`. Bulma-г суулгах хамаарлыг номын жишгийн дагуу package.json-д оруулсан, гэхдээ хурдан demo ажиллуулахад npm шаардахгүй.

## GitHub Pages
`src` хавтсын агуулгыг GitHub repository-ийн `docs` дотор хуулж, Settings → Pages → Deploy from branch → main /docs сонгож болно. Эсвэл энэ ZIP-д бэлдсэн `docs` хавтсыг ашиглаж болно.
