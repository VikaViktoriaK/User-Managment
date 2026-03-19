import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const usersApi = createApi({
  reducerPath: 'usersApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://dummyjson.com/' }),
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => 'users',
      transformResponse: (response) => response.users,
    }),
    getUserById: builder.query({
      query: (id) => `users/${id}`,
    }),
  }),
});

export const { useGetUsersQuery, useGetUserByIdQuery } = usersApi;
