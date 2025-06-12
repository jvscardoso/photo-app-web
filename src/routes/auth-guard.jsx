import { Navigate } from 'react-router-dom'
import { useAuth } from '../contexts/auth/use-auth'
import { LoadingScreen } from '../components/loading-screen'

export default function AuthGuard({ children }) {
  const { authenticated, loading } = useAuth()

  if (loading) {
    return <LoadingScreen />
  }

  if (!authenticated) {
    return <Navigate to="/auth/login" />
  }

  return children
}
