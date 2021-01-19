import './config/firebase';
import Vue from 'vue'
import App from './App.vue'
import { firestorePlugin } from 'vuefire'
Vue.use(firestorePlugin)
import '../node_modules/handsontable/dist/handsontable.full.css';
import './assets/css/style.css';

import { store } from './store/store'




new Vue({
    el: '#app',
    store,
    render: h => h(App)
})