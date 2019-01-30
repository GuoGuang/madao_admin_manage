import request from '@/utils/request'

const SERVICE_PATH = '/service_article'

/**
 * 获取文章列表
 * @param {object} query
 */
export function fetchList(query) {
  return request({
    url: SERVICE_PATH + '/article',
    method: 'get',
    params: query
  })
}

export function fetchArticle(id) {
  return request({
    url: SERVICE_PATH + '/article/detail',
    method: 'get',
    params: { id }
  })
}

export function fetchPv(pv) {
  return request({
    url: SERVICE_PATH + '/article/pv',
    method: 'get',
    params: { pv }
  })
}

export function createArticle(data) {
  return request({
    url: SERVICE_PATH + '/article/create',
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
    url: SERVICE_PATH + '/article',
    method: 'PUT',
    data
  })
}
