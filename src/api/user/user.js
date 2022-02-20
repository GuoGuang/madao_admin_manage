import request from '@/utils/request'
// var bcrypt = require('bcryptjs')
const UUID = require('es6-uuid')

import api from '@/api/api'

const SERVICE_USER = api.user
const SERVICE_AUTH = api.auth

/**
 * 登录
 * @param {String} username : 用户名
 * @param {String} password : 密码
 */
export function loginByUsername(userInfo) {
  return request({
    url: SERVICE_AUTH + '/auth/token',
    method: 'post',
    headers: {
      'DEVICE-ID': userInfo.deviceId,
      'Authorization': 'Basic WGNXZWJBcHA6WGNXZWJBcHA=' // 可以在后端指定clientid和clientSecret
    },
    data:
      {
        'account': userInfo.account,
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
    url: SERVICE_AUTH + '/auth/phone',
    method: 'post',
    headers: {
      'DEVICE-ID': userInfo.deviceId,
      'Authorization': 'Basic WGNXZWJBcHA6WGNXZWJBcHA=' // 可以在后端指定clientid和clientSecret
    },
    data: userInfo

  })
}

/**
 * GitHub登录
 * @param {*} userInfo
 */
export function loginByGitHub(userInfo) {
  return request({
    url: '/social/connect/github/aaa',
    method: 'POST'

  })
}

/**
 * 登出
 */
export function logout() {
  return request({
    url: SERVICE_AUTH + '/auth/logout',
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
    url: SERVICE_AUTH + '/auth/code/captcha',
    headers: {
      'DEVICE-ID': UUID(32)
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
    url: SERVICE_AUTH + '/auth/code/sms?phone=' + user.phone,
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
    url: SERVICE_USER + '/role/user/' + id,
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
