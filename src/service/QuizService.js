import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const quizAPI = createApi({
  reducerPath: "quizAPI",
  baseQuery: fetchBaseQuery({baseUrl: "assets/demo/data/"}),
  endpoints: (build) => ({
    getAllTasks: build.query({
      query: () => ({
        url: "quiz_tasks.json"
      })
    }),
  })
})
