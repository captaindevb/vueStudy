<template>
  <section>
    <el-table :data="noticeData">
      <el-table-column prop="id" label="No" width="70" align="center"></el-table-column>
      <el-table-column prop="subj" label="제목" header-align="center">
        <template slot-scope="scope">
          <span class="link" @click="onDetail(scope)">{{scope.row.subj}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="tp" align="center" label="구분" width="150">
      </el-table-column>
      <el-table-column prop="createdAt" align="center" label="등록일" width="220">
      </el-table-column>
    </el-table>
    
    <div class="bottomBtns">
      <el-button type="primary" @click="$router.push('/noticeRegister')">공지사항 등록</el-button>
    </div>
  </section>
</template>

<script>
  import axios from 'axios'
  export default {
   data() {
     return {
       noticeData: []
     }
   },
   created() {

     axios.get('http://localhost:3000/notice')
      .then(res => {
        console.log('========res=========')
        console.log(res)
        console.log('========res=========')

        this.noticeData = res.data.noticeData
      })
      .catch(err => {
        console.log(err)
      })
      .finally(_ => {

      })
   },
   methods: {
     onDetail(scope) {
       console.log(scope)
       this.$router.push({ path: '/noticeDetail', query: {noticeId:scope.row.id}})
     }
   }
  }
</script>
