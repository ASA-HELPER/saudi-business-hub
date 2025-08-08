export interface DeleteContactPersonResponse {
  success: boolean;
  message: string;
}

export interface DeleteContactPersonState {
  loading: boolean;
  success: boolean;
  error: string | null;
}
