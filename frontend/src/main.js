import './assets/main.css'
import 'primeicons/primeicons.css'
import router from './router'
import { createApp } from 'vue'
// import { createPinia } from 'pinia'

import App from './App.vue'
// import router from './router'

const app = createApp(App)

// app.use(createPinia())
// app.use(router)

app.config.errorHandler = (err, vm, info) => {
  console.error("Error:", err);
  console.error("Vue component:", vm);
  console.error("Additional info:", info);
};

app.use(router)

app.mount('#app')
