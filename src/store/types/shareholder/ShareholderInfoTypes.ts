// Base reusable country type
export interface Country {
  id: number;
  code: string;
  name: string;
  phone_prefix: number;
  blacklisted: boolean;
  is_share_holder_check?: boolean;
  nationality?: string | null;
}

// Base reusable title type
export interface Title {
  id: number;
  token: string;
  identifier: string;
}

// ----------- PERSON SHAREHOLDER -----------
export interface PersonShareholder {
  id: number;
  current_nationality_id: number;
  previous_nationality_id: number;
  country_id: number;
  telephone_country_code_id: number;
  mobile_country_code_id: number;
  shareholder_id: number;
  shareholder_title: number;
  academic_title: string | null;
  first_name_arabic: string;
  last_name_arabic: string;
  full_name: string;
  passport_number: string;
  person_shareholder_city: string;
  po_box: string | null;
  postal_code: string | null;
  email: string;
  mofa_number: string | null;
  mobile_number: string;
  telephone_number: string | null;
  date_of_birth: string; // ISO date
  passport_issue_date: string; // ISO date
  passport_expiry_date: string; // ISO date
  professional_license: boolean;
  is_mofa_number_verified: boolean;
  premium_resident: boolean;
  active: boolean | number;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  passport_id_copy: string;
  professional_license_certificate: string;
  other: string;
  country: Country;
  title: Title;
  share_holder_id_type_id: number;
  place_of_birth: string;
}

// ----------- ORGANIZATION SHAREHOLDER -----------
export interface OrganizationShareholder {
  id: number;
  legal_status_id: number;
  parent_company_country_id: number;
  country_of_reg_id: number;
  company_country_id: number;
  telephone_country_code_id: number;
  mobile_country_code_id: number;
  shareholder_id: number;
  organization_name: string;
  organization_name_arabic: string;
  company_reg_number: string;
  capital: string;
  parent_company_name: string;
  organization_shareholder_city: string;
  address: string;
  po_box: string;
  postal_code: string;
  email: string;
  website: string;
  mofa_number: string;
  years_established_in_country_of_origin: string;
  mobile_number: string;
  telephone_number: string;
  section: string;
  division: string;
  is_mofa_number_verified: boolean;
  professional_license: boolean;
  multinational_company: boolean;
  active: boolean;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  professional_license_certificate: string;
  optional_attachment1_media: string;
  optional_attachment2_media: string;
  commercial_reg_copy: string;
  last_year_fin_statement: string;
  company_memo_association: string;
  country: Country;
}

// ----------- EXISTING SHAREHOLDER -----------
export interface ExistingShareholder {
  id: number;
  shareholder_id: number;
  parent_company_country_id: number;
  shareholder_entity_number: string;
  shareholder_name: string;
  professional_license: boolean;
  active: boolean;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  commercial_registration: string;
  last_budget: string;
  professional_license_certificate: string;
  country: Country;
}
