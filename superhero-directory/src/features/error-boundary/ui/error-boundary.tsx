import { useRouteError, Link } from 'react-router-dom';

import { ROUTER_PATHS } from '~shared/constants/routes';

export function ErrorBoundary() {
  const error = useRouteError();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center">
        <h1 className="mb-4 text-2xl font-bold text-red-500">
          Oops! Something went wrong
        </h1>
        <p className="text-gray-600">
          {error instanceof Error
            ? error.message
            : 'An unexpected error occurred'}
        </p>
      </div>
      <div className="mb-6 flex w-full flex-col items-center gap-4">
        <Link
          to={ROUTER_PATHS.HOME}
          className="mt-4 rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
        >
          Home
        </Link>
      </div>
    </div>
  );
}
