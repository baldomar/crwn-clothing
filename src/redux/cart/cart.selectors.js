import { createSelector } from 'reselect';

// inputSelector does not use createSelector
const selectCart = (state) => state.cart;

// outputSelector uses createSelector
export const selectCartItems = createSelector(
  [selectCart],
  (cart) => cart.cartItems
);

export const selectCartItemsCount = createSelector(
  [selectCartItems],
  (cartItems) =>
    cartItems.reduce((acc, currentItem) => 
      acc + currentItem.quantity
    , 0)
);

export const selectCartHidden = createSelector(
  [selectCart],
  (cart) => cart.hidden
);

export const selectCartItemsTotal = createSelector(
  [selectCartItems],
  (cartItems) =>
    cartItems.reduce((acc, cartItem) => 
      acc + cartItem.quantity * cartItem.price
    , 0)
);
