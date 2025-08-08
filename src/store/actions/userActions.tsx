import { SET_USER, CLEAR_USER, UserActionTypes, UserState } from '../types/userTypes';
export const setUser = (user: Partial<UserState>): UserActionTypes => ({ type: SET_USER, payload: user });
export const clearUser = (): UserActionTypes => ({ type: CLEAR_USER });