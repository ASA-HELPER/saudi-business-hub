import React, { useState } from "react";
import styled from "styled-components";
import AddShareholderModal from "./AddShareholderModal";
import AddShareholderForm from "./AddShareholderForm";

const Wrapper = styled.div`
  background: white;
  padding: 2rem;
  margin: 2rem auto;
  max-width: 1200px;
  border-radius: 12px;
  border: 1px solid #e5e7eb;
`;

const Header = styled.h3`
  font-size: 22px;
  font-weight: 600;
  margin-bottom: 1.5rem;
  background: linear-gradient(90deg, #cedfe3, #cedfe300);
  padding: 1rem;
  border-radius: 8px 8px 0 0;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  border-radius: 12px;
  overflow: hidden;
  font-size: 0.95rem;

  thead {
    background-color: #f1ecf5;
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
  font-size: 1rem;
  margin-right: 1rem;
  cursor: pointer;
`;

const AddLink = styled.a`
  display: block;
  text-align: right;
  font-weight: 600;
  color: #0d9488;
  margin-top: 1rem;
  cursor: pointer;
  font-size: 0.95rem;

  &:hover {
    text-decoration: underline;
  }
`;

const Note = styled.p`
  color: #6b7280;
  margin-top: 1rem;
  font-size: 0.9rem;

  span {
    font-weight: bold;
    color: #000;
  }
`;

const ButtonRow = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 2rem;
  gap: 1rem;
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

const HorizontalLine = styled.hr`
  border: none;
  border-top: 1px solid #dcdcdc;
  margin: 1rem 0;
  margin-top: 20px;
`;

const ShareholderSection = ({
  onClickBack,
  onClickNext,
}: {
  onClickBack: () => void;
  onClickNext: () => void;
}) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <Wrapper>
      <Header>New Shareholder</Header>
      <Table>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Type</th>
            <th>Percentage</th>
            <th>Nationality</th>
            <th>Legal Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>
              <strong>Omar Majid</strong>
            </td>
            <td>Person</td>
            <td>70%</td>
            <td>Burundi</td>
            <td>Limited Liability Company</td>
            <td>
              <ActionIcon color="red">🗑</ActionIcon>
              <ActionIcon color="#0d9488">✎</ActionIcon>
            </td>
          </tr>
        </tbody>
      </Table>

      <AddLink onClick={() => setShowModal(true)} href="#">
        + Add Shareholder
      </AddLink>
      <Note>
        <span>Note:</span> Only 30% is available for adding shareholders.
      </Note>
      <HorizontalLine />
      <AddShareholderForm />
      <ButtonRow>
        <Button onClick={onClickBack}>Back</Button>
        <Button primary onClick={onClickNext}>
          Next
        </Button>
      </ButtonRow>
      {/* {showModal && <AddShareholderModal onClose={() => setShowModal(false)} />} */}
    </Wrapper>
  );
};

export default ShareholderSection;
