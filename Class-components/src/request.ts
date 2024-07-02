async function request(name: string) {
  const response = await fetch(`https://swapi.dev/api/${name}/`);
  if (!response.ok) {
    throw new Error('not found');
  }
  return response;
}

export default request;
