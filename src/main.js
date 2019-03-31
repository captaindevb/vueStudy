import Vue from 'vue'
import App from './App'
import router from './router'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/en' // lang i18n

import '@/styles/index.scss' // global css

//import store from './store/users'
import store from '@/store'
import Cookies from 'js-cookie'

Vue.use(ElementUI, { locale })

//모든 라우터가 작동하기 전에 작동함. 네비게이션 가드 path요청들어오고 라우터 타기전에 무조건 작동 

/*router.beforeEach((to, from, next) => {
  console.log(to)
  console.log(from)

  if (Cookies.get('token')){
    if(to.path === '/login') {
      next({ path: `/`})
    } else{
      next()
    }
  } else {
    if (to.path !== '/login') {
      next({path:'/login'})
    }else{
      next()
    }
  }
})*/

new Vue({
  el: '#app',
  router,
  store, //store : store es6문법
  render: h => h(App)
})
