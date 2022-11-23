import { sendAndHandleInvalidRequest } from "@/utils/api";

export default class TeamService {
  static async gets(payload) {
    const params = new URLSearchParams(payload);
    return sendAndHandleInvalidRequest(`/api/teams?${params.toString()}`);
  }

  static async create(payload) {
    return sendAndHandleInvalidRequest("/api/teams", "post", payload);
  }

  static async get(id) {
    return sendAndHandleInvalidRequest(`/api/teams/${id}`);
  }

  static async update(id, payload) {
    return sendAndHandleInvalidRequest(`/api/teams/${id}`, "put", payload);
  }

  static async delete(id) {
    return sendAndHandleInvalidRequest(`/api/teams/${id}`, "delete");
  }
}
