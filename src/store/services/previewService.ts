// services/previewService.ts

import axiosClient from "../../api/axiosClient";
import { PreviewApiResponse } from "../types/previewTypes";

export const fetchPreviewData = async (): Promise<PreviewApiResponse["data"]> => {
  const response = await axiosClient.get<PreviewApiResponse>("/investment/registration/review");
  return response.data.data;
};
