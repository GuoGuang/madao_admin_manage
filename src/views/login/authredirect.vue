
<!-- 作用: 第三方登录成功之后会默认跳到授权的页面，授权的页面会再次重定向回我们的后台，由于是spa，改变路由的体验不好，
      我们通过window.opener.location.href的方式改变hash，在login.js里面再监听hash的变化。当hash变化时，
      获取之前第三方登录成功返回的code与第一步账号密码登录之后返回的uid一同发送给服务端验证是否正确，如果正确，这时候就是真正的登录成功-->
<script>
export default {
  name: 'AuthRedirect',
  created() {
    const hash = window.location.search.slice(1)
    window.opener.location.href = window.location.origin + '/login#' + hash
    window.close()
  }
}
</script>
