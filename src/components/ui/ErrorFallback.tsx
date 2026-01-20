import { Button, Container, Stack, Text, Title, Code, Paper } from '@mantine/core'
import { IconRefresh, IconHome } from '@tabler/icons-react'
import { useTranslation } from 'react-i18next'
import type { FallbackProps } from 'react-error-boundary'

function ErrorFallback({ error, resetErrorBoundary }: FallbackProps) {
  const { t } = useTranslation()
  const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred'

  return (
    <Container size="sm" py="xl">
      <Stack align="center" gap="lg">
        <Title order={1} c="red">
          {t('errors.somethingWrong')}
        </Title>
        <Text c="dimmed" ta="center">
          {t('errors.unexpectedError')}
        </Text>
        <Paper p="md" withBorder w="100%" maw={500}>
          <Code block style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>
            {errorMessage}
          </Code>
        </Paper>
        <Stack gap="sm">
          <Button
            leftSection={<IconRefresh size={18} />}
            onClick={resetErrorBoundary}
          >
            {t('common.tryAgain')}
          </Button>
          <Button
            variant="light"
            leftSection={<IconHome size={18} />}
            onClick={() => window.location.href = '/'}
          >
            {t('errors.goToHomepage')}
          </Button>
        </Stack>
      </Stack>
    </Container>
  )
}

export default ErrorFallback
