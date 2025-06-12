import { Navigate } from 'react-router-dom'
import { useAuth } from '../contexts/auth/use-auth'

const ProtectedRoute = ({ allowedRoles, children }) => {
  const { user } = useAuth()

  if (!user || !allowedRoles.includes(user.role)) {
    return <Navigate to="/404" />
  }

  return children
}

export default ProtectedRoute
