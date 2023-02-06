import { sendAndHandleInvalidRequest } from "@/utils/api";
import axios from "axios";

export default class AuthService {
  static async login({ email, password }) {
    const response = await axios.post("/api/auth/login", { email, password });
    return response.data;
  }

  static async register({ email, name, password }) {
    const response = await axios.post("/api/auth/register", {
      email,
      name,
      password,
    });
    return response.data;
  }

  static async forgotPassword({ email }) {
    const response = await axios.post("/api/auth/forgot-password", { email });
    return response.data;
  }

  static async verifyForgotPasswordToken(token) {
    const response = await axios.post(
      "/api/auth/validate-forgot-password-token",
      { token }
    );
    return response.data;
  }

  static async resetPassword(payload) {
    const response = await axios.post("/api/auth/reset-password", payload);
    return response.data;
  }

  static async refreshToken() {
    const refreshToken = localStorage.getItem("refreshToken");
    const response = await axios.post("/api/auth/refresh-token", {
      refresh_token: refreshToken,
    });
    return response.data;
  }

  static async logout() {
    const refreshToken = localStorage.getItem("refreshToken");

    return sendAndHandleInvalidRequest("/api/auth/logout", "post", {
      refresh_token: refreshToken,
    });
  }
}
