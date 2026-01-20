import { Text } from '@mantine/core'
import { modals } from '@mantine/modals'

interface ConfirmOptions {
  title?: string
  message: string
  confirmLabel?: string
  cancelLabel?: string
  dangerous?: boolean
}

export function confirmAction({
  title = 'Confirm action',
  message,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  dangerous = false,
}: ConfirmOptions): Promise<boolean> {
  return new Promise((resolve) => {
    modals.openConfirmModal({
      title,
      children: <Text size="sm">{message}</Text>,
      labels: { confirm: confirmLabel, cancel: cancelLabel },
      confirmProps: { color: dangerous ? 'red' : undefined },
      onConfirm: () => resolve(true),
      onCancel: () => resolve(false),
    })
  })
}

export function alert(title: string, message: string) {
  modals.open({
    title,
    children: <Text size="sm">{message}</Text>,
  })
}

export { modals }
