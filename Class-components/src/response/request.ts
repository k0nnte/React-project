// async function request(name: string, param: string) {
//   const response = await fetch(
//     `https://swapi.dev/api/people/?search=${name}&page=${param}`
//   );
//   if (!response.ok) {
//     throw new Error('not found');
//   }

//   return response.json();
// }

// export default request;

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Irequest } from '../interfases/interfases';

export const request = createApi({
  reducerPath: 'request',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://swapi.dev/api/people' }),
  endpoints: (builder) => ({
    getAllPeople: builder.query<Irequest, string[]>({
      query: ([search, page]) => `/?search=${search}&page=${page}`,
    }),
  }),
});

export const { useGetAllPeopleQuery } = request;
