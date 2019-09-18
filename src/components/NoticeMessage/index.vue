<template>
  <div >
    <el-badge :is-dot="true" style="line-height: 1em;cursor: pointer;" @click.native="dialogTableVisible=true">
      <i class="el-icon-bell" style="font-size: 1.4em;"/>
    </el-badge>

    <el-dialog :visible.sync="dialogTableVisible" title="站内消息通知" width="80%"/>

  </div>
</template>

<script>
export default {
  name: 'NoticeMessage',
  data() {
    return {
      dialogTableVisible: false
    }
  },
  computed: {

  }
}
</script>

<style scoped>

.message-title {
  font-size: 16px;
  color: #333;
  font-weight: bold;
  padding-right: 8px;
}
</style>
