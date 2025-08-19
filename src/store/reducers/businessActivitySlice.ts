import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  Activity,
  Branch,
  Class,
  Division,
  Group,
  Section,
} from "../../pages/Investment/businessReg/types";
import { BusinessActivityRowItem } from "../types/businessActivity";

interface BusinessActivityState {
  section: Section | null;
  divisions: Division[];
  groups: Group[];
  classes: Class[];
  branches: Branch[];
  activities: Activity[];
  activityRows: BusinessActivityRowItem[];
}

const initialState: BusinessActivityState = {
  section: null,
  divisions: [],
  groups: [],
  classes: [],
  branches: [],
  activities: [],
  activityRows: [], // new
};

const businessActivitySlice = createSlice({
  name: "businessActivity",
  initialState,
  reducers: {
    setSection: (state, action: PayloadAction<Section | null>) => {
      state.section = action.payload;
    },
    setDivisions: (state, action: PayloadAction<Division[]>) => {
      state.divisions = action.payload;
    },
    setGroups: (state, action: PayloadAction<Group[]>) => {
      state.groups = action.payload;
    },
    setClasses: (state, action: PayloadAction<Class[]>) => {
      state.classes = action.payload;
    },
    setBranches: (state, action: PayloadAction<Branch[]>) => {
      state.branches = action.payload;
    },
    setActivities: (state, action: PayloadAction<Activity[]>) => {
      state.activities = action.payload;
    },
    setActivityRows: (
      state,
      action: PayloadAction<BusinessActivityRowItem[]>
    ) => {
      state.activityRows = action.payload;
    },
    addActivityRows: (
      state,
      action: PayloadAction<BusinessActivityRowItem[]>
    ) => {
      state.activityRows = [...state.activityRows, ...action.payload];
    },
    deleteActivityRow: (state, action: PayloadAction<number>) => {
      state.activityRows = state.activityRows.filter(
        (_, idx) => idx !== action.payload
      );
    },
    loadBusinessActivityRow: (
      state,
      action: PayloadAction<BusinessActivityRowItem>
    ) => {
      const row = action.payload;
      state.section = row.section ?? null;
      state.divisions = row.division ? [row.division] : [];
      state.groups = row.group ? [row.group] : [];
      state.classes = row.class ? [row.class] : [];
      state.branches = row.branch ? [row.branch] : [];
      state.activities = row.activity ? [row.activity] : [];
    },
    //resetBusinessActivity: () => initialState,
    resetBusinessActivity: (state) => {
      return {
        ...initialState,
        //activityRows: state.activityRows, // keep current table rows
      };
    },
    resetAfterSection: (state) => {
      state.divisions = [];
      state.groups = [];
      state.classes = [];
      state.branches = [];
      state.activities = [];
    },
    resetAfterDivision: (state) => {
      state.groups = [];
      state.classes = [];
      state.branches = [];
      state.activities = [];
    },
    resetAfterGroup: (state) => {
      state.classes = [];
      state.branches = [];
      state.activities = [];
    },
    resetAfterClasses: (state) => {
      state.branches = [];
      state.activities = [];
    },
    resetAfterBranches: (state) => {
      state.activities = [];
    },
  },
});

export const {
  setSection,
  setDivisions,
  setGroups,
  setClasses,
  setBranches,
  setActivities,
  setActivityRows,
  deleteActivityRow,
  addActivityRows,
  loadBusinessActivityRow,
  resetBusinessActivity,
  resetAfterSection,
  resetAfterDivision,
  resetAfterGroup,
  resetAfterClasses,
  resetAfterBranches,
} = businessActivitySlice.actions;

export default businessActivitySlice.reducer;
