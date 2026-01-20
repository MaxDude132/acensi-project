import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { TextInput, Button, Stack, Paper, Title, Text, Anchor } from '@mantine/core'
import { useTranslation } from 'react-i18next'
import notify from '@/lib/notifications'
import { IconUser, IconLock } from '@tabler/icons-react'
import { loginSchema, type LoginFormData } from '@/lib/validation'
import { useAuthStore } from '@/lib/auth-store'

function LoginForm() {
  const { t } = useTranslation()
  const login = useAuthStore((state) => state.login)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: '',
      password: '',
    },
  })

  const onSubmit = async (data: LoginFormData) => {
    try {
      await login(data)
      notify.showSuccess(t('auth.loginSuccess'))
    } catch {
      notify.showError(t('auth.invalidCredentials'))
    }
  }

  return (
    <Paper p="xl" withBorder maw={400} mx="auto">
      <Stack gap="md">
        <Title order={2}>{t('auth.login')}</Title>
        <Text c="dimmed" size="sm">
          {t('auth.loginSubtitle')}
        </Text>

        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack gap="md">
            <TextInput
              label={t('auth.username')}
              placeholder={t('auth.usernamePlaceholder')}
              leftSection={<IconUser size={16} />}
              error={errors.username?.message}
              {...register('username')}
            />

            <TextInput
              label={t('auth.password')}
              type="password"
              placeholder={t('auth.passwordPlaceholder')}
              leftSection={<IconLock size={16} />}
              error={errors.password?.message}
              {...register('password')}
            />

            <Button type="submit" fullWidth loading={isSubmitting}>
              {t('auth.signIn')}
            </Button>

            <Text ta="center" size="sm">
              {t('auth.noAccount')}{' '}
              <Anchor href="/register">{t('auth.register')}</Anchor>
            </Text>
          </Stack>
        </form>
      </Stack>
    </Paper>
  )
}

export default LoginForm
