import axios from 'axios'

const service = axios.create({
   baseURL: process.env.BASE_API,
   timeout: 5000
})

/*export const userLogin = (data) => {
   return service ({
      url: '/login',
      method: 'post',
      data,
   })
}*/

export const userLogin = (data) => {
   return service.post('/login', data)
}

//나머지 리팩토링해보기 