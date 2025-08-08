export interface UserState { id: string | null; name: string; token: string | null; loading: boolean; }
export const SET_USER = 'SET_USER';
export const CLEAR_USER = 'CLEAR_USER';
interface SetUserAction { type: typeof SET_USER; payload: Partial<UserState>; }
interface ClearUserAction { type: typeof CLEAR_USER; }
export type UserActionTypes = SetUserAction | ClearUserAction;