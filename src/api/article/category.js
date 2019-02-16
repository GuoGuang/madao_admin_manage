import request from '@/utils/request'

const SERVICE_PATH = '/service_article'

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
 * 更新文章
 * @param {Article} data
 */
export function updateArticle(data) {
  return request({
    url: '/article',
    method: 'PUT',
    data
  })
}
