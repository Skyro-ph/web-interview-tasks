import { PropsWithChildren } from 'react';

import { Theme } from '@radix-ui/themes';

export const RadixThemeProvider = ({ children }: PropsWithChildren) => {
  return <Theme>{children}</Theme>;
};
