import { configureStore } from "@reduxjs/toolkit";
import authReducers from "./auth.slice.js";
import verifyReducers from "./verify.slice.js";
import productsReducers from "./products.slice.js";
import filterProductsReducers from "./filterProducts.slice.js";
import cartProductsReducers from "./cartProducts.slice.js";
import wishlistProductsReducers from "./wishlistProducts.slice.js";
import productDetailsReducers from "./productDetails.slice.js";
import orderDetailsReducers from "./orderDetails.slice.js";

const store = configureStore({
  reducer: {
    auth: authReducers,
    verify: verifyReducers,
    products: productsReducers,
    filterProducts: filterProductsReducers,
    cartProducts: cartProductsReducers,
    wishlistProducts: wishlistProductsReducers,
    productDetails: productDetailsReducers,
    orderDetails: orderDetailsReducers,
  },
});

export default store;
