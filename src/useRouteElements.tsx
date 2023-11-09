import { useRoutes } from 'react-router-dom'

import Homepage from './pages/Homepage'
import Signin from './pages/Signin'
import Signup from './pages/Signup'
import AuthLayout from './layouts/AuthLayout'

function useRouteElements() {
  const routeElements = useRoutes([
    {
      path: '/',
      element: <Homepage />
    },
    {
      path: '/signin',
      element: (
        <AuthLayout>
          <Signin />
        </AuthLayout>
      )
    },
    {
      path: '/signup',
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
