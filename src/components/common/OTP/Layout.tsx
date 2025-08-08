import React from 'react';
import { motion } from 'framer-motion';
import {
  LayoutContainer,
  Content,
} from './styles/Layout.styles';
import OTPForm from './OTPForm';
import Footer from '../LoginSection/Footer';

const OTPFormComponent: React.FC = () => {
  return (
    <LayoutContainer>
      <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -40 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
      >
      <Content>
        <OTPForm />
        <Footer linkName="Register" linkPath="/register"/>
      </Content>
      </motion.div>
    </LayoutContainer>
  );
};

export default OTPFormComponent;
