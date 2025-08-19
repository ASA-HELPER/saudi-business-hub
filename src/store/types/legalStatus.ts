export interface LegalStatus {
  id: number;
  code: string;
  name: string;
  name_en: string;
  name_ar: string;
  investment_registration_type_id: number;
  is_active: number;
  created_at: string | null;
  updated_at: string | null;
  deleted_at: string | null;
}

export interface LegalStatusResponse {
  id: number;
  code: string;
  name: string;
  active: number;
  created_at: string | null;
  updated_at: string | null;
  deleted_at: string | null;
  legal_statuses: LegalStatus[];
}
