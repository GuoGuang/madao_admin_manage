<template>
  <!-- 字典 -->
  <div class="app-container">
    <el-row :gutter="20">
      <el-col :span="4">
        <el-card class="box-card">
          <el-select v-model="dictTypeValue" placeholder="请选择" style="padding-bottom: 5px;" @change="refreshTree">
            <el-option
              v-for="item in dictType"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
          <el-tree
            :data="dictTreeList"
            :expand-on-click-node="false"
            :props="defaultProps"
            @node-click="handleNodeClick"
          />
        </el-card>
      </el-col>

      <el-col :span="19">
        <el-header style="padding:0 0 0 0px;">
          <div class="filter-container">
            <el-input v-model="listQuery.name" prefix-icon="el-icon-search" style="width: 150px;" class="filter-item" placeholder="字典项" clearable @keyup.enter.native="getRightList" />
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
          <el-table-column prop="name" label="字典项" align="center" />
          <el-table-column prop="code" label="编码" align="center" />
          <el-table-column prop="type" label="类型" align="center" />
          <el-table-column prop="description" label="描述" align="ledt" />
          <el-table-column :formatter="common.dateFormat" prop="createAt" label="添加时间" align="center" />
          <el-table-column class-name="status-col" align="center" label="状态" width="110">
            <template slot-scope="scope">
              <!--   <el-tag :type="scope.row.status | statusFilter">{{ scope.row.status }}</el-tag> -->
              <el-tag v-if="scope.row.state == 1">
                有效
              </el-tag>
              <el-tag v-else type="warning">
                禁用
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column align="center" label="操作" width="120">
            <template slot-scope="scope">
              <el-button type="primary" size="small" icon="el-icon-edit" @click="editDict(scope.row.id)">
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
        <el-dialog :title="dialogTitleFilter(dialogStatus)" :visible.sync="dictDialog" width="30%" @close="closeEvent">
          <el-form ref="dictForm" :rules="dictRules" :model="dictForm" status-icon label-position="right" label-width="8em">
            <el-form-item prop="id" style="display:none;">
              <el-input v-model="dictForm.id" type="hidden" />
            </el-form-item>
            <el-row>
              <el-col :span="24">
                <el-form-item label="字典项:" prop="name">
                  <el-input v-model="dictForm.name" auto-complete="off" />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-form-item label="编码:" prop="code">
                  <el-input v-model="dictForm.code" auto-complete="off" />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-form-item label="分类:" prop="code">
                  <el-input v-model="treeClickName" auto-complete="off" disabled="" />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-form-item label="描述:" prop="description">
                  <el-input v-model="dictForm.description" auto-complete="off" />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-form-item label="启用：" prop="state">
                  <el-switch
                    v-model="dictForm.state"
                    :active-value="1"
                    :inactive-value="0"
                  />
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dictDialog = false">
              取 消
            </el-button>
            <el-button type="primary" @click="saveDict">
              确 定
            </el-button>
          </div>
        </el-dialog>
      </el-col>
    </el-row>
  </div>
</template>

<script>

import { fetchDictList, fetchDictTreeList, fetchDictType, deleteDict, getDictById, createDict, updateDict } from '@/api/system/dict'
// import Pagination from '@/components/Pagination' // Secondary package based on el-pagination

export default {
  name: 'Dictionary',
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
        code: '',
        type: '',
        parentId: '',
        state: '',
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
        parentId: '',
        type: '',
        description: ''
      },
      dictType: [], // 左侧下拉框类型
      dictTypeValue: '', // 字典类型名称，回显左侧下拉框name
      dictTreeList: [], // 左侧tree列表
      treeClickName: [], // 点击左侧tree时显示的名称，表单内使用

      defaultProps: {
        children: 'children',
        label: 'name'
      },
      // dialog表单中验证规则写这里
      dictRules: {
        name: [
          { required: true, message: '请输入字典项', trigger: 'blur' }
        ],
        code: [
          { required: true, message: '请输入编码', trigger: 'blur' }
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

    /**
     * 获取组字典类型
     */
    fetchDictType() {
      fetchDictType().then(response => {
        this.dictType = response.data
        this.listQuery.parentId = response.data[0].id
        this.listQuery.type = response.data[0].type
        this.dictTypeValue = response.data[0].name
        this.treeClickName = response.data[0].name

        // 页面加载完成 点击添加按钮默认添加第0个下拉框元素数据
        this.dictForm.parentId = response.data[0].id
        this.dictForm.type = response.data[0].type

        this.fetchDictTreeList()
      })
    },

    /**
     * 按照字典类型获取树形字典
     */
    fetchDictTreeList() {
      this.listLoading = true
      fetchDictTreeList(this.listQuery).then(response => {
        if (response.data) {
          this.dictTreeList = this.common.converToTree(response.data, this.listQuery.parentId)
        }
        this.getList()
        this.listLoading = false
      })
    },

    /**
     * 查询字典列表
     */
    getList() {
      this.listLoading = true
      fetchDictList(this.listQuery).then(response => {
        if (response.data) {
          // this.dictTreeList = this.common.converToTree(response.data.content, '0')
          // 过滤掉根节点
          /* this.list = response.data.content.filter(element => {
            return element.id === '0'
          }) */
          this.list = response.data.results
          this.total = response.data.total
        }
        this.listLoading = false
      })
    },
    // 编辑
    editDict(id) {
      getDictById(id).then(response => {
        this.dialogStatus = 'update'
        this.createDateisShow = true
        this.dictDialog = true

        this.$nextTick(() => {
          this.dictForm = response.data
        })
      }).catch(errorData => {})
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
              this.fetchDictTreeList()
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
              this.fetchDictTreeList()
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
     * 删除字典
     */
    handleDelete() {
      const sel = this.multipleSelection.map(x => x.id)
      console.log(sel)
      if (!sel.length) {
        return this.$message({ message: '请选择要删除的数据', type: 'warning' })
      }

      this.$confirm('您确认您要删除选择的数据吗?', '提示', { confirmButtonText: '确定', cancelButtonText: '取消', type: 'warning' }).then(() => {
        deleteDict(sel).then(data => {
          this.$message({ message: '操作成功', type: 'success' })
          this.listQuery.pageNum = 1
          this.getList()
        })
      }).catch((error) => {
        console.log('dict-->handleDelete删除失败：' + error)
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
      this.dictDialog = true
      // this.$refs['dictForm'].clearValidate()
    },

    /**
     * 切换字典类型时触发
     */
    refreshTree(value) {
      const choosenItem = this.dictType.filter(item => item.id === value)[0]
      this.treeClickName = choosenItem.name

      this.dictForm.parentId = choosenItem.id
      this.dictForm.type = choosenItem.type

      this.listQuery.type = choosenItem.type
      this.listQuery.parentId = choosenItem.id
      this.fetchDictTreeList()
    },
    /**
     * 点击树节点时
     */
    handleNodeClick(data) {
      this.listQuery.parentId = data.id
      this.dictForm.parentId = data.id
      this.dictForm.type = data.type
      this.treeClickName = data.name
      this.getList()
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
     * 点击当前行任意地方选中当前行
     */
    handleCurrentRowClick(selection) {
      this.$refs.multipleTable.toggleRowSelection(selection)
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
