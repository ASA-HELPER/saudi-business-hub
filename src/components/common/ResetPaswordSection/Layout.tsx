import React from "react";
import { LayoutContainer, Content } from "./styles/Layout.styles";
import ResetPasswordForm from "./ResetPasswordForm";
import Footer from '../LoginSection/Footer';

const ResetPassFormComponent: React.FC = () => {
  return (
    <LayoutContainer>
        <Content>
          <ResetPasswordForm />
        </Content>
        <Footer linkName="Login" linkPath="/login"  showFacingIssue={true}/>
    </LayoutContainer>
  );
};

export default ResetPassFormComponent;
