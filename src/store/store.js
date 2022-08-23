import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from '@reduxjs/toolkit/query'
import { playersAPI } from "../service/PlayersService";
import { quizAPI } from "../service/QuizService";

export const store = configureStore({
    reducer: {
      [playersAPI.reducerPath]: playersAPI.reducer,
      [quizAPI.reducerPath]: quizAPI.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(playersAPI.middleware).concat(quizAPI.middleware),
  })

setupListeners(store.dispatch)