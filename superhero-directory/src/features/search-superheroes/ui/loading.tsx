import { Spinner } from '@radix-ui/themes';

export const Loading = () => {
  return (
    <div className="flex items-center justify-center py-12">
      <Spinner size="3" />
    </div>
  );
};
