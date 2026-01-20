import { Button, Container, Stack, Text, Title, Group } from '@mantine/core'
import { useNavigate } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'
import { IconHome, IconArrowLeft } from '@tabler/icons-react'
import PageHead from '../seo/PageHead'
import { APP_DESCRIPTION } from '@/config/env'

function NotFound() {
  const { t } = useTranslation()
  const navigate = useNavigate()

  return (
    <Container size="sm" py="xl">
      <Stack align="center" gap="lg">
        <PageHead title={t('errors.notFound')} description={APP_DESCRIPTION} />
        <Title order={1} size="6rem" fw={900} c="dimmed">
          404
        </Title>
        <Title order={2}>{t('errors.notFound')}</Title>
        <Text c="dimmed" ta="center" maw={500}>
          {t('errors.notFoundMessage')}
        </Text>
        <Group>
          <Button
            variant="light"
            leftSection={<IconArrowLeft size={18} />}
            onClick={() => window.history.back()}
          >
            {t('common.goBack')}
          </Button>
          <Button
            leftSection={<IconHome size={18} />}
            onClick={() => navigate({ to: '/' })}
          >
            {t('common.home')}
          </Button>
        </Group>
      </Stack>
    </Container>
  )
}

export default NotFound
