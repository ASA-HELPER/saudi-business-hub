import { Region } from "../types/regionTypes";
import axiosClient from "../../api/axiosClient";

interface ApiResponse {
  success: boolean;
  message: string;
  data: Region[];
}

export const fetchRegions = async (): Promise<ApiResponse> => {
  const response = await axiosClient.get<ApiResponse>("/regions");
  return response.data;
};
