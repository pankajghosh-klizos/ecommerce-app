import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartProducts: [],
};

const cartProductsSlice = createSlice({
  name: "cartProducts",
  initialState,
  reducers: {
    setCartProducts: (state, action) => {
      state.cartProducts = action.payload;
    },

    addToCart: (state, action) => {
      const existingItem = state.cartProducts.find(
        (item) => item.productId === action.payload.productId
      );

      if (existingItem) {
        existingItem.quantity += action.payload.quantity;
        existingItem.totalPrice +=
          action.payload.price * action.payload.quantity;
      } else {
        state.cartProducts.unshift(action.payload);
      }
    },

    removeFromCart: (state, action) => {
      state.cartProducts = state.cartProducts.filter(
        (product) => product.productId !== action.payload
      );
    },

    increaseQuantity: (state, action) => {
      const item = state.cartProducts.find(
        (item) => item.productId === action.payload
      );

      if (item) {
        item.quantity += 1;
      }
    },

    decreaseQuantity: (state, action) => {
      const item = state.cartProducts.find(
        (item) => item.productId === action.payload
      );

      if (item && item.quantity > 1) {
        item.quantity -= 1;
      }
    },

    clearCart: (state) => {
      state.cartProducts = [];
    },
  },
});

export const {
  setCartProducts,
  addToCart,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  clearCart,
} = cartProductsSlice.actions;

export default cartProductsSlice.reducer;
