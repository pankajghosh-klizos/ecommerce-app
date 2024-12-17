import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setProducts: (state, action) => {
      // Sets the entire list of products
      state.products = action.payload;
    },
    addProduct: (state, action) => {
      // Adds a new product to the list
      state.products.push(action.payload);
    },
    removeProduct: (state, action) => {
      // Removes a product from the list by ID
      state.products = state.products.filter(
        (product) => product.id !== action.payload
      );
    },
    updateProduct: (state, action) => {
      // Updates an existing product by ID
      const productIndex = state.products.findIndex(
        (product) => product.id === action.payload.id
      );

      if (productIndex !== -1) {
        state.products[productIndex] = {
          ...state.products[productIndex],
          ...action.payload,
        };
      }
    },
    clearProducts: (state) => {
      // Clears the entire list of products
      state.products = [];
    },
  },
});

export const {
  setProducts,
  addProduct,
  removeProduct,
  updateProduct,
  clearProducts,
} = productsSlice.actions;

export default productsSlice.reducer;
