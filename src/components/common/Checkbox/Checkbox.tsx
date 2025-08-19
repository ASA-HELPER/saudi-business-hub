import React from "react";
import styled from "styled-components";

const CheckboxWrapper = styled.div`
  display: inline-block;
  background-color: #f3f4f6;
  border-radius: 5px;
`;

const Label = styled.label`
  display: flex;
  align-items: center;
  gap: 1px;
  color: #47515b;
  padding: 7px 2px;
  font-size: 14px;
  font-family: '"IBM Plex Sans Arabic", sans-serif';
`;

interface Props {
  label: string;
  checked: boolean;
  onChange: () => void;
}

const Checkbox: React.FC<Props> = ({ label, checked, onChange }) => {
  return (
    <CheckboxWrapper>
      <Label>
        <input type="checkbox" checked={checked} onChange={onChange} />
        {label}
      </Label>
    </CheckboxWrapper>
  );
};

export default Checkbox;
