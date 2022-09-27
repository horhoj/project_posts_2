import { actions, reducer } from './slice';
import * as selectors from './selectors';
import * as thunks from './thunks';
import * as hooks from './hooks';

export const postsSlice = { actions, reducer, selectors, thunks, hooks };
