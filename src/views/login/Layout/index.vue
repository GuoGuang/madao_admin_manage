<template>
  <div class="main">
    <el-card class="login_box_card" >
      <div style="padding:20px">

        <el-row :gutter="20">

          <el-col :span="15">
            <div class="left-form">
              <header>
                <div class="logo">

                  <img src="./logo.svg">
                  &nbsp;&nbsp;&nbsp;
                  <h1> Cloud管理系统</h1>
                </div>
                <h2 class="slogan">
                  吾生有涯愿无尽，心期填海力移山
                </h2>
              </header>
              <section>
                <slot/>
              </section>
          </div></el-col>
          <el-col :span="9">
            <div class="right-third">
              <p style="text-align:center"> 第三方账号登录</p>
              <el-button style="text-align:center; margin: 1em;display: table;" type="danger"><svg-icon icon-class="google"/>GooGle登录</el-button>
              <el-button style="text-align:center; margin: 1em; display: table;" type="primary"><svg-icon icon-class="qq"/>QQ登录</el-button>
              <el-button style="text-align:center; margin: 1em; display: table;" type="info"><svg-icon icon-class="github"/>GitHub登录</el-button>
              <el-button style="text-align:center; margin: 1em; display: table;" type="warning"><svg-icon icon-class="face"/>人脸登录</el-button>
            </div>
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
        padding: 0 2em;
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
        height: 38em;
        margin: auto;
    }
    .logo {
        display: flex;
        justify-content: center;
        background-size: contain;
        img{
          width: 100px
        }
        p{
          line-height: 33px;
        }
    }
    .slogan {
        margin: 30px 0 20px;
        font-weight: 400;
        font-size: 18px;
        line-height: 1;
        text-align: center;
        color: #777777
    }
    .footer {
        padding-left: 3em;
        display: flex;
        align-items: center;
        background: #f4f4f5;
        height: 4em;
    }
</style>

