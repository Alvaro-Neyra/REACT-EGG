import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "./reducers/products";

const store = configureStore({
  reducer: {
    // Add reducers here
    products: productsReducer
  }  
})

export default store;