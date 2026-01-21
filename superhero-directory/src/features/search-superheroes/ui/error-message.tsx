import { Callout } from '@radix-ui/themes';

interface ErrorMessageProps {
  message?: string;
}

export const ErrorMessage = ({ message }: ErrorMessageProps) => {
  return (
    <Callout.Root color="red" className="mx-auto max-w-2xl">
      <Callout.Text>
        Error loading results: {message || 'Unknown error'}
      </Callout.Text>
    </Callout.Root>
  );
};
