import { createSelector, createSlice, current } from '@reduxjs/toolkit';

const areEqual = (currentChoices, choices) => {
  // for (const currentChoice of currentChoices) {
  //   for (const choice of choices) {
  //     if (currentChoice.subs.length !== choice.subs.length) {
  //       return false;
  //     }
  //     for (const currentSub of currentChoice.subs) {
  //       let includes = false;
  //       for (const sub of choice.subs) {
  //         if (sub.id === currentSub.id) {
  //           includes = true;
  //         }
  //       }
  //       if (!includes) {
  //         return false;
  //       }
  //     }
  //   }
  // }
  // return true;
};

const initialState = {
  items: [],
};

const authSlice = createSlice({
  name: 'cart',
  initialState: initialState,
  reducers: {
    addItem(state, action) {
      for (let i = 0; i < state.items.length; i++) {
        const item = state.items[i];
        if (item.itemId === action.payload.itemId) {
          state.items[i].count = state.items[i].count + action.payload.count;
          return;
        }
      }

      state.items.push(action.payload);
    },
    removeItem(state, action) {
      for (let i = 0; i < state.items.length; i++) {
        const item = state.items[i];

        if (item.itemId === action.payload) {
          state.items.splice(i, 1);
        }
      }
    },
    updateItem(state, action) {
      for (let i = 0; i < state.items.length; i++) {
        const item = state.items[i];

        if (item.itemId === action.payload.oldId) {
          state.items.splice(i, 1, action.payload.item);
        }
      }
    },
  },
});

export const selectItemsCount = createSelector(
  (state) => state.frame.cart.items,
  (items) => {
    return items.length;
  },
);

export const selectCartSumTotal = createSelector(
  (state) => state.frame.cart.items,
  (items) => {
    let sumTotal = 0;
    for (const item of items) {
      let itemPrice = item.price;
      for (const choice of item.choices) {
        for (const sub of choice.subs) {
          itemPrice += sub.price;
        }
      }

      sumTotal += itemPrice * item.count;
    }
    return sumTotal;
  },
);

export const { addItem, removeItem, updateItem } = authSlice.actions;

export default authSlice.reducer;
