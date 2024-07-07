export default async function (name: string) {
  const response = await fetch(`https://swapi.dev/api/${name}/`);
  if (!response.ok) {
    throw new Error('not found');
  }
  const data = await response.json();

  return data;
}
