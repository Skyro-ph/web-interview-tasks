import { RadixThemeProvider } from './radix';
import { QueryClientProvider } from './react-query';

type Props = {
  children: React.ReactNode;
};

export const Providers = ({ children }: Props) => {
  return (
    <QueryClientProvider>
      <RadixThemeProvider>{children}</RadixThemeProvider>
    </QueryClientProvider>
  );
};
