import {t} from '../i18n/i18n.js';
export function renderCalculationInfo() {
  return `<p class="calc-info"><strong>${t('calcInfoTitle')}</strong> ${t('calcInfoBody')}</p>`;
}
