<template>

  <!-- 文章列表 -->
  <div class="app-container">

    <el-header style="padding:0 0 0 0px;">
      <div class="filter-container">
        <el-input v-model="listQuery.title" prefix-icon="el-icon-search" style="width: 150px;" class="filter-item" placeholder="文章名" clearable @keyup.enter.native="getRightList"/>
        <el-select v-model="listQuery.reviewState" class="filter-item" style="width: 150px;" placeholder="审核状态" clearable>
          <el-option v-for="item in dataState" :key="item.value" :label="item.label" :value="item.value"/>
        </el-select>
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
      @current-change="handleCurrentRowClick"
      @sort-change="sortChange">
      <el-table-column prop="id" label="id" align="center" type="selection"/>
      <el-table-column prop="title" label="标题" align="center" />
      <el-table-column prop="userName" label="作者" align="center" width="130"/>
      <el-table-column prop="visits" label="浏览量" align="center" width="100" sortable/>
      <el-table-column prop="upvote" label="点赞数" align="center" width="100"/>
      <el-table-column prop="comment" label="评论数" align="center" width="100"/>
      <!-- <el-table-column prop="isPublic" label="公开" align="center" width="100"/> -->
      <el-table-column prop="importance" label="热度" align="center" width="180" sortable>
        <template slot-scope="scope">
          <el-rate
            v-model="scope.row.importance"
            :score-template="scope.row.importance+''"
            disabled
            show-score
            text-color="#ff9900"/>
        </template>
      </el-table-column>
      <el-table-column prop="origin" label="来源" align="center" width="100">
        <template slot-scope="scope">
          <div v-for="articleOrigin in $store.getters.articleOrigin" :key="articleOrigin.value">
            <el-tag
              v-if="scope.row.origin === articleOrigin.value"
              :key="articleOrigin.value"
              :type="articleOrigin.type">
              {{ articleOrigin.label }}
            </el-tag>
          </div>

        </template>
      </el-table-column>
      <el-table-column class-name="status-col" prop="reviewState" align="center" label="审核状态" width="110" sortable>
        <template slot-scope="scope">
          <div v-for="articleState in $store.getters.articleState" :key="articleState.value">
            <el-tag
              v-if="scope.row.reviewState === articleState.value"
              :key="articleState.value"
              :type="articleState.type">
              {{ articleState.label }}
            </el-tag>
          </div>
        </template>
      </el-table-column>

      <el-table-column :formatter="common.dateFormat" prop="createAt" label="发表日期" align="center" width="180" sortable/>
      <el-table-column align="center" label="操作" width="120">
        <!-- <template slot-scope="scope">
          <el-button type="primary" size="small" icon="el-icon-edit" @click="editArticle(scope.row.id)">编辑</el-button>
        </template> -->
        <template slot-scope="scope">
          <router-link :to="'/article/edit/'+scope.row.id">
            <el-button type="primary" size="small" icon="el-icon-edit">编辑</el-button>
          </router-link>
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
    <el-dialog :title="dialogTitleFilter(dialogStatus)" :visible.sync="articleDialog" @close="closeEvent">
      <el-form ref="articleForm" :rules="articleRules" :model="articleForm" status-icon label-position="right" label-width="90px" >
        <el-form-item prop="id" style="display:none;">
          <el-input v-model="articleForm.id" type="hidden" />
        </el-form-item>
        <el-row>
          <el-col :span="24">
            <el-form-item label="标题:" prop="title">
              <el-input v-model="articleForm.title" auto-complete="off"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label=":" prop="nickName">
              <el-input v-model="articleForm.nickName" auto-complete="off"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="账号:" prop="account">
              <el-input v-model="articleForm.account" :disabled="dialogStatus == 'update'?true:false" auto-complete="off"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="性别:" prop="sex">
              <el-radio v-model="articleForm.sex" label="1">男</el-radio>
              <el-radio v-model="articleForm.sex" label="2">女</el-radio>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="密码：" prop="password">
              <el-input v-model="articleForm.password" auto-complete="off"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="邮箱：" prop="email">
              <el-input v-model="articleForm.email" auto-complete="off"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="手机号：" prop="phone">
              <el-input v-model="articleForm.phone" auto-complete="off"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="联系地址：" prop="contactAddress">
              <el-input v-model="articleForm.contactAddress" auto-complete="off"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="是否禁用：" prop="status">
              <el-switch
                v-model="articleForm.status"
                :active-value="1"
                :inactive-value="0"/>/>
            </el-form-item>
          </el-col>
        </el-row>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="articleDialog = false">取 消</el-button>
        <el-button type="primary" @click="saveArticle">确 定</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>

import { fetchArticleList, deleteArticle, getArticleById, createArticle, updateArticle } from '@/api/article/article'
// import Pagination from '@/components/Pagination' // Secondary package based on el-pagination

export default {
  name: 'Article',
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
        title: '',
        reviewState: '',
        pageNum: 1,
        pageSize: 10,
        orderBy: '', // 排序
        fieldSort: '' // 排序字段
      },
      // 数据状态下拉选择
      dataState: this.$store.getters.dataState,
      // 选中的行
      multipleSelection: [],
      // dialog是否显示
      articleDialog: false,
      // TODO 显示dialog标题,该字段必须存在
      dialogStatus: '',
      // 编辑或者新增dialog是否显示时间
      createDateisShow: '',
      // 模态框表单
      articleForm: {
        id: '',
        nickName: '',
        articleName: '',
        account: '',
        password: '',
        email: '',
        phone: '',
        contactAddress: '',
        status: '',
        sex: ''
      },
      // dialog表单中验证规则写这里
      articleRules: {
        nickName: [
          { required: true, message: '请输入昵称', trigger: 'blur' },
          { pattern: /^([\w\d]){4,15}$/, message: '以字母开头，长度6-15之间，必须包含字母、数字' }
        ],
        articleName: [
          { required: true, message: '请输入文章名', trigger: 'blur' },
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

  /**
   * 计算属性
   */
  computed: {

  },

  created() {
    this.getList()
  },

  methods: {

    /**
     * 查询文章列表
     */
    getList() {
      this.listLoading = true
      fetchArticleList(this.listQuery).then(response => {
        if (response.data) {
          this.list = response.data.records
          this.total = response.data.total
        }
        this.listLoading = false
      })
    },
    // 编辑
    editArticle(id) {
      getArticleById(id).then(response => {
        // response.data.createAt = parseTime(response.data.createAt)
        // 表单内树选中
        /* this.tempTreeDataTest.map(data => {
          if (data.id === response.data.parentid) {
            this.parentLabel = data.title
          }
        }) */
        this.articleForm = response.data
      }).catch(errorData => {
        this.$message({
          message: '网络错误',
          type: 'error'
        })
      })
      // this.resourceTitle = '编辑资源'
      this.dialogStatus = 'update'
      this.createDateisShow = true
      this.articleDialog = true
    },

    // 保存
    saveArticle() {
      this.$refs['articleForm'].validate((valid) => {
        if (valid) {
          if (this.dialogStatus === 'create') {
            createArticle(this.articleForm).then(data => {
              this.articleDialog = false
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
            updateArticle(this.articleForm).then(data => {
              this.articleDialog = false
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
     * 删除文章
     */
    handleDelete() {
      const sel = this.multipleSelection.map(x => x.id)
      console.log(sel)
      if (!sel.length) {
        return this.$message({ message: '请选择要删除的数据', type: 'warning' })
      }

      this.$confirm('您确认您要删除选择的数据吗?', '提示', { confirmButtonText: '确定', cancelButtonText: '取消', type: 'warning' }).then(() => {
        deleteArticle(sel).then(data => {
          this.$message({ message: '操作成功', type: 'success' })
          this.listQuery.pageNum = 1
          this.getList()
        })
      }).catch((error) => {
        console.log('article.list-->handleDelete删除失败：' + error)
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
      this.$nextTick(() => {
        this.$router.replace({
          path: '/redirect/article/create'
        })
      })
    },
    /**
     * 模态框关闭时
     */
    closeEvent() {
      this.$refs['articleForm'].resetFields()
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
     * 排序change事件
     */
    sortChange(column) {
      this.listQuery.orderBy = column.order.substring(0, column.order.length - 6) === 'asc'
      this.listQuery.fieldSort = column.prop
      this.getList()
      console.log(column)
    }

  }
}
</script>

