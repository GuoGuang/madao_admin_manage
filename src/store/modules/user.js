import { loginByUsername, logout, phoneLogin, loginByGitHub } from '@/api/user/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { getUserPermission } from '@/api/user/user'

const user = {
  state: {
    user: {},
    token: getToken(),
    roles: [],
    menu: [],
    setting: {
      articlePlatform: []
    }
  },

  mutations: {
    SET_SETTING: (state, setting) => {
      state.setting = setting
    },
    SET_USER: (state, user) => {
      state.user = user
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    },
    SET_MENU: (state, menu) => {
      state.menu = menu
    },
    SET_TOKEN: (state, token) => {
      state.token = token
    }
  },

  actions: {
    // 用户名登录
    LoginByUsername({ commit }, userInfo) {
      return new Promise((resolve, reject) => {
        loginByUsername(userInfo).then(response => {
          if (response.code === 20000) {
            const data = response.data
            commit('SET_TOKEN', data)
            setToken(response.data)
            resolve()
          } else {
            reject(response)
          }
        }).catch(({ data, hideCommonError }) => {
          reject({ data, hideCommonError })
        })
      })
    },

    // 手机号登录
    LoginByUserPhone({ commit }, userInfo) {
      return new Promise((resolve, reject) => {
        phoneLogin(userInfo).then(response => {
          if (response.code === 20000) {
            const data = response.data
            commit('SET_TOKEN', data)
            setToken(response.data)
            resolve()
          } else {
            reject(response)
          }
        }).catch(({ data, hideCommonError }) => {
          reject({ data, hideCommonError })
        })
      })
    },

    // GitHub登录
    LoginByGitHub({ commit }, userInfo) {
      return new Promise((resolve, reject) => {
        loginByGitHub(userInfo).then(response => {
          if (response.code === 20000) {
            const data = response.data
            commit('SET_TOKEN', data)
            setToken(response.data)
            resolve()
          } else {
            reject(response)
          }
        }).catch(({ data, hideCommonError }) => {
          reject({ data, hideCommonError })
        })
      })
    },

    /*  获取用户角色权限信息*/
    GetUserPermission({ commit, state }) {
      return new Promise((resolve, reject) => {
        getUserPermission(state.token).then(response => {
          if (!response.data) {
            reject('获取用户角色权限信息失败！')
          }
          const data = response.data

          if (data.roles && data.roles.length > 0) { // 验证返回的roles是否是一个非空数组
            commit('SET_ROLES', ['admin', 'editor'])
            commit('SET_MENU', data.resource)
            commit('SET_USER', data)
          } else {
            reject('getInfo:角色不能是空数组!')
          }

          resolve(response)
        }).catch(({ data, hideCommonError }) => {
          reject({ data, hideCommonError })
        })
      })
    },

    // 第三方验证登录
    // LoginByThirdparty({ commit, state }, code) {
    //   return new Promise((resolve, reject) => {
    //     commit('SET_CODE', code)
    //     loginByThirdparty(state.status, state.email, state.code).then(response => {
    //       commit('SET_TOKEN', response.data.token)
    //       setToken(response.data.token)
    //       resolve()
    //     }).catch(error => {
    //       reject(error)
    //     })
    //   })
    // },

    // 登出
    LogOut({ commit, state }) {
      return new Promise((resolve, reject) => {
        logout(state.token).then(() => {
          commit('SET_TOKEN', '')
          commit('SET_ROLES', [])
          removeToken()
          resolve()
        }).catch(({ data, hideCommonError }) => {
          reject({ data, hideCommonError })
        })
      })
    },

    // 前端 登出
    FedLogOut({ commit }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        removeToken()
        resolve()
      })
    }

    // 动态修改权限
    /*  ChangeRoles({ commit, dispatch }, role) {
      return new Promise(resolve => {
        commit('SET_TOKEN', role)
        setToken(role)
        getUserInfo(role).then(response => {
          const data = response.data
          commit('SET_ROLES', data.roles)
          commit('SET_NAME', data.name)
          commit('SET_AVATAR', data.avatar)
          commit('SET_INTRODUCTION', data.introduction)
          dispatch('GenerateRoutes', data) // 动态修改权限后 重绘侧边菜单
          resolve()
        })
      })
    } */
  }
}

export default user
