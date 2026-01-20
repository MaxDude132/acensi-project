# React Starter Template

A modern React starter template with everything you need to build production-ready applications.

## Tech Stack

- **React 19** + **TypeScript** + **Vite**
- **Mantine UI** — Component library with dark mode support
- **TanStack Router** — File-based routing with code splitting
- **TanStack Query** — Data fetching and caching
- **react-hook-form** — Form handling
- **@dr.pogodin/react-helmet** — SEO/meta tags
- **react-error-boundary** — Error handling

## Getting Started

### 1. Clone & Install

```bash
# Clone this template
git clone <your-repo-url> my-project
cd my-project

# Install dependencies
yarn install  # or npm install

# Start dev server
yarn dev
```

### 2. Rename the Project

1. Update `package.json`:
   - Change `"name"` to your project name
2. Update `index.html`:
   - Change the `<title>` tag
3. Update `public/favicon.svg` with your own icon

### 3. Configure Environment

Copy `.env.example` to `.env` and update the values:

```bash
cp .env.example .env
```

```env
VITE_API_URL=http://localhost:8000/api
VITE_APP_NAME=My App
```

## Project Structure

```
src/
├── api/              # TanStack Query hooks & API scaffolding
├── components/
│   ├── auth/         # Auth components (ProtectedRoute)
│   ├── forms/        # Form components
│   ├── hooks/        # Custom hooks (useNavLinks)
│   ├── root/         # App shell components
│   ├── seo/          # SEO components (PageHead)
│   ├── ui/           # Reusable UI components
│   └── utils/        # Utility components (ScrollToTop, PageTransition)
├── config/           # App configuration (layout, env)
├── lib/              # Utilities (api-client, notifications)
├── routes/           # TanStack Router file-based routes
└── main.tsx          # App entry point
```

## Customization Guide

### Adding Navigation Links

Edit `src/components/hooks/useNavLinks.ts`:

```tsx
export function useNavLinks() {
  return useMemo(() => [
    { link: '/', label: 'Home', icon: IconHome },
    { link: '/dashboard', label: 'Dashboard', icon: IconDashboard },
    // Add more links...
  ], [])
}
```

### Adding New Routes

Create a new file in `src/routes/`:

```tsx
// src/routes/dashboard.tsx
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/dashboard')({
  component: DashboardPage,
})

function DashboardPage() {
  return <div>Dashboard</div>
}
```

### Creating API Hooks (for Django REST Framework)

Use the hook factories in `src/api/queries.ts`:

```tsx
// Define your types
interface Product {
  id: number
  name: string
  price: number
}

// Create hooks
const productKeys = ['products'] as const
export const useProducts = createListQuery<Product>('/products/', productKeys)
export const useProduct = createDetailQuery<Product>('/products/', productKeys)
export const useCreateProduct = createCreateMutation<Product, CreateProductInput>('/products/', productKeys)
```

### Theming

Edit the theme in `src/main.tsx`:

```tsx
const theme = createTheme({
  primaryColor: 'violet',  // Change primary color
  defaultRadius: 'md',
  // Add more customizations...
})
```

### Layout Constants

Adjust layout dimensions in `src/config/layout.ts`:

```tsx
export const HEADER_HEIGHT = 60
export const NAVBAR_WIDTH = 200
export const TRANSITION_DURATION = 250
```

## Features

### ✅ Included

- Dark/light mode toggle with persistence
- Responsive app shell with collapsible navbar
- File-based routing with lazy loading
- 404 page with navigation
- Error boundary with fallback UI
- Page transitions (fade animation)
- Scroll-to-top on route change
- SEO component for meta tags
- Toast notifications system
- API client with error handling
- TanStack Query scaffolding for DRF
- Protected route component
- Login form example
- Path aliases (`@/` → `src/`)

### 🔧 Add Yourself

- Authentication logic
- Backend API integration
- Additional pages and routes
- Custom components

## Scripts

```bash
yarn dev       # Start dev server
yarn build     # Build for production
yarn preview   # Preview production build
yarn lint      # Run ESLint
```

## Tips

- Use `PageHead` component on each page for SEO
- Use `notify.success()` / `notify.error()` for toasts
- Wrap authenticated routes with `ProtectedRoute`
- Use `Breadcrumbs` for navigation hierarchy
