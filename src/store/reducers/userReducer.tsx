import {
  UserState,
  UserActionTypes,
  SET_USER,
  CLEAR_USER,
} from "../types/userTypes";
const initialState: UserState = {
  id: null,
  name: "Deepak",
  token: null,
  loading: false,
};
export const userReducer = (
  state = initialState,
  action: UserActionTypes
): UserState => {
  switch (action.type) {
    case SET_USER:
      return { ...state, ...action.payload };
    case CLEAR_USER:
      return initialState;
    default:
      return state;
  }
};
