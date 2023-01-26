import { createApp } from 'vue'
import App from './App.vue'
import 'bootstrap/dist/css/bootstrap.min.css'
import '@fortawesome/fontawesome-free/css/all.min.css'
import VueGoogleMaps from '@fawmi/vue-google-maps'
import router from '@/router/router'
import 'animate.css';
import { createPinia } from 'pinia'

const pinia = createPinia()


createApp(App)
    .use(pinia)
    .use(router)
    .use(VueGoogleMaps, {
        load: {
            key: 'AIzaSyCFlvY2vQdU2nUEIMOTx7LVWPlbjiFeSaA',
            libraries: "places",
        },
    }).mount('#app')
