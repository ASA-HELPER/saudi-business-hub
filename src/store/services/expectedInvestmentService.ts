import { ApiResponse } from "../types/ApiResponse";
import { ExpectedInvestment } from "../types/ExpectedInvestment";
import axiosClient from "../../api/axiosClient";

export const fetchExpectedInvestmentsApi = async (): Promise<
  ApiResponse<ExpectedInvestment[]>
> => {
  const response = await axiosClient.get<ApiResponse<ExpectedInvestment[]>>(
    "/expected-investments"
  );
  return response.data;
};
