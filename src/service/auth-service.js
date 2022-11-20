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
}
