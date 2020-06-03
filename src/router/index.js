import Vue from 'vue'
import Router from 'vue-router'
import storage from '@/libs/storage'
import routes from './routers'
import ViewUI from 'view-design'
import 'view-design/dist/styles/iview.css'

Vue.use(Router)

const router = new Router({
  routes
})

router.beforeEach((to, from, next) => {
  ViewUI.LoadingBar.start()
  // const token = storage.getStorage('token')
  // if (to.meta.requireAuth) {
  //   token ? next() : next('login')
  // } else {
  //   next()
  // }
  next()
})

router.afterEach(to => {
  ViewUI.LoadingBar.finish()
  window.document.title = to.meta.title || router.app.$config.title
  window.scrollTo(0, 0)
})


export default router
