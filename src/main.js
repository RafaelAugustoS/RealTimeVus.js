import Vue from 'vue'
import VueFire from 'vuefire'
import App from './App'

Vue.config.productionTip = false

Vue.use(VueFire)

new Vue({
  el: '#app',
  template: '<App/>',
  components: { App }
})
