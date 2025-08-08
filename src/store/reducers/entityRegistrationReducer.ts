const initialState = {
  loading: false,
  error: null,
  data: null,
};

const entityRegistrationReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case "REGISTER_ENTITY_REQUEST":
      return { ...state, loading: true, error: null };
    case "REGISTER_ENTITY_SUCCESS":
      return { ...state, loading: false, data: action.payload };
    case "REGISTER_ENTITY_FAILURE":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default entityRegistrationReducer;
