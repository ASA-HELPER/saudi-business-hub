import React from "react";
import styled from "styled-components";
import SectionTitle from "../../components/common/SectionTitle";

type DisclaimerSectionProps = {
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
};

const DisclaimerSection: React.FC<DisclaimerSectionProps> = ({ handleChange }) => {
  return (
    <Section>
      <SectionTitle>Disclaimer</SectionTitle>
      <CheckboxWrapper>
        <input 
          type="checkbox" 
          name="disclaimer1" 
          onChange={handleChange}
        />
        <DisclaimerText>
          By continuing with this application, you confirm that your organisation is a multinational company with active operations across than one country and is seeking an RHQ license in accordance with official regulations. You further agree to undertake all required RHQ activities.
        </DisclaimerText>
      </CheckboxWrapper>
      <CheckboxWrapper>
        <input 
          type="checkbox" 
          name="disclaimer2" 
          onChange={handleChange}
        />
        <DisclaimerText>
          By proceeding, you acknowledge that this RHQ application is being submitted for the purpose of establishing a Regional Headquarters (RHQ) in the Kingdom of Saudi Arabia, which will serve as the administrative and strategic center for operations across the designated geographical region.
        </DisclaimerText>
      </CheckboxWrapper>
    </Section>
  );
};

const Section = styled.div`
  margin-bottom: 32px;
`;

const CheckboxWrapper = styled.div`
  display: flex;
  align-items: flex-start;
  margin-bottom: 18px;
  margin-top: 16px;

  input[type="checkbox"] {
    margin-right: 12px;
    margin-top: 4px;
    width: 20px;         
    height: 20px;        
    transform: scale(1); 
    cursor: pointer;
  }
`;

const DisclaimerText = styled.p`
  font-size: 14px;
  color: #384250;
  line-height: 1.5;
`;

export default DisclaimerSection;