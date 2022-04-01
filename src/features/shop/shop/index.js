import { createSlice } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';
import { fetchLocationConditions, fetchShop } from './actions';

const initialState = {};

const authSlice = createSlice({
  name: 'shop',
  initialState: initialState,
  extraReducers: (builder) => {
    builder.addCase(HYDRATE, (state, action) => {
      return {
        ...state,
        ...action.payload.shop.shop,
      };
    });

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
