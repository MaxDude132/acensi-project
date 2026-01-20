import { ActionIcon, Affix, useMantineTheme, useComputedColorScheme } from '@mantine/core'
import { IconArrowBarLeft, IconArrowBarRight } from '@tabler/icons-react'

interface NavbarToggleButtonProps {
  opened: boolean
  toggle: () => void
  headerHeight: number
  navbarWidth: number
  transitionDuration: number
}

function NavbarToggleButton({ opened, toggle, headerHeight, navbarWidth, transitionDuration }: NavbarToggleButtonProps) {
  const theme = useMantineTheme()
  const colorScheme = useComputedColorScheme()

  const Icon = opened ? IconArrowBarLeft : IconArrowBarRight

  return (
    <Affix
      position={{ top: headerHeight + 9, left: opened ? navbarWidth - 11 : 38 }}
      style={{ transition: `left ${transitionDuration}ms ease-in-out` }}
    >
      <ActionIcon
        variant="outline"
        onClick={toggle}
        radius={100}
        size="20"
        color={colorScheme === 'dark' ? theme.colors.dark[0] : theme.black}
        style={{ backgroundColor: colorScheme === 'dark' ? theme.colors.dark[7] : theme.white, border: 'none', pointerEvents: 'auto', boxShadow: theme.shadows.sm }}
      >
        <Icon size={14} />
      </ActionIcon>
    </Affix>
  )
}

export default NavbarToggleButton
