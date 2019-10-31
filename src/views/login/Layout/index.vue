<template>
  <div class="main">
    <el-card class="login_box_card">
      <div class="login-core" >
        <el-row :gutter="20">
          <el-col :span="13">
            <div class="left-form">
              <img src="https://vue-admin-guoguang.oss-cn-shanghai.aliyuncs.com/sadasda.svg" style="width: 100%;background-size: cover;">
          </div></el-col>
          <el-col :span="11">
            <section>
              <slot/>
            </section>
          </el-col>
        </el-row>

      </div>

      <footer>
        <div class="footer">
          还没有账号？
          <el-link type="primary">立即注册</el-link>&nbsp;&nbsp;
          <el-link type="primary">游客访问</el-link>&nbsp;&nbsp;
          <el-link type="primary">问答阅读</el-link>&nbsp;&nbsp;

        </div>
      </footer>
    </el-card>

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
<!-- 防止修改外部css -->
<style >
.login_box_card .el-card__body {
  padding: 0px;
}
</style>

<style scoped lang="scss" >
.login_box_card {
  overflow: auto;
  box-shadow: 0 2px 60px 0 #224bb0;
  .login-core {
    padding: 20px;
    min-width: 1080px;
  }
  .left-form {
    margin: 3em;
    padding: 0 2em;
  }
  .right-third {
    padding-top: 7em;
    display: flex;
    flex-direction: column;
  }
}
.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}
.main {
  position: absolute;

  width: 65%;
  height: 38em;
  margin-left: 18%;
  margin-top: 7%;
}
.logo {
  display: flex;
  justify-content: center;
  background-size: contain;
  img {
    width: 100px;
  }
  p {
    line-height: 33px;
  }
}
.slogan {
  margin: 30px 0 20px;
  font-weight: 400;
  font-size: 18px;
  line-height: 1;
  text-align: center;
  color: #777777;
}
.footer {
  padding-left: 3em;
  display: flex;
  align-items: center;
  background: #f4f4f5;
  height: 4em;
}
</style>

