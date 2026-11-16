import {t} from '../i18n/i18n.js';
import {money} from '../services/carService.js';
export function renderCalculationTable(result) {
  const fields = [
    [t('downPayment'),result.downPayment],
    [t('loanAmount'),result.principal],
    [t('monthly'),result.monthly],
    [t('interestTotal'),result.interestTotal],
    [t('total'),result.total]
  ];
  return `<div class="calc-breakdown"><h3>${t('breakdown')}</h3><table><tbody>${fields.map(([label,amount])=>`<tr><th scope="row">${label}</th><td>${money(Math.round(amount))}</td></tr>`).join('')}</tbody></table></div>`;
}
