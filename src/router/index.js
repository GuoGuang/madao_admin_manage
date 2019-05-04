import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* 布局 */
import Layout from '@/views/layout/Layout'

/* 路由模块 */
import componentsRouter from './modules/components'
import chartsRouter from './modules/charts'

/** 注意:只有当children.length>=1时才会出现子菜单
 *  详见:  https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 **/

/**
* hidden: true                   如果“hidden:true”不会在侧边栏显示(默认为false)
* alwaysShow: true               如果设置为true，将始终显示根菜单，无论它的子路径长度是多少,如果没有设置alwaysShow，只有多个路径下的孩子,它将成为嵌套模式，否则不显示根菜单
* redirect: noredirect           当设置 noredirect 的时候该路由在面包屑导航中不可被点击
* name:'router-name'             设定路由的名字，一定要填写不然使用<keep-alive>时会出现各种问题 must set!!!
* meta : {          元数据设置:
    roles: ['admin','editor']    设置该路由进入的权限，支持多个权限叠加
    title: 'title'               设置该路由在侧边栏和面包屑中展示的名字
    icon: 'svg-name'             设置该路由的图标
    noCache: true                如果设置为true ,则不会被 <keep-alive> 缓存(默认 false)
  }
**/

// 不需要动态判断权限的路由，如登录页、404、等通用页面。
export const constantRouterMap = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path*',
        component: () => import('@/views/redirect/index')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/auth-redirect',
    component: () => import('@/views/login/authredirect'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/errorPage/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/errorPage/401'),
    hidden: true
  },
  {
    path: '',
    component: Layout,
    redirect: 'dashboard',
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/dashboard/index'),
        name: 'Dashboard',
        meta: { title: 'dashboard', icon: 'dashboard', noCache: true }
      }
    ]
  }
]

export default new Router({
  // mode: 'history', // 需要服务支持
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

// 需要动态判断权限并通过 addRouters 动态添加的页面
export const asyncRouterMap = [
  {
    path: '/permission',
    component: Layout,
    redirect: '/permission/index',
    alwaysShow: true, // 总是显示根菜单
    meta: {
      title: 'permission',
      icon: 'lock',
      roles: ['admin', 'editor'] // 可以在根nav中设置角色
    },
    children: [
      {
        path: 'page',
        component: () => import('@/views/permission/page'),
        name: 'PagePermission',
        meta: {
          title: 'pagePermission',
          roles: ['admin'] // 或者只能在子导航中设置角色
        }
      },
      {
        path: 'directive',
        component: () => import('@/views/permission/directive'),
        name: 'DirectivePermission',
        meta: {
          title: 'directivePermission'
          // 如果不设置角色，意味着:此页面不需要权限
        }
      }
    ]
  },

  /**
   * 系统管理
   */
  {
    path: '/system',
    component: Layout,
    redirect: '/system/index',
    alwaysShow: true, // 总是显示根菜单
    meta: {
      title: '系统管理',
      icon: 'lock',
      roles: ['admin', 'editor'] // 可以在根nav中设置角色
    },
    children: [
      {
        path: 'me',
        component: () => import('@/views/system/user/me'),
        name: 'me',
        hidden: true,
        meta: { title: '个人中心', noCache: true }
      },
      {
        path: 'user',
        component: () => import('@/views/system/user/user'),
        name: 'PageUser',
        meta: {
          title: '用户管理',
          roles: ['admin'] // 或者只能在子导航中设置角色
        }
      },
      {
        path: 'role',
        component: () => import('@/views/system/user/role'),
        name: 'PageRole',
        meta: {
          title: '角色管理',
          roles: ['admin']
        }
      },
      {
        path: 'menu',
        component: () => import('@/views/system/user/menu'),
        name: 'PageMenu',
        meta: {
          title: '菜单管理',
          roles: ['admin']
        }
      },
      {
        path: 'dict',
        component: () => import('@/views/system/dict'),
        name: 'dictionary',
        meta: {
          title: '字典管理',
          roles: ['admin']
        }
      }
    ]
  },

  // 当路由表太长时，可以将它分成小模块
  componentsRouter,
  chartsRouter,

  /**
 * 文章板块
 */
  {
    path: '/article',
    component: Layout,
    redirect: '/article/list',
    name: 'article',
    meta: {
      title: '文章',
      icon: 'edit'
    },
    children: [
      {
        path: 'create',
        component: () => import('@/views/article/create'),
        name: 'CreateArticle',
        meta: { title: 'createArticle' }
      },
      {
        path: 'edit/:id(\\d+)',
        component: () => import('@/views/article/edit'),
        name: 'EditArticle',
        meta: { title: 'editArticle', noCache: true },
        hidden: true
      },
      {
        path: 'list',
        component: () => import('@/views/article/list'),
        name: 'ArticleList',
        meta: { title: 'articleList' }
      },
      {
        path: 'category',
        component: () => import('@/views/article/category'),
        name: 'CategoryList',
        meta: { title: '文章分类' }
      }
    ]
  },

  /**
 * 日志
 */
  {
    path: '/log',
    component: Layout,
    redirect: '/log/loginLog',
    name: 'Log',
    meta: {
      title: '日志',
      icon: 'edit'
    },
    children: [
      {
        path: 'loginLog',
        component: () => import('@/views/system/log/loginLog'),
        name: 'LoginLog',
        meta: { title: '登录日志' }
      },
      {
        path: 'operationLog',
        component: () => import('@/views/system/log/operationLog'),
        name: 'OperationLog',
        meta: { title: '操作日志' }
      }
    ]
  },

  /**
 * 任务调度
 */
  {
    path: '/task',
    component: Layout,
    redirect: '/task/list',
    name: 'task',
    meta: {
      title: '任务调度',
      icon: 'edit'
    },
    children: [
      {
        path: 'timerTask',
        component: () => import('@/views/task/timerTask'),
        name: 'TimerTask',
        meta: { title: '定时任务' }
      },
      {
        path: 'taskLog',
        component: () => import('@/views/task/taskLog'),
        name: 'TaskLog',
        meta: { title: '调度日志' }
      }
    ]
  },

  {
    path: '/error',
    component: Layout,
    redirect: 'noredirect',
    name: 'ErrorPages',
    alwaysShow: true,
    meta: {
      title: 'errorPages',
      icon: '404'
    },
    children: [
      {
        path: '401',
        component: () => import('@/views/errorPage/401'),
        name: 'Page401',
        meta: { title: 'page401', noCache: true }
      }
    ]
  },

  {
    path: '404',
    component: () => import('@/views/errorPage/404'),
    name: 'Page404',
    meta: { title: 'page404', noCache: true }
  },
  // 如果输入无效路径将进入404页面  404 页面一定要最后加载,否则一刷新就会进入404页面
  { path: '*', redirect: '/404', hidden: true }
]
