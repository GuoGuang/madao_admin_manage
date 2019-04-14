<template>

  <!-- 菜单列表 -->
  <div class="app-container">

    <el-header style="padding:0 0 0 0px;">
      <div class="filter-container">
        <el-input v-model="listQuery.name" prefix-icon="el-icon-search" style="width: 150px;" class="filter-item" placeholder="菜单名称" clearable @keyup.enter.native="getRightList"/>
        <el-select v-model="listQuery.status" class="filter-item" style="width: 150px;" placeholder="状态" clearable>
          <el-option v-for="item in dataState" :key="item.value" :label="item.label" :value="item.value"/>
        </el-select>
        <!--  @click="getRightList" -->
        <el-button class="filter-item" type="primary" icon="el-icon-search" plain @click="getList">搜索</el-button>
        <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-circle-plus" plain @click="handleCreate">添加</el-button>
        <el-button class="filter-item" style="margin-left: 10px;" type="danger" icon="el-icon-delete" plain @click="handleDelete">删除</el-button>
      </div>
    </el-header>

    <el-table v-loading="listLoading" :data="list" border fit highlight-current-row style="width: 100%" @selection-change="changeFun">
      <el-table-column align="center" label="ID" width="50" type="selection">
        <!-- <template slot-scope="scope">
          {{scope.$index}}
        </template> -->
      </el-table-column>

      <el-table-column align="center" label="菜单名称">
        <template slot-scope="scope">
          <span>{{ scope.row.name }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="描述">
        <template slot-scope="scope">
          <span>{{ scope.row.description }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="路径">
        <template slot-scope="scope">
          <span>{{ scope.row.path }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="状态">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.status == 1">正常</el-tag>
          <el-tag v-else type="warning">禁用</el-tag>
        </template>
      </el-table-column>

      <el-table-column align="center" label="操作" width="120">
        <template slot-scope="scope">
          <el-button type="primary" size="small" icon="el-icon-edit" @click="editMenu(scope.row.id)">编辑</el-button>
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
    <el-dialog :title="dialogTitleFilter(dialogStatus)" :visible.sync="menuDialog" @close="closeEvent('resource')">
      <el-form ref="menuForm" :rules="menuRules" :model="menuForm" label-position="right" label-width="90px" style="width:800px; margin-left:50px;">
        <el-form-item prop="id" style="display:none;">
          <el-input v-model="menuForm.id" type="hidden" />
        </el-form-item>
        <el-row>
          <el-col :span="24">
            <el-input v-model="menuForm.id" type="hidden"/>
            <el-form-item label="菜单名称:" prop="name">
              <el-input v-model="menuForm.name" auto-complete="off"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <div class="grid-content bg-purple-light">
              <el-form-item label="资源路径:" prop="path">
                <el-input v-model="menuForm.path" auto-complete="off" placeholder="template/template" />
                <el-alert
                  :closable="false"
                  class="height: 40px;"
                  title="请确保该资源(组件)路径真实存在"
                  type="warning"
                  show-icon/>
              </el-form-item>
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <div class="grid-content bg-purple-light">
              <el-form-item label="描述：" prop="description">
                <el-input v-model="menuForm.description" :autosize="{ minRows: 3, maxRows: 5}" type="textarea" auto-complete="off"/>
              </el-form-item>
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <div class="grid-content bg-purple-light">
              <!--  <el-form-item label="父级资源：" prop="parentid">
                <el-input :value="parentLabel" :disabled="true" auto-complete="off"/>
                <div style="height:200px;overflow:auto">
                  <el-tree :data="parentTreeData" :props="defaultProps" :expand-on-click-node="false" @node-click="handleNodeClick"/>
                </div>

              </el-form-item> -->
            </div>
          </el-col>
        </el-row>
        <el-row v-show="createDateisShow">
          <el-col :span="24">
            <div class="grid-content bg-purple-light">
              <el-form-item label="创建时间：">
                <el-input v-model="menuForm.createAt" :disabled="true" auto-complete="off"/>
              </el-form-item>
            </div>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="menuDialog = false">取 消</el-button>
        <el-button type="primary" @click="saveMenu">确 定</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>

import { fetchMenuList, deleteMenu, getMenuById, createMenu, updateMenu } from '@/api/system/menu'
// import Pagination from '@/components/Pagination' // Secondary package based on el-pagination

export default {
  name: 'Menu',
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
        name: '',
        status: '',
        pageNum: 1,
        pageSize: 10
      },
      // 数据状态下拉选择
      dataState: this.$store.getters.dataState,
      // 选中的行
      multipleSelection: [],
      // dialog是否显示
      menuDialog: false,
      // TODO 显示dialog标题,该字段必须存在
      dialogStatus: '',
      // 编辑或者新增dialog是否显示时间
      createDateisShow: '',
      // 模态框表单
      menuForm: {
        id: '',
        name: '', // 资源名称
        path: '', // 资源路径
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
        resourceDesc: [{ required: true, message: '请输入描述', trigger: 'blur' }],
        parentResource: [{ required: true, message: '请输入父级资源', trigger: 'blur' }]
      }
    }
  },

  created() {
    this.getList()
  },

  methods: {
    // 编辑
    editMenu(id) {
      getMenuById(id).then(response => {
        // response.data.createAt = parseTime(response.data.createAt)
        // 表单内树选中
        /* this.tempTreeDataTest.map(data => {
          if (data.id === response.data.parentid) {
            this.parentLabel = data.title
          }
        }) */
        this.menuForm = response.data.records[0]
      }).catch(errorData => {
        this.$message({
          message: '网络错误',
          type: 'error'
        })
      })
      // this.resourceTitle = '编辑资源'
      this.dialogStatus = 'update'
      this.createDateisShow = true
      this.menuDialog = true
    },

    /**
     * 查询菜单列表
     */
    getList() {
      this.listLoading = true
      fetchMenuList(this.listQuery).then(response => {
        this.list = response.data.records
        this.total = response.data.total
        this.listLoading = false
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
    // 保存
    saveMenu() {
      this.$refs['menuForm'].validate((valid) => {
        if (valid) {
          if (this.dialogStatus === 'create') {
            createMenu(this.menuForm).then(data => {
              this.menuDialog = false
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
            updateMenu(this.menuForm).then(data => {
              this.menuDialog = false
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
     * 添加菜单
     */
    handleCreate() {
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
      this.menuDialog = true
      // this.$refs['menuForm'].clearValidate()
    },
    closeEvent(key) {
      this.$refs['menuForm'].resetFields()
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
     * 删除菜单
     */
    handleDelete() {
      const sel = this.multipleSelection.map(x => x.id)
      if (!sel.length) {
        return this.$message({ message: '请选择要删除的数据', type: 'warning' })
      }

      this.$confirm('您确认您要删除选择的数据吗?', '提示', { confirmButtonText: '确定', cancelButtonText: '取消', type: 'warning' }).then(() => {
        deleteMenu(sel).then(data => {
          for (const i of sel) {
            this.list.splice(this.list.findIndex(v => v.id === i), 1)
          }
          this.total = this.total - sel.length
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
