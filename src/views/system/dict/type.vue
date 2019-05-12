<template>

  <!-- 字典类型 -->
  <div class="app-container">
    <el-header style="padding:0 0 0 0px;">
      <div class="filter-container">
        <el-input v-model="listQuery.name" prefix-icon="el-icon-search" style="width: 150px;" class="filter-item" placeholder="字典类型项" clearable @keyup.enter.native="getRightList"/>
        <el-select v-model="listQuery.state" class="filter-item" style="width: 150px;" placeholder="状态" clearable>
          <el-option v-for="item in dataState" :key="item.value" :label="item.label" :value="item.value"/>
        </el-select>
        <!--  @click="getRightList" -->
        <el-button class="filter-item" type="primary" icon="el-icon-search" plain @click="getList">搜索</el-button>
        <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-circle-plus" plain @click="handleCreate">添加</el-button>
        <el-button class="filter-item" style="margin-left: 10px;" type="danger" icon="el-icon-delete" plain @click="handleDelete">删除</el-button>
      </div>
    </el-header>

    <el-table v-loading="listLoading" :data="list" border fit highlight-current-row style="width: 100%" @selection-change="changeFun">
      <el-table-column prop="id" label="id" align="center" type="selection"/>
      <el-table-column prop="name" label="字典类型项" align="center" />
      <el-table-column prop="type" label="类型" align="center" />
      <el-table-column prop="description" label="描述" align="ledt" />
      <el-table-column :formatter="common.dateFormat" prop="createAt" label="添加时间" align="center" />
      <el-table-column class-name="status-col" align="center" label="状态" width="110">
        <template slot-scope="scope">
          <!--   <el-tag :type="scope.row.status | statusFilter">{{ scope.row.status }}</el-tag> -->
          <el-tag v-if="scope.row.state == 1">有效</el-tag>
          <el-tag v-else type="warning">禁用</el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作" width="120">
        <template slot-scope="scope">
          <el-button type="primary" size="small" icon="el-icon-edit" @click="editDict(scope.row.id)">编辑</el-button>
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
    <el-dialog :title="dialogTitleFilter(dialogStatus)" :visible.sync="dictDialog" width="30%" @close="closeEvent">
      <el-form ref="dictForm" :rules="dictRules" :model="dictForm" label-position="right" label-width="90px" >
        <el-form-item prop="id" style="display:none;">
          <el-input v-model="dictForm.id" type="hidden" />
        </el-form-item>
        <el-row>
          <el-col :span="24">
            <el-form-item label="字典类型项:" prop="name">
              <el-input v-model="dictForm.name" auto-complete="off"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="描述:" prop="description">
              <el-input v-model="dictForm.description" auto-complete="off"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="禁用：" prop="state">
              <el-switch
                v-model="dictForm.state"
                active-value="1"
                inactive-value="0"/>
            </el-form-item>
          </el-col>
        </el-row>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dictDialog = false">取 消</el-button>
        <el-button type="primary" @click="saveDict">确 定</el-button>
      </div>
    </el-dialog>

  </div>

</template>

<script>

import { fetchDictList, deleteDict, getDictById, createDict, updateDict } from '@/api/system/dict'

export default {
  name: 'DictType',
  // 注册组件
  // components: { Pagination },

  filters: {
  },

  data() {
    return {
      list: null,
      total: 0,
      listLoading: true,
      listQuery: {
        name: '',
        state: '',
        parentId: '0',
        pageNum: 1,
        pageSize: 10
      },
      // 数据状态下拉选择
      dataState: this.$store.getters.dataState,
      // 选中的行
      multipleSelection: [],
      // dialog是否显示
      dictDialog: false,
      // TODO 显示dialog标题,该字段必须存在
      dialogStatus: '',
      // 编辑或者新增dialog是否显示时间
      createDateisShow: '',
      // 模态框表单
      dictForm: {
        id: '',
        name: '',
        code: '',
        parentId: '0',
        type: '',
        description: ''
      },
      dictType: [], // 左侧下拉框类型
      dictTypeValue: '', // 字典类型类型名称，回显左侧下拉框name
      dictTreeList: [], // 左侧tree列表
      treeClickName: [], // 点击左侧tree时显示的名称，表单内使用

      // dialog表单中验证规则写这里
      dictRules: {
        name: [
          { required: true, message: '请输入字典类型项', trigger: 'blur' }
        ],
        description: [
          { required: true, message: '请输入描述', trigger: 'blur' }
        ]
      }
    }
  },

  created() {
    this.fetchDictType()
  },

  methods: {
    // 编辑
    editDict(id) {
      getDictById(id).then(response => {
        // response.data.createAt = parseTime(response.data.createAt)
        // 表单内树选中
        /* this.tempTreeDataTest.map(data => {
          if (data.id === response.data.parentid) {
            this.parentLabel = data.title
          }
        }) */
        this.dictForm = response.data
      }).catch(errorData => {
        this.$message({
          message: '网络错误',
          type: 'error'
        })
      })
      // this.resourceTitle = '编辑资源'
      this.dialogStatus = 'update'
      this.createDateisShow = true
      this.dictDialog = true
    },

    /**
     * 查询字典类型列表
     */
    getList() {
      this.listLoading = true
      fetchDictList(this.listQuery).then(response => {
        if (response.data) {
          // this.dictTreeList = this.common.converToTree(response.data.records, '0')
          // 过滤掉根节点
          /* this.list = response.data.records.filter(element => {
            return element.id === '0'
          }) */
          this.list = response.data.records
          this.total = response.data.total
        }
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
    saveDict() {
      this.$refs['dictForm'].validate((valid) => {
        if (valid) {
          if (this.dialogStatus === 'create') {
            createDict(this.dictForm).then(data => {
              this.dictDialog = false
              this.$message({
                message: '添加成功',
                type: 'success'
              })
              this.fetchDictType()
            }).catch(response => {
              this.$message({
                message: '请求出错,请稍后重试!',
                type: 'error'
              })
            })
          } else {
            updateDict(this.dictForm).then(data => {
              this.dictDialog = false
              this.$message({
                message: '修改成功',
                type: 'success'
              })
              this.fetchDictType()
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
      this.dictDialog = true
      // this.$refs['dictForm'].clearValidate()
    },

    /**
     * 模态框关闭时
     */
    closeEvent() {
      this.$refs['dictForm'].resetFields()
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
     * 删除字典类型
     */
    handleDelete() {
      const sel = this.multipleSelection.map(x => x.id)
      console.log(sel)
      if (!sel.length) {
        return this.$message({ message: '请选择要删除的数据', type: 'warning' })
      }

      this.$confirm('您确认您要删除选择的数据吗?', '提示', { confirmButtonText: '确定', cancelButtonText: '取消', type: 'warning' }).then(() => {
        deleteDict(sel).then(data => {
          /*  for (const i of sel) {
            this.list.splice(this.list.findIndex(v => v.id === i), 1)
          }
          this.multipleSelection.splice(0, this.multipleSelection.length) */
          this.$message({ message: '操作成功', type: 'success' })
          this.listQuery.pageNum = 1
          this.getList()
        })
      }).catch(() => { })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>

.app-container{
  .box-card{
      min-height: calc(100vh - 128px);
  }
}
</style>
