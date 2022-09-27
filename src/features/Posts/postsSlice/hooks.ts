import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch } from '../../../store/hooks';
import { postsSlice } from './index';

export const usePostListForm = (): void => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(postsSlice.thunks.reFetchPostListThunks());
  }, []);
};

interface UsePostItemFormReturnType {
  id: number;
}

export const usePostItemForm = (): UsePostItemFormReturnType => {
  const dispatch = useAppDispatch();

  const { id } = useParams<{ id: string }>();

  const idInt = id ? Number.parseInt(id) : 0;

  useEffect(() => {
    dispatch(postsSlice.thunks.editPostThunk({ id: idInt }));
    return () => {
      dispatch(postsSlice.actions.clearFetchPostListRequest());
    };
  }, []);

  return { id: idInt };
};
