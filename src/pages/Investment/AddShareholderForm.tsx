import React from "react";
import styled from "styled-components";

const FormWrapper = styled.div`
  background: #fff;
  border-radius: 12px;
  padding: 32px;
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.08);
  margin-top: 24px;
`;

const FormHeader = styled.h3`
  font-size: 22px;
  font-weight: 600;
  margin-bottom: 1.5rem;
  background: linear-gradient(90deg, #cedfe3, #cedfe300);
  padding: 1rem;
  border-radius: 8px 8px 0 0;
`;

const FieldRow = styled.div`
  display: flex;
  gap: 24px;
  margin-bottom: 20px;

  & > div {
    flex: 1;
  }
`;

const Label = styled.label`
  display: block;
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 6px;
  color: black;

  &::after {
    content: "*";
    color: red;
    margin-left: 4px;
  }
`;

const Input = styled.input`
  width: 100%;
  padding: 12px;
  border: 1px solid #d1d5db;
  border-radius: 8px;
`;

const Select = styled.select`
  width: 100%;
  padding: 12px;
  border: 1px solid #d1d5db;
  border-radius: 8px;
`;

const FileInput = styled.div`
  margin-top: 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  padding: 12px;
`;

const UploadLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const UploadFile = styled.span`
  font-size: 14px;
  color: #0891b2;
`;

const AddShareholderForm = () => {
  return (
    <FormWrapper>
      <FormHeader>#1 – Majid Omar</FormHeader>

      <FieldRow>
        <div>
          <Label>First/Last Name in Arabic</Label>
          <Input placeholder="ماجد" />
        </div>
        <div>
          <Label>Last/Family Name in Arabic</Label>
          <Input placeholder="عمر" />
        </div>
      </FieldRow>

      <FieldRow>
        <div>
          <Label>Full Name in English</Label>
          <Input placeholder="Majid Omar" />
        </div>
        <div>
          <Label>Shares Percentage</Label>
          <Input placeholder="20%" type="text" />
        </div>
      </FieldRow>

      <FieldRow>
        <div>
          <Label>Date of Birth</Label>
          <Input type="text" placeholder="Dhu’l-H. 20, 1446" />
        </div>
        <div>
          <Label>Identity Number</Label>
          <Input placeholder="10234 56789" />
        </div>
      </FieldRow>

      <FieldRow>
        <div>
          <Label>ID Issue Date</Label>
          <Input type="date" />
        </div>
        <div>
          <Label>ID Expiry Date</Label>
          <Input type="date" />
        </div>
      </FieldRow>

      <FieldRow>
        <div>
          <Label>Current Nationality</Label>
          <Select>
            <option>Saudi Arabia</option>
            <option>UAE</option>
          </Select>
        </div>
        <div>
          <Label>Country</Label>
          <Select>
            <option>Saudi Arabia</option>
            <option>UAE</option>
          </Select>
        </div>
      </FieldRow>

      <FieldRow>
        <div>
          <Label>Premium Resident</Label>
          <Input placeholder="Yes" />
        </div>
        <div>
          <Label>Professional License</Label>
          <Select>
            <option>Yes</option>
            <option>No</option>
          </Select>
        </div>
      </FieldRow>

      <FieldRow>
        <div>
          <Label>City</Label>
          <Select>
            <option>Dammam</option>
          </Select>
        </div>
        <div>
          <Label>Place of Birth</Label>
          <Input placeholder="Dammam" />
        </div>
      </FieldRow>

      <div>
        <Label>Professional License</Label>
        <FileInput>
          <UploadLabel>
            📄 <UploadFile>Professional License.pdf (313 KB)</UploadFile>
          </UploadLabel>
          <div>
            <button>⬇️</button>
            <button>🗑️</button>
          </div>
        </FileInput>
      </div>
    </FormWrapper>
  );
};

export default AddShareholderForm;
