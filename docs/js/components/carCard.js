import { money, getFavorites, escapeHtml, toggleFavorite, listCars, deleteCar } from "../services/carService.js";
import { t } from "../i18n/i18n.js";

// Зургийн нэрсийг 2.8 дахь images.json-тай ижил хадгалсан.
const carImages = {
  1: 'crown-athlete.jpg', 2: 'lexus-is250.jpg', 3: 'land-cruiser-200.jpg',
  4: 'mercedes-e300.jpg', 5: 'subaru-wrx.jpg', 6: 'prius-50.jpg',
  7: 'bmw-530i.jpg', 8: 'crown-royal.jpg', 9: 'nissan-patrol.jpg'
};
export function getCarImage(car) {
  // User-created entries may optionally provide an image path within assets.
  if (car.image && /^assets\/[\w.-]+\.(jpg|jpeg|png|webp|svg)$/i.test(car.image)) return `./${car.image}`;
  if (carImages[car.id]) return `./assets/${carImages[car.id]}`;
  return car.shape === 'suv' ? './assets/suv.svg' : './assets/sedan.svg';
}
export function card(car) {
  const fav = getFavorites().some(id => String(id) === String(car.id));
  return `<article class="car-card">
    <div class="car-art ${escapeHtml(car.gradient || 'silver')}">
      <div class="corner-tag">${escapeHtml(car.badge || 'NEW')}</div>
      <div class="art-label">${escapeHtml(car.tag || 'AUTO MARKET')}</div>
      <button class="car-photo-btn" type="button" data-image="${car.id}" aria-label="${t('openImage')}">
        <img loading="lazy" src="${getCarImage(car)}" alt="${escapeHtml(car.brand + ' ' + car.model)}">
      </button>
      <button class="heart ${fav ? 'hearted' : ''}" data-fav="${car.id}" title="${t('favorite')}" aria-label="${t('favorite')}">${fav ? '♥' : '♡'}</button>
    </div>
    <div class="card-body"><div class="small-label">${escapeHtml(car.brand)} · ${car.year}</div>
      <h3>${escapeHtml(car.model)}</h3>
      <div class="specs"><span>◷ ${Number(car.km).toLocaleString()} ${t('kmUnit')}</span><span>⛽ ${t(car.fuel)}</span></div>
      <div class="card-bottom"><strong>${money(car.price)}</strong><button type="button" class="outline-btn" data-detail="${car.id}">${t('details')} ↗</button></div>
      ${car.custom ? `<button type="button" class="delete-car-btn" data-delete="${car.id}">${t('deleteListing')}</button>` : ''}
    </div></article>`;
}
export function wireCards(root, refresh) {
  root.querySelectorAll('[data-fav]').forEach(b => b.addEventListener('click', () => {
    toggleFavorite(Number(b.dataset.fav)); if (typeof refresh === 'function') refresh();
  }));
  root.querySelectorAll('[data-detail]').forEach(b => b.addEventListener('click', () => showCarDetail(Number(b.dataset.detail))));
  root.querySelectorAll('[data-image]').forEach(b => b.addEventListener('click', () => {
    const car = listCars().find(x => x.id === Number(b.dataset.image));
    if (car) showImageModal(car);
  }));
  root.querySelectorAll('[data-delete]').forEach(b => b.addEventListener('click', () => {
    const car = listCars().find(x => x.id === Number(b.dataset.delete));
    if (!car?.custom || !confirm(`${car.brand} ${car.model} — ${t('confirmDelete')}`)) return;
    if (deleteCar(car.id)) { if (typeof refresh === 'function') refresh(); else window.location.reload(); }
  }));
}
function showDialog(markup) {
  const backdrop = document.createElement('div'); backdrop.className = 'modal-overlay';
  backdrop.innerHTML = markup; document.body.append(backdrop);
  const onKey = event => { if (event.key === 'Escape') close(); };
  const close = () => { backdrop.remove(); document.removeEventListener('keydown', onKey); };
  backdrop.querySelectorAll('[data-close]').forEach(el => el.addEventListener('click', close));
  backdrop.addEventListener('click', event => { if (event.target === backdrop) close(); });
  document.addEventListener('keydown', onKey);
}
export function showImageModal(car) {
  showDialog(`<div class="image-modal" role="dialog" aria-modal="true" aria-label="${t('openImage')}">
    <button type="button" class="modal-x" data-close aria-label="${t('close')}">×</button>
    <img src="${getCarImage(car)}" alt="${escapeHtml(car.brand + ' ' + car.model)}">
    <p>${escapeHtml(car.brand + ' ' + car.model)} · ${car.year}</p>
  </div>`);
}
export function showCarDetail(id) {
  const car = listCars().find(x => x.id === id); if (!car) return;
  showDialog(`<div class="modal-box" role="dialog" aria-modal="true">
    <button class="modal-x" data-close aria-label="${t('close')}">×</button>
    <div class="car-art ${escapeHtml(car.gradient || 'silver')}"><div class="art-label">${escapeHtml(car.tag || 'AUTO MARKET')}</div>
    <img src="${getCarImage(car)}" alt="${escapeHtml(car.brand + ' ' + car.model)}"></div>
    <div class="modal-info"><div class="small-label">${escapeHtml(car.brand)} · ${car.year}</div>
      <h2>${escapeHtml(car.model)}</h2><h3 class="price-text">${money(car.price)}</h3>
      <div class="detail-grid"><span>${t('km')}<b>${Number(car.km).toLocaleString()} ${t('kmUnit')}</b></span>
      <span>${t('fuel')}<b>${t(car.fuel)}</b></span>
      <span>${t('gear')}<b>${t('automatic')}</b></span>
      <span>${t('location')}<b>${escapeHtml(car.city || 'Улаанбаатар')}</b></span></div>
      ${car.description ? `<p>${escapeHtml(car.description)}</p>` : ''}
      <p class="muted">${t('example')}</p>
      <button class="primary-btn" type="button" data-close>${t('close')}</button>
    </div></div>`);
}
