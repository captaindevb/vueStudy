<template>
  <section>
    <el-table :data="noticeData">
      <el-table-column prop="id" label="이미지" width="300" align="center"></el-table-column>
      <el-table-column prop="subj" label="제목" header-align="center">
        <template slot-scope="scope">
          <span class="link" @click="onDetail(scope)">{{scope.row.subj}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="tp" align="center" label="팝업 구분" width="130">
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
      <el-button type="primary" @click="$router.push('/popup/register')">팝업 등록</el-button>
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
     onList(){ 
       axios.get('')
      .then(res => {
       
        

      })
      .catch(err => {
        console.log(err)
      })
      .finally(_ => {

      })
     },
     onDetail(scope) {
      
     },
     onPageChange(pageNo) {
       
     }
   }
  }
</script>
