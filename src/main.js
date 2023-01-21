import { createApp } from 'vue'
import App from './App.vue'
import 'bootstrap/dist/css/bootstrap.min.css'
import '@fortawesome/fontawesome-free/css/all.min.css'
import VueGoogleMaps from '@fawmi/vue-google-maps'


createApp(App).use(VueGoogleMaps, {
    load: {
        key: 'AIzaSyCFlvY2vQdU2nUEIMOTx7LVWPlbjiFeSaA',
        libraries: "places",
    },
}).mount('#app')
