import { createSlice } from '@reduxjs/toolkit';
import { toggleIsCartOpen } from './actions';

const initialState = {
  isCartOpen: false,
};

const locationSlice = createSlice({
  name: 'frame',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(toggleIsCartOpen, (state, action) => {
      state.isCartOpen = !state.isCartOpen;
    });
  },
});

export default locationSlice.reducer;
