/**
 * Home Page Component
 * 
 * This component serves as the landing page of the e-commerce application.
 * It displays a carousel of featured products and a grid of product cards.
 * The component fetches product data using Redux and displays loading skeletons
 * while data is being fetched.
 */

// React core imports for component creation and lifecycle management
import React, { useEffect, useState } from "react";

// UI carousel components from the custom UI library
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "../components/ui/carousel";

// Product card component for displaying individual products
import ProductItem from "@/components/commerce-ui/product-cards-01";

// Skeleton component for loading state
import {SkeletonCard} from "@/components/commerce-ui/ProductSkeleton"

// Redux hooks for accessing and updating the global state
import { useDispatch, useSelector } from 'react-redux';

// Redux action to fetch products from the API
import { fetchProducts } from '../states/slices/product';

// Redux action to add items to the cart
import { addToCart } from '../states/slices/cartSlice';

// Toast notification library for user feedback
import { toast } from 'react-toastify';

/**
 * Home component - Main landing page
 * 
 * This component:
 * 1. Fetches product data using Redux on mount
 * 2. Displays a loading skeleton while data is being fetched
 * 3. Renders a carousel of featured products
 * 4. Renders a grid of product cards
 * 5. Handles adding products to cart
 */
const Home = () => {
  // Get the dispatch function to send actions to Redux
  const dispatch = useDispatch();
  
  // Extract product data, loading state, and error from Redux store
  // This uses destructuring to rename 'items' to 'products' for clarity
  const { items: products, loading, error } = useSelector(state => state.products);

  /**
   * Effect hook to fetch products when component mounts
   * 
   * The dispatch function is included in the dependency array to satisfy
   * the exhaustive-deps rule, though it should remain stable across renders
   */
  useEffect(() => {
    // Dispatch the fetchProducts action to load product data
    dispatch(fetchProducts());
  }, [dispatch]);

  /**
   * Previous implementation using local state (commented out)
   * 
   * This code was replaced with Redux implementation above.
   * It's kept as a reference to show the transition from local state
   * to Redux for state management.
   */
  // const [products, setProducts] = useState([]);
  // const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   // Fetch product data from the API
  //   const fetchProducts = async () => {
  //     try {
  //       const response = await fetch(
  //         "https://api.escuelajs.co/api/v1/products"
  //       );
  //       const data = await response.json();
  //       setProducts(data);
  //       setLoading(false);
  //     } catch (error) {
  //       console.error("Error fetching products:", error);
  //       setLoading(false);
  //     }
  //   };

  //   fetchProducts();
  // }, []);

  /**
   * Conditional rendering for loading state
   * 
   * If products are still loading, display skeleton UI
   * This provides a better user experience than showing nothing
   * or an empty page while waiting for data
   */
  if (loading) {
    return (
      <div className="flex flex-col min-h-screen">
        <main className="flex-grow">
          {/* Skeleton for carousel section */}
          <section className="w-full h-full bg-gray-200">
            <div className="container mx-auto p-4">
              {/* Animated pulse effect for loading state */}
              <div className="h-[400px] bg-gray-300 animate-pulse rounded-lg"></div>
            </div>
          </section>

          {/* Skeleton for featured products section */}
          <div className="bg-accent p-2 rounded-lg shadow-accent">
            <section className="mx-auto py-8 container">
              <h2 className="text-2xl font-bold mb-4">Featured Products</h2>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 container">
                {/* Generate 8 skeleton cards to match the layout */}
                {Array(8)
                  .fill(0)
                  .map((_, index) => (
                    <SkeletonCard key={index} />
                  ))}
              </div>
            </section>
          </div>
        </main>
      </div>
    );
  }

  /**
   * Main render of the Home page
   * 
   * This is rendered once products have been loaded
   */
  return (
    <div className="flex flex-col min-h-screen ">
      {/* Main content container with flex-grow to fill available space */}
      <main className="flex-grow">
        {/* Carousel section with featured products */}
        <section className="w-full h-full bg-gray-200 ">
          <div className="container mx-auto p-4">
            {/* Carousel component from UI library */}
            <Carousel>
              <CarouselContent>
                {/* Take first 9 products for the carousel */}
                {products.slice(0, 9).map((product) => (
                  <CarouselItem key={product.id} className="basis-1/3">
                    <div className="relative w-full h-full ">
                      {/* Product image container with fixed height */}
                      <div className="overflow-hidden h-[400px] rounded-lg shadow-lg p-2 mb-2">
                        <img
                          src={product.images}
                          alt={product}
                          className="w-full h-full object-fill rounded-lg"
                        />
                      </div>
                      {/* Overlay with product information */}
                      <div className="absolute bottom-4 left-4 right-4 text-popover-foreground rounded">
                        <h2 className="text-xl font-bold ">{product.title}</h2>
                        <p className="text-sm font-bold">${product.price}</p>
                      </div>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
          </div>
        </section>

        {/* Featured products grid section */}
        <div className="bg-accent p-2 rounded-lg shadow-accent">
          <section className="mx-auto py-8 container">
            <h2 className="text-2xl font-bold mb-4">Featured Products</h2>
            {/* Responsive grid layout - 1 column on mobile, 4 columns on medium screens and up */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 container">
              {/* Take first 8 products for the featured section */}
              {products.slice(0, 8).map((product) => (
                <ProductItem
                  key={product.id}
                  imageUrl={product.images}
                  title={product.title}
                  // Truncate description to 100 characters to maintain consistent card height
                  description={product.description.substring(0, 100)}
                  price={product.price}
                  // Handler for adding product to cart
                  onAddToCart={() => {
                    // Log for debugging
                    console.log("Adding product to cart:", product);
                    // Dispatch action to add product to cart
                    dispatch(addToCart(product));
                    // Show success notification to user
                    toast.success("Item added to cart!");
                  }}
                />
              ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default Home;