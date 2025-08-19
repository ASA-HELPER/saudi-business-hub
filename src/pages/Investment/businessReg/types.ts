export interface Section {
  id: number;
  sectionid: string;
  section_id: string;
  description: string;
  description_en: string;
  description_ar: string;
}

export interface Division {
  id: number;
  section_id: number;
  divisionid: string;
  division_id: string;
  description: string;
  description_en: string;
  description_ar: string;
}

export interface Group {
  id: number;
  group_id: string;
  groupid: string;
  division_id: number;
  description: string;
  description_en: string;
  description_ar: string;
}

export interface Class {
  id: number;
  class_id: string;
  classid: string;
  group_id: number;
  description: string;
  description_en: string;
  description_ar: string;
}

export interface Branch {
  id: number;
  branchid: string;
  branch_id: string;
  class_id: number;
  description: string;
  description_en: string;
  description_ar: string;
}

export interface Activity {
  id: number;
  activityid: string;
  activity_id: string;
  branch_id: number;
  class_id: number;
  group_id: number;
  section_id: number;
  division_id: number;
  description: string;
  description_en: string;
  description_ar: string;
  isic_master_rule: {
    classification: string;
  };
  pivot: {
    investment_registration_type_id: number;
    activity_id: number;
  };
}
