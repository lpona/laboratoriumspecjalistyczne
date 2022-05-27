import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IMovie } from '../types';
import { RootState } from './store';

// Define a service using a base URL and expected endpoints
export const moviesApi = createApi({
  reducerPath: 'moviesApi',
  tagTypes: ['Movie'],
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:4000/api/movies/',
    prepareHeaders: (headers, { getState }) => {
      headers.set(
        'Authorization',
        `Bearer ${(getState() as RootState).currentUser.token}`
      );
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getAllMovies: builder.query<IMovie[], void>({
      query: () => '',
      providesTags: () => [{ type: 'Movie' }],
    }),
    getRanking: builder.query({
      query: () => '/ranking',
    }),
    updateMovie: builder.mutation<
      IMovie,
      Partial<IMovie> & Pick<IMovie, '_id'>
    >({
      query: ({ _id, ...body }) => ({
        url: _id,
        method: 'PUT',
        body,
      }),
      invalidatesTags: ['Movie'],
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useGetAllMoviesQuery,
  useUpdateMovieMutation,
  useGetRankingQuery,
} = moviesApi;
