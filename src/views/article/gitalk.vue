<template>
  <div class="gitalk-container">
    <div id="gitalk-container" ref="gitalk-container"/>
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
      clientID: 'GitHub Application Client ID',
      clientSecret: 'GitHub Application Client Secret',
      repo: 'GitHub repo',
      owner: 'GitHub repo owner',
      admin: ['GitHub repo owner and collaborators, only these guys can initialize github issues'],
      id: location.pathname, // Ensure uniqueness and length less than 50
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
