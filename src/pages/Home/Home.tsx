import React, { useState } from 'react';
import AuthLayout from '../../components/common/Auth/AuthLayout';
import LoginFormComponent from '../../components/common/LoginSection/Layout'; 


const Home: React.FC = () => {  

  return (
   <AuthLayout>
      <LoginFormComponent />
   </AuthLayout>
  );
};

export default Home;
