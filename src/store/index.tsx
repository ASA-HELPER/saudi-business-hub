// src/store/index.tsx
import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import { rootReducer } from "./rootReducer";
import { watchUserSaga } from "./sagas/userSaga";
import { watchAppDataSaga } from "./sagas/appDataSaga";
import countrySaga from "./sagas/countrySaga";
import sectorSaga from "./sagas/sectorSaga";
import registerWatcher from "./sagas/registerSaga";
import loginWatcher from "./sagas/loginSaga";
import titleWatcher from "./sagas/titleSaga";
import forgotPasswordWatcher from "./sagas/forgotPasswordSaga";
import resetPasswordWatcher from "./sagas/resetPasswordSaga";
import sendEmailVerifyOtpWatcher from "./sagas/sendEmailVerifyOtpSaga";
import verifyRegisterMailOtpWatcher from "./sagas/emailOtpSaga";
import loginOtpWatcher from "./sagas/loginOtpSaga";
import NafathLoginWatcher from "./sagas/nafathLoginSaga";
import citySaga from "./sagas/citySaga";
import regionSaga from "./sagas/regionSaga";
import { watchRegistrationTypes } from "./sagas/registrationTypeSaga";
import { watchFetchStructure } from "./sagas/structureSaga";
import { watchFetchLegalStatuses } from "./sagas/legalStatusSaga";
import expectedInvestmentSaga from "./sagas/expectedInvestmentSaga";
import entityRegistrationWatcher from "./sagas/entityRegistrationSaga";
import { entityListSaga } from "./sagas/getEntityListSaga";
import shareholderSaga from "./sagas/shareHolderSaga";
import shareholderIdTypeSaga from "./sagas/shareHolderIdSaga";
import createShareholderSaga from "./sagas/shareHolderCreateSaga";
import contactPersonSaga from "./sagas/contactPersonSaga";
import contactPersonListSaga from "./sagas/contactPersonListSaga";
import { watchShareholderPersonsSaga } from "./sagas/shareholderPersonListSaga";
import { previewSaga } from "./sagas/previewSaga";
import contactPersonUpdateSaga from "./sagas/contactPersonUpdateSaga";
import deleteContactPersonSaga from "./sagas/deleteContactPersonSaga";
import shareholderDeleteSaga from "./sagas/shareholderDeleteSaga";
import deleteAttachmentSaga from "./sagas/attachmentDeleteSaga";
import { watchGetShareholderById } from "./sagas/shareholderGetByIdSaga";
import shareholderCountrySaga from "./sagas/shareholderCountrySaga";  

// Create the saga middleware
const sagaMiddleware = createSagaMiddleware();

// Configure the store
export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ thunk: false }).concat(sagaMiddleware),
});
// Run sagas
sagaMiddleware.run(watchUserSaga);
sagaMiddleware.run(watchAppDataSaga);
sagaMiddleware.run(countrySaga);
sagaMiddleware.run(sectorSaga);
sagaMiddleware.run(registerWatcher);
sagaMiddleware.run(loginWatcher);
sagaMiddleware.run(titleWatcher);
sagaMiddleware.run(forgotPasswordWatcher);
sagaMiddleware.run(resetPasswordWatcher);
sagaMiddleware.run(sendEmailVerifyOtpWatcher);
sagaMiddleware.run(verifyRegisterMailOtpWatcher);
sagaMiddleware.run(loginOtpWatcher);
sagaMiddleware.run(NafathLoginWatcher);
sagaMiddleware.run(citySaga);
sagaMiddleware.run(regionSaga);
sagaMiddleware.run(watchRegistrationTypes);
sagaMiddleware.run(watchFetchStructure);
sagaMiddleware.run(watchFetchLegalStatuses);
sagaMiddleware.run(expectedInvestmentSaga);
sagaMiddleware.run(entityRegistrationWatcher);
sagaMiddleware.run(entityListSaga);
sagaMiddleware.run(shareholderSaga);
sagaMiddleware.run(shareholderIdTypeSaga);
sagaMiddleware.run(createShareholderSaga);
sagaMiddleware.run(contactPersonSaga);
sagaMiddleware.run(contactPersonListSaga);
sagaMiddleware.run(watchShareholderPersonsSaga);
sagaMiddleware.run(previewSaga);
sagaMiddleware.run(contactPersonUpdateSaga);
sagaMiddleware.run(deleteContactPersonSaga);
sagaMiddleware.run(shareholderDeleteSaga);
sagaMiddleware.run(deleteAttachmentSaga);
sagaMiddleware.run(watchGetShareholderById);
sagaMiddleware.run(shareholderCountrySaga);

// Export RootState and AppDispatch types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
