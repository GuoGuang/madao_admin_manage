<template>
  <!-- 手绘roughviz图表 -->
  <div class="dashboard-editor-container">
    <div class="chart-wrapper">
      <!-- 饼图 -->
      <pie-chart />

      <!-- 柱状图 -->
      <rough-bar
        data="https://raw.githubusercontent.com/jwilber/random_data/master/flavors.csv"
        labels="flavor"
        values="price"
      />

      <!-- 饼图 -->
      <rough-donut
        :data="{
          labels: ['North', 'South', 'East', 'West'],
          values: [10, 5, 8, 3]
        }"
        :colors="['red', 'orange', 'blue', 'skyblue']"
        title="Regions"
        roughness="8"
        stroke="black"
        stroke-width="3"
        fill-style="cross-hatch"
        fill-weight="3.5"
      />

      <!-- 折线图 -->
      <rough-line
        data="https://raw.githubusercontent.com/jwilber/random_data/master/profits.csv"
        y1="revenue"
        y2="cost"
        y3="profit"
      />

      <!-- 饼图 -->
      <rough-pie
        :data="{
          labels: ['North', 'South', 'East', 'West'],
          values: [10, 5, 8, 3]
        }"
        :colors="['red', 'orange', 'blue', 'skyblue']"
        title="Regions"
        roughness="8"
      />

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
        width="400"
        height="450"
        font="0"
        x-label="sepal width"
        y-label="petal length"
        curb-zero="false"
      />

      <!-- 堆积面积图 -->
      <rough-stacked-bar
        :data="[
          { month: 'Jan', A: 20, B: 5, C: 10 },
          { month: 'Feb', A: 25, B: 10, C: 20 },
          { month: 'March', A: 30, B: 50, C: 10 }
        ]"
        :colors="['blue', '#f996ae', 'skyblue', '#9ff4df']"
        labels="month"
        title="Monthly Revenue"
        roughness="2"
        fill-weight="0.35"
        stroke-width="0.5"
        fill-style="cross-hatch"
        stroke="black"
      />

      <!-- 横线图 -->
      <rough-bar-h
        :margin="{ top: 50, bottom: 100, left: 160, right: 0 }"
        :data="{
          labels: [
            '1992 Ford Aerostar Van',
            '2013 Kia Rio',
            '1980 Honda CB 125s',
            '1992 Toyota Tercel'
          ],
          values: [8, 4, 6, 2]
        }"
        title="Vehicles I've Had"
        title-font-size="1.5rem"
        legend="false"
        x-label="Time Owned (Years)"
        stroke-width="2"
        fill-style="zigzag-line"
        highlight="gold"
      />
    </div>
  </div>
</template>

<script>

import RoughBar from '@/components/Charts/roughviz/RoughBar.vue'
import RoughDonut from '@/components/Charts/roughviz/RoughDonut.vue'
import RoughPie from '@/components/Charts/roughviz/RoughPie.vue'
import RoughLine from '@/components/Charts/roughviz/RoughLine.vue'
import RoughScatter from '@/components/Charts/roughviz/RoughScatter.vue'
import RoughStackedBar from '@/components/Charts/roughviz/RoughStackedBar.vue'
import RoughBarH from '@/components/Charts/roughviz/RoughBarH.vue'

export default {
  name: 'Roughviz',
  components: {

    RoughBar,
    RoughDonut,
    RoughPie,
    RoughLine,
    RoughScatter,
    RoughStackedBar,
    RoughBarH
  },
  data() {
    return {

    }
  },
  methods: {

  }
}
</script>
