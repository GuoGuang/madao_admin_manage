<template>
  <div class="login">
    <section>
      <slot />
    </section>
  </div>
</template>
<script>
import { loginByGitHub } from '@/api/user/user'
export default {
  name: 'Layout',
  methods: {
    githubLogin() {
      // 登录
      loginByGitHub().then(response => {
        window.open(response.data)
      })
    }
  }
}
</script>
