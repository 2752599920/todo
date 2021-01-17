import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import Storage from 'vue-ls';

let options = {
    namespace: 'todo__', // key prefix
    name: 'ls', // name variable Vue.[ls] or this.[$ls],
    storage: 'local', // storage name session, local, memory
};

Vue.use(Storage, options);

import Vant from '../node_modules/vant';
import 'vant/lib/index.css';

Vue.use(Vant);

Vue.config.productionTip = false;

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount("#app");