import { type Socket, io } from 'socket.io-client'
import { getAccessTokenFromLS } from './auth'
import { ServerToClientEvents } from 'src/types/socket.type'

const socket: Socket<ServerToClientEvents> = io(import.meta.env.VITE_BASE_URL, {
  autoConnect: false,
  auth: {
    'access-token': getAccessTokenFromLS()
  }
})
export default socket
