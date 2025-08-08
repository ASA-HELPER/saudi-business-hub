import React from "react";
import styled from "styled-components";
import CheckboxWithInput from "../Checkbox/CheckboxWithInput";
import Checkbox from "../Checkbox/Checkbox";

const GroupContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

export interface Option {
  id: number;
  label: string;
  checked: boolean;
  value: string;
  description: string;
  withInput: boolean;
}

interface CheckboxGroupProps {
  options: Option[];
  onOptionsChange: (updatedOptions: Option[]) => void;
  checkboxInputPlaceholder?: string;
}

const CheckboxGroup: React.FC<CheckboxGroupProps> = ({
  options,
  onOptionsChange,
  checkboxInputPlaceholder="Please Describe"
}) => {
  const handleCheckboxChange = (index: number) => {
    const updated = [...options];
    updated[index].checked = !updated[index].checked;
    if (!updated[index].checked) updated[index].description = "";
    onOptionsChange(updated);
  };

  const handleDescriptionChange = (index: number, value: string) => {
    const updated = [...options];
    updated[index].description = value;
    onOptionsChange(updated);
  };

  return (
    <GroupContainer>
      {options.map((option, index) =>
        option.withInput === true ? (
          <CheckboxWithInput
            key={`checkboxwithinput-${option.id}`}
            label={option.label}
            checked={option.checked}
            description={option.description}
            onCheckboxChange={() => handleCheckboxChange(index)}
            onDescriptionChange={(value) =>
              handleDescriptionChange(index, value)
            }
            placeholder={checkboxInputPlaceholder}
          />
        ) : (
          <Checkbox
            key={`checkboxwithoutinput-${option.id}`}
            label={option.label}
            checked={option.checked}
            onChange={() => handleCheckboxChange(index)}
          />
        )
      )}
    </GroupContainer>
  );
};

export default CheckboxGroup;
