import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./authSlice";
import productReducer from "./productSlice";
import cartReducer from "./cartSlice";
import rentalReducer from "./rentalSlice";
import maintenanceReducer from "./maintenanceSlice";
import adminReducer from "./adminSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    products: productReducer,
    cart: cartReducer,
    rentals: rentalReducer,
    maintenance: maintenanceReducer,
    admin: adminReducer,
  },
});

export default store;