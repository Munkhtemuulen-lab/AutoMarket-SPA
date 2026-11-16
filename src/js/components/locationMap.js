import { getCities, cityCars } from '../services/locationService.js';
import { t, getLang } from '../i18n/i18n.js';
import { escapeHtml } from '../services/carService.js';

// Газрын зураг биш: хотуудын товчлуураар зар шүүх интерактив схем.
export function renderLocationMap() {
  const cities = getCities();
  return `<section class="location-section" id="locations"><div class="container">
    <div class="section-heading"><h2>${t('locationTitle')}</h2><p>${t('locationIntro')}</p></div>
    <div class="location-layout"><div class="location-diagram" aria-label="${t('locationDiagram')}">
      <div class="location-grid-lines"></div>
      <span class="location-diagram-caption">${t('locationDiagram')}</span>
      ${cities.map(city => `<button class="city-dot" type="button" data-city="${city.id}" style="left:${city.x}%;top:${city.y}%" aria-label="${escapeHtml(getLang()==='mn'?city.nameMn:city.nameEn)}"><span class="city-marker"></span><span class="city-name">${escapeHtml(getLang()==='mn'?city.nameMn:city.nameEn)}</span></button>`).join('')}
    </div><div class="location-info" id="locationInfo" aria-live="polite">${locationContent(cities[0])}</div></div>
    <p class="location-note">${t('locationDisclaimer')}</p>
  </div></section>`;
}
function locationContent(city) {
  const count = cityCars(city).length;
  return `<span class="micro-heading">${t('cityListings')}</span>
    <h3>${escapeHtml(getLang()==='mn'?city.nameMn:city.nameEn)}</h3>
    <p>${t('cityCount')} <strong>${count}</strong> ${t('cityCountSuffix')}</p>
    <a class="primary-btn" href="#/search">${t('browse')} ↗</a>`;
}
export function wireLocationMap(root) {
  const buttons = [...root.querySelectorAll('[data-city]')];
  const activate = (id) => {
    const city = getCities().find(item => item.id === id);
    if (!city) return;
    buttons.forEach(button => button.classList.toggle('selected',button.dataset.city===id));
    const info=root.querySelector('#locationInfo');if(info) info.innerHTML=locationContent(city);
  };
  buttons.forEach(button => button.addEventListener('click', () => activate(button.dataset.city)));
  activate('ulaanbaatar');
}
