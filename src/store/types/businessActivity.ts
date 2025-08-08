import {
  Activity,
  Branch,
  Class,
  Division,
  Group,
  Section,
} from "../../pages/Investment/businessReg/types";

export interface BusinessActivityRowItem {
  section: Section | null;
  division?: Division;
  group?: Group;
  class?: Class;
  branch?: Branch;
  activity: Activity;
}
