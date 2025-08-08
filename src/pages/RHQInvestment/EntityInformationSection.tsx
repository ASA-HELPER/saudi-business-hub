import React from "react";
import styled from "styled-components";
import SectionTitle from "../../components/common/SectionTitle";
import editIcon from "../../assets/images/investment/edit_icon.svg";
import deleteIcon from "../../assets/images/investment/delete_icon.svg";

const EntityInformationSection: React.FC = () => {
  return (
    <Section>
      <SectionTitle>RHQ License Entity Information</SectionTitle>
      <Row>
        <Table>
          <thead>
            <tr>
              <Th style={{ width: "10%" }}>#</Th>
              <Th style={{ width: "10%" }}>ISIC Code</Th>
              <Th style={{ width: "35%" }}>Registration Activity</Th>
              <Th style={{ width: "35%" }}>Classification</Th>
              <Th style={{ width: "10%" }}>Actions</Th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <Td>1</Td>
              <Td>01 701011</Td>
              <Td>Activities of regional head Quarters for Foreign companies</Td>
              <Td>Restricted</Td>
              <Td>
                <Actions>
                  <ActionImage src={editIcon} alt="Edit" />
                  <ActionImage src={deleteIcon} alt="Delete" />
                </Actions>
              </Td>
            </tr>
          </tbody>
        </Table>
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

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 24px;
`;

const Th = styled.th<{ width?: string }>`
  text-align: left;
  padding: 12px;
  background: #f1f5f9;
  color: #333;
  font-weight: 600;
  border-bottom: 1px solid #ddd;
  border-right: 1px solid #e0e0e0;
  white-space: nowrap;
  ${({ width }) => width && `width: ${width};`}

  &:last-child {
    border-right: none;
  }
`;

const Td = styled.td<{ width?: string }>`
  padding: 12px;
  border-bottom: 1px solid #e0e0e0;
  border-right: 1px solid #f0f0f0;
  color: black;
  white-space: nowrap;
  ${({ width }) => width && `width: ${width};`}

  &:last-child {
    border-right: none;
  }
`;

const Actions = styled.div`
  display: flex;
  gap: 8px;
`;

const ActionImage = styled.img`
  width: 32px;
  height: 32px;
`;

export default EntityInformationSection;