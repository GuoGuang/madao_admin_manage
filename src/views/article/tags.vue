<template>
  <!-- 菜单列表 -->
  <div class="app-container">
    <el-header style="padding:0 0 0 0px;">
      <div class="filter-container">
        <el-input v-model="listQuery.name" prefix-icon="el-icon-search" style="width: 150px;" class="filter-item" placeholder="标签名" clearable @keyup.enter.native="getRightList" />
        <el-select v-model="listQuery.state" class="filter-item" style="width: 150px;" placeholder="状态" clearable>
          <el-option v-for="item in dataState" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
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
      <el-table-column prop="name" label="名称" align="left" />
      <el-table-column prop="description" label="描述" align="center" />
      <el-table-column prop="icon" label="icon" align="center" />
      <el-table-column prop="color" label="color" align="center">
        <template slot-scope="scope">
          <el-color-picker v-model="scope.row.color" :disabled="true" />
        </template>
      </el-table-column>
      <el-table-column prop="tagsCount" label="文章数量" align="center">
        <template slot-scope="scope">
          <count-to :start-val="0" :end-val="scope.row.tagsCount" :duration="2600" class="card-panel-num" />
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
          <el-button type="primary" size="small" icon="el-icon-edit" @click="editTag(scope.row.id)">
            编辑
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <div class="pagination-container">
      <el-pagination
        :current-page.sync="listQuery.page"
        :page-sizes="[10, 20, 50, 100]"
        :page-size="listQuery.size"
        :total="total"
        layout="total, sizes, prev, pager, next, jumper"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>

    <!-- 模态框 -->
    <el-dialog :title="dialogTitleFilter(dialogStatus)" :visible.sync="tagDialog" @close="closeEvent">
      <el-form ref="tagForm" :rules="tagRules" :model="tagForm" status-icon label-position="right" label-width="8em">
        <el-form-item prop="id" style="display:none;">
          <el-input v-model="tagForm.id" type="hidden" />
        </el-form-item>
        <el-row>
          <el-col :span="24">
            <el-form-item label="名称:" prop="name">
              <el-input v-model="tagForm.name" auto-complete="off" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="英文名称:" prop="slug">
              <el-input v-model="tagForm.slug" auto-complete="off" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="描述:" prop="description">
              <el-input v-model="tagForm.description" auto-complete="off" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="状态：" prop="state">
              <el-switch
                v-model="tagForm.state"
                :active-value="1"
                :inactive-value="0"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="标签颜色：" prop="color">
              <el-color-picker
                v-model="tagForm.color"
                show-alpha
                :predefine="predefineColors"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="标签图标：" prop="icon">
              <el-switch
                v-model="tagForm.icon"
                :active-value="1"
                :inactive-value="0"
              />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="tagDialog = false">
          取 消
        </el-button>
        <el-button type="primary" :loading="btnLoading" @click="saveTag()">
          确 定
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { fetchTagList, deleteTag, getTagById, createTag, updateTag } from '@/api/article/tags'
import CountTo from 'vue-count-to'

export default {
  name: 'Tags',
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
  components: {
    CountTo
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
        page: 1,
        size: 10
      },
      predefineColors: [
        '#ff4500',
        '#ff8c00',
        '#ffd700',
        '#90ee90',
        '#00ced1',
        '#1e90ff',
        '#c71585',
        'rgba(255, 69, 0, 0.68)',
        'rgb(255, 120, 0)',
        'hsv(51, 100, 98)',
        'hsva(120, 40, 94, 0.5)',
        'hsl(181, 100%, 37%)',
        'hsla(209, 100%, 56%, 0.73)',
        '#c7158577'
      ],
      defaultProps: {
        children: 'children',
        label: 'name'
      },
      dataState: this.$store.getters.dataState,
      // 选中的行
      multipleSelection: [],
      // dialog是否显示
      tagDialog: false,
      // TODO 显示dialog标题,该字段必须存在
      dialogStatus: '',
      // 编辑或者新增dialog是否显示时间
      createDateisShow: '',
      parentTreeData: [], // 树形菜单
      parentName: '', // 表单冗余字段
      tagForm: {
        id: '',
        name: '',
        state: '',
        summary: '',
        slug: '',
        parentId: '',
        color: ''
      },
      tagRules: {
        name: [
          { required: true, message: '请输入名称', trigger: 'blur' }
        ],
        slug: [
          { required: true, message: '请输入英文名称', trigger: 'blur' }
        ],
        icon: [
          { required: true, message: '请选择图标', trigger: 'blur' }
        ],
        color: [
          { required: true, message: '请选择颜色', trigger: 'blur' }
        ],
        description: [
          { required: true, message: '请输入描述', trigger: 'blur' }
        ]
      }
    }
  },

  created() {
    this.getList()
  },

  methods: {

    getList() {
      this.listLoading = true
      const data = Object.assign({}, this.listQuery, {
        page: this.listQuery.page - 1
      })
      fetchTagList(data).then(response => {
        if (response.data) {
          this.list = response.data.content
          this.total = response.data.totalElements
        }
        this.listLoading = false
      })
    },
    // 编辑
    editTag(id) {
      getTagById(id).then(response => {
        this.tagForm = response.data
        this.parentTreeData.map(data => {
          if (data.id.toString() === response.data.parentId) {
            this.parentName = data.name
          }
        })
        this.dialogStatus = 'update'
        this.createDateisShow = true
        this.tagDialog = true
      })
    },

    // 保存
    saveTag() {
      this.$refs['tagForm'].validate((valid) => {
        if (valid) {
          this.btnLoading = true
          if (this.dialogStatus === 'create') {
            createTag(this.tagForm).then(data => {
              this.cleanTagDialog()
              this.$message({
                message: '添加成功',
                type: 'success'
              })
              this.getList()
            }).catch(() => {
              this.btnLoading = false
            })
          } else {
            updateTag(this.tagForm).then(data => {
              this.cleanTagDialog()
              this.$message({
                message: '修改成功',
                type: 'success'
              })
              this.getList()
            }).catch(() => {
              this.btnLoading = false
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
     * 删除标签
     */
    handleDelete() {
      const sel = this.multipleSelection.map(x => x.id)
      console.log(sel)
      if (!sel.length) {
        return this.$message({ message: '请选择要删除的数据', type: 'warning' })
      }

      this.$confirm('您确认您要删除选择的数据吗?', '提示', { confirmButtonText: '确定', cancelButtonText: '取消', type: 'warning' }).then(() => {
        deleteTag(sel).then(data => {
          this.$message({ message: '操作成功', type: 'success' })
          this.listQuery.page = 1
          this.getList()
        })
      })
    },
    // pageSize变更事件
    handleSizeChange(val) {
      this.listQuery.size = val
      this.listQuery.page = 1
      this.getList()
    },
    // 当前页变更事件
    handleCurrentChange(val) {
      this.listQuery.page = val
      this.getList()
    },
    /**
     * 添加菜单
     */
    handleCreate() {
      // 表单内树
      this.parentTreeData = this.list
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
      this.tagDialog = true
      // this.$refs['tagForm'].clearValidate()
    },
    /**
     * 模态框关闭时
     */
    closeEvent() {
      this.$refs['tagForm'].resetFields()
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
      this.tagForm.parentId = data.id
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
      this.tagDialog = false
      this.btnLoading = false
    }
  }
}
</script>

