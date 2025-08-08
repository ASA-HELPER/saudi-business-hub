import React, { useState } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { LayoutContainer, Content } from "./styles/Layout.styles";
import RegisterForm from "./RegisterForm";
import Footer from "../LoginSection/Footer";
// import ProgressMenu from "./ProgressMenu";
import SuccessMessage from "./SuccessMessage";
import { useTranslation } from 'react-i18next';

export const Title = styled.h1`
  margin-bottom: 28px;
  font-family: "IBM Plex Sans Arabic", sans-serif;
  font-weight: 600;
  font-size: clamp(16px, 1.8vw, 28px);
  color: #121212;
  text-align: center;
  width: 100%;
`;

const RegisterFormComponent: React.FC = () => {
  const { t } = useTranslation();
  const [submitted, setSubmitted] = useState(false);

  const handleFormSuccess = () => {
    setSubmitted(true);
  };
  return (
    <LayoutContainer>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -40 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <Content>
          {!submitted && (
            <>
              <Title>{t('register.Register')}</Title>
              <RegisterForm onSubmitSuccess={handleFormSuccess} />
            </>
          )}
          {submitted && <SuccessMessage />}
        </Content>
      </motion.div>
      {/* <Footer linkName="Login" linkPath="/login" showFacingIssue={true} /> */}
    </LayoutContainer>
  );
};

export default RegisterFormComponent;
