import { ApiResponse } from "../types/ApiResponse";
import { ContactPerson } from "../types/contactPersonListTypes";
import axiosClient from "../../api/axiosClient";

export const fetchShareholderPersonsApi = async (
  customerId: number
): Promise<ApiResponse<ContactPerson[]>> => {
  const response = await axiosClient.get<ApiResponse<ContactPerson[]>>(
    `https://eservices.deenzprojects.com/backoffice/api/investment/registration/shareholder/customer/${customerId}`
  );
  return response.data;
};
