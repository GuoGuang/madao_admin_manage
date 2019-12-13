<template>
  <div class="dashboard-editor-container">
    <github-corner class="github-corner" />

    <panel-group />

    <el-row :gutter="32">

      <el-col :xs="24" :sm="24" :lg="24">
        <!-- <bar-chart/> -->
        <!-- 折线图 -->
        <rough-line
          data="https://raw.githubusercontent.com/jwilber/random_data/master/profits.csv"
          y1="revenue"
          y2="cost"
          y3="profit"
          title="Visits in the past seven days"
          width="1470"
          height= "500"
          radius="18"
          font="0"
        />
      </el-col>

    </el-row>

    <el-row :gutter="32">
      <el-col :xs="16" :sm="16" :lg="12">
        <!-- <pie-chart /> -->

        <!-- 饼图 -->
        <rough-pie
          :data="{
            labels: ['Baidu', 'Google', 'Biying', 'Sougou','360'],
            values: [1006, 558, 258,153,725]
          }"
          :colors="['red', 'orange', 'blue', 'skyblue','green']"
          title="System access statistics"
          width="700"
          radius="18"
          font="0"
          roughness="6"
        />
      </el-col>
      <el-col :xs="8" :sm="8" :lg="12">

        <!-- 散点图 -->
        <rough-scatter
          :colors="['pink', 'coral', 'skyblue']"
          data="https://raw.githubusercontent.com/uiuc-cse/data-fa14/gh-pages/data/iris.csv"
          title="Iris Scatter Plot"
          x="sepal_width"
          y="petal_length"
          color-var="species"
          highlight-label="species"
          fill-weight="4"
          radius="12"
          stroke="black"
          stroke-width="0.4"
          roughness="1"
          width="800"
          height="450"
          font="0"
          x-label="sepal width"
          y-label="petal length"
          curb-zero="false"
        />
      </el-col>

    </el-row>
  </div>
</template>

<script>
import GithubCorner from '@/components/GithubCorner'
import PanelGroup from './components/PanelGroup'
import PieChart from './components/PieChart'
import BarChart from './components/BarChart'

import RoughScatter from '@/components/Charts/roughviz/RoughScatter.vue'
import RoughLine from '@/components/Charts/roughviz/RoughLine.vue'
import RoughPie from '@/components/Charts/roughviz/RoughPie.vue'

export default {
  name: 'DashboardAdmin',
  components: {
    GithubCorner,
    PanelGroup,
    PieChart,
    RoughPie,
    RoughLine,
    RoughScatter,
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
  background-color: rgb(240, 242, 245);
  position: relative;
  .github-corner {
    z-index: 1;
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
    padding-right: 25px;
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
