import { Sector } from "../types/sectorTypes";
import axiosClient from "../../api/axiosClient";

export interface ApiResponse {
  success: boolean;
  message: string;
  data: Sector[];
}

export const fetchSectors = async (): Promise<ApiResponse> => {
  const response = await axiosClient.get<ApiResponse>("/sectors");
  return response.data;
};
