//import Vue from 'vue'
//import Vuex from 'vuex' //전역으로 상태관리
import axios from 'axios'
import Cookies from 'js-cookie'
import { userLogin } from '@/api/app.js'

//Vue.use(Vuex)

const user = {
   state: { //최종 상태값
      //공통 변수
      id : '',
      loading: false
   },
   mutations: { //vuex규칙. commit으로 부름 // 상태를 변경하기 위한.
      // 동기로직 공통 함수
      SET_ID: (state, id) => {
         state.id = id
      },
      SET_LOADING: (state, loading) => {
         state.loading = loading
      }
   },
   actions: {
      // 비동기 로직 즉 통신

      Login({ commit }, userInfo) { //commit 생략가능. 옵션임. 
        // axios.post('http://localhost:3000/login', {
        //    data: userInfo
        // })
        userLogin({userInfo})
         .then(res => {
            console.log('============= res =========')
            console.log(res)
            console.log('============= res =========')

            //commit('SET_ID', res.data.body.email)

            commit('SET_ID', res.data.body) //body자체가 즉 email이 됨 

            //Cookies.set('token', res.data.body.email, {expires:1}) // key, values, 유효시간(하루)
            Cookies.set('token', res.data.body, {expires:1})

         })
         .catch(err => {
            console.log(err)
            alert(err.response.data.error);
         })
         .finally(_ => {
            commit('SET_LOADING', false)
         })
      }
   }
}

export default user

//export default new Vuex.Store({
//   modules: { //모듈화 구조! 
//      user
//   }
//})