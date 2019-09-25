<template>
  <section>
    <el-table :data="noticeData">
      <el-table-column prop="id" label="No" width="70" align="center"></el-table-column>
      <el-table-column prop="subj" label="제목" header-align="center">
        <template slot-scope="scope">
          <span class="link" @click="onDetail(scope)">{{scope.row.subj}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="tp" align="center" label="구분" width="130">
      </el-table-column>
      <el-table-column prop="createdAt" align="center" label="등록일" width="150">
      </el-table-column>
    </el-table>

    <el-pagination layout="prev, pager, next" 
      :page-size="pageSize" 
      :total="total"
      :current-page.sync="currentPage" 
      @current-change="onPageChange"> 
    </el-pagination>
    
    <div class="bottomBtns">
      <el-button type="primary" @click="$router.push('/notice/register')">공지사항 등록</el-button>
    </div>
  </section>
</template>

<script>
  import axios from 'axios'
  import Cookies from 'js-cookie'
  export default {
   data() {
     return {
       noticeData: [],
       total:1,
       pageSize: 10,
       currentPage: 1
     }
   },
   created() {
    this.onList()
   },
   methods: {
     onList(){ //기존 created 부분 메소드로 사용하기!! 페이징에서도 또 사용해야하니까 
       axios.get('http://15.164.101.68:3000/notice')
      .then(res => {
        console.log('========res=========')
        console.log(res)
        console.log('========res=========')

        //this.noticeData = res.data.noticeData 통째로 바인딩하였는데 이제 잘라서 넣어야함 

        //데이터 가공
        const notiData = res.data.noticeData
        notiData.reverse() //배열 거꾸로 정렬
        console.log(notiData[1].createdAt);
        notiData.forEach(function (item, index, array) {
          array[index].createdAt = item.createdAt.substring(0, 10); // 날짜 예쁘게 자르기
        })
        this.total = notiData.length

        let currentMaxLow = this.currentPage * this.pageSize
        let currentMinLow = currentMaxLow - this.pageSize
        console.log(currentMaxLow, currentMinLow)

        this.noticeData = notiData.slice(currentMinLow, currentMaxLow)//실제로 0~9까지 자름 
        

      })
      .catch(err => {
        console.log(err)
      })
      .finally(_ => {

      })
     },
     onDetail(scope) {
       console.log(scope)
       this.$router.push({ path: '/notice/detail', query: {noticeId:scope.row.id}})
     },
     onPageChange(pageNo) {
       this.onList()
     }
   },
   /*beforeRouteEnter (to, from, next) {
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
   }*/
  }
</script>
