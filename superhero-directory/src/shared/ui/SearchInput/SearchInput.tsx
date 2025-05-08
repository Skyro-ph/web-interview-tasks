import { ChangeEvent, useState } from 'react';

type SearchInput = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

export const SearchInput = ({
  name,
  placeholder,
  defaultValue,
  onChange,
  className = '',
  ...props
}: SearchInput) => {
  const [value, setValue] = useState(defaultValue);
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    if (onChange) {
      onChange(e);
    }
  };
  return (
    <input
      type="search"
      name={name}
      placeholder={placeholder}
      className={`mx-auto mt-4 block h-8 w-2/5 rounded-full border border-transparent bg-gray-500/10 px-4 outline-0 transition-colors hover:border-green-800/50 focus-visible:border-green-800/50 ${className}`}
      value={value}
      onChange={handleChange}
      {...props}
    />
  );
};
