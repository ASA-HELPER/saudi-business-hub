import React, { useState, useMemo } from "react";
import styled from "styled-components";

import checkOn from "../../../assets/images/investment/business/Checkbox_on.svg";
import checkOff from "../../../assets/images/investment/business/Checkbox_off.svg";
import { Division } from "./types";
import {
  resetAfterDivision,
  setDivisions,
} from "../../../store/reducers/businessActivitySlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store";

// Types
interface Section {
  id: number;
  sectionid: string;
  section_id: string;
  description: string;
}

interface StructureData {
  sections: Section[];
  divisions: Division[];
}

// Styled Components
const Wrapper = styled.div`
  background-color: white;
  border-radius: 8px;
`;

const Header = styled.div`
  background-color: #f2f5f6;
  padding: 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 8px 8px 0 0;
`;

const Title = styled.h3`
  font-size: 18px;
  font-weight: 600;
  color: #161616;
  margin: 0;
`;

const SearchInput = styled.input`
  padding: 10px 12px;
  width: 240px;
  font-size: 14px;
  border: 1px solid #cfd4dc;
  border-radius: 6px;
`;

const SubTitle = styled.h4`
  font-size: 18px;
  font-weight: 500;
  color: #161616;
  margin: 16px 0;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
`;

const Card = styled.div<{ selected: boolean }>`
  display: flex;
  align-items: center;
  padding: 16px;
  border: 1px solid ${({ selected }) => (selected ? "#007c92" : "#ccc")};
  border-radius: 32px;
  background-color: ${({ selected }) => (selected ? "#00778E" : "#fff")};
  cursor: pointer;
  transition: all 0.2s ease;
`;

const CheckboxIcon = styled.img`
  width: 24px;
  height: 24px;
  margin-right: 15px;
`;

const Label = styled.span<{ checked: boolean }>`
  font-size: 16px;
  color: ${({ checked }) => (checked ? "#fff" : "#1f2a37")};
  font-weight: 500;
`;

interface DivisionSectionProps {
  selectedSection: Section | null;
  structureData: StructureData | null;
}

const DivisionSection: React.FC<DivisionSectionProps> = ({
  selectedSection,
  structureData,
}) => {
  const [searchTerm, setSearchTerm] = useState("");

  const dispatch = useDispatch();
  const selectedDivisions = useSelector(
    (state: RootState) => state.businessActivity.divisions
  );

  const filteredDivisions = useMemo(() => {
    if (!selectedSection) return [];
    return structureData?.divisions.filter(
      (d) => d.section_id === selectedSection.id
    );
  }, [structureData?.divisions, selectedSection]);

  const handleToggle = (division: Division) => {
    const isSelected = selectedDivisions.some(
      (d) => d.divisionid === division.divisionid
    );

    if (isSelected) {
      dispatch(
        setDivisions(
          selectedDivisions.filter((d) => d.divisionid !== division.divisionid)
        )
      );
    } else if (selectedDivisions.length < 10) {
      dispatch(setDivisions([...selectedDivisions, division]));
    }
    dispatch(resetAfterDivision());
  };

  return (
    <Wrapper>
      <Header>
        <Title>
          Choose your Division ({selectedDivisions.length}/
          {filteredDivisions?.length})
        </Title>
        <SearchInput
          type="text"
          placeholder="Search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </Header>

      <SubTitle>
        {selectedSection
          ? `${selectedSection.sectionid} - ${selectedSection.description}`
          : "Select a Section"}
      </SubTitle>

      <Grid>
        {filteredDivisions &&
          filteredDivisions
            .filter((div) =>
              div.description.toLowerCase().includes(searchTerm.toLowerCase())
            )
            .map((div) => {
              const fullLabel = `${div.divisionid} - ${div.description}`;
              const isSelected = selectedDivisions.some(
                (d) => d.divisionid === div.divisionid
              );
              return (
                <Card
                  key={div.id}
                  selected={isSelected}
                  onClick={() => handleToggle(div)}
                >
                  <CheckboxIcon
                    src={isSelected ? checkOn : checkOff}
                    alt={isSelected ? "Checked" : "Unchecked"}
                  />
                  <Label checked={isSelected}>{fullLabel}</Label>
                </Card>
              );
            })}
      </Grid>
    </Wrapper>
  );
};

export default DivisionSection;
