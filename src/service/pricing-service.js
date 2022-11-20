import { sendAndHandleInvalidRequest } from "@/utils/api";

export default class PricingService {
  static async gets(payload) {
    const params = new URLSearchParams(payload);
    return sendAndHandleInvalidRequest(`/api/pricings?${params.toString()}`);
  }

  static async create(payload) {
    return sendAndHandleInvalidRequest("/api/pricings", "post", payload);
  }

  static async get(id) {
    return sendAndHandleInvalidRequest(`/api/pricings/${id}`);
  }

  static async update(id, payload) {
    return sendAndHandleInvalidRequest(`/api/pricings/${id}`, "put", payload);
  }

  static async delete(id) {
    return sendAndHandleInvalidRequest(`/api/pricings/${id}`, "delete");
  }
}
