/**
 * Collection Page Component
 * 
 * This component displays a collection of products with filtering and pagination capabilities.
 * It integrates React Query for data fetching, React Hook Form for form state management,
 * and Redux for cart functionality.
 */

// React core import for component creation
import React from "react";
// Redux hook to dispatch actions to the store
import { useDispatch } from "react-redux";
// Toast notifications for user feedback
import { toast } from "react-toastify";
// Custom breadcrumb navigation component
import BreadcrumbWithCustomSeparator from "../components/breadcrumb";
// UI button component from shadcn/ui library
import { Button } from "@/components/ui/button";
// Product card component to display individual products
import ProductItem from "@/components/commerce-ui/product-cards-01";
// Sheet components for the filter sidebar
import { Sheet, SheetTrigger } from "@/components/ui/sheet";
// Custom filter sidebar component
import FilterSideBar from "../components/commerce-ui/filter-sidebar";
// React Query hook for data fetching with caching and state management
import { useQuery } from "@tanstack/react-query";
// API function to fetch products from the backend
import { getProducts } from "../api/products";
// Loading skeleton component for products
import { SkeletonCard } from "../components/commerce-ui/ProductSkeleton";
// Pagination component for navigating through product pages
import ProductPagination from "@/components/commerce-ui/product-pagination";
// React Hook Form for managing form state
import { useForm } from "react-hook-form";
// Zod resolver for form validation
import { zodResolver } from "@hookform/resolvers/zod";
// Zod library for schema validation
import { z } from "zod";
// Redux action to add items to the cart
import { addToCart } from "../states/slices/cartSlice";

/**
 * Static category data for filtering products
 * In a real application, this would likely come from an API
 */
const categories = [
  { id: 1, name: "Electronics" },
  { id: 2, name: "Fashion" },
  { id: 3, name: "Home & Kitchen" },
  { id: 4, name: "Sports" },
];

/**
 * Number of products to display per page
 * This controls the pagination and how many products are fetched at once
 */
const limit = 9;

/**
 * Zod schema for form validation
 * Defines the structure and types for the filter form:
 * - title: Optional search string
 * - offset: Required number for pagination
 * - categoryId: Optional number for category filtering
 */
const schema = z.object({
  title: z.string().optional(),
  offset: z.number(),
  categoryId: z.number().optional(),
});

/**
 * Collection component - Main product listing page
 * 
 * This component:
 * 1. Sets up form state for filtering
 * 2. Fetches products based on filter criteria
 * 3. Renders product grid with pagination
 * 4. Handles adding products to cart
 */
const Collection = () => {
  // Get the dispatch function to send actions to Redux
  const dispatch = useDispatch();
  
  /**
   * Initialize React Hook Form with zod validation
   * 
   * - resolver: Uses zod schema to validate form inputs
   * - defaultValues: Sets initial values for the form fields
   */
  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      title: "",         // Empty search term initially
      offset: 0,         // Start at the first page (offset 0)
      categoryId: undefined,  // No category filter initially
    },
  });

  /**
   * Extract form values using watch
   * This allows us to react to changes in form values
   */
  const { title, offset, categoryId } = form.watch();

  // Debug log to track form state changes
  console.log("hook form state", title, offset, categoryId);

  /**
   * Set up React Query to fetch products
   * 
   * - queryKey: Array of dependencies that trigger refetch when changed
   * - queryFn: Function that fetches data from the API
   * 
   * This query will automatically refetch when title, offset, or categoryId change
   */
  const productsQuery = useQuery({
    queryKey: ["products", title, offset, categoryId],
    queryFn: () => getProducts(title, offset, categoryId, limit),
  });

  /**
   * Handler for adding a product to the cart
   * 
   * @param {Object} product - The product to add to the cart
   * 
   * This function:
   * 1. Dispatches the addToCart action to Redux
   * 2. Shows a success toast notification to the user
   */
  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
    toast.success("Item added to cart!");
  };

  /**
   * Loading state handler
   * 
   * If we don't have product data yet, show a loading screen
   * This prevents rendering the page with incomplete data
   */
  if (!productsQuery?.data?.totalItems) {
    return (
      <div className="flex justify-center items-center h-screen">
        <h1 className="text-3xl font-bold">Loading Products...</h1>
      </div>
    );
  }

  /**
   * Main render of the Collection page
   * 
   * The Sheet component wraps the entire page to enable the filter sidebar
   */
  return (
    <Sheet>
      <div className="w-full p-2 rounded-lg shadow-accent bg-accent">
        {/* Breadcrumb navigation showing the current page location */}
        <BreadcrumbWithCustomSeparator
          items={[{ name: "Collections", path: "/collections" }]}
          className=" flex items-center justify-center"
        />

        {/* Filtering Section with trigger button and sidebar */}
        <div className="flex justify-between items-center p-4 bg-gray-100 border-t">
          {/* Button that triggers the filter sidebar to open */}
          <SheetTrigger asChild>
            <Button variant="outline">Open</Button>
          </SheetTrigger>

          {/* Filter sidebar component with categories and form state */}
          <FilterSideBar categories={categories} form={form} />
        </div>
        {/** End of Filtering Section */}

        {/* Product Grid - Responsive layout with different columns based on screen size */}
        <div className="grid grid-cols-1 gap-4 p-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mx-auto w-full container ">
          {/* Show skeleton cards when loading */}
          {productsQuery.isLoading && (
            <div>
              {/* Create an array of skeleton cards based on the limit */}
              {Array.from({ length: limit }, (_, index) => (
                <SkeletonCard key={index} />
              ))}
            </div>
          )}
          
          {/* Map through products and render product cards */}
          {productsQuery.data?.products?.map((product, index) => (
            <ProductItem
              key={index}
              imageUrl={product.images[0]}  // Use first image as the main image
              title={product.title || `Product ${index + 1}`}  // Fallback title if missing
              description={product.description.substring(0, 100)}  // Truncate description
              price={product.price}
              onAddToCart={() => handleAddToCart(product)}  // Add to cart handler
              product={product}  // Pass the full product object
            />
          ))}
        </div>

        {/* Pagination Component */}
        <ProductPagination
          offset={offset}  // Current page offset
          setValue={form.setValue}  // Function to update form values
          limit={limit}  // Items per page
          total={productsQuery?.data?.totalItems}  // Total number of products
        />
      </div>
    </Sheet>
  );
};

export default Collection;