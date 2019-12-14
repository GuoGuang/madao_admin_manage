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
              v-if="scope.row.reviewState === articleState.value && articleState.type"
              :key="articleState.value"
              :type="articleState.type">
              {{ articleState.label }}
            </el-tag>
            <el-tag
              v-else-if="scope.row.reviewState === articleState.value"
              :key="articleState.value"
              color="#ffffff">
              {{ articleState.label }}
            </el-tag>
          </div>
        </template>
      </el-table-column>

      <el-table-column :formatter="common.dateFormat" prop="createAt" label="发表日期" align="center" width="180" sortable/>
      <el-table-column align="center" label="操作" >
        <!-- <template slot-scope="scope">
          <el-button type="primary" size="small" icon="el-icon-edit" @click="editArticle(scope.row.id)">编辑</el-button>
        </template> -->
        <template slot-scope="scope">
          <router-link :to="'/article/edit/'+scope.row.id">
            <el-button type="primary" size="small" icon="el-icon-edit">编辑</el-button>
          </router-link>
          <el-button type="warning" size="small" icon="el-icon-s-comment" @click="findArticleComments(scope.row.id)">查看评论</el-button>
        </template>
      </el-table-column>

    </el-table>
    <div class="pagination-container">
      <el-pagination
        :current-page.sync="listQuery.pageNum"
        :page-sizes="[10, 20, 50, 100]"
        :page-size="listQuery.pageSize"
        :total="total"
        background
        layout="total, sizes, prev, pager, next, jumper"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"/>
    </div>

    <el-drawer
      :visible.sync="articleCommentsDrawer"
      :before-close="handleClose"
      title="评论列表"
      direction="rtl"
      @open="dasdasdasd">
      <div class="comment">
        <gitalk :id="articleCommentId"/>
      </div>
    </el-drawer>

  </div>
</template>

<script>

import { fetchArticleList, deleteArticle } from '@/api/article/article'
// import Pagination from '@/components/Pagination' // Secondary package based on el-pagination

import gitalk from './gitalk' // gitalk 评论插件
export default {
  name: 'Article',
  // 注册组件
  components: { gitalk },

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
      articleCommentId: '',
      // dialog是否显示
      articleCommentsDrawer: false,

      // 编辑或者新增dialog是否显示时间
      createDateisShow: '',
      // 模态框表单
      articleForm: {

      },
      // dialog表单中验证规则写这里
      articleRules: {

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
          this.list = response.data.content
          this.total = response.data.totalElements
        }
        this.listLoading = false
      })
    },
    dasdasdasd() {
      const githeader = document.querySelector('.gt-header')
      console.log(githeader)
    },
    // 查看文章评论
    findArticleComments(id) {
      this.articleCommentId = id
      this.articleCommentsDrawer = true
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
     * 抽屉关闭时
     */
    handleClose(done) {
      done()
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
<style lang="scss" >
.el-drawer__body{
  .comment{
     padding: 0 2em;
  }
}

</style>

