import { sendAndHandleInvalidRequest } from "@/utils/api";

export default class MapService {
  static async gets() {
    return sendAndHandleInvalidRequest("/api/maps");
  }

  static async create(payload) {
    return sendAndHandleInvalidRequest("/api/maps", "post", payload);
  }
}
