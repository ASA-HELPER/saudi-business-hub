import React from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: row;
  width: 40%;
`;

const Label = styled.label`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex: 1;
  color: #47515b;
`;

const Input = styled.input<{ $isRTL?: boolean }>`
  padding: 10px 0;
  flex: 1;
  border: none;
  border-bottom: 2px solid #cfd4dc;
  font-size: 10px;
  background-color: transparent;
  width: 100%;
  transition: border-color 0.3s ease;
  text-align: ${(props) => (props.$isRTL ? "right" : "left")};
  font-family: ${(props) =>
    props.$isRTL && "'IBM Plex Sans Arabic', sans-serif"};

  &:focus {
    outline: none;
    border-bottom-color: #007c92;
  }

  &::placeholder {
    color: #94a3b8;
    text-align: ${(props) => (props.$isRTL ? "right" : "left")};
  }
`;

interface Props {
  label: string;
  checked: boolean;
  description: string;
  onCheckboxChange: () => void;
  onDescriptionChange: (value: string) => void;
  placeholder:string;
}

const CheckboxWithInput: React.FC<Props> = ({
  label,
  checked,
  description,
  onCheckboxChange,
  onDescriptionChange,
  placeholder,
}) => {
  return (
    <Container>
      <Label>
        <input type="checkbox" checked={checked} onChange={onCheckboxChange} />
        {label}
      </Label>
      <Input
        type="text"
        placeholder={placeholder}
        value={description}
        onChange={(e) => onDescriptionChange(e.target.value)}
      />
    </Container>
  );
};

export default CheckboxWithInput;
