<template>
  <section class="detail">
    <el-form ref="form" label-width="120px">
      <el-form-item label="제목">
        <el-input readonly v-model="form.subj"></el-input>
      </el-form-item>
      <el-form-item label="구분" label-width="">
        <el-input readonly v-model="form.tp"></el-input>
      </el-form-item>
      <el-form-item label="작성일">
        <el-input readonly v-model="form.createdAt"></el-input>
      </el-form-item>
      <el-form-item label="내용">
        <el-input readonly v-html="form.conts"></el-input>
      </el-form-item>
    </el-form>
    <div class="bottomBtns">
      <el-button type="primary" @click="$router.push('/notice/list')">목록</el-button>
      <el-button type="primary" @click="$router.push({path:'/notice/register', query: {noticeId}})">수정</el-button>
      <el-button type="primary" @click="onDelete">삭제</el-button>
    </div>
  </section>
</template>
<script>
  import { VueEditor } from 'vue2-editor'
  import axios from 'axios'
  export default {
    components: {
      VueEditor
    },
    data() {
      return {
        noticeId: this.$route.query.noticeId,
        form: {
          subj: '',
          tp: '',
          createAt: '',
          conts: ''
        }
      }
    },
    created() {//컴포넌트 그린 후 바로 실행
      console.log('this.$route.query = ', this.$route.query) //쿼리 보낸것 받을 때
      //console.log('this.$route.params = ', this.$route.params)
      console.log("크리에이트 접속");
      axios.get(`http://15.164.101.68:3000/notice/${this.noticeId}`) //params방식임. notice뒤에 ?를 붙이게되면 쿼리스트링.
      .then(res => {
        console.log("댄 실행 후 레스는 :::: ",res)
        this.form = res.data.form //서버에서 가져온 데이터 넣어주기
      })
      .catch(err => {
        console.log(err)
      })
      .finally(_ => {

      })
    },
    methods: {
     onDelete() {
       axios.delete(`http://15.164.101.68:3000/notice/${this.noticeId}`, {
          // form: this.form
        })
        .then(res => { //성공했다면
          //console.log(res) ???내려줄게없는데요
          this.$router.push('/notice/list')
          //this.$router.push({ path:'/noticeDetail', query: { noticeId: res.data.noticeId}})
          console.log('삭제 성공!!!!!')
        })
        .catch(err => {
          console.log(err)
        })
        .finally(_ => {

        })
     }
    }
  }
</script>
<style scoped>
  .el-select .el-input {
    width: 110px;
  }

  .input-with-select .el-input-group__prepend {
    background-color: #fff;
  }
</style>
