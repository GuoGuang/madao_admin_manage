<template>

  <div class="profile">
    <el-row class="profile">
      <el-col :span="2">
        <div class="avatar">
          <p>
            <img
              width="120"
              height="120"
              src="https://oss.aliyuncs.com/aliyun_id_photo_bucket/default_handsome.jpg"
            >
          </p>
          <p class="avatar-txt-margin">
            <a href="/">修改头像</a>
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
          <span >注册时间 ：{{ common.dateFormat(profileInfo.createAt) }}</span>
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
          </li>
          <li>
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
          </li>
          <li>
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
          </li>
          <li>
            <el-col :span="3">
              注销账号
            </el-col>
            <el-col :span="17">
              如果您不再使用此账号，可以将其注销。账号成功注销后，其下所有服务、数据及隐私信息将会被删除并将无法恢复
            </el-col>
            <el-col :span="4">
              <a>注销账号</a>
            </el-col>
          </li>
        </ul>
      </el-row>

    </div>

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
      profileInfo: {},
      account: this.$store.getters.account,
      listLoading: true,
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
     * 上传头像
     */
    uploadAvatar(id) {
      uploadAvatar(id).then(response => {
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
    }
  }
}
</script>

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
          padding: 33px;
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
