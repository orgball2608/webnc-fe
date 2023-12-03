import { Outlet } from 'react-router-dom'
import Header from 'src/components/Header'

function HeaderOnly() {
  return (
    <>
      <Header />
      <div className='mt-[64px]'>
        <Outlet />
      </div>
    </>
  )
}

export default HeaderOnly
