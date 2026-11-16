import {t,getLang} from '../i18n/i18n.js';
import {escapeHtml} from '../services/carService.js';
export function renderGuideCard(guide){
 const lang=getLang();const title=lang==='mn'?guide.titleMn:guide.titleEn;
 return `<article class="guide-card"><div class="guide-icon">${escapeHtml(guide.icon)}</div><h3>${escapeHtml(title)}</h3><button class="outline-btn" type="button" data-guide="${escapeHtml(guide.id)}">${t('readGuide')} ↗</button></article>`;
}
export function showGuide(guide){
 const lang=getLang();const title=lang==='mn'?guide.titleMn:guide.titleEn;
 const body=lang==='mn'?guide.bodyMn:guide.bodyEn;
 const overlay=document.createElement('div');overlay.className='modal-overlay';
 overlay.innerHTML=`<div class="guide-modal" role="dialog" aria-modal="true" aria-labelledby="guideTitle"><button type="button" class="modal-x" data-close aria-label="${t('close')}">×</button><span class="micro-heading">CARSHOP GUIDE / 2.12</span><h2 id="guideTitle">${escapeHtml(title)}</h2><p>${escapeHtml(body)}</p><button class="primary-btn" type="button" data-close>${t('close')}</button></div>`;
 document.body.append(overlay);
 const close=()=>{overlay.remove();document.removeEventListener('keydown',onKey)};
 const onKey=e=>{if(e.key==='Escape')close()};
 overlay.querySelectorAll('[data-close]').forEach(b=>b.addEventListener('click',close));
 overlay.addEventListener('click',e=>{if(e.target===overlay)close()});
 document.addEventListener('keydown',onKey);
 overlay.querySelector('[data-close]')?.focus();
}
