import { BusinessActivityRowItem } from "../../../store/types/businessActivity";
import { Activity, Branch, Class, Division, Group, Section } from "./types";

interface Params {
  activities: Activity[];
  branches: Branch[];
  classes: Class[];
  groups: Group[];
  divisions: Division[];
  section: Section | null;
}

export function assembleBusinessActivityRows({
  activities,
  branches,
  classes,
  groups,
  divisions,
  section,
}: Params): BusinessActivityRowItem[] {
  return activities.map((activity) => {
    const branch = branches.find((b) => b.id === activity.branch_id);
    const cls = classes.find((c) => c.id === activity.class_id);
    const group = groups.find((g) => g.id === activity.group_id);
    const division = divisions.find((d) => d.id === activity.division_id);

    return {
      section,
      division,
      group,
      class: cls,
      branch,
      activity,
    };
  });
}
