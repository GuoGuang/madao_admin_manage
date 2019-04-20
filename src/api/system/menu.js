import request from '@/utils/request'
// import qs from 'qs'

/**
 * 获取菜单列表
 * @param {List} query
 */
export function fetchMenuList(query) {
  return request({
    url: '/base/menu',
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
    url: '/base/menu/' + id,
    method: 'get'
  })
}

/**
 * 获取仪表盘数据
 * @param {*} token
 */
export function getDashboardInfo(token) {
  return request({
    url: 'base/menu/info',
    method: 'POST'
    // data: qs.stringify({ 'token': token })
  })
}

/**
 * 更新菜单
 * @param {*} data
 */
export function updateMenu(data) {
  return request({
    url: 'base/menu/',
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
    url: 'base/menu/',
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
    url: 'base/menu',
    method: 'DELETE',
    data: ids
  })
}
