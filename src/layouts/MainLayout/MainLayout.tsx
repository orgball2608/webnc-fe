import { Outlet } from 'react-router-dom'
import Header from 'src/components/Header'

function MainLayout() {
  return (
    <div>
      <Header />
      <Outlet />
    </div>
  )
}

export default MainLayout
