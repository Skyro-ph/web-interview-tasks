import { Link, Outlet } from 'react-router-dom';

import { ROUTER_PATHS } from '~shared/constants';

export function Layout() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="bg-green-800 py-4 text-white">
        <h1 className="text-center text-2xl font-bold">
          <Link to={ROUTER_PATHS.HOME}>Superhero Directory</Link>
        </h1>
      </header>
      <main className="container mx-auto flex-grow p-4">
        <Outlet />
      </main>
      <footer className="bg-gray-800 py-2 text-center text-white">
        <p>&copy; 2025 Superhero Directory. All rights reserved.</p>
      </footer>
    </div>
  );
}
