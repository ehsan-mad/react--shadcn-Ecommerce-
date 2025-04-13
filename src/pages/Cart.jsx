import React from "react";
import { useSelector } from "react-redux";
import ProductVariant_02 from "@/components/commerce-ui/product-variants-02";

const Cart = () => {
  // Get cart data from Redux store
  const { cartItems, totalPrice, totalQuantity } = useSelector(state => state.cart);
  
  // If cart is empty, show a message
  if (!cartItems || cartItems.length === 0) {
    return (
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
        <p className="text-gray-500">Your cart is empty. Start shopping to add items to your cart.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Your Cart ({totalQuantity} items)</h1>
      
      {/* Map through each cart item and render the ProductVariant_02 component for each */}
      {cartItems.map(item => (
        <div key={item.id} className="mb-6">
          <ProductVariant_02 
            product={item}
            isCartItem={true}
            quantity={item.quantity}
          />
        </div>
      ))}
      
      {/* Cart Summary */}
      <div className="mt-8 p-4 border rounded-lg bg-gray-50">
        <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
        <div className="flex justify-between mb-2">
          <span>Subtotal:</span>
          <span>${totalPrice.toFixed(2)}</span>
        </div>
        <div className="flex justify-between mb-2">
          <span>Shipping:</span>
          <span>Calculated at checkout</span>
        </div>
        <div className="flex justify-between font-bold text-lg mt-4 pt-4 border-t">
          <span>Total:</span>
          <span>${totalPrice.toFixed(2)}</span>
        </div>
        <button className="w-full mt-4 bg-primary text-white py-2 rounded-md hover:bg-primary/90">
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
};

export default Cart;
