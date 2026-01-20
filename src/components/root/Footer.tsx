import { Container, Group, Text } from '@mantine/core'
import { COMPANY_NAME } from '@/config/env'

function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer>
      <Container py="md">
        <Group justify="space-around" align="center">
          <Text size="sm" c="dimmed">
            © {currentYear} {COMPANY_NAME}. All rights reserved.
          </Text>
        </Group>
      </Container>
    </footer>
  )
}

export default Footer
