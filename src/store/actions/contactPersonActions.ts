import { createAction } from "@reduxjs/toolkit";

export const createContactPersonRequest = createAction<FormData>(
  "CREATE_CONTACT_PERSON_REQUEST"
);
export const createContactPersonSuccess = createAction<any>(
  "CREATE_CONTACT_PERSON_SUCCESS"
);
export const createContactPersonFailure = createAction<string>(
  "CREATE_CONTACT_PERSON_FAILURE"
);

export const updateContactPersonRequest = createAction<{
  id: string | number;
  data: FormData;
}>("UPDATE_CONTACT_PERSON_REQUEST");

export const updateContactPersonSuccess = createAction<any>(
  "UPDATE_CONTACT_PERSON_SUCCESS"
);
export const updateContactPersonFailure = createAction<string>(
  "UPDATE_CONTACT_PERSON_FAILURE"
);
