interface Props {
  children?: React.ReactNode
}
import { Outlet } from 'react-router-dom'
import Header from 'src/components/Header'

function MainLayout() {
  return (
    <div>
      <Header />
      <div className='mt-[48px]'>
        <Outlet />
      </div>
    </div>
  )
}

export default MainLayout
