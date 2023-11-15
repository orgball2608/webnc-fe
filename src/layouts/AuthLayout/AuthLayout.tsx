import { Outlet } from 'react-router-dom'
import Leftside from './components/Leftside'

function AuthLayout() {
  return (
    <div className='container flex flex-col items-center gap-24 px-10 py-5 lg:h-screen lg:flex-row'>
      <div className='flex-1'>
        <Leftside />
      </div>
      <div className='w-full flex-1'>
        <Outlet />
      </div>
    </div>
  )
}

export default AuthLayout
