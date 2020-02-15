<template>
  <!-- 任务列表 -->
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
      <el-table-column prop="className" label="Bean名称" align="center" />
      <el-table-column prop="cronExpression" label="Cron表达式" align="center" />
      <el-table-column prop="jobName" label="任务名称" align="center" />
      <el-table-column prop="jobGroup" label="任务组" align="center" />
      <el-table-column prop="description" label="描述" align="center" />
      <el-table-column class-name="status-col" align="center" label="是否启用" width="110">
        <template slot-scope="scope">
          <!--   <el-tag :type="scope.row.status | statusFilter">{{ scope.row.status }}</el-tag> -->
          <el-tag v-if="scope.row.enable == 1">
            启用
          </el-tag>
          <el-tag v-else type="warning">
            禁用
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column :formatter="common.dateFormat" prop="createAt" label="添加日期" align="center" />
      <el-table-column align="center" label="操作" width="120">
        <template slot-scope="scope">
          <el-button type="primary" size="small" icon="el-icon-edit" @click="editUser(scope.row.id)">
            编辑
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
            <el-form-item label="包名+类名:" prop="className">
              <el-input v-model="userForm.className" auto-complete="off" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="Cron表达式:" prop="cronExpression">
              <el-input v-model="userForm.cronExpression" auto-complete="off" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="任务名称:" prop="jobName">
              <el-input v-model="userForm.jobName" auto-complete="off" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="任务组：" prop="jobGroup">
              <el-input v-model="userForm.jobGroup" auto-complete="off" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="是否启用:" prop="enable">
              <el-radio v-model="userForm.enable" label="1">
                启用
              </el-radio>
              <el-radio v-model="userForm.enable" label="0">
                禁用
              </el-radio>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="描述：" prop="description">
              <el-input v-model="userForm.description" auto-complete="off" />
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
  </div>
</template>

<script>

import { fetchUserList, deleteUser, getUserById, createUser, updateUser } from '@/api/user/user'
// import Pagination from '@/components/Pagination' // Secondary package based on el-pagination

export default {
  name: 'TaskLog',
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
      // dialog是否显示
      userDialog: false,
      // TODO 显示dialog标题,该字段必须存在
      dialogStatus: '',
      // 编辑或者新增dialog是否显示时间
      createDateisShow: '',
      // 模态框表单
      userForm: {
        id: '',
        className: '',
        cronExpression: '',
        jobName: '',
        jobGroup: '',
        enable: '',
        description: ''
      },
      // dialog表单中验证规则写这里
      userRules: {
        nickName: [
          { required: true, message: '请输入昵称', trigger: 'blur' },
          { pattern: /^([\w\d]){4,15}$/, message: '以字母开头，长度6-15之间，必须包含字母、数字' }
        ],
        userName: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { pattern: /^([\w\d]){4,15}$/, message: '以字母开头，长度6-15之间，必须包含字母、数字' }
        ],
        account: [
          { required: true, message: '请输入账号', trigger: 'blur' },
          { pattern: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/, message: '6-20位字符,必须包含字母,数字(除空格)' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { pattern: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/, message: '6-20位字符,必须包含字母,数字(除空格)' }
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
      })
    },
    // 编辑
    editUser(id) {
      getUserById(id).then(response => {
        this.userForm = response.data
      }).catch(errorData => {
        this.$message({
          message: '网络错误',
          type: 'error'
        })
      })
      // this.resourceTitle = '编辑资源'
      this.dialogStatus = 'update'
      this.createDateisShow = true
      this.userDialog = true
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
            }).catch(response => {
              this.$message({
                message: '请求出错,请稍后重试!',
                type: 'error'
              })
            })
          } else {
            updateUser(this.userForm).then(data => {
              this.userDialog = false
              this.$message({
                message: '修改成功',
                type: 'success'
              })
              this.getList()
            }).catch(response => {
              this.$message({
                message: '请求出错,请稍后重试!',
                type: 'error'
              })
            })
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
        console.log('taskLog-->handleDelete删除失败：' + error)
      })
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
    },
    /**
     * 添加菜单
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
    }
  }
}
</script>

