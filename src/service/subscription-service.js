import { sendAndHandleInvalidRequest } from "@/utils/api";

export default class SubscriptionService {
  static async create(payload) {
    return sendAndHandleInvalidRequest("/api/subscriptions", "post", payload);
  }
}
