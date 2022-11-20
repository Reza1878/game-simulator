import { axiosInstance } from "../config/constants";

export async function sendAndHandleInvalidRequest(
  uri,
  method = "get",
  payload = {}
) {
  const response = await axiosInstance[method](uri, payload);

  return response.data;
}
