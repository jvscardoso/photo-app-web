import {Suspense} from 'react'
import {Outlet} from 'react-router-dom'
import MainLayout from '../layouts/main-layout'
import {LoadingScreen} from '../components/loading-screen'
import UsersPage from '../pages/users/index'
import AuthGuard from './auth-guard'
import ProtectedRoute from './protected-routes'

const usersRoutes = [
  {
    path: '/users',
    element: (
      <AuthGuard>
        <MainLayout>
          <Suspense fallback={<LoadingScreen/>}>
            <Outlet/>
          </Suspense>
        </MainLayout>
      </AuthGuard>
    ),
    children: [
      {
        index: true,
        element: (
          <ProtectedRoute allowedRoles={['admin']}>
            <UsersPage/>
          </ProtectedRoute>
        )
      }
    ]
  }
]

export default usersRoutes
