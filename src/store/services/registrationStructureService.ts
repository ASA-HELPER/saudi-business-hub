import { StructureResponse } from "../types/businessStructure";
import axiosClient from "../../api/axiosClient";

interface ApiResponse {
  success: boolean;
  message: string;
  data: StructureResponse;
}

export const fetchStructure = async (
  registrationTypeId: number
): Promise<ApiResponse> => {
  const res = await axiosClient.get(
    `/investment/registration-types/${registrationTypeId}/structure`
  );
  return res.data;
};
