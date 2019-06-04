<template>

  <!-- 角色列表 -->
  <div class="app-container">

    <el-header style="padding:0 0 0 0px;">
      <div class="filter-container">
        <el-input v-model="listQuery.roleName" prefix-icon="el-icon-search" style="width: 150px;" class="filter-item" placeholder="角色名称" clearable @keyup.enter.native="getRightList"/>
        <!--  @click="getRightList" -->
        <el-button class="filter-item" type="primary" icon="el-icon-search" plain @click="getList">搜索</el-button>
        <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-circle-plus" plain @click="handleCreate">添加</el-button>
        <el-button class="filter-item" style="margin-left: 10px;" type="danger" icon="el-icon-delete" plain @click="handleDelete">删除</el-button>
      </div>
    </el-header>

    <el-table
      v-loading="listLoading"
      ref="multipleTable"
      :data="list"
      border
      fit
      highlight-current-row
      style="width: 100%"
      @selection-change="changeFun"
      @row-click="handleCurrentRowClick">
      <!-- <el-table-column align="center" label="角色名称">
        <template slot-scope="scope">
          <span>{{ scope.row.roleName }}</span>
        </template>
      </el-table-column> -->

      <el-table-column prop="id" align="center" type="selection"/>
      <el-table-column prop="roleName" label="角色名称" align="center"/>
      <el-table-column prop="roleDesc" label="描述" align="center"/>
      <el-table-column prop="roleCode" label="编码" align="center"/>
      <el-table-column :formatter="common.dateFormat" prop="createAt" label="创建时间" align="center"/>

      <el-table-column align="center" label="操作" width="400">
        <template slot-scope="scope">
          <el-button type="primary" size="small" icon="el-icon-edit" @click="editRoleBtn(scope.row.id)">编辑</el-button>
          <el-button type="warning" size="small" icon="el-icon-edit" @click="accessConfigBtn(scope.row.id)">权限配置</el-button>
          <el-button type="success" size="small" icon="el-icon-edit" @click="usersBtn(scope.row.id)">关联用户</el-button>
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
        @current-change="handleCurrentChange"/>
    </div>

    <!-- 模态框 -->
    <el-dialog :title="dialogTitleFilter(dialogStatus)" :visible.sync="roleDialog" width="40%" @close="closeEvent('menu')">
      <el-form ref="roleForm" :rules="roleRules" :model="roleForm" label-position="right" label-width="100px">
        <el-form-item prop="id" style="display:none;">
          <el-input v-model="roleForm.id" type="hidden" />
        </el-form-item>
        <el-row>
          <el-col :span="24">
            <el-form-item label="角色名称:" prop="roleName">
              <el-input v-model="roleForm.roleName" auto-complete="off"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="描述：" prop="roleDesc">
              <el-input v-model="roleForm.roleDesc" auto-complete="off"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="编码：" prop="roleCode">
              <el-input v-model="roleForm.roleCode" auto-complete="off"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="菜单权限：" prop="roleCode">
              <el-tree
                ref="menutTree"
                :data="menuList"
                :props="defaultProps"
                show-checkbox
                node-key="id"
                @check-change="handleCheckChange"/>
            </el-form-item>
          </el-col>
        </el-row>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="roleDialog = false">取 消</el-button>
        <el-button type="primary" @click="saveRole">确 定</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>

import { fetchRoleList, deleteRole, getRoleById, createRole, updateRole, fetchUsersList } from '@/api/user/role'
import { fetchMenuList } from '@/api/user/menu'

export default {
  name: 'Role',
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
        roleName: '',
        pageNum: 1,
        pageSize: 10
      },
      // 数据状态下拉选择
      dataState: this.$store.getters.dataState,
      // 选中的行
      multipleSelection: [],
      // 菜单列表
      menuList: [],
      // dialog是否显示
      roleDialog: false,
      // TODO 显示dialog标题,该字段必须存在
      dialogStatus: '',
      // 编辑或者新增dialog是否显示时间
      createDateisShow: '',
      // 模态框表单
      roleForm: {
        roleName: '',
        roleDesc: '',
        roleCode: '',
        parentRoleId: '0',
        createAt: '', // 创建时间
        menus: []
      },
      // tree树形定义
      defaultProps: {
        label: 'name',
        children: 'children'
      },
      // dialog表单中验证规则写这里
      roleRules: {
        roleName: [
          { required: true, message: '请输入角色名称:', trigger: 'blur' },
          { min: 2, max: 30, message: '长度在 2 到 30 个字符', trigger: 'blur' }
        ],
        roleDesc: [
          { required: true, message: '请输入描述', trigger: 'blur' }
          /* { pattern: /^[^\#\$\*\<\>\$\^\&\/\\]*$/, message: '包含特殊字符,请重新输入' } */
        ],
        roleCode: [
          { required: true, message: '请输入编码', trigger: 'blur' }
        ],
        resourceDesc: [{ required: true, message: '请输入描述', trigger: 'blur' }],
        parentResource: [{ required: true, message: '请输入父级资源', trigger: 'blur' }]
      }
    }
  },

  created() {
    this.getList()
  },

  methods: {

    /**
     * 查询角色列表
     */
    getList() {
      this.listLoading = true
      fetchRoleList(this.listQuery).then(response => {
        if (response.data) {
          this.list = response.data.records
          this.total = response.data.total
        }
        const query = {
          pageNum: 1,
          pageSize: 10000
        }
        // 获取所有菜单
        fetchMenuList(query).then(response => {
          if (response.data) {
            this.menuList = this.common.converToTree(response.data.records, '0')
          }
        })

        this.listLoading = false
      })
    },

    /**
     * 查询当前角色关联用户
     */
    usersBtn(roleId) {
      fetchUsersList(this.listQuery).then(response => {
        if (response.data) {
          this.list = response.data.records
          this.total = response.data.total
        }
      })
    },
    // 编辑
    editRoleBtn(id) {
      getRoleById(id).then(response => {
        this.roleForm = response.data
        if (!this.roleForm.menus) {
          this.roleForm.menus = []
        } else {
          // 选中菜单
          const menuIds = []
          for (let i = 0; i < this.roleForm.menus.length; i++) {
            menuIds.push(this.roleForm.menus[i].id)
          }
          this.$refs.menutTree.setCheckedKeys(menuIds)
        }
      }).catch(errorData => {
        this.$message({
          message: '网络错误',
          type: 'error'
        })
      })
      this.dialogStatus = 'update'
      this.createDateisShow = true
      this.roleDialog = true
    },

    // 保存
    saveRole() {
      this.$refs['roleForm'].validate((valid) => {
        if (valid) {
          if (this.dialogStatus === 'create') {
            createRole(this.roleForm).then(data => {
              this.roleDialog = false
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
            updateRole(this.roleForm).then(data => {
              this.roleDialog = false
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
     * 删除角色
     */
    handleDelete() {
      const sel = this.multipleSelection.map(x => x.id)
      if (!sel.length) {
        return this.$message({ message: '请选择要删除的数据', type: 'warning' })
      }

      this.$confirm('您确认您要删除选择的数据吗?', '提示', { confirmButtonText: '确定', cancelButtonText: '取消', type: 'warning' }).then(() => {
        deleteRole(sel).then(data => {
          this.$message({ message: '操作成功', type: 'success' })
          this.listQuery.pageNum = 1
          this.getList()
        })
      }).catch((error) => {
        console.log('role-->handleDelete删除失败：' + error)
      })
    },

    /**
     * 添加角色
     */
    handleCreate() {
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
      this.roleDialog = true
      // this.$refs['roleForm'].clearValidate()
    },
    closeEvent(key) {
      this.$refs['roleForm'].resetFields()
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
    /**
     * tree节点选中时
     */
    handleCheckChange(data, ischecked) {
      if (ischecked) {
        this.roleForm.menus.push({ id: data.id })
      } else {
        this.roleForm.menus.splice(this.roleForm.menus.findIndex(item => item.id === data.id), 1)
      }
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
