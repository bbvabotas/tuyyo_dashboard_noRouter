// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
//import router from './router'
//import BootstrapVue from 'bootstrap-vue'

import VueHighcharts from 'vue-highcharts'
import Highcharts from 'highcharts/highstock'
import loadMap from 'highcharts/modules/map'

import highchartsMore from 'highcharts-more'

highchartsMore(Highcharts)
loadMap(Highcharts);
Vue.use(VueHighcharts, { Highcharts });

import vueSmoothScroll from 'vue-smooth-scroll'
Vue.use(vueSmoothScroll)

import Popover  from 'vue-js-popover'
Vue.use(Popover)

Vue.config.productionTip = false

new Vue({
  el: '#app',
//  router,
  template: '<App/>',
  components: { App }
})
