<template>

  <div class="me">
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
          <span >昵称&nbsp;&nbsp;：GuoGuang </span>
        </p>
        <p class="ng-binding">
          <span >账号ID ： 1082442134685147</span>
        </p>
        <p class="ng-binding">
          <span >登录账号：183168****@qq.com</span>
        </p>
        <p class="ng-binding">
          <span >注册时间 ： 2015年9月13日 下午4:58:00</span>
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
              您已绑定了手机158****4150 [您的手机号可以直接用于登录、找回密码等]
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
// import { fetchMenuList, deleteMenu, getMenuById, createMenu, updateMenu } from '@/api/system/menu'

export default {
  name: 'Me',
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
      levelList: [{}, {}, {}],
      innerVisible: false,
      list: null,
      total: 0,
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
      // TODO 显示dialog标题,该字段必须存在
      dialogStatus: '',
      // 编辑或者新增dialog是否显示时间
      createDateisShow: '',
      parentTreeData: [], // 树形菜单
      parentName: '', // 表单冗余字段
      // 模态框表单
      menuForm: {
        id: '',
        name: '', // 资源名称
        path: '', // 资源路径
        icon: '', // 图标
        description: '', // 描述
        parentId: '', // 父级资源
        createAt: '', // 创建时间
        status: '' // 显示
      },
      // dialog表单中验证规则写这里
      menuRules: {
        name: [
          { required: true, message: '请输入资源名称:', trigger: 'blur' },
          { min: 2, max: 30, message: '长度在 2 到 30 个字符', trigger: 'blur' }
          /* { pattern: /^[^\#\$\*\<\>\$\^\&\/\\]*$/, message: '包含特殊字符,请重新输入' } */
        ],
        /* resourceIcon: [
          { required: true, message: '请输入图标', trigger: 'blur' }
        ], */
        path: [
          { required: true, message: '请输入链接URL', trigger: 'blur' },
          { min: 2, max: 50, message: '长度在 3位以上', trigger: 'blur' }
          /* { pattern: /^[^\#\$\*\<\>\$\^\&\/\\]*$/, message: '包含特殊字符,请重新输入' } */
        ],
        resourceDesc: [
          { required: true, message: '请输入描述', trigger: 'blur' }
        ],
        parentResource: [
          { required: true, message: '请输入父级资源', trigger: 'blur' }
        ]
      }
    }
  },

  created() {
    // this.getList()
  },

  methods: {}
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.me {
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
