import { TextField } from '@radix-ui/themes';

interface SearchFieldProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function SearchField({ value, onChange }: SearchFieldProps) {
  return (
    <div className="mx-auto w-full max-w-2xl">
      <TextField.Root
        value={value}
        onChange={onChange}
        placeholder="Search for a superhero"
        size="3"
      />
    </div>
  );
}
