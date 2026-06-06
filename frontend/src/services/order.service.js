import api from "@/api/axios";

export async function createOrder(data, idempotencyKey) {
  const res = await api.post("/orders", data, {
    headers: {
      "Idempotency-Key": idempotencyKey,
    },
  });

  return res.data;
}
