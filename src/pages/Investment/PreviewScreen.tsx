import React, { useState } from "react";
import styled from "styled-components";
import SubmitConfirmationModal from "./SubmitConfirmationModal";

const Container = styled.div`
  font-family: Arial, sans-serif;
  padding: 2rem;
  background-color: #ffffff;
`;
const Card = styled.div`
  background: #ffffff;
  border-radius: 12px;
  padding: 32px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.06);
  width: 90%;
  margin: 0 auto;
  border: 1px solid #e5e7eb;
  margin-top: 2rem;
`;

const SectionTitle = styled.h2`
  font-size: 22px;
  font-weight: 600;
  margin-bottom: 1.5rem;
  background: linear-gradient(90deg, #cedfe3, #cedfe300);
  padding: 1rem;
  border-radius: 8px 8px 0 0;
  margin-top: 20px;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
  justify-items: start;
`;

const Field = styled.div`
  display: flex;
  flex-direction: column;
`;

const Label = styled.span`
  color: #888;
  font-size: 0.9rem;
`;

const Value = styled.span`
  font-size: 1rem;
  font-weight: 500;
  color: #222;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 1rem;
`;

const Th = styled.th`
  text-align: left;
  padding: 0.5rem;
  background: #f1ecf3;
  border-bottom: 1px solid #ddd;
  color: #635768;
`;

const Tr = styled.tr`
  color: #121212;
`;

const Td = styled.td`
  padding: 0.5rem;
  border-bottom: 1px solid #eee;
`;

const CheckboxContainer = styled.div`
  display: flex;
  align-items: start;
  margin-bottom: 1rem;
  margin-top: 20px;
`;

const Checkbox = styled.input`
  margin-right: 0.5rem;
  margin-top: 0.2rem;
`;

const Actions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
`;

const Button = styled.button<{ primary?: boolean }>`
  padding: 12px 28px;
  border-radius: 8px;
  font-weight: 600;
  font-size: 14px;
  border: ${(props) => (props.primary ? "none" : "2px solid #0891b2")};
  background: ${(props) => (props.primary ? "#0891b2" : "#ffffff")};
  color: ${(props) => (props.primary ? "#ffffff" : "#0891b2")};
  cursor: pointer;
`;

const PreviewScreen = ({
  onClickBack,
  onClickNext,
}: {
  onClickBack: () => void;
  onClickNext: () => void;
}) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <Container>
      <Card>
        <SectionTitle>Entity Information</SectionTitle>
        <Grid>
          <Field>
            <Label>Registration Type</Label>
            <Value>Entrepreneur</Value>
          </Field>
          <Field>
            <Label>Years to Pay Fee</Label>
            <Value>2 Years</Value>
          </Field>
          <Field>
            <Label>Entity Name</Label>
            <Value>Omar Majid</Value>
          </Field>
          <Field>
            <Label>Entity Name in Arabic</Label>
            <Value>عمر مجيد</Value>
          </Field>
          <Field>
            <Label>Legal Status</Label>
            <Value>Simplified Joint Stock Company</Value>
          </Field>
          <Field>
            <Label>Capital</Label>
            <Value>50,000.00</Value>
          </Field>
          <Field>
            <Label>Email</Label>
            <Value>omarmajid@gmail.com</Value>
          </Field>
          <Field>
            <Label>Mobile Number</Label>
            <Value>+966 546 568 4555</Value>
          </Field>
          <Field>
            <Label>Region</Label>
            <Value>Riyadh</Value>
          </Field>
          <Field>
            <Label>City</Label>
            <Value>Hureimla'a</Value>
          </Field>
          <Field>
            <Label>Expected Amount</Label>
            <Value>Between SAR 1,000,000 – 5,000,000</Value>
          </Field>
          <Field style={{ gridColumn: "1 / -1" }}>
            <Label>Business Activities</Label>
            <Value>
              561030 – Other Activities of fast - food and pizza delivery
              restaurants
            </Value>
          </Field>
        </Grid>

        <SectionTitle>Shareholders</SectionTitle>
        <Table>
          <thead>
            <tr>
              <Th>#</Th>
              <Th>Name</Th>
              <Th>Type</Th>
              <Th>Percentage</Th>
              <Th>Nationality</Th>
              <Th>Legal Status</Th>
            </tr>
          </thead>
          <tbody>
            <Tr>
              <Td>1</Td>
              <Td>Omar Majid</Td>
              <Td>Person</Td>
              <Td>70%</Td>
              <Td>Burundi</Td>
              <Td>Limited Liability Company</Td>
            </Tr>
            <Tr>
              <Td>2</Td>
              <Td>Majid Omar</Td>
              <Td>Organization</Td>
              <Td>10%</Td>
              <Td>Burundi</Td>
              <Td>Limited Liability Company</Td>
            </Tr>
          </tbody>
        </Table>

        <SectionTitle>Contact Person</SectionTitle>
        <Grid>
          <Field>
            <Label>Name</Label>
            <Value>عمر مجيد</Value>
          </Field>
          <Field>
            <Label>Full Name in English</Label>
            <Value>Omar Majid</Value>
          </Field>
          <Field>
            <Label>Identity Number</Label>
            <Value>25133469714545132</Value>
          </Field>
          <Field>
            <Label>Issue Date</Label>
            <Value>Mar 11, 2025</Value>
          </Field>
          <Field>
            <Label>Expiry Date</Label>
            <Value>Mar 11, 2035</Value>
          </Field>
          <Field>
            <Label>Nationality</Label>
            <Value>Burundi</Value>
          </Field>
          <Field>
            <Label>City</Label>
            <Value>Hureimla'a</Value>
          </Field>
          <Field>
            <Label>Country</Label>
            <Value>Saudi Arabia</Value>
          </Field>
          <Field>
            <Label>Mobile</Label>
            <Value>+966 546 568 4555</Value>
          </Field>
          <Field>
            <Label>Email</Label>
            <Value>omarmajid@gmail.com</Value>
          </Field>
        </Grid>

        <CheckboxContainer>
          <Checkbox type="checkbox" defaultChecked />
          <Label>
            I acknowledge reading and agreeing to the terms & conditions and
            Privacy Policy, the validity and accuracy of the data entered...
          </Label>
        </CheckboxContainer>

        <Actions>
          <Button onClick={onClickBack}>Back</Button>
          <Button primary onClick={() => setShowModal(true)}>
            Submit
          </Button>
        </Actions>

        {showModal && (
          <SubmitConfirmationModal
            onClose={() => setShowModal(false)}
            onAgree={() => {}}
          />
        )}
      </Card>
    </Container>
  );
};

export default PreviewScreen;
