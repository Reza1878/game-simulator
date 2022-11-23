import { sendAndHandleInvalidRequest } from "@/utils/api";

export default class BanAmountService {
  static async gets(payload) {
    const params = new URLSearchParams(payload);
    return sendAndHandleInvalidRequest(
      `/api/simulator-ban-options?${params.toString()}`
    );
  }

  static async create(payload) {
    return sendAndHandleInvalidRequest(
      "/api/simulator-ban-options",
      "post",
      payload
    );
  }

  static async get(id) {
    return sendAndHandleInvalidRequest(`/api/simulator-ban-options/${id}`);
  }

  static async update(id, payload) {
    return sendAndHandleInvalidRequest(
      `/api/simulator-ban-options/${id}`,
      "put",
      payload
    );
  }

  static async delete(id) {
    return sendAndHandleInvalidRequest(
      `/api/simulator-ban-options/${id}`,
      "delete"
    );
  }
}
