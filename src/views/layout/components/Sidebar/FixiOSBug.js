export default {
  computed: {
    device() {
      return this.$store.state.app.device
    }
  },
  mounted() {
    // 为了修复ios设备上的点击菜单，会触发mouseeleave bug
    // https://github.com/PanJiaChen/vue-element-admin/issues/1135
    this.fixBugIniOS()
  },
  methods: {
    fixBugIniOS() {
      const $submenu = this.$refs.submenu
      if ($submenu) {
        const handleMouseleave = $submenu.handleMouseleave
        $submenu.handleMouseleave = (e) => {
          if (this.device === 'mobile') {
            return
          }
          handleMouseleave(e)
        }
      }
    }
  }
}
