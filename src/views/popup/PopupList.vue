<template>
  <section>
    <el-table :data="popupData">
      <el-table-column prop="id" label="번호" width="80" align="center"></el-table-column>
      <el-table-column prop="filename" label="이미지" width="400" align="center">
        <template slot-scope="scope">
           <img class="popupImg" alt="" :src="scope.row.filename" style="width:100%;max-height:220px;"/>
        </template>
      </el-table-column>
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
       popupData: [],
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
       axios.get('http://localhost:3000/popup')
      .then(res => {
       
        console.log('========res=========')
        console.log(res)
        console.log('========res=========')


         //데이터 가공
        const popupData = res.data.popupData
        popupData.reverse() //배열 거꾸로 정렬
        popupData.forEach(function (item, index, array) {
          array[index].createdAt = item.createdAt.substring(0, 10); // 날짜 예쁘게 자르기
        })
        const imgUrl = "http://localhost:3000/images/";
        popupData.forEach(function (item, index, array) {
          array[index].filename = imgUrl.concat(item.filename);
        })
        this.total = popupData.length

        let currentMaxLow = this.currentPage * this.pageSize
        let currentMinLow = currentMaxLow - this.pageSize
        console.log(currentMaxLow, currentMinLow)

        this.popupData = popupData.slice(currentMinLow, currentMaxLow)//실제로 0~9까지 자름 
        

      })
      .catch(err => {
        console.log(err)
      })
      .finally(_ => {

      })
     },
     onDetail(scope) {
      console.log(scope)
       this.$router.push({ path: '/popup/detail', query: {popupId:scope.row.id}})
     },
     onPageChange(pageNo) {
       this.onList()
     }
   }
  }
</script>
