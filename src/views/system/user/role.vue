<template>
  <!-- 角色列表 -->
  <div class="app-container">
    <el-header style="padding:0 0 0 0px;">
      <div class="filter-container">
        <el-input v-model="listQuery.roleName" prefix-icon="el-icon-search" style="width: 150px;" class="filter-item" placeholder="角色名称" clearable @keyup.enter.native="getRightList" />
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
      <!-- <el-table-column align="center" label="角色名称">
        <template slot-scope="scope">
          <span>{{ scope.row.roleName }}</span>
        </template>
      </el-table-column> -->

      <el-table-column prop="id" align="center" type="selection" />
      <el-table-column prop="roleName" label="角色名称" align="center" />
      <el-table-column prop="roleDesc" label="描述" align="center" />
      <el-table-column prop="roleCode" label="编码" align="center" />
      <el-table-column :formatter="common.dateFormat" prop="createAt" label="创建时间" align="center" />

      <el-table-column align="center" label="操作" width="400">
        <template slot-scope="scope">
          <el-button type="primary" size="small" icon="el-icon-edit" @click="editRoleBtn(scope.row.id)">
            编辑
          </el-button>
          <el-button type="success" size="small" icon="el-icon-edit" @click="usersBtn(scope.row.id)">
            关联用户
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
    <el-dialog :title="dialogTitleFilter(dialogStatus)" :visible.sync="roleDialog" width="40%" @close="closeEvent('resources')">
      <el-form ref="roleForm" :rules="roleRules" :model="roleForm" status-icon label-position="right" label-width="100px">
        <el-form-item prop="id" style="display:none;">
          <el-input v-model="roleForm.id" type="hidden" />
        </el-form-item>
        <el-row>
          <el-col :span="24">
            <el-form-item label="角色名称:" prop="roleName">
              <el-input v-model="roleForm.roleName" auto-complete="off" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="描述：" prop="roleDesc">
              <el-input v-model="roleForm.roleDesc" auto-complete="off" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="编码：" prop="roleCode">
              <el-input v-model="roleForm.roleCode" auto-complete="off" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="菜单权限：" prop="roleCode">
              <el-tree
                ref="resourceTree"
                :data="resourceList"
                :props="defaultProps"
                show-checkbox
                node-key="id"
              />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="roleDialog = false">
          取 消
        </el-button>
        <el-button type="primary" @click="saveRole">
          确 定
        </el-button>
      </div>
    </el-dialog>

    <!-- 关联用户模态框 -->
    <el-dialog :visible.sync="roleUsersDialog" title="查看用户">
      <el-table
        :data="roleUsers"
        border
        fit
        highlight-current-row
        style="width: 100%"
      >
        <el-table-column property="userName" label="用户名称" width="150" align="center" />
        <el-table-column property="account" label="账号" width="160" align="center" />
        <el-table-column property="phone" label="手机号" width="160" align="center" />
        <el-table-column property="status" label="状态" width="70" align="center">
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
        <el-table-column :formatter="common.dateFormat" prop="createAt" label="创建时间" align="center" />
      </el-table>
    </el-dialog>
  </div>
</template>

<script>

import { fetchRoleList, deleteRole, getRoleById, createRole, updateRole, fetchUsersList } from '@/api/user/role'
import { fetchResourceList } from '@/api/user/resource'

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
      // 查看角色关联的用户
      roleUsersDialog: false,
      // 当前角色的用户
      roleUsers: [],
      // 菜单列表
      resourceList: [],
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
        resources: []
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
          this.list = response.data.results
          this.total = response.data.total
        }
        const query = {
          pageNum: 1,
          pageSize: 10000
        }
        // 获取所有菜单
        fetchResourceList(query).then(response => {
          if (response.data) {
            this.resourceList = this.common.converToTree(response.data, '0')
          }
        })

        this.listLoading = false
      })
    },

    /**
     * 查询当前角色关联用户
     */
    usersBtn(roleId) {
      fetchUsersList(roleId).then(response => {
        this.roleUsers = response.data
        this.roleUsersDialog = true
      })
    },
    // 编辑
    editRoleBtn(id) {
      getRoleById(id).then(response => {
        this.dialogStatus = 'update'
        this.createDateisShow = true
        this.roleDialog = true

        this.$nextTick(() => {
          this.roleForm = response.data
          if (!this.roleForm.resources) {
            this.roleForm.resresourcesource = []
          } else {
          // 选中菜单
            const resourceIds = []
            for (let i = 0; i < this.roleForm.resources.length; i++) {
              resourceIds.push(this.roleForm.resources[i].id)

              this.$refs.resourceTree.setChecked(this.roleForm.resources[i].id, true)
            }
            // var treeResource = this.common.converTreeData(this.roleForm.resources, '0')
            // this.chooseTreeNode(treeResource)

            // this.$refs.resourceTree.setCheckedKeys(resourceIds)
          }
        })
      }).catch(errorData => {})
    },
    /**
     * 选中tree节点，解决动态添加节点时，打开这个编辑页默认选中新添加数据的选中问题
     */
    chooseTreeNode(treeResource) {
      for (let i = 0; i < treeResource.length; i++) {
        if (treeResource[i].children) {
          this.chooseTreeNode(treeResource[i].children)
        } else {
          this.$refs.resourceTree.setChecked(treeResource[i].id, true)
        }
      }
    },
    // 保存
    saveRole() {
      this.$refs['roleForm'].validate((valid) => {
        if (valid) {
          this.roleForm.resources = this.$refs.resourceTree.getCheckedNodes(false, true)
          if (this.dialogStatus === 'create') {
            createRole(this.roleForm).then(data => {
              this.roleDialog = false
              this.$message({
                message: '添加成功',
                type: 'success'
              })
              this.getList()
            })
          } else {
            updateRole(this.roleForm).then(data => {
              this.roleDialog = false
              this.$message({
                message: '修改成功',
                type: 'success'
              })
              this.getList()
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
      this.roleForm.resources = []
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
