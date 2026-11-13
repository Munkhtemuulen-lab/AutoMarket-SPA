import {translations} from './translations.js';
let lang=localStorage.getItem('automarket-language')==='en'?'en':'mn';
export const t=(key)=>translations[lang][key]||key;
export const getLang=()=>lang;
export function setLang(next){lang=next==='en'?'en':'mn';localStorage.setItem('automarket-language',lang);document.documentElement.lang=lang;window.dispatchEvent(new Event('languagechange'));}
