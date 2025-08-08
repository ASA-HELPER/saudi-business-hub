import {
  DELETE_CONTACT_PERSON_REQUEST,
  DELETE_CONTACT_PERSON_SUCCESS,
  DELETE_CONTACT_PERSON_FAILURE,
} from "../actions/deleteContactAction";
import { DeleteContactPersonState } from "../types/deleteContactPersonTypes";

const initialState: DeleteContactPersonState = {
  loading: false,
  success: false,
  error: null,
};

const deleteContactPersonReducer = (
  state = initialState,
  action: any
): DeleteContactPersonState => {
  switch (action.type) {
    case DELETE_CONTACT_PERSON_REQUEST:
      return { loading: true, success: false, error: null };

    case DELETE_CONTACT_PERSON_SUCCESS:
      return { loading: false, success: true, error: null };

    case DELETE_CONTACT_PERSON_FAILURE:
      return { loading: false, success: false, error: action.payload };

    default:
      return state;
  }
};

export default deleteContactPersonReducer;
