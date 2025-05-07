import { Theme } from '@radix-ui/themes';

import { QueryClientProvider } from './react-query';

type Props = {
  children: React.ReactNode;
};

export const Providers = ({ children }: Props) => {
  return (
    <Theme accentColor="green" appearance="light">
      <QueryClientProvider>{children}</QueryClientProvider>
    </Theme>
  );
};
