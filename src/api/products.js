// endpoint for pagination => https://api.escuelajs.co/api/v1/products?offset=0&limit=10
// filtering => https://api.escuelajs.co/api/v1/products/?title=Generic&price_min=900&price_max=1000&categoryId=1
// endpoint for all products => https://api.escuelajs.co/api/v1/products
export const getProducts = async (
  title = "",
  offset = 0,
  categoryId = undefined,
  limit = 8,
  price_min = 0,
  price_max = Infinity
) => {
  let url = `https://api.escuelajs.co/api/v1/products/?limit=${limit}&offset=${offset}&title=${title}&price_min=${price_min}&price_max=${price_max}`;

  if (categoryId) {
    url = `https://api.escuelajs.co/api/v1/products/?limit=${limit}&offset=${offset}&title=${title}&price_min=${price_min}&price_max=${price_max}&categoryId=${categoryId}`;
  }

  console.log("url--->", url);

  const totalProductRes = await fetch(
    "https://api.escuelajs.co/api/v1/products"
  );
  const totalProducts = await totalProductRes.json();

  const totalItems = totalProducts?.length || 0;

  const producutsRes = await fetch(url);

  const products = await producutsRes.json();

  return {
    products,
    totalItems,
  };
};

// get all products
export const getAllProducts = async () => {
  const productsRes = await fetch("https://api.escuelajs.co/api/v1/products");
  const products = await productsRes.json();
  return products;
};

// create a product
export const createProduct = async (product) => {
  const res = await fetch("https://api.escuelajs.co/api/v1/products", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(product),
  });
  return res.json();
};

// update a product
export const updateProduct = async (product) => {
  console.log("product", product);
  const res = await fetch(
    `https://api.escuelajs.co/api/v1/products/${product.id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(product),
    }
  );

  return res.json();
};

// delete a product
export const deleteProduct = async (id) => {
  const res = await fetch(`https://api.escuelajs.co/api/v1/products/${id}`, {
    method: "DELETE",
  });
  return res.json();
};
