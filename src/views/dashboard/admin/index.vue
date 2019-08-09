<template>
  <div class="dashboard-editor-container">
    <github-corner class="github-corner" />

    <panel-group />

    <el-row :gutter="32">

      <el-col :xs="24" :sm="24" :lg="15">
        <div class="chart-wrapper">
          <bar-chart/>
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="9">
        <el-card class="project-list">
          <div slot="header" class="clearfix">
            <span>开发中的项目</span>
            <el-button style="float: right; padding: 3px 0" type="text">所有项目</el-button>
          </div>

          <div v-for="o in 4" :key="o" class="project-item" >
            <div class="project-avatar">
              <el-avatar size="small" shape="circle" style="    background: #42b983;">G</el-avatar>
            </div>
            <div class="project-detail">
              <div class="project-name">
                youyd_vue_admin_manage
              </div>
              <div class="project-desc" >
            <p style="    margin-top: .5em;">Spring Boot 2.0.4 &amp; VUE前后端分离管理系统。</p></div></div>
          </div>

        </el-card>
      </el-col>

    </el-row>

    <el-row :gutter="32">
      <el-col :xs="24" :sm="24" :lg="15">
        <div class="chart-wrapper">
          <pie-chart />
        </div>
      </el-col>

    </el-row>
  </div>
</template>

<script>
import GithubCorner from '@/components/GithubCorner'
import PanelGroup from './components/PanelGroup'
import PieChart from './components/PieChart'
import BarChart from './components/BarChart'

export default {
  name: 'DashboardAdmin',
  components: {
    GithubCorner,
    PanelGroup,
    PieChart,
    BarChart
  },
  data() {
    return {

    }
  },
  methods: {

  }
}
</script>

<style lang="scss" scoped>
.dashboard-editor-container {
  padding: 32px;
  background-color: rgb(240, 242, 245);
  position: relative;
  .github-corner {
    position: absolute;
    top: 0px;
    border: 0;
    right: 0;
  }
  .chart-wrapper {
    background: #fff;
    padding: 16px 16px 0;
    margin-bottom: 32px;
  }
  .project-list {
    .project-item {
      display: flex;
      border: 1px solid #f1f1f1;
      .project-avatar {
        margin: 0.5em;
        padding-top: 0.5em;
      }
      .project-name {
        margin-top: 0.5em;
      }
    }
  }
}
</style>
