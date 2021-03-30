import { createApp } from 'vue';

import App from './App.vue';
import '@fortawesome/fontawesome-free/css/all.css';
import '@fortawesome/fontawesome-free/js/all.js';
import BaseCard from './components/UI/BaseCard.vue';
import BaseButton from './components/UI/BaseButton.vue';
import BaseBadge from './components/UI/BaseBadge.vue';
import BaseLoader from './components/UI/BaseLoader.vue';
import BaseDialog from './components/UI/BaseDialog.vue';
import router from './router.js';
import store from './store/index.js';

const app = createApp(App);

app.component('base-card', BaseCard);
app.component('base-button', BaseButton);
app.component('base-badge', BaseBadge);
app.component('base-loader', BaseLoader);
app.component('base-dialog', BaseDialog);

app.use(router);
app.use(store);

app.mount('#app');
