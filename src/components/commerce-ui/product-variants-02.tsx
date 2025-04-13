import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  updateCartItemQuantity,
  removeFromCart,
} from "../../states/slices/cartSlice";
import { toast } from "react-toastify";
import QuantityInputBasic from "./quantity-input-basic";

// Add isCartItem and quantity props
const ProductVariant_02 = ({ product, isCartItem = false, quantity = 1 }) => {
  const dispatch = useDispatch();
  // Only initialize state if not a cart item
  const [selectedQuantity, setSelectedQuantity] = useState(quantity);

  // Handle quantity change
  const handleQuantityChange = (newQuantity) => {
    if (isCartItem) {
      // If this is a cart item, update the cart in Redux
      dispatch(
        updateCartItemQuantity({ id: product.id, quantity: newQuantity })
      );
    } else {
      // Otherwise just update the local state
      setSelectedQuantity(newQuantity);
    }
  };

  // Handle remove from cart
  const handleRemoveFromCart = () => {
    dispatch(removeFromCart(product.id));
    toast.info("Item removed from cart");
  };
  const handleAddToCart = () => {
    // Add the product with the selected quantity
    for (let i = 0; i < selectedQuantity; i++) {
      dispatch(addToCart(product));
    }
    toast.success("Item added to cart!");
  };

  return (
    <div className="flex flex-col md:flex-row gap-8 p-4 border rounded-lg">
      {/* Product Image */}
      <div className="md:w-1/3">
        <img
          src={
            product.images?.[0] ||
            product.thumbnail ||
            "https://placehold.co/300x300?text=No+Image"
          }
          alt={product.title}
          className="w-full h-auto object-cover rounded-md"
        />
      </div>

      {/* Product Details */}
      <div className="md:w-2/3">
        <h2 className="text-2xl font-bold mb-2">{product.title}</h2>

        {product.brand && (
          <p className="text-gray-600 mb-2">Brand: {product.brand}</p>
        )}

        <div className="flex items-center gap-2 mb-4">
          <span className="text-2xl font-bold">${product.price}</span>
          {product.discountPercentage && (
            <span className="text-green-600">
              {product.discountPercentage}% off
            </span>
          )}
        </div>

        <p className="text-gray-700 mb-6">{product.description}</p>

        {/* Quantity Selector */}
        <div className="flex items-center gap-4 mb-6">
          <span className="font-medium">Quantity:</span>
          <QuantityInputBasic
            quantity={isCartItem ? quantity : selectedQuantity}
            onChange={handleQuantityChange}
            max={10}
          />
        </div>

        {/* Action Buttons */}
        {isCartItem ? (
          <div className="flex gap-4">
            <button
              onClick={handleRemoveFromCart}
              className="px-4 py-2 border border-red-500 text-red-500 rounded-md hover:bg-red-50"
            >
              Remove from Cart
            </button>
          </div>
        ) : (
          <div className="flex gap-4">
            <button
              onClick={handleAddToCart}
              className="px-6 py-2 bg-primary text-white rounded-md hover:bg-primary/90"
            >
              Add to Cart
            </button>
            <button className="px-6 py-2 border border-primary text-primary rounded-md hover:bg-primary/10">
              Buy Now
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductVariant_02;
