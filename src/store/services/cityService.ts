import { City } from "../types/cityTypes";
import axiosClient from "../../api/axiosClient";

export interface ApiResponse {
  success: boolean;
  message: string;
  data: City[];
}

export const fetchCitiesApi = async (): Promise<ApiResponse> => {
  const response = await axiosClient.get<ApiResponse>("/cities");
  return response.data;
};
