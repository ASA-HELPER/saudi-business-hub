import axiosClient from "../../api/axiosClient";

export const resetPassword = async (payload: {
  email: string;
  token: string;
  password: string;
  password_confirmation: string;
}) => {
  const response = await axiosClient.post("/reset-password", payload);
  return response.data;
};
