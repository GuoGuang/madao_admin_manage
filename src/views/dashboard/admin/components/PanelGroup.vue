<template>

  <el-row :gutter="40" class="panel-group" style="margin-left: inherit;margin-right: inherit;">
    <el-col :xs="12" :sm="12" :lg="15" class="card-panel-col">
      <div class="head-info-avatar"><img alt="头像" src="http://vue-admin-guoguang.oss-cn-shanghai.aliyuncs.com/icode/image/avatar/87d8194bc9834e9f8f0228e9e530beb1.jpeg"></div>
      <div class="head-info-count"><div class="head-info-welcome">
        {{ new Date() | cueerntPeriodsFilter }} ，{{ userInfo.nickName }}，周末要不要去看电影？
      </div>
        <div class="head-info-desc">
          <p>普通用户</p>
        </div>
        <div class="head-info-time">
          上次登录时间：{{ formatTimeFilter('1565243251') }}
        </div>
      </div>
    </el-col>
    <el-col :xs="3" :md="4" :sm="3" :lg="3" class="info-count">
      <span class="info-span">今日IP</span>
      <count-to :start-val="0" :end-val="12" :duration="2600" class="card-panel-num"/>

    </el-col>
    <el-col :xs="3" :md="4" :sm="3" :lg="3" class="info-count">
      <span class="info-span">今日访问</span>
      <count-to :start-val="0" :end-val="109" :duration="2600" class="card-panel-num"/>

    </el-col>
    <el-col :xs="3" :md="4" :sm="3" :lg="3" class="info-count">
      <span class="info-span">总访问量</span>
      <count-to :start-val="0" :end-val="102400" :duration="2600" class="card-panel-num"/>

    </el-col>
  </el-row>

</template>

<script>
import CountTo from 'vue-count-to'
import { formatTime, cueerntPeriodsFormat } from '@/utils'
export default {
  components: {
    CountTo
  },
  filters: {
    cueerntPeriodsFilter(now) {
      return cueerntPeriodsFormat(now)
    }
  },
  data() {
    return {
      userInfo: this.$store.getters.user
    }
  },
  methods: {
    handleSetLineChartData(type) {
      this.$emit('handleSetLineChartData', type)
    },
    formatTimeFilter(time) {
      return formatTime(time)
    }

  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.panel-group {
  border-radius: 0px 30px 0px 0px;
  margin-bottom: 1em;
  .card-panel-num {
    color: #42b983;
    font-weight: 600;
    font-size: 1rem;
  }
  background: rgb(255, 255, 255);
  padding: 1em;
  .card-panel-col {
    display: flex;
  }
  .info-count {
    display: grid;
    text-align: center;
    margin-top: 2em;
    .info-span {
      padding-bottom: 1em;
    }
  }
  .head-info-avatar {
    padding-right: 1em;

    img {
      width: 6em;
      border-radius: 2px;
    }
  }
  .head-info-count {
    padding-top: 0.5em;
  }
  .head-info-desc {
    color: rgba(0, 0, 0, 0.45);
    font-size: 0.8rem;
    padding: 0.2rem 0;
  }
  .head-info-time {
    color: rgba(0, 0, 0, 0.45);
    font-size: 0.8rem;
    padding: 0.2rem 0;
  }
}
</style>
