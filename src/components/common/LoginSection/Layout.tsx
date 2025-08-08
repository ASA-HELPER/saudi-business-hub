import React from "react";
import { motion } from "framer-motion";
import {
  LayoutContainer,
  Content,
  LeftSection,
  RightSection,
} from "./styles/Layout.styles";
import InvestmentInfo from "../../generic/InvestmentInfo/InvestmentInfo";
import LoginForm from "./LoginForm";
const LoginFormComponent: React.FC = () => {
  return (
    <LayoutContainer>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -40 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <Content>
          <LeftSection>
            <InvestmentInfo />
          </LeftSection>
          <RightSection>
            <LoginForm />
          </RightSection>
        </Content>
      </motion.div>
    </LayoutContainer>
  );
};

export default LoginFormComponent;
