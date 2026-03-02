import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import type { ReactElement, ReactNode } from 'react';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      retry: 3,
    },
  },
});

declare global {
  interface Window {
    __TANSTACK_QUERY_CLIENT__: import('@tanstack/query-core').QueryClient;
  }
}

window.__TANSTACK_QUERY_CLIENT__ = queryClient;

interface TanstackQueryProviderProps {
  children: ReactNode;
}

function TanstackQueryProvider({
  children,
}: TanstackQueryProviderProps): ReactElement {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}

export { TanstackQueryProvider };
