// types/previewTypes.ts

export const GET_PREVIEW_REQUEST = "GET_PREVIEW_REQUEST";
export const GET_PREVIEW_SUCCESS = "GET_PREVIEW_SUCCESS";
export const GET_PREVIEW_FAILURE = "GET_PREVIEW_FAILURE";

export interface Customer {
  id: number;
  first_name: string;
}

export interface Country {
  id: number;
  name: string;
}

export interface Region {
  id: number;
  name: string;
}

export interface City {
  id: number;
  name: string;
}

export interface InvestmentRegistrationType {
  id: number;
  name: string;
}

export interface LegalStatus {
  id: number;
  name: string;
}

export interface Investment {
  id: number;
  name: string;
}

export interface Activity {
  id: number;
  description: string;
  activityid: string;
  pivot: {
    entity_information_id: number;
    activity_id: number;
  };
}

export interface EntityInformation {
  id: number;
  customer_id: number;
  license_duration: string;
  entity_name: string;
  entity_name_arabic: string;
  capital: string;
  email: string | null;
  mobile_phone: string | null;
  investment_registration_type_id: number;
  legal_status_id: number;
  mobile_country_code_id: number | null;
  country_id: number;
  region_id: number;
  city_id: number;
  investment_id: number;

  board_resolution_file: string;
  letter_of_support_file: string;
  current_market_value_file: string;
  average3_year_revenue_file: string;
  last_year_asset_file: string;
  number_of_employees_file: string;
  company_ranked_in_fortune_file: string;
  entity_financial_statement_file: string;
  commercial_reg_main_entry_file: string;
  commercial_reg_branch1_file: string;
  commercial_reg_branch2_file: string;
  iqama_file: string;
  financial_statement_file: string;
  cr_certificate_file: string;
  gosi_certificate_file: string;
  no_objection_certificate_file: string;
  rhq_stock_market_attachment: string;
  rhq_entity_asset_attachment: string;
  rhq_entity_revenue_attachment: string;
  list_of_isic_attachment: string;

  investment_registration_type: InvestmentRegistrationType;
  legal_status: LegalStatus;
  mobile_country_code: MobileCountryCode | null;
  country: Country;
  region: Region;
  city: City;
  investment: Investment;
  activities: Activity[];
  rhq_strategic_activities: any[];
  rhq_management_activities: any[];
  rhq_corporate_activities: any[];
}

export interface PersonShareholder {
  nationality: any;
  id: number;
  shareholder_id: number;
  first_name_arabic: string;
  last_name_arabic: string;
  full_name: string;
  current_nationality_id: number;
  passport_number: string;
  person_shareholder_city: string;
  passport_id_copy: string;
  professional_license_certificate: string;
  other: string;
}

export interface ShareHolderType {
  id: number;
  name: string;
}

export interface Shareholder {
  id: number;
  customer_id: number;
  share_holder_type_id: number;
  shares_percentage: string;
  customer: Customer;
  share_holder_type: ShareHolderType;
  existing_shareholders: any[];
  person_shareholders: PersonShareholder[];
  organization_shareholders: any[];
}

export interface MobileCountryCode {
  id: number;
  code: string;
}

export interface Nationality {
  id: number;
  name: string;
}

export interface ContactPerson {
  national_id: any;
  mobile: string;
  designation: any;
  id: number;
  customer_id: number;
  first_name_arabic: string;
  last_name_arabic: string;
  full_name: string;
  passport_number: string;
  passport_issue_date: string;
  passport_expiry_date: string;
  contact_person_city: string;
  mobile_number: string;
  email: string;
  mobile_code_country_id: number;
  nationality_id: number;
  country_id: number;
  mobile_country_code: MobileCountryCode;
  nationality: Nationality;
  country: Country;
  identity_number: string;
}


export interface PreviewResponseData {
  customer: Customer;
  entity_information: EntityInformation;
  shareholders: Shareholder[];
  contact_person: ContactPerson;
}


export interface PreviewApiResponse {
  success: boolean;
  message: string;
  data: PreviewResponseData;
}
