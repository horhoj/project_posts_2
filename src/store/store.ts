import { configureStore } from '@reduxjs/toolkit';
import { postsSlice } from '../features/Posts/postsSlice';
import { appSlice } from './app';

export const store = configureStore({
  devTools: true,
  reducer: {
    app: appSlice.reducer,
    posts: postsSlice.reducer,
  },
});
