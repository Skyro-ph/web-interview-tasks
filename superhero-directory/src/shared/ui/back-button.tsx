import { useNavigate, Link } from 'react-router-dom';

import { ROUTER_PATHS } from '~shared/config';

type Props = {
  className?: string;
};

export const BackButton = ({ className = '' }: Props) => {
  const navigate = useNavigate();

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate(ROUTER_PATHS.HOME);
    }
  };

  return (
    <Link
      to={ROUTER_PATHS.HOME}
      onClick={handleClick}
      className={`group inline-flex cursor-pointer items-center text-gray-600 transition-all duration-200 hover:text-gray-900 ${className}`}
    >
      <svg
        className="mr-2 h-5 w-5 transform transition-transform duration-200 group-hover:-translate-x-1"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M19 12H5M5 12L12 19M5 12L12 5"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      Back
    </Link>
  );
};
