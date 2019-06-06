import { constantRouterMap } from '@/router'
import Layout from '@/views/layout/Layout'
const _import = require('@/router/_import_' + process.env.NODE_ENV)

/**
 * 转换列表菜单未树形菜单
 * @param {*} data
 * @param {*} parentId
 */
var getJsonTree = function(data, parentId) {
  const itemArr = []
  for (let i = 0; i < data.length; i++) {
    const node = data[i]
    if (node.parentId === parentId) {
      let componentVue
      if (node.component === 'Layout') {
        componentVue = Layout
      } else {
        componentVue = _import(node.component)
      }
      const newNode = { path: node.path, name: node.name, component: componentVue, meta: { title: node.name, icon: node.icon }, children: getJsonTree(data, node.id) }
      itemArr.push(newNode)
    }
  }

  return itemArr
}

/**
 * 通过meta.role判断是否与当前用户权限匹配
 * @param roles
 * @param route

function hasPermission(roles, route) {
  if (route.meta && route.meta.roles) {
    return roles.some(role => route.meta.roles.includes(role))
  } else {
    return true
  }
} */

/**
 * 递归过滤异步路由表，返回符合用户角色权限的路由表
 * @param routes asyncRouterMap
 * @param roles

function filterAsyncRouter(routes, roles) {
  const res = []

  routes.forEach(route => {
    const tmp = { ...route }
    if (hasPermission(roles, tmp)) {
      if (tmp.children) {
        tmp.children = filterAsyncRouter(tmp.children, roles)
      }
      res.push(tmp)
    }
  })

  return res
}
 */
const permission = {
  state: {
    routers: constantRouterMap, // 本地配置的常量路由
    addRouters: [] // 异步加载的路由
  },
  mutations: {

    /**
     * 设置路由,将异步路由与默认配置的路由结合
     */
    SET_ROUTERS: (state, routers) => {
      state.addRouters = routers
      // 如果输入无效路径将进入404页面  404 页面一定要最后加载,否则一刷新就会进入404页面
      routers.push({ path: '*', redirect: '/404', hidden: true })
      state.routers = constantRouterMap.concat(routers)
    }

  },
  actions: {
    GenerateRoutes({ commit }, menu) {
      return new Promise(resolve => {
        const accessedRouters = getJsonTree(menu, '0')
        // const accessedRouters = asyncRouterMap
        commit('SET_ROUTERS', accessedRouters)
        resolve()
      })
    }
  }
}

export default permission
