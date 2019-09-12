<template>
  <div class="login-container">
    <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" auto-complete="on" label-position="left">
      <h3 class="title">로그인</h3>
      <el-form-item prop="username">
        <span class="svg-container">
          <svg-icon icon-class="user" />
        </span>
        <el-input v-model="loginForm.username" name="username" type="text" auto-complete="on" placeholder="아이디를 입력해주세요" />
      </el-form-item>
      <el-form-item prop="password">
        <span class="svg-container">
          <svg-icon icon-class="password" />
        </span>
        <el-input
          :type="pwdType" 
          v-model="loginForm.password"
          name="password"
          auto-complete="on"
          placeholder="비밀번호를 입력해주세요"
          @keyup.enter.native="handleLogin" />
        <!--<span class="show-pwd" @click="showPwd">xx
          <svg-icon icon-class="password" />
        </span>-->
      </el-form-item>
      <el-form-item>
        <el-button :loading="loading" type="primary" style="width:100%;" @click.native.prevent="handleLogin">
          로그인
        </el-button>
      </el-form-item>
      <el-form-item>
        <el-button :loading="loading" type="primary" style="width:100%;"  @click="$router.push('/registration')">
          회원가입
        </el-button>
      </el-form-item>
      <el-form-item>
        <el-button :loading="loading" type="primary" style="width:100%;" @click="$router.push('/')">
          돌아가기
        </el-button>
      </el-form-item>
      <span v-show="userId">{{changeId}}</span>
      <!--<div class="tips">
        <span style="margin-right:20px;">username: admin</span>
        <span> password: admin</span>
      </div>-->
    </el-form>
  </div>
</template>

<script>
import { mapActions, mapState, mapMutations } from 'vuex'

export default {
 
  name: 'Login',
  data() {
    const validateUsername = (rule, value, callback) => {
      if (!value.length) {
        callback(new Error('아이디를 입력해주세요'))
      } else {
        callback()
      }
    }
    const validatePass = (rule, value, callback) => {
      if (!value.length) {
        callback(new Error('비밀번호를 입력해주세요'))
      } else {
        callback()
      }
    }
    return {
      showModal: false,
      loginForm: {
        username: '',
        password: '',
      },
      loginRules: { 
        username: [{ required: true, trigger: 'blur', validator: validateUsername }],
        password: [{ required: true, trigger: 'blur', validator: validatePass }]
      },
      // loading: false,
      pwdType: 'password',
      redirect: undefined
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect
      
      },
      immediate: true
    },
    /*userId(id) { //watch는 userId 라는 값 하나만 바라봄, 값이 변경되면.. 바뀌면 그 값 가져옴. 
      console.log('watch id = ', id)

      this.$router.push('/')
    }*/
  },
  computed: { //바라보는 데이터 중 하나만 바뀌어도 작동이 됨. //캐싱되어있기때문에 더 효율적!!, 빠름
    ...mapState({//나중에 this로 가져올 수 있음 
      userId: state => state.user.id, //만들었던 모듈 user
      loading: state => state.user.loading
    }),
    changeId() { 
      console.log('===changeId====')
      if (this.userId) {
        console.log('===is userId====')
        this.$router.push('/')
        return `당신의 아이디는 ${this.userId}`
        
      }
    }
  },
  methods: {
    ...mapActions([
      'Login' //나중에 this로 가져올 수 있음 
    ]),
    ...mapMutations([
      'SET_LOADING'
    ]),
    showPwd() {
      if (this.pwdType === 'password') {
        this.pwdType = ''
      } else {
        this.pwdType = 'password'
      }
    },
    handleLogin() {
      console.log('======로그인 버튼======')

      this.$refs.loginForm.validate(valid => {
        if (valid) {
          console.log('====벨류데이션 체크=====')
          // this.loading = true

          //this.$store.state.user.loading = true //좋지 않은 방법 
          
          //this.$store.commit('SET_LOADING', true)//뮤테이션을 통해서 동기적으로 값을 바꿈! 

          //근데 뮤테이션도 가지고올수있음
          this.SET_LOADING(true)


          // this.$store.dispatch('Login', this.loginForm)
          // dispatch -> actions 를 부르는 명령어.
          // 첫번째 인자값은 actions 안에 있는 메소드 명을 지칭, 두번쨰 인자 값은 파라미터 값

          this.Login(this.loginForm) //헬퍼함수 사용한거. 가져올 메소드 많으면 dispatch보다  이런식으로 씀 ...mapActions 이 부분!!

        }
      })
    }
  },
  mounted() { //컴포넌트가 다 생성된 후  실행되는 훅 (한번만)
    console.log('mounted', this.loading, this.userId)
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
$bg:#2d3a4b;
$light_gray:#eee;

/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;
    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      &:-webkit-autofill {
        -webkit-box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: #fff !important;
      }
    }
  }
  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
  .el-form-item__error{
    padding-top:0;
    margin-top:-6px;
  }
}

</style>

<style rel="stylesheet/scss" lang="scss" scoped>
$bg:#2d3a4b;
$dark_gray:#889aa4;
$light_gray:#eee;
.login-container {
  position: fixed;
  height: 100%;
  width: 100%;
  background-color: $bg;
  .login-form {
    position: absolute;
    left: 0;
    right: 0;
    width: 520px;
    max-width: 100%;
    padding: 35px 35px 15px 35px;
    margin: 120px auto;
  }
  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;
    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }
  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }
  .title {
    font-size: 26px;
    font-weight: 400;
    color: $light_gray;
    margin: 0px auto 40px auto;
    text-align: center;
    font-weight: bold;
  }
  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
  .refresh {
    color: red;
    font-size: 20px;
  }
}
</style>
