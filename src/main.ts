import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import PrimeVue from 'primevue/config';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Toolbar from 'primevue/toolbar';
import Button from 'primevue/button';
import ProgressBar from 'primevue/progressbar';

import 'primevue/resources/themes/saga-blue/theme.css';
import 'primevue/resources/primevue.min.css';
import 'primeicons/primeicons.css';
import 'bootstrap/dist/css/bootstrap.min.css';


createApp(App)
  .use(store)
  .use(router)
  .use(PrimeVue)
  .component('DataTable', DataTable)
  .component('Column', Column)
  .component('Toolbar', Toolbar)
  .component('Button', Button)
  .component('ProgressBar', ProgressBar)

  .mount('#app');


