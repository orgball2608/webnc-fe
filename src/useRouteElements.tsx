import { Navigate, Outlet, useRoutes } from 'react-router-dom'

import Signin from './pages/Signin'
import Signup from './pages/Signup'
import AuthLayout from './layouts/AuthLayout'
import path from './constants/path'
import MainLayout from './layouts/MainLayout'
import Profile from './pages/Profile'
import ChangePassword from './pages/change-password'
import { useAppSelector } from './app/store'
import Homepage from './pages/Homepage'
import LandingPage from './pages/LandingPage'
import ForgotPassword from './pages/ForgotPassword'
import ResetPassword from './pages/ResetPassword'
import NotFound from './pages/NotFound'
import HeaderOnly from './layouts/HeaderOnly'
import ClassDetail, { ClassDetailExcercises, ClassDetailNews, ClassDetailPeople } from './pages/ClassDetail'
import ClassDetailInvite from './pages/ClassDetail/pages/ClassDetailInvite/ClassDetailInvite'
import InvitationEmail from './pages/ClassDetail/pages/ClassDetailInvite/InvitationEmail'

function ProtectedRoutes() {
  const { isAuthenticated } = useAppSelector((state) => state.auth)
  return isAuthenticated ? <Outlet /> : <Navigate to={path.signin} />
}

function RejectedRoutes() {
  const { isAuthenticated } = useAppSelector((state) => state.auth)

  return !isAuthenticated ? <Outlet /> : <Navigate to={path.home} />
}

function useRouteElements() {
  const routeElements = useRoutes([
    {
      path: '',
      element: <HeaderOnly />,
      children: [
        {
          path: path.landingPage,
          element: <LandingPage />
        }
      ]
    },
    {
      path: '',
      element: <AuthLayout />,
      children: [
        {
          path: path.forgotPassword,
          element: <ForgotPassword />
        },
        {
          path: path.resetPassword,
          element: <ResetPassword />
        }
      ]
    },
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
            },
            {
              path: path.classDetail.prefix,
              element: <ClassDetail />,
              children: [
                {
                  path: path.classDetail.news,
                  element: <ClassDetailNews />
                },
                {
                  path: path.classDetail.excercises,
                  element: <ClassDetailExcercises />
                },
                {
                  path: path.classDetail.people,
                  element: <ClassDetailPeople />
                },
                {
                  path: path.classDetail.invite,
                  element: <ClassDetailInvite />
                }
              ]
            },
            {
              path: path.invitationEmail,
              element: <InvitationEmail />
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
    },
    {
      path: '*',
      element: <NotFound />
    }
  ])

  return routeElements
}

export default useRouteElements
