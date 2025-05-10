type Props = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
> & {
  value?: string;
  onClear?: () => void;
};

export const SearchInput = ({
  value = '',
  placeholder = 'Search...',
  onChange,
  onClear,
  className = '',
  ...props
}: Props) => {
  return (
    <div className={`mx-auto w-full max-w-2xl ${className}`}>
      <div className="relative">
        <input
          type="text"
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="w-full rounded-lg border-2 border-gray-200 px-4 py-3 text-base transition-colors duration-200 outline-none placeholder:text-gray-400 focus:border-blue-500"
          {...props}
        />
        {value && (
          <button
            type="button"
            onClick={onClear}
            className="absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer text-gray-400 hover:text-gray-600"
            aria-label="Clear input"
          >
            ✕
          </button>
        )}
      </div>
    </div>
  );
};
