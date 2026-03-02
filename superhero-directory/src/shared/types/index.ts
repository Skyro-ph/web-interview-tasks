import type { ComponentType } from 'react';
import type { RouteObject } from 'react-router';

export type Route = RouteObject & {
  path: string;
  Component: ComponentType;
};
