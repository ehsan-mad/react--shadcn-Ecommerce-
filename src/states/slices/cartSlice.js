/**
 * Redux slice for managing shopping cart functionality.
 * 
 * This module defines:
 * - Initial state structure for the shopping cart
 * - Reducers for adding, removing, updating, and clearing cart items
 * - Automatic calculation of total quantity and price
 * 
 * The cart state maintains three properties:
 * - cartItems: Array of products added to the cart with their quantities
 * - totalQuantity: Total number of items in the cart
 * - totalPrice: Total price of all items in the cart
 */

// Import createSlice from Redux Toolkit to create a slice with reducers
import { createSlice } from '@reduxjs/toolkit';

/**
 * Initial state for the cart slice.
 * 
 * cartItems: Empty array that will hold objects representing products in the cart
 * totalQuantity: Starts at 0, represents the total number of items
 * totalPrice: Starts at 0, represents the sum of all item prices
 */
const initialState = {
  cartItems: [],      // Array to store cart items with their quantities
  totalQuantity: 0,   // Total count of all items in cart
  totalPrice: 0,      // Total price of all items in cart
};

/**
 * Create a Redux slice for cart functionality.
 * 
 * The slice contains reducers that handle different cart operations
 * while maintaining the cart totals automatically.
 */
const cartSlice = createSlice({
  name: 'cart',       // Name of the slice, used in action types
  initialState,       // Initial state defined above
  reducers: {
    /**
     * Adds an item to the cart or increases its quantity if it already exists.
     * 
     * @param state - Current cart state (mutable thanks to Immer)
     * @param action - Action object with the item to add in the payload
     * 
     * Logic:
     * 1. Check if the item already exists in the cart
     * 2. If it exists, increase its quantity by 1
     * 3. If not, add it to the cart with quantity 1
     * 4. Update the total quantity and price
     */
    addToCart: (state, action) => {
      const item = action.payload;  // Get the item from the action payload
      // Check if the item already exists in the cart
      const existingItem = state.cartItems.find(i => i.id === item.id);
      
      if (existingItem) {
        // If item exists, increase its quantity
        existingItem.quantity += 1;
      } else {
        // If item doesn't exist, add it to cart with quantity 1
        state.cartItems.push({ ...item, quantity: 1 });
      }
      
      // Update cart totals
      state.totalQuantity += 1;  // Increase total quantity by 1
      state.totalPrice += item.price;  // Add item price to total
    },

    /**
     * Removes an item completely from the cart regardless of its quantity.
     * 
     * @param state - Current cart state
     * @param action - Action object with the item ID to remove in the payload
     * 
     * Logic:
     * 1. Find the item by ID
     * 2. Subtract its quantity and price from the totals
     * 3. Remove the item from the cart array
     */
    removeFromCart: (state, action) => {
      const id = action.payload;  // Get the item ID from the action payload
      // Find the item in the cart
      const item = state.cartItems.find(i => i.id === id);
      
      if (item) {
        // Update cart totals before removing the item
        state.totalQuantity -= item.quantity;  // Subtract item quantity from total
        state.totalPrice -= item.price * item.quantity;  // Subtract item total price
        
        // Remove the item from the cart
        state.cartItems = state.cartItems.filter(i => i.id !== id);
      }
    },

    /**
     * Clears all items from the cart.
     * 
     * @param state - Current cart state
     * 
     * Logic:
     * Reset all state properties to their initial values
     */
    clearCart: (state) => {
      // Reset cart to initial empty state
      state.cartItems = [];
      state.totalQuantity = 0;
      state.totalPrice = 0;
    },

    /**
     * Updates the quantity of a specific item in the cart.
     * 
     * @param state - Current cart state
     * @param action - Action object with item ID and new quantity in the payload
     * 
     * Logic:
     * 1. Find the item by ID
     * 2. Calculate the difference between new and old quantity
     * 3. Update the item quantity
     * 4. Update the cart totals based on the quantity difference
     */
    updateCartItemQuantity: (state, action) => {
      const { id, quantity } = action.payload;  // Get ID and new quantity
      // Find the item in the cart
      const item = state.cartItems.find(i => i.id === id);
      
      if (item) {
        // Calculate how much the quantity has changed
        const quantityDifference = quantity - item.quantity;
        
        // Update the item's quantity to the new value
        item.quantity = quantity;
        
        // Update cart totals based on the quantity difference
        state.totalQuantity += quantityDifference;  // Adjust total quantity
        state.totalPrice += item.price * quantityDifference;  // Adjust total price
      }
    },
  },
});

// Export the action creators for use in components
export const { 
  addToCart,
  removeFromCart, 
  updateCartItemQuantity,
  clearCart 
} = cartSlice.actions;

// Export the reducer for use in the Redux store
export default cartSlice.reducer;