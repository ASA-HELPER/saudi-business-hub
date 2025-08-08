import React from "react";
import styled from "styled-components";
import SectionTitle from "../../components/common/SectionTitle";

const ActivitiesSection: React.FC = () => {
  return (
    <Section>
      <SectionTitle>RHQ Activities</SectionTitle>
      <Row>
        <ActivitiesColumn>
          <ActivitiesTitle>RHQ Strategic Direction Activities (Please select all the activities)</ActivitiesTitle>
          <SelectBox>
            <select>
              <option value="" disabled selected>Select</option>
            </select>
          </SelectBox>
        </ActivitiesColumn>
        <ActivitiesColumn>
          <ActivitiesTitle>RHQ Management Functions Activities (Please select all the activities)</ActivitiesTitle>
          <SelectBox>
            <select>
              <option value="" disabled selected>Select</option>
            </select>
          </SelectBox>
        </ActivitiesColumn>
      </Row>
      <Row>
        <ActivitiesColumn>
          <ActivitiesTitle>RHQ Optional Activities (Please select at Least 3 activities)</ActivitiesTitle>
          <SelectBox>
            <select>
              <option value="" disabled selected>Select</option>
            </select>
          </SelectBox>
        </ActivitiesColumn>
        <ActivitiesColumn>
          <ActivitiesTitle>RHQ Global Coverage</ActivitiesTitle>
          <SelectBox>
            <select>
              <option value="" disabled selected>Select</option>
            </select>
          </SelectBox>
        </ActivitiesColumn>
      </Row>
    </Section>
  );
};

const Section = styled.div`
  margin-bottom: 32px;
`;

const Row = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 24px;
  margin-bottom: 24px;
`;

const ActivitiesColumn = styled.div`
  flex: 1;
  min-width: 280px;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const ActivitiesTitle = styled.h4`
  font-size: 14px;
  font-weight: 500;
  color: #384250;
  margin: 0;
`;

const SelectBox = styled.div`
  border: 1px solid #cfd4dc;
  border-radius: 8px;
  padding: 12px;
  background: white;
  
  select {
    width: 100%;
    border: none;
    outline: none;
    background: transparent;
    font-size: 14px;
    color: #1f2937;
    
    &:focus {
      outline: none;
    }
    
    option[disabled][hidden] {
      color: #94a3b8;
    }
  }
`;

export default ActivitiesSection;