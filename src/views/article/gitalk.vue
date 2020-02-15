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
    return {
      gitalk: ''
    }
  },
  watch: {
    id() {
      const el = document.getElementById('gitalk-container')
      while (el.hasChildNodes()) el.removeChild(el.firstChild)
      this.loadGitalk()
    }
  },
  mounted() {
    this.loadGitalk()
  },
  methods: {
    loadGitalk() {
      this.gitalk = new Gitalk({
        clientID: '8a3073a44899f1576f1d',
        clientSecret: '7f8333d007147027772496cb8d4d9f7ff2bd216f',
        repo: 'comments',
        owner: 'jackonli-Eils',
        admin: ['jackonli-Eils'],
        id: this.id, // Ensure uniqueness and length less than 50
        distractionFreeMode: false // Facebook-like distraction free mode
      })
      this.gitalk.render('gitalk-container')
    }
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
