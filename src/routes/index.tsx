import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

import Home from "../pages/Home/Home";
import LoginComponent from "../pages/Login/LoginComponent";
import NafathLoginComponent from "../pages/NafthLogin/NafathLoginComponent";
import Register from "../pages/Register/Register";
import ForgetPassword from "../pages/ForgetPassword/ForgetPassword";
import ContactUs from "../pages/ContactUs/ContactUs";
import Dashboard from "../pages/Dashboard/Dashboard";
import OTPVerify from "../pages/OTPVerify/OTPVerify";
import InvestmentRegistration from "../pages/Investment/InvestmentRegistration";
import EmailVerify from "../pages/EmailVerify/EmailVerify";
import EmailverifySuccess from "../pages/EmailVerifySuccess/EmailverifySuccess";
import ResetPassword from "../pages/ResetPassword/ResetPassword";
import BusinessSectionScreen from "../pages/Investment/businessReg/BusinessSectionScreen";
import RHQInvestmentRegistration from "../pages/RHQInvestment/RHQInvestmentRegistration";



const AppRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes key={location.pathname} location={location}>
        <Route path="/" element={<LoginComponent />} />
        <Route path="/investmentReg" element={<InvestmentRegistration />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<LoginComponent />} />
        <Route path="/nafath-login" element={<NafathLoginComponent />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forget-password" element={<ForgetPassword />} />
        <Route path="/contact-us" element={<ContactUs />} />
        <Route path="/login/otp-verify" element={<OTPVerify />} />
        <Route path="/login/email-verify" element={<EmailVerify />} />
        <Route path="/rhqinvestmentReg" element={<RHQInvestmentRegistration />} />
        <Route
          path="/login/email-verify-success"
          element={<EmailverifySuccess />}
        />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route
          path="/businessReg"
          element={<BusinessSectionScreen key={Date.now()} />}
        />
      </Routes>
    </AnimatePresence>
  );
};

export default AppRoutes;
