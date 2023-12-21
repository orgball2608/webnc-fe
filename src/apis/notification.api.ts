import { NotificationItem } from 'src/types/notification.type'
import { ResponseApi } from 'src/types/utils.type'
import http from 'src/utils/http'

const PREFIX = 'notifications'

const notificationApi = {
  getNotifications: () => {
    return http.get<ResponseApi<NotificationItem[]>>(PREFIX)
  },
  getNotification: (id: string | number) => {
    return http.get<ResponseApi<NotificationItem>>(`${PREFIX}/${id}`)
  },
  markAsRead: (id: string | number) => {
    return http.get<ResponseApi<null>>(`${PREFIX}/${id}/mark-as-read`)
  }
}

export default notificationApi
