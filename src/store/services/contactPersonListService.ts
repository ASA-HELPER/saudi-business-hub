import axiosClient from "../../api/axiosClient";
import { ApiResponse } from "../types/ApiResponse";
import { ContactPerson } from "../types/contactPersonListTypes";

export const fetchContactPersonsListApi = async (): Promise<
  ApiResponse<ContactPerson[]>
> => {
  const response = await axiosClient.get<ApiResponse<ContactPerson[]>>(
    "/investment/registration/contact-person"
  );
  return response.data;
};
