import request from '@/utils/request'
// import qs from 'qs'

const SERVICE_TWEET_COMMONT = '/ts/' // tweet服务

/**
 * 获取推文列表
 * @param {List} query
 */
export function fetchTweetList(query) {
  return request({
    url: SERVICE_TWEET_COMMONT + '/tweet_comment',
    method: 'get',
    params: query
  })
}

/**
 * 根据id查询
 * @param {List} id
 */
export function getTweetById(id) {
  return request({
    url: SERVICE_TWEET_COMMONT + '/tweet_comment/' + id,
    method: 'get'
  })
}

/**
 *  创建推文
 * @param {*} data
 */
export function createTweet(data) {
  return request({
    url: SERVICE_TWEET_COMMONT + +'/tweet_comment',
    method: 'POST',
    // data: qs.stringify(data)
    data: data
  })
}

/**
 *  删除推文
 * @param {String} id:要删除的推文数据id
 */
export function deleteTweet(ids) {
  return request({
    url: SERVICE_TWEET_COMMONT + '/tweet_comment',
    method: 'DELETE',
    // data: qs.stringify(data)
    data: ids
  })
}

/**
 * 更新推文数据
 * @param {*} data
 */
export function updateTweet(data) {
  return request({
    url: SERVICE_TWEET_COMMONT + +'/tweet_comment',
    method: 'PUT',
    // data: qs.stringify(data)
    data: data
  })
}
