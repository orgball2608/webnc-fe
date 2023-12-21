import { NOTIFICATION_STATUS } from 'src/constants/enums'

export interface NotificationItem {
  id: number
  userId: number
  title: string
  body: string
  status: NOTIFICATION_STATUS
  createdAt: string
  updatedAt: string
}
