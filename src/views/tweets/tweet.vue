<template>
  <!-- 探点列表 -->
  <div class="app-container">
    <el-header style="padding:0 0 0 0px;">
      <div class="filter-container">
        <el-input v-model="listQuery.title" prefix-icon="el-icon-search" style="width: 150px;" class="filter-item" placeholder="探点" clearable @keyup.enter.native="getRightList" />
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
      <el-table-column prop="title" label="标题" align="center" />
      <el-table-column prop="nickName" label="发布人" align="center" width="150" />
      <el-table-column prop="visitsCount" label="浏览量" align="center" width="150">
        <template slot-scope="scope">
          <count-to :start-val="0" :end-val="scope.row.thumbUpCount" :duration="duration" />
        </template>
      </el-table-column>
      <el-table-column prop="thumbUpCount" label="点赞数" align="center" width="150">
        <template slot-scope="scope">
          <count-to :start-val="0" :end-val="scope.row.thumbUpCount" :duration="duration" />
        </template>
      </el-table-column>
      <el-table-column prop="thumbUpCount" label="回复数" align="center" width="150">
        <template slot-scope="scope">
          <count-to :start-val="0" :end-val="scope.row.thumbUpCount" :duration="duration" />
        </template>
      </el-table-column>
      <el-table-column :formatter="common.dateFormat" prop="createAt" label="发布时间" align="center" width="160" />
      <el-table-column align="center" label="操作">
        <template slot-scope="scope">
          <el-button type="success" size="small" icon="el-icon-edit" @click="viewComments(scope.row.id)">
            查看评论
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

    <!-- 查看评论 -->
    <el-dialog :title="dialogTitleFilter(dialogStatus)" :visible.sync="tweetDialog" @close="closeEvent">
      <comment :comments="commentData" :commit-comment="commitComment" />
    </el-dialog>
  </div>
</template>

<script>

import { fetchTweetList, deleteTweet, getTweetById, createTweet, updateTweet } from '@/api/tweets/tweet'
// import Pagination from '@/components/Pagination' // Secondary package based on el-pagination
import CountTo from 'vue-count-to'
import comment from './comment'
import * as CommentData from './mockdata'
export default {
  name: 'Tweet',
  // 注册组件
  components: {
    CountTo, // 数字滚动特效
    comment // 评论
  },
  filters: {
  },
  data() {
    return {
      commentData: [],
      duration: 2600, // 特效数字持续时间
      list: null,
      total: 0,
      listLoading: true,
      listQuery: {
        title: '',
        state: '',
        pageNum: 1,
        pageSize: 10
      },
      // 数据状态下拉选择
      dataState: this.$store.getters.dataState,
      // 选中的行
      multipleSelection: [],
      // dialog是否显示
      tweetDialog: false,
      // TODO 显示dialog标题,该字段必须存在
      dialogStatus: '',
      tweenedNumber: 500,
      // 模态框表单
      tweetForm: {

      },
      // dialog表单中验证规则写这里
      tweetRules: {

      }
    }
  },

  created() {
    this.getList()
  },

  methods: {

    /**
     * 查询探点列表
     */
    getList() {
      this.listLoading = true
      fetchTweetList(this.listQuery).then(response => {
        if (response.data) {
          this.list = response.data.results
          this.total = response.data.total
        }
        this.listLoading = false
      })
    },
    // 查看评论
    viewComments(id) {
      getTweetById(id).then(response => {
        // this.tweetForm = response.data
        this.commentData = CommentData.comment.data
        this.dialogStatus = 'view'
        this.tweetDialog = true
      }).catch(errorData => {
        this.$message({
          message: '网络错误',
          type: 'error'
        })
      })
    },
    /**
     * 删除探点
     */
    handleDelete() {
      const sel = this.multipleSelection.map(x => x.id)
      if (!sel.length) {
        return this.$message({ message: '请选择要删除的数据', type: 'warning' })
      }

      this.$confirm('您确认您要删除选择的数据吗?', '提示', { confirmButtonText: '确定', cancelButtonText: '取消', type: 'warning' }).then(() => {
        deleteTweet(sel).then(data => {
          this.$message({ message: '操作成功', type: 'success' })
          this.getList()
        })
      }).catch((error) => {
        console.log('tweet-->handleDelete删除失败：' + error)
      })
    },
    // 保存
    savetweet() {
      this.$refs['tweetForm'].validate((valid) => {
        if (valid) {
          if (this.dialogStatus === 'create') {
            createTweet(this.tweetForm).then(data => {
              this.tweetDialog = false
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
            updateTweet(this.tweetForm).then(data => {
              this.tweetDialog = false
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
     * 监听comment组件提交评论事件
     */
    commitComment(comment) {
      console.log('提交评论:' + comment)
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
      this.tweetDialog = true
      // this.$refs['tweetForm'].clearValidate()
    },
    /**
     * 模态框关闭时
     */
    closeEvent() {
      // this.$refs['tweetForm'].resetFields()
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

