import request from '@/utils/request'
// import qs from 'qs'

const SERVICE_PATH = '/ar/category'

/**
 * 获取分类列表
 * @param {List} query
 */
export function fetchCategoryList(query) {
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
export function getCategoryById(id) {
  return request({
    url: `${SERVICE_PATH}/${id}`,
    method: 'get'
  })
}

/**
 *  创建分类
 * @param {*} data
 */
export function createCategory(data) {
  return request({
    url: SERVICE_PATH,
    method: 'POST',
    // data: qs.stringify(data)
    data: data
  })
}

/**
 *  删除分类
 * @param {String} id:要删除的分类数据id
 */
export function deleteCategory(ids) {
  return request({
    url: SERVICE_PATH,
    method: 'DELETE',
    // data: qs.stringify(data)
    data: ids
  })
}

/**
 * 更新分类数据
 * @param {*} data
 */
export function updateCategory(data) {
  return request({
    url: SERVICE_PATH,
    method: 'PUT',
    // data: qs.stringify(data)
    data: data
  })
}

