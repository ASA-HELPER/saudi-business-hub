export interface ContactPerson {
  id: number;
  customer_id: number;
  nationality_id: number;
  country_id: number;
  investment_registration_id: number | null;
  title_id: number;
  first_name_arabic: string;
  last_name_arabic: string;
  role: string;
  education: string;
  date_of_birth: string;
  passport_number: string;
  passport_issue_date: string;
  passport_expiry_date: string;
  contact_person_city: string;
  address: string;
  po_box: number | string;
  postal_code: string;
  telephone_code_country_id: number;
  telephone_number: string;
  mobile_code_country_id: number;
  mobile_number: string;
  email: string;
  origin_contact: string;
  id_type: number;
  full_name: string;
  active: number;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;

  customer: Customer;
  country: Country;
  title: Title;
}

export interface Customer {
  id: number;
  company: string;
  user_id: number;
  mobilecountrycode_id: number;
  title: number;
  first_name: string;
  last_name: string;
  user_name_email: string | null;
  applicant_reference_id: string;
  entity_id: string;
  internetuser_id: string;
  application_service_request_id: string;
  investment_registration_id: number | null;
  payment_session_id: string | null;
  payment_api_error_id: string | null;
  fdi_survey_id: string | null;
  nationalid: number;
  sector_id: number;
  country_id: number;
  should_display_set_company_photo_option: number;
  dashboard_tutorial_dismissed: number;
  dashboard_nolicense_tutorial_dismissed: number;
  password_migration: number;
  qeemah_email: string | null;
  qeemah_token: string | null;
  qeemah_email_status: string;
  reg_email_status: string;
  mobile_status: string;
  is_outstanding_fee: number;
  is_fdi_mandatory: number;
  is_pending_financial_statement: number;
  last_success_login: string;
  campaign: string;
  c4c_account_id: string | null;
  converted_toir: number;
  is_agreed_to_paylater: number;
  c4c_parent_id: string | null;
  system_origin: string | null;
  company_website: string;
  user_nafath_id: string | null;
  data_submission_remainder: number;
  is_strategic_investor: number;
  unlicensed_entity_id: string | null;
  c4c_backend_Id: string | null;
  current_license_status: string;
  fdi_shareholders: any;
  fdi_related_entities: any;
  dashboard_media: any;
  company_logo: any;
  active: number;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface Country {
  id: number;
  code: string;
  name: string;
  phone_prefix: number;
  blacklisted: boolean;
  is_share_holder_check: boolean;
  nationality: any;
  active: number;
  created_at: string | null;
  updated_at: string | null;
  deleted_at: string | null;
}

export interface Title {
  id: number;
  token: string;
  identifier: string;
  active: number;
  created_at: string | null;
  updated_at: string | null;
  deleted_at: string | null;
}
