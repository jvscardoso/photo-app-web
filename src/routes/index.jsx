import {Navigate, useRoutes} from 'react-router-dom'
import NotFoundPage from '../pages/404/index'
import authRoutes from "./auth"
import {Suspense} from "react"
import {LoadingScreen} from "../components/loading-screen/index"
import MainLayout from "../layouts/main-layout"
import photosRoutes from "./photos"
import {PATH_AFTER_LOGIN} from "../config-global"
import profileRoutes from "./profile"
import usersRoutes from "./users"

export default function Router() {
  const routes = useRoutes([
    {
      path: '/',
      element: (
        <MainLayout>
          <Suspense fallback={<LoadingScreen/>}>
            <Navigate to={PATH_AFTER_LOGIN} replace />
          </Suspense>
        </MainLayout>
      )
    },

    ...authRoutes,

    ...photosRoutes,

    ...profileRoutes,

    ...usersRoutes,

    {path: '*', element: <NotFoundPage/>}
  ])

  return routes
}
