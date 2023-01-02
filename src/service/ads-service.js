import { sendAndHandleInvalidRequest } from "@/utils/api";

export default class AdService {
  static async gets(payload) {
    const params = new URLSearchParams(payload);
    return sendAndHandleInvalidRequest(`/api/ads?${params.toString()}`);
  }

  static async create(payload) {
    return sendAndHandleInvalidRequest("/api/ads", "post", payload);
  }

  static async get(id) {
    return sendAndHandleInvalidRequest(`/api/ads/${id}`);
  }

  static async update(id, payload) {
    return sendAndHandleInvalidRequest(`/api/ads/${id}`, "put", payload);
  }

  static async delete(id) {
    return sendAndHandleInvalidRequest(`/api/ads/${id}`, "delete");
  }
}
