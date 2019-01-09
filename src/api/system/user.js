import request from '@/utils/request'
import qs from 'qs'
/**
 * 初始化页面dashboard数据
 * @param {List} query
 */
export function fetchDashboardInfo(query) {
  return request({
    url: '/service_user/user/dashboard',
    method: 'get',
    params: query
  })
}

/**
 * 获取用户列表
 * @param {List} query
 */
export function fetchUserList(query) {
  return request({
    url: '/service_user/user',
    method: 'get',
    params: query
  })
}

/**
 * 获取当前用户信息,如:左边导航栏
 * @param {*} token
 */
export function getUserInfo(token) {
  return request({
    url: '/service_user/user/info',
    method: 'POST'
    // data: qs.stringify({ 'token': token })
  })
}

/**
 *  创建用户
 * @param {*} data
 */
export function createUser(data) {
  return request({
    url: '/Users/Create',
    method: 'POST',
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
    url: '/Users/Disabled',
    method: 'PUT',
    // data: qs.stringify(data)
    data: data
  })
}
