import { RequestSliceStateProperty, RootState } from '../../../store/types';
import { FetchPostsResponse, Post } from '../../../api/postsTypes';

export const getLimit = (state: RootState): number => state.posts.limit;
export const getSkip = (state: RootState): number => state.posts.skip;

export const getIsLoading = (state: RootState): boolean =>
  state.posts.fetchPostListRequest.isLoading ||
  state.posts.editPostItemRequest.isLoading ||
  state.posts.patchPostRequest.isLoading;

export const getFetchPostListRequest = (
  state: RootState,
): RequestSliceStateProperty<FetchPostsResponse> =>
  state.posts.fetchPostListRequest;

export const getEditPostItemRequest = (
  state: RootState,
): RequestSliceStateProperty<Post> => state.posts.editPostItemRequest;
