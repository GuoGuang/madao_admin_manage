import request from '@/utils/request'
// import qs from 'qs'

import api from '@/api/api'

const SERVICE_PATH = api.article + '/tags'

/**
 * 获取标签列表
 * @param {List} query
 */
export function fetchTagList(query) {
  return request({
    url: SERVICE_PATH,
    method: 'get',
    params: query
  })
}

/**
 * 根据id查询
 * @param {List} id
 */
export function getTagById(id) {
  return request({
    url: `${SERVICE_PATH}/${id}`,
    method: 'get'
  })
}

/**
 *  创建标签
 * @param {*} data
 */
export function createTag(data) {
  return request({
    url: SERVICE_PATH,
    method: 'POST',
    // data: qs.stringify(data)
    data: data
  })
}

/**
 *  删除标签
 * @param {String} id:要删除的标签数据id
 */
export function deleteTag(ids) {
  return request({
    url: SERVICE_PATH,
    method: 'DELETE',
    // data: qs.stringify(data)
    data: ids
  })
}

/**
 * 更新标签数据
 * @param {*} data
 */
export function updateTag(data) {
  return request({
    url: SERVICE_PATH,
    method: 'PUT',
    // data: qs.stringify(data)
    data: data
  })
}

