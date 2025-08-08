import React from "react";
import styled from "styled-components";
import { Edit2 } from "lucide-react"; // using lucide-react for a pencil icon

const PillButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: space-between;
  border: 1px solid #ccc;
  border-radius: 999px;
  background: white;
  padding: 8px 16px;
  font-size: 14px;
  color: black;
  cursor: pointer;
  min-width: 280px;
  max-width: 100%;
  transition: background-color 0.2s;

  margin-top: 20px;

  &:hover {
    background-color: #f5f5f5;
  }
`;

const Label = styled.span`
  flex: 1;
  text-align: left;
`;

const IconWrapper = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #007d8a; // teal-like color
  color: white;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  flex-shrink: 0;
  margin-left: 12px;
`;

export default function RegistrationPill() {
  return (
    <PillButton>
      <Label>Regular Investment Registration</Label>
      <IconWrapper>
        <Edit2 size={16} strokeWidth={2} />
      </IconWrapper>
    </PillButton>
  );
}
