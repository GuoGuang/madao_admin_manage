<template>
  <div>
    <el-form ref="loginForm" :model="loginForm" :rules="loginRules" status-icon class="login-form" auto-complete="on" label-position="left" >
      <div v-if="formStatus === 'base'" class="" >

        <!-- TODO: 应用人脸识别登录 -->
        <!-- 用户名 -->
        <el-form-item prop="username">

          <!--  <el-input
          v-model="loginForm.username"
          :placeholder="$t('login.username')"
          name="username"
          type="text"
          autocomplete="off">
          <template slot="prepend"><svg-icon icon-class="user" /></template>
          <el-input/> -->
          <MDinput
            :maxlength="20"
            v-model="loginForm.username"
            name="username"
            aria-autocomplete="off"
            auto-complete="off">
            {{ $t('login.username') }}
          </MDinput>
        </el-form-item>

        <!-- 密码 -->
        <el-form-item prop="password">
          <!-- <span class="svg-container">
          <svg-icon icon-class="password" />
        </span> -->
          <!-- <el-input
          :type="passwordType"
          v-model="loginForm.password"
          :placeholder="$t('login.password')"
          name="password"
          auto-complete="on"
          a>
          <template slot="prepend"><svg-icon icon-class="password" /></template>
          <el-input/>
          <span class="show-pwd" @click="showPwd">
          <svg-icon icon-class="eye" />
        </span>
        </el-input> -->

          <MDinput
            :type="passwordType"
            :maxlength="20"
            v-model="loginForm.password"
            name="password"
            auto-complete="off">
            {{ $t('login.password') }}
          </MDinput>

        </el-form-item>

        <!-- 验证码 -->
        <el-form-item prop="code" >
          <div class="captcha">
            <el-input
              v-model="loginForm.captcha"
              placeholder="验证码"
              name="captcha"
              auto-complete="off">
              <el-input/>
              <!-- <span class="show-pwd" @click="showPwd">
          <svg-icon icon-class="eye" />
        </span> -->
            </el-input>
            <img :src="'data:image/png;base64,'+captchaBase64" class="avatar" @click="refreshCaptcha">
          </div>
        </el-form-item>
        <el-button :loading="loading" class="btn" type="primary" style="width:100%;margin-bottom:30px;" @click.native.prevent="handleLogin">{{ $t('login.logIn') }}</el-button>

      </div>
    </el-form>
    <!-- 手机号登录 -->

    <el-form ref="phoneForm" :model="phoneForm" :rules="phoneFormRules" status-icon class="login-form" auto-complete="on" label-position="left" >
      <div v-if="formStatus === 'phone'" class="">
        <!-- TODO: 应用人脸识别登录 -->
        <!-- 用户名 -->
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
            auto-complete="off">
            验证码
          </MDinput>
          <el-button size="small" round type="warning" class="phone-code">
            <span v-show="sendAuthCode" class="auth_text auth_text_blue" @click="sendCode">获取验证码</span>
            <span v-show="!sendAuthCode" class="auth_text"> <span class="auth_text_blue">{{ auth_time }} </span> 秒后重发</span>
          </el-button>
        </el-form-item>

        <!-- <el-row>
          <el-col :span="19">
            <MDinput v-model="验证码" :maxlength="100">
              验证码
            </MDinput>
          </el-col>
          <el-col :span="5">
            <el-button size="small" round>小型按钮</el-button>
          </el-col>
        </el-row> -->
        <el-button :loading="loading" class="btn" type="primary" style="width:100%;margin-bottom:30px;" @click.native.prevent="handlePhoneLogin">{{ $t('login.logIn') }}</el-button>

      </div>

      <div class="extra">
        <el-button class="phoneLogin" @click.native.prevent="formStatusHandle(formStatus)">
          {{ loginmethod }}
        </el-button>
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
  </div>
</template>
<script>
// import { isvalidUsername } from '@/utils/validate'
import LangSelect from '@/components/LangSelect'
import SocialSign from '@/views/login/socialsignin'
import { fetchCaptcha, sendPhoneCode } from '@/api/user/user'
import MDinput from '@/components/MDinput'

export default {
  name: 'Form',
  components: { LangSelect, SocialSign, MDinput },
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
        deviceId: ''
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
.captcha{
  display: flex;
  input{
    border-radius: 0;
  }
}
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
    .phone-code{
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

</style>

