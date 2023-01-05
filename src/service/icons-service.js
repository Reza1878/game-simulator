import { sendAndHandleInvalidRequest } from "@/utils/api";

export default class IconsService {
  static async gets(payload) {
    const params = new URLSearchParams(payload);
    return sendAndHandleInvalidRequest(`/api/icons?${params.toString()}`);
  }

  static async create(payload) {
    return sendAndHandleInvalidRequest("/api/icons", "post", payload);
  }

  static async get(id) {
    return sendAndHandleInvalidRequest(`/api/icons/${id}`);
  }

  static async update(id, payload) {
    return sendAndHandleInvalidRequest(`/api/icons/${id}`, "put", payload);
  }

  static async delete(id) {
    return sendAndHandleInvalidRequest(`/api/icons/${id}`, "delete");
  }
}
