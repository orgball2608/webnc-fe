import { SOCKET_MESSAGES } from 'src/constants/constants'
import { ReviewComment } from './review-comment.type'

export interface NotificationSocketResponse {
  id: number
  userId: number
  title: string
  body: string
  status: string
  deleted: boolean
  deletedAt: null
  createdAt: string
}

export interface ServerToClientEvents {
  [SOCKET_MESSAGES.NOTIFICATION_CREATED]: (data: NotificationSocketResponse) => void
  [SOCKET_MESSAGES.REVIEW_COMMENTED]: (data: ReviewComment) => void
}
