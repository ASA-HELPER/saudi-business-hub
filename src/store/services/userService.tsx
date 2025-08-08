import axiosClient from "../../api/axiosClient";
export const loginUser = (data: { email: string; password: string }) =>
  axiosClient.post("/auth/login", data);
