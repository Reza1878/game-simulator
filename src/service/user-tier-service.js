import { sendAndHandleInvalidRequest } from "@/utils/api";

export default class UserTierService {
  static async gets(payload) {
    const params = new URLSearchParams(payload);
    return sendAndHandleInvalidRequest(`/api/user-tiers?${params.toString()}`);
  }

  static async create(payload) {
    return sendAndHandleInvalidRequest("/api/user-tiers", "post", payload);
  }

  static async get(id) {
    return sendAndHandleInvalidRequest(`/api/user-tiers/${id}`);
  }

  static async update(id, payload) {
    return sendAndHandleInvalidRequest(`/api/user-tiers/${id}`, "put", payload);
  }

  static async delete(id) {
    return sendAndHandleInvalidRequest(`/api/user-tiers/${id}`, "delete");
  }
}
