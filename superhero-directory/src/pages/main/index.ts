import { Route } from '~shared/types';

import { MainPage } from './ui/MainPage';

export const MainPageRoute = {
  path: '/',
  Component: MainPage,
} as const satisfies Route;
