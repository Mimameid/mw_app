import { createSlice, createSelector, nanoid } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';
import { fetchShop } from 'features/shop/shop/actions';

const initialState = {};

const authSlice = createSlice({
  name: 'menu',
  initialState: initialState,
  extraReducers: (builder) => {
    builder.addCase(HYDRATE, (state, action) => {
      return {
        ...state,
        ...action.payload.shop.menu,
      };
    });

    builder.addCase(fetchShop.fulfilled, (state, action) => {
      return action.payload.menuData;
    });
  },
});

// selectors

export const selectDish = createSelector(
  (state) => state.shop.menu,
  (state, dishId) => dishId,

  (menu, dishId) => {
    for (const category of menu.categories) {
      for (const dish of category.dishes) {
        if (dish.id === dishId) {
          return dish;
        }
      }
    }
  },
);

export const { setLoggedIn } = authSlice.actions;

export default authSlice.reducer;
