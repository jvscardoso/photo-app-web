import {Suspense} from 'react'
import {Outlet} from 'react-router-dom'
import MainLayout from '../layouts/main-layout'
import {LoadingScreen} from '../components/loading-screen'
import AuthGuard from './auth-guard'
import RegisterPage from "../pages/auth/register"
import LoginPage from "../pages/auth/login"

const authRoutes = [
  {
    path: '/auth',
    element: (
      <Suspense fallback={<LoadingScreen/>}>
        <Outlet/>
      </Suspense>
    ),
    children: [
      {
        index: true,
        path: 'login',
        element: <LoginPage/>
      },
      {
        path: 'register',
        element: (
          <RegisterPage/>
        )
      },
    ]
  }
]

export default authRoutes
