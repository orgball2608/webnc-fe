import { Outlet } from 'react-router-dom'
import Header from 'src/components/Header'
import Sidebar from './components/Sidebar'
import { useEffect } from 'react'
import socket from 'src/utils/socket'
import { SOCKET_MESSAGES } from 'src/constants/constants'
import { toast } from 'react-toastify'
import { getAccessTokenFromLS } from 'src/utils/auth'
import { useQueryClient } from '@tanstack/react-query'
import { NotificationSocketResponse } from 'src/types/socket.type'

function MainLayout() {
  const queryClient = useQueryClient()

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
  }, [])

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
