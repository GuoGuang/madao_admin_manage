import request from '@/utils/request'
// import qs from 'qs'

const SERVICE_PATH = '/ar/tags'

/**
 * 获取标签列表
 * @param {List} query
 */
export function fetchTags(query) {
  return request({
    url: SERVICE_PATH,
    method: 'get'
  })
}

