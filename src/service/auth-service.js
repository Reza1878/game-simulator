import { sendAndHandleInvalidRequest } from "@/utils/api";
import axios from "axios";

export default class AuthService {
  static async login({ email, password }) {
    return sendAndHandleInvalidRequest("/api/auth/login", "post", {
      email,
      password,
    });
  }

  static async register({ email, name, password }) {
    return sendAndHandleInvalidRequest("/api/auth/register", "post", {
      email,
      name,
      password,
    });
  }

  static async forgotPassword({ email }) {
    return sendAndHandleInvalidRequest("/api/auth/forgot-password", { email });
  }

  static async verifyForgotPasswordToken(token) {
    return sendAndHandleInvalidRequest(
      "/api/auth/validate-forgot-password-token",
      { token }
    );
  }

  static async resetPassword(payload) {
    return sendAndHandleInvalidRequest(
      "/api/auth/reset-password",
      "post",
      payload
    );
  }

  static async refreshToken() {
    const refreshToken = localStorage.getItem("refreshToken");
    return sendAndHandleInvalidRequest("/api/auth/refresh-token", "post", {
      refresh_token: refreshToken,
    });
  }

  static async logout() {
    const refreshToken = localStorage.getItem("refreshToken");

    return sendAndHandleInvalidRequest("/api/auth/logout", "post", {
      refresh_token: refreshToken,
    });
  }
}
