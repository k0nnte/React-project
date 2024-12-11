import About from '../../src/About/About';

export async function loader({ params, request }) {
  const url = new URL(request.url);
  const search = url.searchParams.get('search') || '';
  const page = url.searchParams.get('page') || '';
  const { id } = params;
  const numericId = id ? parseInt(id, 10) : null;

  const apiUrl = `https://swapi.dev/api/people/?search=${search}&page=${page}`;
  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error(`Error fetching data: ${response.statusText}`);
    }
    const data = await response.json();
    if (
      numericId === null ||
      numericId < 0 ||
      numericId >= data.results.length
    ) {
      throw new Error('Invalid numericId: out of bounds');
    }
    return data.results[numericId];
  } catch (err) {
    console.error(err);
    return { error: err.message };
  }
}

const Detail = () => {
  return (
    <>
      <About />
    </>
  );
};

export default Detail;
