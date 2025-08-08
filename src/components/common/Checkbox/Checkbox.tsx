import React from "react";
import styled from "styled-components";

const Label = styled.label`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

interface Props {
  label: string;
  checked: boolean;
  onChange: () => void;
}

const Checkbox: React.FC<Props> = ({ label, checked, onChange }) => {
  return (
    <Label>
      <input type="checkbox" checked={checked} onChange={onChange} />
      {label}
    </Label>
  );
};

export default Checkbox;
