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
      <el-form-item label="이미지">
         <img class="popupImg" alt="" :src="form.filename" style="width:100%;"/>
      </el-form-item>
    </el-form>
    <div class="bottomBtns">
      <el-button type="primary" @click="$router.push('/popup/list')">목록</el-button>
      <el-button type="primary" @click="$router.push({path:'/popup/register', query: {popupId}})">수정</el-button>
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
        popupId: this.$route.query.popupId,
        form: {
          subj: '',
          tp: '',
          createAt: '',
          filename: ''
        }
      }
    },
    created() {//컴포넌트 그린 후 바로 실행
      console.log('this.$route.query = ', this.$route.query) //쿼리 보낸것 받을 때
      //console.log('this.$route.params = ', this.$route.params)

      axios.get(`http://localhost:3000/popup/${this.popupId}`) //params방식임. popup뒤에 ?를 붙이게되면 쿼리스트링.
      .then(res => {
        console.log(res)
        const imgUrl = "http://localhost:3000/images/"
        res.data.form.filename = imgUrl.concat(res.data.form.filename)
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
       axios.delete(`http://localhost:3000/popup/${this.popupId}`, {
          // form: this.form
        })
        .then(res => { //성공했다면
          this.$router.push('/popup/list')
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
