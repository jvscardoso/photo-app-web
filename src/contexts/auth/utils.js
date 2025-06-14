import { min } from 'lodash'
import api from "../../utils/axios"

function jwtDecode(token) {
  const base64Url = token.split('.')[1]
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
  const jsonPayload = decodeURIComponent(
    window
      .atob(base64)
      .split('')
      .map((c) => `%${`00${c.charCodeAt(0).toString(16)}`.slice(-2)}`)
      .join('')
  )

  return JSON.parse(jsonPayload)
}


export const isValidToken = (accessToken) => {
  if (!accessToken) {
    return false
  }

  const decoded = jwtDecode(accessToken)

  const currentTime = Date.now() / 1000

  return decoded.exp > currentTime
}

export const tokenExpired = (exp) => {
  let expiredTimer

  const currentTime = Date.now()

  const timeLeft = exp * 1000 - currentTime
  const maxTime = 86400000

  clearTimeout(expiredTimer)

  expiredTimer = setTimeout(() => {
    alert('Sessão expirada, faça auth novamente.')
    localStorage.removeItem('accessToken')
    window.location.href = "/"
  }, min([maxTime, timeLeft]))
}

export const setSession = (accessToken) => {
  if (accessToken) {
    localStorage.setItem('accessToken', accessToken)

    api.defaults.headers.common.Authorization = `Bearer ${accessToken}`

    const { exp } = jwtDecode(accessToken)
    tokenExpired(exp)
  } else {
    localStorage.removeItem('accessToken')
    localStorage.removeItem('partner')
    localStorage.removeItem('user')

    delete api.defaults.headers.common.Authorization
  }
}


