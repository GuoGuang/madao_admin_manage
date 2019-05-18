import request from '@/utils/request'
// import qs from 'qs'

const SERVICE_PATH = ''

/**
 * 获取文章列表
 *  @param {List} query
 */
export function fetchArticleList(query) {
  return request({
    url: SERVICE_PATH + '/article',
    method: 'get',
    params: query
  })
}

/**
 * 根据id查询
 * @param {List} id
 */
export function getArticleById(id) {
  return request({
    url: SERVICE_PATH + '/article/' + id,
    method: 'get'
  })
}

/**
 *  创建文章
 * @param {*} data
 */
export function createArticle(data) {
  return request({
    url: SERVICE_PATH + '/article',
    method: 'POST',
    // data: qs.stringify(data)
    data: data
  })
}

/**
 *  删除文章
 * @param {String} id:要删除的文章数据id
 */
export function deleteArticle(ids) {
  return request({
    url: SERVICE_PATH + '/article',
    method: 'DELETE',
    // data: qs.stringify(data)
    data: ids
  })
}

/**
 * 更新文章数据
 * @param {*} data
 */
export function updateArticle(data) {
  return request({
    url: SERVICE_PATH + '/article',
    method: 'PUT',
    // data: qs.stringify(data)
    data: data
  })
}

export function fetchPv(pv) {
  return request({
    url: SERVICE_PATH + '/article/pv',
    method: 'get',
    params: { pv }
  })
}
