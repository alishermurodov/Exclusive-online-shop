import { configureStore } from "@reduxjs/toolkit";
import { productSlice } from "./features/products/productSlice";
import { authSlice } from "./features/auth/authSlice";


export const store = configureStore({
    reducer: {
        products: productSlice.reducer,
        auth: authSlice.reducer,
    }
})

