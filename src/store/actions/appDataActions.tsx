import { SET_APP_DATA, CLEAR_APP_DATA, AppDataActionTypes } from '../types/appDataTypes';
export const setAppData = (updates: string[]): AppDataActionTypes => ({ type: SET_APP_DATA, payload: updates });
export const clearAppData = (): AppDataActionTypes => ({ type: CLEAR_APP_DATA });