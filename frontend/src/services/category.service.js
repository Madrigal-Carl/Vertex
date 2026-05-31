import api from "@/api/axios";

export async function getCategories() {
  const res = await api.get("/categories");

  return res.data.categories;
}
