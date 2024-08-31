import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_BASE_URL, API_TIMEOUT } from '../config/env';

export const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: API_BASE_URL,
    timeout: API_TIMEOUT,
  }),
  endpoints: () => ({}),
});
