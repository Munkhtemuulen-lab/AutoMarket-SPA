import {mountNavbar} from './components/navbar.js';import {mountFooter} from './components/footer.js';import {initRouter} from './router.js';import {routes} from './routes.js';
function renderShell(){mountNavbar();mountFooter();}
renderShell();window.addEventListener('languagechange',renderShell);initRouter(routes);
