import { useNavigate } from 'react-router-dom';

type Props = {
  className?: string;
};

export const BackButton = ({ className = '' }: Props) => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(-1)}
      className={`group flex cursor-pointer items-center text-gray-600 transition-all duration-200 hover:text-gray-900 ${className}`}
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
    </button>
  );
};
