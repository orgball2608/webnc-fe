import { useRoutes } from 'react-router-dom'

import Homepage from './pages/Homepage'
import Signin from './pages/Signin'
import Signup from './pages/Signup'
import AuthLayout from './layouts/AuthLayout'
import path from './constants/path'

function useRouteElements() {
  const routeElements = useRoutes([
    {
      path: path.home,
      element: <Homepage />
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
