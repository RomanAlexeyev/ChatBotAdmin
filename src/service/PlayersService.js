import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const playersAPI = createApi({
  reducerPath: "playersAPI",
  baseQuery: fetchBaseQuery({baseUrl: "assets/demo/data/"}),
  endpoints: (build) => ({
    getAllPlayers: build.query({
      query: () => ({
        url: "players.json"
      })
    }),
    getForModeration: build.query({
      query: () => ({
        url: "for_moderation.json"
      })
    }),
  })
})
