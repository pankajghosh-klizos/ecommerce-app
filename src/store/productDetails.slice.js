import { createSlice } from "@reduxjs/toolkit";

// Initial state for the product details
const initialState = {
  productDetails: {},
};

// Create a slice of the Redux store
const productDetailsSlice = createSlice({
  name: "productDetails",
  initialState,
  reducers: {
    setProductDetails: (state, action) => {
      state.productDetails = action.payload;
    },
    setSelectedColor: (state, action) => {
      state.productDetails.selectedColor = action.payload;
    },
    setSelectedStorage: (state, action) => {
      state.productDetails.selectedStorage = action.payload;
    },
  },
});

// Export actions for dispatching
export const { setSelectedColor, setSelectedStorage, setProductDetails } =
  productDetailsSlice.actions;

// Export the reducer to be added to the store
export default productDetailsSlice.reducer;
