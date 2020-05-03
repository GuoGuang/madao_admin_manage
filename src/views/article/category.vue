<template>
  <!-- 菜单列表 -->
  <div class="app-container">
    <el-header style="padding:0 0 0 0px;">
      <div class="filter-container">
        <el-input v-model="listQuery.name" prefix-icon="el-icon-search" style="width: 150px;" class="filter-item" placeholder="分类名" clearable @keyup.enter.native="getRightList" />
        <el-select v-model="listQuery.state" class="filter-item" style="width: 150px;" placeholder="状态" clearable>
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
      <el-table-column prop="name" label="分类名" align="left" />
      <el-table-column prop="summary" label="分类简介" align="center" />
      <el-table-column prop="catrgory" label="文章数量" align="center">
        <template slot-scope="scope">
          {{ scope.length }}
        </template>
      </el-table-column>
      <el-table-column :formatter="common.dateFormat" prop="createAt" label="创建时间" align="center" />
      <el-table-column class-name="status-col" align="center" label="状态" width="110">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.state == 1">
            正常
          </el-tag>
          <el-tag v-else type="warning">
            禁用
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作" width="120">
        <template slot-scope="scope">
          <el-button type="primary" size="small" icon="el-icon-edit" @click="editCategory(scope.row.id)">
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
    <el-dialog :title="dialogTitleFilter(dialogStatus)" :visible.sync="categoryDialog" @close="closeEvent">
      <el-form ref="categoryForm" :rules="categoryRules" :model="categoryForm" status-icon label-position="right" label-width="8em">
        <el-form-item prop="id" style="display:none;">
          <el-input v-model="categoryForm.id" type="hidden" />
        </el-form-item>
        <el-row>
          <el-col :span="24">
            <el-form-item label="分类名:" prop="name">
              <el-input v-model="categoryForm.name" :disabled="dialogStatus == 'update'?true:false" auto-complete="off" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="分类简介:" prop="summary">
              <el-input v-model="categoryForm.summary" auto-complete="off" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="状态：" prop="state">
              <el-switch
                v-model="categoryForm.state"
                :active-value="1"
                :inactive-value="0"
              />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="categoryDialog = false">
          取 消
        </el-button>
        <el-button type="primary" :loading="btnLoading" @click="saveCategory">
          确 定
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>

import { fetchCategoryList, deleteCategory, getCategoryById, createCategory, updateCategory } from '@/api/article/category'
// import Pagination from '@/components/Pagination' // Secondary package based on el-pagination

export default {
  name: 'Category',
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
      btnLoading: false,
      listQuery: {
        name: '',
        state: '',
        pageNum: 1,
        pageSize: 10
      },
      /**
     * 树形列表默认树形
     */
      defaultProps: {
        children: 'children',
        label: 'name'
      },
      // 数据状态下拉选择
      dataState: this.$store.getters.dataState,
      // 选中的行
      multipleSelection: [],
      // dialog是否显示
      categoryDialog: false,
      // TODO 显示dialog标题,该字段必须存在
      dialogStatus: '',
      // 编辑或者新增dialog是否显示时间
      createDateisShow: '',
      parentTreeData: [], // 树形菜单
      parentName: '', // 表单冗余字段
      // 模态框表单
      categoryForm: {
        id: '',
        name: '',
        state: '',
        summary: '',
        parentId: ''
      },
      // dialog表单中验证规则写这里
      categoryRules: {
        name: [
          { required: true, message: '请输入名称', trigger: 'blur' }
        ],
        summary: [
          { required: true, message: '请输入简介', trigger: 'blur' }
        ]
      }
    }
  },

  created() {
    this.getList()
  },

  methods: {

    /**
     * 查询分类列表
     */
    getList() {
      this.listLoading = true
      fetchCategoryList(this.listQuery).then(response => {
        if (response.data) {
          // this.list = this.common.converToTree(response.data.content, '0')
          this.list = response.data.content
          this.total = response.data.total
        }
        this.listLoading = false
      })
    },
    // 编辑
    editCategory(id) {
      getCategoryById(id).then(response => {
        // response.data.createAt = parseTime(response.data.createAt)
        // 表单内树选中
        /* this.tempTreeDataTest.map(data => {
          if (data.id === response.data.parentid) {
            this.parentLabel = data.title
          }
        }) */
        this.categoryForm = response.data
        this.parentTreeData.map(data => {
          if (data.id.toString() === response.data.parentId) {
            this.parentName = data.name
          }
        })
        this.dialogStatus = 'update'
        this.createDateisShow = true
        this.categoryDialog = true
      })
    },

    // 保存
    saveCategory() {
      this.$refs['categoryForm'].validate((valid) => {
        if (valid) {
          this.btnLoading = true
          if (this.dialogStatus === 'create') {
            createCategory(this.categoryForm).then(data => {
              this.cleanTagDialog()
              this.$message({
                message: '添加成功',
                type: 'success'
              })
              this.getList()
            })
          } else {
            updateCategory(this.categoryForm).then(data => {
              this.cleanTagDialog()
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
     * 删除分类
     */
    handleDelete() {
      const sel = this.multipleSelection.map(x => x.id)
      console.log(sel)
      if (!sel.length) {
        return this.$message({ message: '请选择要删除的数据', type: 'warning' })
      }
      this.$confirm('您确认您要删除选择的数据吗?', '提示', { confirmButtonText: '确定', cancelButtonText: '取消', type: 'warning' }).then(() => {
        deleteCategory(sel).then(data => {
          this.$message({ message: '操作成功', type: 'success' })
          this.listQuery.pageNum = 1
          this.getList()
        })
      })
    },
    handleSizeChange(val) {
      this.listQuery.pageSize = val
      this.pageNum = 1
      this.getList()
    },
    handleCurrentChange(val) {
      this.listQuery.pageNum = val
      this.getList()
    },
    handleCreate() {
      this.parentTreeData = this.list
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
      this.categoryDialog = true
      // this.$refs['categoryForm'].clearValidate()
    },
    closeEvent() {
      this.$refs['categoryForm'].resetFields()
    },
    // 显示gialog的标题
    dialogTitleFilter(val) {
      const value = this.$store.getters.dialogTitleText(val)
      return value
    },
    /**
     * 选择树形表单事件
     */
    handleNodeClick(data) {
      this.categoryForm.parentId = data.id
      this.parentName = data.name
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
    cleanTagDialog() {
      this.categoryDialog = false
      this.btnLoading = false
    }
  }
}
</script>

