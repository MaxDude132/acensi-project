import type { ReactNode } from 'react'
import { useLocation } from '@tanstack/react-router'
import { Box } from '@mantine/core'

interface PageTransitionProps {
  children: ReactNode
}

const fadeInKeyframes = `
  @keyframes pageTransitionFadeIn {
    from {
      opacity: 0;
      transform: translateY(8px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`

function PageTransition({ children }: PageTransitionProps) {
  const location = useLocation()

  return (
    <>
      <style>{fadeInKeyframes}</style>
      <Box
        key={location.pathname}
        style={{
          animation: 'pageTransitionFadeIn 200ms ease forwards',
        }}
      >
        {children}
      </Box>
    </>
  )
}

export default PageTransition
