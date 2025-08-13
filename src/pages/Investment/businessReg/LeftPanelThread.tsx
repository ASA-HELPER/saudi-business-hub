import React from "react";
import styled from "styled-components";
import EmptyIllustration from "../../../assets/images/investment/business/empty_state_icon.svg";
import EditImg from "../../../assets/images/investment/business/edit-icon.svg";
import { Activity, Branch, Class, Division, Group } from "./types";
import { useSelector } from "react-redux";
import { selectAppLang } from "../../../store/slices/languageSlice";

interface Props {
  selectedSection: string | null;
  selectedDivisions: Division[];
  selectedGroups: Group[];
  selectedClasses: Class[];
  selectedBranches: Branch[];
  selectedActivities: Activity[];
  editSection: () => void;
  editDivision: () => void;
  editGroup: () => void;
  editClass: () => void;
  editBranch: () => void;
  editActivity: () => void;
}

const LeftPanelThread: React.FC<Props> = ({
  selectedSection,
  selectedDivisions,
  selectedGroups,
  selectedClasses,
  selectedBranches,
  selectedActivities,
  editSection,
  editDivision,
  editGroup,
  editClass,
  editBranch,
  editActivity,
}) => {
  const selectedLanguage = useSelector(selectAppLang);

  const hasHierarchy =
    selectedDivisions.length > 0 ||
    selectedGroups.length > 0 ||
    selectedClasses.length > 0 ||
    selectedBranches.length > 0 ||
    selectedActivities.length > 0;

  return (
    <PanelContainer>
      <PanelHeader>
        <SectionTitle>Sections</SectionTitle>
        <EditIcon>
          <img src={EditImg} alt="edit" onClick={editSection} />
        </EditIcon>
      </PanelHeader>

      <LeftPanelScrollArea>
        {selectedSection ? (
          <>
            <SelectedTag>{selectedSection}</SelectedTag>

            {hasHierarchy ? (
              <ThreadBlock>
                <Level>
                  <ThreadHeader>
                    <LevelLabel>Divisions</LevelLabel>
                    <EditIcon>
                      <img
                        src={EditImg}
                        alt="edit"
                        onClick={editDivision}
                        width={16}
                        height={16}
                      />
                    </EditIcon>
                  </ThreadHeader>
                  {selectedDivisions.map((div, idx) => (
                    <Node key={`division-${div.divisionid}`}>
                      {div.divisionid + "  " + selectedLanguage == "ar"
                        ? div.description_ar
                        : div.description_en}
                    </Node>
                  ))}
                </Level>

                {selectedGroups.length > 0 && (
                  <Level indent={1}>
                    <ThreadHeader>
                      <LevelLabel>Groups</LevelLabel>
                      <EditIcon>
                        <img
                          src={EditImg}
                          alt="edit"
                          onClick={editGroup}
                          width={16}
                          height={16}
                        />
                      </EditIcon>
                    </ThreadHeader>
                    {selectedGroups.map((group, idx) => (
                      <Node key={`group-${group.groupid}`}>
                        {group.groupid + "  " + selectedLanguage == "ar"
                          ? group.description_ar
                          : group.description_en}
                      </Node>
                    ))}
                  </Level>
                )}

                {selectedClasses.length > 0 && (
                  <Level indent={2}>
                    <ThreadHeader>
                      <LevelLabel>Classes</LevelLabel>
                      <EditIcon>
                        <img
                          src={EditImg}
                          alt="edit"
                          onClick={editClass}
                          width={16}
                          height={16}
                        />
                      </EditIcon>
                    </ThreadHeader>
                    {selectedClasses.map((cls, idx) => (
                      <Node key={`class-${cls.classid}`}>
                        {cls.classid + "  " + selectedLanguage == "ar"
                          ? cls.description_ar
                          : cls.description_en}
                      </Node>
                    ))}
                  </Level>
                )}

                {selectedBranches.length > 0 && (
                  <Level indent={3}>
                    <ThreadHeader>
                      <LevelLabel>Branches</LevelLabel>
                      <EditIcon>
                        <img
                          src={EditImg}
                          alt="edit"
                          onClick={editBranch}
                          width={16}
                          height={16}
                        />
                      </EditIcon>
                    </ThreadHeader>
                    {selectedBranches.map((branch, idx) => (
                      <Node key={`branch-${branch.branchid}`}>
                        {branch.branchid + "  " + selectedLanguage == "ar"
                          ? branch.description_ar
                          : branch.description_en}
                      </Node>
                    ))}
                  </Level>
                )}

                {selectedActivities.length > 0 && (
                  <Level indent={4}>
                    <ThreadHeader>
                      <LevelLabel>Activities</LevelLabel>
                      <EditIcon>
                        <img
                          src={EditImg}
                          alt="edit"
                          onClick={editActivity}
                          width={16}
                          height={16}
                        />
                      </EditIcon>
                    </ThreadHeader>
                    {selectedActivities.map((act, idx) => (
                      <Node key={`activity-${act.activityid}`}>
                        {act.activityid + "  " + selectedLanguage == "ar"
                          ? act.description_ar
                          : act.description_en}
                      </Node>
                    ))}
                  </Level>
                )}
              </ThreadBlock>
            ) : null}
          </>
        ) : (
          <EmptyState>
            <EmptyIcon src={EmptyIllustration} />
            <EmptyText>There is no records to display.</EmptyText>
            <EmptySubtext>Select your section to get started.</EmptySubtext>
          </EmptyState>
        )}
      </LeftPanelScrollArea>
    </PanelContainer>
  );
};

export default LeftPanelThread;

const PanelContainer = styled.div`
  width: 30%;
  background-color: #ffffff;
  border-radius: 12px;
  border: 1px solid #e5e7eb;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  position: relative;
`;

const PanelHeader = styled.div`
  background-color: #f2f5f6;
  padding: 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 10px;
`;

const ThreadHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  //background-color: #f2f5f6;
`;

const SectionTitle = styled.h3`
  font-size: 16px;
  font-weight: 600;
  margin: 0;
  color: #000;
`;

const EditIcon = styled.div`
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: #f1f5f9;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  cursor: pointer;
`;

const ThreadEditIcon = styled.div`
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: #f1f5f9;
  display: flex;
  align-items: center;
  justify-content: center;
  //font-size: 14px;
  cursor: pointer;
`;

const LeftPanelScrollArea = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 16px;
`;

const SelectedTag = styled.div`
  font-size: 14px;
  font-weight: 600;
  color: #1f2a37;
  margin-bottom: 12px;
`;

const ThreadBlock = styled.div`
  padding-left: 10px;
  margin-top: 10px;
`;

const Level = styled.div<{ indent?: number }>`
  margin-left: ${({ indent }) => (indent ? indent * 20 : 0)}px;
  margin-top: 8px;
  position: relative;
  border-left: 2px solid #e5e7eb;
  padding-left: 12px;
`;

const LevelLabel = styled.div`
  color: #9333ea;
  font-size: 13px;
  font-weight: 600;
  margin-bottom: 6px;
`;

const Node = styled.div`
  font-size: 13px;
  font-weight: 500;
  color: #111827;
  margin: 4px 0;
`;

const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 80px;
  text-align: center;
  padding: 0 12px;
`;

const EmptyIcon = styled.img`
  width: 80px;
  height: auto;
  margin-bottom: 16px;
`;

const EmptyText = styled.div`
  font-size: 14px;
  font-weight: 500;
  color: #4b5563;
`;

const EmptySubtext = styled.div`
  font-size: 13px;
  color: #6b7280;
  margin-top: 4px;
`;
