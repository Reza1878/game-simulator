import { sendAndHandleInvalidRequest } from "@/utils/api";

export default class HeroService {
  static async gets(payload) {
    const params = new URLSearchParams(payload);
    return sendAndHandleInvalidRequest(`/api/heroes?${params.toString()}`);
  }

  static async create(payload) {
    return sendAndHandleInvalidRequest("/api/heroes", "post", payload);
  }

  static async get(id) {
    return sendAndHandleInvalidRequest(`/api/heroes/${id}`);
  }

  static async update(id, payload) {
    return sendAndHandleInvalidRequest(`/api/heroes/${id}`, "put", payload);
  }

  static async delete(id) {
    return sendAndHandleInvalidRequest(`/api/heroes/${id}`, "delete");
  }
}
