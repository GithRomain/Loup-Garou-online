import { createApp } from 'vue'
import App from './App.vue'
import store from '@/store' // short for @/store/index
import 'animate.css'
import router from './router'
import './registerServiceWorker'

createApp(App).use(router).use(store).mount('#app')

// Subscribe to store updates
store.subscribe((mutation, state) => {
    // Store the state object as a JSON string
    localStorage.setItem('vuex', JSON.stringify(state));
});