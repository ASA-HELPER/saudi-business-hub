// Action types
export const DELETE_CONTACT_PERSON_REQUEST = "DELETE_CONTACT_PERSON_REQUEST";
export const DELETE_CONTACT_PERSON_SUCCESS = "DELETE_CONTACT_PERSON_SUCCESS";
export const DELETE_CONTACT_PERSON_FAILURE = "DELETE_CONTACT_PERSON_FAILURE";

// Action creators
export const deleteContactPersonRequest = (id: number) => ({
  type: DELETE_CONTACT_PERSON_REQUEST,
  payload: id,
});

export const deleteContactPersonSuccess = (message: string) => ({
  type: DELETE_CONTACT_PERSON_SUCCESS,
  payload: message,
});

export const deleteContactPersonFailure = (error: string) => ({
  type: DELETE_CONTACT_PERSON_FAILURE,
  payload: error,
});
