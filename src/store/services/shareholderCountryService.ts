import axiosClient from "../../api/axiosClient";
import { Country } from "../types/countryTypes";

interface ApiResponse {
  success: boolean;
  message: string;
  data: Country[];
}

export const fetchShareholderCountries = async (): Promise<ApiResponse> => {
  const response = await axiosClient.get<ApiResponse>(
    "/investment/registration/shareholder/countries"
  );
  return response.data;
};
