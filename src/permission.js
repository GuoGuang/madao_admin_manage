import router from './router'
import store from './store'
import NProgress from 'nprogress' // Progress 进度条
import 'nprogress/nprogress.css'// Progress 进度条样式
import { getToken } from '@/utils/auth' // 从cookie中获取token getToken

import { Message } from 'element-ui'

NProgress.configure({ showSpinner: false })// 进度条配置

// permission judge function
function hasPermission(roles, permissionRoles) {
  if (roles.indexOf('admin') >= 0) return true // admin permission passed directly
  if (!permissionRoles) return true
  return roles.some(role => permissionRoles.indexOf(role) >= 0)
}

/**
 * 启用当前文件需要在main.js中添加 :import '@/permission'  才能生效
 */
const whiteList = ['/login', '/auth-redirect', '/auth//login'] // 不重定向白名单

/**
 * 用户一打开网页时检查是否有token,如果没有就跳转到login登录页面
 */
// 全局路由钩子
router.beforeEach((to, from, next) => {
  NProgress.start() // 开始进度条
  // 是否有token
  if (getToken()) {
    if (to.path === '/login') {
      next({ path: '/' })
      NProgress.done() // 如果当前页是仪表板将不会触发，每个挂钩，所以手动处理它
    } else {
      if (store.getters.roles.length === 0) { // 判断当前用户是否已拉取完user_info信息
        store.dispatch('GetUserPermission').then(res => { // 拉取user_info
          // 去除当前用户的相同资源
          let resources = []
          for (let i = 0; i < res.data.roles.length; i++) {
            for (let y = 0; y < res.data.roles[i].resources.length; y++) {
              resources.push(res.data.roles[i].resources[y])
            }
          }
          const hash = []
          resources = resources.reduce(function(item, next) {
            hash[next.name] ? '' : hash[next.name] = true && item.push(next)
            return item
          }, [])
          console.log(resources)

          store.dispatch('GenerateRoutes', resources).then(() => { // 根据roles权限生成可访问的路由表
            router.addRoutes(store.getters.addRouters) // 动态添加可访问路由表
            next({ ...to, replace: true }) // hack方法 确保addRoutes已完成 ,设置replace: true，这样导航就不会留下历史记录
          })
        }).catch((err) => {
          console.log('GetUserInfo失败：', err)
          if (err.data.code) {
            Message({
              message: '登录信息已过期，请重新登录！',
              type: 'warning'
            })
          } else {
            Message({
              message: err,
              type: 'error'
            })
          }
          err.hideCommonError()
          store.dispatch('FedLogOut').then(() => {
            next({ path: '/' })
          })
        })
      } else {
        // 没有动态改变权限的需求可直接next() 删除下方权限判断 ↓
        if (hasPermission(store.getters.roles, to.meta.roles)) {
          next()
        } else {
          next({ path: '/401', replace: true, query: { noGoBack: true }})
        }
        // 可删 ↑
      }
    }
  } else {
    /* 没有token*/
    if (whiteList.indexOf(to.path) !== -1) { // 在免登录白名单，直接进入
      next()
    } else {
      next(`/login?redirect=${to.path}`) // 否则全部重定向到登录页
      NProgress.done() // 如果当前页面是登录页面不会触发每个钩子，所以手动处理它
    }
  }
})

router.afterEach(() => {
  NProgress.done() // 完成进度条
})
