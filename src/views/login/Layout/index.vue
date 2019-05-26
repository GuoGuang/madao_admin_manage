<template>
  <div class="main">
    <el-card class="login_box_card" >
      <div style="padding:20px">

        <el-row :gutter="20">

          <el-col :span="15">
            <div class="left-form">
              <header>
                <h1 class="logo">
                  探索
                </h1>
                <h2 class="slogan">
                  与世界分享你的知识、经验和见解
                </h2>
              </header>
              <section>
                <slot/>
              </section>
          </div></el-col>
          <el-col :span="9">
            <div class="right-third">
              <p style="text-align:center"> 第三方账号登录</p>
              <el-button style="text-align:center;        margin: 1em;display: table;" type="danger">微博登录</el-button>
              <el-button style="text-align:center;       margin: 1em; display: table;" type="primary">QQ登录</el-button>
            </div>
          </el-col>
        </el-row>

      </div>

      <footer>
        <div class="footer">
          还没有账号？
          <a>立即注册</a> &nbsp;&nbsp;
          <a>游客访问</a>&nbsp;&nbsp;
          <a>问答阅读</a>&nbsp;&nbsp;
        </div>
      </footer>
    </el-card>

  </div>
</template>
<script>
export default {
  name: 'Layout'
}
</script>
<!-- 防止修改外部css -->
<style >
.login_box_card .el-card__body{
        padding:0px
}

</style>

<style scoped lang="scss">

.login_box_card{
    .left-form{
        border-right: 1px solid #d4d4e0;
        padding: 2em;
    }
    .right-third{
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
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        width: 880px;
        height: 35em;
        margin: auto;
    }
    .logo {
        font-size: 0;
        margin: 0 auto;
        width: 160px;
        height: 74px;
        background: url(../Layout/logo.png) no-repeat;
        background-size: contain;
    }
    .slogan {
        margin: 30px 0 20px;
        font-weight: 400;
        font-size: 18px;
        line-height: 1;
        text-align: center;
    }
    .footer {
        padding-left: 3em;
        display: flex;
        align-items: center;
        background: #f4f4f5;
        height: 4em;
    }
</style>

