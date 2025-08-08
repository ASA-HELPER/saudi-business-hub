import axiosClient from "../../api/axiosClient";
import { ApiResponse } from "../types/ApiResponse";
import { Shareholder } from "../types/shareHolderListTypes";

export const fetchShareholders = async (): Promise<
  ApiResponse<Shareholder[]>
> => {
  const response = await axiosClient.get<ApiResponse<Shareholder[]>>(
    "/investment/registration/shareholder"
  );
  return response.data;
};
