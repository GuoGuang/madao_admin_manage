
<template>
  <div class="background" />
</template>
<style scoped>
.background {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 0;
  overflow: hidden;
  background: url(https://vue-admin-guoguang.oss-cn-shanghai.aliyuncs.com/%E7%AE%A1%E7%90%86%E7%B3%BB%E7%BB%9F%E7%99%BB%E5%BD%95%E9%A1%B5.png)
    no-repeat center center fixed;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
}
</style>
<script>
export default {
  name: 'Layout',
  mounted() {}
}
</script>
