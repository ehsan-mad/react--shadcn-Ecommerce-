import React, { useEffect, useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "../components/ui/carousel";
import ProductItem from "@/components/commerce-ui/product-cards-01";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch product data from the API
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          "https://api.escuelajs.co/api/v1/products"
        );
        const data = await response.json();
        setProducts(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col min-h-screen ">
      {/* Main content container */}
      <main className="flex-grow">
        {/* Carousel section with fixed height */}
        <section className="w-full h-full bg-gray-200 ">
          <div className="container mx-auto p-4">
            <Carousel>
              <CarouselContent>
                {products.slice(0, 9).map((product) => (
                  <CarouselItem key={product.id} className="basis-1/3">
                    <div className="relative w-full h-full ">
                      <div className="overflow-hidden h-[400px] rounded-lg shadow-lg p-2 mb-2">
                        <img
                          src={product.images}
                          alt={product}
                          className="w-full h-full object-fill rounded-lg"
                        />
                      </div>
                      <div className="absolute bottom-4 left-4 right-4 text-popover-foreground   rounded">
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

        {/* Additional product sections can go here */}
        <div className="bg-accent p-2 rounded-lg shadow-accent">
          <section className=" mx-auto py-8 container">
            <h2 className="text-2xl font-bold mb-4">Featured Products</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 container">
              {products.slice(0, 8).map((product) => (
                <ProductItem
                  key={product.id}
                  imageUrl={product.images}
                  title={product.title}
                  description={product.description.substring(0, 100)}
                  price={product.price}
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
