import { createFileRoute } from '@tanstack/react-router'
import NotFound from '@/components/ui/NotFound'

export const Route = createFileRoute('/$')({
  component: NotFound,
})
