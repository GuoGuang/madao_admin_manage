import request from '@/utils/request'
import qs from 'qs'

/**
 * 获取用户列表
 * @param {List} query
 */
export function fetchUserList(query) {
  return request({
    url: '/user/search',
    method: 'get',
    params: query
  })
}
