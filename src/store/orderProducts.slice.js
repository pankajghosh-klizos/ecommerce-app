import { createSlice } from "@reduxjs/toolkit";

// Initial state for the product details
const initialState = {
  orderProducts: [],
};

// Create a slice of the Redux store
const orderProducts = createSlice({
  name: "orderProducts",
  initialState,
  reducers: {
    setOrderProducts: (state, action) => {
      state.orderProducts = action.payload;
    },
    addToOrderProducts: (state, action) => {
      state.orderProducts.unshift(action.payload);
    },
  },
});

// Export actions for dispatching
export const { setSelectedColor, setSelectedStorage, setProductDetails } =
  orderProducts.actions;

// Export the reducer to be added to the store
export default orderProducts.reducer;
