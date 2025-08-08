import { RootState } from '../rootReducer';
export const selectUser = (state: RootState) => state.user;
export const selectIsLoggedIn = (state: RootState) => !!state.user.token;