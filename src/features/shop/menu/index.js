import { createSlice } from '@reduxjs/toolkit';
import { fetchShop } from 'features/shop/shop/actions';

const initialState = {};

const authSlice = createSlice({
  name: 'menu',
  initialState: initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchShop.fulfilled, (state, action) => {
      return action.payload.menuData;
    });
  },
});

export const { setLoggedIn } = authSlice.actions;

export default authSlice.reducer;
