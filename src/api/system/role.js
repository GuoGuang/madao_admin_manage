import request from '@/utils/request'
import qs from 'qs'

/**
 * 获取角色列表
 * @param {List} query
 */
export function fetchRoleList(query) {
  return request({
    url: '/service_user/role',
    method: 'get',
    params: query
  })
}

