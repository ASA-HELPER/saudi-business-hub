import axiosClient from "../../api/axiosClient";
import { RegistrationType } from "../types/registrationTypes";

export const getRegistrationTypes = async (): Promise<RegistrationType[]> => {
  try {
    const response = await axiosClient.get("/investment/registration-types");
    return response.data.data; // Assuming your API returns data in a 'data' field
  } catch (error) {
    throw error;
  }
};
