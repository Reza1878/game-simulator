import { sendAndHandleInvalidRequest } from "@/utils/api";

export default class SettingService {
  static async gets(payload) {
    const params = new URLSearchParams(payload);
    return sendAndHandleInvalidRequest(`/api/settings?${params.toString()}`);
  }

  static async update(payload) {
    return sendAndHandleInvalidRequest(`/api/settings`, "put", payload);
  }
}
