import React from "react";
import { SiteHeader } from "@/components/site-header";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Sheet, SheetTrigger } from "@/components/ui/sheet";
import ProductDataTable from "@/components/ProductDataTable";
import { useQuery } from "@tanstack/react-query";
import { getAllProducts } from "../../api/products";
import CreateProduct from "@/components/create-product";

const Products = () => {
  const productsQuery = useQuery({
    queryKey: ["products"],
    queryFn: () => getAllProducts(),
  });

  if (productsQuery.isError) return <p>Error: {productsQuery.error.message}</p>;

  if (productsQuery.isLoading || !productsQuery.data) return <p>Loading...</p>;

  return (
    <Sheet>
      <SiteHeader title="Products" />

      <h3 className="font-bold">Product List</h3>

      <div className="flex justify-between items-center mb-5">
        <SheetTrigger asChild>
          <Button variant="default">
            <Plus className="mr-2 h-4 w-4" /> New Product
          </Button>
        </SheetTrigger>
      </div>

      <ProductDataTable products={productsQuery.data} />

      <CreateProduct />
    </Sheet>
  );
};

export default Products;
