<template>

  <!-- 用户列表 -->
  <div class="app-container">

    <el-header style="padding:0 0 0 0px;">
      <div class="filter-container">
        <el-input v-model="listQuery.username" prefix-icon="el-icon-search" style="width: 150px;" class="filter-item" placeholder="用户名" clearable @keyup.enter.native="getRightList"/>
        <el-select v-model="listQuery.disabled" class="filter-item" style="width: 150px;" placeholder="用户状态" clearable>
          <el-option v-for="item in dataState" :key="item.value" :label="item.label" :value="item.value"/>
        </el-select>
        <!--  @click="getRightList" -->
        <el-button class="filter-item" type="primary" icon="el-icon-search" plain >搜索</el-button>
        <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-circle-plus" plain @click="handleCreate">添加</el-button>
        <el-button class="filter-item" style="margin-left: 10px;" type="danger" icon="el-icon-delete" plain @click="handleDelete">删除</el-button>
      </div>
    </el-header>

    <el-table v-loading="listLoading" :data="list" border fit highlight-current-row style="width: 100%">
      <el-table-column align="center" label="ID" width="50" type="selection" @selection-change="changeFun">
        <!-- <template slot-scope="scope">
          {{scope.$index}}
        </template> -->
      </el-table-column>

      <el-table-column width="200px" align="center" label="登录账号">
        <template slot-scope="scope">
          <span>{{ scope.row.account }}</span>
        </template>
      </el-table-column>

      <el-table-column width="200px" align="center" label="用户名">
        <template slot-scope="scope">
          <span>{{ scope.row.userName }}</span>
        </template>
      </el-table-column>

      <el-table-column width="200px" align="center" label="邮箱">
        <template slot-scope="scope">
          <span>{{ scope.row.email }}</span>
        </template>
      </el-table-column>

      <el-table-column width="200px" align="center" label="性别">
        <template slot-scope="scope">
          <span>{{ scope.row.sex }}</span>
        </template>
      </el-table-column>

      <el-table-column width="200px" align="center" label="编号">
        <template slot-scope="scope">
          <span>{{ scope.row.code }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="手机号">
        <template slot-scope="scope">
          <span>{{ scope.row.mobile }}</span>
        </template>
      </el-table-column>

      <el-table-column width="180px" align="center" label="注册日期">
        <template slot-scope="scope">
          <span>{{ scope.row.createTime | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
        </template>
      </el-table-column>

      <el-table-column class-name="status-col" align="center" label="状态" width="110">
        <template slot-scope="scope">
          <el-tag :type="scope.row.status | statusFilter">{{ scope.row.status }}</el-tag>
        </template>
      </el-table-column>

      <el-table-column align="center" label="操作" width="120">
        <template slot-scope="scope">
          <el-button type="primary" size="small" icon="el-icon-edit" @click="handleUpdate(scope.row)">编辑</el-button>
        </template>
      </el-table-column>

    </el-table>
    <!-- 分页 -->
    <div class="pagination-container">
      <el-pagination
        :current-page.sync="listQuery.pageNum"
        :page-sizes="[10, 20, 50, 100]"
        :page-size="100"
        :total="400"
        layout="total, sizes, prev, pager, next, jumper"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"/>
    </div>

    <!-- dialog表单区域 -->
    <el-dialog :title="dialogTitleFilter(dialogStatus)" :visible.sync="dialogFormVisible" width="550px" @close="closeEvent">
      <el-form ref="tempDialog" :rules="rules" :model="tempDialog" label-position="right" label-width="80px" style="width:400px; margin-left:50px;">

        <!-- <el-form-item label="用户编号" prop="id">
          <el-input v-model="temp.id" :disabled="dialogStatus=='update'"></el-input>
        </el-form-item> -->
        <el-form-item label="账号" prop="userCode">
          <el-input v-model="tempDialog.userCode" :disabled="true"/>
        </el-form-item>
        <el-form-item label="用户名" prop="username">
          <el-input v-model="tempDialog.username"/>
        </el-form-item>
        <el-form-item v-if="dialogStatus=='create'" label="登录密码" prop="password">
          <el-input v-model="tempDialog.password" type="password"/>
        </el-form-item>
        <!-- <el-form-item label="证件编号" prop="identity">
          <el-input :disabled="dialogStatus=='update'" v-model="tempDialog.identity"/>
        </el-form-item> -->

        <!-- <el-form-item label="拼音码" prop="pinyin">
          <el-input v-model="temp.pinyin"></el-input>
        </el-form-item> -->
        <el-form-item label="email" prop="email">
          <el-input v-model="tempDialog.email"/>
        </el-form-item>
        <el-form-item label="手机" prop="phone">
          <el-input v-model="tempDialog.phone"/>
        </el-form-item>
        <!-- <el-form-item label="所属角色" prop="roleList">
          <el-checkbox-group v-model="tempDialog.checkRole">
            <el-checkbox v-for="(val,index) in roleList" :label="val.roleCode" :key="index">{{ val.roleName }}</el-checkbox>
          </el-checkbox-group>
        </el-form-item> -->
        <!-- <el-form-item label="启用" prop="disabled">
          <el-switch v-model="value5" ctive-color="#13ce66" inactive-color="#ff4949" active-value="0" inactive-value="1"> </el-switch>
        </el-form-item> -->

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogHandleCancel">取消</el-button>
        <el-button v-if="dialogStatus=='create'" type="primary" @click="createData">确定</el-button>
        <el-button v-else type="primary" @click="dialogUpdateData">保存</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>

import { fetchUserList, deleteUser, updateUser } from '@/api/system/user'
// import Pagination from '@/components/Pagination' // Secondary package based on el-pagination

export default {
  name: 'UserList',
  // 注册组件
  // components: { Pagination },

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
      list: null,
      total: 0,
      listLoading: true,
      listQuery: {
        pageNum: 1,
        limit: 20
      },
      // 数据状态下拉选择
      dataState: this.$store.getters.dataState,
      // 选中的行
      multipleSelection: [],

      //* *************************dialog表单区域**************************
      // TODO 显示dialog标题,该字段必须存在
      dialogStatus: '',

      // dialog是否显示,该字段必须存在
      dialogFormVisible: false,

      // code码是否可编辑
      codeIsDisabled: false,

      // dialog表单绑定的数据
      tempDialog: {
        checkRole: [],
        userCode: '',
        id: '',
        deptID: '',
        deptName: '',
        username: '',
        password: '',
        identity: '',
        // pinyin: '',
        email: '',
        phone: '',
        disabled: 0
      },

      // dialog表单中验证规则写这里
      rules: {
        id: [
          { required: true, message: '请输入用户编号', trigger: 'blur' },
          { min: 1, max: 50, message: '长度在 2 到 50 个字符', trigger: 'blur' }
        ],
        userCode: [
          { required: true, message: '请输入用户账号', trigger: 'blur' },
          { pattern: /^([\w\d]){4,15}$/, message: '以字母开头，长度6-15之间，必须包含字母、数字' }
          // { validator: sNameRule1, trigger: 'blur' }
        ],
        identity: [
          { required: true, message: '请输入证件编号', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { pattern: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/, message: '6-20位字符,必须包含字母,数字(除空格)' }
        ],
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { pattern: /^([\u4e00-\u9fa5]{2,10})$/, message: '2-10位汉字' }
        ],
        pinyin: [{ required: true, message: '请输入拼音码', trigger: 'blur' }],
        email: [
          { required: true, message: '请输入email', trigger: 'blur' },
          { pattern: /^(\w)+@(\w){2,6}\.+(\w){2,4}$/, message: '邮箱格式不正确' }],
        phone: [
          { required: true, message: '请输入手机', trigger: 'blur' },
          { pattern: /^(((13[0-9]{1})|(14[5,7,9])|(15[0-9]{1})|(17[0,1,3,5,6,7,8])|(18[0-9]{1}))+\d{8})$/, message: '电话格式不正确' }
        ]
      }
      //* *************************dialog表单区域**************************
    }
  },

  created() {
    this.getList()
  },

  methods: {

    /**
       * 查询用户列表
       */
    getList() {
      this.listLoading = true
      fetchUserList(this.listQuery).then(response => {
        console.log(response)

        this.list = response.records
        this.total = response.total
        this.listLoading = false
      })
    },
    handleSizeChange(val) {
      this.listQuery.limit = val
      this.getList()
    },
    // 当前页变更事件
    handleCurrentChange(val) {
      this.listQuery.pageNum = val
      this.getRightList()
    },

    // *************************dialog表单区域************************
    /**
     * 添加用户
     */
    handleCreate() {
      if (this.listQuery.treeId) {
        this.codeIsDisabled = false
        this.dialogStatus = 'create'
        this.dialogFormVisible = true
        this.$nextTick(() => {
          this.$refs['tempDialog'].clearValidate()
        })
      } else {
        this.$message({
          message: '请先选择部门',
          type: 'warning'
        })
      }
    },

    /**
     * 弹出dialog窗体 更新
     */
    handleUpdate(row) {
      // Object.assign({}, row) // copy obj
      /*  getUser(row.userCode).then(response => {
        this.codeIsDisabled = true
        if (response.data.checkRole) {
          if (response.data.checkRole.indexOf(',')) {
            row.checkRole = response.data.checkRole.split(',')
          } else {
            row.checkRole = response.data.checkRole
          }
        } else {
          row.checkRole = []
        }
        row.password = ''
        this.temp = { ...row }
      }).catch(data => {
        console.log(row)
        console.log('错误:row')
      }) */

      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['tempDialog'].clearValidate()
      })
    },

    /**
     * 设置显示gialog的标题
     */
    dialogTitleFilter(val) {
      const value = this.$store.getters.dialogTitleText(val)
      return value
    },

    /**
     * 关闭dialog表单时动作
     */
    closeEvent() {
      console.log('closeEvent')
      this.tempDialog.last_login_ip = ''
      this.tempDialog.checkRole = []
      this.tempDialog.last_login_at = ''
      this.tempDialog.id = ''
      this.tempDialog.create_at = ''
      this.$refs['tempDialog'].resetFields()
    },

    /**
     * 取消按钮
     */
    dialogHandleCancel() {
      this.$refs['tempDialog'].resetFields()
      this.dialogFormVisible = false
    },

    /**
     * 向服务端提交update数据
     */
    dialogUpdateData() {
      this.$refs['temp'].validate(valid => {
        if (valid) {
          // const postData = Object.assign({}, this.temp)
          // const { id, username, email, pinyin, identity, phone } = { ...this.temp }
          // const postData = { id, username, email, pinyin, identity, phone }
          this.temp.checkRole = this.temp.checkRole.join(',')
          const postData = Object.assign({}, this.temp)
          postData.password = ''
          updateUser(postData).then(data => {
            this.list.splice(this.list.findIndex(v => v.id === this.temp.id), 1, postData)
            this.dialogFormVisible = false
            this.$refs['temp'].resetFields()
            this.$message({
              message: '修改成功',
              type: 'success'
            })
          })
        }
      })
    },

    // *************************dialog表单区域END************************

    /**
     * 复选框change事件
     */
    changeFun(selection) {
      this.multipleSelection = selection
    },
    /**
     * 删除用户
     */
    handleDelete() {
      const sel = this.multipleSelection.map(x => x.userCode)
      if (!sel.length) {
        return this.$message({ message: '请选择要删除的数据', type: 'warning' })
      }

      this.$confirm('您确认您要删除选择的数据吗?', '提示', { confirmButtonText: '确定', cancelButtonText: '取消', type: 'warning' }).then(() => {
        deleteUser(sel).then(data => {
          for (const i of sel) {
            this.list.splice(this.list.findIndex(v => v.id === i), 1)
          }
          this.multipleSelection.splice(0, this.multipleSelection.length)
          this.$message({ message: '操作成功', type: 'success' })
        })
      }).catch(() => { })
    }
  }
}
</script>

<style scoped>
.edit-input {
  padding-right: 100px;
}
.cancel-btn {
  position: absolute;
  right: 15px;
  top: 10px;
}
</style>
