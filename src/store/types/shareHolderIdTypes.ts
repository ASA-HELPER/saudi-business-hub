export interface ShareholderIdType {
  id: number;
  name: string;
  active: number;
}

export interface ShareholderIdTypeState {
  data: ShareholderIdType[];
  loading: boolean;
  error: string | null;
}
