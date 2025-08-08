import axiosClient from "../../api/axiosClient";

export const sendRegisterMailOtp = async (email: string) => {
  const response = await axiosClient.post("/send-register-mail-otp", { email });
  return response.data;
};

export const verifyRegisterMailOtp = async (payload: {
  token: string;
  otp: string;
  purpose: string;
}) => {
  const response = await axiosClient.post("/verify-register-mail-otp", payload);
  return response.data;
};
