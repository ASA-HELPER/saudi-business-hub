export const DELETE_ATTACHMENT_REQUEST = "DELETE_ATTACHMENT_REQUEST";
export const DELETE_ATTACHMENT_SUCCESS = "DELETE_ATTACHMENT_SUCCESS";
export const DELETE_ATTACHMENT_FAILURE = "DELETE_ATTACHMENT_FAILURE";

export interface DeleteAttachmentResponse {
  success: boolean;
  message: string;
}

export interface DeleteAttachmentState {
  loading: boolean;
  success: boolean;
  error: string | null;
}
