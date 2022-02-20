import request from '@/utils/request'
// import qs from 'qs'

import api from '@/api/api'

const SERVICE_USER = api.user

/**
 * 获取角色列表
 * @param {List} query
 */
export function fetchRoleList(query) {
  return request({
    url: SERVICE_USER + '/role',
    method: 'get',
    params: query
  })
}

/**
 * 查询当前角色关联的用户
 * @param {List} query
 */
export function fetchUsersList(roleId) {
  return request({
    url: SERVICE_USER + '/user/role/',
    method: 'GET',
    params: { id: roleId }
  })
}

/**
 * 根据id查询
 * @param {List} id
 */
export function getRoleById(id) {
  return request({
    url: SERVICE_USER + '/role/' + id,
    method: 'get'
  })
}

/**
 * 更新角色
 * @param {*} data
 */
export function updateRole(data) {
  return request({
    url: SERVICE_USER + '/role',
    method: 'PUT',
    data
  })
}

/**
 * 插入角色
 * @param {*} data
 */
export function createRole(data) {
  return request({
    url: SERVICE_USER + '/role',
    method: 'POST',
    data
  })
}

/**
 * 删除角色
 * @param {*} ids
 */
export function deleteRole(ids) {
  return request({
    url: SERVICE_USER + '/role',
    method: 'DELETE',
    data: ids
  })
}
