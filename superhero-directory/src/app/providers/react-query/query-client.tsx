import { PropsWithChildren } from 'react';

import {
  QueryClient,
  QueryClientProvider as QueryClientProviderRaw,
} from '@tanstack/react-query';

export const queryClient = new QueryClient();

export const QueryClientProvider = ({ children }: PropsWithChildren) => {
  return (
    <QueryClientProviderRaw client={queryClient}>
      {children}
    </QueryClientProviderRaw>
  );
};

export const StorybookQueryClientProvider = ({
  children,
}: PropsWithChildren) => {
  queryClient.clear();

  return (
    <QueryClientProviderRaw client={queryClient}>
      {children}
    </QueryClientProviderRaw>
  );
};
