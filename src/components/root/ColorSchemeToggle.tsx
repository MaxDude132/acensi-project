import { ActionIcon, useMantineColorScheme, useComputedColorScheme } from '@mantine/core'
import { IconSun, IconMoon } from '@tabler/icons-react'

function ColorSchemeToggle() {
  const { setColorScheme } = useMantineColorScheme()
  const colorScheme = useComputedColorScheme()

  const toggleColorScheme = () => setColorScheme(colorScheme === 'dark' ? 'light' : 'dark')

  return (
    <ActionIcon variant="subtle" onClick={toggleColorScheme} size="lg">
      {colorScheme === 'dark' ? <IconSun size={20} /> : <IconMoon size={20} />}
    </ActionIcon>
  )
}

export default ColorSchemeToggle
