import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import { authenticate, login } from './actions';

const initialState = {
  loggedIn: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState: initialState,
  reducers: {
    setLoggedIn(state, action) {
      state.loggedIn = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(isAnyOf(authenticate.fulfilled, login.fulfilled), (state, action) => {
        state.loggedIn = true;
      })
      .addDefaultCase((state, action) => {
        if (action.type.endsWith('/rejected')) {
          if (action.error.code === '401') {
            state.loggedIn = false;
          }
        }
      });
  },
});

export const { setLoggedIn } = authSlice.actions;

export default authSlice.reducer;
