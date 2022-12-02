import { sendAndHandleInvalidRequest } from "@/utils/api";

export default class UserService {
  static async gets(payload = {}) {
    const params = new URLSearchParams(payload).toString();

    return sendAndHandleInvalidRequest(`/api/users?${params}`);
  }
}
