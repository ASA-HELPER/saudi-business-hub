import React, { useState } from "react";
import styled from "styled-components";
import editIcon from "../../assets/images/edit-icon.svg";
import closeIcon from "../../assets/images/close-circle.svg";
import searchIcon from "../../assets/images/search-normal.svg";

const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.4);
  z-index: 1000;
  overflow-y: auto;
`;

const ModalContainer = styled.div`
  background: white;
  width: 90%;
  max-width: 1100px;
  margin: 5rem auto;
  border-radius: 16px;
  overflow: hidden;
`;

const Header = styled.div`
  padding: 1.5rem 2rem;
  background: linear-gradient(90deg, #d6e6ea, #d6e6ea00);
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  margin: 2rem;
  border-radius: 12px;
`;

const Title = styled.h2`
  font-size: 24px;
  font-weight: bold;
  color: #1e293b;
`;

const CloseButton = styled.button`
  font-size: 24px;
  background: none;
  border: none;
  cursor: pointer;
`;

const TopRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  flex-wrap: wrap;
`;

const RegistrationType = styled.p`
  font-weight: 400;
  margin: 0;
  color: #555555;
  font-size: 20px;
  span {
    color: #00778e;
    font-weight: 600;
  }
`;

const SearchWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  width: 250px;

  @media (max-width: 768px) {
    width: 100%;
    margin-top: 1rem;
  }
`;

const SearchIcon = styled.img`
  position: absolute;
  left: 12px;
  width: 16px;
  height: 16px;
  opacity: 0.6;
`;

const SearchInput = styled.input`
  border: 1px solid #cbd5e1;
  border-radius: 8px;
  padding: 0.5rem 1rem 0.5rem 2.2rem; // extra left padding for icon
  width: 100%;

  &::placeholder {
    color: #94a3b8;
  }
`;

const Stepper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 1rem 2rem;
  position: relative;
`;

const Step = styled.div<{ status: "complete" | "active" | "upcoming" }>`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;

  span:first-child {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    background-color: ${({ status }) =>
      status === "complete"
        ? "#00778E"
        : status === "active"
        ? "#fff"
        : "#e5e7eb"};
    color: ${({ status }) =>
      status === "complete"
        ? "#fff"
        : status === "active"
        ? "#00778E"
        : "#6b7280"};
    border: ${({ status }) =>
      status === "active" ? "2px solid #00778E" : "2px solid transparent"};
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    margin-bottom: 0.5rem;
    z-index: 1;
  }

  span:last-child {
    font-size: 14px;
    color: ${({ status }) =>
      status === "complete"
        ? "#9333ea"
        : status === "active"
        ? "#111827"
        : "#6b7280"};
    font-weight: ${({ status }) => (status === "active" ? 600 : 400)};
  }

  &:not(:last-child)::after {
    content: "";
    position: absolute;
    top: 16px;
    right: -50%;
    width: 100%;
    height: 2px;
    background-color: #e2e8f0;
    z-index: 0;
  }

  &:not(:first-child)::before {
    content: "";
    position: absolute;
    top: 16px;
    left: -50%;
    width: 100%;
    height: 2px;
    background-color: #e2e8f0;
    z-index: 0;
  }
`;

const Content = styled.div`
  padding: 2rem;
`;

const SectionList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
`;

const SectionItem = styled.button<{ selected: boolean }>`
  border: 2px solid #9333ea;
  border-radius: 2rem;
  padding: 1rem 1.5rem;
  font-weight: 600;
  background: ${({ selected }) =>
    selected ? "linear-gradient(to right, #9333ea, #7c3aed)" : "transparent"};
  color: ${({ selected }) => (selected ? "white" : "#000")};
  cursor: pointer;
  transition: 0.3s ease;

  &:hover {
    opacity: 0.95;
  }
`;

const Footer = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 1.5rem 2rem;
  gap: 1rem;
`;

const Button = styled.button<{ primary?: boolean; disabled?: boolean }>`
  padding: 0.8rem 2rem;
  border-radius: 6px;
  font-weight: 600;
  border: ${({ primary }) => (primary ? "none" : "2px solid #007c91")};
  background-color: ${({ primary }) => (primary ? "#007c91" : "transparent")};
  color: ${({ primary }) => (primary ? "white" : "#007c91")};
  cursor: pointer;
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
  pointer-events: ${({ disabled }) => (disabled ? "none" : "auto")};
`;

const SelectionBox = styled.div`
  border: 2px solid #824b97;
  border-radius: 30px;
  padding: 1rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  width: fit-content;
  margin-bottom: 1rem;
  color: black;
  cursor: pointer;
`;

const SelectionScroll = styled.div`
  display: flex;
  gap: 1.5rem;
  overflow-x: auto;
  padding-bottom: 1rem;
  margin-top: 20px;

  scrollbar-width: none;
  & > div {
    flex: 0 0 auto;
    //min-width: 250px;
  }

  /* Optional: hide scrollbar on Webkit */
  &::-webkit-scrollbar {
    height: 6px;
  }
  &::-webkit-scrollbar-thumb {
    background: #d1d5db;
    border-radius: 3px;
  }
`;

export const CloseImage = styled.img`
  height: 30px;
  width: 30px;
`;

export const StepLable = styled.span`
  color: #d1d5db;
  font-size: 18px;
  font-weight: 500;
`;

const HorizontalLine = styled.hr`
  border: none;
  border-top: 1px solid #dcdcdc;
  margin: 1rem 0;
`;

const steps = ["Section", "Division", "Group", "Class", "Branch", "Activity"];

// Dummy data for each step (mock as needed)
const dummyStepsData = [
  ["A - Agriculture", "B - Mining", "C - Manufacturing", "D - Electricity"],
  ["10 - Food manufacturing", "11 - Beverage manufacturing"],
  ["101 - Meat processing", "102 - Seafood processing"],
  ["1010 - Processing", "1020 - Packaging"],
  ["10101 - Local market", "10102 - Export"],
  ["Final business activity 1", "Final business activity 2"],
];

const RegistrationActivityModal: React.FC<{ onClose: () => void }> = ({
  onClose,
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [search, setSearch] = useState("");

  const handleNext = () => {
    if (!selectedItems[currentStep]) return;
    if (currentStep < steps.length - 1) setCurrentStep(currentStep + 1);
  };

  const handleSelect = (item: string) => {
    const updated = [...selectedItems];
    updated[currentStep] = item;
    setSelectedItems(updated);
  };

  const getStepStatus = (i: number) => {
    if (i < currentStep) return "complete";
    if (i === currentStep) return "active";
    return "upcoming";
  };

  const currentOptions = dummyStepsData[currentStep] || [];
  const filteredOptions = currentOptions.filter((item) =>
    item.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <ModalOverlay>
      <ModalContainer>
        <Header>
          <Title>REGISTRATION BUSINESS ACTIVITIES</Title>
          <CloseButton onClick={onClose}>
            <CloseImage src={closeIcon} alt="closeIcon" />
          </CloseButton>
        </Header>
        <TopRow>
          <RegistrationType>
            Registration Type: <span>First: Terms of Use:</span>
          </RegistrationType>
          <SearchWrapper>
            <SearchIcon src={searchIcon} alt="Search" />
            <SearchInput
              placeholder="Explore here..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </SearchWrapper>
        </TopRow>
        <Stepper>
          {steps.map((label, i) => (
            <Step key={i} status={getStepStatus(i)}>
              <span>{i + 1}</span>
              <StepLable>{label}</StepLable>
            </Step>
          ))}
        </Stepper>
        <Content>
          {currentStep != 0 && (
            <p
              style={{
                fontWeight: 600,
                color: "#121212",
                fontSize: 20,
                marginBottom: 10,
              }}
            >
              Your selection
            </p>
          )}
          <SelectionScroll>
            {selectedItems.slice(0, currentStep).map((item, index) => (
              <div key={index}>
                <p style={{ fontSize: 16, color: "#121212", marginBottom: 10 }}>
                  {steps[index]}
                </p>
                <SelectionBox onClick={() => setCurrentStep(index)}>
                  {item}
                  <img
                    src={editIcon}
                    alt="Edit"
                    width={16}
                    height={16}
                    style={{ cursor: "pointer" }}
                  />
                </SelectionBox>
              </div>
            ))}
          </SelectionScroll>

          {currentStep != 0 && <HorizontalLine />}

          <h4
            style={{
              fontWeight: 600,
              marginBottom: "1rem",
              color: "#121212",
              fontSize: 20,
              marginTop: currentStep == 0 ? 0 : 30,
            }}
          >
            Please choose your {steps[currentStep]}
          </h4>
          <SectionList>
            {filteredOptions.map((item) => (
              <SectionItem
                key={item}
                selected={selectedItems[currentStep] === item}
                onClick={() => handleSelect(item)}
              >
                {item}
              </SectionItem>
            ))}
          </SectionList>
        </Content>
        <Footer>
          <Button onClick={onClose}>Cancel</Button>
          <Button
            primary
            onClick={handleNext}
            disabled={!selectedItems[currentStep]}
          >
            Next
          </Button>
        </Footer>
      </ModalContainer>
    </ModalOverlay>
  );
};

export default RegistrationActivityModal;
