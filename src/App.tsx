import React from "react";
import { ToastContainer } from "react-toastify";
import AppRoutes from "./routes";
import { GlobalStyles } from "./App.styles";
import Loader from "./components/generic/Loader/Loader";
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";

const App = () => (
  <>
    <GlobalStyles />
    <Loader />
    <ToastContainer autoClose={3000} />
    <AppRoutes />
  </>
);

export default App;
