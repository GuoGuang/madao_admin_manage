<template>
  <!-- 主页面区域 -->
  <section class="app-main" >
    <transition name="fade-transform" mode="out-in">
      <keep-alive :include="cachedViews">
        <router-view :key="key"/>
      </keep-alive>
    </transition>
  </section>
</template>

<script>
export default {
  name: 'AppMain',
  computed: {
    cachedViews() {
      return this.$store.state.tagsView.cachedViews
    },
    key() {
      return this.$route.fullPath
    }
  }
}
</script>

<style scoped>
.app-main {
  padding: 1em;
  border: 0.6em solid rgb(241, 242, 245);
  /*
  *   84 = navbar + tags-view = 50 +34
  *   84px = 头部 + 图标标签 = 50 + 34  头部设置高度为50 图标标签高度为34
      如果要改版将面包屑换为导航栏也有下拉选项的类似http://demo.admui.com/components/basic/images这个网站 只需要修改
      navbar 高度设为70px 或者将tags-view去掉,然后
      min-height: calc(100vh - 105px);设置105px
   */
  min-height: calc(100vh - 84px);
  width: 100%;
  position: relative;
  overflow: hidden;
}
</style>

