import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface LanguageState {
  lang: "en" | "ar";
}

const storedLang = (localStorage.getItem("appLang") as "en" | "ar") || "en";

const initialState: LanguageState = {
  lang: storedLang,
};

const languageSlice = createSlice({
  name: "language",
  initialState,
  reducers: {
    setAppLanguage(state, action: PayloadAction<"en" | "ar">) {
      state.lang = action.payload;
      localStorage.setItem("appLang", action.payload);
    },
  },
});

export const { setAppLanguage } = languageSlice.actions;
export const selectAppLang = (state: { language: LanguageState }) =>
  state.language.lang;
export default languageSlice.reducer;
