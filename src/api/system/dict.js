import request from '@/utils/request'
// import qs from 'qs'

const SERVICE_PATH = ''

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
    method: 'UPDATE',
    // data: qs.stringify(data)
    data: data
  })
}
