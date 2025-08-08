import React from "react";
import styled from "styled-components";

const CheckboxWrapper = styled.div`
  width: 200px;
  display: inline-block;
`;

const Label = styled.label`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #47515b;
  background-color: #f9fafb;
  padding: 2px;
  font-size: 10px;
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
