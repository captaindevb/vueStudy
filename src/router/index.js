import Vue from 'vue'
import VueRouter from 'vue-router'
//import HelloWorld from '@/views/HelloWorld'
// @ == src path
import NoticeList from '@/views/notice/NoticeList.vue'
import NoticeDetail from '@/views/notice/NoticeDetail.vue'
import NoticeRegister from '@/views/notice/NoticeRegister.vue'
import Layout from '@/components/Layout'
import NotFound from '@/404.vue'
import Cookies from 'js-cookie'

Vue.use(VueRouter)

const routes = [
  { path: '/login', component: () => import('@/views/login')},
  {
    path: '/',
    name: 'HelloWorld',
    component: Layout,
    redirect: '/helloworld',
    children: [{
      path:'/helloworld',
      component: () => import('@/views/HelloWorld')
    }]
  },
  /*{
    path: '/noticelist',
    name: 'NoticeList',
    component: NoticeList
  },
  {
    path: '/noticedetail',
    name: 'NoticeDetail',
    component: NoticeDetail
  },
  {
    path: '/noticeregister',
    name: 'NoticeRegister',
    component: NoticeRegister
  },*/
  {
    path: '/notice',
    component: Layout,
    children: [ //배열로 구성..! 
      {
        path: 'list', // /있으면 자식 아니고 루트패쓰로 인식함 
        name: 'NoticeList',
        component: () => import('@/views/notice/NoticeList.vue'),
        beforeEnter: (to, from, next) => { //라우터에 쓸땐 공통화 시킬때 
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
        }
      },
      {
        path: 'register',
        name: 'NoticeRegister',
        component: () => import('@/views/notice/NoticeRegister.vue')
      },
      {
        path: 'detail',
        name: 'NoticeDetail',
        component: () => import('@/views/notice/NoticeDetail.vue')
      }
    ]
  },
  {
    path: '/popup',
    component: Layout,
    children: [{
      path:'register',
      name:'PopupRegister',
      component: () => import('@/views/popup/PopupRegister')
    }]
  },
  {
    path: '/',
    component: Layout,
    children: [{
      path:'registration',
      name:'Registration',
      component: () => import('@/views/registration/Registration')
    }]
  },
  {
    path: '*',
    component: NotFound
  }
]

export default new VueRouter({
  routes
})