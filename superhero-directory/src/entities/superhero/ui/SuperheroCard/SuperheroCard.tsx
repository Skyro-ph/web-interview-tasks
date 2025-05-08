import { Superhero } from '../../model/superhero';

import { Link } from 'react-router-dom';

type Props = Pick<Superhero, 'image' | 'name' | 'id'>;

export const SuperheroCard = ({ name, image, id }: Props) => {
  return (
    <Link to={`/${id}`} className="flex size-full flex-col gap-4 rounded-md p-4 shadow-sm">
      <img src={image.url} width="100%" height="100%" className="object-cover grow rounded-sm" alt={name} />
      <p className="font-display text-2xl">{name}</p>
    </Link>
  );
};
