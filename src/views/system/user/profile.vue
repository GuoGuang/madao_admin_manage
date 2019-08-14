<template>

  <div class="profile">
    <el-row class="profile">
      <el-col :span="2">
        <div class="avatar">
          <el-avatar
            :size="120"
            :src="profileInfo.avatar"/>
          <div class="profile__avatar-uploader avatar-txt-margin">
            <span @click="openAvatarDialog">上传头像</span>
          </div>
        </div>
      </el-col>
      <el-col :span="22" class="summary">
        <p class="ng-binding">
          <span >昵称&nbsp;&nbsp;：{{ profileInfo.nickName }} </span>
        </p>
        <p class="ng-binding">
          <span >账号ID ： {{ profileInfo.id }}</span>
        </p>
        <p class="ng-binding">
          <span >登录账号：{{ profileInfo.account }}</span>
        </p>
        <p class="ng-binding">
          <span >注册时间 ：{{ common.dateFormatFun(profileInfo.createAt) }}</span>
        </p>
      </el-col>
    </el-row>

    <div class="action">
      <el-row class="warning">
        <el-col :span="3">
          您当前的账号安全程度
        </el-col>
        <el-col :span="5">
          <div style="width:90%">
            <el-progress :text-inside="true" :stroke-width="18" :percentage="70"/>
          </div>
        </el-col>
        <el-col :span="4">
          安全级别: 中   继续努力
        </el-col>
      </el-row>

      <el-row class="safety">
        <ul >

          <li>
            <el-row>
              <el-col :span="3">
                登录密码
              </el-col>
              <el-col :span="17">
                安全性高的密码可以使帐号更安全。建议您定期更换密码，设置一个包含字母，符号或数字中至少两项且长度超过6位的密码。
              </el-col>
              <el-col :span="4" class="text-success">
                <i class="el-icon-success"/> 已设置
                <span>|</span>
                <el-link style="font-size: inherit;" @click="securitySetup(0)">修改</el-link>
              </el-col>
            </el-row>
          </li>
          <li>
            <el-row>
              <el-col :span="3">
                手机绑定
              </el-col>
              <el-col :span="17">
                您已绑定了手机 <span style="color: #67c23a;">{{ profileInfo.phone }}</span>  [您的手机号可以直接用于登录、找回密码等]
              </el-col>
              <el-col :span="4" class="text-success">
                <i class="el-icon-success"/> 已设置
                <span>|</span>
                <el-link style="font-size: inherit;" @click="securitySetup(1)">修改</el-link>
              </el-col>
            </el-row>
          </li>
          <li style="border-bottom: 1px dashed #e1e6eb;">
            <el-row>
              <el-col :span="3">
                注销账号
              </el-col>
              <el-col :span="17">
                如果您不再使用此账号，可以将其注销。账号成功注销后，其下所有服务、数据及隐私信息将会被删除并将无法恢复
              </el-col>
              <el-col :span="4">
                <el-link style="font-size: inherit;" @click="deleteAccount">注销账号</el-link>
              </el-col>
            </el-row>
          </li>
        </ul>
      </el-row>

    </div>

    <!-- 上传头像模态框 -->
    <el-dialog :visible.sync="avatarDialog" title="修改头像" class="upload-pard">
      <el-tabs v-model="activeName" type="card" @tab-click="handleTabClick">
        <el-tab-pane label="个性头像" name="1" class="diy-avatar">
          <el-row>
            <el-col :span="18" class="col-avatar-list" >
              <el-image
                v-for="avatar in defaultAvatars"
                :key="avatar"
                :src="avatar"
                @click="defaultAvatarHandle(avatar)"/>
            </el-col>

            <el-col :span="5" class="col-avatar-preview" >
              <el-image
                :src="defaultAvatar"/>
              <p >头像预览</p>
            </el-col>
          </el-row>

        </el-tab-pane>
        <el-tab-pane label="本地头像" name="2" >

          <el-alert
            :closable="false"
            title="仅支持jpg/png格式图片，文件需小于2M"
            type="warning"
            center
            show-icon/>

          <div style="padding: 1em 19em;">
            <p>从电脑里挑选一张好图作为头像吧</p>
            <el-upload
              ref="uploadAvatar"
              :before-upload="beforeAvatarUpload"
              :http-request="uploadAvatar"
              :auto-upload="false"
              :multiple="false"
              :on-change="handleChange"
              :on-remove="handleRemove"
              class="upload-avatar"
              action=""
              list-type="picture-card"
              accept="image/*">
              <el-button size="small" >选择一个头像吧~</el-button>
            </el-upload>
          </div>

        </el-tab-pane>
      </el-tabs>

      <div slot="footer" class="dialog-footer">
        <el-button @click="avatarDialog = false">取 消</el-button>
        <el-button type="primary" @click="saveAvatar">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 安全设置 -->
    <el-drawer
      :visible.sync="securityDrawer"
      :before-close="handleClose"
      title="安全设置"
      direction="rtl">
      <div class="security-container">
        <el-form ref="profileForm" :model="profileForm" :rules="profileRules" class="profileForm" status-icon auto-complete="on" label-position="left" >
          <div v-if="securityDrawerCardStatus === 0" class="account-form" >
            <el-form-item prop="oldPassword">
              <el-input v-model="profileForm.oldPassword" placeholder="请输入旧密码" size="large" show-password/>
            </el-form-item>
            <el-form-item prop="newPassword">
              <el-input v-model="profileForm.newPassword" size="large" placeholder="请输入新密码" show-password/>
            </el-form-item>
            <el-button :loading="loading" class="btn" type="primary" @click.native.prevent="changePhone">提交</el-button>
          </div>
          <div v-else class="phone-form" >

            <el-steps :active="active" finish-status="success" simple >
              <el-step title="验证" />
              <el-step title="修改" />
              <el-step title="成功" />
            </el-steps>

            <!-- 0 -->
            <div v-if="steps === 0">
              <el-form-item prop="phone" style="    margin-top: 2em;    margin-bottom: inherit;">
                <el-form-item label="手机号">
                  176****761
                </el-form-item>
              </el-form-item>
              <el-form-item prop="smsCode" >
                <MDinput
                  :maxlength="6"
                  v-model="profileForm.smsCode"
                  name="smsCode"
                  auto-complete="off"
                  @keyup.enter.native="changePhone">
                  验证码
                </MDinput>
                <el-button size="small" round type="warning" class="phone-code">
                  <span v-show="sendAuthCode" class="auth_text auth_text_blue" @click="sendCode">获取验证码</span>
                  <span v-show="!sendAuthCode" class="auth_text"> <span class="auth_text_blue">{{ auth_time }} </span> 秒后重发</span>
                </el-button>
              </el-form-item>
              <el-button :loading="loading" class="btn" type="primary" @click.native.prevent="changePhone">验证</el-button>
            </div>

            <!-- 1 -->
            <div v-if="steps === 1">
              <el-form-item prop="phone">
                <MDinput
                  :maxlength="11"
                  v-model="profileForm.phone"
                  name="phone"
                  auto-complete="off">
                  手机号
                </MDinput>
              </el-form-item>
              <el-form-item prop="smsCode" >
                <MDinput
                  :maxlength="6"
                  v-model="profileForm.smsCode"
                  name="smsCode"
                  auto-complete="off"
                  @keyup.enter.native="changePhone">
                  验证码
                </MDinput>
                <el-button size="small" round type="warning" class="phone-code">
                  <span v-show="sendAuthCode" class="auth_text auth_text_blue" @click="sendCode">获取验证码</span>
                  <span v-show="!sendAuthCode" class="auth_text"> <span class="auth_text_blue">{{ auth_time }} </span> 秒后重发</span>
                </el-button>
              </el-form-item>
              <el-button :loading="loading" class="btn" type="primary" @click.native.prevent="changePhone">提交</el-button>
            </div>

            <!-- 2 -->
            <div v-if="steps === 2">
              <div class="m-box">
                <div class="m-duigou"/>
              </div>
            </div>

          </div>
        </el-form>

      </div>
    </el-drawer>

  </div>
</template>

<script>

import { updateUser, updatePassword, uploadAvatar } from '@/api/user/profile'
import MDinput from '@/components/MDinput'
import { sendPhoneCode } from '@/api/user/user'

export default {
  name: 'Profile',
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'info',
        deleted: 'danger'
      }
      return statusMap[status]
    }
  },
  components: {
    MDinput
  },
  data() {
    return {
      active: 0,
      steps: 0, // el-steps 步骤条
      loading: false,
      securityDrawer: false,
      securityDrawerCardStatus: 1,
      avatarUrl: '',
      isSelected: false, // 是否已选择文件
      profileInfo: {},
      currentTabName: '1', // 当前默认tab name
      defaultAvatar: 'http://vue-admin-guoguang.oss-cn-shanghai.aliyuncs.com/icode/image/avatar/17e420c250804efe904a09a33796d5a10.jpg',
      defaultAvatars: [
        'http://vue-admin-guoguang.oss-cn-shanghai.aliyuncs.com/icode/image/avatar/17e420c250804efe904a09a33796d5a10.jpg',
        'http://vue-admin-guoguang.oss-cn-shanghai.aliyuncs.com/icode/image/avatar/17e420c250804efe904a09a33796d5a16.jpg',
        'http://vue-admin-guoguang.oss-cn-shanghai.aliyuncs.com/icode/image/avatar/1d22f3e41d284f50b2c8fc32e0788698.jpeg',
        'http://vue-admin-guoguang.oss-cn-shanghai.aliyuncs.com/icode/image/avatar/2dd7a2d09fa94bf8b5c52e5318868b4d9.jpg',
        'http://vue-admin-guoguang.oss-cn-shanghai.aliyuncs.com/icode/image/avatar/2dd7a2d09fa94bf8b5c52e5318868b4df.jpg',
        'http://vue-admin-guoguang.oss-cn-shanghai.aliyuncs.com/icode/image/avatar/496b3ace787342f7954b7045b8b06804.jpeg',
        'http://vue-admin-guoguang.oss-cn-shanghai.aliyuncs.com/icode/image/avatar/595ba7b05f2e485eb50565a50cb6cc3c.jpeg',
        'http://vue-admin-guoguang.oss-cn-shanghai.aliyuncs.com/icode/image/avatar/5997fedcc7bd4cffbd350b40d1b5b9824.jpg',
        'http://vue-admin-guoguang.oss-cn-shanghai.aliyuncs.com/icode/image/avatar/5997fedcc7bd4cffbd350b40d1b5b987.jpg',
        'http://vue-admin-guoguang.oss-cn-shanghai.aliyuncs.com/icode/image/avatar/87d8194bc9834e9f8f0228e9e530beb1.jpeg',
        'http://vue-admin-guoguang.oss-cn-shanghai.aliyuncs.com/icode/image/avatar/8f5b60ef00714a399ee544d331231820.jpeg',
        'http://vue-admin-guoguang.oss-cn-shanghai.aliyuncs.com/icode/image/avatar/964e40b005724165b8cf772355796c8c.jpeg',
        'http://vue-admin-guoguang.oss-cn-shanghai.aliyuncs.com/icode/image/avatar/a3b10296862e40edb811418d64455d00.jpeg',
        'http://vue-admin-guoguang.oss-cn-shanghai.aliyuncs.com/icode/image/avatar/a43456282d684e0b9319cf332f8ac468.jpeg',
        'http://vue-admin-guoguang.oss-cn-shanghai.aliyuncs.com/icode/image/avatar/bba284ac05b041a8b8b0d1927868d5c9x.jpg'
      ],
      activeName: 1,
      account: this.$store.getters.account,
      listLoading: true,
      // 上传头像框
      avatarDialog: false,
      // 树形列表默认树形
      defaultProps: {
        children: 'children',
        label: 'name'
      },
      sendAuthCode: true, /* 布尔值，通过v-show控制显示‘获取按钮’还是‘倒计时’ */
      auth_time: 0, /* 倒计时 计数器*/
      // dialog是否显示
      menuDialog: false,
      // 模态框表单
      menuForm: {

      },
      profileForm: {
        oldPassword: '',
        newPassword: '',
        smsCode: '',
        phone: ''
      },
      profileRules: {
        oldPassword: [
          { required: true, message: '请输入旧密码', trigger: 'blur' }
        ],
        newPassword: [
          { required: true, message: '请输入新密码', trigger: 'blur' }
        ],
        smsCode: [
          { required: true, message: '请输入验证码', trigger: 'blur' }
        ],
        phone: [
          { required: true, message: '请输入手机号', trigger: 'blur' }
        ]
      }
    }
  },

  created() {
    this.profileInfo = this.$store.getters.user
  },

  methods: {
    /**
     * 抽屉关闭时
     */
    handleClose(done) {
      this.$refs['profileForm'].resetFields()
      done()
    },
    /**
     * 打开上传头模态框
     */
    openAvatarDialog() {
      this.avatarDialog = true
    },
    // 安全设置
    securitySetup(status) {
      this.securityDrawerCardStatus = status
      this.securityDrawer = true
    },
    /**
     * 限制只能上传一张头像，选择完一张后删除选择摁钮
     */
    handleChange(file, fileList) {
      this.$refs['uploadAvatar'].$el.style.setProperty('--upload-avatar-display', 'none')
    },
    handleRemove(file, fileList) {
      this.$refs['uploadAvatar'].$el.style.setProperty('--upload-avatar-display', 'grid')
    },
    /**
     * 手动上传
     */
    saveAvatar() {
      if (this.currentTabName === '1') {
        const defaultAvatar = {
          avatar: this.defaultAvatar,
          id: this.profileInfo.id
        }
        updateUser(defaultAvatar).then(res => {
          this.profileInfo.avatar = this.defaultAvatar
          this.$message({
            message: '上传成功',
            type: 'success'
          })
          this.avatarDialog = false
        }).catch(err => {
          this.$message.error(err)
          console.log('上传头像失败', err)
        })
      } else {
        this.$refs.uploadAvatar.submit()
      }
    },
    /**
     * tab 点击事件
     */
    handleTabClick(tab, event) {
      this.currentTabName = tab.name
    },
    defaultAvatarHandle(avatar) {
      this.defaultAvatar = avatar
    },

    /**
     * 注销账户
     */
    deleteAccount() {
      this.$confirm('账号成功注销后，其下所有服务、数据及隐私信息将会被删除并将无法恢复！您确定注销吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$store.dispatch('LogOut').then(() => {
          this.$message({
            type: 'success',
            message: '注销成功!'
          })
          setTimeout(() => {
            location.reload()// 为了重新实例化vue-router对象以避免bug
          }, 1500)
        }).catch(error => {
          this.$message({
            message: error.message,
            type: 'error'
          })
        })
      }).catch(() => {

      })
    },

    /**
     * 修改密码
     */
    updatePassword(id) {
      updatePassword(id).then(response => {
        this.roleForm = response.data
      }).catch(errorData => {
        this.$message({
          message: '网络错误',
          type: 'error'
        })
      })
      this.roleDialog = true
    },

    /**
     * 修改手机号
     */
    changePhone() {
      if (this.steps === 0) {
        // 验证手机号
        const a = 1 + 1 === 2
        if (a) {
          this.active++
          this.steps++
        }
      } else if (this.steps === 1) {
        // 修改手机号
        const a = 1 + 1 === 2
        if (a) {
          this.active = this.active + 2
          this.steps++

          setTimeout(() => {
            this.$router.go(0)
          }, 5000)
        }
        // this.$refs.profileForm.validate(valid => {
        //   if (valid) {
        //     this.loading = true
        //     // 登录
        //     this.$store.dispatch('LoginByUserPhone', this.phoneForm).then(() => {
        //       this.loading = false
        //       this.$router.push({ path: this.redirect || '/' })
        //     }).catch((response) => {
        //     // 登录失败
        //       this.$message({
        //         message: response.message,
        //         type: 'error'
        //       })
        //       this.loading = false
        //     })
        //   } else {
        //     console.log('error submit!!')
        //     return false
        //   }
        // })
      }
    },

    /**
     * 上传头像
     */
    uploadAvatar(item) {
      const formData = new FormData()
      formData.append('file', item.file)
      formData.append('name', item.file.name)
      formData.append('uid', item.file.uid)
      formData.append('id', this.profileInfo.id)

      // 类型,可以区分是文件还是图片,但目前未使用到
      // formData.append('type', 'SKU')
      // formData.append('id', this.$route.params.id)
      uploadAvatar(formData).then(res => {
        this.profileInfo.avatar = res.data
        this.$message({
          message: '上传成功',
          type: 'success'
        })
        this.avatarDialog = false
        // this.formInline.pic_data[this.picIdx].img_url = res.msg
      }).catch(err => {
        this.$message.error(err)
        console.log('上传头像失败', err)
      })
    },

    /**
     * 上传文件之前的钩子
     */
    beforeAvatarUpload(file) {
      const isIMG = file.type.substring(0, 5) === 'image'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isIMG) {
        this.$message.error('上传头像图片只能是图片!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isIMG && isLt2M
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
    }
  }
}
</script>

<style el="stylesheet/scss" lang="scss">
.profile {
  --upload-avatar-display: grid;
  .el-upload {
    display: grid;
  }
  .upload-avatar > .el-upload--picture-card {
    display: var(--upload-avatar-display);
  }
}
</style>

<style rel="stylesheet/scss" lang="scss" scoped>
.profile {
  .avatar {
    position: relative;
    border-radius: 50%;
    overflow: hidden;
    .image {
      width: 180px;
      border-radius: 50%;
      align-items: center;
      justify-content: center;
      overflow: hidden;
    }
    .profile__avatar-uploader {
      display: none;
      cursor: pointer;
      position: absolute;
      bottom: 0;
      width: 174px;
      text-align: center;
      background: rgba(0, 0, 0, 0.75);
      height: 38px;
      color: #fff;
      line-height: 41px;
    }
  }
  a {
    color: #06c;
    cursor: pointer;
  }
  .avatar:hover .profile__avatar-uploader {
    display: block;
  }
  .profile {
    border: #ddd 1px solid;
    //padding: 0 50px;
    //height: 160px !important;
    padding: 2em 2em 1em 2em;

    .avatar-txt-margin {
      margin: 0;
      width: 120px;
      text-align: center;
    }

    .summary {
      font-size: 14px;
      padding-left: 16px;
    }
  }

  .action {
    .warning {
      padding: 33px;
    }
    .safety {
      ul {
        list-style: none;
        li {
          border-top: 1px dashed #e1e6eb;
          padding: 2em;
          span {
            font-weight: normal !important;
            margin: 0px 4px !important;
          }
        }
      }
    }
  }

  .text-success {
    color: green;
  }
  .text-warning {
    color: #f90;
  }
  .upload-pard {
    .upload-avatar {
      padding-left: 2em;
    }
  }
}

.security-container {
  .profileForm {
    padding: 2em;
    .btn {
      width: 100%;
      margin-bottom: 30px;
    }
    .account-form {
    }
    .phone-form {
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

    .m-box {
      width: 130px;
      height: 130px;
      position: relative;
      margin: 100px auto;
      background: #00ed70;
      border-radius: 50%;
    }

    .m-duigou {
      width: 100px;
      height: 50px;
      position: absolute;
      left: 50%;
      top: 50%;
      margin: -40px 0 0 -50px;
      -webkit-transform: rotate(-45deg);
      transform: rotate(-45deg);
      overflow: hidden;
    }

    .m-duigou:before,
    .m-duigou:after {
      content: "";
      position: absolute;
      background: #fff;
      border-radius: 2px;
    }

    .m-duigou:before {
      width: 10px;
      height: 50px;
      left: 0;
      -webkit-animation: dgLeft 0.5s linear 0s 1 both;
      animation: dgLeft 0.3s linear 0s 1 both;
    }

    .m-duigou:after {
      width: 100px;
      height: 10px;
      bottom: 0;
      -webkit-animation: dgRight 0.5s linear 0.5s 1 both;
      animation: dgRight 0.5s linear 0.3s 1 both;
    }

    @-webkit-keyframes dgLeft {
      0% {
        top: -100%;
      }
      100% {
        top: 0%;
      }
    }

    @-webkit-keyframes dgLeft {
      0% {
        top: -100%;
      }
      100% {
        top: 0%;
      }
    }

    @-webkit-keyframes dgRight {
      0% {
        left: -100%;
      }
      100% {
        left: 0%;
      }
    }

    @-webkit-keyframes dgRight {
      0% {
        left: -100%;
      }
      100% {
        left: 0%;
      }
    }
  }
}
</style>
<style rel="stylesheet/scss" lang="scss">
.profile {
  .upload-pard {
    .diy-avatar {
      .col-avatar-list {
        border-right: 1px solid #dcdfe6;
        img {
          margin: 0.5rem;
          width: 100px;
          height: 100px;
          cursor: pointer;
        }
      }
      .col-avatar-preview {
        margin-top: 1em;
        padding-left: 1em;
        .el-image {
          box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
        }
        img {
          width: 100px;
          height: 100px;
        }
        p {
          padding-left: 20px;
        }
      }
    }
  }
}
</style>
