import request from '@/utils/request'
// import qs from 'qs'

const SERVICE_USER = '/su' // user服务

/**
 * 获取菜单列表
 * @param {List} query
 */
export function fetchResourceList(query) {
  return request({
    url: SERVICE_USER + '/resource',
    method: 'get',
    params: query
  })
}

/**
 * 根据id查询
 * @param {List} id
 */
export function getMenuById(id) {
  return request({
    url: SERVICE_USER + '/resource/' + id,
    method: 'get'
  })
}

/**
 * 更新菜单
 * @param {*} data
 */
export function updateMenu(data) {
  return request({
    url: SERVICE_USER + '/resource',
    method: 'PUT',
    data
  })
}

/**
 * 插入菜单
 * @param {*} data
 */
export function createMenu(data) {
  return request({
    url: SERVICE_USER + '/resource',
    method: 'POST',
    data
  })
}

/**
 * 删除菜单
 * @param {*} ids
 */
export function deleteMenu(ids) {
  return request({
    url: SERVICE_USER + '/resource',
    method: 'DELETE',
    data: ids
  })
}
