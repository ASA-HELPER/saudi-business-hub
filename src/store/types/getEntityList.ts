import { n } from "framer-motion/dist/types.d-B_QPEvFK";

export const GET_ENTITY_LIST_REQUEST = "GET_ENTITY_LIST_REQUEST";
export const GET_ENTITY_LIST_SUCCESS = "GET_ENTITY_LIST_SUCCESS";
export const GET_ENTITY_LIST_FAILURE = "GET_ENTITY_LIST_FAILURE";

export interface EntityActivity {
  id: number;
  activityid: string;
  branch_id: number;
  group_id: number;
  section_id: number;
  class_id: number;
  division_id: number;
  isic_master_rule_id: number;
  description: string;
  description_en: string;
  description_ar: string;
  spl_requirement_id: string;
  qeemah_channel: string;
  active: number;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  isic_master_rule: {
    classification: string;
  };
  pivot: {
    entity_information_id: number;
    activity_id: number;
  };
}

export interface Country {
  id: number;
  code: string;
  name: string;
  phone_prefix: number;
  blacklisted: boolean;
  is_share_holder_check: boolean;
  nationality: string | null;
  active: number;
}

export interface Region {
  id: number;
  code: string;
  name: string;
  active: number;
}

export interface City {
  id: number;
  region_id: number;
  code: string;
  name: string;
  active: number;
}

export interface LegalStatus {
  id: number;
  code: string;
  name: string;
  active: number;
}

export interface EntityInformation {
  mobile_phone: any;
  mobile_country_code_id: any;
  mobile_number: any;
  email: any;
  id: number;
  investment_registration_type_id: number;
  country_id: number;
  region_id: number;
  city_id: number;
  legal_status_id: number;
  investment_id: number;
  license_duration: string;
  entity_name: string;
  entity_name_arabic: string;
  basic_info_extended_multinational_company: string;
  capital: string;
  active: number;
  created_at: string;
  updated_at: string;
  board_resolution_file: string;
  letter_of_support_file: string;

  country: Country;
  region: Region;
  city: City;
  legal_status: LegalStatus;
  activities: EntityActivity[];

  // Optional (can extend later if needed)
  rhq_strategic_activities?: any[];
  rhq_management_activities?: any[];
  rhq_corporate_activities?: any[];
  media?: any[];
}

export interface GetEntityListResponse {
  success: boolean;
  message: string;
  data: EntityInformation[];
}
