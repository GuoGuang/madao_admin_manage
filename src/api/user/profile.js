import request from '@/utils/request'
// import qs from 'qs'

import api from '@/api/api'

const SERVICE_USER = api.user

/**
 * 修改密码
 * @param {List} data
 */
export function updatePassword(id, data) {
  return request({
    url: `${SERVICE_USER}/profile/password/${id}`,
    method: 'PUT',
    params: data
  })
}

/**
 * 更新用户数据
 * @param {*} data
 */
export function updateUser(data) {
  return request({
    url: SERVICE_USER + '/profile',
    method: 'PUT',
    // data: qs.stringify(data)
    params: data
  })
}

/**
 * 上传头像
 * @param {Object} data
 */
export function uploadAvatar(data) {
  return request({
    url: SERVICE_USER + '/profile/avatar',
    method: 'PUT',
    // data: qs.stringify(data)
    data: data
  })
}

