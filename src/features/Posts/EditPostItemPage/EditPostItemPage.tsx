import { FC } from 'react';
import { postsSlice } from '../postsSlice';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { getRoutePath } from '../../../router';
import { appSlice } from '../../../store/app';
import { PostItemForm } from '../PostItemForm';
import { Post } from '../../../api/postsTypes';
import { PostItemEditData } from '../PostItemForm/types';
import styles from './EditPostItemPage.module.scss';

const getInitialValues = (post: Post): PostItemEditData => ({
  title: post.title,
  body: post.body,
});

export const EditPostItemPage: FC = () => {
  const { id } = postsSlice.hooks.usePostItemForm();

  const dispatch = useAppDispatch();

  const editPostItemRequest = useAppSelector(
    postsSlice.selectors.getEditPostItemRequest,
  );

  const handleCancel = () => {
    const path = getRoutePath('postList');
    dispatch(appSlice.actions.redirect(path));
  };

  const handleSubmit = (values: PostItemEditData) => {
    if (!editPostItemRequest.data) {
      return;
    }

    const post: Post = { ...editPostItemRequest.data, ...values };

    dispatch(postsSlice.thunks.patchPostThunk({ post }));
  };

  return (
    <div className={styles.wrap}>
      <div>edit post with id={id}</div>
      {editPostItemRequest.data && (
        <PostItemForm
          initialValues={getInitialValues(editPostItemRequest.data)}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
        />
      )}
    </div>
  );
};
