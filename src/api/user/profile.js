import request from '@/utils/request'
// import qs from 'qs'

const SERVICE_USER = '/su' // user服务

/**
 * 修改密码
 * @param {List} data
 */
export function updatePassword(data) {
  return request({
    url: SERVICE_USER + '/profile/password',
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
    url: SERVICE_USER + +'/profile',
    method: 'PUT',
    // data: qs.stringify(data)
    data: data
  })
}

/**
 * 上传头像
 * @param {*} data
 */
export function uploadAvatar(data) {
  return request({
    url: SERVICE_USER + +'/profile/avatar',
    method: 'PUT',
    // data: qs.stringify(data)
    data: data
  })
}

