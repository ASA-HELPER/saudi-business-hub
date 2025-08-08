import axiosClient from "../../api/axiosClient";
import { Country } from "../types/countryTypes";

interface ApiResponse {
  success: boolean;
  message: string;
  data: Country[];
}

export const fetchCountries = async (): Promise<ApiResponse> => {
  const response = await axiosClient.get<ApiResponse>("/countries");
  return response.data;
};
