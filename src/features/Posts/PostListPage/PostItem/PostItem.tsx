import { FC, Fragment } from 'react';
import { Post } from '../../../../api/postsTypes';
import { getUUID } from '../../../../utils/getUUID';
import { Button } from '../../../../UIKit/Button';
import styles from './PostItem.module.scss';

interface PostItemProps {
  post: Post;
  index: number;
  onEdit: () => void;
}

export const PostItem: FC<PostItemProps> = ({ post, index, onEdit }) => {
  const reactionsDataTemplate = new Array(post.reactions).fill(null);

  return (
    <div className={styles.wrap}>
      <div
        className={styles.title}
      >{`${index}. (id=${post.id}) ${post.title}`}</div>
      <div>
        <Button onClick={onEdit}>edit</Button>
      </div>
      <div className={styles.reaction}>
        <div className={styles.reactionLabel}>reaction:</div>
        <div>
          {reactionsDataTemplate.map(() => (
            <Fragment key={getUUID()}>*</Fragment>
          ))}
        </div>
      </div>
      <div className={styles.body}>{post.body}</div>
    </div>
  );
};
