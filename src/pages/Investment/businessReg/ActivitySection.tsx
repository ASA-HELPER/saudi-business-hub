import React, { useState } from "react";
import styled from "styled-components";
import checkOn from "../../../assets/images/investment/business/Checkbox_on.svg";
import checkOff from "../../../assets/images/investment/business/Checkbox_off.svg";
import { Activity, Branch } from "./types";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store/rootReducer";
import { setActivities } from "../../../store/reducers/businessActivitySlice";
import { selectAppLang } from "../../../store/slices/languageSlice";

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

const Label = styled.span<{ checked: boolean }>`
  font-size: 18px;
  color: ${({ checked }) => (checked ? "#fff" : "#1f2a37")};
  font-weight: 500;
`;

const Content = styled.div`
  padding: 24px;
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

const CheckboxIcon = styled.img`
  width: 24px;
  height: 24px;
  margin-right: 15px;
`;

interface ActivitySectionProps {
  structureData: {
    activities: Activity[];
  };
}

const ActivitySection: React.FC<ActivitySectionProps> = ({ structureData }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const selectedLanguage = useSelector(selectAppLang);

  const dispatch = useDispatch();
  const selectedBranches = useSelector(
    (state: RootState) => state.businessActivity.branches
  );
  const selectedActivities = useSelector(
    (state: RootState) => state.businessActivity.activities
  );

  const handleToggle = (activity: Activity) => {
    const exists = selectedActivities.some(
      (a) => a.activityid === activity.activityid
    );
    if (exists) {
      dispatch(
        setActivities(
          selectedActivities.filter((a) => a.activityid !== activity.activityid)
        )
      );
    } else if (selectedActivities.length < 10) {
      dispatch(setActivities([...selectedActivities, activity]));
    }
  };

  return (
    <Wrapper>
      <Header>
        <Title>
          Choose your Activity ({selectedActivities.length}/
          {
            structureData.activities.filter((a) =>
              selectedBranches.some((branch) => branch.id === a.branch_id) &&
              selectedLanguage == "ar"
                ? a.description_ar
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase())
                : a.description_en
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase())
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
        {selectedBranches.map((branch, index) => {
          const branchActivities = structureData.activities.filter((a) =>
            a.branch_id === branch.id && selectedLanguage == "ar"
              ? a.description_ar
                  .toLowerCase()
                  .includes(searchTerm.toLowerCase())
              : a.description_en
                  .toLowerCase()
                  .includes(searchTerm.toLowerCase())
          );

          if (branchActivities.length === 0) return null;

          const isLast = index === selectedBranches.length - 1;

          return (
            <div key={branch.id}>
              <GroupTitle>{branch.description}</GroupTitle>
              <CardGrid>
                {branchActivities.map((activity) => {
                  const isSelected = selectedActivities.some(
                    (a) => a.activityid === activity.activityid
                  );
                  return (
                    <Card
                      key={activity.id}
                      selected={isSelected}
                      onClick={() => handleToggle(activity)}
                    >
                      <CheckboxIcon
                        src={isSelected ? checkOn : checkOff}
                        alt={isSelected ? "Selected" : "Not selected"}
                      />
                      <Label checked={isSelected}>
                        {activity.activityid + " - " + selectedLanguage == "ar"
                          ? activity.description_ar
                          : activity.description_en}
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

export default ActivitySection;
