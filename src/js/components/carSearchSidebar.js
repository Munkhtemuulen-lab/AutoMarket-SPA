// 2.7: Хайлтын sidebar компонент.
import { t } from "../i18n/i18n.js";
import { escapeHtml } from "../services/carService.js";
export function renderCarSearchSidebar(cars) {
  const brands = [...new Set(cars.map(car => car.brand))].sort();
  const fuels = [...new Set(cars.map(car => car.fuel))];
  return `<aside class="filter-panel">
    <div class="panel-heading"><h3>${t('filterTitle')}</h3><span>⚙</span></div>
    <label>${t('search')}<input id="q" type="search" placeholder="${t('search')}"></label>
    <label>${t('brand')}<select id="brand"><option value="">${t('allBrands')}</option>
      ${brands.map(brand => `<option value="${escapeHtml(brand)}">${escapeHtml(brand)}</option>`).join('')}
    </select></label>
    <label>${t('fuel')}<select id="fuel"><option value="">${t('allFuel')}</option>
      ${fuels.map(fuel => `<option value="${escapeHtml(fuel)}">${t(fuel)}</option>`).join('')}
    </select></label>
    <label>${t('maxPrice')}<select id="max"><option value="">${t('allPrices')}</option>
      ${[25,40,60,90,130,200].map(m => `<option value="${m}">${m} ${t('million')}</option>`).join('')}
    </select></label>
    <label>${t('year')}<select id="year"><option value="">${t('allYears')}</option>
      ${[2005,2010,2015,2018,2020].map(y => `<option value="${y}">${y}+</option>`).join('')}
    </select></label>
    <div class="filter-foot">${t('example')} · AutoMarket</div>
  </aside>`;
}
