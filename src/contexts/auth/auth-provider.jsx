import { useEffect, useReducer, useCallback, useMemo } from 'react'
import { setSession, isValidToken } from './utils'
import api from '../../utils/axios'
import AuthContext from './auth-context'

const initialState = {
  user: null,
  loading: true,
}

const reducer = (state, action) => {
  switch (action.type) {
    case 'INITIAL':
      return { ...state, loading: false, user: action.payload }
    case 'LOGIN':
    case 'REGISTER':
      return { ...state, user: action.payload }
    case 'LOGOUT':
      return { ...state, user: null }
    default:
      return state
  }
}

const STORAGE_KEY = 'accessToken'

export function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState)

  const initialize = useCallback(async () => {
    const accessToken = localStorage.getItem(STORAGE_KEY)

    if (accessToken && isValidToken(accessToken)) {
      setSession(accessToken)
      try {
        const response = await api.get('/auth/me')
        const user = response.data

        dispatch({
          type: 'INITIAL',
          payload: {
            ...user,
            accessToken,
          },
        })
      } catch (err) {
        console.error('Failed to load user session:', err)
        dispatch({ type: 'INITIAL', payload: null })
      }
    } else {
      dispatch({ type: 'INITIAL', payload: null })
    }
  }, [])

  const login = useCallback(async (data) => {
    const response = await api.post('/auth/login', data)
    const { access_token: accessToken, name, role, email } = response.data

    setSession(accessToken)
    const user = { accessToken, name, role, email }
    dispatch({ type: 'LOGIN', payload: user })
  }, [])

  const user_register = useCallback(async (data) => {
    const response = await api.post('/auth/register', data)
    const { access_token: accessToken, name, role, email } = response.data

    setSession(accessToken)
    const user = { accessToken, name, role, email }
    dispatch({ type: 'REGISTER', payload: user })
  }, [])

  const logout = useCallback(() => {
    setSession(null)
    dispatch({ type: 'LOGOUT' })
  }, [])

  useEffect(() => {
    initialize()
  }, [initialize])

  const checkAuthenticated = state.user ? 'authenticated' : 'unauthenticated'
  const status = state.loading ? 'loading' : checkAuthenticated

  const memoizedValue = useMemo(() => ({
    user: state.user,
    loading: status === 'loading',
    authenticated: status === 'authenticated',
    unauthenticated: status === 'unauthenticated',
    login,
    user_register,
    logout,
  }), [state.user, status, login, user_register, logout])

  return (
    <AuthContext.Provider value={memoizedValue}>
      {children}
    </AuthContext.Provider>
  )
}
