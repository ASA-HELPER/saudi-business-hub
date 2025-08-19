export const selectShareholderCountryList = (state: any) =>
  state.shareholderCountry.countries;

export const selectShareholderCountryLoading = (state: any) =>
  state.shareholderCountry.loading;

export const selectShareholderCountryError = (state: any) =>
  state.shareholderCountry.error;
