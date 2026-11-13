// Номын 2.1: hash router — хуудсыг бүтнээр дахин ачаалахгүй.
export function initRouter(routes) {
  function renderRoute() {
    const hash = window.location.hash || '#/overview';
    const page = routes[hash] || routes['#/404'];
    page();
    document.querySelectorAll('[data-route]').forEach(a=>a.classList.toggle('active',a.getAttribute('href')===hash));
    window.scrollTo(0,0);
  }
  window.addEventListener('hashchange',renderRoute);
  window.addEventListener('load',renderRoute);
  window.addEventListener('languagechange',renderRoute);
}
