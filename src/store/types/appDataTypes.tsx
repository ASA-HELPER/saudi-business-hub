export interface AppDataState { updates: string[]; loading: boolean; }
export const SET_APP_DATA = 'SET_APP_DATA';
export const CLEAR_APP_DATA = 'CLEAR_APP_DATA';
interface SetAppDataAction { type: typeof SET_APP_DATA; payload: string[]; }
interface ClearAppDataAction { type: typeof CLEAR_APP_DATA; }
export type AppDataActionTypes = SetAppDataAction | ClearAppDataAction;