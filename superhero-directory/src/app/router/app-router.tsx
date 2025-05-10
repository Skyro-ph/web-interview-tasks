import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { HomePage } from '~pages/home/home-page';
import { SuperheroPage } from '~pages/superhero/superhero-page';

import { Layout } from '~widgets/layout';

import { ErrorBoundary } from '~features/error-boundary/ui';

import { ROUTER_PATHS } from '~shared/constants/routes';

export const router = createBrowserRouter([
  {
    path: ROUTER_PATHS.HOME,
    element: <Layout />,
    errorElement: <ErrorBoundary />,
    children: [
      {
        path: '',
        element: <HomePage />,
      },
      {
        path: ROUTER_PATHS.SUPERHERO,
        element: <SuperheroPage />,
      },
    ],
  },
]);

export function AppRouter() {
  return <RouterProvider router={router} />;
}
