import React from "react";
import styled from "styled-components";
import EmptyIllustration from "../../../assets/images/investment/business/empty_state_icon.svg";
import EditImg from "../../../assets/images/investment/business/edit-icon.svg";

const PanelHeader = styled.div`
  background-color: #f2f5f6;
  padding: 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 8px 8px 0 0;
  color: #000;
`;

const SectionTitle = styled.h3`
  font-size: 16px;
  font-weight: 600;
  margin: 0;
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

const LeftPanelScrollArea = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 10px 16px;
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

const TreeItem = styled.div<{ level: number }>`
  margin-left: ${({ level }) => level * 16}px;
  padding: 4px 0;
  font-size: 13px;
  color: #1f2a37;
  position: relative;

  &::before {
    content: "";
    position: absolute;
    left: -8px;
    top: 10px;
    width: 8px;
    height: 2px;
    background-color: #ccc;
  }
`;

interface Props {
  selectedSection: string | null;
  selectedDivisions: string[];
  selectedGroups: string[];
  selectedClasses: string[];
  selectedBranches: string[];
  selectedActivities: string[];
}

const LeftPanel: React.FC<Props> = ({
  selectedSection,
  selectedDivisions,
  selectedGroups,
  selectedClasses,
  selectedBranches,
  selectedActivities,
}) => {
  return (
    <div
      style={{
        width: "25%",
        backgroundColor: "#fff",
        border: "1px solid #e5e7eb",
        borderRadius: 12,
      }}
    >
      <PanelHeader>
        <SectionTitle>Sections</SectionTitle>
        <EditIcon>
          <img src={EditImg} />
        </EditIcon>
      </PanelHeader>

      <LeftPanelScrollArea>
        {selectedSection ? (
          <>
            <TreeItem level={0}>{selectedSection}</TreeItem>

            {selectedDivisions.map((division, dIdx) => (
              <React.Fragment key={dIdx}>
                <TreeItem level={1}>{division}</TreeItem>

                {selectedGroups.map((group, gIdx) => (
                  <TreeItem level={2} key={`g-${gIdx}`}>
                    {group}
                  </TreeItem>
                ))}

                {selectedClasses.map((cls, cIdx) => (
                  <TreeItem level={3} key={`c-${cIdx}`}>
                    {cls}
                  </TreeItem>
                ))}

                {selectedBranches.map((branch, bIdx) => (
                  <TreeItem level={4} key={`b-${bIdx}`}>
                    {branch}
                  </TreeItem>
                ))}

                {selectedActivities.map((act, aIdx) => (
                  <TreeItem level={5} key={`a-${aIdx}`}>
                    {act}
                  </TreeItem>
                ))}
              </React.Fragment>
            ))}
          </>
        ) : (
          <EmptyState>
            <EmptyIcon src={EmptyIllustration} />
            <EmptyText>There is no records to display.</EmptyText>
            <EmptySubtext>Select your section to get started.</EmptySubtext>
          </EmptyState>
        )}
      </LeftPanelScrollArea>
    </div>
  );
};

export default LeftPanel;
