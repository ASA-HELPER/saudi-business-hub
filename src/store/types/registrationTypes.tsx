export interface RegistrationType {
  id: number;
  code: string;
  name: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface RegistrationTypeState {
  types: RegistrationType[];
  loading: boolean;
  error: string | null;
  selectedType: RegistrationType | null;
}