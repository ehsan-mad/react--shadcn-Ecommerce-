import React from "react";

const ProductItem = ({ imageUrl, title, description, price, onAddToCart }) => {
  return (
    <div className="bg-card rounded-lg shadow-md overflow-hidden">
      <div className="h-48 overflow-hidden">
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-1">{title}</h3>
        <p className="text-muted-foreground text-sm mb-2">{description}...</p>
        <div className="flex justify-between items-center">
          <span className="text-lg font-bold">${price}</span>
          <button
            onClick={onAddToCart}
            className="bg-primary text-primary-foreground px-3 py-1 rounded-md hover:bg-primary/90 transition-colors"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductItem;