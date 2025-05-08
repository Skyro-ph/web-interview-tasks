import { PropsWithChildren } from 'react';

import {
  QueryClient,
  QueryClientProvider as QueryClientProviderRaw,
} from '@tanstack/react-query';

const queryClient = new QueryClient();

export const QueryClientProvider = ({ children }: PropsWithChildren) => {
  return (
    <QueryClientProviderRaw client={queryClient}>
      {children}
    </QueryClientProviderRaw>
  );
};
