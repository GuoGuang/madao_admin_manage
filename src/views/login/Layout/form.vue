<template>
  <div class="login-plate">
    <h2>管理系统登录</h2>

    <el-form ref="loginForm" :model="loginForm" :rules="loginRules" status-icon auto-complete="on" label-position="left" >
      <div v-if="formStatus === 'base'" class="account-form" >
        <!-- TODO: 应用人脸识别登录 -->
        <el-form-item prop="username">
          <el-input v-model="loginForm.username" placeholder="请输入用户名" size="large" suffix-icon="el-icon-user-solid"/>
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model="loginForm.password" size="large" placeholder="请输入密码" show-password/>
        </el-form-item>
        <!-- 验证码 -->
        <el-form-item prop="code" >
          <div class="captcha">
            <el-input v-model="loginForm.captcha" size="large" placeholder="请输入验证码" @keyup.enter.native="handleLogin">
              <template slot="append">
                <img :src="'data:image/png;base64,'+captchaBase64" @click="refreshCaptcha">
              </template>
            </el-input>
          </div>
        </el-form-item>
        <div class="opt-button" >
          <el-checkbox v-model="loginForm.remember" style="padding-top: 0.7em;">记住用户名</el-checkbox>
          <el-button :loading="loading" class="btn" type="primary" @click.native.prevent="handleLogin">{{ $t('login.logIn') }}</el-button>
        </div>
      </div>
    </el-form>

    <!-- 手机号登录 -->
    <el-form ref="phoneForm" :model="phoneForm" :rules="phoneFormRules" status-icon class="login-form" auto-complete="on" label-position="left" >
      <div v-if="formStatus === 'phone'" class="phone-form" >
        <!-- TODO: 应用人脸识别登录 -->
        <el-form-item prop="username">
          <MDinput
            :maxlength="11"
            v-model="phoneForm.phone"
            name="phone"
            auto-complete="off">
            手机号
          </MDinput>
        </el-form-item>
        <!-- 验证码 -->
        <el-form-item prop="code" >
          <MDinput
            :maxlength="6"
            v-model="phoneForm.smsCode"
            name="code"
            auto-complete="off"
            @keyup.enter.native="handlePhoneLogin">
            验证码
          </MDinput>
          <el-button size="small" round type="warning" class="phone-code">
            <span v-show="sendAuthCode" class="auth_text auth_text_blue" @click="sendCode">获取验证码</span>
            <span v-show="!sendAuthCode" class="auth_text"> <span class="auth_text_blue">{{ auth_time }} </span> 秒后重发</span>
          </el-button>
        </el-form-item>
        <el-button :loading="loading" class="btn" type="primary" @click.native.prevent="handlePhoneLogin">{{ $t('login.logIn') }}</el-button>
      </div>
    </el-form>

    <div class="extra">
      <el-button class="phoneLogin" @click.native.prevent="formStatusHandle(formStatus)">
        {{ loginmethod }}
      </el-button>
      <button class="link fr">
        无法登录？
      </button>
    </div>
  </div>
</template>
<script>
// import { isvalidUsername } from '@/utils/validate'
import LangSelect from '@/components/LangSelect'
import { fetchCaptcha, sendPhoneCode } from '@/api/user/user'
import MDinput from '@/components/MDinput'

export default {
  name: 'Form',
  components: { LangSelect, MDinput },
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
      sendAuthCode: true, /* 布尔值，通过v-show控制显示‘获取按钮’还是‘倒计时’ */
      auth_time: 0, /* 倒计时 计数器*/
      captchaBase64: '',
      formStatus: 'base', // 表单状态
      loginmethod: '手机验证码登录', // 登录方式
      loginForm: {
        username: 'admin',
        password: '1111111',
        captcha: '',
        deviceId: '',
        remember: ''
      },
      /**
       * 手机号验证码登录
       */
      phoneForm: {
        phone: '17667198751',
        smsCode: '',
        deviceId: ''
      },
      loginRules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        password: [{ required: true, trigger: 'blur', validator: validatePassword }]
      },
      phoneFormRules: {
        phone: [
          { required: true, message: '请输入手机号', trigger: 'blur' }
        ],
        smsCode: [{ required: true, trigger: 'blur', validator: validatePassword }]
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
    this.fetchUserCaptcha()
  },
  destroyed() {
    // window.removeEventListener('hashchange', this.afterQRScan)
  },
  methods: {

    /**
     * 发送手机验证码
     */
    sendCode() {
      sendPhoneCode(this.phoneForm).then(response => {
        this.phoneForm.deviceId = response.data.deviceId
        this.phoneForm.smsCode = response.data.tempCode
      }).catch((response) => {
        this.$message({
          message: response.message,
          type: 'error'
        })
      })

      this.sendAuthCode = false
      this.auth_time = 59
      var auth_timetimer = setInterval(() => {
        this.auth_time--
        if (this.auth_time <= 0) {
          this.sendAuthCode = true
          clearInterval(auth_timetimer)
        }
      }, 1000)
    },

    /**
     * 切换表单
     */
    formStatusHandle(formStatus) {
      if (formStatus === 'base') {
        this.formStatus = 'phone'
        this.loginmethod = '账号密码登录'
      } else if (formStatus === 'phone') {
        this.formStatus = 'base'
        this.loginmethod = '手机验证码登录'
      }
    },

    /**
     * 获取验证码
     */
    fetchUserCaptcha() {
      fetchCaptcha().then(response => {
        this.captchaBase64 = response.data.base64Code
        this.loginForm.deviceId = response.data.deviceId
      })
    },
    refreshCaptcha() {
      this.fetchUserCaptcha()
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
            this.$router.push({ path: this.redirect || '/' })
            this.loading = false
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
     * 手机短信登录
     */
    handlePhoneLogin() {
      this.$refs.phoneForm.validate(valid => {
        if (valid) {
          this.loading = true
          // 登录
          this.$store.dispatch('LoginByUserPhone', this.phoneForm).then(() => {
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

<style rel="stylesheet/scss" lang="scss" scope>
.login-plate {
  margin: 2em 3em 2em 2em;
  h2 {
    margin: 2em 1em 1em 1em;
    text-align: center;
  }
  .account-form {
    .captcha {
      display: flex;
      input {
        border-radius: 0;
      }
    }
    .opt-button {
      display: flex;
      justify-content: space-between;

    }
  }

  .phone-form {
    .btn {
      width: 100%;
      margin-bottom: 30px;
    }
    .phone-code {
      position: relative;
      float: right;
      margin-top: -4em;
    }
    .el-button--warning {
      color: #a07941;
      border-color: #a07941;
      background-color: white;
    }
    .el-button--warning:hover {
      color: #a07941;
      border-color: #a07941;
      background-color: white;
    }
    .el-button--warning:focus {
      color: #a07941;
      border-color: #a07941;
      background-color: white;
    }
  }

  .btn {
      width: 40%;
      background-color: #4d69f6;
      margin-top: inherit;
      display: block;
      padding: 0;
      font-size: 15px;
      color: #fff;
      text-align: center;
      text-shadow: 0 1px 1px rgba(0, 0, 0, 0.2);
      box-shadow: none;
      border: 0;
      border-radius: 3px;
      line-height: 41px;
      cursor: pointer;
   }

  .extra {
    margin-top: 18px;
    overflow: hidden;
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
  }
}
</style>

<style rel="stylesheet/scss" lang="scss">
.login-plate {
  .account-form {
    .captcha {
      .el-input-group__append {
        padding-top: 3px !important;
        padding: inherit;
      }
    }
  }
}
</style>
