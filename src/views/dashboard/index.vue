<template>
  <div class="dashboard-container">
    <component :is="currentRole"/>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import adminDashboard from './admin'
import editorDashboard from './editor'

// 界面引导
import * as Driver from 'driver.js' // 导入 driver.js
import 'driver.js/dist/driver.min.css' // 导入 driver.js css
import steps from '@/components/guide/defineSteps.js' // 步骤

export default {
  name: 'Dashboard',
  components: { adminDashboard, editorDashboard },
  data() {
    return {
      currentRole: 'adminDashboard',
      driver: new Driver({
        doneBtnText: '完成', // Text on the final button
        closeBtnText: '关闭', // Text on the close button for this step
        nextBtnText: '下一步', // Next button text for this step
        prevBtnText: '上一步' // Previous button text for this step
      })
    }
  },
  computed: {
    ...mapGetters([
      'roles',
      'lastDate',
      'avatar'
    ])
  },
  mounted() {
    // 用户第一次登录时启用页面引导
    if (!this.avatar) {
      this.driver.defineSteps(steps)
      this.driver.start()
    }
  },
  created() {
    // if (!this.roles.includes('admin')) {
    //   this.currentRole = 'editorDashboard'
    // }
  }
}
</script>
