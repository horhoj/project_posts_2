import axios, { AxiosRequestConfig } from 'axios';
import { delay } from '../utils/delay';
import { FetchPostsResponse, Post } from './postsTypes';

const axiosInstance = axios.create({
  baseURL: 'https://dummyjson.com',
  headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
});

interface FetchPostListPayload {
  limit: number;
  skip: number;
}

export const fetchPostList = async ({
  skip,
  limit,
}: FetchPostListPayload): Promise<FetchPostsResponse> => {
  const axiosRequestConfig: AxiosRequestConfig = {
    method: 'get',
    url: '/posts',
    params: { limit, skip },
  };

  const response = await axiosInstance.request<FetchPostsResponse>(
    axiosRequestConfig,
  );

  return response.data;
};

interface FetchPostItemPayload {
  id: number;
}

export const fetchPostItem = async ({
  id,
}: FetchPostItemPayload): Promise<Post> => {
  const axiosRequestConfig: AxiosRequestConfig = {
    method: 'get',
    url: `/posts/${id}`,
  };

  const response = await axiosInstance.request<Post>(axiosRequestConfig);

  return response.data;
};

interface PatchPostItemPayload {
  post: Post;
}

export const patchPostItem = async ({
  post,
}: PatchPostItemPayload): Promise<void> => {
  await delay(500);

  alert(
    'так как у АПИ только фэйковое сохранение, то реально я вот эти данные не отправляю на сервер: ' +
      JSON.stringify(post, null, 2),
  );

  return Promise.resolve();
};
