import { sendAndHandleInvalidRequest } from "@/utils/api";

export default class ContactUsService {
  static async sendMail(payload) {
    return sendAndHandleInvalidRequest("/api/contact-us", "post", payload);
  }
}
