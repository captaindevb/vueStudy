<template>
  <section class="detail">
    <!--{{form}}-->
    <el-form ref="form" label-width="150px" :model="form">
      <el-form-item label="제목">
        <el-input v-model="form.subj"></el-input>
      </el-form-item>
      <el-form-item label="헤드라인 등록">
        <el-radio-group v-model="form.dpTp">
          <el-radio label="헤드라인"></el-radio>
          <el-radio label="일반"></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="팝업개시 대상" prop="">
        <el-checkbox-group v-model="form.init">
          <el-checkbox label="PC Web"></el-checkbox>
          <el-checkbox label="Mobile Web"></el-checkbox>
          <el-checkbox label="APP"></el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="내용">
        <vue-editor id="editor" v-model="form.conts"></vue-editor>
      </el-form-item>
    </el-form>
    <!--key값은 고유값 뷰매커니즘. 중복X-->
    <!--<ul>
      <li v-for="(item, index) in bodyData" :key="index">
        color: {{item.name}}, count: {{item.count}} <button @click="item.count++">수량추가</button>
        <span v-if="item.count === 0">Sold out</span>
        <span v-else>In stock</span>
      </li>
      <span>total = {{countTotal}}</span>
    </ul>-->
    <div class="bottomBtns">
      <el-button type="primary" @click="onSubmit" v-if="!noticeId">등록</el-button>
      <el-button type="primary" v-else @click="onModify">수정</el-button>
      <el-button type="primary" @click="$router.push('/notice/list')">취소</el-button>
    </div>
  </section> 
</template>
<script>
  import { VueEditor } from 'vue2-editor'
  import axios from 'axios'
  export default {
    //첫번째 대문자무시 그다음 대문자 - (뷰에서 권장)
    components: {
      VueEditor 
    },
    computed: {
      countTotal() { //counttotal 이 바라보는 값이 바뀌면 작동 
        console.log('==== COMPUTED ====')
        //this가 vue 컴포넌트 전체를 지칭. this를 찍어보자. 즉 vue컴포넌트 안의 bodyData데이터를 지칭.   
        return this.bodyData.reduce((acc, item) => {
          return acc + item.count
        }, 0) //0은 초기값
      }
    },
    data() {
      return {
        form: {
          subj: '',
          dpTp: '',
          init: [],
          conts: ''
        },
        bodyData : [
          { id:1, count:2, name:'red' },
          { id:2, count:3, name:'green' },
          { id:3, count:5, name:'black' },
          { id:4, count:0, name:'white' },
          { id:5, count:6, name:'pink' }
        ],
        noticeId: this.$route.query.noticeId
      }
    },
    created() {
      //console.log('noticeId = ', this.$route.query.noticeId)

      if(this.noticeId){ //created 로직을 무조건 타기때문에 분기처리
        axios.get(`http://15.164.101.68:3000/notice/${this.noticeId}`) //params방식임. notice뒤에 ?를 붙이게되면 쿼리스트링.
        .then(res => {
          console.log(res)

          this.form = res.data.form //서버에서 가져온 데이터 넣어주기

          this.form.dpTp = res.data.form.tp

          //string을 배열로 바꿔주기
          console.log('split = ' + res.data.form.init.split(','))

          this.form.init = res.data.form.init.split(',')

        })
        .catch(err => {
          console.log(err)
        })
        .finally(_ => {

        })

      }//end if

      
    },
    methods: { 
      onSubmit() {
        console.log('======onSubmit=======')
        console.log(this.form)
        axios({ //post 형식으로 url에 data를 보냄
          method: 'POST',
          url: 'http://15.164.101.68:3000/notice',
          data: { form: this.form }
        })
        .then(res => { //성공
            console.log("레스가 안뜬다고??? =====",res.data)
            console.log("노티스아이디값은??",res.data.noticeId)
            this.$router.push({ path:'/notice/detail', query: { noticeId: res.data.noticeId}})//서버에서 내려준 값, 쿼리스트링 방식
            //this.$router.push({ name:'NoticeDetail', params: {noticeId: res.data.noticeId}})//params방식
        })
        .catch(err => { //실패
          console.log("실패", err)

        })
        .finally(_ => { //상관없이 무조건 실행

        })
      },
      onModify() {
        axios.put(`http://15.164.101.68:3000/notice/${this.noticeId}`, {
          form: this.form
          //param도 보내고 form데이터도 보냄
        })
        .then(res => { 
          console.log(res)

          this.$router.push({ path:'/notice/detail', query: { noticeId: res.data.noticeId}})

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
<style>

</style>
