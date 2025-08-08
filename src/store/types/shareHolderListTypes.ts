export interface Shareholder {
  id: number;
  customer_id: number;
  share_holder_type_id: number;
  share_holder_id_type_id: number;
  shares_percentage: string;
  type: string;
  nationality: string;
  legal_status: string;
  full_name: string;
  place_of_birth: string;
  share_holder_type: {
    id: number;
    name: string;
  };
  share_holder_id_type: {
    id: number;
    name: string;
  };
  existing_shareholders: ExistingShareholder[];
}

export interface ExistingShareholder {
  id: number;
  shareholder_name: string;
  shareholder_entity_number: string;
  commercial_registration: string;
  last_budget: string;
  professional_license_certificate: string;
}

export interface ShareholderState {
  loading: boolean;
  data: Shareholder[];
  error: string | null;
}
