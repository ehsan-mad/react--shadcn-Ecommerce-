/**
 * Redux slice for managing product data fetched from an external API.
 * 
 * This module defines:
 * - An async thunk for fetching products from the Escuelas API
 * - A product slice with state management for loading, error handling, and data storage
 * - Reducer cases to handle the pending, fulfilled, and rejected states of the API request
 * 
 * The state maintains three properties:
 * - items: Array of products fetched from the API
 * - loading: Boolean indicating if a fetch operation is in progress
 * - error: Error message if the fetch operation fails
 */

// Import necessary functions from Redux Toolkit and axios for HTTP requests
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Define the API endpoint as a constant for easy maintenance and reuse
// This URL points to the Escuelas API product endpoint that returns product data
const API_URL = 'https://api.escuelajs.co/api/v1/products';

/**
 * Creates an async thunk for fetching products from the API.
 * 
 * @param 'products/fetchProducts' - The action type prefix used by Redux
 * @param async function - The payload creator that makes the API call
 * @returns A thunk action creator that can be dispatched to fetch products
 * 
 * When dispatched, this thunk will:
 * 1. Dispatch a 'products/fetchProducts/pending' action
 * 2. Make the API call using axios
 * 3. If successful, dispatch 'products/fetchProducts/fulfilled' with the response data
 * 4. If failed, dispatch 'products/fetchProducts/rejected' with the error
 */
export const fetchProducts = createAsyncThunk('products/fetchProducts', async () => {
  // Make a GET request to the API endpoint
  const response = await axios.get(API_URL);
  // Return the data from the response, which will be the payload of the fulfilled action
  return response.data;
});

/**
 * Creates a Redux slice for product state management.
 * 
 * A slice combines the reducer logic and actions into a single object.
 */
const productSlice = createSlice({
  // Name of the slice, used as a prefix for action types
  name: 'products',
  
  // Define the initial state structure with empty products, no loading state, and no errors
  initialState: {
    items: [],     // Will hold the array of products
    loading: false, // Tracks if an API request is in progress
    error: null,    // Stores any error message from failed requests
  },
  
  // No standard reducers are defined here since we're only handling async actions
  
  /**
   * Extra reducers handle actions defined outside the slice, like our async thunk actions.
   * The builder callback approach allows for type-safe reducer definitions.
   * 
   * @param builder - The builder object used to define case reducers
   */
  extraReducers: builder => {
    builder
      /**
       * Handle the pending state when the API request starts.
       * 
       * @param state - The current state (mutable thanks to Immer)
       * 
       * When the request starts:
       * - Set loading to true to show loading indicators in the UI
       * - Clear any previous errors
       */
      .addCase(fetchProducts.pending, state => {
        state.loading = true;
        state.error = null;
      })
      
      /**
       * Handle the fulfilled state when the API request succeeds.
       * 
       * @param state - The current state (mutable thanks to Immer)
       * @param action - The action object containing the payload (product data)
       * 
       * When the request succeeds:
       * - Set loading to false to hide loading indicators
       * - Store the fetched products in the items array
       */
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      
      /**
       * Handle the rejected state when the API request fails.
       * 
       * @param state - The current state (mutable thanks to Immer)
       * @param action - The action object containing the error information
       * 
       * When the request fails:
       * - Set loading to false to hide loading indicators
       * - Store the error message for display in the UI
       */
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

// Export the reducer function for use in the Redux store
export default productSlice.reducer;
