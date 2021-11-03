import { createSelector, createSlice } from '@reduxjs/toolkit';

const initialState = {
  itemsById: {},
};

const authSlice = createSlice({
  name: 'cart',
  initialState: initialState,
  reducers: {
    addItem(state, action) {
      state.location = action.payload;
    },
  },
});

export const selectItemsCount = createSelector(
  (state) => state.frame.cart.itemsById,
  (itemsById) => {
    return Object.keys(itemsById).length;
  },
);

export default authSlice.reducer;
