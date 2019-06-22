import request from '@/utils/request'
// var bcrypt = require('bcryptjs')
const UUID = require('es6-uuid')

// import qs from 'qs'

/**
 * 登录
 * @param {String} username : 用户名
 * @param {String} password : 密码
 */

const SERVICE_USER = '/su' // user服务

export function loginByUsername(userInfo) {
  return request({
    url: '/oauth/token',
    method: 'post',
    headers: {
      'DEVICE-ID': userInfo.deviceId,
      'Authorization': 'Basic WGNXZWJBcHA6WGNXZWJBcHA=' // 可以在后端指定clientid和clientSecret
    },
    data:
      {
        'userName': userInfo.username.trim(),
        'password': userInfo.password,
        //  'password': bcrypt.hashSync(userInfo.password),
        'captcha': userInfo.captcha
      }

  })
}

/**
 * 手机号登录
 * @param {*} userInfo
 */
export function phoneLogin(userInfo) {
  return request({
    url: '/oauth/mobile',
    method: 'post',
    headers: {
      'DEVICE-ID': userInfo.deviceId,
      'Authorization': 'Basic WGNXZWJBcHA6WGNXZWJBcHA=' // 可以在后端指定clientid和clientSecret
    },
    data: userInfo

  })
}

/**
 * 登出
 */
export function logout() {
  return request({
    url: '/oauth/logout',
    method: 'post'
  })
}

/**
 * 初始化页面dashboard数据
 * @param {List} query
 */
export function fetchDashboardInfo(query) {
  return request({
    url: SERVICE_USER + '/user/dashboard',
    method: 'get',
    params: query
  })
}

/**
 * 获取验证码
 * @param {List} query
 */
export function fetchCaptcha(query) {
  return request({
    url: '/oauth/code/captcha',
    headers: {
      'DEVICE-ID': UUID(32),
      'Authorization': 'Basic WGNXZWJBcHA6WGNXZWJBcHA=' // 可以在后端指定clientid和clientSecret
    },
    method: 'get'
  })
}

/**
 * 发送手机验证码
 * @param {List} query
 */
export function sendPhoneCode(user) {
  return request({
    url: '/oauth/code/sms?mobile=' + user.mobile,
    headers: {
      'DEVICE-ID': UUID(32),
      'Authorization': 'Basic WGNXZWJBcHA6WGNXZWJBcHA=' // 可以在后端指定clientid和clientSecret
    },
    method: 'get'

  })
}

/**
 * 获取用户列表
 * @param {List} query
 */
export function fetchUserList(query) {
  return request({
    url: SERVICE_USER + '/user',
    method: 'get',
    params: query
  })
}

/**
 * 根据id查询
 * @param {List} id
 */
export function getUserById(id) {
  return request({
    url: SERVICE_USER + '/user/' + id,
    method: 'get'
  })
}

/**
 * 查询用户的角色组
 * @param {String} id 用户id
 */
export function fetchUseRoles(id) {
  return request({
    url: SERVICE_USER + '/user/roles/' + id,
    method: 'GET'
  })
}

/**
 *  创建用户
 * @param {*} data
 */
export function createUser(data) {
  return request({
    url: SERVICE_USER + '/user',
    method: 'POST',
    // data: qs.stringify(data)
    data: data
  })
}

/**
 * 获取用户角色、权限
 * @param {*} token
 */
export function getUserPermission(token) {
  return request({
    url: SERVICE_USER + '/user/permission',
    method: 'POST'
    // data: qs.stringify({ 'token': token })
  })
}

/**
 *  删除用户
 * @param {String} id:要删除的用户数据id
 */
export function deleteUser(ids) {
  return request({
    url: SERVICE_USER + '/user',
    method: 'DELETE',
    // data: qs.stringify(data)
    data: ids
  })
}

/**
 * 更新用户数据
 * @param {*} data
 */
export function updateUser(data) {
  return request({
    url: SERVICE_USER + '/user',
    method: 'PUT',
    // data: qs.stringify(data)
    data: data
  })
}

/**
 * 更新用户数据
 * @param {*} data
 */
export function updateDisabledUser(data) {
  return request({
    url: SERVICE_USER + '/user/Disabled',
    method: 'PUT',
    // data: qs.stringify(data)
    data: data
  })
}
