import request from '@/utils/request'
// import qs from 'qs'

const SERVICE_BASE = '/base'// base服务

/**
 * 获取操作日志列表
 * @param {List} query
 */
export function fetchOptLogList(query) {
  return request({
    url: SERVICE_BASE + '/optLog',
    method: 'get',
    params: query
  })
}

/**
 *  删除操作日志
 * @param {String} id:要删除的日志数据id
 */
export function deleteOptLog(ids) {
  return request({
    url: SERVICE_BASE + '/optLog',
    method: 'DELETE',
    // data: qs.stringify(data)
    data: ids
  })
}
