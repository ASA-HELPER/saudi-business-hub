import React, { useState } from "react";
import styled from "styled-components";
import checkOn from "../../../assets/images/investment/business/Checkbox_on.svg";
import checkOff from "../../../assets/images/investment/business/Checkbox_off.svg";
import { Class, Group } from "./types";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store/rootReducer";
import {
  resetAfterClasses,
  setClasses,
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
  border-radius: 999px;
  background-color: ${({ selected }) => (selected ? "#00778E" : "#fff")};
  color: ${({ selected }) => (selected ? "#fff" : "#1f2937")};
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
`;

const CheckboxIcon = styled.img`
  width: 24px;
  height: 24px;
  margin-right: 15px;
`;

interface ClassSectionProps {
  structureData: {
    class: Class[];
  };
}

const ClassSection: React.FC<ClassSectionProps> = ({ structureData }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const dispatch = useDispatch();
  const selectedGroups = useSelector(
    (state: RootState) => state.businessActivity.groups
  );
  const selectedClasses = useSelector(
    (state: RootState) => state.businessActivity.classes
  );

  const handleToggle = (classItem: Class) => {
    const exists = selectedClasses.some((c) => c.id === classItem.id);
    if (exists) {
      dispatch(
        setClasses(selectedClasses.filter((c) => c.id !== classItem.id))
      );
    } else if (selectedClasses.length < 10) {
      dispatch(setClasses([...selectedClasses, classItem]));
    }
    dispatch(resetAfterClasses());
  };

  return (
    <Wrapper>
      <Header>
        <Title>
          Choose your Class ({selectedClasses.length}/
          {
            structureData.class.filter(
              (cls) =>
                selectedGroups.some((group) => group.id === cls.group_id) &&
                cls.description.toLowerCase().includes(searchTerm.toLowerCase())
            ).length
          }
          )
        </Title>
        <SearchInput
          placeholder="Search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </Header>

      <Content>
        {selectedGroups.map((group, index) => {
          const groupClasses = structureData.class.filter(
            (cls) =>
              cls.group_id === group.id &&
              cls.description.toLowerCase().includes(searchTerm.toLowerCase())
          );

          if (groupClasses.length === 0) return null;

          const isLast = index === selectedGroups.length - 1;

          return (
            <div key={group.id}>
              <GroupTitle>{group.description}</GroupTitle>
              <CardGrid>
                {groupClasses.map((item) => {
                  const isSelected = selectedClasses.some(
                    (c) => c.id === item.id
                  );
                  return (
                    <Card
                      key={item.id}
                      selected={isSelected}
                      onClick={() => handleToggle(item)}
                    >
                      <CheckboxIcon
                        src={isSelected ? checkOn : checkOff}
                        alt={isSelected ? "Selected" : "Not selected"}
                      />
                      <Label checked={isSelected}>
                        {item.classid + " - " + item.description}
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

export default ClassSection;
