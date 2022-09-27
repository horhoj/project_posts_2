import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RequestSliceStateProperty } from '../../../store/types';
import { FetchPostsResponse, Post } from '../../../api/postsTypes';
import {
  makeRequestCaseToBuilder,
  makeRequestSliceStateProperty,
} from '../../../store/helpers';
import { LIMIT } from '../config';
import { SLICE_NAME } from './types';
import * as thunks from './thunks';

interface InitialState {
  fetchPostListRequest: RequestSliceStateProperty<FetchPostsResponse>;
  editPostItemRequest: RequestSliceStateProperty<Post>;
  patchPostRequest: RequestSliceStateProperty<unknown>;
  limit: number;
  skip: number;
}

const initialState: InitialState = {
  limit: LIMIT,
  skip: 0,
  fetchPostListRequest: makeRequestSliceStateProperty<FetchPostsResponse>(),
  editPostItemRequest: makeRequestSliceStateProperty<Post>(),
  patchPostRequest: makeRequestSliceStateProperty<unknown>(),
};

export const { actions, reducer } = createSlice({
  name: SLICE_NAME,
  initialState,
  reducers: {
    setLimit: (state, action: PayloadAction<number>) => {
      state.limit = action.payload;
    },

    setSkip: (state, action: PayloadAction<number>) => {
      state.skip = action.payload;
    },

    clearFetchPostListRequest: (state) => {
      state.editPostItemRequest.data = null;
      state.editPostItemRequest.error = null;
    },
  },

  extraReducers: (builder) => {
    makeRequestCaseToBuilder<InitialState>(
      builder,
      thunks.fetchPostListThunks,
      'fetchPostListRequest',
    );
    makeRequestCaseToBuilder<InitialState>(
      builder,
      thunks.editPostThunk,
      'editPostItemRequest',
    );
    makeRequestCaseToBuilder<InitialState>(
      builder,
      thunks.patchPostThunk,
      'patchPostRequest',
    );
  },
});
