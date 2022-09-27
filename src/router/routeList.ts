import { FC } from 'react';
import { PostListPage } from '../features/Posts/PostListPage';
import { EditPostItemPage } from '../features/Posts/EditPostItemPage';
import { Page404 } from '../features/Page404';

interface RouteItem {
  path: string;
  component: FC;
}

export const routeNameList = ['postList', 'editPostItem', 'page404'] as const;

export type RouteNameList = typeof routeNameList[number];

export const routeList: Record<RouteNameList, RouteItem> = {
  postList: {
    path: '/posts',
    component: PostListPage,
  },

  editPostItem: {
    path: '/posts/:id',
    component: EditPostItemPage,
  },

  page404: {
    path: '*',
    component: Page404,
  },
};
