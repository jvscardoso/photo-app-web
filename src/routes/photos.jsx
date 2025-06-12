import {Suspense} from 'react'
import {Outlet} from 'react-router-dom'
import MainLayout from '../layouts/main-layout'
import {LoadingScreen} from '../components/loading-screen'
import AuthGuard from './auth-guard'
import AllPhotosPage from "../pages/photos/all-photos.jsx";

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
        path: 'all',
        element: <AllPhotosPage />
      },
    ]
  }
]

export default photosRoutes
