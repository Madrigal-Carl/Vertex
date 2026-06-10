import api from "@/api/axios";

export async function getFeaturedProducts() {
  const response = await api.get("/products/featured");

  return response.data.products;
}

export async function getPopularProducts() {
  const response = await api.get("/products/popular");

  return response.data.products;
}

export async function getProductById(id) {
  const response = await api.get(`/products/${id}`);

  return response.data.product;
}

export async function getProducts({
  page = 1,
  limit = 10,
  category,
  search,
  paginate = true,
}) {
  const response = await api.get("/products", {
    params: {
      page,
      limit,
      paginate,
      category:
        category === "All"
          ? undefined
          : category,
      search,
    },
  });

  return response.data;
}
