import { createRootRoute, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import MaxAppShell from '@/components/root/MaxAppShell'
import ScrollToTop from '@/components/utils/ScrollToTop'
import PageTransition from '@/components/utils/PageTransition'
import { ENABLE_DEV_TOOLS } from '@/config/env'

export const Route = createRootRoute({
  component: () => (
    <MaxAppShell>
      <ScrollToTop />
      <PageTransition>
        <Outlet />
      </PageTransition>
      {ENABLE_DEV_TOOLS && <TanStackRouterDevtools />}
    </MaxAppShell>
  ),
})
