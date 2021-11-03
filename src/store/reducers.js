import { combineReducers } from 'redux';

import user from 'features/user/auth';
import shop from 'features/shop';
import frame from 'features/frame';

const appReducer = combineReducers({
  frame,
  user,
  shop,
});

const reducers = (state, action) => {
  // when a logout action is dispatched it will reset redux state
  if (action.type === 'user/auth/rejected' || action.type === 'user/logout/fulfilled') {
    state = undefined;
  }

  return appReducer(state, action);
};

export default reducers;
