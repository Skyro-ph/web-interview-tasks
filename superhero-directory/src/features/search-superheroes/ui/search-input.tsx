interface SearchInputProps {
  value: string;
  onChange: (val: string) => void;
  isFetching: boolean;
}

export const SearchInput = ({ onChange, value, isFetching }: SearchInputProps) => {
  return (
    <div className="mx-auto w-full max-w-md relative">
      <input
        type="text"
        placeholder="Start typing to find superheroes..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-lg border border-gray-300 px-4 py-2 outline-none focus:border-blue-400 transition-colors"
      />
      {isFetching && (
        <div className="absolute right-3 top-2.5 animate-spin h-5 w-5 border-2 border-blue-500 border-t-transparent rounded-full" />
      )}
    </div>
  );
}