import axiosClient from "../../api/axiosClient";

export const loginOtpUser = async (payload: {
  username: string;
  password: string;
}) => {
  const response = await axiosClient.post("/verify-login-otp", payload, {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });
  console.log(response.data);

  return response.data;
};
