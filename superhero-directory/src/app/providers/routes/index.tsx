import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import { MainPageRoute } from '~pages/main';
import { SuperheroByIdRoute } from '~pages/superhero-by-id';

const router = createBrowserRouter([MainPageRoute, SuperheroByIdRoute]);

function RoutesProvider() {
  return <RouterProvider router={router} />;
}

export { RoutesProvider };
