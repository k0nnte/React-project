async function request(name: string) {
  const response = await fetch(`https://swapi.dev/api/people/?search=${name}`);
  if (!response.ok) {
    throw new Error('not found');
  }

  return response.json();
}

export default request;
