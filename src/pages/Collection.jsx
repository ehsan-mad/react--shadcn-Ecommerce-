import React from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import BreadcrumbWithCustomSeparator from "../components/breadcrumb";
import { Button } from "@/components/ui/button";
import ProductItem from "@/components/commerce-ui/product-cards-01";
import { Sheet, SheetTrigger } from "@/components/ui/sheet";
import FilterSideBar from "../components/commerce-ui/filter-sidebar";
import { useQuery } from "@tanstack/react-query";
import { getProducts } from "../api/products";
import { SkeletonCard } from "../components/commerce-ui/ProductSkeleton";
import ProductPagination from "@/components/commerce-ui/product-pagination";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { addToCart } from "../states/slices/cartSlice";

const categories = [
  { id: 1, name: "Electronics" },
  { id: 2, name: "Fashion" },
  { id: 3, name: "Home & Kitchen" },
  { id: 4, name: "Sports" },
];

const limit = 9;

const schema = z.object({
  title: z.string().optional(),
  offset: z.number(),
  categoryId: z.number().optional(),
});

const Collection = () => {
  const dispatch = useDispatch();
  
  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      title: "",
      offset: 0,
      categoryId: undefined,
    },
  });

  const { title, offset, categoryId } = form.watch();

  console.log("hook form state", title, offset, categoryId);

  // title , offset
  const productsQuery = useQuery({
    queryKey: ["products", title, offset, categoryId],
    queryFn: () => getProducts(title, offset, categoryId),
  });

  // Handle adding product to cart
  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
    toast.success("Item added to cart!");
  };

  if (!productsQuery?.data?.totalItems) {
    return (
      <div className="flex justify-center items-center h-screen">
        <h1 className="text-3xl font-bold">Loading Products...</h1>
      </div>
    );
  }

  return (
    <Sheet>
      <div className="w-full p-2 rounded-lg shadow-accent bg-accent">
        <BreadcrumbWithCustomSeparator
          items={[{ name: "Collections", path: "/collections" }]}
          className=" flex items-center justify-center"
        />

        {/* Filtering Section */}
        <div className="flex justify-between items-center p-4 bg-gray-100 border-t">
          <SheetTrigger asChild>
            <Button variant="outline">Open</Button>
          </SheetTrigger>

          <FilterSideBar categories={categories} form={form} />
        </div>
        {/** End of Filtering Section */}

        {/* Collection page content goes here */}
        <div className="grid grid-cols-1 gap-4 p-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mx-auto w-full container ">
          {productsQuery.isLoading && (
            <div>
              {Array.from({ length: limit }, (_, index) => (
                <SkeletonCard key={index} />
              ))}
            </div>
          )}
          {productsQuery.data?.products?.map((product, index) => (
            <ProductItem
              key={index}
              imageUrl={product.images[0]}
              title={product.title || `Product ${index + 1}`}
              description={product.description.substring(0, 100)}
              price={product.price}
              onAddToCart={() => handleAddToCart(product)}
              product={product}
            />
          ))}
        </div>

        {/* Pagination */}
        <ProductPagination
          offset={offset}
          setValue={form.setValue}
          limit={limit}
          total={productsQuery?.data?.totalItems}
          
        />
      </div>
    </Sheet>
  );
};

export default Collection;
