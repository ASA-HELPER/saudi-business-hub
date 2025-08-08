import React, { useState } from "react";
import styled from "styled-components";
import SectionTitle from "../../components/common/SectionTitle";
import editIcon from "../../assets/images/investment/edit_icon.svg";
import deleteIcon from "../../assets/images/investment/delete_icon.svg";

type Branch = {
  id: number;
  companyName: string;
  country: string;
};

type GlobalInformationSectionProps = {
  formData: {
    global_revenue: string;
    global_employees: string;
    global_capital: string;
    global_assets: string;
  };
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
};

const GlobalInformationSection: React.FC<GlobalInformationSectionProps> = ({
  formData,
  handleChange
}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [branches, setBranches] = useState<Branch[]>([
    { id: 1, companyName: "Test", country: "Saudi Arabia" }
  ]);
  const [newBranch, setNewBranch] = useState<Omit<Branch, 'id'>>({
    companyName: "",
    country: ""
  });

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    if (newBranch.companyName && newBranch.country) {
      setBranches([...branches, { ...newBranch, id: branches.length + 1 }]);
      setNewBranch({ companyName: "", country: "" });
      setIsModalVisible(false);
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setNewBranch({ companyName: "", country: "" });
  };

  const handleBranchChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewBranch(prev => ({ ...prev, [name]: value }));
  };

  const handleDeleteBranch = (id: number) => {
    setBranches(branches.filter(branch => branch.id !== id));
  };
  return (
    <Section>
      <SectionTitle>Company Global Information</SectionTitle>
      
      <Row>
        <InputWrapper>
          <Label>
            <span>*</span> Multinational Corporation subsidiaries/branches
          </Label>
          <Select
            name="global_presence"
            onChange={handleChange}
          >
            <option value="<5">Less than 5 Countries</option>
            <option value="5-10">5-10 Countries</option>
            <option value=">10">More than 10 Countries</option>
          </Select>
        </InputWrapper>
        <InputWrapper>
          <Label>
            <span>*</span> Capital
          </Label>
          <Select
            name="global_capital"
            onChange={handleChange}
          >
            <option value="<100M">Less than 100 Million SAR</option>
            <option value="100M-375M">100-375 Million SAR</option>
            <option value=">375M">Greater than 375 Million SAR</option>
          </Select>
        </InputWrapper>
      </Row>
      
      <Row>
        <InputWrapper>
          <Label>
            <span>*</span> Last year revenue
          </Label>
          <Select
            name="global_revenue"
            onChange={handleChange}
          >
            <option value="<1B">Less than 1 Billion SAR</option>
            <option value="1B-40B">1-40 Billion SAR</option>
            <option value=">40B">Greater than 40 Billion SAR</option>
          </Select>
        </InputWrapper>
        <InputWrapper>
          <Label>
            <span>*</span> Last year Assets
          </Label>
          <Select
            name="global_assets"
            onChange={handleChange}
          >
            <option value="<500M">Less than 500 Million SAR</option>
            <option value="500M-750M">500-750 Million SAR</option>
            <option value=">750M">Greater than 750 Million SAR</option>
          </Select>
        </InputWrapper>
      </Row>
      
      <Row>
        <InputWrapper>
          <Label>
            <span>*</span> Number of Employees
          </Label>
          <Select
            name="global_employees"
            onChange={handleChange}
          >
            <option value="<100">Less than 100</option>
            <option value="100-10000">100-10,000</option>
            <option value=">10000">Greater than 10,000</option>
          </Select>
        </InputWrapper>
      </Row>
      
      <Row>
        <Label>Mulitination Corporation Branches</Label>
        <Table>
          <thead>
            <tr>
              <Th style={{ width: "10%" }}>#</Th>
              <Th style={{ width: "30%" }}>Company Name</Th>
              <Th style={{ width: "30%" }}>Country</Th>
              <Th style={{ width: "30%" }}>Actions</Th>
            </tr>
          </thead>
          <tbody>
            {branches.map((branch, index) => (
              <tr key={branch.id}>
                <Td>{String(index + 1).padStart(2, '0')}</Td>
                <Td>{branch.companyName}</Td>
                <Td>{branch.country}</Td>
                <Td>
                  <Actions>
                    <ActionImage src={editIcon} alt="Edit" />
                    <ActionImage 
                      src={deleteIcon} 
                      alt="Delete" 
                      onClick={() => handleDeleteBranch(branch.id)} 
                    />
                  </Actions>
                </Td>
              </tr>
            ))}
            <tr>
              <Td colSpan={4}>
                <ButtonWrapper>
                <AddNewButton onClick={showModal}>
                  + Add New
                </AddNewButton>
                </ButtonWrapper>
              </Td>
            </tr>
          </tbody>ns
        </Table>
      </Row>

      {/* Add Branch Modal */}
      {isModalVisible && (
        <ModalOverlay>
          <ModalContainer>
            <ModalHeader>Add New Branch</ModalHeader>
            <ModalBody>
              <FormGroup>
                <FormLabel>Company Name</FormLabel>
                <FormInput
                  type="text"
                  name="companyName"
                  value={newBranch.companyName}
                  onChange={handleBranchChange}
                  placeholder="Enter Company Name"
                />
              </FormGroup>
              <FormGroup>
                <FormLabel>Country</FormLabel>
                <FormSelect
                  name="country"
                  value={newBranch.country}
                  onChange={handleBranchChange}
                >
                  <option value="">Select Country</option>
                  <option value="Saudi Arabia">Saudi Arabia</option>
                  <option value="UAE">UAE</option>
                  <option value="Qatar">Qatar</option>
                  {/* Add more countries as needed */}
                </FormSelect>
              </FormGroup>
            </ModalBody>
            <ModalFooter>
              <CancelButton onClick={handleCancel}>Cancel</CancelButton>
              <AddButton onClick={handleOk}>Add</AddButton>
            </ModalFooter>
          </ModalContainer>
        </ModalOverlay>
      )}
    </Section>

  );
};
const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 16px;
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContainer = styled.div`
  background: white;
  border-radius: 8px;
  width: 500px;
  max-width: 90%;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
`;

const ModalHeader = styled.div`
  padding: 16px 24px;
  border-bottom: 1px solid #e0e0e0;
  font-size: 18px;
  font-weight: 600;
`;

const ModalBody = styled.div`
  padding: 24px;
`;

const ModalFooter = styled.div`
  padding: 16px 24px;
  border-top: 1px solid #e0e0e0;
  display: flex;
  justify-content: flex-end;
  gap: 12px;
`;

const FormGroup = styled.div`
  margin-bottom: 16px;
`;

const FormLabel = styled.label`
  display: block;
  margin-bottom: 8px;
  font-weight: 500;
`;

const FormInput = styled.input`
  width: 100%;
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
`;

const FormSelect = styled.select`
  width: 100%;
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
  height: 36px;
`;

const CancelButton = styled.button`
  padding: 8px 16px;
  background: #f5f5f5;
  border: 1px solid #ddd;
  border-radius: 4px;
  cursor: pointer;
`;

const AddButton = styled.button`
  padding: 8px 16px;
  background: #007c92;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

const Section = styled.div`
  margin-bottom: 32px;
`;

const Row = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 24px;
  margin-bottom: 24px;
`;

const InputWrapper = styled.div`
  flex: 1;
  min-width: 280px;
  min-height: 50px;
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin-bottom: 20px;
`;

const Label = styled.label`
  font-weight: 400;
  margin-bottom: 8px;
  font-size: 14px;
  color: #384250;

  span {
    color: red;
    margin-left: 2px;
  }
`;

const Select = styled.select`
  border: none;
  border-bottom: 2px solid #cfd4dc;
  background: transparent;
  font-size: 14px;
  color: #1f2937;
  width: 100%;
  height: 42px;
  padding: 0 8px;
  transition: border-color 0.3s ease;

  &:focus {
    outline: none;
    border-bottom-color: #007c92;
  }

  option[disabled][hidden] {
    color: #94a3b8 !important;
  }

  &:invalid {
    color: #94a3b8;
  }
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
  cursor: pointer;
`;

const AddNewButton = styled.button`
  margin-top: 16px;
  padding: 8px 16px;
  background: #007c92;
  color: white;
  border: none;
  border-radius: 4px;
  font-weight: 500;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 8px;
`;

export default GlobalInformationSection;