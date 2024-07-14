async function request(name: string, param: string) {
  const response = await fetch(
    `https://swapi.dev/api/people/?search=${name}&page=${param}`
  );
  if (!response.ok) {
    throw new Error('not found');
  }

  return response.json();
}

export default request;
