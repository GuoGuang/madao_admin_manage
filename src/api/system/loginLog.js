import request from '@/utils/request'
// import qs from 'qs'

const SERVICE_BASE = '/base'// base服务

/**
 * 获取日志列表
 * @param {List} query
 */
export function fetchLoginLogList(query) {
  return request({
    url: SERVICE_BASE + '/loginLog',
    method: 'get',
    params: query
  })
}

/**
 *  删除日志
 * @param {String} id:要删除的日志数据id
 */
export function deleteLoginLog(ids) {
  return request({
    url: SERVICE_BASE + '/loginLog',
    method: 'DELETE',
    // data: qs.stringify(data)
    data: ids
  })
}
