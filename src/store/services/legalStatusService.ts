import { LegalStatus, LegalStatusResponse } from "../types/legalStatus";
import { ApiResponse } from "../types/ApiResponse";
import axiosClient from "../../api/axiosClient";

export const fetchLegalStatuses = async (
  registrationTypeId: number
): Promise<LegalStatus[]> => {
  const response = await axiosClient.get<ApiResponse<LegalStatusResponse>>(
    `/legal-status/investment/registration-type/${registrationTypeId}`
  );
  return response.data.data.legal_statuses;
};
