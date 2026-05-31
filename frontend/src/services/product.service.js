import api from "@/api/axios";

export async function getFeaturedProducts() {
  const response = await api.get("/products/featured");

  return response.data.products;
}

export async function getPopularProducts() {
  const response = await api.get("/products/popular");

  return response.data.products;
}

export async function getProducts({ page, limit, category, search }) {
  const response = await api.get("/products", {
    params: {
      page,
      limit,
      category: category === "All" ? "" : category,
      search,
    },
  });

  return response.data;
}
