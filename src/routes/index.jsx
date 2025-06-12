import {useRoutes} from 'react-router-dom'
import NotFoundPage from '../pages/404/index'
import DailyPhotoPage from "../pages/photos/daily-photo"
import authRoutes from "./auth";
import {Suspense} from "react";
import {LoadingScreen} from "../components/loading-screen/index";
import MainLayout from "../layouts/main-layout";
import photosRoutes from "./photos.jsx";

export default function Router() {
  const routes = useRoutes([
    {
      path: '/',
      element: (
        <MainLayout>
          <Suspense fallback={<LoadingScreen/>}>
            <DailyPhotoPage/>
          </Suspense>
        </MainLayout>
      )
    },

    ...authRoutes,

    ...photosRoutes,

    {path: '*', element: <NotFoundPage/>}
  ])

  return routes
}
