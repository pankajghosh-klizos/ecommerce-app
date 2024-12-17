import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  wishlistProducts: [],
};

const wishlistProductsSlice = createSlice({
  name: "wishlistProducts",
  initialState,
  reducers: {
    setWishlistProducts: (state, action) => {
      // Sets the entire wishlist array
      state.wishlistProducts = action.payload;
    },
    addToWishlist: (state, action) => {
      const existingProduct = state.wishlistProducts.find(
        (item) => item.id === action.payload.id
      );
      if (!existingProduct) {
        state.wishlistProducts.unshift(action.payload);
      }
    },
    removeFromWishlist: (state, action) => {
      state.wishlistProducts = state.wishlistProducts.filter(
        (item) => item.id !== action.payload
      );
    },
    clearWishlist: (state) => {
      // Clears the entire wishlist
      state.wishlistProducts = [];
    },
  },
});

export const {
  setWishlistProducts,
  addToWishlist,
  removeFromWishlist,
  clearWishlist,
} = wishlistProductsSlice.actions;

export default wishlistProductsSlice.reducer;
