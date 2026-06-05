import api from "@/api/axios";

export async function createOrder(data) {
  const res = await api.post("/orders", data);

  return res.data;
}
