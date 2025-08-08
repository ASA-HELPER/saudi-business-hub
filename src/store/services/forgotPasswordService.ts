import axiosClient from "../../api/axiosClient";

export const forgotPassword = async (email: string) => {
  const response = await axiosClient.post("/forgot-password", {
    email,
  });
  return response.data;
};
