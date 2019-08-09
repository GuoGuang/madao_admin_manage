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
                <el-link href="" target="_blank" style="font-size: inherit;">修改</el-link>
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
                <el-link href="" target="_blank" style="font-size: inherit;">修改</el-link>
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
                <el-link href="" target="_blank" style="font-size: inherit;">修改</el-link>
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
                <el-link href="" target="_blank" style="font-size: inherit;">注销账号</el-link>
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
      activeName: '1',
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
