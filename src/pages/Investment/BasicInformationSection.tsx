import React from "react";
import styled from "styled-components";

// Container for the whole section
const Section = styled.div`
  margin-bottom: 2.5rem;
`;

// Section title with gradient
const SectionTitle = styled.h3`
  font-weight: 600;
  padding: 1rem;
  border-radius: 8px 8px 0 0;
  font-size: 1rem;
  background: linear-gradient(90deg, #cedfe3, #cedfe300);
  font-size: 22px;
  color: #121212;
`;

// Grid layout
const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;
  background-color: #f9fafb;
  padding: 2rem;
  border-radius: 0 0 8px 8px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const Field = styled.div`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  font-size: 0.95rem;
  font-weight: 500;
  margin-bottom: 0.5rem;
  color: #1e293b;

  span {
    color: red;
    margin-left: 0.25rem;
  }
`;

const Input = styled.input`
  padding: 0.5rem 0;
  border: none;
  border-bottom: 2px solid #cbd5e1;
  font-size: 1rem;
  background-color: transparent;
  width: 100%;
  transition: border-color 0.3s;

  &:focus {
    outline: none;
    border-bottom-color: #0c3957; /* or any focus color you prefer */
  }

  &::placeholder {
    color: #94a3b8; /* optional: subtle placeholder color */
  }
`;


const Select = styled.select`
  padding: 0.75rem;
  border: 1px solid #cbd5e1;
  border-radius: 6px;
  font-size: 1rem;
  background-color: #fff;
`;

const CapitalInputGroup = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid #cbd5e1;
  border-radius: 6px;
  background-color: #fff;

  span {
    padding: 0 1rem;
    background-color: #f1f5f9;
    border-right: 1px solid #cbd5e1;
    color: #475569;
    font-weight: 500;
    white-space: nowrap;
  }

  input {
    flex: 1;
    padding: 0.75rem;
    border: none;
    outline: none;
    font-size: 1rem;
  }
`;

const BasicInformationSection = () => {
  return (
    <Section>
      <SectionTitle>Basic Information</SectionTitle>
      <Grid>
        <Field>
          <Label>
            Entity Name in English<span>*</span>
          </Label>
          <Input placeholder="Enter Entity Name in English" />
        </Field>

        <Field>
          <Label>
            Entity Name in Arabic<span>*</span>
          </Label>
          <Input placeholder="Enter Entity Name in Arabic" />
        </Field>

        <Field>
          <Label>
            Legal Status<span>*</span>
          </Label>
          <Select>
            <option>Select Legal Status</option>
          </Select>
        </Field>

        <Field>
          <Label>
            Capital<span>*</span>
          </Label>
          <CapitalInputGroup>
            <span>SAR</span>
            <input placeholder="Enter Capital" />
          </CapitalInputGroup>
        </Field>

        <Field>
          <Label>
            Country<span>*</span>
          </Label>
          <Select defaultValue="Saudi Arabia">
            <option>Saudi Arabia</option>
          </Select>
        </Field>

        <Field>
          <Label>
            Region<span>*</span>
          </Label>
          <Select>
            <option>Select Region</option>
          </Select>
        </Field>

        <Field>
          <Label>
            City<span>*</span>
          </Label>
          <Select>
            <option>Select City</option>
          </Select>
        </Field>

        <Field>
          <Label>
            Expected Investment Spending (In the five years)<span>*</span>
          </Label>
          <Select>
            <option>Select</option>
          </Select>
        </Field>
      </Grid>
    </Section>
  );
};

export default BasicInformationSection;
