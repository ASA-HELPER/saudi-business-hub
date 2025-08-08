import React from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const Input = styled.input`
  margin-top: 0.5rem;
`;

interface Props {
  label: string;
  checked: boolean;
  description: string;
  onCheckboxChange: () => void;
  onDescriptionChange: (value: string) => void;
}

const CheckboxWithInput: React.FC<Props> = ({
  label,
  checked,
  description,
  onCheckboxChange,
  onDescriptionChange,
}) => {
  return (
    <Container>
      <Label>
        <input type="checkbox" checked={checked} onChange={onCheckboxChange} />
        {label}
      </Label>
      {checked && (
        <Input
          type="text"
          placeholder="Enter description"
          value={description}
          onChange={(e) => onDescriptionChange(e.target.value)}
        />
      )}
    </Container>
  );
};

export default CheckboxWithInput;
