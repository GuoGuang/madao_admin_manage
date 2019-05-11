import request from '@/utils/request'
// import qs from 'qs'

const SERVICE_PATH = ''
/**
 * 初始化页面dashboard数据
 * @param {List} query
 */
export function fetchDashboardInfo(query) {
  return request({
    url: SERVICE_PATH + '/user/dashboard',
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
    url: SERVICE_PATH + '/user',
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
    url: SERVICE_PATH + '/user/' + id,
    method: 'get'
  })
}

/**
 *  创建用户
 * @param {*} data
 */
export function createUser(data) {
  return request({
    url: SERVICE_PATH + '/user',
    method: 'POST',
    // data: qs.stringify(data)
    data: data
  })
}

/**
 *  删除用户
 * @param {String} id:要删除的用户数据id
 */
export function deleteUser(ids) {
  return request({
    url: SERVICE_PATH + '/user',
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
    url: SERVICE_PATH + '/user',
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
    url: SERVICE_PATH + '/Users/Disabled',
    method: 'PUT',
    // data: qs.stringify(data)
    data: data
  })
}
