import request from '@/utils/request'
// import qs from 'qs'

const SERVICE_PATH = 'base'

/**
 * 获取组字典类型
 * @param {List} query
 */
export function fetchDictType(query) {
  return request({
    url: SERVICE_PATH + '/dict/type',
    method: 'get',
    params: query
  })
}

/**
 * 按照字典类型获取树形字典
 * @param {List} query
 */
export function fetchDictTreeList(query) {
  return request({
    url: SERVICE_PATH + '/dict/tree',
    method: 'get',
    params: query
  })
}

/**
 * 获取字典列表
 * @param {List} query
 */
export function fetchDictList(query) {
  return request({
    url: SERVICE_PATH + '/dict',
    method: 'get',
    params: query
  })
}

/**
 * 根据id查询
 * @param {List} id
 */
export function getDictById(id) {
  return request({
    url: SERVICE_PATH + '/dict/' + id,
    method: 'get'
  })
}

/**
 *  创建字典
 * @param {*} data
 */
export function createDict(data) {
  return request({
    url: SERVICE_PATH + '/dict',
    method: 'POST',
    // data: qs.stringify(data)
    data: data
  })
}

/**
 *  删除字典
 * @param {String} id:要删除的字典数据id
 */
export function deleteDict(ids) {
  return request({
    url: SERVICE_PATH + '/dict',
    method: 'DELETE',
    // data: qs.stringify(data)
    data: ids
  })
}

/**
 * 更新字典数据
 * @param {*} data
 */
export function updateDict(data) {
  return request({
    url: SERVICE_PATH + '/dict',
    method: 'PUT',
    // data: qs.stringify(data)
    data: data
  })
}
