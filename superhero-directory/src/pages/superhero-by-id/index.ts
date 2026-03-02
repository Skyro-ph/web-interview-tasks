import { Route } from '~shared/types';

import { SuperheroByIdPage } from './ui/SuperheroByIdPage';

export const SuperheroByIdPageRoute = {
  path: '/:id',
  Component: SuperheroByIdPage,
} as const satisfies Route;
