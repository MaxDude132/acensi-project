import { AppShell, Burger, Group, NavLink, Title } from '@mantine/core'
import { useDisclosure, useMediaQuery } from '@mantine/hooks';
import { useLocation, useNavigate } from '@tanstack/react-router';
import ColorSchemeToggle from './ColorSchemeToggle';
import LanguageSwitcher from './LanguageSwitcher';
import NavbarToggleButton from './NavbarToggleButton';
import { HEADER_HEIGHT, NAVBAR_WIDTH, TRANSITION_DURATION } from '@/config/layout';
import { useNavLinks } from '@/components/hooks/useNavLinks';
import Footer from './Footer';
import { APP_NAME } from '@/config/env';

interface AppProps {
  children?: React.ReactNode;
}

function MaxAppShell({ children }: AppProps) {
  const navigate = useNavigate();
  const location = useLocation();

  const isMobile = useMediaQuery('(max-width: 768px)')
  const [opened, { toggle }] = useDisclosure(!isMobile);

  // Pass hook values here, e.g.: useNavLinks({ isAuthenticated: useAuth().isAuthenticated })
  const { filteredNavLinks, showNavbar, rootNavLink } = useNavLinks();

  return (
    <AppShell
      padding="md"
      header={{ height: HEADER_HEIGHT }}
      navbar={showNavbar ? {
        width: opened ? NAVBAR_WIDTH: 49,
        breakpoint: 'sm',
        collapsed: { mobile: !opened },
      } : undefined}
    >
      <AppShell.Header h={HEADER_HEIGHT}>
        <Group h="100%" px="md">
          {showNavbar &&
            <Burger
              opened={opened}
              onClick={toggle}
              size="sm"
              hiddenFrom='sm'
            />
          }
          <Title onClick={() => navigate({ to: rootNavLink.link })} style={{ cursor: 'pointer' }}>{ APP_NAME }</Title>

          <Group ml="auto">
            <LanguageSwitcher />
            <ColorSchemeToggle />
          </Group>
        </Group>
      </AppShell.Header>

      {showNavbar && (
        <AppShell.Navbar style={{ transition: `width ${TRANSITION_DURATION}ms ease-in-out` }}>
          {filteredNavLinks.map(({ label, link, Icon }) => (
            <NavLink
              key={link}
              label={label}
              onClick={() => navigate({ to: link })}
              leftSection={Icon ? <Icon /> : null}
              active={location.pathname === link}
            />
          ))}

          <NavbarToggleButton
            opened={opened}
            toggle={toggle}
            headerHeight={HEADER_HEIGHT}
            navbarWidth={NAVBAR_WIDTH}
            transitionDuration={TRANSITION_DURATION}
          />
        </AppShell.Navbar>
      )}

      <AppShell.Main style={{ transition: `padding ${TRANSITION_DURATION}ms ease-in-out` }}>{children}</AppShell.Main>

      <AppShell.Footer><Footer /></AppShell.Footer>
    </AppShell>
  )
}

export default MaxAppShell
