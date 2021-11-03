import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  location: null,
};

const authSlice = createSlice({
  name: 'user',
  initialState: initialState,
  reducers: {
    setLocation(state, action) {
      state.location = action.payload;
    },
  },
});

export const { setLoggedIn } = authSlice.actions;

export default authSlice.reducer;
