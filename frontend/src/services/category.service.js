import api from "@/api/axios";

export async function getAllCategories() {
  const res = await api.get("/categories", {
    params: {
      paginate: false,
    },
  });

  return res.data.categories;
}

export async function getCategories({ page, limit, search }) {
  const res = await api.get("/categories", {
    params: {
      page,
      limit,
      search,
      paginate: true,
    },
  });

  return res.data;
}

export async function createCategory(data) {
  const res = await api.post("/categories", data);

  return res.data;
}

export async function updateCategory(id, data) {
  const res = await api.put(`/categories/${id}`, data);

  return res.data;
}

export async function deleteCategory(id) {
  const res = await api.delete(`/categories/${id}`);

  return res.data;
}