import { createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../../../api';
import { RootState } from '../../../store/types';
import { LIMIT } from '../config';
import { Post } from '../../../api/postsTypes';
import { appSlice } from '../../../store/app';
import { getRoutePath } from '../../../router';
import { SLICE_NAME } from './types';
import { actions } from './slice';

interface FetchPostListThunkPayload {
  limit: number;
  skip: number;
}

export const fetchPostListThunks = createAsyncThunk(
  `${SLICE_NAME}/fetchPostListThunks`,
  async ({ limit, skip }: FetchPostListThunkPayload) => {
    return api.posts.fetchPostList({ skip, limit });
  },
);

export const reFetchPostListThunks = createAsyncThunk(
  `${SLICE_NAME}/reFetchPostListThunks`,
  async (_, { dispatch, getState }) => {
    const limit = (getState() as RootState).posts.limit;
    const skip = (getState() as RootState).posts.skip;
    dispatch(fetchPostListThunks({ limit, skip }));
  },
);

export const nextPageThunk = createAsyncThunk(
  `${SLICE_NAME}/nextPageThunk`,

  async (_, { getState, dispatch }) => {
    const limit = (getState() as RootState).posts.limit;
    const skip = (getState() as RootState).posts.skip + LIMIT;
    dispatch(actions.setSkip(skip));
    dispatch(fetchPostListThunks({ limit, skip }));
  },
);

export const prevPageThunk = createAsyncThunk(
  `${SLICE_NAME}/prevPageThunk`,

  async (_, { getState, dispatch }) => {
    const limit = (getState() as RootState).posts.limit;
    const skip = (getState() as RootState).posts.skip - LIMIT;
    if (skip < 0) {
      return;
    }
    dispatch(actions.setSkip(skip));
    dispatch(fetchPostListThunks({ limit, skip }));
  },
);

interface EditPostThunkPayload {
  id: number;
}

export const editPostThunk = createAsyncThunk(
  `${SLICE_NAME}/editPostThunk`,
  async ({ id }: EditPostThunkPayload) => {
    return api.posts.fetchPostItem({ id });
  },
);

interface PatchPostThunkPayload {
  post: Post;
}

export const patchPostThunk = createAsyncThunk(
  `${SLICE_NAME}/patchPostThunk`,
  async ({ post }: PatchPostThunkPayload, { dispatch }) => {
    const response = await api.posts.patchPostItem({ post });
    const path = getRoutePath('postList');
    dispatch(appSlice.actions.redirect(path));
    return response;
  },
);
