import React from "react";
import styled from "styled-components";

const InvestmentRegistrationCard = () => {
  return (
    <CardContainer>
      <Title>You haven't applied for investment registration yet.</Title>
      <Description>
        Complete your registration to begin your investment journey.
      </Description>
      <RegisterButton>Register</RegisterButton>
    </CardContainer>
  );
};

export default InvestmentRegistrationCard;

// Styled components
const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 2rem;
  background-color: #ffffff;
  margin: 0 auto;
`;

const Title = styled.h3`
  font-family: "IBM Plex Sans Arabic", sans-serif;
  font-size: 20px;
  font-weight: 700;
  color: #333;
  margin-bottom: 1rem;
`;

const Description = styled.p`
  font-size: 1rem;
  color: #666;
  margin-bottom: 1.5rem;
  line-height: 1.5;
`;

const RegisterButton = styled.button`
  background-color: #2563eb;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #1d4ed8;
  }

  &:active {
    background-color: #1e40af;
  }
`;
