import { useRoutes } from 'react-router-dom'

// import Homepage from './pages/Homepage'
import Signin from './pages/Signin'
import Signup from './pages/Signup'
import AuthLayout from './layouts/AuthLayout'
import path from './constants/path'
import MainLayout from './layouts/MainLayout'

function useRouteElements() {
  const routeElements = useRoutes([
    {
      path: path.home,
      element: <MainLayout></MainLayout>
    },
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
  ])

  return routeElements
}

export default useRouteElements
