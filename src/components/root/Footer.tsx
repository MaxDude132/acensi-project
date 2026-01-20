import { Container, Group, Text, Anchor } from '@mantine/core'
import { APP_NAME } from '@/config/env'

function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer>
      <Container py="md">
        <Group justify="space-between" align="center">
          <Text size="sm" c="dimmed">
            © {currentYear} {APP_NAME}. All rights reserved.
          </Text>
          <Group gap="md">
            <Anchor href="/privacy" size="sm" c="dimmed">
              Privacy
            </Anchor>
            <Anchor href="/terms" size="sm" c="dimmed">
              Terms
            </Anchor>
            <Anchor href="/contact" size="sm" c="dimmed">
              Contact
            </Anchor>
          </Group>
        </Group>
      </Container>
    </footer>
  )
}

export default Footer
