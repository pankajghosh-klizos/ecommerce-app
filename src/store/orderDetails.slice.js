import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  amount: 0,
  shippingMethod: "",
  address: {},
  deliveryDate: "",
};

const orderDetailsSlice = createSlice({
  name: "orderDetails",
  initialState,
  reducers: {
    setOrderItems: (state, action) => {
      // Sets the items array
      state.items = action.payload;
    },
    addItemToOrder: (state, action) => {
      // Adds an item to the order
      state.items.push(action.payload);
      state.amount += action.payload.price * action.payload.quantity;
    },
    removeItemFromOrder: (state, action) => {
      // Removes an item from the order
      const itemIndex = state.items.findIndex(
        (item) => item.product_title === action.payload.product_title
      );
      if (itemIndex !== -1) {
        state.amount -=
          state.items[itemIndex].price * state.items[itemIndex].quantity;
        state.items.splice(itemIndex, 1);
      }
    },
    clearOrder: (state) => {
      // Clears the entire order
      state.items = [];
      state.amount = 0;
    },
    setAddress: (state, action) => {
      // Sets the address for the order
      state.address = action.payload;
    },
    setAmount: (state, action) => {
      // Manually sets the total amount
      state.amount = action.payload;
    },
    setShippingMethod: (state, action) => {
      // Sets the shipping method for the order
      state.shippingMethod = action.payload;
    },
    setDeliveryDate: (state, action) => {
      // Sets the delivery date for the order
      state.deliveryDate = action.payload;
    },
  },
});

export const {
  setOrderItems,
  addItemToOrder,
  removeItemFromOrder,
  clearOrder,
  setAddress,
  setAmount,
  setShippingMethod,
  setDeliveryDate,
} = orderDetailsSlice.actions;

export default orderDetailsSlice.reducer;
