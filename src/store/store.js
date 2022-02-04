import reducers from './reducers';
import { configureStore } from '@reduxjs/toolkit';
import { createWrapper } from 'next-redux-wrapper';

import { loadState, saveState } from './localStorage';
import { throttle } from 'common/utils/utils';

// const initialState = loadState();
const initialState = {};

// create wrapper for nextjs
const storeWrapper = createWrapper(() =>
  configureStore({
    reducer: reducers,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredPaths: ['frame.location.sessionToken'],
          ignoredActions: ['location/queryAddress/fulfilled', 'location/queryPlace/fulfilled'],
        },
      }),
    devTools: process.env.NODE_ENV !== 'production',
    initialState,
  }),
);

// store.subscribe(
//   throttle(() => {
//     // specify reducers that shall be stored (currently the whole store is persisted)
//     // saveState(store.getState());

//     saveState(store.getState().user);
//   }),
//   1000,
// );

export default storeWrapper;
