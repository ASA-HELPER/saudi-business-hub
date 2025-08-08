import axiosClient from "../../api/axiosClient";
import { EntityInformation } from "../types/getEntityList";

interface ApiResponse {
  success: boolean;
  message: string;
  data: EntityInformation[];
}

export const getEntityListInformation = async (): Promise<ApiResponse> => {
  const response = await axiosClient.get("/investment/registration/entity");
  return response.data.data;
};
