type Props = {
  className?: string;
};

export const Loader = ({ className = '' }: Props) => {
  return (
    <div
      role="status"
      className={`h-8 w-8 animate-spin rounded-full border-b-2 border-blue-500 ${className}`}
    />
  );
};
