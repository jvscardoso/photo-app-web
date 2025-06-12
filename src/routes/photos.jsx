import {Suspense} from 'react'
import {Outlet} from 'react-router-dom'
import MainLayout from '../layouts/main-layout'
import {LoadingScreen} from '../components/loading-screen'
import AuthGuard from './auth-guard'
import AllPhotosPage from "../pages/photos/all-photos.jsx";
import DailyPhotoPage from "../pages/photos/daily-photo.jsx";
import UserPhotos from "../pages/photos/user-photos.jsx";

const photosRoutes = [
  {
    path: '/photos',
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
        element: <DailyPhotoPage />,
        index: true
      },
      {
        path: 'all',
        element: <AllPhotosPage />
      },
      {
        path: 'daily',
        element: <DailyPhotoPage />,
      },
      {
        path: ':id',
        element: <UserPhotos />,
      },
    ]
  }
]

export default photosRoutes
