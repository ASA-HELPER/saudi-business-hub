import { RegisterPayload, RegisterResponse } from "../types/registerTypes";
import axiosClient from "../../api/axiosClient";

export const registerUser = async (
  payload: RegisterPayload
): Promise<RegisterResponse> => {
  const response = await axiosClient.post<RegisterResponse>(
    "/register",
    payload,
    {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    }
  );
  return response.data;
};
