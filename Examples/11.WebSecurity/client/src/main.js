import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Vuelidate from 'vuelidate'
import VModal from 'vue-js-modal'

//Global bus to emit to subscribe to events between components
Vue.prototype.$bus = new Vue();
//Make the event bus available to the router
router.$bus = Vue.prototype.$bus;

Vue.use(Vuelidate);
Vue.use(VModal);

//Run in development mode
Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App)
}).$mount('#app');
