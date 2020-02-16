import Cookies from 'js-cookie'

const TokenKey = 'Admin-Token'
const loginStatus = 'login-status'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}
export function getLoginStatus() {
  return Cookies.get(loginStatus)
}

/**
 * 是否第一次登陆
 */
export function isFirst() {
  const isFirst = Cookies.get(loginStatus)
  if (!isFirst) {
    Cookies.set(loginStatus, true)
  }
  return isFirst
}
