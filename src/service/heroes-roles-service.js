import { sendAndHandleInvalidRequest } from "@/utils/api";

export default class HeroesRoleService {
  static async gets(payload) {
    const params = new URLSearchParams(payload);
    return sendAndHandleInvalidRequest(
      `/api/heroes-roles?${params.toString()}`
    );
  }

  static async create(payload) {
    return sendAndHandleInvalidRequest("/api/heroes-roles", "post", payload);
  }

  static async get(id) {
    return sendAndHandleInvalidRequest(`/api/heroes-roles/${id}`);
  }

  static async update(id, payload) {
    return sendAndHandleInvalidRequest(
      `/api/heroes-roles/${id}`,
      "put",
      payload
    );
  }

  static async delete(id) {
    return sendAndHandleInvalidRequest(`/api/heroes-roles/${id}`, "delete");
  }
}
