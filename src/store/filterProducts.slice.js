import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  filterProducts: [],
  appliedFilters: {},
};

const filterProductsSlice = createSlice({
  name: "filterProducts",
  initialState,
  reducers: {
    // Set the entire list of filtered products
    setFilteredProducts: (state, action) => {
      state.filterProducts = action.payload;
    },
    // Adds a new filter criterion (e.g., price range, brand, category)
    addFilterCriteria: (state, action) => {
      const { key, value } = action.payload;
      state.appliedFilters[key] = value;
    },
    // Removes a specific filter criterion by key
    removeFilterCriteria: (state, action) => {
      const { key } = action.payload;
      delete state.appliedFilters[key];
    },
    // Clears all applied filter criteria
    clearAllFilters: (state) => {
      state.appliedFilters = {};
      state.filterProducts = [];
    },
    // Update an existing filter criterion
    updateFilterCriteria: (state, action) => {
      const { key, value } = action.payload;
      if (state.appliedFilters[key]) {
        state.appliedFilters[key] = value;
      }
    },
  },
});

export const {
  setFilteredProducts,
  addFilterCriteria,
  removeFilterCriteria,
  clearAllFilters,
  updateFilterCriteria,
} = filterProductsSlice.actions;

export default filterProductsSlice.reducer;
