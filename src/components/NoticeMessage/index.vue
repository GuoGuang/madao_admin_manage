<template>
  <div class="notifications_block">
    <el-badge :is-dot="true" style="line-height: 1em;cursor: pointer;" @click.native="drawerTableVisible=true">
      <i class="el-icon-bell" style="font-size: 1.4em;" />
    </el-badge>

    <el-drawer
      :visible.sync="drawerTableVisible"
      :direction="direction"
      title="站内消息通知"
      class="message"
      size="23%"
    >
      <div id="alert1654" class="notification_container">
        <div class="notification_title open">
          <i class="el-icon-warning " />
          消息模板 - 2019-09-20
        </div>

        <div class="notification_entry">
          Event Type: Network Upgrade<br>
          Start Time: 2019-09-20 17:00:00 UTC<br>
          End Time: 2019-09-20 21:00:00 UTC<br>
          <br>
          Event Summary: The Tokyo network will be upgraded to provide network enhancements as part of ongoing efforts to provide excellent service and maintain an ideal hosting environment. A device reload may be necessary and some customers may experience brief periods of latency or packetloss while routes are updated across the redundant topology.
        </div>
        <div class="notification_date">
          <div style="display: inline-block; cursor:pointer;" data-popup2="MTMgaG91cnMgYWdvIChVVEMp" data-original-title="13 hours ago (UTC)">
            2019-09-18 18:40:00
          </div>
        </div>
        <span id="dismiss1654" class="notification_dismiss" onclick="hideNotification('1654');">Dismiss</span>
      </div>
    </el-drawer>
  </div>
</template>

<script>
export default {
  name: 'NoticeMessage',
  data() {
    return {
      drawerTableVisible: false,
      direction: 'rtl'
    }
  },
  computed: {

  }
}
</script>

<style>
.notification_container{
  color: #4e5259;
font-family: "Roboto", Helvetica, Arial, sans-serif;
font-size: 15px;
font-weight: 400;
line-height: 24px;
box-sizing: inherit;
border-top: 1px solid #EDF0F2;
padding: 20px 30px;
}

.notification_title {
  position: relative;
  font-size: 15px;
  font-weight: bold;
  line-height: 20px;
}

#notifications_header {
  font-size: 17px;
  margin: 16px 30px;
  color: #1e2736;
  font-weight: 500;
  text-align: left;
  line-height: 20px;
}

#notifications_header a {
  font-size: 13px;
  font-weight: 200;
  display: block;
}

.notification_date {
  display: inline-block;
  font-size: 11px;
  padding: 20px 0px 0px 0px;
  margin-bottom: 7px;
  opacity: .7;
  width: 81%;
}

.notification_entry {
  font-size: 13px;
  line-height: 23px;
}

.notification_dismiss {
  cursor: pointer;
  color: #007bfc;
  text-decoration: none;
  font-size: 11px;
}
</style>
