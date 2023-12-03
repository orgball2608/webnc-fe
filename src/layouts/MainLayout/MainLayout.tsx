import { Outlet } from 'react-router-dom'
import Header from 'src/components/Header'
import Sidebar from './components/Sidebar'

function MainLayout() {
  return (
    <>
      <Header />
      <aside className='fixed bottom-0 left-0 top-[64px] w-[300px] border-r border-r-primary bg-white'>
        <Sidebar />
      </aside>
      <main className='ml-[300px] mt-[64px]'>
        <Outlet />
      </main>
    </>
  )
}

export default MainLayout
