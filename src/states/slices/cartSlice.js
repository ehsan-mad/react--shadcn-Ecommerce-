import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cartItems: [],
  totalQuantity: 0,
  totalPrice: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;
      const existingItem = state.cartItems.find(i => i.id === item.id);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.cartItems.push({ ...item, quantity: 1 });
      }
      state.totalQuantity += 1;
      state.totalPrice += item.price;
    },
    removeFromCart: (state, action) => {
      const id = action.payload;
      const item = state.cartItems.find(i => i.id === id);
      if (item) {
        state.totalQuantity -= item.quantity;
        state.totalPrice -= item.price * item.quantity;
        state.cartItems = state.cartItems.filter(i => i.id !== id);
      }
    },
    clearCart: (state) => {
      state.cartItems = [];
      state.totalQuantity = 0;
      state.totalPrice = 0;
    },
    updateCartItemQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const item = state.cartItems.find(i => i.id === id);
      
      if (item) {
        // Calculate the difference in quantity
        const quantityDifference = quantity - item.quantity;
        
        // Update the item quantity
        item.quantity = quantity;
        
        // Update the total quantity and price
        state.totalQuantity += quantityDifference;
        state.totalPrice += item.price * quantityDifference;
      }
    },
  },
});

export const { addToCart, removeFromCart, updateCartItemQuantity,clearCart } = cartSlice.actions;
export default cartSlice.reducer;
