import axiosClient from "../../api/axiosClient";
import { DeleteAttachmentResponse } from "../types/deleteAttachmentTypes";

export const deleteAttachment = async (mediaId: number): Promise<DeleteAttachmentResponse> => {
  const response = await axiosClient.delete(`/media/${mediaId}`);
  return response.data;
};
