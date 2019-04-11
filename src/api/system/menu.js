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
 * 删除菜单
 * @param {*} token
 */
export function deleteMenu(token) {
  return request({
    url: 'base/menu/info',
    method: 'POST'
    // data: qs.stringify({ 'token': token })
  })
}
