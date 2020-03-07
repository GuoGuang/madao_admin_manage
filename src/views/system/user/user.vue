<template>
  <!-- 用户列表 -->
  <div class="app-container">
    <el-header style="padding:0 0 0 0px;">
      <div class="filter-container">
        <el-input v-model="listQuery.userName" prefix-icon="el-icon-search" style="width: 150px;" class="filter-item" placeholder="用户名" clearable @keyup.enter.native="getRightList" />
        <el-select v-model="listQuery.status" class="filter-item" style="width: 150px;" placeholder="状态" clearable>
          <el-option v-for="item in dataState" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
        <!--  @click="getRightList" -->
        <el-button class="filter-item" type="primary" icon="el-icon-search" plain @click="getList">
          搜索
        </el-button>
        <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-circle-plus" plain @click="handleCreate">
          添加
        </el-button>
        <el-button class="filter-item" style="margin-left: 10px;" type="danger" icon="el-icon-delete" plain @click="handleDelete">
          删除
        </el-button>
      </div>
    </el-header>

    <el-table
      ref="multipleTable"
      v-loading="listLoading"
      :data="list"
      border
      fit
      highlight-current-row
      style="width: 100%"
      @selection-change="changeFun"
      @row-click="handleCurrentRowClick"
    >
      <el-table-column prop="id" label="id" align="center" type="selection" />
      <el-table-column prop="userName" label="用户名" align="center" />
      <el-table-column prop="account" label="登录账号" align="center" />
      <el-table-column prop="nickName" label="昵称" align="center" />
      <el-table-column prop="email" label="邮箱" align="center" />
      <el-table-column prop="sex" label="性别" align="center" width="70">
        <template slot-scope="scope">
          <p v-if="scope.row.sex == 1">
            男
          </p>
          <p v-if="scope.row.sex == 2">
            女
          </p>
        </template>
      </el-table-column>
      <el-table-column prop="phone" label="手机号" align="center" width="110" />
      <el-table-column :formatter="common.dateFormat" prop="createAt" label="注册日期" align="center" width="160" />
      <el-table-column class-name="status-col" align="center" label="状态" width="90">
        <template slot-scope="scope">
          <!--   <el-tag :type="scope.row.status | statusFilter">{{ scope.row.status }}</el-tag> -->
          <el-tag v-if="scope.row.status == 1">
            正常
          </el-tag>
          <el-tag v-else type="warning">
            禁用
          </el-tag>
        </template>
      </el-table-column>

      <el-table-column align="center" label="操作" width="250">
        <template slot-scope="scope">
          <el-button type="primary" size="small" icon="el-icon-edit" @click="editUser(scope.row.id)">
            编辑
          </el-button>
          <el-button type="warning" size="small" icon="el-icon-edit" @click="viewRole(scope.row.id)">
            查看角色
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination-container">
      <el-pagination
        :current-page.sync="listQuery.pageNum"
        :page-sizes="[10, 20, 50, 100]"
        :page-size="listQuery.pageSize"
        :total="total"
        layout="total, sizes, prev, pager, next, jumper"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>

    <!-- 模态框 -->
    <el-dialog :title="dialogTitleFilter(dialogStatus)" :visible.sync="userDialog" @close="closeEvent">
      <el-form ref="userForm" :rules="userRules" :model="userForm" status-icon label-position="right" label-width="8em">
        <el-form-item prop="id" style="display:none;">
          <el-input v-model="userForm.id" type="hidden" />
        </el-form-item>
        <el-row>
          <el-col :span="24">
            <el-form-item label="用户名:" prop="userName">
              <el-input v-model="userForm.userName" :disabled="dialogStatus == 'update'?true:false" auto-complete="off" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="昵称:" prop="nickName">
              <el-input v-model="userForm.nickName" auto-complete="off" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="账号:" prop="account">
              <el-input v-model="userForm.account" :disabled="dialogStatus == 'update'?true:false" auto-complete="off" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="性别:" prop="sex">
              <el-radio v-model="userForm.sex" :checked="userForm.sex == 1" label="1">
                男
              </el-radio>
              <el-radio v-model="userForm.sex" :checked="userForm.sex == 2" label="2">
                女
              </el-radio>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="邮箱：" prop="email">
              <el-input v-model="userForm.email" auto-complete="off" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="手机号：" prop="phone">
              <el-input v-model="userForm.phone" auto-complete="off" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="联系地址：" prop="contactAddress">
              <el-input v-model="userForm.contactAddress" auto-complete="off" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="启用：" prop="status">
              <el-switch
                v-model="userForm.status"
                :active-value="1"
                :inactive-value="0"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="角色：" prop="roles">
              <el-checkbox-group v-model="roles">
                <el-checkbox v-for="role in roleList" :key="role.id" :label="role.id" :value="role.id" @change="changeCheckbox($event,role)">
                  {{ role.roleName }}
                </el-checkbox>
              </el-checkbox-group>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="userDialog = false">
          取 消
        </el-button>
        <el-button type="primary" @click="saveUser">
          确 定
        </el-button>
      </div>
    </el-dialog>

    <!-- 模态框 -->
    <el-dialog :visible.sync="userRoleDialog" title="查看角色">
      <el-table
        :data="userRoles"
        border
        fit
        highlight-current-row
        style="width: 100%"
      >
        <el-table-column property="roleName" label="角色名称" width="150" align="center" />
        <el-table-column property="roleCode" label="编码" width="200" align="center" />
        <el-table-column :formatter="common.dateFormat" prop="createAt" label="创建时间" align="center" />
      </el-table>
    </el-dialog>
  </div>
</template>

<script>

import { fetchUserList, fetchUseRoles, deleteUser, getUserById, createUser, updateUser } from '@/api/user/user'
import { fetchRoleList } from '@/api/user/role'
// import Pagination from '@/components/Pagination' // Secondary package based on el-pagination

export default {
  name: 'User',
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
        userName: '',
        status: '',
        pageNum: 1,
        pageSize: 10
      },
      // 数据状态下拉选择
      dataState: this.$store.getters.dataState,
      // 选中的行
      multipleSelection: [],
      // 用户的角色
      userRoles: [],
      // 编辑页面显示可选角色列表
      roleList: [],
      // dialog是否显示
      userDialog: false,
      userRoleDialog: false,
      // TODO 显示dialog标题,该字段必须存在
      dialogStatus: '',
      // 编辑或者新增dialog是否显示时间
      createDateisShow: '',
      roles: [], // 选中的角色
      // 模态框表单
      userForm: {
        id: '',
        nickName: '',
        userName: '',
        account: '',
        password: '',
        email: '',
        phone: '',
        contactAddress: '',
        status: '',
        sex: '',
        roles: [] // 经过处理 选中的角色
      },
      // dialog表单中验证规则写这里
      userRules: {
        nickName: [
          { required: true, message: '请输入昵称', trigger: 'blur' },
          { pattern: /([\w\d\u4e00-\u9fa5]){3,15}$/, message: '以字母开头，长度3-15之间，必须包含字母、数字' }
        ],
        userName: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { pattern: /^([\u4e00-\u9fa5\w\d]){3,15}$/, message: '长度3-15之间' }
        ],
        account: [
          { required: true, message: '请输入账号', trigger: 'blur' },
          { pattern: /^([a-z]){5,20}$/, message: '5-20位字符,(除空格)' }
        ],
        email: [
          { required: true, message: '请输入email', trigger: 'blur' },
          { pattern: /^(\w)+@(\w){2,6}\.+(\w){2,4}$/, message: '邮箱格式不正确' }],
        phone: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { pattern: /^(((13[0-9]{1})|(14[5,7,9])|(15[0-9]{1})|(17[0,1,3,5,6,7,8])|(18[0-9]{1}))+\d{8})$/, message: '电话格式不正确' }
        ]
      }
    }
  },

  created() {
    this.getList()

    // 初始化角色列表
    const queryRoles = {
      pageNum: 1,
      pageSize: 10000
    }
    fetchRoleList(queryRoles).then(response => {
      this.roleList = { ...response.data.results }
    }).catch(errorData => {
      this.$message({
        message: errorData,
        type: 'error'
      })
    })
  },

  methods: {

    /**
     * 查询用户列表
     */
    getList() {
      this.listLoading = true
      fetchUserList(this.listQuery).then(response => {
        if (response.data) {
          this.list = response.data.results
          this.total = response.data.total
        }
        this.listLoading = false
      }).catch(errorData => {})
    },

    /**
     * 查看角色
     */
    viewRole(id) {
      fetchUseRoles(id).then(response => {
        this.userRoles = response.data
      }).catch(errorData => {})
      this.userRoleDialog = true
    },

    /**
     * 编辑
     */
    editUser(id) {
      getUserById(id).then(response => {
        this.dialogStatus = 'update'
        this.createDateisShow = true
        this.userDialog = true

        this.$nextTick(() => {
          this.userForm = { ...response.data }
          this.roles = []
          if (this.userForm.roles) {
            this.userForm.roles.forEach((role) => {
              this.roles.push(role.id)
            })
          } else {
            this.userForm.roles = []
            this.roles = []
          }
        })
      }).catch(errorData => {})
    },

    // 保存
    saveUser() {
      this.$refs['userForm'].validate((valid) => {
        if (valid) {
          if (this.dialogStatus === 'create') {
            createUser(this.userForm).then(data => {
              this.userDialog = false
              this.$message({
                message: '添加成功',
                type: 'success'
              })
              this.getList()
            }).catch(response => {})
          } else {
            updateUser(this.userForm).then(data => {
              this.userDialog = false
              this.$message({
                message: '修改成功',
                type: 'success'
              })
              this.getList()
            }).catch(response => {})
          }
        } else {
          this.$message({
            message: '请正确填写表单！',
            type: 'warning'
          })
          return false
        }
      })
    },

    /**
     * 删除用户
     */
    handleDelete() {
      const sel = this.multipleSelection.map(x => x.id)
      console.log(sel)
      if (!sel.length) {
        return this.$message({ message: '请选择要删除的数据', type: 'warning' })
      }

      this.$confirm('您确认您要删除选择的数据吗?', '提示', { confirmButtonText: '确定', cancelButtonText: '取消', type: 'warning' }).then(() => {
        deleteUser(sel).then(data => {
          this.$message({ message: '操作成功', type: 'success' })
          this.listQuery.pageNum = 1
          this.getList()
        })
      }).catch((error) => {
        console.log('user-->handleDelete删除失败：' + error)
      })
    },

    /**
     * 多选框选中
     */
    changeCheckbox(ischecked, role) {
      if (ischecked) {
        this.userForm.roles.push(role)
      } else {
        this.userForm.roles.splice(this.userForm.roles.findIndex(item => item.id === role.id), 1)
      }
    },

    /**
     * 添加用户
     */
    handleCreate() {
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
      this.userDialog = true
      // this.$refs['userForm'].clearValidate()
    },
    /**
     * 模态框关闭时
     */
    closeEvent() {
      this.$refs['userForm'].resetFields()
      this.roles = []
    },
    // 显示gialog的标题
    dialogTitleFilter(val) {
      const value = this.$store.getters.dialogTitleText(val)
      return value
    },
    /**
     * 复选框change事件
     */
    changeFun(selection) {
      this.multipleSelection = selection
    },
    /**
     * 点击当前行任意地方选中当前行
     */
    handleCurrentRowClick(selection) {
      this.$refs.multipleTable.toggleRowSelection(selection)
    },
    // pageSize变更事件
    handleSizeChange(val) {
      this.listQuery.pageSize = val
      this.pageNum = 1
      this.getList()
    },
    // 当前页变更事件
    handleCurrentChange(val) {
      this.listQuery.pageNum = val
      this.getList()
    }
  }
}
</script>

