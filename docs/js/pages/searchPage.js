// 2.6–2.9: JSON service + sidebar filters + photos + i18n.
import { renderPageLayout } from "../layouts/pageLayout.js";
import { t } from "../i18n/i18n.js";
import { listCars } from "../services/carService.js";
import { loadCatalog } from "../services/catalogService.js";
import { loadImages } from "../services/imageService.js";
import { card, wireCards } from "../components/carCard.js";
import { renderCarSearchSidebar } from "../components/carSearchSidebar.js";

export function renderSearchPage() {
  const root = document.querySelector('#app');
  const customAndDefault = listCars();
  root.innerHTML = renderPageLayout({ id: 'inventory', title: t('inventory'), subtitle: t('inventorySub'),
    content: `<div class="inventory-layout">
      ${renderCarSearchSidebar(customAndDefault)}
      <div class="inventory-main"><div class="results-bar">
      <span><b id="count">0</b> ${t('results')}</span>
      <label>${t('sort')} <select id="sort"><option value="newest">${t('newest')}</option>
      <option value="asc">${t('priceAsc')}</option><option value="desc">${t('priceDesc')}</option></select></label>
      </div><div id="carGrid" class="results-grid"></div></div></div>` });
  let jsonCars = null;
  const refresh = () => {
    if (!root.isConnected) return;
    const current = listCars();
    const standard = jsonCars || current.filter(c => !c.custom);
    const all = [...current.filter(c => c.custom), ...standard];
    const q = root.querySelector('#q').value.toLowerCase().trim();
    const brand = root.querySelector('#brand').value;
    const fuel = root.querySelector('#fuel').value;
    const max = Number(root.querySelector('#max').value);
    const year = Number(root.querySelector('#year').value);
    const sort = root.querySelector('#sort').value;
    const matched = all.filter(c => (!q || `${c.brand} ${c.model}`.toLowerCase().includes(q)) &&
      (!brand || c.brand === brand) && (!fuel || c.fuel === fuel) &&
      (!max || c.price <= max * 1000000) && (!year || c.year >= year));
    matched.sort((a,b) => sort === 'asc' ? a.price-b.price : sort === 'desc' ? b.price-a.price : b.year-a.year);
    root.querySelector('#count').textContent = matched.length;
    const grid = root.querySelector('#carGrid');
    grid.innerHTML = matched.length ? matched.map(card).join('') : `<div class="empty">${t('noResults')}</div>`;
    wireCards(grid, refresh);
  };
  root.querySelectorAll('#q,#brand,#fuel,#max,#year,#sort').forEach(el =>
    el.addEventListener(el.id === 'q' ? 'input' : 'change', refresh));
  refresh();
  Promise.all([loadCatalog(), loadImages()]).then(([catalog, images]) => {
    if (!root.querySelector('#carGrid')) return;
    jsonCars = catalog.map(c => ({ ...c, image: images[String(c.id)] || c.image }));
    refresh();
  });
}
