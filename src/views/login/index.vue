
<template>
  <layout class="login">

    <div class="restyle-login">

      <!-- 头 -->
      <div class="header">
        <img src="https://yd-note.oss-cn-beijing.aliyuncs.com/favicon.ico" alt="创新" width="50" class="brand-img">
        <div class="signup">
          <span><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">还没有帐号？</font></font></span>
          <a href="/register" class="btn"><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">注册</font></font></a>
        </div>
      </div>
      <!-- 左侧 -->
      <div class="restyle-login__left">
        <div class="left-content">
          <img src="@/assets/register-img.png" alt="img">
          <ul>
            <li><font style="vertical-align: inherit;"><font style="vertical-align: inherit;"/>获取最新前沿技术知识Java、大数据、渗透</font></li>
            <li><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">网站后台博客</font></font></li>
            <li><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">免费发送电子邮件</font></font></li>
            <li><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">视觉设计点滴运动</font></font></li>
            <li><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">识别网站上的技术</font></font></li>
          </ul>
        </div>
      </div>

      <!-- 右侧 -->
      <main-form class="restyle-login__right"/>
    </div>

  </layout>
</template>

<script>
// 添加引用网站app.snov.io
import Layout from './Layout/index'
import MainForm from './Layout/form'
export default {
  name: 'Login',
  components: {
    Layout,
    MainForm
  }
}
</script>

<!-- 防止修改外部css -->
<style lang="scss" >
.login {
  fieldset {
    min-width: 0;
    margin: 0;
  }

  fieldset,
  legend {
    padding: 0;
    border: 0;
  }

  legend {
    display: block;
    width: 100%;
    margin-bottom: 18px;
    font-size: 19.5px;
    line-height: inherit;
    color: #333;
    border-bottom: 1px solid #e5e5e5;
  }

  label {
    display: inline-block;
    max-width: 100%;
    margin-bottom: 5px;
    font-weight: 700;
  }

  input[type="search"] {
    box-sizing: border-box;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
  }

  input[type="checkbox"],
  input[type="radio"] {
    margin: 4px 0 0;
    margin-top: 1px\9;
    line-height: normal;
  }

  fieldset[disabled] input[type="checkbox"],
  fieldset[disabled] input[type="radio"],
  input[type="checkbox"].disabled,
  input[type="checkbox"][disabled],
  input[type="radio"].disabled,
  input[type="radio"][disabled] {
    cursor: not-allowed;
  }

  input[type="file"] {
    display: block;
  }

  input[type="range"] {
    display: block;
    width: 100%;
  }

  select[multiple],
  select[size] {
    height: auto;
  }

  input[type="checkbox"]:focus,
  input[type="file"]:focus,
  input[type="radio"]:focus {
    outline: 5px auto -webkit-focus-ring-color;
    outline-offset: -2px;
  }

  output {
    padding-top: 8px;
  }

  .form-control,
  output {
    display: block;
    font-size: 13px;
    line-height: 1.42857143;
    color: #555;
  }

  .form-control {
    width: 100%;
    height: 36px;
    padding: 7px 14px;
    background-color: #fff;
    background-image: none;
    border: 1px solid #dad9e8;
    border-radius: 3px;
    box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);
    box-shadow: inset 0 1px 1px 1px 1px rgba(0, 0, 0, 0.075) px
      rgba(0, 0, 0, 0.1);
    transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  }

  .form-control:focus {
    border-color: #0de59b;
    outline: 0;
    box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075),
      0 0 8px rgba(13, 229, 155, 0.6);
    box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075),
      0 0 8px 1px 1px rgba(13, 229, 155, 0.6) px rgba(0, 0, 0, 0.1);
  }

  .form-control::-moz-placeholder {
    color: #999;
    opacity: 1;
  }

  .form-control:-ms-input-placeholder {
    color: #999;
  }

  .form-control::-webkit-input-placeholder {
    color: #999;
  }

  .form-control::-ms-expand {
    background-color: transparent;
    border: 0;
  }

  .form-control[disabled],
  .form-control[readonly],
  fieldset[disabled] .form-control {
    background-color: #eee;
    opacity: 1;
  }

  .form-control[disabled],
  fieldset[disabled] .form-control {
    cursor: not-allowed;
  }

  textarea.form-control {
    height: auto;
  }

  @media screen and (-webkit-min-device-pixel-ratio: 0) {
    input[type="date"].form-control,
    input[type="datetime-local"].form-control,
    input[type="month"].form-control,
    input[type="time"].form-control {
      line-height: 36px;
    }

    .input-group-sm input[type="date"],
    .input-group-sm input[type="datetime-local"],
    .input-group-sm input[type="month"],
    .input-group-sm input[type="time"],
    input[type="date"].input-sm,
    input[type="datetime-local"].input-sm,
    input[type="month"].input-sm,
    input[type="time"].input-sm {
      line-height: 30px;
    }

    .input-group-lg input[type="date"],
    .input-group-lg input[type="datetime-local"],
    .input-group-lg input[type="month"],
    .input-group-lg input[type="time"],
    input[type="date"].input-lg,
    input[type="datetime-local"].input-lg,
    input[type="month"].input-lg,
    input[type="time"].input-lg {
      line-height: 47px;
    }
  }

  .form-group {
    margin-bottom: 24px;
  }

  .checkbox,
  .radio {
    position: relative;
    display: block;
    margin-top: 10px;
    margin-bottom: 10px;
  }

  @media (min-width: 768px) {
    .form-inline .form-group {
      display: inline-block;
      margin-bottom: 0;
      vertical-align: middle;
    }

    .form-inline .form-control {
      display: inline-block;
      width: auto;
      vertical-align: middle;
    }

    .form-inline .form-control-static {
      display: inline-block;
    }

    .form-inline .input-group {
      display: inline-table;
      vertical-align: middle;
    }

    .form-inline .input-group .form-control,
    .form-inline .input-group .input-group-addon,
    .form-inline .input-group .input-group-btn {
      width: auto;
    }

    .form-inline .input-group > .form-control {
      width: 100%;
    }

    .form-inline .control-label {
      margin-bottom: 0;
      vertical-align: middle;
    }

    .form-inline .checkbox,
    .form-inline .radio {
      display: inline-block;
      margin-top: 0;
      margin-bottom: 0;
      vertical-align: middle;
    }

    .form-inline .checkbox label,
    .form-inline .radio label {
      padding-left: 0;
    }

    .form-inline .checkbox input[type="checkbox"],
    .form-inline .radio input[type="radio"] {
      position: relative;
      margin-left: 0;
    }

    .form-inline .has-feedback .form-control-feedback {
      top: 0;
    }
  }

  .form-horizontal .checkbox,
  .form-horizontal .checkbox-inline,
  .form-horizontal .radio,
  .form-horizontal .radio-inline {
    padding-top: 8px;
    margin-top: 0;
    margin-bottom: 0;
  }

  .form-horizontal .checkbox,
  .form-horizontal .radio {
    min-height: 26px;
  }

  .form-horizontal .form-group {
    margin-right: -25px;
    margin-left: -25px;
  }

  @media (min-width: 768px) {
    .form-horizontal .control-label {
      padding-top: 8px;
      margin-bottom: 0;
      text-align: right;
    }
  }

  .form-horizontal .has-feedback .form-control-feedback {
    right: 25px;
  }

  @media (min-width: 768px) {
    .form-horizontal .form-group-lg .control-label {
      padding-top: 11px;
      font-size: 17px;
    }
  }

  @media (min-width: 768px) {
    .form-horizontal .form-group-sm .control-label {
      padding-top: 6px;
      font-size: 12px;
    }
  }

  .btn {
    display: inline-block;
    margin-bottom: 0;
    font-weight: 400;
    text-align: center;
    white-space: nowrap;
    vertical-align: middle;
    touch-action: manipulation;
    cursor: pointer;
    background-image: none;
    border: 1px solid transparent;
    padding: 7px 14px;
    font-size: 13px;
    line-height: 1.42857143;
    border-radius: 3px;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }

  .btn.active.focus,
  .btn.active:focus,
  .btn.focus,
  .btn:active.focus,
  .btn:active:focus,
  .btn:focus {
    outline: 5px auto -webkit-focus-ring-color;
    outline-offset: -2px;
  }

  .btn.focus,
  .btn:focus,
  .btn:hover {
    color: #7d63ec;
    text-decoration: none;
  }

  .btn-checkbox.active,
  .btn-checkbox:active,
  .btn.active,
  .btn:active {
    background-image: none;
    outline: 0;
    box-shadow: inset 0 3px 5px rgba(0, 0, 0, 0.125);
    box-shadow: inset 0 3px 5px 1px 1px rgba(0, 0, 0, 0.125) px
      rgba(0, 0, 0, 0.1);
  }

  .btn.disabled,
  .btn[disabled],
  fieldset[disabled] .btn {
    cursor: not-allowed;
    filter: alpha(opacity=65);
    opacity: 0.65;
    box-shadow: none;
    box-shadow: 1px 1px nonepx rgba(0, 0, 0, 0.1);
  }

  a.btn.disabled,
  fieldset[disabled] a.btn {
    pointer-events: none;
  }

  .btn-checkbox,
  .btn-default {
    color: #7d63ec;
    background-color: #f7f7fd;
    border-color: #ebeafa;
  }

  .btn-default.focus,
  .btn-default:focus {
    color: #7d63ec;
    background-color: #cecef3;
    border-color: #8983e1;
  }

  .btn-default:hover {
    color: #7d63ec;
    background-color: #cecef3;
    border-color: #bcb9ee;
  }

  .btn-default.active,
  .btn-default:active,
  .open > .dropdown-toggle.btn-default {
    color: #7d63ec;
    background-color: #cecef3;
    background-image: none;
    border-color: #bcb9ee;
  }

  .btn-default.active.focus,
  .btn-default.active:focus,
  .btn-default.active:hover,
  .btn-default:active.focus,
  .btn-default:active:focus,
  .btn-default:active:hover,
  .open > .dropdown-toggle.btn-default.focus,
  .open > .dropdown-toggle.btn-default:focus,
  .open > .dropdown-toggle.btn-default:hover {
    color: #7d63ec;
    background-color: #b2b2ec;
    border-color: #8983e1;
  }

  .btn-default.disabled.focus,
  .btn-default.disabled:focus,
  .btn-default.disabled:hover,
  .btn-default[disabled].focus,
  .btn-default[disabled]:focus,
  .btn-default[disabled]:hover,
  fieldset[disabled] .btn-default.focus,
  fieldset[disabled] .btn-default:focus,
  fieldset[disabled] .btn-default:hover {
    background-color: #f7f7fd;
    border-color: #ebeafa;
  }

  .btn-default .badge {
    color: #f7f7fd;
    background-color: #7d63ec;
  }

  .btn-primary {
    color: #fff;
    background-color: #7d63ec;
    border-color: #7d63ec;
  }

  .btn-primary.focus,
  .btn-primary:focus {
    color: #fff;
    background-color: #5736e6;
    border-color: #3517b9;
  }

  .btn-primary:hover {
    color: #fff;
    background-color: #5736e6;
    border-color: #502ce5;
  }

  .btn-primary.active,
  .btn-primary:active,
  .open > .dropdown-toggle.btn-primary {
    color: #fff;
    background-color: #5736e6;
    background-image: none;
    border-color: #502ce5;
  }

  .btn-primary.active.focus,
  .btn-primary.active:focus,
  .btn-primary.active:hover,
  .btn-primary:active.focus,
  .btn-primary:active:focus,
  .btn-primary:active:hover,
  .open > .dropdown-toggle.btn-primary.focus,
  .open > .dropdown-toggle.btn-primary:focus,
  .open > .dropdown-toggle.btn-primary:hover {
    color: #fff;
    background-color: #401bdd;
    border-color: #3517b9;
  }

  .btn-primary.disabled.focus,
  .btn-primary.disabled:focus,
  .btn-primary.disabled:hover,
  .btn-primary[disabled].focus,
  .btn-primary[disabled]:focus,
  .btn-primary[disabled]:hover,
  fieldset[disabled] .btn-primary.focus,
  fieldset[disabled] .btn-primary:focus,
  fieldset[disabled] .btn-primary:hover {
    background-color: #7d63ec;
    border-color: #7d63ec;
  }

  .btn-primary .badge {
    color: #7d63ec;
    background-color: #fff;
  }

  .btn-success {
    color: #fff;
    background-color: #45dea0;
    border-color: #45dea0;
  }

  .btn-success.focus,
  .btn-success:focus {
    color: #fff;
    background-color: #24cc88;
    border-color: #198b5d;
  }

  .btn-success:hover {
    color: #fff;
    background-color: #24cc88;
    border-color: #23c382;
  }

  .btn-success.active,
  .btn-success:active,
  .open > .dropdown-toggle.btn-success {
    color: #fff;
    background-color: #24cc88;
    background-image: none;
    border-color: #23c382;
  }

  .btn-success.active.focus,
  .btn-success.active:focus,
  .btn-success.active:hover,
  .btn-success:active.focus,
  .btn-success:active:focus,
  .btn-success:active:hover,
  .open > .dropdown-toggle.btn-success.focus,
  .open > .dropdown-toggle.btn-success:focus,
  .open > .dropdown-toggle.btn-success:hover {
    color: #fff;
    background-color: #1fae74;
    border-color: #198b5d;
  }

  .btn-success.disabled.focus,
  .btn-success.disabled:focus,
  .btn-success.disabled:hover,
  .btn-success[disabled].focus,
  .btn-success[disabled]:focus,
  .btn-success[disabled]:hover,
  fieldset[disabled] .btn-success.focus,
  fieldset[disabled] .btn-success:focus,
  fieldset[disabled] .btn-success:hover {
    background-color: #45dea0;
    border-color: #45dea0;
  }

  .btn-success .badge {
    color: #45dea0;
    background-color: #fff;
  }

  .btn-info {
    color: #fff;
    background-color: #41dcde;
    border-color: #41dcde;
  }

  .btn-info.focus,
  .btn-info:focus {
    color: #fff;
    background-color: #23c7c9;
    border-color: #188688;
  }

  .btn-info:hover {
    color: #fff;
    background-color: #23c7c9;
    border-color: #21bec0;
  }

  .btn-info.active,
  .btn-info:active,
  .open > .dropdown-toggle.btn-info {
    color: #fff;
    background-color: #23c7c9;
    background-image: none;
    border-color: #21bec0;
  }

  .nav {
    padding-left: 0;
    margin-bottom: 0;
    list-style: none;
  }

  .nav > li,
  .nav > li > a {
    position: relative;
    display: block;
  }

  .nav > li > a {
    padding: 10px 15px;
  }

  .nav > li > a:focus,
  .nav > li > a:hover {
    text-decoration: none;
    background-color: #eee;
  }

  .nav > li.disabled > a {
    color: #777;
  }

  .nav > li.disabled > a:focus,
  .nav > li.disabled > a:hover {
    color: #777;
    text-decoration: none;
    cursor: not-allowed;
    background-color: transparent;
  }

  .nav .open > a,
  .nav .open > a:focus,
  .nav .open > a:hover {
    background-color: #eee;
    border-color: #7d63ec;
  }

  .nav .nav-divider {
    height: 1px;
    margin: 8px 0;
    overflow: hidden;
    background-color: #e5e5e5;
  }

  .nav > li > a > img {
    max-width: none;
  }

  .nav-tabs {
    border-bottom: 1px solid #ddd;
  }

  .nav-tabs > li {
    float: left;
    margin-bottom: -1px;
  }

  .nav-tabs > li > a {
    margin-right: 2px;
    line-height: 1.42857143;
    border: 1px solid transparent;
    border-radius: 3px 3px 0 0;
  }

  .nav-tabs > li > a:hover {
    border-color: #eee #eee #ddd;
  }

  .nav-tabs > li.active > a,
  .nav-tabs > li.active > a:focus,
  .nav-tabs > li.active > a:hover {
    color: #555;
    cursor: default;
    background-color: #fff;
    border: 1px solid;
    border-color: #ddd #ddd transparent;
  }

  .nav-tabs.nav-justified {
    width: 100%;
    border-bottom: 0;
  }

  .nav-tabs.nav-justified > li {
    float: none;
  }

  .nav-tabs.nav-justified > li > a {
    margin-bottom: 5px;
    text-align: center;
  }

  .nav-tabs.nav-justified > .dropdown .dropdown-menu {
    top: auto;
    left: auto;
  }

  @media (min-width: 768px) {
    .nav-tabs.nav-justified > li {
      display: table-cell;
      width: 1%;
    }

    .nav-tabs.nav-justified > li > a {
      margin-bottom: 0;
    }
  }

  .nav-tabs.nav-justified > li > a {
    margin-right: 0;
    border-radius: 3px;
  }

  .nav-tabs.nav-justified > .active > a,
  .nav-tabs.nav-justified > .active > a:focus,
  .nav-tabs.nav-justified > .active > a:hover {
    border: 1px solid #ddd;
  }

  @media (min-width: 768px) {
    .nav-tabs.nav-justified > li > a {
      border-bottom: 1px solid #ddd;
      border-radius: 3px 3px 0 0;
    }

    .nav-tabs.nav-justified > .active > a,
    .nav-tabs.nav-justified > .active > a:focus,
    .nav-tabs.nav-justified > .active > a:hover {
      border-bottom-color: #fff;
    }
  }

  .nav-pills > li {
    float: left;
  }

  .nav-pills > li > a {
    border-radius: 3px;
  }

  .nav-pills > li + li {
    margin-left: 2px;
  }

  .nav-pills > li.active > a,
  .nav-pills > li.active > a:focus,
  .nav-pills > li.active > a:hover {
    color: #fff;
    background-color: #7d63ec;
  }

  .nav-stacked > li {
    float: none;
  }

  .nav-stacked > li + li {
    margin-top: 2px;
    margin-left: 0;
  }

  .nav-justified {
    width: 100%;
  }

  .nav-justified > li {
    float: none;
  }

  .nav-justified > li > a {
    margin-bottom: 5px;
    text-align: center;
  }

  .nav-justified > .dropdown .dropdown-menu {
    top: auto;
    left: auto;
  }

  @media (min-width: 768px) {
    .nav-justified > li {
      display: table-cell;
      width: 1%;
    }

    .nav-justified > li > a {
      margin-bottom: 0;
    }
  }

  .nav-tabs-justified {
    border-bottom: 0;
  }

  .nav-tabs-justified > li > a {
    margin-right: 0;
    border-radius: 3px;
  }

  .nav-tabs-justified > .active > a,
  .nav-tabs-justified > .active > a:focus,
  .nav-tabs-justified > .active > a:hover {
    border: 1px solid #ddd;
  }

  @media (min-width: 768px) {
    .nav-tabs-justified > li > a {
      border-bottom: 1px solid #ddd;
      border-radius: 3px 3px 0 0;
    }

    .nav-tabs-justified > .active > a,
    .nav-tabs-justified > .active > a:focus,
    .nav-tabs-justified > .active > a:hover {
      border-bottom-color: #fff;
    }
  }

  .tab-content > .tab-pane {
    display: none;
  }

  .tab-content > .active {
    display: block;
  }

  .nav-tabs .dropdown-menu {
    margin-top: -1px;
    border-top-left-radius: 0;
    border-top-right-radius: 0;
  }

  .navbar {
    position: relative;
    min-height: 64px;
    margin-bottom: 18px;
    border: 1px solid transparent;
  }

  @media (min-width: 768px) {
    .navbar {
      border-radius: 3px;
    }
  }

  @media (min-width: 768px) {
    .navbar-header {
      float: left;
    }
  }

  .navbar-collapse {
    padding-right: 25px;
    padding-left: 25px;
    overflow-x: visible;
    border-top: 1px solid transparent;
    box-shadow: inset 0 1px 0 hsla(0, 0%, 100%, 0.1);
    -webkit-overflow-scrolling: touch;
  }

  .navbar-collapse.in {
    overflow-y: auto;
  }

  @media (min-width: 768px) {
    .navbar-collapse {
      width: auto;
      border-top: 0;
      box-shadow: none;
    }

    .navbar-collapse.collapse {
      display: block !important;
      height: auto !important;
      padding-bottom: 0;
      overflow: visible !important;
    }

    .navbar-collapse.in {
      overflow-y: visible;
    }

    .navbar-fixed-bottom .navbar-collapse,
    .navbar-fixed-top .navbar-collapse,
    .navbar-static-top .navbar-collapse {
      padding-right: 0;
      padding-left: 0;
    }
  }

  .navbar-fixed-bottom,
  .navbar-fixed-top {
    position: fixed;
    right: 0;
    left: 0;
    z-index: 1030;
  }

  .navbar-fixed-bottom .navbar-collapse,
  .navbar-fixed-top .navbar-collapse {
    max-height: 340px;
  }

  @media (max-device-width: 480px) and (orientation: landscape) {
    .navbar-fixed-bottom .navbar-collapse,
    .navbar-fixed-top .navbar-collapse {
      max-height: 200px;
    }
  }

  @media (min-width: 768px) {
    .navbar-fixed-bottom,
    .navbar-fixed-top {
      border-radius: 0;
    }
  }

  .navbar-fixed-top {
    top: 0;
    border-width: 0 0 1px;
  }

  .navbar-fixed-bottom {
    bottom: 0;
    margin-bottom: 0;
    border-width: 1px 0 0;
  }

  .container-fluid > .navbar-collapse,
  .container-fluid > .navbar-header,
  .container > .navbar-collapse,
  .container > .navbar-header {
    margin-right: -25px;
    margin-left: -25px;
  }

  @media (min-width: 768px) {
    .container-fluid > .navbar-collapse,
    .container-fluid > .navbar-header,
    .container > .navbar-collapse,
    .container > .navbar-header {
      margin-right: 0;
      margin-left: 0;
    }
  }

  .navbar-static-top {
    z-index: 1000;
    border-width: 0 0 1px;
  }

  @media (min-width: 768px) {
    .navbar-static-top {
      border-radius: 0;
    }
  }

  .navbar-brand {
    float: left;
    height: 64px;
    padding: 23px 25px;
    font-size: 17px;
    line-height: 18px;
  }

  .navbar-brand:focus,
  .navbar-brand:hover {
    text-decoration: none;
  }

  .navbar-brand > img {
    display: block;
  }

  .popover.top {
    margin-top: -10px;
  }

  .popover.right {
    margin-left: 10px;
  }

  .popover.bottom {
    margin-top: 10px;
  }

  .popover.left {
    margin-left: -10px;
  }

  .popover > .arrow {
    border-width: 11px;
  }

  .popover > .arrow,
  .popover > .arrow:after {
    position: absolute;
    display: block;
    width: 0;
    height: 0;
    border-color: transparent;
    border-style: solid;
  }

  .popover > .arrow:after {
    content: "";
    border-width: 10px;
  }

  .popover.top > .arrow {
    bottom: -11px;
    left: 50%;
    margin-left: -11px;
    border-top-color: #999;
    border-top-color: rgba(0, 0, 0, 0.25);
    border-bottom-width: 0;
  }

  .popover.top > .arrow:after {
    bottom: 1px;
    margin-left: -10px;
    content: " ";
    border-top-color: #fff;
    border-bottom-width: 0;
  }

  .popover.right > .arrow {
    top: 50%;
    left: -11px;
    margin-top: -11px;
    border-right-color: #999;
    border-right-color: rgba(0, 0, 0, 0.25);
    border-left-width: 0;
  }

  .popover.right > .arrow:after {
    bottom: -10px;
    left: 1px;
    content: " ";
    border-right-color: #fff;
    border-left-width: 0;
  }

  .popover.bottom > .arrow {
    top: -11px;
    left: 50%;
    margin-left: -11px;
    border-top-width: 0;
    border-bottom-color: #999;
    border-bottom-color: rgba(0, 0, 0, 0.25);
  }

  .popover.bottom > .arrow:after {
    top: 1px;
    margin-left: -10px;
    content: " ";
    border-top-width: 0;
    border-bottom-color: #fff;
  }

  .popover.left > .arrow {
    top: 50%;
    right: -11px;
    margin-top: -11px;
    border-right-width: 0;
    border-left-color: #999;
    border-left-color: rgba(0, 0, 0, 0.25);
  }

  .popover.left > .arrow:after {
    right: 1px;
    bottom: -10px;
    content: " ";
    border-right-width: 0;
    border-left-color: #fff;
  }

  .popover-title {
    padding: 8px 14px;
    margin: 0;
    font-size: 13px;
    background-color: #f7f7f7;
    border-bottom: 1px solid #ebebeb;
    border-radius: 3px 3px 0 0;
  }

  .popover-content {
    padding: 9px 14px;
  }

  .carousel,
  .carousel-inner {
    position: relative;
  }

  .carousel-inner {
    width: 100%;
    overflow: hidden;
  }

  .carousel-inner > .item {
    position: relative;
    display: none;
    transition: left 0.6s ease-in-out;
  }

  .carousel-inner > .item > a > img,
  .carousel-inner > .item > img {
    line-height: 1;
  }

  @media (-webkit-transform-3d), (transform-3d) {
    .carousel-inner > .item {
      transition: -webkit-transform 0.6s ease-in-out;
      transition: transform 0.6s ease-in-out;
      transition: transform 0.6s ease-in-out, -webkit-transform 0.6s ease-in-out;
      -webkit-backface-visibility: hidden;
      backface-visibility: hidden;
      -webkit-perspective: 1000px;
      perspective: 1000px;
    }

    .carousel-inner > .item.active.right,
    .carousel-inner > .item.next {
      -webkit-transform: translate3d(100%, 0, 0);
      transform: translate3d(100%, 0, 0);
      left: 0;
    }

    .carousel-inner > .item.active.left,
    .carousel-inner > .item.prev {
      -webkit-transform: translate3d(-100%, 0, 0);
      transform: translate3d(-100%, 0, 0);
      left: 0;
    }

    .carousel-inner > .item.active,
    .carousel-inner > .item.next.left,
    .carousel-inner > .item.prev.right {
      -webkit-transform: translateZ(0);
      transform: translateZ(0);
      left: 0;
    }
  }

  .carousel-inner > .active,
  .carousel-inner > .next,
  .carousel-inner > .prev {
    display: block;
  }

  .carousel-inner > .active {
    left: 0;
  }

  .carousel-inner > .next,
  .carousel-inner > .prev {
    position: absolute;
    top: 0;
    width: 100%;
  }

  .carousel-inner > .next {
    left: 100%;
  }

  .carousel-inner > .prev {
    left: -100%;
  }

  .carousel-inner > .next.left,
  .carousel-inner > .prev.right {
    left: 0;
  }

  .carousel-inner > .active.left {
    left: -100%;
  }

  .carousel-inner > .active.right {
    left: 100%;
  }

  .carousel-control {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    width: 15%;
    font-size: 20px;
    color: #fff;
    text-align: center;
    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.6);
    background-color: transparent;
    filter: alpha(opacity=50);
    opacity: 0.5;
  }

  .carousel-control.left {
    background-image: linear-gradient(
      90deg,
      rgba(0, 0, 0, 0.5) 0,
      rgba(0, 0, 0, 0.0001)
    );
    filter: progid:DXImageTransform.Microsoft.gradient(startColorstr="#80000000",endColorstr="#00000000",GradientType=1);
    background-repeat: repeat-x;
  }

  .carousel-control.right {
    right: 0;
    left: auto;
    background-image: linear-gradient(
      90deg,
      rgba(0, 0, 0, 0.0001) 0,
      rgba(0, 0, 0, 0.5)
    );
    filter: progid:DXImageTransform.Microsoft.gradient(startColorstr="#00000000",endColorstr="#80000000",GradientType=1);
    background-repeat: repeat-x;
  }

  .carousel-control:focus,
  .carousel-control:hover {
    color: #fff;
    text-decoration: none;
    outline: 0;
    filter: alpha(opacity=90);
    opacity: 0.9;
  }

  .carousel-control .glyphicon-chevron-left,
  .carousel-control .glyphicon-chevron-right,
  .carousel-control .icon-next,
  .carousel-control .icon-prev {
    position: absolute;
    top: 50%;
    z-index: 5;
    display: inline-block;
    margin-top: -10px;
  }

  .carousel-control .glyphicon-chevron-left,
  .carousel-control .icon-prev {
    left: 50%;
    margin-left: -10px;
  }

  .carousel-control .glyphicon-chevron-right,
  .carousel-control .icon-next {
    right: 50%;
    margin-right: -10px;
  }

  .carousel-control .icon-next,
  .carousel-control .icon-prev {
    width: 20px;
    height: 20px;
    font-family: serif;
    line-height: 1;
  }

  .carousel-control .icon-prev:before {
    content: "\2039";
  }

  .carousel-control .icon-next:before {
    content: "\203a";
  }

  .carousel-indicators {
    position: absolute;
    bottom: 10px;
    left: 50%;
    z-index: 15;
    width: 60%;
    padding-left: 0;
    margin-left: -30%;
    text-align: center;
    list-style: none;
  }

  .carousel-caption {
    position: absolute;
    right: 15%;
    bottom: 20px;
    left: 15%;
    z-index: 10;
    padding-top: 20px;
    padding-bottom: 20px;
    color: #fff;
    text-align: center;
    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.6);
  }

  .carousel-caption .btn {
    text-shadow: none;
  }

  @media screen and (min-width: 768px) {
    .carousel-control .glyphicon-chevron-left,
    .carousel-control .glyphicon-chevron-right,
    .carousel-control .icon-next,
    .carousel-control .icon-prev {
      width: 30px;
      height: 30px;
      margin-top: -10px;
      font-size: 30px;
    }

    .carousel-control .glyphicon-chevron-left,
    .carousel-control .icon-prev {
      margin-left: -10px;
    }

    .carousel-control .glyphicon-chevron-right,
    .carousel-control .icon-next {
      margin-right: -10px;
    }

    .carousel-caption {
      right: 20%;
      left: 20%;
      padding-bottom: 30px;
    }

    .carousel-indicators {
      bottom: 20px;
    }
  }

  .btn-group-vertical > .btn-group:after,
  .btn-group-vertical > .btn-group:before,
  .btn-toolbar:after,
  .btn-toolbar:before,
  .clearfix:after,
  .clearfix:before,
  .container-fluid:after,
  .container-fluid:before,
  .container:after,
  .container:before,
  .dl-horizontal dd:after,
  .dl-horizontal dd:before,
  .form-horizontal .form-group:after,
  .form-horizontal .form-group:before,
  .modal-footer:after,
  .modal-footer:before,
  .modal-header:after,
  .modal-header:before,
  .nav:after,
  .nav:before,
  .navbar-collapse:after,
  .navbar-collapse:before,
  .navbar-header:after,
  .navbar-header:before,
  .navbar:after,
  .navbar:before,
  .pager:after,
  .pager:before,
  .panel-body:after,
  .panel-body:before,
  .row:after,
  .row:before {
    display: table;
    content: " ";
  }

  .btn-group-vertical > .btn-group:after,
  .btn-toolbar:after,
  .clearfix:after,
  .container-fluid:after,
  .container:after,
  .dl-horizontal dd:after,
  .form-horizontal .form-group:after,
  .modal-footer:after,
  .modal-header:after,
  .nav:after,
  .navbar-collapse:after,
  .navbar-header:after,
  .navbar:after,
  .pager:after,
  .panel-body:after,
  .row:after {
    clear: both;
  }

  .center-block {
    display: block;
    margin-right: auto;
    margin-left: auto;
  }

  .pull-right {
    float: right !important;
  }

  .pull-left {
    float: left !important;
  }

  .hide {
    display: none !important;
  }

  .show {
    display: block !important;
  }

  .invisible {
    visibility: hidden;
  }

  .text-hide {
    font: 0/0 a;
    color: transparent;
    text-shadow: none;
    background-color: transparent;
    border: 0;
  }

  .hidden {
    display: none !important;
  }

  .affix {
    position: fixed;
  }

  .visible-lg,
  .visible-lg-block,
  .visible-lg-inline,
  .visible-lg-inline-block,
  .visible-md,
  .visible-md-block,
  .visible-md-inline,
  .visible-md-inline-block,
  .visible-sm,
  .visible-sm-block,
  .visible-sm-inline,
  .visible-sm-inline-block,
  .visible-xs,
  .visible-xs-block,
  .visible-xs-inline,
  .visible-xs-inline-block {
    display: none !important;
  }

  @media (max-width: 767px) {
    .visible-xs {
      display: block !important;
    }

    table.visible-xs {
      display: table !important;
    }

    tr.visible-xs {
      display: table-row !important;
    }

    td.visible-xs,
    th.visible-xs {
      display: table-cell !important;
    }
  }

  @media (max-width: 767px) {
    .visible-xs-block {
      display: block !important;
    }
  }

  @media (max-width: 767px) {
    .visible-xs-inline {
      display: inline !important;
    }
  }

  @media (max-width: 767px) {
    .visible-xs-inline-block {
      display: inline-block !important;
    }
  }

  @media (min-width: 768px) and (max-width: 991px) {
    .visible-sm {
      display: block !important;
    }

    table.visible-sm {
      display: table !important;
    }

    tr.visible-sm {
      display: table-row !important;
    }

    td.visible-sm,
    th.visible-sm {
      display: table-cell !important;
    }
  }

  @media (min-width: 768px) and (max-width: 991px) {
    .visible-sm-block {
      display: block !important;
    }
  }

  @media (min-width: 768px) and (max-width: 991px) {
    .visible-sm-inline {
      display: inline !important;
    }
  }

  @media (min-width: 768px) and (max-width: 991px) {
    .visible-sm-inline-block {
      display: inline-block !important;
    }
  }

  @media (min-width: 992px) and (max-width: 1199px) {
    .visible-md {
      display: block !important;
    }

    table.visible-md {
      display: table !important;
    }

    tr.visible-md {
      display: table-row !important;
    }

    td.visible-md,
    th.visible-md {
      display: table-cell !important;
    }
  }

  @media (min-width: 992px) and (max-width: 1199px) {
    .visible-md-block {
      display: block !important;
    }
  }

  @media (min-width: 992px) and (max-width: 1199px) {
    .visible-md-inline {
      display: inline !important;
    }
  }

  @media (min-width: 992px) and (max-width: 1199px) {
    .visible-md-inline-block {
      display: inline-block !important;
    }
  }

  @media (min-width: 1200px) {
    .visible-lg {
      display: block !important;
    }

    table.visible-lg {
      display: table !important;
    }

    tr.visible-lg {
      display: table-row !important;
    }

    td.visible-lg,
    th.visible-lg {
      display: table-cell !important;
    }
  }

  @media (min-width: 1200px) {
    .visible-lg-block {
      display: block !important;
    }
  }

  @media (min-width: 1200px) {
    .visible-lg-inline {
      display: inline !important;
    }
  }

  @media (min-width: 1200px) {
    .visible-lg-inline-block {
      display: inline-block !important;
    }
  }

  @media (max-width: 767px) {
    .hidden-xs {
      display: none !important;
    }
  }

  @media (min-width: 768px) and (max-width: 991px) {
    .hidden-sm {
      display: none !important;
    }
  }

  @media (min-width: 992px) and (max-width: 1199px) {
    .hidden-md {
      display: none !important;
    }
  }

  @media (min-width: 1200px) {
    .hidden-lg {
      display: none !important;
    }
  }

  .visible-print {
    display: none !important;
  }

  @media print {
    .visible-print {
      display: block !important;
    }

    table.visible-print {
      display: table !important;
    }

    tr.visible-print {
      display: table-row !important;
    }

    td.visible-print,
    th.visible-print {
      display: table-cell !important;
    }
  }

  .visible-print-block {
    display: none !important;
  }

  @media print {
    .visible-print-block {
      display: block !important;
    }
  }

  .visible-print-inline {
    display: none !important;
  }

  @media print {
    .visible-print-inline {
      display: inline !important;
    }
  }

  .visible-print-inline-block {
    display: none !important;
  }

  @media print {
    .visible-print-inline-block {
      display: inline-block !important;
    }
  }

  @media print {
    .hidden-print {
      display: none !important;
    }
  }

  .switch {
    display: inline-block;
  }

  .switcher-toggle {
    position: absolute;
    margin-left: -9999px;
    visibility: hidden;
  }

  .switcher-toggle + label {
    display: block;
    position: relative;
    cursor: pointer;
    outline: none;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    margin-top: 2px;
  }

  input.switcher-toggle-round + label {
    padding: 2px;
    width: 34px;
    height: 12px;
    background-color: #ababab;
    border-radius: 6px;
    box-shadow: inset 0 2px 2px rgba(0, 0, 0, 0.2);
    transition: background-color 0.1s;
  }

  input.switcher-toggle-round + label:after {
    display: block;
    position: absolute;
    left: 0;
    bottom: 1px;
    content: "";
    width: 18px;
    height: 18px;
    background-color: #f5f5f5;
    border-radius: 100%;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
    transition: margin 0.2s;
    top: -4px;
    margin-left: -2px;
  }

  input.switcher-toggle-round:checked + label {
    background-color: #1cb445;
  }

  input.switcher-toggle-round:checked + label:after {
    margin-left: 19px;
    background-color: #c8eecb;
  }

  .custom-slider {
    height: 6px;
    border-radius: 3px;
    box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.1);
    background: #efefef;
    border: none;
  }

  .custom-slider .ui-slider-handle {
    width: 16px;
    height: 16px;
    border-radius: 50%;
    border-color: #ddd;
    box-shadow: 0 3px 5px rgba(0, 0, 0, 0.1);
    outline: none !important;
  }

  .custom-slider .ui-slider-handle:hover {
    box-shadow: 0 3px 5px rgba(0, 0, 0, 0.15);
  }

  .custom-slider .ui-slider-handle:active {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
  }

  .custom-slider .ui-state-default,
  .custom-slider .ui-widget-content .ui-state-default,
  .custom-slider .ui-widget-header .ui-state-default {
    background: #fff;
  }

  .custom-slider .ui-widget-header {
    background: #cbf8f1;
    box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.1);
    border-radius: 3px;
  }

  input.slider,
  input[type="range"] {
    height: 6px;
    border-radius: 3px;
    box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.1);
    background: #efefef;
    border: none;
    width: 100%;
    position: relative;
    top: 14px;
    cursor: ew-resize;
    -webkit-appearance: none;
    -moz-appearance: none;
  }

  input.slider .ui-slider-handle,
  input[type="range"] .ui-slider-handle {
    width: 16px;
    height: 16px;
    border-radius: 50%;
    border-color: #ddd;
    box-shadow: 0 3px 5px rgba(0, 0, 0, 0.1);
    outline: none !important;
  }

  input.slider .ui-slider-handle:hover,
  input[type="range"] .ui-slider-handle:hover {
    box-shadow: 0 3px 5px rgba(0, 0, 0, 0.15);
  }

  input.slider .ui-slider-handle:active,
  input[type="range"] .ui-slider-handle:active {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
  }

  input.slider .ui-state-default,
  input.slider .ui-widget-content .ui-state-default,
  input.slider .ui-widget-header .ui-state-default,
  input[type="range"] .ui-state-default,
  input[type="range"] .ui-widget-content .ui-state-default,
  input[type="range"] .ui-widget-header .ui-state-default {
    background: #fff;
  }

  input.slider .ui-widget-header,
  input[type="range"] .ui-widget-header {
    background: #cbf8f1;
    box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.1);
    border-radius: 3px;
  }

  input.slider:focus,
  input[type="range"]:focus {
    outline: none !important;
  }

  input.slider::-webkit-slider-thumb,
  input[type="range"]::-webkit-slider-thumb {
    width: 16px;
    height: 16px;
    border-radius: 50%;
    border-color: #ddd;
    box-shadow: 0 3px 5px rgba(0, 0, 0, 0.1);
    outline: none !important;
    background-color: #fff;
    box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.1), 0 3px 5px rgba(0, 0, 0, 0.1);
    -webkit-appearance: none;
  }

  input.slider::-webkit-slider-thumb:hover,
  input[type="range"]::-webkit-slider-thumb:hover {
    box-shadow: 0 3px 5px rgba(0, 0, 0, 0.15);
  }

  input.slider::-webkit-slider-thumb:active,
  input[type="range"]::-webkit-slider-thumb:active {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
  }

  input.slider::-moz-range-thumb,
  input[type="range"]::-moz-range-thumb {
    width: 16px;
    height: 16px;
    border-radius: 50%;
    border-color: #ddd;
    box-shadow: 0 3px 5px rgba(0, 0, 0, 0.1);
    outline: none !important;
    background-color: #fff;
    box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.1), 0 3px 5px rgba(0, 0, 0, 0.1);
    -moz-appearance: none;
  }

  input.slider::-moz-range-thumb:hover,
  input[type="range"]::-moz-range-thumb:hover {
    box-shadow: 0 3px 5px rgba(0, 0, 0, 0.15);
  }

  input.slider::-moz-range-thumb:active,
  input[type="range"]::-moz-range-thumb:active {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
  }

  input.slider::-ms-thumb,
  input[type="range"]::-ms-thumb {
    width: 16px;
    height: 16px;
    border-radius: 50%;
    border-color: #ddd;
    box-shadow: 0 3px 5px rgba(0, 0, 0, 0.1);
    outline: none !important;
    background-color: #fff;
    box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.1), 0 3px 5px rgba(0, 0, 0, 0.1);
  }

  input.slider::-ms-thumb:hover,
  input[type="range"]::-ms-thumb:hover {
    box-shadow: 0 3px 5px rgba(0, 0, 0, 0.15);
  }

  input.slider::-ms-thumb:active,
  input[type="range"]::-ms-thumb:active {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
  }

  input.slider::-moz-focus-outer,
  input[type="range"]::-moz-focus-outer {
    border: 0;
  }

  input.slider::-moz-range-track,
  input[type="range"]::-moz-range-track {
    height: 6px;
    border-radius: 3px;
    box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.1);
    background: #efefef;
    border: none;
  }

  input.slider::-moz-range-track .ui-slider-handle,
  input[type="range"]::-moz-range-track .ui-slider-handle {
    width: 16px;
    height: 16px;
    border-radius: 50%;
    border-color: #ddd;
    box-shadow: 0 3px 5px rgba(0, 0, 0, 0.1);
    outline: none !important;
  }

  input.slider::-moz-range-track .ui-slider-handle:hover,
  input[type="range"]::-moz-range-track .ui-slider-handle:hover {
    box-shadow: 0 3px 5px rgba(0, 0, 0, 0.15);
  }

  input.slider::-moz-range-track .ui-slider-handle:active,
  input[type="range"]::-moz-range-track .ui-slider-handle:active {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
  }

  input.slider::-moz-range-track .ui-state-default,
  input.slider::-moz-range-track .ui-widget-content .ui-state-default,
  input.slider::-moz-range-track .ui-widget-header .ui-state-default,
  input[type="range"]::-moz-range-track .ui-state-default,
  input[type="range"]::-moz-range-track .ui-widget-content .ui-state-default,
  input[type="range"]::-moz-range-track .ui-widget-header .ui-state-default {
    background: #fff;
  }

  input.slider::-moz-range-track .ui-widget-header,
  input[type="range"]::-moz-range-track .ui-widget-header {
    background: #cbf8f1;
    box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.1);
    border-radius: 3px;
  }

  .custom-radio + label {
    display: inline-block;
    cursor: pointer;
    position: relative;
    margin-right: 15px;
    font-size: 13px;
    min-height: 12px;
  }

  .custom-radio + label:before {
    content: "";
    display: inline-block;
    width: 17px;
    height: 17px;
    border-radius: 50%;
    margin-right: 10px;
    position: absolute;
    background-color: #e8edef;
    box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.2);
  }

  .custom-radio:checked + label:before {
    content: "\2022";
    color: #253d54;
    font-size: 30px;
    text-align: center;
    line-height: 18px;
  }

  .alert {
    border-width: 0;
  }

  .alert.margin-0 {
    margin: 0;
  }

  .alert.alert-with-border {
    border-width: 2px;
  }

  .col-md-1,
  .col-md-3,
  .find-email > form > .col-md-4 {
    padding-left: 0;
  }

  .alert-toast {
    position: fixed;
    top: -100px;
    z-index: -99;
    border-width: 2px;
    padding: 7px;
    text-align: center;
    width: 320px;
    right: 50%;
    margin-right: -160px;
    transition: all 0.12s ease-in-out 60ms;
    background: #fff;
  }

  .alert-toast.success {
    border-bottom: 2px solid #0de59b;
  }

  .alert-toast.warning {
    border-bottom: 2px solid #ffaa0e;
  }

  .alert-toast.danger {
    border-bottom: 2px solid #f93865;
  }

  .alert-toast span {
    display: block;
    word-wrap: break-word;
    margin-top: 5px;
    margin-bottom: 5px;
  }

  .alert-toast.in {
    z-index: 1111;
    top: -2px;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  }

  .alert-toast .close {
    position: relative;
    right: -10px;
  }

  .btn,
  .form-control,
  .input-group-addon {
    border-width: 1px;
  }

  .btn .material-icons,
  .form-control .material-icons,
  .input-group-addon .material-icons {
    font-size: 18px;
  }

  .btn {
    outline: none !important;
    transition: all 30ms ease-in-out 15ms;
  }

  .btn .material-icons {
    font-size: 20px;
    line-height: 7px;
    position: relative;
    top: 4px;
    margin-left: 3px;
    margin-right: 3px;
    max-width: 20px;
  }

  .btn .material-icons.rotate-180 {
    -webkit-transform: rotate(180deg);
    transform: rotate(180deg);
  }

  .btn .material-icons.bold {
    font-weight: 600;
  }

  .btn .material-icons.toolbar {
    font-size: 23px;
  }

  .btn.btn-icon {
    padding-left: 7px;
    padding-right: 7px;
    overflow: hidden;
  }

  .btn.btn-icon.btn-link {
    text-decoration: none !important;
  }

  .btn.btn-toolbar {
    padding-left: 3px;
    padding-right: 3px;
  }

  .btn.btn-sm,
  .btn.btn-xs {
    border-width: 1px;
  }

  .btn.btn-sm.btn-icon,
  .btn.btn-xs.btn-icon {
    padding-left: 5px;
    padding-right: 5px;
  }

  .btn.btn-sm .material-icons,
  .btn.btn-xs .material-icons {
    font-size: 18px;
    top: 4px;
  }

  .btn.btn-xs.btn-icon {
    padding-left: 2px;
    padding-right: 2px;
  }

  .btn.btn-lg.btn-icon {
    padding-left: 10px;
    padding-right: 10px;
  }

  .btn.btn-lg .material-icons {
    font-size: 24px;
    top: 5px;
  }

  .btn.btn-xlg .material-icons {
    font-size: 3em;
    line-height: normal;
    max-width: none;
  }

  .btn + .btn {
    margin-left: 0;
  }

  .actions-buttons .btn {
    margin-bottom: 4px;
  }

  .btn-checkbox,
  .btn-default,
  .btn-primary {
    box-shadow: 0 2px 2px rgba(137, 130, 201, 0.03);
  }

  .btn-circle {
    width: 38px;
    height: 38px;
    padding: 4px !important;
    text-align: center;
    border-radius: 19px;
    vertical-align: middle;
  }

  .btn-circle > * {
    max-width: 38px;
    margin: 0;
  }

  .btn-circle.btn-sm {
    width: 32px;
    height: 32px;
    padding: 2px !important;
    text-align: center;
    border-radius: 16px;
    vertical-align: middle;
  }

  .btn-circle.btn-sm > * {
    max-width: 32px;
    margin: 0;
  }

  .form-control:focus {
    box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);
  }

  .form-control-success,
  .has-success .form-control {
    background-image: url("data:image/svg+xml;charset=utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 8 8'%3E%3Cpath fill='#5cb85c' d='M2.3 6.73L.6 4.53c-.4-1.04.46-1.4 1.1-.8l1.1 1.4 3.4-3.8c.6-.63 1.6-.27 1.2.7l-4 4.6c-.43.5-.8.4-1.1.1z'/%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-size: 1.25em;
    background-position: center right 0.625em;
    padding-right: 2.25em;
    border-color: #5cb85c;
  }

  .form-control-success:focus,
  .has-success .form-control:focus {
    border-color: #0de59b;
    box-shadow: none;
  }

  .has-success .control-label {
    color: #5cb85c;
  }

  .form-control-warning,
  .has-warning .form-control {
    background-image: url("data:image/svg+xml;charset=utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 8 8'%3E%3Cpath fill='#f0ad4e' d='M4.4 5.324h-.8v-2.46h.8zm0 1.42h-.8V5.89h.8zM3.76.63L.04 7.075c-.115.2.016.425.26.426h7.397c.242 0 .372-.226.258-.426C6.726 4.924 5.47 2.79 4.253.63c-.113-.174-.39-.174-.494 0z'/%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-size: 1.25em;
    background-position: center right 0.625em;
    padding-right: 2.25em;
    border-color: #ffaa0e;
  }

  .form-control-warning:focus,
  .has-warning .form-control:focus {
    border-color: #0de59b;
    box-shadow: none;
  }

  .has-warning .control-label {
    color: #ffaa0e;
  }

  .form-control-danger,
  .has-danger .form-control {
    background-image: url("data:image/svg+xml;charset=utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='#d9534f' viewBox='-2 -2 7 7'%3E%3Cpath stroke='%23d9534f' d='M0 0l3 3m0-3L0 3'/%3E%3Ccircle r='.5'/%3E%3Ccircle cx='3' r='.5'/%3E%3Ccircle cy='3' r='.5'/%3E%3Ccircle cx='3' cy='3' r='.5'/%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-size: 1.25em;
    background-position: center right 0.625em;
    padding-right: 2.25em;
    border-color: #f93865;
  }

  .form-control-danger:focus,
  .has-danger .form-control:focus {
    border-color: #0de59b;
    box-shadow: none;
  }

  .has-danger .control-label {
    color: #f93865;
  }

  .text-color-base {
    color: #444;
  }

  .message,
  .text-color-black {
    color: #000;
  }

  .message {
    padding: 15px;
    margin-bottom: 18px;
    border-radius: 3px;
    border: 1px solid transparent;
  }

  .message h4 {
    margin-top: 0;
    color: inherit;
  }

  .message .alert-link {
    font-weight: 700;
  }

  .message > p,
  .message > ul {
    margin-bottom: 0;
  }

  .message > p + p {
    margin-top: 5px;
  }

  .message.margin-0 {
    margin: 0;
  }

  .message.alert-with-border {
    border-width: 2px;
  }

  .message .table:last-child {
    margin-bottom: 0;
  }

  .message p + .table {
    margin-top: 10px;
  }

  .message.message-success {
    color: #000;
    background-color: #dff0d8;
    border-color: #c1e2b3;
  }

  .message.message-success hr {
    border-top-color: #b2dba1;
  }

  .message.message-success .alert-link {
    color: #000;
  }

  .message.message-warning {
    color: #000;
    background-color: #fcf8e3;
    border-color: #f7ecb5;
  }

  .message.message-warning hr {
    border-top-color: #f5e79e;
  }

  .message.message-warning .alert-link {
    color: #000;
  }

  .message.message-danger {
    color: #000;
    background-color: #f2dede;
    border-color: #e4b9b9;
  }

  .message.message-danger hr {
    border-top-color: #dca7a7;
  }

  .message.message-danger .alert-link {
    color: #000;
  }

  .form-control.max-width {
    max-width: 100%;
    width: 100%;
    resize: vertical;
  }

  .status-label {
    width: 10px;
    height: 10px;
    background: #ccc;
    border: 2px solid #ccc;
    display: inline-block;
    border-radius: 50%;
    position: relative;
    margin-right: 3px;
  }

  .status-label.status-ok {
    background-color: #45dea0;
    border-color: #45dea0;
  }

  .status-label.status-warning {
    background-color: #e1d317;
    border-color: #e1d317;
  }

  .status-label.status-danger {
    background-color: #f98949;
    border-color: #f98949;
  }

  .status-label.status-info {
    background-color: #41dcde;
    border-color: #41dcde;
  }

  .status-label.status-outline {
    background-color: #fff;
  }

  .status-label[data-toggle] {
    cursor: pointer;
  }

  .status-in-progress,
  .status-in-progress-prospects {
    top: 1px;
    display: inline-block;
    text-rendering: auto;
    position: relative;
    font-size: 1em;
    width: auto;
    height: auto;
    text-align: center;
    background: none;
    border: 0;
    font-family: Material Icons;
    -webkit-animation: spin 1s linear infinite;
    animation: spin 1s linear infinite;
  }

  .status-in-progress:before {
    content: "\e863";
  }

  .status-in-progress-prospects:before {
    content: "\e8b8";
  }

  .badge-info {
    background-color: #41dcde;
  }

  .badge-warning {
    background-color: #ffaa0e;
  }

  .badge-danger {
    background-color: #f93865;
  }

  .badge-success {
    background-color: #45dea0;
  }

  .badge-default {
    background-color: #777;
  }

  .badge-big {
    font-size: 13px;
    padding: 4px 9px;
  }

  .status-cant-find {
    font-size: 13px !important;
    margin-left: 0 !important;
  }

  .status-cant-find.filter {
    top: 2px !important;
  }

  .status-cant-find.text-danger {
    font-size: 1.7rem !important;
    cursor: pointer;
  }

  .dropdown-menu {
    max-height: 60vh;
    overflow-y: auto;
  }

  @media (min-width: 769px) {
    .dropdown-menu.animated {
      opacity: 0;
      visibility: hidden;
      -webkit-transform-origin: top;
      transform-origin: top;
      -webkit-animation-fill-mode: forwards;
      animation-fill-mode: forwards;
      -webkit-transform: scale(0.9, 0.7) translateY(-20px);
      transform: scale(0.9, 0.7) translateY(-20px);
      display: block;
      transition: all 80ms ease;
    }

    .open > .dropdown-menu.animated {
      -webkit-transform: scale(1) translateY(0);
      transform: scale(1) translateY(0);
      opacity: 1;
      visibility: visible;
    }
  }

  .dropdown-menu > li > a {
    padding-top: 6px;
    padding-bottom: 6px;
  }

  .dropdown-menu > li.custom-checkbox > label {
    padding: 3px 20px 3px 50px;
    display: block;
  }

  .dropdown-menu > li.custom-checkbox input[type="checkbox"] {
    top: 3px;
  }

  .filter.dropdown-menu {
    padding: 10px;
  }

  .filter .filter-field {
    padding: 0 3px;
    margin-bottom: 10px;
  }

  .orders-filter .filter-field,
  .users-filter .filter-field {
    padding: 0 0 0 15px;
  }

  .orders-filter .col-sm-2,
  .users-filter .col-sm-2 {
    width: 14%;
  }

  .one-filter-params {
    padding: 0 5px;
    font-weight: 700;
  }

  .hidden-on-active {
    display: inline-block !important;
  }

  .active .hidden-on-active,
  .visible-on-active {
    display: none !important;
  }

  .active .visible-on-active {
    display: inline-block !important;
  }

  .custom {
    margin-bottom: 16px;
  }

  .custom-checkbox.checkbox > label,
  .custom-radio.radio > label {
    position: relative;
    cursor: pointer;
    padding-left: 32px;
  }

  .custom-checkbox input[type="checkbox"],
  .custom-radio input[type="radio"] {
    position: relative;
    margin-left: -26px;
    margin-right: 12px;
    cursor: pointer;
    outline: none !important;
  }

  .custom-checkbox input[type="checkbox"]:after,
  .custom-radio input[type="radio"]:after {
    content: "";
    position: absolute;
    top: -3px;
    left: -4px;
    width: 20px;
    height: 20px;
    background: #fff;
    border: 2px solid #dad9e8;
    cursor: pointer;
  }

  .custom-checkbox input[type="checkbox"][disabled],
  .custom-radio input[type="radio"][disabled] {
    opacity: 0.7;
  }

  .custom-checkbox input[type="checkbox"]:before {
    transition: -webkit-transform 0.4s cubic-bezier(0.45, 1.8, 0.5, 0.75);
    transition: transform 0.4s cubic-bezier(0.45, 1.8, 0.5, 0.75);
    transition: transform 0.4s cubic-bezier(0.45, 1.8, 0.5, 0.75),
      -webkit-transform 0.4s cubic-bezier(0.45, 1.8, 0.5, 0.75);
    -webkit-transform: rotate(-45deg) scale(0);
    transform: rotate(-45deg) scale(0);
    content: "";
    position: absolute;
    left: -1px;
    z-index: 1;
    width: 13px;
    height: 7.5px;
    background: #fff;
    border-color: #7d63ec;
    border-style: none none solid solid;
    border-width: 2px;
  }

  .custom-checkbox input[type="checkbox"]:checked:before {
    -webkit-transform: rotate(-45deg) scale(1);
    transform: rotate(-45deg) scale(1);
    background: transparent;
    border-color: #fff;
  }

  .custom-checkbox input[type="checkbox"]:checked:after {
    background: #7d63ec;
    border-color: #7d63ec;
  }

  .custom-checkbox input[type="checkbox"]:checked[disabled] {
    opacity: 0.6;
  }

  .custom-checkbox input[type="checkbox"]:after {
    border-radius: 2px;
  }

  .custom-checkbox.bare {
    margin-top: 0;
  }

  .custom-checkbox.bare,
  .custom-checkbox.bare > label {
    margin-bottom: 0;
    padding-left: 0;
  }

  .custom-checkbox.bare input[type="checkbox"] {
    margin-left: 0;
    margin-right: 0;
    left: 8px;
  }

  .custom-checkbox.checkbox-indeterminate
    input[type="checkbox"]:not(:checked):before,
  .selected-mode
    thead
    .custom-checkbox
    input[type="checkbox"]:not(:checked):before {
    border: none;
    width: 12px;
    height: 2px;
    border-radius: 2px;
    background-color: #7d63ec;
    margin: 4px 1px;
    display: block;
    position: relative;
    -webkit-transform: scale(1);
    transform: scale(1);
  }

  .custom-checkbox.checkbox-indeterminate
    input[type="checkbox"]:not(:checked):after,
  .selected-mode
    thead
    .custom-checkbox
    input[type="checkbox"]:not(:checked):after {
    background: #fff;
    border-color: #7d63ec;
  }

  .custom-radio input[type="radio"] {
    top: -2px;
  }

  .custom-radio input[type="radio"]:before {
    transition: -webkit-transform 0.4s cubic-bezier(0.45, 1.8, 0.5, 0.75);
    transition: transform 0.4s cubic-bezier(0.45, 1.8, 0.5, 0.75);
    transition: transform 0.4s cubic-bezier(0.45, 1.8, 0.5, 0.75),
      -webkit-transform 0.4s cubic-bezier(0.45, 1.8, 0.5, 0.75);
    -webkit-transform: scale(0);
    transform: scale(0);
    content: "";
    position: absolute;
    top: 1px;
    left: 0;
    z-index: 1;
    width: 12px;
    height: 12px;
    background: #7d63ec;
    border-radius: 50%;
  }

  .custom-radio input[type="radio"]:checked:before {
    -webkit-transform: scale(1);
    transform: scale(1);
  }

  .custom-radio input[type="radio"]:after {
    border-radius: 50%;
    top: -3px;
  }

  .modal-content {
    border-radius: 0;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  }

  .modal-body-footer {
    margin-bottom: 0;
    margin-top: 32px;
    text-align: right;
  }

  .modal-body-footer.text-left {
    text-align: left;
  }

  .modal-body-footer .btn {
    position: relative;
    z-index: 10;
  }

  .modal-body-footer .add-info {
    float: left;
    text-align: left;
    margin-bottom: 10px;
  }

  .modal-body-footer .add-info.has-error {
    color: #a94442;
  }

  .modal-footer {
    padding-top: 0;
  }

  .modal-footer:empty {
    display: none;
  }

  .modal-footer .btn:last-child {
    margin-right: 0;
  }

  @media (min-width: 768px) {
    .pull-right-md {
      float: right;
    }
  }

  @media (min-width: 992px) {
    .pull-right-lg {
      float: right;
    }
  }

  .text-regular {
    color: #444;
  }

  .fa-btn {
    margin-right: 6px;
  }

  .label-primary-light {
    background-color: #f7f7fd;
    color: #7d63ec;
  }

  .label-danger-light {
    background-color: rgba(249, 56, 101, 0.1);
    color: #f93865;
  }

  .label-success-light {
    background-color: rgba(69, 222, 160, 0.1);
    color: #24cc88;
  }

  .btn-link-danger {
    color: #f93865;
  }

  .btn-link-danger:active,
  .btn-link-danger:focus,
  .btn-link-danger:hover {
    color: #f7073f;
    background-color: rgba(249, 56, 101, 0.07);
  }

  .btn-link-danger:active {
    background-color: rgba(249, 56, 101, 0.15);
  }

  .label-list {
    padding-bottom: 0.2em;
    background-color: rgba(69, 222, 160, 0.1);
    color: #24cc88;
    line-height: 1.9;
    font-weight: 400;
    font-size: 85%;
  }

  .label-list.active {
    border: 1px solid #22a36f;
  }

  .btn-custom {
    font-size: 17px;
    line-height: 1.3333333;
    border-radius: 4px;
    background-color: rgba(125, 99, 236, 0.95);
    font-weight: 600;
    padding: 0.3em 1.2em;
  }

  .btn-progress.active {
    -webkit-animation: progress-bar-stripes 2s linear infinite;
    animation: progress-bar-stripes 2s linear infinite;
    background-image: linear-gradient(
      45deg,
      hsla(0, 0%, 100%, 0.15) 25%,
      transparent 0,
      transparent 50%,
      hsla(0, 0%, 100%, 0.15) 0,
      hsla(0, 0%, 100%, 0.15) 75%,
      transparent 0,
      transparent
    );
    background-size: 40px 40px;
  }

  .dotted-icon {
    position: relative;
    margin-left: 22px;
    margin-right: 7.33333333px;
  }

  .dotted-icon .material-icons {
    position: absolute;
    left: -22px;
    bottom: 0;
    font-size: 1.15em;
  }

  .dotted-icon.small {
    margin-left: 22px;
  }

  .dotted-icon.small .material-icons {
    left: -18px;
  }

  a.dotted[data-toggle="collapse"] {
    display: inline-block;
    position: relative;
  }

  a.dotted[data-toggle="collapse"]:after {
    content: "";
    position: absolute;
    top: 0.6em;
    right: -12px;
    display: inline-block;
    width: 0;
    height: 0;
    margin-left: 2px;
    vertical-align: middle;
    border-top: 4px dashed;
    border-top: 4px solid\9;
    border-right: 4px solid transparent;
    border-left: 4px solid transparent;
    transition: all 60ms ease-in-out 30ms;
  }

  a.dotted[data-toggle="collapse"][aria-expanded="true"] {
    color: #f93865;
  }

  a.dotted[data-toggle="collapse"][aria-expanded="true"]:after {
    -webkit-transform: rotate(180deg);
    transform: rotate(180deg);
  }

  .progress,
  .progress-bar {
    box-shadow: none;
  }

  .progress-sm {
    height: 10px;
  }

  .progress-xs {
    height: 4px;
  }

  .inline-control {
    margin-right: 6px;
    display: inline-block;
  }

  .inline-control:last-of-type {
    margin-right: 0;
  }

  .icon-wrapper {
    display: inline-block;
    width: 24px;
    overflow: hidden;
    direction: rtl;
    vertical-align: middle;
  }

  .material-icons.small {
    position: relative;
    top: 2px;
    font-size: 100%;
  }

  .material-icons.smtp-status {
    vertical-align: middle;
    display: none;
    cursor: pointer;
  }

  .material-icons.smtp-status-check {
    -webkit-animation: grow 1s linear infinite;
    animation: grow 1s linear infinite;
  }

  .material-icons.js-status-icon {
    display: inline-block;
    visibility: hidden;
    vertical-align: middle;
  }

  .material-icons.js-status-icon-check {
    visibility: visible;
    -webkit-animation: grow 1s linear infinite;
    animation: grow 1s linear infinite;
  }

  .material-icons.js-status-icon.text-danger,
  .material-icons.js-status-icon.text-success {
    visibility: visible;
  }

  .quote {
    border-left: 5px solid #7d63ec;
    font-size: 13px;
  }

  .blur {
    -webkit-filter: blur(3px);
    filter: blur(3px);
  }

  .spacing-before {
    margin-top: 24px;
  }

  .spacing-before-xs {
    margin-top: 12px;
  }

  .spacing-before-sm {
    margin-top: 16px;
  }

  .spacing-before-lg {
    margin-top: 32px;
  }

  .spacing-before-negative {
    margin-top: -24px;
  }

  .spacing-before-negative-xs {
    margin-top: -12px;
  }

  .spacing-before-negative-sm {
    margin-top: -16px;
  }

  .spacing-before-negative-lg {
    margin-top: -32px;
  }

  .spacing-after {
    margin-bottom: 24px !important;
  }

  .spacing-after-xs {
    margin-bottom: 12px;
  }

  .spacing-after-sm {
    margin-bottom: 16px;
  }

  .spacing-after-lg {
    margin-bottom: 32px;
  }

  .btn-checkbox {
    background-color: transparent;
  }

  .btn-checkbox.active,
  .btn-checkbox:active {
    border: 1px solid rgba(129, 120, 217, 0.3);
  }

  .material-icons.warning-icon {
    font-size: 4em;
    opacity: 0.6;
  }

  .custom-checkbox input[type="checkbox"]:disabled:after,
  .custom-radio input[type="radio"]:disabled:after {
    cursor: not-allowed;
    background-color: #ebeafa;
  }

  label.disabled {
    pointer-events: auto;
    cursor: not-allowed;
  }

  .email-account-type {
    background-color: #eee;
    border: 2px solid #ddd;
    border-radius: 0.25em;
    padding: 4px 0 4px 4px;
    margin-right: 0.5em;
  }

  .email-account-type > .material-icons {
    vertical-align: bottom;
    position: relative;
  }

  .main-header {
    background-color: #7d63ec;
    border: none;
  }

  .main-header a {
    color: #28118c;
  }

  .main-header .navbar-header a,
  .main-header .user-dropdown > a {
    color: #fff;
  }

  .main-header .navbar-nav > li > a {
    font-size: 14px;
    padding-left: 2px;
    padding-right: 2px;
    margin-left: 8px;
    margin-right: 8px;
    box-shadow: inset 0 0 0 hsla(0, 0%, 100%, 0.5);
    transition: all 60ms ease-in-out 30ms;
  }

  .main-header .navbar-nav > li > a:focus,
  .main-header .navbar-nav > li > a:hover {
    background-color: transparent;
    box-shadow: inset 0 -6px 0 hsla(0, 0%, 100%, 0.2);
  }

  .main-header .navbar-nav > li > a .navbar__svg-icons {
    width: 20px;
    height: 20px;
    vertical-align: bottom;
    margin-left: 3px;
    margin-right: 3px;
    fill: #28118c;
  }

  .main-header .navbar-nav > li.active > a,
  .main-header .navbar-nav > li.open > a {
    color: #fff;
    background-color: transparent;
    box-shadow: inset 0 -6px 0 hsla(0, 0%, 100%, 0.5);
  }

  .main-header .navbar-nav > li.active > a .navbar__svg-icons,
  .main-header .navbar-nav > li.open > a .navbar__svg-icons {
    fill: #fff;
  }

  .main-header .navbar-nav > li.user-dropdown .dropdown-menu {
    width: 280px;
  }

  .main-header .navbar-nav > li.user-dropdown-avatar {
    transition: all 0.3s ease-in-out 0.15s;
  }

  .main-header .navbar-nav > li.user-dropdown > a {
    background-color: transparent;
    box-shadow: none;
    margin-left: 10px;
  }

  .main-header .navbar-nav > li.user-dropdown.open > a .user-dropdown-avatar,
  .main-header .navbar-nav > li.user-dropdown > a:hover .user-dropdown-avatar {
    box-shadow: 0 0 0 3px hsla(0, 0%, 100%, 0.2);
  }

  .main-header .navbar-nav > li.user-dropdown .dropdown-header {
    font-size: 13px;
    padding-top: 6px;
    overflow-x: hidden;
    text-overflow: ellipsis;
  }

  .main-header .navbar-nav > li.user-dropdown p.text-muted {
    margin-bottom: 6px;
  }

  .main-header .navbar-nav > li.user-dropdown .progress {
    margin-bottom: 5px;
  }

  .main-header .navbar-nav > li.user-dropdown .material-icons {
    font-size: 18px;
  }

  .main-header .navbar-nav__shot {
    position: relative;
  }

  .main-header .navbar-nav__shot .dropdown-toggle {
    font-weight: 700;
  }

  .main-header .navbar-nav__shot .dropdown-menu {
    min-width: 123px;
    left: auto;
    right: 0;
    border-radius: 5px;
    border: none;
    box-shadow: 0 2px 3px rgba(0, 0, 0, 0.2);
    top: 105%;
  }

  .main-header .navbar-nav__shot .dropdown-menu a {
    padding: 9px 10px !important;
  }

  .main-header .navbar-nav__shot .dropdown-menu a img {
    margin-right: 5px;
  }

  .main-header a > .material-icons {
    font-size: 18px;
    font-size: 20px;
    line-height: 7px;
    position: relative;
    top: 4px;
    margin-left: 3px;
    margin-right: 3px;
    max-width: 20px;
  }

  .main-header a > .material-icons.rotate-180 {
    -webkit-transform: rotate(180deg);
    transform: rotate(180deg);
  }

  .main-header a > .material-icons.bold {
    font-weight: 600;
  }

  .main-header a > .material-icons.toolbar {
    font-size: 23px;
  }

  .main-header a > .material-icons.navbar-info-icon {
    font-size: 21px;
    top: 6px;
  }

  .main-header .navbar-right {
    margin-right: -15px;
  }

  .main-header .user-dropdown-avatar {
    display: inline-block;
    background-image: url(/img/newPath/other/userpic.svg?47295199);
    background-position: 50%;
    background-repeat: no-repeat;
    background-size: cover;
    width: 32px;
    height: 32px;
    position: absolute;
    border-radius: 50%;
    box-shadow: 0 1px 6px rgba(0, 0, 0, 0.189113);
    margin-top: -21px;
  }

  .main-header .user-dropdown-avatar-holder {
    display: inline-block;
    position: relative;
    width: 32px;
    margin-left: 3px;
    margin-right: 3px;
  }

  .main-header .user-dropdown-avatar-holder .badge {
    position: absolute;
    z-index: 2;
    font-size: 11px;
    padding: 1px 4px;
  }

  @media (min-width: 992px) {
    .main-header .navbar-header {
      width: 250px;
    }

    .main-header .dropdown-menu > li > a {
      padding-top: 12px;
      padding-bottom: 12px;
    }
  }

  .main-header .nav-sections > li > a {
    text-transform: uppercase;
    font-weight: 700;
  }

  .main-header .nav-sections > li:first-child > a {
    margin-left: 0;
  }

  @media (max-width: 768px) {
    .main-header .navbar-header {
      display: none;
    }

    .main-header .navbar {
      min-height: inherit;
    }

    .main-header .navbar-nav {
      margin: 0;
    }

    .main-header .navbar-nav,
    .main-header .navbar-nav > li {
      display: inline-block;
    }

    .main-header .navbar-nav > li > a {
      padding-top: 21px;
      padding-bottom: 22px;
    }

    .main-header .navbar-right {
      float: right;
      margin-right: -20px;
    }

    .main-header .dropdown {
      position: relative;
    }

    .main-header .dropdown.open .dropdown-menu {
      position: absolute;
      background-color: #fff;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    }

    .main-header .dropdown.user-dropdown.open .dropdown-menu {
      margin-left: -100px;
    }
  }

  @media (max-width: 480px) {
    .main-header .dropdown {
      position: relative;
    }

    .main-header .dropdown .dropdown-menu > li > a {
      padding-top: 12px;
      padding-bottom: 12px;
    }
  }

  .main-header span.badge-info {
    margin-left: 1px;
  }

  .navbar-brand > img {
    position: relative;
    top: -3px;
  }

  .alert-extension {
    border: none;
    border-radius: 0;
  }

  .alert-extension big {
    display: inline-block;
    margin-right: 15px;
    position: relative;
    top: 2px;
    margin-bottom: 5px;
  }

  .alert-extension .close {
    position: relative;
    top: 0;
    font-size: 30px;
  }

  .navbar + .alert-extension {
    margin-top: -20px;
  }

  @media (min-width: 768px) and (min-height: 600px) {
    .register aside .container,
    .register main .container {
      display: flex;
      min-height: 95vh;
      align-items: center;
    }
  }

  @media (min-width: 992px) and (min-height: 640px) {
    .register .container-inner {
      margin-bottom: 64px;
    }

    .register aside .container-inner {
      margin-bottom: 96px;
    }
  }

  .restyle-forgot,
  .restyle-login,
  .restyle-register {
    display: flex;
    justify-content: space-between;
    align-items: stretch;
    height: 100%;
    min-height: 100vh;
    position: relative;
  }

  .restyle-forgot .header,
  .restyle-login .header,
  .restyle-register .header {
    position: absolute;
    top: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    padding: 40px;
  }

  @media (max-width: 767px) {
    .restyle-forgot .header,
    .restyle-login .header,
    .restyle-register .header {
      padding: 20px;
    }
  }

  @media (max-width: 575px) {
    .restyle-forgot .header,
    .restyle-login .header,
    .restyle-register .header {
      flex-direction: column;
    }

    .restyle-forgot .header .brand-img,
    .restyle-login .header .brand-img,
    .restyle-register .header .brand-img {
      margin-bottom: 20px;
    }
  }

  .restyle-forgot .brand-img,
  .restyle-login .brand-img,
  .restyle-register .brand-img {
    margin: 0;
  }

  .restyle-forgot .login,
  .restyle-forgot .signup,
  .restyle-login .login,
  .restyle-login .signup,
  .restyle-register .login,
  .restyle-register .signup {
    color: #6f7174;
  }

  .restyle-forgot .login .btn,
  .restyle-forgot .signup .btn,
  .restyle-login .login .btn,
  .restyle-login .signup .btn,
  .restyle-register .login .btn,
  .restyle-register .signup .btn {
    padding: 7px 32px;
    border: 1px solid #c6ccd7;
    border-radius: 18px;
    color: #6f7174;
    margin-left: 14px;
    transition: all 0.3s ease;
  }
  .login-method {
    padding: 7px 32px;
    border: 1px solid #c6ccd7;
    border-radius: 18px;
    color: #6f7174;
    margin-left: 14px;
    transition: all 0.3s ease;
  }

  .restyle-forgot .login .btn:hover,
  .restyle-forgot .signup .btn:hover,
  .restyle-login .login .btn:hover,
  .restyle-login .signup .btn:hover,
  .restyle-register .login .btn:hover,
  .restyle-register .signup .btn:hover {
    color: #fff;
    background: #644eee;
    border-color: #644eee;
    box-shadow: 0 1px 3px 0 rgba(100, 78, 238, 0.5);
  }

  .restyle-forgot .restyle-forgot__left,
  .restyle-forgot .restyle-forgot__right,
  .restyle-forgot .restyle-login__left,
  .restyle-forgot .restyle-login__right,
  .restyle-forgot .restyle-register__left,
  .restyle-forgot .restyle-register__right,
  .restyle-login .restyle-forgot__left,
  .restyle-login .restyle-forgot__right,
  .restyle-login .restyle-login__left,
  .restyle-login .restyle-login__right,
  .restyle-login .restyle-register__left,
  .restyle-login .restyle-register__right,
  .restyle-register .restyle-forgot__left,
  .restyle-register .restyle-forgot__right,
  .restyle-register .restyle-login__left,
  .restyle-register .restyle-login__right,
  .restyle-register .restyle-register__left,
  .restyle-register .restyle-register__right {
    display: flex;
    align-items: center;
  }

  @media (max-width: 1199px) {
    .restyle-forgot .restyle-forgot__left,
    .restyle-forgot .restyle-forgot__right,
    .restyle-forgot .restyle-login__left,
    .restyle-forgot .restyle-login__right,
    .restyle-forgot .restyle-register__left,
    .restyle-forgot .restyle-register__right,
    .restyle-login .restyle-forgot__left,
    .restyle-login .restyle-forgot__right,
    .restyle-login .restyle-login__left,
    .restyle-login .restyle-login__right,
    .restyle-login .restyle-register__left,
    .restyle-login .restyle-register__right,
    .restyle-register .restyle-forgot__left,
    .restyle-register .restyle-forgot__right,
    .restyle-register .restyle-login__left,
    .restyle-register .restyle-login__right,
    .restyle-register .restyle-register__left,
    .restyle-register .restyle-register__right {
      justify-content: center;
    }
  }

  .restyle-forgot .restyle-forgot__left,
  .restyle-forgot .restyle-login__left,
  .restyle-forgot .restyle-register__left,
  .restyle-login .restyle-forgot__left,
  .restyle-login .restyle-login__left,
  .restyle-login .restyle-register__left,
  .restyle-register .restyle-forgot__left,
  .restyle-register .restyle-login__left,
  .restyle-register .restyle-register__left {
    flex-basis: 39%;
    background: #f8f8fb;
    justify-content: flex-end;
  }

  @media (max-width: 1199px) {
    .restyle-forgot .restyle-forgot__left,
    .restyle-forgot .restyle-login__left,
    .restyle-forgot .restyle-register__left,
    .restyle-login .restyle-forgot__left,
    .restyle-login .restyle-login__left,
    .restyle-login .restyle-register__left,
    .restyle-register .restyle-forgot__left,
    .restyle-register .restyle-login__left,
    .restyle-register .restyle-register__left {
      justify-content: center;
    }
  }

  @media (max-width: 767px) {
    .restyle-forgot .restyle-forgot__left,
    .restyle-forgot .restyle-login__left,
    .restyle-forgot .restyle-register__left,
    .restyle-login .restyle-forgot__left,
    .restyle-login .restyle-login__left,
    .restyle-login .restyle-register__left,
    .restyle-register .restyle-forgot__left,
    .restyle-register .restyle-login__left,
    .restyle-register .restyle-register__left {
      display: none;
    }
  }

  .restyle-forgot .restyle-forgot__right,
  .restyle-forgot .restyle-login__right,
  .restyle-forgot .restyle-register__right,
  .restyle-login .restyle-forgot__right,
  .restyle-login .restyle-login__right,
  .restyle-login .restyle-register__right,
  .restyle-register .restyle-forgot__right,
  .restyle-register .restyle-login__right,
  .restyle-register .restyle-register__right {
    flex-basis: 61%;
    background: #fff;
    justify-content: flex-start;
  }

  @media (max-width: 767px) {
    .restyle-forgot .restyle-forgot__right,
    .restyle-forgot .restyle-login__right,
    .restyle-forgot .restyle-register__right,
    .restyle-login .restyle-forgot__right,
    .restyle-login .restyle-login__right,
    .restyle-login .restyle-register__right,
    .restyle-register .restyle-forgot__right,
    .restyle-register .restyle-login__right,
    .restyle-register .restyle-register__right {
      flex-basis: 100%;
    }
  }

  @media (max-width: 575px) {
    .restyle-forgot .restyle-forgot__right .right-content,
    .restyle-login .restyle-forgot__right .right-content,
    .restyle-register .restyle-forgot__right .right-content {
      margin-top: 90px;
    }
  }

  .restyle-forgot .left-content,
  .restyle-login .left-content,
  .restyle-register .left-content {
    text-align: center;
    padding-right: 100px;
  }

  @media (max-width: 1199px) {
    .restyle-forgot .left-content,
    .restyle-login .left-content,
    .restyle-register .left-content {
      padding-right: 10px;
    }
  }

  .restyle-forgot .left-content img,
  .restyle-login .left-content img,
  .restyle-register .left-content img {
    margin-bottom: 60px;
  }

  .restyle-forgot .left-content ul,
  .restyle-login .left-content ul,
  .restyle-register .left-content ul {
    text-align: left;
    list-style: none;
  }

  .restyle-forgot .left-content li,
  .restyle-login .left-content li,
  .restyle-register .left-content li {
    position: relative;
    margin-bottom: 23px;
  }

  .restyle-forgot .left-content li:before,
  .restyle-login .left-content li:before,
  .restyle-register .left-content li:before {
    position: absolute;
    content: url("https://vue-admin-guoguang.oss-cn-shanghai.aliyuncs.com/list-style.png");
    left: -25px;
    top: 2px;
  }

  .restyle-forgot .right-content,
  .restyle-login .right-content,
  .restyle-register .right-content {
    width: 100%;
    max-width: 400px;
    margin: 80px 0 80px 115px;
    padding: 0 10px;
  }

  .restyle-forgot .right-content h3,
  .restyle-login .right-content h3,
  .restyle-register .right-content h3 {
    font-size: 32px;
    font-weight: 700;
    color: #222;
    margin-bottom: 30px;
  }

  .restyle-forgot .right-content p,
  .restyle-login .right-content p,
  .restyle-register .right-content p {
    color: #6f7174;
  }

  .restyle-forgot .right-content p a,
  .restyle-login .right-content p a,
  .restyle-register .right-content p a {
    color: #6f7174;
    text-decoration: underline;
    transition: color 0.3s ease;
  }

  .restyle-forgot .right-content p a:hover,
  .restyle-login .right-content p a:hover,
  .restyle-register .right-content p a:hover {
    color: #222;
  }

  .restyle-forgot .right-content .success-message,
  .restyle-login .right-content .success-message,
  .restyle-register .right-content .success-message {
    margin-bottom: 45px;
  }

  .restyle-forgot .right-content .success-message p,
  .restyle-login .right-content .success-message p,
  .restyle-register .right-content .success-message p {
    color: #444;
  }

  @media (max-width: 1199px) {
    .restyle-forgot .right-content,
    .restyle-login .right-content,
    .restyle-register .right-content {
      margin: 80px auto;
    }
  }

  @media (max-width: 767px) {
    .restyle-forgot .right-content h3,
    .restyle-login .right-content h3,
    .restyle-register .right-content h3 {
      text-align: center;
      font-size: 27px;
    }
  }

  @media (max-width: 575px) {
    .restyle-forgot .right-content,
    .restyle-login .right-content,
    .restyle-register .right-content {
      margin-top: 150px;
    }
  }

  .restyle-forgot .right-content .custom-checkbox.bare label,
  .restyle-login .right-content .custom-checkbox.bare label,
  .restyle-register .right-content .custom-checkbox.bare label {
    font-weight: 400;
    color: #6f7174;
    cursor: pointer;
  }

  .restyle-forgot .right-content .custom-checkbox.bare label input,
  .restyle-forgot .right-content .custom-checkbox.bare label span,
  .restyle-login .right-content .custom-checkbox.bare label input,
  .restyle-login .right-content .custom-checkbox.bare label span,
  .restyle-register .right-content .custom-checkbox.bare label input,
  .restyle-register .right-content .custom-checkbox.bare label span {
    vertical-align: middle;
  }

  .restyle-forgot .right-content .custom-checkbox.bare label input,
  .restyle-login .right-content .custom-checkbox.bare label input,
  .restyle-register .right-content .custom-checkbox.bare label input {
    margin-right: 20px;
    margin-top: 0;
  }

  .restyle-forgot .right-content .custom-checkbox.bare label input:after,
  .restyle-login .right-content .custom-checkbox.bare label input:after,
  .restyle-register .right-content .custom-checkbox.bare label input:after {
    top: -4px;
  }

  .restyle-forgot .register-success-message,
  .restyle-login .register-success-message,
  .restyle-register .register-success-message {
    display: none;
    width: 100%;
    margin: 80px 0;
    color: #222;
    padding-left: 115px;
  }

  .restyle-forgot .register-success-message--show,
  .restyle-login .register-success-message--show,
  .restyle-register .register-success-message--show {
    display: block;
  }

  .restyle-forgot .register-success-message h3,
  .restyle-login .register-success-message h3,
  .restyle-register .register-success-message h3 {
    font-size: 32px;
    font-weight: 700;
    margin-bottom: 27px;
  }

  .restyle-forgot .register-success-message p,
  .restyle-login .register-success-message p,
  .restyle-register .register-success-message p {
    font-size: 20px;
    margin-bottom: 25px;
    width: 100%;
  }

  .restyle-forgot .register-success-message img,
  .restyle-login .register-success-message img,
  .restyle-register .register-success-message img {
    -webkit-transform: translateY(-3px);
    transform: translateY(-3px);
  }

  .restyle-forgot .register-success-message div,
  .restyle-login .register-success-message div,
  .restyle-register .register-success-message div {
    font-size: 13px;
    color: #717171;
    margin-bottom: 7px;
  }

  .restyle-forgot .register-success-message .margin_top,
  .restyle-login .register-success-message .margin_top,
  .restyle-register .register-success-message .margin_top {
    margin-top: 40px;
  }

  @media (max-width: 1199px) {
    .restyle-forgot .register-success-message,
    .restyle-login .register-success-message,
    .restyle-register .register-success-message {
      padding: 0 10px;
      width: 90%;
      margin: auto;
    }

    .restyle-forgot .register-success-message p,
    .restyle-login .register-success-message p,
    .restyle-register .register-success-message p {
      width: 100%;
    }
  }

  @media (max-width: 767px) {
    .restyle-forgot .register-success-message p,
    .restyle-login .register-success-message p,
    .restyle-register .register-success-message p {
      margin-bottom: 65px;
    }
  }

  @media (max-width: 575px) {
    .restyle-forgot .register-success-message h3,
    .restyle-login .register-success-message h3,
    .restyle-register .register-success-message h3 {
      font-size: 25px;
    }

    .restyle-forgot .register-success-message p,
    .restyle-login .register-success-message p,
    .restyle-register .register-success-message p {
      font-size: 18px;
    }
  }

  .restyle-forgot .google-sign-up,
  .restyle-login .google-sign-up,
  .restyle-register .google-sign-up {
    display: block;
    margin: 0 auto 20px;
    padding: 13px 20px;
    text-align: center;
    background: #fff;
    color: #222;
    border: 1px solid #d4d9e2;
    border-radius: 4px;
    transition: all 0.3s ease;
    position: relative;
  }

  .restyle-forgot .google-sign-up img,
  .restyle-forgot .google-sign-up span,
  .restyle-login .google-sign-up img,
  .restyle-login .google-sign-up span,
  .restyle-register .google-sign-up img,
  .restyle-register .google-sign-up span {
    margin-right: 0;
  }

  .restyle-forgot .google-sign-up img,
  .restyle-login .google-sign-up img,
  .restyle-register .google-sign-up img {
    position: absolute;
    top: 16px;
    left: 25px;
    transition: -webkit-transform 0.3s ease;
    transition: transform 0.3s ease;
    transition: transform 0.3s ease, -webkit-transform 0.3s ease;
  }

  @media (min-width: 1024px) {
    .restyle-forgot .google-sign-up:hover,
    .restyle-login .google-sign-up:hover,
    .restyle-register .google-sign-up:hover {
      text-decoration: none;
      box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
    }

    .restyle-forgot .google-sign-up:hover img,
    .restyle-login .google-sign-up:hover img,
    .restyle-register .google-sign-up:hover img {
      -webkit-transform: rotate(1turn);
      transform: rotate(1turn);
    }

    .restyle-forgot .google-sign-up:active,
    .restyle-login .google-sign-up:active,
    .restyle-register .google-sign-up:active {
      text-decoration: none;
    }
  }

  .restyle-forgot .google-or-form,
  .restyle-login .google-or-form,
  .restyle-register .google-or-form {
    text-align: center;
    font-size: 11px;
    color: #6f7174;
    margin: 0;
    border: none;
  }

  .restyle-forgot .form-group,
  .restyle-login .form-group,
  .restyle-register .form-group {
    margin-bottom: 17px;
  }

  .restyle-forgot .form-group.has-error .form-control,
  .restyle-login .form-group.has-error .form-control,
  .restyle-register .form-group.has-error .form-control {
    border: 1px solid #e5353c;
  }

  .restyle-forgot .form-group.has-error .help-block,
  .restyle-login .form-group.has-error .help-block,
  .restyle-register .form-group.has-error .help-block {
    color: #e5353c;
    font-size: 13px;
  }

  .restyle-forgot .form-group .btn-show-password,
  .restyle-login .form-group .btn-show-password,
  .restyle-register .form-group .btn-show-password {
    margin-top: -41px;
    color: #cdcfd6;
    transition: color 0.3s ease;
  }

  .restyle-forgot .form-group .btn-show-password:hover,
  .restyle-login .form-group .btn-show-password:hover,
  .restyle-register .form-group .btn-show-password:hover {
    color: #a1a3ab;
  }

  .restyle-forgot .form-group .btn-primary,
  .restyle-login .form-group .btn-primary,
  .restyle-register .form-group .btn-primary {
    width: 100%;
    height: 48px;
    font-size: 16px;
    background: #644eee;
    border: none;
    box-shadow: 0 1px 3px 0 rgba(100, 78, 238, 0.5);
    margin: 10px 0;
    transition: background 0.3s ease;
  }

  .restyle-forgot .form-group .btn-primary:hover,
  .restyle-login .form-group .btn-primary:hover,
  .restyle-register .form-group .btn-primary:hover {
    background: #503ad5;
  }

  .restyle-forgot .control-label,
  .restyle-login .control-label,
  .restyle-register .control-label {
    font-size: 11px;
    font-weight: 400;
    text-transform: uppercase;
    color: #6f7174;
    letter-spacing: 1px;
  }

  .restyle-forgot .form-control,
  .restyle-login .form-control,
  .restyle-register .form-control {
    height: 48px;
    border-radius: 4px;
    border: 1px solid #cdcfd6;
    color: #333;
    box-shadow: none;
    transition: border-color 0.3s ease;
  }

  .restyle-forgot .form-control:focus,
  .restyle-forgot .form-control:hover,
  .restyle-login .form-control:focus,
  .restyle-login .form-control:hover,
  .restyle-register .form-control:focus,
  .restyle-register .form-control:hover {
    border-color: #644eee;
  }

  #app-sumo {
    background: #fff;
  }

  #app-sumo .restyle-register__center {
    margin: auto;
    padding: 80px 10px;
  }

  #app-sumo .right-content {
    margin: 0;
    padding: 0;
  }

  #app-sumo .right-content h3 {
    font-size: 29px;
    margin-bottom: 5px;
  }

  #app-sumo .right-content--text {
    font-size: 25px;
    color: #212121;
    font-weight: 700;
  }

  #app-sumo .form-control.error {
    border: 1px solid red;
  }

  #app-sumo .form-group {
    position: relative;
  }

  @media (max-width: 767px) {
    #app-sumo .right-content--text {
      text-align: center;
    }
  }

  @media (max-width: 575px) {
    #app-sumo .restyle-register__center {
      padding-top: 145px;
    }
  }

}
</style>

