import { skipToken, useQuery } from '@tanstack/react-query';
import { superheroKeys } from './keys';
import { superheroApi } from "./superhero-api";

export type Params = {
  id?: string;
};

export function useSuperhero(params: Params) {
  const { id } = params;

  return useQuery({
    queryKey: superheroKeys.superhero(id ?? ''),
    queryFn: id
      ? ({signal}) => superheroApi.getById(id, signal)
      : skipToken,
  });
}