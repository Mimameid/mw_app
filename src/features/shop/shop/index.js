import { createSlice } from '@reduxjs/toolkit';
import { fetchLocationConditions, fetchShop } from './actions';

const initialState = {};

const authSlice = createSlice({
  name: 'shop',
  initialState: initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchShop.fulfilled, (state, action) => {
      return action.payload.shopData;
    });
    builder.addCase(fetchLocationConditions.fulfilled, (state, action) => {
      state.locationConditions = action.payload;
    });
  },
});

export const { setLoggedIn } = authSlice.actions;

export default authSlice.reducer;
