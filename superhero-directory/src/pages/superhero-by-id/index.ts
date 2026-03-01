import { Route } from '~shared/types';

import { SuperheroByIdPage } from './ui/SuperheroByIdPage';

export const SuperheroByIdRoute = {
  path: '/:id',
  Component: SuperheroByIdPage,
} as const satisfies Route;
