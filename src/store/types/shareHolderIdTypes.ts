export interface ShareholderIdType {
  id: number;
  name: string;
  name_ar: string;
  name_en: string;
  active: number;
}

export interface ShareholderIdTypeState {
  data: ShareholderIdType[];
  loading: boolean;
  error: string | null;
}
