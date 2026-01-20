import { notifications } from '@mantine/notifications'
import { IconCheck, IconX, IconAlertTriangle, IconInfoCircle } from '@tabler/icons-react'
import { createElement } from 'react'

interface NotificationOptions {
  title?: string
  message: string
  autoClose?: number | boolean
}

export const notify = {
  success: ({ title = 'Success', message, autoClose = 3000 }: NotificationOptions) => {
    notifications.show({
      title,
      message,
      color: 'green',
      icon: createElement(IconCheck, { size: 18 }),
      autoClose,
    })
  },

  error: ({ title = 'Error', message, autoClose = 8000 }: NotificationOptions) => {
    notifications.show({
      title,
      message,
      color: 'red',
      icon: createElement(IconX, { size: 18 }),
      autoClose,
    })
  },

  warning: ({ title = 'Warning', message, autoClose = 6000 }: NotificationOptions) => {
    notifications.show({
      title,
      message,
      color: 'yellow',
      icon: createElement(IconAlertTriangle, { size: 18 }),
      autoClose,
    })
  },

  info: ({ title = 'Info', message, autoClose = 5000 }: NotificationOptions) => {
    notifications.show({
      title,
      message,
      color: 'blue',
      icon: createElement(IconInfoCircle, { size: 18 }),
      autoClose,
    })
  },

  showSuccess: (message: string) => notify.success({ message }),
  showError: (message: string) => notify.error({ message }),
  showWarning: (message: string) => notify.warning({ message }),
  showInfo: (message: string) => notify.info({ message }),
}

export default notify
