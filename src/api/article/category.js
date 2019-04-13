import request from '@/utils/request'

const SERVICE_PATH = ''

/**
 * 获取文章分类列表
 * @param {object} query
 */
export function fetchList(query) {
  return request({
    url: SERVICE_PATH + '/category',
    method: 'get',
    params: query
  })
}

export function fetchArticle(id) {
  return request({
    url: '/article/detail',
    method: 'get',
    params: { id }
  })
}

export function fetchPv(pv) {
  return request({
    url: '/article/pv',
    method: 'get',
    params: { pv }
  })
}

export function createArticle(data) {
  return request({
    url: '/article/create',
    method: 'post',
    data
  })
}

/**
 * 更新分类
 * @param {Article} data
 */
export function updateCategory(data) {
  return request({
    url: '/article',
    method: 'PUT',
    data
  })
}

/**
 * 删除分类
 * @param {Article} data
 */
export function deleteCategory(data) {
  return request({
    url: '/article',
    method: 'PUT',
    data
  })
}
