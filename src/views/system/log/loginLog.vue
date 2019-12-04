<template>

  <!-- 登录日志列表 -->
  <div class="app-container">

    <el-header style="padding:0 0 0 0px;">
      <div class="filter-container">
        <el-input v-model="listQuery.clientIp" prefix-icon="el-icon-search" style="width: 150px;" class="filter-item" placeholder="ip段" clearable @keyup.enter.native="getRightList"/>
        <!--  @click="getRightList" -->
        <el-button class="filter-item" type="primary" icon="el-icon-search" plain @click="getList">搜索</el-button>
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
      <el-table-column prop="id" label="id" align="center" type="selection"/>
      <el-table-column prop="userName" label="用户" align="center" />
      <el-table-column prop="clientIp" label="ip地址" align="center" />
      <el-table-column prop="browser" label="浏览器" align="center" />
      <el-table-column prop="osInfo" label="操作系统" align="center" />
      <el-table-column :formatter="common.dateFormat" prop="createAt" label="登录时间" align="center" />
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

  </div>
</template>

<script>

import { fetchLoginLogList } from '@/api/system/loginLog'
// import Pagination from '@/components/Pagination' // Secondary package based on el-pagination

export default {
  name: 'Log',
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
        clientIp: '',
        pageNum: 1,
        pageSize: 10
      },
      // 数据状态下拉选择
      dataState: this.$store.getters.dataState,
      // 选中的行
      multipleSelection: []

    }
  },

  created() {
    this.getList()
  },

  methods: {

    /**
     * 查询日志列表
     */
    getList() {
      this.listLoading = true
      fetchLoginLogList(this.listQuery).then(response => {
        if (response.data) {
          this.list = response.data.content
          this.total = response.data.totalElements
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

