import axios from 'axios'
// import { Message } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'
import { MessageBox } from 'element-ui'
import { Message } from 'element-ui'

// 创建一个 axios 实例
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 20000 // 超时时间
})

// 请求过滤器 做一些请求前操作
service.interceptors.request.use(
  config => {
    if (store.getters.token) {
      // 让每个请求携带token-- ['X-Token']为自定义key 根据实际情况自行修改
      // config.headers['X-Token'] = getToken()
      config.headers['AUTH'] = 'Bearer ' + getToken()
    }
    return config
  },
  error => {
    console.log(error)
    Promise.reject(error)
  }
)

// 响应拦截器
service.interceptors.response.use(

  /**
   * 下面的注释为通过在response里，自定义code来标示请求状态
   * 当code返回如下情况则说明权限有问题，登出并返回到登录页
   * 如想通过 xmlhttprequest 来状态码标识 逻辑可写在下面error中
   * 以下代码均为样例，请结合自生需求加以修改，若不需要，则可删除
   */
  response => {
    const res = response.data
    if (res.code !== 20000) {
      // 50008:非法的token; 50012:其他客户端登录了;  50014:Token 过期了;
      if (res.code === 40000) {
        // 登录过期或被登出
        store.dispatch('FedLogOut').then(() => {
          location.reload() // 为了重新实例化vue-router对象 避免bug
        })
      }
      return Promise.reject({ ...response })
    } else {
      return response.data
    }
  },
  error => {
    if (error || !error.response.data) {
      const response = {
        data: {
          message: '系统异常，请稍后再试！',
          code: 20001
        }
      }
      error.response = response
    }
    // 由业务代码决定是否隐藏统一错误提示
    let isShowCommonError = true
    const hideCommonError = () => { isShowCommonError = false }
    setTimeout(() => {
      if (isShowCommonError) {
        Message({
          message: `${error.response.data.message} - ${error.response.data.code}`,
          type: 'warning'
        })
      }
    })
    return Promise.reject({ ...error.response, hideCommonError })
  }
)

export default service
