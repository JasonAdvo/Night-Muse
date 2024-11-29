import { createApp } from 'vue'
import App from './App.vue'
import i18n from './i18n'
import router from './router'
import store from './store'
import VueLazyload from 'vue-lazyload';

// Import Main CSS
import './assets/main.css'

// Import Bootstrap CSS and JS
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import '@fortawesome/fontawesome-free/css/all.min.css';

const app = createApp(App)


app.use(i18n)
app.use(router)
app.use(store)

// Vue Lazy Load
app.use(VueLazyload, {
	preload: 1.3,
	attempt: 1,
});

app.mount('#app')
