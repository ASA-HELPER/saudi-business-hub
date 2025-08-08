import React, { useState } from "react";
import styled from "styled-components";
import checkOn from "../../../assets/images/investment/business/Checkbox_on.svg";
import checkOff from "../../../assets/images/investment/business/Checkbox_off.svg";
import { Division, Group } from "./types";

import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../store/rootReducer";
import {
  resetAfterGroup,
  setGroups,
} from "../../../store/reducers/businessActivitySlice";

const Wrapper = styled.div`
  background-color: white;
  border-radius: 8px;
`;

const Divider = styled.hr`
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
  border-radius: 32px;
  background-color: ${({ selected }) => (selected ? "#00778E" : "#fff")};
  cursor: pointer;
  transition: all 0.2s ease;
  min-width: 280px;
  font-size: 14px;
`;

const Label = styled.span<{ checked: boolean }>`
  font-size: 18px;
  color: ${({ checked }) => (checked ? "#fff" : "#1f2a37")};
  font-weight: 500;
`;

const Content = styled.div`
  padding: 24px;
  color: #1f2a37;
`;

const CheckboxIcon = styled.img`
  width: 24px;
  height: 24px;
  margin-right: 15px;
`;

interface GroupSectionProps {
  selectedDivisions: Division[];
  structureData: {
    groups: Group[];
  } | null;
}

const GroupSection: React.FC<GroupSectionProps> = ({
  selectedDivisions,
  structureData,
}) => {
  const [searchTerm, setSearchTerm] = useState("");

  const dispatch = useDispatch();
  const selectedGroups = useSelector(
    (state: RootState) => state.businessActivity.groups
  );

  const handleToggle = (group: Group) => {
    const isSelected = selectedGroups.some((g) => g.groupid === group.groupid);

    if (isSelected) {
      dispatch(
        setGroups(selectedGroups.filter((g) => g.groupid !== group.groupid))
      );
    } else if (selectedGroups.length < 10) {
      dispatch(setGroups([...selectedGroups, group]));
    }
    dispatch(resetAfterGroup());
  };

  return (
    <Wrapper>
      <Header>
        <Title>
          Choose your Group ({selectedGroups.length}/
          {structureData?.groups?.filter((group) =>
            selectedDivisions.some(
              (division) => division.id === group.division_id
            )
          )?.length || 0}
          )
        </Title>
        <SearchInput
          placeholder="Search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </Header>

      <Content>
        {selectedDivisions.map((division, index) => {
          const relatedGroups = structureData?.groups.filter(
            (g) => g.division_id === division.id
          );

          const filteredGroups = relatedGroups?.filter((group) =>
            group.description.toLowerCase().includes(searchTerm.toLowerCase())
          );

          if (filteredGroups?.length === 0) return null;

          return (
            <div key={division.division_id}>
              <GroupTitle>
                {division.division_id} - {division.description}
              </GroupTitle>

              <CardGrid>
                {filteredGroups?.map((group) => {
                  const isSelected = selectedGroups.some(
                    (g) => g.groupid === group.groupid
                  );
                  return (
                    <Card
                      key={group.groupid}
                      selected={isSelected}
                      onClick={() => handleToggle(group)}
                    >
                      <CheckboxIcon
                        src={isSelected ? checkOn : checkOff}
                        alt={isSelected ? "Selected" : "Not selected"}
                      />
                      <Label checked={isSelected}>
                        {group.groupid} - {group.description}
                      </Label>
                    </Card>
                  );
                })}
              </CardGrid>

              {index < selectedDivisions.length - 1 && <Divider />}
            </div>
          );
        })}
      </Content>
    </Wrapper>
  );
};

export default GroupSection;
