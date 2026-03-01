import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import { MainPageRoute } from '~pages/main';
import { SearchPageRoute } from '~pages/search';
import { SuperheroByIdRoute } from '~pages/superhero-by-id';

import HeroBGImage from '~shared/assets/hero-bg.webp';

const router = createBrowserRouter([
  MainPageRoute,
  SearchPageRoute,
  SuperheroByIdRoute,
]);

function RoutesProvider() {
  return (
    <main className="relative flex min-h-screen flex-col">
      <div className="pointer-events-none fixed inset-0 z-0">
        <img src={HeroBGImage} className="h-full w-full object-cover" alt="" />
        <div className="absolute inset-0 bg-neutral-950/80" />
        <div className="absolute inset-0 bg-gradient-to-b from-neutral-950/40 via-neutral-950/70 to-neutral-950" />
      </div>

      <div className="relative flex-1">
        <RouterProvider router={router} />
      </div>
    </main>
  );
}

export { RoutesProvider };
