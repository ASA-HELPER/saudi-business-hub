import React from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: row;
  width: 45%;
  gap: 5px;
`;

const Label = styled.label`
  display: flex;
  align-items: center;
  font-size: 14px;
  font-family: '"IBM Plex Sans Arabic", sans-serif';
  gap: 0.5rem;
  flex: 1;
  color: #47515b;
`;

const Input = styled.input<{ $isRTL?: boolean }>`
  padding: 10px 0;
  flex: 1;
  border: none;
  border-bottom: 1px solid #cfd4dc;
  font-size: 13px;
  font-family: '"IBM Plex Sans Arabic", sans-serif';
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
    font-size: 13px;
  }
`;

interface Props {
  label: string;
  checked: boolean;
  description: string;
  onCheckboxChange: () => void;
  onDescriptionChange: (value: string) => void;
  placeholder: string;
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
      <input type="checkbox" checked={checked} onChange={onCheckboxChange} />
      <Label>{label}</Label>
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
