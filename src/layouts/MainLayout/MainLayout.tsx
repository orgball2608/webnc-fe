import { Outlet } from 'react-router-dom'
import Header from 'src/components/Header'
import Sidebar from './components/Sidebar'
import { useEffect, useState } from 'react'
import socket from 'src/utils/socket'
import { SOCKET_MESSAGES } from 'src/constants/constants'
import { toast } from 'react-toastify'
import { getAccessTokenFromLS } from 'src/utils/auth'
import { useQueryClient } from '@tanstack/react-query'
import { NotificationSocketResponse } from 'src/types/socket.type'

function MainLayout() {
  const queryClient = useQueryClient()
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)

  useEffect(() => {
    socket.auth = {
      'access-token': getAccessTokenFromLS()
    }

    socket.connect()

    return () => {
      socket.disconnect()
    }
  }, [])

  useEffect(() => {
    const listener = async (data: NotificationSocketResponse) => {
      await queryClient.invalidateQueries({
        queryKey: ['notifications']
      })
      toast.info(data.body)
    }

    socket.on(SOCKET_MESSAGES.NOTIFICATION_CREATED, listener)

    return () => {
      socket.off(SOCKET_MESSAGES.NOTIFICATION_CREATED, listener)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleToggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev)
  }

  return (
    <>
      <Header onToggleSidebar={handleToggleSidebar} />
      <aside
        className={`fixed bottom-0 left-0 top-[64px] z-10 w-[300px] transform border-r border-r-primary bg-white transition-transform duration-300 ease-in-out  ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }  `}
      >
        <Sidebar onToggleSidebar={setIsSidebarOpen} />
      </aside>
      <main
        className={`transition-margin mt-[64px] duration-300 ease-in-out md:ml-[300px] ${
          isSidebarOpen ? 'blur md:ml-0 md:blur-0' : 'md:ml-[100px]'
        }`}
      >
        <Outlet />
      </main>
    </>
  )
}

export default MainLayout
