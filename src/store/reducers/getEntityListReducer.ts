import {
  GET_ENTITY_LIST_REQUEST,
  GET_ENTITY_LIST_SUCCESS,
  GET_ENTITY_LIST_FAILURE,
  EntityInformation,
} from "../types/getEntityList";

interface EntityState {
  data: EntityInformation[];
  loading: boolean;
  error: string | null;
}

const initialState: EntityState = {
  data: [],
  loading: false,
  error: null,
};

const getEntityListReducer = (
  state = initialState,
  action: any
): EntityState => {
  switch (action.type) {
    case GET_ENTITY_LIST_REQUEST:
      return { ...state, loading: true, error: null };

    case GET_ENTITY_LIST_SUCCESS:
      return { ...state, loading: false, data: action.payload };

    case GET_ENTITY_LIST_FAILURE:
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};

export default getEntityListReducer;
