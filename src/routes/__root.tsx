import { QueryClient } from '@tanstack/react-query'
import {
  createRootRouteWithContext,
  Navigate,
  Outlet,
} from '@tanstack/react-router'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'
import { useAuth } from '@/stores/authStore'
import { Toaster } from '@/components/ui/sonner'
import { NavigationProgress } from '@/components/navigation-progress'
import GeneralError from '@/features/errors/general-error'
import NotFoundError from '@/features/errors/not-found-error'

type ProtectedRouteProps = Readonly<{
  children: React.ReactNode
}>

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { user } = useAuth()

  if (!user) {
    // Redirect to the login page if the user is not authenticated
    return <Navigate to='/sign-in' />
  }

  // Render the children if the user is authenticated
  return <>{children}</>
}

export const Route = createRootRouteWithContext<{
  queryClient: QueryClient
}>()({
  component: () => {
    return (
      <>
        <NavigationProgress />
        <Outlet />
        <Toaster duration={2000} />
        {import.meta.env.MODE === 'development' && (
          <>
            <ReactQueryDevtools buttonPosition='bottom-left' />
            <TanStackRouterDevtools position='bottom-right' />
          </>
        )}
      </>
    )
  },
  notFoundComponent: NotFoundError,
  errorComponent: GeneralError,
})
