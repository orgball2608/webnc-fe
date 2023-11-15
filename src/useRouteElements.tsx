import { Navigate, Outlet, useRoutes } from 'react-router-dom'

// import Homepage from './pages/Homepage'
import Signin from './pages/Signin'
import Signup from './pages/Signup'
import AuthLayout from './layouts/AuthLayout'
import path from './constants/path'
import MainLayout from './layouts/MainLayout'
import Profile from './pages/Profile'
import ChangePassword from './pages/change-password'

const isAuthenticated = true
function ProtectedRoutes() {
  return isAuthenticated ? <Outlet /> : <Navigate to={path.signin} />
}

function RejectedRoutes() {
  return !isAuthenticated ? <Outlet /> : <Navigate to={path.home} />
}

function useRouteElements() {
  const routeElements = useRoutes([
    {
      path: '',
      element: <ProtectedRoutes />,
      children: [
        {
          path: path.home,
          element: <MainLayout></MainLayout>
        },
        {
          path: path.profile,
          element: (
            <MainLayout>
              <Profile />
            </MainLayout>
          )
        },
        {
          path: path.change_password,
          element: (
            <MainLayout>
              <ChangePassword />
            </MainLayout>
          )
        }
      ]
    },
    {
      path: '',
      element: <RejectedRoutes />,
      children: [
        {
          path: path.signin,
          element: (
            <AuthLayout>
              <Signin />
            </AuthLayout>
          )
        },
        {
          path: path.signup,
          element: (
            <AuthLayout>
              <Signup />
            </AuthLayout>
          )
        }
      ]
    }
  ])

  return routeElements
}

export default useRouteElements
