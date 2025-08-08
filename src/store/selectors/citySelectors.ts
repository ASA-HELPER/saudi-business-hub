import { RootState } from "../rootReducer";

export const selectCities = (state: RootState) => state.city.cities;
export const selectCityLoading = (state: RootState) => state.city.loading;
export const selectCityError = (state: RootState) => state.city.error;
