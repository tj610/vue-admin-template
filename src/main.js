import Vue from 'vue'
import App from '@/App.vue'
import router from '@/router'
import config from '@/config'
import utils from '@/libs/utils'
import storage from '@/libs/storage'
import * as filters from '@/libs/filters'

import 'view-design/dist/styles/iview.css'
import '@/assets/css/style.css'
import '@/http/axios'

Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

Vue.prototype.$config = config
Vue.prototype.$storage = storage
Vue.prototype.$utils = utils

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
