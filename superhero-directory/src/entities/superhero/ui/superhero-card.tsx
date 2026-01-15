import { Link } from 'react-router-dom';
import { Superhero } from "../superhero";

interface SuperheroCardProps {
  hero: Superhero;
}

export const SuperheroCard = ({ hero }: SuperheroCardProps) => {
  const { id, image, name, biography } = hero
  
  return (
    <Link
      to={`/${id}`}
      className="cursor-pointer overflow-hidden rounded-lg bg-white shadow-md transition-transform hover:scale-105 hover:shadow-lg"
    >
      <img
        src={image.url}
        alt={name}
        className="aspect-square w-full object-cover"
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900">{name}</h3>
        <p className="text-sm text-gray-600">{biography['full-name']}</p>
      </div>
    </Link>
  );
};