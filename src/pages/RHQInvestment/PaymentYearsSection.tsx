import React from "react";
import styled from "styled-components";
import SectionTitle from "../../components/common/SectionTitle";

type PaymentYearsSectionProps = {
  formData: {
    payment_years: string;
  };
  handleChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
};

const PaymentYearsSection: React.FC<PaymentYearsSectionProps> = ({
  formData,
  handleChange,
}) => {
  return (
    <Section>
      <SectionTitle>Number of Years Required to Pay</SectionTitle>
      <Row>
        <InputWrapper>
          <Label>
            <span>*</span> Required to pay the fees
          </Label>
          <Select
            name="payment_years"
            value={formData.payment_years}
            onChange={handleChange}
          >
            <option value="">Select years</option>
            <option value="1">1 Year</option>
            <option value="2">2 Years</option>
            <option value="3">3 Years</option>
            <option value="4">4 Years</option>
            <option value="5">5 Years</option>
            <option value="6">6 Years</option>
            <option value="7">7 Years</option>
            <option value="8">8 Years</option>
          </Select>
        </InputWrapper>
      </Row>
    </Section>
  );
};

const Section = styled.div`
  margin-bottom: 32px;
`;

const Row = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 24px;
  margin-bottom: 24px;
`;

const InputWrapper = styled.div`
  flex: 1;
  min-width: 280px;
  min-height: 50px;
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin-bottom: 20px;
`;

const Label = styled.label`
  font-weight: 400;
  margin-bottom: 8px;
  font-size: 14px;
  color: #384250;

  span {
    color: red;
    margin-left: 2px;
  }
`;

const Select = styled.select`
  border: none;
  border-bottom: 2px solid #cfd4dc;
  background: transparent;
  font-size: 14px;
  color: #1f2937;
  width: 100%;
  height: 42px;
  padding: 0 8px;
  transition: border-color 0.3s ease;

  &:focus {
    outline: none;
    border-bottom-color: #007c92;
  }

  option[disabled][hidden] {
    color: #94a3b8 !important;
  }

  &:invalid {
    color: #94a3b8;
  }
`;

export default PaymentYearsSection;