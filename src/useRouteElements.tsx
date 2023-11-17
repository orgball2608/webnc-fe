import { Navigate, Outlet, useRoutes } from 'react-router-dom'

// import Homepage from './pages/Homepage'
import Signin from './pages/Signin'
import Signup from './pages/Signup'
import AuthLayout from './layouts/AuthLayout'
import path from './constants/path'
import MainLayout from './layouts/MainLayout'
import Profile from './pages/Profile'
import ChangePassword from './pages/change-password'
import { useAppSelector } from './app/store'
import Homepage from './pages/Homepage'

function ProtectedRoutes() {
  const { isAuthenticated } = useAppSelector((state) => state.auth)
  // return isAuthenticated ? <Outlet /> : <Navigate to={path.signin} />
  return <Outlet />
}

function RejectedRoutes() {
  const { isAuthenticated } = useAppSelector((state) => state.auth)

  // return !isAuthenticated ? <Outlet /> : <Navigate to={path.home} />
  return <Outlet />
}

function useRouteElements() {
  const routeElements = useRoutes([
    {
      path: '',
      element: <ProtectedRoutes />,
      children: [
        {
          path: '',
          element: <MainLayout />,
          children: [
            {
              path: path.home,
              element: <Homepage />
            },
            {
              path: path.profile,
              element: <Profile />
            },
            {
              path: path.change_password,
              element: <ChangePassword />
            }
          ]
        }
      ]
    },
    {
      path: '',
      element: <RejectedRoutes />,
      children: [
        {
          path: '',
          element: <AuthLayout />,
          children: [
            {
              path: path.signin,
              element: <Signin />
            },
            {
              path: path.signup,
              element: <Signup />
            }
          ]
        }
      ]
    }
  ])

  return routeElements
}

export default useRouteElements
