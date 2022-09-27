import React, { FC } from 'react';
import { useAppSelector } from '../../store/hooks';

import { postsSlice } from '../../features/Posts/postsSlice';
import styles from './Spinner.module.scss';

export const Spinner: FC = () => {
  const postsSliceIsLoading = useAppSelector(postsSlice.selectors.getIsLoading);

  const isLoading = postsSliceIsLoading;

  return isLoading ? <div className={styles.Spinner} /> : null;
};
