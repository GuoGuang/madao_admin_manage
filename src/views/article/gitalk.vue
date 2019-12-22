<template>
  <div class="gitalk-container">
    <div id="gitalk-container" ref="gitalk-container" />
  </div>
</template>
<script>
import 'gitalk/dist/gitalk.css'
import Gitalk from 'gitalk'
export default {
  name: 'Gitalk',
  props: {
    id: {
      type: String,
      default: '66'
    }},
  data() {
    return {}
  },
  mounted() {
    const gitalk = new Gitalk({
      clientID: 'fa3714a861c9862930cf',
      clientSecret: 'f7fcd0b22b47a0286ab40bbdd2766171358d2f37',
      repo: 'ibole_admin_manage',
      owner: 'GuoGuang',
      admin: ['GuoGuang'],
      id: this.id, // Ensure uniqueness and length less than 50
      distractionFreeMode: false // Facebook-like distraction free mode
    })

    gitalk.render('gitalk-container')
  },
  update() {
    const githeader = document.querySelector('.gt-header')
    console.log(githeader)
  }
}
</script>

<style lang="scss" >
.gitalk-container {
  .gt-header {
    display: none;
  }
}
</style>
