export const selectPostLoginUser = (state: any) => state.postLoginReducer.data;
export const selectPostLoginError = (state: any) => state.postLoginReducer.error;
export const selectPostLoginLoading = (state: any) => state.postLoginReducer.loading;
