import { useMemo } from 'react'
import { IconHome, type Icon } from '@tabler/icons-react'

export interface NavLink {
  label: string
  link: string
  Icon?: Icon
  shouldShow?: boolean
  children?: NavLink[]
}

export function useNavLinks() {
  const navLinks: NavLink[] = useMemo(() => [
    { label: 'Home', link: '/', Icon: IconHome },
    // Example: only show when authenticated
    // { label: 'Dashboard', link: '/dashboard', Icon: IconDashboard, shouldShow: isAuthenticated },
    // Example: only show when NOT authenticated
    // { label: 'Login', link: '/login', Icon: IconLogin, shouldShow: !isAuthenticated },
  ], [])

  const filteredNavLinks = useMemo(
    () => navLinks.filter(({ shouldShow }) => shouldShow === undefined || shouldShow),
    [navLinks]
  )

  const showNavbar = filteredNavLinks.length > 1
  const rootNavLink = filteredNavLinks[0]

  return {
    navLinks,
    filteredNavLinks,
    showNavbar,
    rootNavLink,
  }
}
