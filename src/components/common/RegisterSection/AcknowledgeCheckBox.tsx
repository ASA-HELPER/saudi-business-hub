import React from 'react';
import styled from 'styled-components';
import checkBox from "../../../assets/images/register/Check.png"

interface AcknowledgeCheckBoxProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label: any;
}

const CheckboxContainer = styled.div`
  width: 100%;
  margin: 0px;
  display: flex;
  align-items: flex-start;
  gap: 8px;
  padding: 12px;
  background: #eff3f5;
  border-radius: 6px;
`;

const StyledCheckbox = styled.div<{ checked: boolean }>`
  width: 24px;
  height: 24px;
  padding: 4px;
  border-radius: 4px;
  background: ${props => props.checked ? '#00778e' : '#ffffff'};
  border: 1px solid ${props => props.checked ? '#00778e' : '#cccccc'};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;

  &:hover {
    background: ${props => props.checked ? '#006177' : '#f5f5f5'};
  }

  img {
    width: 16px;
    height: 16px;
    display: ${props => props.checked ? 'block' : 'none'};
  }
`;

const Label = styled.label`
  font-family: 'IBM Plex Sans Arabic', sans-serif;
  font-size: 16px;
  font-weight: 400;
  line-height: 26px;
  letter-spacing: 0.16px;
  color: #444d54;
  cursor: pointer;
  flex: 1;

  a {
    color: #00778e;
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
  }
`;

const AcknowledgeCheckBox: React.FC<AcknowledgeCheckBoxProps> = ({ checked, onChange, label }) => {
  return (
    <CheckboxContainer>
      <StyledCheckbox 
        checked={checked}
        onClick={() => onChange(!checked)}
      >
        <img src={checkBox} alt="checkmark" />
      </StyledCheckbox>
      <Label onClick={() => onChange(!checked)}>
        {label}
      </Label>
    </CheckboxContainer>
  );
};

export default AcknowledgeCheckBox;

