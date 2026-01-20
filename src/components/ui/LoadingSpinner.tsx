import { Center, Loader, Stack, Text } from '@mantine/core'

interface LoadingSpinnerProps {
  message?: string
  fullScreen?: boolean
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
}

function LoadingSpinner({ message, fullScreen = false, size = 'lg' }: LoadingSpinnerProps) {
  const content = (
    <Stack align="center" gap="md">
      <Loader size={size} />
      {message && (
        <Text size="sm" c="dimmed">
          {message}
        </Text>
      )}
    </Stack>
  )

  if (fullScreen) {
    return (
      <Center style={{ minHeight: '100vh' }}>
        {content}
      </Center>
    )
  }

  return (
    <Center py="xl">
      {content}
    </Center>
  )
}

export default LoadingSpinner
