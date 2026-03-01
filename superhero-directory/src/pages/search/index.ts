import { Route } from '~shared/types';

import { SearchPage } from './ui/SearchPage';

export const SearchPageRoute = {
  path: '/search',
  Component: SearchPage,
} as const satisfies Route;
