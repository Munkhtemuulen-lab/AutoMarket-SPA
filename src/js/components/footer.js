import {t} from '../i18n/i18n.js';
export function mountFooter(){
 const root=document.getElementById('footer');if(!root)return;
 root.innerHTML=`<footer class="footer"><div class="container footer-complete">
   <div class="footer-brand"><b>AUTO<span class="accent">MARKET</span></b><p>${t('footer')}</p><small>${t('footerDemo')}</small></div>
   <nav aria-label="Footer" class="footer-nav"><strong>${t('quickLinks')}</strong>
      <a href="#/overview">${t('home')}</a><a href="#/search">${t('cars')}</a><a href="#/calculation">${t('calculator')}</a>
      <a href="#/books">${t('sell')}</a><a href="#/guides">${t('guides')}</a><a href="#/contact">${t('contact')}</a>
   </nav><div class="footer-note"><strong>${t('projectInfo')}</strong><p>${t('projectInfoBody')}</p></div>
 </div><div class="container footer-bottom"><span>© 2026 · CarShopSPa · SPA 2.1–2.13</span><a href="#/overview">↑ ${t('backToTop')}</a></div></footer>`;
}
