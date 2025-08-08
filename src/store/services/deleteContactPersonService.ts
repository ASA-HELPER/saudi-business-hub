import axios from "axios";
import { DeleteContactPersonResponse } from "../types/deleteContactPersonTypes";
import axiosClient from "../../api/axiosClient";

export const deleteContactPerson = async (
  id: number
): Promise<DeleteContactPersonResponse> => {
  const response = await axiosClient.delete(
    `/investment/registration/contact-person/${id}`
  );
  return response.data;
};
