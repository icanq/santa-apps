import { SantaRequest, SantaResponse } from '../types';
import { api } from './api';

export const santaApi = api.injectEndpoints({
  endpoints: (builder) => ({
    sendSantaRequest: builder.mutation<SantaResponse, SantaRequest>({
      query: (request) => ({
        url: '/santa/request',
        method: 'POST',
        body: request,
      }),
    }),
  }),
});

export const { useSendSantaRequestMutation } = santaApi;
