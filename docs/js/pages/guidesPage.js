import {renderPageLayout} from '../layouts/pageLayout.js';
import {t} from '../i18n/i18n.js';
import {loadGuides} from '../services/guideService.js';
import {renderGuideCard,showGuide} from '../components/guideCard.js';
export function renderGuidesPage(){
 const root=document.querySelector('#app');
 root.innerHTML=renderPageLayout({id:'guides',title:t('guidesTitle'),subtitle:t('guidesSub'),content:`<div id="guideGrid" class="guide-grid"><p>${t('loading')}</p></div>`});
 loadGuides().then(guides=>{
  if(!root.querySelector('#guideGrid'))return;
  const grid=root.querySelector('#guideGrid');grid.innerHTML=guides.map(renderGuideCard).join('');
  grid.querySelectorAll('[data-guide]').forEach(b=>b.addEventListener('click',()=>{
    const guide=guides.find(item=>item.id===b.dataset.guide);if(guide)showGuide(guide);
  }));
 });
}
