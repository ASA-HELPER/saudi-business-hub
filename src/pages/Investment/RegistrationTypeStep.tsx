import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { EntityInformationForm } from "./EntityInformationForm";
import RegistrationPill from "./RegistrationPill";
import BusinessActivityRow from "./BusinessActivityRow";
import SectionTitle from "../../components/common/SectionTitle";
import { useTranslation } from "react-i18next";
import regularIcon from "../../assets/images/investment/reg_type1.svg";
import entrepreneurIcon from "../../assets/images/investment/reg_type2.svg";
import scientificIcon from "../../assets/images/investment/reg_type3.svg";
import economicIcon from "../../assets/images/investment/reg_type4.svg";
import temporaryIcon from "../../assets/images/investment/reg_type5.svg";
import rhqIcon from "../../assets/images/investment/reg_type6.svg";

import checkOn from "../../assets/images/investment/check-on.svg";
import checkOff from "../../assets/images/investment/check-off.svg";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchRegistrationTypesRequest,
  selectRegistrationType,
} from "../../store/actions/registrationTypeActions";
import {
  selectRegistrationTypes,
  selectRegistrationTypesError,
  selectRegistrationTypesLoading,
  selectSelectedRegistrationType,
} from "../../store/selectors/registrationTypeSelectors";
import { selectEntityList } from "../../store/selectors/getEntityListSelectors";
import { getEntityListRequest } from "../../store/actions/getEntityListActions";
import { assembleBusinessActivityRows } from "./businessReg/assembleActivityRows";
import { EntityActivity } from "../../store/types/getEntityList";
import { Activity } from "./businessReg/types";
import { addActivityRows } from "../../store/reducers/businessActivitySlice";
import { BusinessActivityRowItem } from "../../store/types/businessActivity";
import { store } from "../../store";

const PageWrapper = styled.div<{ $isRTL?: boolean }>`
  background: #f5f5f5;
  min-height: 60vh;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  direction: ${(props) => (props.$isRTL ? "rtl" : "ltr")};
`;

const CheckboxIcon = styled.img<{ $isRTL?: boolean }>`
  width: 24px;
  height: 24px;
  ${({ $isRTL }) => $isRTL ? `
    margin-left: 0;
    margin-right: auto;
  ` : `
    margin-left: auto;
    margin-right: 0;
  `}
`;

const Card = styled.div<{ $isRTL?: boolean }>`
  background: white;
  border-radius: 16px;
  padding: 32px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
  width: 100%;
  font-family: ${(props) => props.$isRTL && "'IBM Plex Sans Arabic', sans-serif"};
`;

const Container = styled.div`
  background: #f9f9f9;
  border-radius: 16px;
  padding: 32px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h2`
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 16px;
  color: #161616;
`;

const OptionsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 16px;
`;

const OptionCard = styled.div<{ selected: boolean; $isRTL?: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 2px solid ${({ selected }) => (selected ? "#00688B" : "#CAC4D0")};
  border-radius: 8px;
  background: white;
  padding: 16px;
  cursor: pointer;
  transition: border-color 0.3s;
  background-color: ${({ selected }) => (selected ? "#edf5f7" : "#fff")};
  
  /* Add this RTL flip */
  flex-direction: ${({ $isRTL }) => ($isRTL ? "row-reverse" : "row")};
  
  &:hover {
    border-color: #00778e;
    background-color: #edf5f7;
  }
`;

const OptionContent = styled.div<{ $isRTL?: boolean }>`
  display: flex;
  align-items: center;
  gap: 16px;
  
  /* Add this RTL flip */
  flex-direction: ${({ $isRTL }) => ($isRTL ? "row-reverse" : "row")};
`;

const OptionImage = styled.img`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  object-fit: cover;
`;

const OptionLabel = styled.div<{ $isRTL?: boolean }>`
  font-size: 16px;
  font-weight: 600;
  color: #1f2937;
  text-align: ${(props) => (props.$isRTL ? "right" : "left")};
  font-family: ${(props) => props.$isRTL && "'IBM Plex Sans Arabic', sans-serif"};
`;

const CheckboxOuter = styled.div<{ checked: boolean }>`
  width: 24px;
  height: 24px;
  border: 2px solid ${({ checked }) => (checked ? "#00778E" : "#00778E")};
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${({ checked }) => (checked ? "#00778E" : "#fff")};
  transition: all 0.2s ease;
`;

const CheckboxInner = styled.div<{ checked: boolean }>`
  font-size: 14px;
  color: #fff;
  line-height: 1;
  display: ${({ checked }) => (checked ? "block" : "none")};
`;

const Footer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 16px;
  margin-top: 32px;
`;

const CancelButton = styled.button`
  border: 2px solid #00688b;
  background: transparent;
  color: #00688b;
  padding: 12px 24px;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;

  &:hover {
    background: rgba(0, 104, 139, 0.1);
  }
`;

const NextButton = styled.button<{ disabled: boolean }>`
  background: ${({ disabled }) => (disabled ? "#93c5fd" : "#7dd3fc")};
  color: white;
  padding: 12px 32px;
  border-radius: 8px;
  font-weight: 600;
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  border: none;
  display: flex;
  align-items: center;
  gap: 8px;

  &:hover {
    background: ${({ disabled }) => (disabled ? "#93c5fd" : "#0ea5e9")};
  }
`;

const registrationOptions = [
  {
    label: "Regular Investment Registration",
    image: regularIcon,
  },
  {
    label: "Entrepreneur",
    image: entrepreneurIcon,
  },
  {
    label: "Scientific and Technical Office",
    image: scientificIcon,
  },
  {
    label: "Economic Office",
    image: economicIcon,
  },
  {
    label: "Temporary Registration for Government Contract",
    image: temporaryIcon,
  },
  // {
  //   label: "RHQ",
  //   image: rhqIcon,
  // },
];

const TableWrapper = styled.div`
  margin-top: 1rem;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-size: 0.95rem;
  border-radius: 12px;
  overflow: hidden;

  thead {
    background-color: #f3f4f6;
    color: #374151;
    font-weight: 600;
  }

  th,
  td {
    padding: 1rem;
    text-align: left;
    border-bottom: 1px solid #e5e7eb;
  }

  td {
    color: #000;
  }
`;

const ActionIcon = styled.span<{ color: string }>`
  color: ${({ color }) => color};
  margin-right: 0.75rem;
  font-size: 1rem;
  cursor: pointer;
`;

const AddRowLink = styled.a`
  display: block;
  color: #0d9488;
  font-weight: 600;
  margin-top: 1rem;
  cursor: pointer;
  text-align: right;
  font-size: 0.95rem;

  &:hover {
    text-decoration: underline;
  }
`;
type RegistrationTypeStepProps = {
  selected: string | null;
  setSelected: (type: string) => void;
  entityFormRef: React.Ref<{ submit: () => void }>;
  onSuccess: () => void;
};

const RegistrationTypeStep: React.FC<RegistrationTypeStepProps> = ({
  selected,
  setSelected,
  entityFormRef,
  onSuccess,
}) => {
  const dispatch = useDispatch();
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === "ar";
  const registrationTypes = useSelector(selectRegistrationTypes);
  const selectedType = useSelector(selectSelectedRegistrationType);
  const loading = useSelector(selectRegistrationTypesLoading);
  const error = useSelector(selectRegistrationTypesError);

  const entityData = useSelector(selectEntityList);

  useEffect(() => {
    dispatch(getEntityListRequest());
  }, [dispatch]);

  useEffect(() => {
    console.log("entityData", JSON.stringify(entityData));
    dispatch(fetchRegistrationTypesRequest());
  }, [entityData]);

  useEffect(() => {
    if (entityData.length > 0) {
      handleSelect(
        entityData[entityData.length - 1].investment_registration_type_id
      );
      const activities = mapEntityActivitiesToActivities(
        entityData[entityData.length - 1].activities
      );
    }
  }, [registrationTypes]);

  useEffect(() => {
    if (
      entityData.length > 0 &&
      entityData[entityData.length - 1]?.activities?.length > 0
    ) {
      const activities = mapEntityActivitiesToActivities(
        entityData[entityData.length - 1].activities
      );

      const existingRows: BusinessActivityRowItem[] =
        store.getState().businessActivity.activityRows;
      const existingIds = new Set(existingRows.map((row) => row.activity.id));

      const newActivities = activities.filter((a) => !existingIds.has(a.id));

      if (newActivities.length > 0) {
        const rows = assembleBusinessActivityRows({
          activities: newActivities,
          branches: [],
          classes: [],
          groups: [],
          divisions: [],
          section: null,
        });

        dispatch(addActivityRows(rows));
      }
    }
  }, [entityData, dispatch]);

  const mapEntityActivitiesToActivities = (
    entityActivities: EntityActivity[]
  ): Activity[] => {
    return entityActivities.map((item) => ({
      id: item.id,
      activityid: item.activityid,
      activity_id: item.activityid, // use activityid to fill activity_id if needed
      branch_id: item.branch_id,
      class_id: item.class_id,
      group_id: item.group_id,
      section_id: item.section_id,
      division_id: item.division_id,
      description: item.description,
      isic_master_rule: {
        classification: item?.isic_master_rule?.classification ?? "",
      },
      pivot: {
        investment_registration_type_id: item.pivot.entity_information_id,
        activity_id: item.pivot.activity_id,
      },
      //isic_master_rule: item.isic_master_rule,
      //pivot: item.pivot,
    }));
  };

  const handleSelect = (typeId: number) => {
    console.log("registrationTypes", JSON.stringify(registrationTypes), typeId);
    const selected = registrationTypes.find((t) => t.id === typeId);
    //setSelected(selected)
    if (selected) {
      dispatch(selectRegistrationType(selected));
    }
  };

  const iconMap: Record<string, string> = {
    "Regular Investment Registration": regularIcon,
    Entrepreneur: entrepreneurIcon,
    "Scientific and Technical office": scientificIcon,
    "Economic Office": economicIcon,
    "Temporary Registration for Government Contract": temporaryIcon,
  };

  return (
     <PageWrapper $isRTL={isRTL}>
      <Card $isRTL={isRTL}>
        <SectionTitle $isRTL={isRTL}>{t("registrationTypes.title")}</SectionTitle>

        {loading && <p>{t("common.loading")}</p>}
        {error && <p style={{ color: "red" }}>{t("common.error")}: {error}</p>}

      <OptionsGrid>
        {registrationTypes
          .filter(type => type.name !== "RHQ") // Filter out RHQ
          .map((type) => (
            <OptionCard
              key={type.id}
              selected={selectedType?.id === type.id}
              onClick={() => handleSelect(type.id)}
              $isRTL={isRTL}
            >
              <OptionContent $isRTL={isRTL}>
                <OptionImage
                  src={iconMap[type.name] || "/images/default-reg-type.svg"}
                  alt={type.name}
                />
                <OptionLabel $isRTL={isRTL}>
                  {type.name}
                </OptionLabel>
              </OptionContent>
              <CheckboxIcon
                src={selectedType?.id === type.id ? checkOn : checkOff}
                alt={
                  selectedType?.id === type.id
                    ? t("common.selected")
                    : t("common.notSelected")
                }
              />
            </OptionCard>
          ))}
      </OptionsGrid>

        {selectedType && (
          <>
            <BusinessActivityRow />
            <EntityInformationForm
              registrationTypeId={selectedType.id}
              ref={entityFormRef}
              onSuccess={onSuccess}
              entityInfo={
                entityData.length > 0 ? entityData[entityData.length - 1] : null
              }
            />
          </>
        )}
      </Card>
    </PageWrapper>
  );
};

export default RegistrationTypeStep;
