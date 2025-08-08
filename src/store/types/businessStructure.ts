export interface Section {
  id: number;
  section_id: string;
  description: string;
  sectionid: string;
  pivot: {
    investment_registration_type_id: number;
    section_id: number;
  };
}

export interface Division {
  id: number;
  division_id: string;
  section_id: number;
  description: string;
  divisionid: string;
  pivot: {
    investment_registration_type_id: number;
    division_id: number;
  };
}

export interface Group {
  id: number;
  group_id: string;
  division_id: number;
  description: string;
  groupid: string;
  pivot: {
    investment_registration_type_id: number;
    group_id: number;
  };
}

export interface Class {
  id: number;
  class_id: string;
  group_id: number;
  description: string;
  classid: string;
  pivot: {
    investment_registration_type_id: number;
    class_id: number;
  };
}

export interface Branch {
  id: number;
  branch_id: string;
  class_id: number;
  description: string;
  branchid: string;
  pivot: {
    investment_registration_type_id: number;
    branch_id: number;
  };
}

export interface Activity {
  id: number;
  activity_id: string;
  branch_id: number;
  group_id: number;
  section_id: number;
  class_id: number;
  division_id: number;
  description: string;
  activityid: string;
  isic_master_rule: {
    classification: string;
  };
  pivot: {
    investment_registration_type_id: number;
    activity_id: number;
  };
}

export interface StructureResponse {
  id: number;
  code: string;
  name: string;
  sections: Section[];
  divisions: Division[];
  groups: Group[];
  classes: Class[];
  branches: Branch[];
  activities: Activity[];
}
