
<template>
  <div class="login-plate">
    <el-form v-if="formStatus === 'base'" ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" status-icon auto-complete="on" label-position="left">
      <!-- TODO: 应用人脸识别登录 -->
      <div class="right-content">
        <h3 style="text-align: center;">
          <font style="vertical-align: inherit;">
            <font style="vertical-align: inherit;">
              Welcome Back
            </font>
          </font>
        </h3>
        <div>
          <a href="/makeGoogleEmailAuth" class="google-sign-up google-register">
            <img
              src="@/assets/google-log-icon.png"
              alt=" "
            >
            <span><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">{{ $t('login.google') }}</font></font></span>
          </a>
        </div>
        <div class="google-or-form">
          <font style="vertical-align: inherit;">
            <font style="vertical-align: inherit;">
              OR
            </font>
          </font>
        </div>

        <div class="form-group">
          <label class="control-label"><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">{{ $t('login.username') }}</font></font></label>
          <el-form-item prop="username">
            <el-input v-model="loginForm.username" placeholder="请输入用户名" size="large" suffix-icon="el-icon-user-solid" />
          </el-form-item>
        </div>
        <div class="form-group">
          <label class="control-label"><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">{{ $t('login.password') }}</font></font></label>
          <el-form-item prop="password">
            <el-input v-model="loginForm.password" size="large" placeholder="请输入密码" show-password />
          </el-form-item>
        </div>
        <div class="form-group">
          <label class="control-label"><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">{{ $t('login.captcha') }}</font></font></label>
          <el-form-item prop="code">
            <div class="captcha">
              <el-input v-model="loginForm.captcha" size="large" placeholder="请输入验证码" @keyup.enter.native="handleLogin">
                <template slot="append">
                  <el-image
                    :src="'data:image/png;base64,'+captchaBase64"
                    fit="none"
                    @click="fetchUserCaptcha"
                  >
                    <div slot="error" class="image-slot">
                      加载失败，请刷新
                    </div>
                  </el-image>
                </template>
              </el-input>
            </div>
          </el-form-item>
        </div>

        <div class="form-group">
          <div class="custom-checkbox bare">
            <label>
              <input id="remember" type="checkbox" name="remember" checked="">
              <span><font style="vertical-align: inherit;">
                <font v-model="loginForm.remember" style="vertical-align: inherit;">{{ $t('login.remember') }}</font></font></span>
            </label>
            <label style="float: right">
              <div class="signup">
                <el-button class="login-method btn" @click.native.prevent="formStatusHandle(formStatus)">
                  {{ loginmethod }}
                </el-button>
              </div>
            </label>
          </div>
        </div>

        <div class="form-group">
          <el-button :loading="loading" class="btn btn-primary" type="primary" @click.native.prevent="handleLogin">
            <font style="vertical-align: inherit;">
              <font style="vertical-align: inherit;">
                {{ loading ? $t('login.logIn') + "中..." : $t('login.logIn') }}
              </font>
            </font>
          </el-button>
        </div>
        <p><a href="/forgot"><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">{{ $t('login.forget') }}</font></font></a></p>
      </div>
    </el-form>

    <!-- 手机号登录 -->
    <el-form v-if="formStatus === 'phone'" ref="phoneForm" :model="phoneForm" :rules="phoneFormRules" class="phone-form" auto-complete="on" label-position="left">
      <div class="right-content">
        <div class="form-group">
          <el-form-item prop="username">
            <MDinput
              v-model="phoneForm.phone"
              :maxlength="11"
              name="phone"
              auto-complete="off"
            >
              {{ $t('login.phone') }}
            </MDinput>
          </el-form-item>
        </div>

        <div class="form-group">
          <!-- 验证码 -->
          <el-form-item prop="code">
            <MDinput
              v-model="phoneForm.smsCode"
              :maxlength="6"
              name="code"
              auto-complete="off"
              @keyup.enter.native="handlePhoneLogin"
            >
              {{ $t('login.code') }}
            </MDinput>
            <el-button size="small" round type="warning" class="phone-code">
              <span v-show="sendAuthCode" class="auth_text auth_text_blue" @click="sendCode"> {{ $t('login.getcode') }}</span>
              <span v-show="!sendAuthCode" class="auth_text"> <span class="auth_text_blue">{{ auth_time }} </span> 秒后重发</span>
            </el-button>
          </el-form-item>
        </div>

        <div class="signup" style="padding-bottom: 1em;">
          {{ $t('login.autoregister') }}
        </div>

        <div class="form-group">
          <el-button :loading="loading" class="btn btn-primary" type="primary" @click.native.prevent="handlePhoneLogin">
            <font style="vertical-align: inherit;">
              <font style="vertical-align: inherit;">
                {{ loginOrRegister }}
              </font>
            </font>
          </el-button>
        </div>
      </div>
    </el-form>
  </div>
</template>
<script>
// import { isvalidUsername } from '@/utils/validate'
// import LangSelect from '@/components/LangSelect'
import { fetchCaptcha, sendPhoneCode } from '@/api/user/user'
import MDinput from '@/components/MDinput'

export default {
  name: 'Form',
  components: {
    // LangSelect,
    MDinput },
  props: {
    modalStatus: {
      type: String,
      default: ''
    }
  },
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
      loginOrRegister: this.$t('login.signUp'),
      sendAuthCode: true, /* 布尔值，通过v-show控制显示‘获取按钮’还是‘倒计时’ */
      auth_time: 0, /* 倒计时 计数器*/
      captchaBase64: '',
      formStatus: 'base', // 表单状态
      loginmethod: this.$t('login.switchphone'), // 登录方式
      loginForm: {
        username: 'admin',
        password: '',
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
    modalStatus(newValue) {
      if (newValue === 'base') {
        this.formStatus = 'base'
        this.loginmethod = this.$t('login.switchphone')
      } else if (newValue === 'phone') {
        this.formStatus = 'phone'
        this.loginmethod = this.$t('login.switchphone')
      }
    },
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
        this.sendAuthCode = false
        this.auth_time = 59
        var auth_timetimer = setInterval(() => {
          this.auth_time--
          if (this.auth_time <= 0) {
            this.sendAuthCode = true
            clearInterval(auth_timetimer)
          }
        }, 1000)
      })
    },

    /**
     * 接受父组件事件调用切换按钮状态
     */
    handleParentClick() {
      this.loginOrRegister = this.$t('login.signUp')
    },
    /**
     * 切换表单
     */
    formStatusHandle(formStatus) {
      this.loginOrRegister = this.$t('login.logIn')
      if (formStatus === 'base') {
        this.formStatus = 'phone'
        this.loginmethod = this.$t('login.switchaccount')
        this.$emit('switch-status', 'phone')
      } else if (formStatus === 'phone') {
        this.formStatus = 'base'
        this.loginmethod = this.$t('login.switchphone')
        this.$emit('switch-status', 'base')
      }
    },

    /**
     * 获取验证码
     */
    fetchUserCaptcha() {
      fetchCaptcha().then(response => {
        this.captchaBase64 = response.data.base64Code
        this.loginForm.deviceId = response.data.deviceId
      }).catch(({ data, hideCommonError }) => {
        this.$message({
          message: '获取图形验证码失败，请稍后再试！',
          type: 'warning'
        })
        hideCommonError() // 是否隐藏拦截器里的错误提示
      })
    },

    /**
     * 登录
     */
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          // this.aaa = this.aaa + '中...'
          // 登录
          this.$store.dispatch('LoginByUsername', this.loginForm).then(() => {
            this.$router.push({ path: this.redirect || '/' })
            // 延时加载特效关闭
            setTimeout(() => {
              this.loading = false
            }, 1000)
          }).catch(({ data, hideCommonError }) => {
            this.loading = false
            // hideCommonError() // 是否隐藏拦截器里的错误提示
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
          }).catch(({ data, hideCommonError }) => {
            // 登录失败
            this.loading = false
            hideCommonError()
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

<style rel="stylesheet/scss" lang="scss">
.login-plate {
  .phone-form {
    width: 100%;
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
  .login-form {
    width: 100%;
    .captcha {
      .el-input-group__append {
        padding-top: 3px !important;
        padding: inherit;
        .el-image__inner {
          width: inherit;
        }
      }
    }
  }
}
</style>
