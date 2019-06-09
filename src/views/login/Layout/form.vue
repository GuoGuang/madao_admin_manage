<template>

  <el-form ref="loginForm" :model="loginForm" :rules="loginRules" status-icon class="login-form" auto-complete="on" label-position="left">
    <div class="">
      <!-- TODO: 应用人脸识别登录 -->
      <!-- 用户名 -->
      <el-form-item prop="username">

        <el-input
          v-model="loginForm.username"
          :placeholder="$t('login.username')"
          name="username"
          type="text"
          autocomplete="off">
          <template slot="prepend"><svg-icon icon-class="user" /></template>
          <el-input/>
      </el-input></el-form-item>

      <!-- 密码 -->
      <el-form-item prop="password">
        <!-- <span class="svg-container">
          <svg-icon icon-class="password" />
        </span> -->
        <el-input
          :type="passwordType"
          v-model="loginForm.password"
          :placeholder="$t('login.password')"
          name="password"
          auto-complete="on"
          @keyup.enter.native="handleLogin">
          <template slot="prepend"><svg-icon icon-class="password" /></template>
          <el-input/>
          <!-- <span class="show-pwd" @click="showPwd">
          <svg-icon icon-class="eye" />
        </span> -->
      </el-input></el-form-item>

    </div>

    <el-button :loading="loading" class="btn" type="primary" style="width:100%;margin-bottom:30px;" @click.native.prevent="handleLogin">{{ $t('login.logIn') }}</el-button>

    <div class="extra">
      <button class="phoneLogin">
        手机验证码登录
      </button>
      <button class="link fr">
        无法登录？
      </button>
    </div>
    <div class="extra">
      <button class="link">
        <!-- 社交账号登录 -->
      </button>
    </div>
  </el-form>
</template>
<script>
// import { isvalidUsername } from '@/utils/validate'
import LangSelect from '@/components/LangSelect'
import SocialSign from '@/views/login/socialsignin'

export default {
  name: 'Form',
  components: { LangSelect, SocialSign },
  data() {
    /* const validateUsername = (rule, value, callback) => {
      if (!isvalidUsername(value)) {
        callback(new Error('Please enter the correct user name'))
      } else {
        callback()
      }
    } */
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error('The password can not be less than 6 digits'))
      } else {
        callback()
      }
    }
    return {
      loginForm: {
        username: 'admin',
        password: '1111111'
      },
      loginRules: {
        username: [
          { required: true, message: '请输入手机号', trigger: 'blur' }
        ],
        password: [{ required: true, trigger: 'blur', validator: validatePassword }]
      },
      passwordType: 'password',
      loading: false,
      showDialog: false,
      redirect: undefined
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    }

  },
  created() {
    // window.addEventListener('hashchange', this.afterQRScan)
  },
  destroyed() {
    // window.removeEventListener('hashchange', this.afterQRScan)
  },
  methods: {

    /**
     * 显示密码
     */
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
    },

    /**
     * 登录
     */
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          // 登录
          this.$store.dispatch('LoginByUsername', this.loginForm).then(() => {
            this.loading = false
            this.$router.push({ path: this.redirect || '/' })
          }).catch((response) => {
            // 登录失败
            this.$message({
              message: response.message,
              type: 'error'
            })
            this.loading = false
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },

    /**
     * 扫描二维码后回调
     */
    afterQRScan() {
      // const hash = window.location.hash.slice(1)
      // const hashObj = getQueryObject(hash)
      // const originUrl = window.location.origin
      // history.replaceState({}, '', originUrl)
      // const codeMap = {
      //   wechat: 'code',
      //   tencent: 'code'
      // }
      // const codeName = hashObj[codeMap[this.auth_type]]
      // if (!codeName) {
      //   alert('第三方登录失败')
      // } else {
      //   this.$store.dispatch('LoginByThirdparty', codeName).then(() => {
      //     this.$router.push({ path: '/' })
      //   })
      // }
    }
  }
}
</script>

<style scoped>
    .inputGroups {
        padding: 1px 0;
        border: 1px solid #d5d5d5;
        border-radius: 3px;
    }
    .input {
        line-height: 19px;
        color: #555;
        background: #fff;
        padding: 1em .8em;
        width: 100%;
        border: none;
        box-sizing: border-box;
        outline: none;
        font-size: 14px;
    }
    .input + .input {
        border-top: 1px solid #d5d5d5;
    }
    .btn {
        display: block;
        padding: 0;
        width: 100%;
        font-size: 15px;
        margin-top: 18px;
        color: #fff;
        text-align: center;
        text-shadow: 0 1px 1px rgba(0, 0, 0, .2);
        background: #0f88eb;
        box-shadow: none;
        border: 0;
        border-radius: 3px;
        line-height: 41px;
        cursor: pointer;
    }
    .btn:hover {
        background: #55abed;
    }
    .extra {
        margin-top: 18px;
        overflow: hidden;
    }
    .phoneLogin {
        padding: 0;
        font-size: 14px;
        color: #5ca5e8;
        background: transparent;
        border: 0;
        cursor: pointer;
        outline: 0;
    }
    .fr {
        float: right;
    }
    .link {
        font-size: 14px;
        color: #555;
        padding: 0;
        cursor: pointer;
        background: transparent;
        border: none;
        outline: none;
    }
</style>

