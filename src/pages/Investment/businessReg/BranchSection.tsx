import React, { useState } from "react";
import styled from "styled-components";
import checkOn from "../../../assets/images/investment/business/Checkbox_on.svg";
import checkOff from "../../../assets/images/investment/business/Checkbox_off.svg";
import { Branch, Class } from "./types";

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store/rootReducer";
import {
  resetAfterBranches,
  setBranches,
} from "../../../store/reducers/businessActivitySlice";
import { selectAppLang } from "../../../store/slices/languageSlice";
import { useTranslation } from "react-i18next";

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
  font-size: 16px;
  font-weight: 600;
  color: #000;
  margin: 0;
`;

const SearchInput = styled.input`
  padding: 10px 16px;
  width: 240px;
  font-size: 14px;
  border: 1px solid #cfd4dc;
  border-radius: 6px;
`;

const GroupTitle = styled.h4`
  font-size: 16px;
  font-weight: 600;
  color: #1f2937;
  margin: 24px 0 8px;
`;

const CardGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
`;

const Card = styled.div<{ selected: boolean }>`
  display: flex;
  align-items: center;
  padding: 12px 16px;
  border: 1px solid ${({ selected }) => (selected ? "#007c92" : "#ccc")};
  border-radius: 999px;
  background-color: ${({ selected }) => (selected ? "#00778E" : "#fff")};
  color: ${({ selected }) => (selected ? "#fff" : "#1f2937")};
  cursor: pointer;
  transition: all 0.2s ease;
  min-width: 280px;
  font-size: 14px;
`;

export const Divider = styled.hr`
  border: none;
  height: 1px;
  width: 100%;
  margin: 24px 0;
  background: linear-gradient(
    to right,
    #d1d5db 0%,
    #d1d5db 120px,
    #d1d5db 120px,
    #d1d5db 100%
  );
  border-radius: 1px;
`;

const CheckboxWrapper = styled.label`
  display: flex;
  align-items: center;
  cursor: pointer;
  margin-right: 12px;
  position: relative;
`;

const Checkbox = styled.input.attrs({ type: "checkbox" })`
  appearance: none;
  -webkit-appearance: none;
  width: 18px;
  height: 18px;
  border: 2px solid #d1d5db;
  border-radius: 4px;
  background-color: white;
  cursor: pointer;
  position: relative;

  &:checked {
    background-color: white;
    //border-color: #10b981; /* green border when checked */
  }

  &:checked::after {
    content: "✓";
    color: #10b981; /* green tick */
    font-size: 14px;
    position: absolute;
    top: -2px;
    left: 3px;
  }
`;
const CheckboxIcon = styled.img`
  width: 24px;
  height: 24px;
  margin-right: 15px;
  margin-left: 15px;
`;

const Label = styled.span<{ checked: boolean }>`
  font-size: 18px;
  color: ${({ checked }) => (checked ? "#fff" : "#1f2a37")};
  font-weight: 500;
`;
const Content = styled.div`
  padding: 24px;
`;

interface BranchSectionProps {
  structureData: {
    branch: Branch[];
  };
}

const BranchSection: React.FC<BranchSectionProps> = ({ structureData }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const selectedLanguage = useSelector(selectAppLang);
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const selectedClasses = useSelector(
    (state: RootState) => state.businessActivity.classes
  );
  const selectedBranches = useSelector(
    (state: RootState) => state.businessActivity.branches
  );

  // ✅ Shared filtering logic
  const filterBranches = (branch: Branch) => {
    const matchesClass = selectedClasses.some(
      (cls) => cls.id === branch.class_id
    );
    const matchesSearch =
      selectedLanguage === "ar"
        ? branch.description_ar.toLowerCase().includes(searchTerm.toLowerCase())
        : branch.description_en
            .toLowerCase()
            .includes(searchTerm.toLowerCase());

    return matchesClass && matchesSearch;
  };

  const handleToggle = (branch: Branch) => {
    const exists = selectedBranches.some((b) => b.id === branch.id);
    if (exists) {
      dispatch(setBranches(selectedBranches.filter((b) => b.id !== branch.id)));
    } else if (selectedBranches.length < 10) {
      dispatch(setBranches([...selectedBranches, branch]));
    }
    dispatch(resetAfterBranches());
  };

  const totalFilteredCount = structureData.branch.filter(filterBranches).length;

  return (
    <Wrapper>
      <Header>
        <Title>
          {t("businessActivity.chooseBranch")} ({selectedBranches.length}/
          {totalFilteredCount})
        </Title>
        <SearchInput
          placeholder={t("businessActivity.search")}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </Header>

      <Content>
        {selectedClasses.map((cls, index) => {
          const branches = structureData.branch.filter(
            (b) => b.class_id === cls.id && filterBranches(b)
          );

          if (branches.length === 0) return null;
          const isLast = index === selectedClasses.length - 1;

          return (
            <div key={cls.id}>
              <GroupTitle>
                {selectedLanguage === "ar"
                  ? cls.description_ar
                  : cls.description_en}
              </GroupTitle>
              <CardGrid>
                {branches.map((branch) => {
                  const isSelected = selectedBranches.some(
                    (b) => b.id === branch.id
                  );
                  return (
                    <Card
                      key={branch.id}
                      selected={isSelected}
                      onClick={() => handleToggle(branch)}
                    >
                      <CheckboxIcon
                        src={isSelected ? checkOn : checkOff}
                        alt={isSelected ? "Selected" : "Not selected"}
                      />
                      <Label checked={isSelected}>
                        {`${branch.branchid} - ${
                          selectedLanguage === "ar"
                            ? branch.description_ar
                            : branch.description_en
                        }`}
                      </Label>
                    </Card>
                  );
                })}
              </CardGrid>
              {!isLast && <Divider />}
            </div>
          );
        })}
      </Content>
    </Wrapper>
  );
};

export default BranchSection;
