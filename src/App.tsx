import React from "react";
import { ToastContainer } from "react-toastify";
import AppRoutes from "./routes";
import { GlobalStyles } from "./App.styles";
import Loader from "./components/generic/Loader/Loader";
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";

const App = () => (
  <GoogleReCaptchaProvider reCaptchaKey="6Lf843UrAAAAAAKhYaqUv5mBXF5hBwU0vPiZF84x">
    <GlobalStyles />
    <Loader /> 
    <ToastContainer  autoClose={3000} />
    <AppRoutes />
  </GoogleReCaptchaProvider>
);

export default App;
