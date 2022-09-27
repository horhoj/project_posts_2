import { FC } from 'react';
import { postsSlice } from '../postsSlice';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { Button } from '../../../UIKit/Button';
import { appSlice } from '../../../store/app';
import { getRoutePath } from '../../../router';
import styles from './PostListPage.module.scss';
import { PostItem } from './PostItem';

export const PostListPage: FC = () => {
  postsSlice.hooks.usePostListPage();

  const dispatch = useAppDispatch();
  const fetchPostListRequest = useAppSelector(
    postsSlice.selectors.getFetchPostListRequest,
  );

  const limit = useAppSelector(postsSlice.selectors.getLimit);
  const skip = useAppSelector(postsSlice.selectors.getSkip);

  const handleNextPage = () => {
    dispatch(postsSlice.thunks.nextPageThunk());
  };

  const handlePrevPage = () => {
    dispatch(postsSlice.thunks.prevPageThunk());
  };

  const handlePostEdit = (id: number) => {
    const path = getRoutePath('editPostItem', id.toString());
    dispatch(appSlice.actions.redirect(path));
  };

  return (
    <div className={styles.wrap}>
      <div className={styles.toolPanel}>
        <Button className={styles.toolPanelButton} onClick={handlePrevPage}>
          prev
        </Button>
        <div>
          <div>{`limit: ${limit}`}</div>
          <div>{`skip: ${skip}`}</div>
        </div>
        <Button className={styles.toolPanelButton} onClick={handleNextPage}>
          next
        </Button>
      </div>
      <div className={styles.postList}>
        {fetchPostListRequest.data &&
          fetchPostListRequest.data.posts.map((post, index) => (
            <PostItem
              post={post}
              key={post.id}
              index={index + 1 + skip}
              onEdit={() => handlePostEdit(post.id)}
            />
          ))}
      </div>
    </div>
  );
};
