type Props = {
  name: string;
  fullName: string;
};

export function SuperheroHeader({ name, fullName }: Props) {
  return (
    <>
      <h1 className="mb-2 text-center text-4xl font-bold">{name}</h1>
      <p className="text-center text-gray-600">{fullName}</p>
    </>
  );
}
