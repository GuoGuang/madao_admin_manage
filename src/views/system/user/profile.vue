<template>

  <div class="profile">
    <el-row class="profile">
      <el-col :span="2">
        <div class="avatar">
          <p>
            <img
              :src="profileInfo.avatar"
              width="120"
              height="120"
            >
          </p>
          <p class="avatar-txt-margin">
            <a @click="openAvatarDialog">修改头像</a>
          </p>
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
                <a>修改</a>
              </el-col>
            </el-row>
          </li>

          <li>
            <el-row>
              <el-col :span="3">
                手机绑定
              </el-col>
              <el-col :span="17">
                您已绑定了手机{{ profileInfo.phone }} [您的手机号可以直接用于登录、找回密码等]
              </el-col>
              <el-col :span="4" class="text-success">
                <i class="el-icon-success"/> 已设置
                <span>|</span>
                <a>修改</a>
              </el-col>
            </el-row>
          </li>
          <li>
            <el-row>
              <el-col :span="3">
                密保问题
              </el-col>
              <el-col :span="17">
                建议您设置三个容易记住，且最不容易被他人获取的问题及答案，更有效保障您的密码安全。
              </el-col>
              <el-col :span="4" class="text-warning">
                <i class="el-icon-warning"/> 未设置
                <span>|</span>
                <a>修改</a>
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
                <a>注销账号</a>
              </el-col>
            </el-row>
          </li>
        </ul>
      </el-row>

    </div>

    <!-- 上传头像模态框 -->
    <el-dialog :visible.sync="avatarDialog" title="修改头像">
      <el-tabs v-model="activeName" type="card" >
        <el-tab-pane label="个性头像" name="first">暂无</el-tab-pane>
        <el-tab-pane label="本地头像" name="second" style="padding: 1em 19em;">
          <p>从电脑里挑选一张好图作为头像吧</p>
          <el-upload
            ref="upload"
            :before-upload="beforeAvatarUpload"
            :http-request="uploadAvatar"
            :auto-upload="false"

            class="upload-demo"
            action=""
            accept="image/*">
            <el-button size="small" type="primary" >选择图片</el-button>
            <div slot="tip" class="el-upload__tip">支持jpg/png格式图片，文件需小于2M</div>
          </el-upload>

        </el-tab-pane>
      </el-tabs>

      <div slot="footer" class="dialog-footer">
        <el-button @click="roleDialog = false">取 消</el-button>
        <el-button type="primary" @click="saveAvatar">确 定</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import { updateUser, updatePassword, uploadAvatar } from '@/api/user/profile'

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

  data() {
    return {
      avatarUrl: '',
      profileInfo: {},
      activeName: 'first',
      account: this.$store.getters.account,
      listLoading: true,
      // 上传头像框
      avatarDialog: false,
      /**
       * 树形列表默认树形
       */
      defaultProps: {
        children: 'children',
        label: 'name'
      },
      // dialog是否显示
      menuDialog: false,
      // 模态框表单
      menuForm: {

      },
      // dialog表单中验证规则写这里
      menuRules: {
        name: [
          { required: true, message: '请输入资源名称:', trigger: 'blur' },
          { min: 2, max: 30, message: '长度在 2 到 30 个字符', trigger: 'blur' }
          /* { pattern: /^[^\#\$\*\<\>\$\^\&\/\\]*$/, message: '包含特殊字符,请重新输入' } */
        ]
      }
    }
  },

  created() {
    this.profileInfo = this.$store.getters.user
  },

  methods: {
    /**
     * 打开上传头模态框
     */
    openAvatarDialog() {
      this.avatarDialog = true
    },

    /**
     * 手动上传
     */
    saveAvatar() {
      this.$refs.upload.submit()
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

    updateUser(id) {
      updateUser(id).then(response => {
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
     * 头像上传成功后
     */
    handleAvatarSuccess(res, file) {
      this.avatarUrl = URL.createObjectURL(file.raw)
    },

    /**
     * 上传文件之前的钩子
     */
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    }
  }
}
</script>

<style el="stylesheet/scss" lang="scss">
.profile {
  .el-upload{
    display: grid;
  }
}
</style>

<style rel="stylesheet/scss" lang="scss" scoped>
.profile {

  a {
    color: #06c;
    cursor: pointer;
  }
  .profile {
    border: #ddd 1px solid;
    //padding: 0 50px;
    //height: 160px !important;
    padding: 2em 2em 1em 2em;
    .avatar {
      img {
        border-radius: 8px;
      }
    }
    .avatar-txt-margin {
      margin: 0;
      width: 120px;
      text-align: center;
    }

    .summary {
      font-size: 14px;
      padding-top: 11px;
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
          padding: 1em;
          span {
            color: #ccc !important;
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
}
</style>
