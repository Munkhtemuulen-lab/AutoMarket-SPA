import {renderPageLayout} from '../layouts/pageLayout.js';
import {t} from '../i18n/i18n.js';
import {money} from '../services/carService.js';
import {calculateLoan} from '../services/loanService.js';
import {renderCalculationInfo} from '../components/calculationInfo.js';
import {renderCalculationTable} from '../components/calculationTable.js';

export function renderCalculationPage(){
  const root=document.querySelector('#app');
  root.innerHTML=renderPageLayout({title:t('calcTitle'),subtitle:t('calcSub'),content:`
    <div class="calc-layout">
      <div class="calc-form panel"><span class="micro-heading">FINANCING ESTIMATE / 2.11</span>
        <label>${t('vehiclePrice')}<input id="price" type="number" min="1" value="45000000"></label>
        <label>${t('down')}<input id="down" type="range" min="0" max="90" value="30"><b id="downval">30%</b></label>
        <label>${t('interest')}<input id="interest" type="number" min="0" max="20" step="0.1" value="2.5"></label>
        <label>${t('months')}<select id="months">${[12,24,36,48,60,72].map(n=>`<option ${n===36?'selected':''} value="${n}">${n}</option>`).join('')}</select></label>
        ${renderCalculationInfo()}
        <p class="muted">${t('disclaimer')}</p>
      </div>
      <div class="calc-result"><div class="result-icon">↗</div><div class="overline">${t('monthly')}</div>
        <div class="monthly" id="monthly">—</div>
        <div class="result-split"><div><small>${t('loanAmount')}</small><strong id="principal">—</strong></div>
        <div><small>${t('total')}</small><strong id="total">—</strong></div></div>
        <span class="calc-watermark">AM.</span></div>
    </div><div id="calculationTable"></div>`});
  const update=()=>{
    const down=Number(root.querySelector('#down').value);
    root.querySelector('#downval').textContent=down+'%';
    const result=calculateLoan({price:root.querySelector('#price').value,downPercent:down,
      monthlyRatePercent:root.querySelector('#interest').value,months:root.querySelector('#months').value});
    root.querySelector('#monthly').textContent=result?money(Math.round(result.monthly)):t('invalid');
    root.querySelector('#principal').textContent=result?money(Math.round(result.principal)):'—';
    root.querySelector('#total').textContent=result?money(Math.round(result.total)):'—';
    root.querySelector('#calculationTable').innerHTML=result?renderCalculationTable(result):'';
  };
  root.querySelectorAll('input,select').forEach(el=>el.addEventListener('input',update));update();
}
