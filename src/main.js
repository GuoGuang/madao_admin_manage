import Vue from 'vue'

import Cookies from 'js-cookie' // cookie

import 'normalize.css/normalize.css' // 在默认的HTML元素样式上提供了跨浏览器的高度一致性,消除页面body的边框

import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import '@/styles/index.scss' // 全局css

import App from './App' // 主框架
import router from './router' // 路由
import store from './store' // 存储

import i18n from './lang' // Internationalization 国际化
import './icons' // icon 图标
import './errorLog' // 错误日志
import './permission' // permission 权限控制
import common from './utils/common.js' // 全局公共js

import * as filters from './filters' // 全局过滤器

Vue.use(Element, {
  size: Cookies.get('size') || 'medium', // 设置 element-ui 默认大小
  i18n: (key, value) => i18n.t(key, value)
})

// 注册公共js
Vue.prototype.common = common

// 注册全局程序过滤器。
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  i18n,
  render: h => h(App)
})
