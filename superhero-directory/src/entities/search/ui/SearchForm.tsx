import { Search, X } from 'lucide-react';
import { toast } from 'sonner';

import {
  type ChangeEvent,
  type FormEvent,
  useEffect,
  useRef,
  useState,
} from 'react';

const MIN_LENGTH = 3;
const MIN_LENGTH_TOAST_ID = 'search-min-length';

export function SearchForm({
  value = '',
  placeholder = 'Search...',
  debounceMs = 800,
  onDebounceChange,
  onSubmit,
}: {
  value?: string;
  placeholder?: string;
  debounceMs?: number;
  onDebounceChange?: (value: string) => void;
  onSubmit?: (value: string) => void;
}) {
  const [searchQuery, setSearchQuery] = useState<string>(value);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    setSearchQuery(value);
  }, [value]);

  useEffect(() => {
    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
    };
  }, []);

  function onSearchChange(event: ChangeEvent<HTMLInputElement>) {
    toast.dismiss(MIN_LENGTH_TOAST_ID);

    const next = event.target.value;
    setSearchQuery(next);

    if (onDebounceChange) {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }

      debounceRef.current = setTimeout(() => {
        const trimmed = next.trim();

        if (trimmed.length > 0 && trimmed.length < MIN_LENGTH) {
          toast.warning(`Minimum ${MIN_LENGTH} characters required`, {
            id: MIN_LENGTH_TOAST_ID,
          });
          return;
        }

        onDebounceChange(next);
      }, debounceMs);
    }
  }

  function onClear() {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    setSearchQuery('');

    if (onDebounceChange) {
      onDebounceChange('');
    }
  }

  function onSearchSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const trimmed = searchQuery.trim();

    if (trimmed.length > 0 && trimmed.length < MIN_LENGTH) {
      toast.warning(`Minimum ${MIN_LENGTH} characters required`, {
        id: MIN_LENGTH_TOAST_ID,
      });
      return;
    }

    if (onSubmit) {
      onSubmit(searchQuery);
    }
  }

  return (
    <form
      className="relative mx-auto w-full max-w-2xl px-4"
      onSubmit={onSearchSubmit}
    >
      <div className="group relative flex items-center">
        <div className="absolute left-5 text-orange-500 transition-colors duration-200 group-focus-within:text-orange-400">
          <Search size={22} strokeWidth={2.5} />
        </div>

        <input
          type="text"
          value={searchQuery}
          placeholder={placeholder}
          className="w-full rounded-[20px] border border-orange-900/40 bg-[#1a1412]/95 py-4.5 pr-12 pl-14 text-lg text-white shadow-[0_0_15px_rgba(0,0,0,0.5)] transition-all duration-300 outline-none placeholder:text-gray-500 hover:border-orange-800/60 focus:border-orange-500/50 focus:ring-4 focus:ring-orange-500/10"
          onChange={onSearchChange}
        />

        {searchQuery ? (
          <button
            type="button"
            className="absolute right-5 cursor-pointer text-gray-500 transition-colors duration-200 hover:text-white"
            aria-label="Clear search"
            onClick={onClear}
          >
            <span className="flex items-center justify-center">
              <X size={20} />
            </span>
          </button>
        ) : null}
      </div>
    </form>
  );
}
