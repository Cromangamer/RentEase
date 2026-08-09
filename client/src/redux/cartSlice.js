import { createSlice } from "@reduxjs/toolkit";

const storedCart = localStorage.getItem("cart");

const initialState = {
  items: storedCart ? JSON.parse(storedCart) : [],
};

const saveCart = (items) => {
  localStorage.setItem("cart", JSON.stringify(items));
};

const cartSlice = createSlice({
  name: "cart",

  initialState,

  reducers: {
    addToCart: (state, action) => {
      const product = action.payload;

      const existingItem = state.items.find(
        (item) => item.productId === product.productId
      );

      if (existingItem) {
        existingItem.quantity += product.quantity;
        existingItem.months = product.months;
      } else {
        state.items.push(product);
      }

      saveCart(state.items);
    },

    removeFromCart: (state, action) => {
      state.items = state.items.filter(
        (item) => item.productId !== action.payload
      );

      saveCart(state.items);
    },

    updateCartQuantity: (state, action) => {
      const { productId, quantity } = action.payload;

      const item = state.items.find(
        (item) => item.productId === productId
      );

      if (item) {
        item.quantity = quantity;
      }

      saveCart(state.items);
    },

    updateCartTenure: (state, action) => {
      const { productId, months } = action.payload;

      const item = state.items.find(
        (item) => item.productId === productId
      );

      if (item) {
        item.months = months;
      }

      saveCart(state.items);
    },

    clearCart: (state) => {
      state.items = [];

      saveCart([]);
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  updateCartQuantity,
  updateCartTenure,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;