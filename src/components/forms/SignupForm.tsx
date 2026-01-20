import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { TextInput, Button, Stack, Paper, Title, Text, Anchor } from '@mantine/core'
import { useTranslation } from 'react-i18next'
import notify from '@/lib/notifications'
import { IconUser, IconLock, IconMail } from '@tabler/icons-react'
import { registerSchema, type RegisterFormData } from '@/lib/validation'
import apiClient from '@/lib/api-client'

function SignupForm() {
  const { t } = useTranslation()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  })

  const onSubmit = async (data: RegisterFormData) => {
    try {
      await apiClient.post('auth/register/', {
        username: data.username,
        email: data.email,
        password: data.password,
      })
      notify.showSuccess(t('auth.registerSuccess'))
    } catch {
      notify.showError(t('auth.registerError'))
    }
  }

  return (
    <Paper p="xl" withBorder maw={400} mx="auto">
      <Stack gap="md">
        <Title order={2}>{t('auth.register')}</Title>
        <Text c="dimmed" size="sm">
          {t('auth.registerSubtitle')}
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
              label={t('auth.email')}
              placeholder={t('auth.emailPlaceholder')}
              leftSection={<IconMail size={16} />}
              error={errors.email?.message}
              {...register('email')}
            />

            <TextInput
              label={t('auth.password')}
              type="password"
              placeholder={t('auth.passwordPlaceholder')}
              leftSection={<IconLock size={16} />}
              error={errors.password?.message}
              {...register('password')}
            />

            <TextInput
              label={t('auth.confirmPassword')}
              type="password"
              placeholder={t('auth.passwordPlaceholder')}
              leftSection={<IconLock size={16} />}
              error={errors.confirmPassword?.message}
              {...register('confirmPassword')}
            />

            <Button type="submit" fullWidth loading={isSubmitting}>
              {t('auth.signUp')}
            </Button>

            <Text ta="center" size="sm">
              {t('auth.hasAccount')}{' '}
              <Anchor href="/login">{t('auth.login')}</Anchor>
            </Text>
          </Stack>
        </form>
      </Stack>
    </Paper>
  )
}

export default SignupForm
