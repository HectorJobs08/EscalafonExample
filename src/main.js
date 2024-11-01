import { createApp } from 'vue';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.min.css';
import './global.css'
import App from './App.vue'

import { router } from './router'

const app = createApp(App)
app.use(router)
app.mount('#app')
