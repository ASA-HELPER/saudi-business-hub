import { combineReducers } from "redux";
import { userReducer } from "./reducers/userReducer";
import { appDataReducer } from "./reducers/appDataReducer";
import countryReducer from "./reducers/countryReducer";
import { sectorReducer } from "./reducers/sectorReducer";
import registerReducer from "./reducers/registerReducer";
import loginReducer from "./reducers/loginReducer";
import titleReducer from "./reducers/titleReducer";
import forgotPasswordReducer from "./reducers/forgotPasswordReducer";
import resetPasswordReducer from "./reducers/resetPasswordReducer";
import sendEmailVerifyOtpReducer from "./reducers/sendEmailVerifyOtpReducer";
import emailOtpReducer from "./reducers/emailOtpReducer";
import loginOtpReducer from "./reducers/loginOtpReducer";
import nafathLoginReducer from "./reducers/nafathLoginReducer";
import cityReducer from "./reducers/cityReducer";
import regionReducer from "./reducers/regionReducer";
import { registrationTypeReducer } from "./reducers/registrationTypeReducer";
import businessActivityReducer from "./reducers/businessActivitySlice";
import structureReducer from "./reducers/structureReducer";
import legalStatusReducer from "./reducers/legalStatusReducer";
import expectedInvestmentReducer from "./reducers/expectedInvestmentReducer";
import entityRegistrationReducer from "./reducers/entityRegistrationReducer";
import getEntityListReducer from "./reducers/getEntityListReducer";
import shareholderReducer from "./reducers/shareHolderListReducer";
import shareholderIdTypeReducer from "./reducers/shareHolderIdReducer";
import createShareholderReducer from "./reducers/shareHolderCreateReducer";
import contactPersonReducer from "./reducers/contactPersonReducer";
import contactPersonListReducer from "./reducers/contactPersonListReducer";
import { shareholderPersonListReducer } from "./reducers/shareholderPersonListReducer";
import previewReducer from "./reducers/previewReducer";
import deleteContactPersonReducer from "./reducers/contactDeleteReducer";

export const rootReducer = combineReducers({
  user: userReducer,
  country: countryReducer,
  appData: appDataReducer,
  sector: sectorReducer,
  register: registerReducer,
  login: loginReducer,
  titles: titleReducer,
  forgotPassword: forgotPasswordReducer,
  resetPassword: resetPasswordReducer,
  sendEmailVerifyOtp: sendEmailVerifyOtpReducer,
  emailOtp: emailOtpReducer,
  postLoginReducer: loginOtpReducer,
  nafathLogin: nafathLoginReducer,
  city: cityReducer,
  region: regionReducer,
  registrationTypes: registrationTypeReducer,
  businessActivity: businessActivityReducer,
  structure: structureReducer,
  legalStatus: legalStatusReducer,
  expectedInvestments: expectedInvestmentReducer,
  entityRegistration: entityRegistrationReducer,
  getEntityList: getEntityListReducer,
  shareholders: shareholderReducer,
  shareholderIdTypes: shareholderIdTypeReducer,
  createShareholder: createShareholderReducer,
  contactPerson: contactPersonReducer,
  contactPersons: contactPersonListReducer,
  shareholderPersons: shareholderPersonListReducer,
  preview: previewReducer,
  deleteContactPerson: deleteContactPersonReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
