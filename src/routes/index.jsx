import {Navigate, useRoutes} from 'react-router-dom'
import NotFoundPage from '../pages/404/index'
import authRoutes from "./auth";
import {Suspense} from "react";
import {LoadingScreen} from "../components/loading-screen/index";
import MainLayout from "../layouts/main-layout";
import photosRoutes from "./photos.jsx";
import {PATH_AFTER_LOGIN} from "../config-global.js";
import profileRoutes from "./profile.jsx";

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

    {path: '*', element: <NotFoundPage/>}
  ])

  return routes
}
