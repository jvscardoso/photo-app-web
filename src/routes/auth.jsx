import {Suspense} from 'react'
import {Outlet} from 'react-router-dom'
import {LoadingScreen} from '../components/loading-screen'
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
