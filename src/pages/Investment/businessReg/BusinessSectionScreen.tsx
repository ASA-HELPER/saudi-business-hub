import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Navbar from "../../../components/common/dashboard/Navbar";
import TopStepper from "./TopStepper";
import EmptyIllustration from "../../../assets/images/investment/business/empty_state_icon.svg";
import EditImg from "../../../assets/images/investment/business/edit-icon.svg";
import DivisionSection from "./DivisionSection";
import GroupSection from "./GroupSection";
import ClassSection from "./ClassSection";
import BranchSection from "./BranchSection";
import ActivitySection from "./ActivitySection";
import LeftPanelThread from "./LeftPanelThread";
import LeftPanel from "./LeftPanel";
import { useNavigate } from "react-router-dom";
import { Activity, Branch, Class, Division, Group } from "./types";

import {
  setSection,
  setDivisions,
  setGroups,
  setClasses,
  setBranches,
  setActivities,
  resetBusinessActivity,
  setActivityRows,
  addActivityRows,
  resetAfterSection,
} from "../../../store/reducers/businessActivitySlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store";
import { assembleBusinessActivityRows } from "./assembleActivityRows";
import { useLocation } from "react-router-dom";
import { fetchStructureRequest } from "../../../store/actions/businessRegActions";
import {
  selectStructure,
  selectStructureError,
  selectStructureLoading,
} from "../../../store/selectors/structureSelectors";
import { selectSelectedRegistrationType } from "../../../store/selectors/registrationTypeSelectors";
import { selectAppLang } from "../../../store/slices/languageSlice";
import { useTranslation } from "react-i18next";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #f9f9f9;
  min-height: 100vh;
`;

const Content = styled.div`
  display: flex;
  margin: 24px;
  gap: 24px;
`;

const RightPanel = styled.div`
  flex: 1;
  background-color: #ffffff;
  padding: 12px;
  border-radius: 8px;
  border: 1px solid #e5e7eb;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 16px;
  margin-top: 10px;
`;

const Radio = styled.div<{ selected: boolean }>`
  width: 18px;
  height: 18px;
  border-radius: 50%;
  border: 0.5px solid white;
  background-color: transparent;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;

  &::after {
    content: "";
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background-color: white;
    display: ${({ selected }) => (selected ? "block" : "none")};
  }
`;

const Footer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin: 32px 100px 24px;
  gap: 16px;
`;

const Button = styled.button<{ primary?: boolean }>`
  background-color: ${({ primary }) => (primary ? "#007c92" : "white")};
  color: ${({ primary }) => (primary ? "white" : "#007c92")};
  padding: 12px 24px;
  border: 2px solid #007c92;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
`;

const PanelHeader = styled.div`
  background-color: #f2f5f6;
  padding: 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 8px 8px 0 0;
  color: #000;

  h3 {
    font-size: 16px;
    font-weight: 600;
    margin: 0;
    color: #000;
  }
`;

const SearchBox = styled.input`
  padding: 10px 16px;
  border: 1px solid #cfd4dc;
  border-radius: 6px;
  font-size: 14px;
  width: 240px;
`;

const CardLabel = styled.div<{ selected: boolean }>`
  flex: 1;
  text-align: left;
  color: ${({ selected }) => (selected ? "#fff" : "#000")};
  font-size: 14px;
`;

const Card = styled.div<{ selected: boolean }>`
  border: 1px solid ${({ selected }) => (selected ? "#007c92" : "#d1d5db")};
  background-color: ${({ selected }) => (selected ? "#00778E" : "#fff")};
  border-radius: 8px;
  padding: 16px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  color: ${({ selected }) => (selected ? "#FFF" : "#000")};

  &:hover {
    border-color: #007c92;
  }
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

const SearchBarWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const SearchInput = styled.input`
  width: 240px;
  padding: 10px 12px;
  border: 1px solid #cfd4dc;
  border-radius: 6px;
  font-size: 14px;
`;

const ThreadLine = styled.div`
  position: absolute;
  left: 30px;
  top: 40px;
  bottom: 10px;
  width: 2px;
  background-color: #cac4d0;
  z-index: 0;
`;

const ThreadedDivision = styled.div`
  position: relative;
  display: flex;
  align-items: flex-start;
  margin-left: 16px;
  margin-bottom: 12px;
`;

const SkeletonCard = styled.div`
  height: 50px;
  border-radius: 8px;
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 37%, #f0f0f0 63%);
  background-size: 400% 100%;
  animation: shimmer 1.4s ease infinite;

  @keyframes shimmer {
    0% {
      background-position: -400px 0;
    }
    100% {
      background-position: 400px 0;
    }
  }
`;

const BusinessSectionScreen: React.FC = () => {
  const [language, setLanguage] = useState<"en" | "ar">("en");

  const selectedType = useSelector(selectSelectedRegistrationType);
  const selectedLanguage = useSelector(selectAppLang);

  const [currentStep, setCurrentStep] = useState<number>(0);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const location = useLocation();
  const registrationTypeId = location.state?.registrationTypeId;
  const {
    section: selectedSection,
    divisions: selectedDivisions,
    groups: selectedGroups,
    classes: selectedClasses,
    branches: selectedBranches,
    activities: selectedActivities,
  } = useSelector((state: RootState) => state.businessActivity);

  const busineesRegData = useSelector(selectStructure);
  const busineesRegDataLoading = useSelector(selectStructureLoading);
  const busineesRegDataError = useSelector(selectStructureError);

  useEffect(() => {
    if (registrationTypeId) {
      dispatch(fetchStructureRequest(selectedType?.id ?? 1));
    }
  }, [dispatch, registrationTypeId]);

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    } else {
      navigate(-1);
      //navigate(-1, { state: { skipRefresh: true } });

      //navigate("/investmentReg");
    }
  };

  const isRtl = selectedLanguage === "ar";
  const { t, i18n } = useTranslation();

  return (
    <Container>
      <Navbar
        language={language}
        setLanguage={setLanguage}
        backgroundColor="#ffffff"
        isDarkBackground={false}
      />
      <TopStepper activeStep={currentStep} onBack={handleBack} />

      <Content>
        <LeftPanelThread
          selectedSection={
            selectedLanguage == "ar"
              ? selectedSection?.description_ar ?? ""
              : selectedSection?.description_en ?? ""
          }
          selectedDivisions={selectedDivisions}
          selectedGroups={selectedGroups}
          selectedClasses={selectedClasses}
          selectedBranches={selectedBranches}
          selectedActivities={selectedActivities}
          editSection={() => setCurrentStep(0)}
          editDivision={() => setCurrentStep(1)}
          editGroup={() => setCurrentStep(2)}
          editClass={() => setCurrentStep(3)}
          editBranch={() => setCurrentStep(4)}
          editActivity={() => setCurrentStep(5)}
        />

        <RightPanel>
          {currentStep === 0 && (
            <>
              <PanelHeader>
                <h3>
                  {t("businessActivity.chooseSection")} (
                  {busineesRegData?.sections.length})
                </h3>
                <SearchBarWrapper>
                  <SearchInput
                    type="text"
                    placeholder={t("businessActivity.search")}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </SearchBarWrapper>
              </PanelHeader>

              {busineesRegDataLoading ? (
                <Grid>
                  {Array.from({ length: 15 }).map((_, idx) => (
                    <SkeletonCard key={idx} />
                  ))}
                </Grid>
              ) : (
                <Grid>
                  {busineesRegData?.sections
                    .filter((section) => {
                      const description =
                        selectedLanguage === "en"
                          ? section.description_en
                          : section.description_ar;

                      return description
                        ?.toLowerCase()
                        .includes(searchTerm.toLowerCase());
                    })
                    .map((section) => {
                      const isSelected =
                        selectedSection?.sectionid === section.sectionid;

                      return (
                        <Card
                          key={section.id}
                          selected={isSelected}
                          onClick={() => {
                            if (
                              selectedSection?.sectionid !== section.sectionid
                            ) {
                              dispatch(setSection(section));
                              dispatch(resetAfterSection());
                            } else {
                              dispatch(setSection(section));
                            }
                          }}
                        >
                          <CardLabel selected={isSelected}>
                            {section.sectionid} -{" "}
                            {selectedLanguage == "en"
                              ? section.description_en
                              : section.description_ar}
                          </CardLabel>
                          <Radio selected={isSelected} />
                        </Card>
                      );
                    })}
                </Grid>
              )}
            </>
          )}
          {currentStep === 1 && (
            <DivisionSection
              selectedSection={selectedSection}
              structureData={busineesRegData}
            />
          )}

          {currentStep === 2 && (
            <GroupSection
              selectedDivisions={selectedDivisions}
              structureData={busineesRegData}
            />
          )}

          {currentStep === 3 && (
            <ClassSection
              structureData={{ class: busineesRegData?.classes ?? [] }}
            />
          )}

          {currentStep === 4 && (
            <BranchSection
              structureData={{ branch: busineesRegData?.branches ?? [] }}
            />
          )}

          {currentStep === 5 && (
            <ActivitySection
              structureData={{ activities: busineesRegData?.activities ?? [] }}
            />
          )}
        </RightPanel>
      </Content>

      <Footer>
        <Button
          onClick={() => {
            if (currentStep > 0) {
              setCurrentStep((prev) => prev - 1);
            } else {
              navigate(-1);
            }
          }}
        >
          {currentStep == 0
            ? t("businessActivity.cancel")
            : t("businessActivity.back")}
        </Button>
        <Button
          primary
          onClick={() => {
            if (currentStep < 5) {
              setCurrentStep((prev) => prev + 1);
            } else {
              // Final step: Create rows for each activity
              const rows = assembleBusinessActivityRows({
                activities: selectedActivities,
                branches: selectedBranches,
                classes: selectedClasses,
                groups: selectedGroups,
                divisions: selectedDivisions,
                section: selectedSection,
              });
              dispatch(addActivityRows(rows));
              navigate(-1);
            }
          }}
        >
          {t("businessActivity.next")}
        </Button>
      </Footer>
    </Container>
  );
};

export default BusinessSectionScreen;
