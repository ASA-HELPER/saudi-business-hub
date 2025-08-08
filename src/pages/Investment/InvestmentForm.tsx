import React, { useState } from "react";
import styled from "styled-components";
import BasicInformationSection from "./BasicInformationSection";
import AttachmentSection from "./AttachmentSection";
import RegistrationActivityModal from "./RegistrationActivityModal";

// Wrappers
const FormWrapper = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.05);
  max-width: 1200px;
  margin: 2rem auto;
  border: 1px solid #e5e7eb;
  width: 100%;
`;

const Section = styled.div`
  margin-bottom: 2.5rem;
`;

const SectionTitle = styled.h3`
  font-weight: 600;

  padding: 1rem;
  border-radius: 8px 8px 0 0;
  background: linear-gradient(90deg, #cedfe3, #cedfe300);
  font-size: 22px;
  color: #121212;
`;

// Input Grid
const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.5rem;
  padding: 1rem;
  background-color: #f9fafb;
  border-radius: 0 0 8px 8px;
`;

const Input = styled.input`
  padding: 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  width: 100%;
`;

const Select = styled.select`
  padding: 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  width: 100%;
  background: white;
`;

const Label = styled.label`
  font-size: 0.9rem;
  font-weight: 500;
  display: block;
  margin-bottom: 0.25rem;
`;

// Upload
const UploadBox = styled.div`
  border: 1.5px dashed #cbd5e1;
  padding: 2rem;
  text-align: center;
  border-radius: 8px;
  background-color: #f8fafc;
  color: #334155;
  cursor: pointer;
`;

const UploadGrid = styled(Grid)`
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
`;

// Actions
const ActionButtons = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 2rem;
`;

const Button = styled.button<{ primary?: boolean }>`
  background-color: ${({ primary }) => (primary ? "#0d9488" : "white")};
  color: ${({ primary }) => (primary ? "white" : "#0d9488")};
  border: 2px solid #0d9488;
  padding: 0.75rem 2rem;
  border-radius: 6px;
  font-weight: 600;
  cursor: pointer;

  &:hover {
    opacity: 0.9;
  }
`;

const TableWrapper = styled.div`
  margin-top: 1rem;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-size: 0.95rem;
  border-radius: 12px;
  overflow: hidden;

  thead {
    background-color: #f1ecf5;
    color: #374151;
    font-weight: 600;
  }

  th,
  td {
    padding: 1rem;
    text-align: left;
    border-bottom: 1px solid #e5e7eb;
  }

  td {
    color: #000;
  }
`;

const ActionIcon = styled.span<{ color: string }>`
  color: ${({ color }) => color};
  margin-right: 0.75rem;
  font-size: 1rem;
  cursor: pointer;
`;

const AddRowLink = styled.a`
  display: block;
  color: #0d9488;
  font-weight: 600;
  margin-top: 1rem;
  cursor: pointer;
  text-align: right;
  font-size: 0.95rem;

  &:hover {
    text-decoration: underline;
  }
`;

const InvestmentForm = ({ onClickNext }: { onClickNext: () => void }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <FormWrapper>
      <Section>
        <SectionTitle>Registration type</SectionTitle>
        <Grid>
          <div>
            <Label>Registration type*</Label>
            <Select>
              <option>Entrepreneur</option>
              <option>Foreign</option>
            </Select>
          </div>
        </Grid>

        {/* Table starts here */}
        <TableWrapper>
          <Table>
            <thead>
              <tr>
                <th>ISIC Code</th>
                <th>Registration Business Activity</th>
                <th>Classification</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>750021</td>
                <td>Scientific office of veterinary products</td>
                <td>Restricted</td>
                <td>
                  <ActionIcon color="red">🗑</ActionIcon>
                  <ActionIcon color="#0d9488">✎</ActionIcon>
                </td>
              </tr>
              <tr>
                <td>750021</td>
                <td>Scientific office of veterinary products</td>
                <td>Restricted</td>
                <td>
                  <ActionIcon color="red">🗑</ActionIcon>
                  <ActionIcon color="#0d9488">✎</ActionIcon>
                </td>
              </tr>
            </tbody>
          </Table>
          <AddRowLink href="#" onClick={() => setIsModalOpen(true)}>
            + Add Registration Type
          </AddRowLink>
        </TableWrapper>
      </Section>

      <BasicInformationSection />

      {/* Fee Section */}
      <Section>
        <SectionTitle>Number of years required to pay the fee</SectionTitle>
        <Grid>
          <div>
            <Label>Required pay the fee*</Label>
            <Select>
              <option>Select years</option>
            </Select>
          </div>
        </Grid>
      </Section>

      {/* Attachments */}
      <AttachmentSection />

      {/* Buttons */}
      <ActionButtons>
        <Button>Back</Button>
        <Button primary onClick={onClickNext}>
          Next
        </Button>
      </ActionButtons>
      {isModalOpen && (
        <RegistrationActivityModal onClose={() => setIsModalOpen(false)} />
      )}
    </FormWrapper>
  );
};

export default InvestmentForm;
