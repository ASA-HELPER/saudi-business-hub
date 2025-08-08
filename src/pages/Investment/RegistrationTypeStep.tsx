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
import fileUpload from "../../assets/images/investment/file-upload.svg";

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
import { selectCities } from "../../store/selectors/citySelectors";
import Attachment from "./modal/Attachment";
import { useDropzone } from "react-dropzone";
import FileAttachment from "../../components/common/FileAttachment/FileAttachment";
import CheckboxGroup, {
  Option,
} from "../../components/common/CheckboxGroup/CheckboxGroup";

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
  ${({ $isRTL }) =>
    $isRTL
      ? `
    margin-left: 0;
    margin-right: auto;
  `
      : `
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
  font-family: ${(props) =>
    props.$isRTL && "'IBM Plex Sans Arabic', sans-serif"};
`;

const OuterCard = styled.div<{ $isRTL?: boolean }>`
  background: #ffffff;
  padding: 20px;
  border-radius: 12px;
  border: 0.5px solid #bdd7db;
  margin-top: 20px;
  direction: ${(props) => (props.$isRTL ? "rtl" : "ltr")};
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
  font-family: ${(props) =>
    props.$isRTL && "'IBM Plex Sans Arabic', sans-serif"};
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

const Section = styled.div`
  margin-bottom: 32px;
`;

const Row = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 24px;
  margin-bottom: 24px;
`;

const Col = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const InputWrapper = styled.div`
  flex: 1;
  min-width: 280px;
  min-height: 50px;
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin-bottom: 20px;
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

const ErrorText = styled.div`
  color: red;
  font-size: 12px;
  margin-top: 4px;
`;

const Select = styled.select<{ $isRTL?: boolean }>`
  border: none;
  border-bottom: 2px solid #cfd4dc;
  background: transparent;
  font-size: 14px;
  color: #1f2937;
  width: 100%;
  height: 42px;
  padding: 0 8px;
  transition: border-color 0.3s ease;
  text-align: ${(props) => (props.$isRTL ? "right" : "left")};
  font-family: ${(props) =>
    props.$isRTL && "'IBM Plex Sans Arabic', sans-serif"};

  &:focus {
    outline: none;
    border-bottom-color: #007c92;
  }

  option {
    text-align: ${(props) => (props.$isRTL ? "right" : "left")};
  }
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

const Label = styled.label`
  font-weight: 400;
  margin-bottom: 8px;
  font-size: 14px;
  color: #384250;

  span {
    color: red;
    margin-left: 2px;
  }
`;

const Input = styled.input<{ $isRTL?: boolean }>`
  padding: 10px 0;
  border: none;
  border-bottom: 2px solid #cfd4dc;
  font-size: 14px;
  background-color: transparent;
  width: 100%;
  transition: border-color 0.3s ease;
  text-align: ${(props) => (props.$isRTL ? "right" : "left")};
  font-family: ${(props) =>
    props.$isRTL && "'IBM Plex Sans Arabic', sans-serif"};

  &:focus {
    outline: none;
    border-bottom-color: #007c92;
  }

  &::placeholder {
    color: #94a3b8;
    text-align: ${(props) => (props.$isRTL ? "right" : "left")};
  }
`;

const ActionIcon = styled.span<{ color: string }>`
  color: ${({ color }) => color};
  margin-right: 0.75rem;
  font-size: 1rem;
  cursor: pointer;
`;

const CurrencyWrapper = styled.div<{ $isRTL?: boolean }>`
  display: flex;
  align-items: center;
  border-bottom: 2px solid #cfd4dc;
  width: 100%;
  height: 42px;
  padding: 0 8px;
  gap: 8px;
  flex-direction: ${(props) => (props.$isRTL ? "row-reverse" : "row")};

  input {
    border: none;
    outline: none;
    font-size: 14px;
    background: transparent;
    flex: 1;
    padding: 0;
    height: 100%;
    text-align: ${(props) => (props.$isRTL ? "right" : "left")};
    font-family: ${(props) =>
      props.$isRTL && "'IBM Plex Sans Arabic', sans-serif"};
  }
`;

const PrimaryText = styled.div`
  font-size: 16px;
  font-weight: 500;
  color: #1f2a37;
  margin-bottom: 0.5rem;
`;

const SecondaryText = styled.div`
  font-size: 12px;
  color: #384250;
  margin-bottom: 0.75rem;
  text-align: center;

  strong {
    font-weight: 400;
  }
`;

const BrowseText = styled.div`
  font-size: 14px;
  font-weight: 500;
  color: #161616;
  cursor: pointer;
`;

const FileName = styled.div`
  margin-top: 1rem;
  font-size: 14px;
  color: #00778e;
  font-weight: 500;
`;

const MAX_FILE_SIZE_MB = 5;
const ALLOWED_TYPES = {
  "application/pdf": [],
  "application/msword": [],
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document": [],
  "image/jpeg": [],
  "image/jpg": [],
  "image/png": [],
};

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
  const cities = useSelector(selectCities);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [boardResolutionFile, setBoardResolutionFile] = useState<File | null>(
    null
  );
  const [letterOfSupportFile, setLetterOfSupportFile] = useState<File | null>(
    null
  );
  const [commercialRegister, setCommercialRegister] = useState<File | null>(
    null
  );
  const [articleOfAssociation, setArticleOfAssociation] = useState<File | null>(
    null
  );
  const [gosiCertificate, setGosiCertificate] = useState<File | null>(null);
  const [operatingLicense, setOperatingLicense] = useState<File | null>(null);
  const [companyProfile, setCompanyProfile] = useState<File | null>(null);
  const [membershipProof, setMembershipProof] = useState<File | null>(null);
  const [incomeStatement, setIncomeStatement] = useState<File | null>(null);
  const [investmentPlan, setInvestmentPlan] = useState<File | null>(null);
  const [localContentCertificate, setLocalContentCertificate] =
    useState<File | null>(null);
  const [exportDeclarations, setExportDeclarations] = useState<File | null>(
    null
  );
  const [recognitionAwards, setRecognitionAwards] = useState<File | null>(null);
  const [operationalReports, setOperationalReports] = useState<File | null>(
    null
  );
  const [governancePolicies, setGovernancePolicies] = useState<File | null>(
    null
  );

  const [formData, setFormData] = useState({
    address: "",
    entity_name: "",
    crNumber: "",
    sector_of_operation: "",
    company_representative: "",
    annual_revenue_past_two_years: "",
    annual_revenue_past_last_year: "",
    total_employees_past_two_years_ago: "",
    total_employees_last_year: "",
    saudi_employees_past_two_years_ago: "",
    saudi_employees_last_year: "",
    total_salaries_saudi_employees_two_years_ago: "",
    total_salaries_saudi_employees_last_year: "",
    hs_codes_top_product_one: "",
    hs_codes_top_product_two: "",
    hs_codes_top_product_three: "",
    technologies_used_select: "",
    technologies_used_description: "",
    financial_metrics_description: "",
    average_yearly_salary: "",
    local_content_score: "",
    saudi_made_program: "",
    sector_operation: "",
    entity_type: "",
    entity_name_arabic: "",
    legal_name_english: "",
    company_legal_structure: "",
    non_oil_exporter: "",
    legal_status_id: "",
    program_member: "",
    capital: "",
    country_id: "",
    region_id: "",
    city_id: "",
    phone_code: "",
    email: "",
    mobile_country_code_id: "",
    mobile_number: "",
    investment_id: "",
    license_duration: "1",
    list_of_rhq_corporate_activties: [] as string[],
    activity_ids: [] as number[],
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleDrop =
    (setter: (file: File | null) => void) => (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      if (file && file.size <= MAX_FILE_SIZE_MB * 1024 * 1024) {
        setter(file);
      } else {
        alert(t("attachment.validation.fileSizeExceeded"));
      }
    };

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

  const companyProfileAttachments = [
    {
      key: "Commercial Register",
      file: commercialRegister,
      setFile: setCommercialRegister,
    },
    {
      key: "Article Of Association",
      file: articleOfAssociation,
      setFile: setArticleOfAssociation,
    },
    {
      key: "Gosi Certificate",
      file: gosiCertificate,
      setFile: setGosiCertificate,
    },
    {
      key: "Operating License",
      file: operatingLicense,
      setFile: setOperatingLicense,
    },
    {
      key: "Company Profile",
      file: companyProfile,
      setFile: setCompanyProfile,
    },
    {
      key: "Proof of membership in Government Program",
      file: membershipProof,
      setFile: setMembershipProof,
    },
  ];

  const financialStatementsAttachments = [
    {
      key: "Income statement And balancesheet",
      file: incomeStatement,
      setFile: setIncomeStatement,
    },
    {
      key: "Intended investment plans and agreements",
      file: investmentPlan,
      setFile: setInvestmentPlan,
    },
  ];

  const operationalInformationAttachments = [
    {
      key: "Certificate of Local Content",
      file: localContentCertificate,
      setFile: setLocalContentCertificate,
    },
    {
      key: "Export Declarations",
      file: exportDeclarations,
      setFile: setExportDeclarations,
    },
    {
      key: "Certificate/Awards for Operational, Social and Environmental Recognition",
      file: recognitionAwards,
      setFile: setRecognitionAwards,
    },
    {
      key: "Technical and Operational Reports (e.g Case Studies, Efficiency reports, Social)",
      file: operationalReports,
      setFile: setOperationalReports,
    },
    {
      key: "Governance policies and Frameworks (e.g Due Diligence)",
      file: governancePolicies,
      setFile: setGovernancePolicies,
    },
  ];

  const regionData = [
    {
      id: 1,
      label: "Riyadh",
      value: "riyadh",
      checked: false,
      description: "",
      withInput: false,
    },
    {
      id: 2,
      label: "Eastern Province",
      value: "eastern_province",
      description: "",
      checked: false,
      withInput: false,
    },
    {
      id: 3,
      label: "Najran",
      value: "najran",
      checked: false,
      description: "",
      withInput: false,
    },
    {
      id: 4,
      label: "Asir",
      value: "asir",
      checked: false,
      description: "",
      withInput: false,
    },
    {
      id: 5,
      label: "Al-Baha",
      value: "al_baha",
      checked: false,
      description: "",
      withInput: false,
    },
    {
      id: 6,
      label: "Jizan",
      value: "jizan",
      checked: false,
      description: "",
      withInput: false,
    },
    {
      id: 7,
      label: "Al-Qasim",
      value: "al_qasim",
      checked: false,
      description: "",
      withInput: false,
    },
    {
      id: 8,
      label: "Ha'il",
      value: "hail",
      checked: false,
      description: "",
      withInput: false,
    },
    {
      id: 9,
      label: "Medina",
      value: "medina",
      checked: false,
      description: "",
      withInput: false,
    },
    {
      id: 10,
      label: "Makkah",
      value: "makkah",
      checked: false,
      description: "",
      withInput: false,
    },
    {
      id: 11,
      label: "Al Jouf",
      value: "al_jouf",
      checked: false,
      description: "",
      withInput: false,
    },
    {
      id: 12,
      label: "Northern Border",
      value: "northern_border",
      description: "",
      checked: false,
      withInput: false,
    },
  ];

  const companyAgendaData = [
    {
      id: 1,
      label: "Emissions",
      value: "emissions",
      checked: false,
      description: "",
      withInput: true,
    },
    {
      id: 2,
      label: "Innovation",
      value: "innovation",
      checked: false,
      description: "",
      withInput: false,
    },
    {
      id: 3,
      label: "Resource use",
      value: "resource_use",
      checked: false,
      description: "",
      withInput: true,
    },
    {
      id: 4,
      label: "Human capital",
      value: "human_capital",
      checked: false,
      description: "",
      withInput: false,
    },
    {
      id: 5,
      label: "Product responsibility",
      value: "product_responsibility",
      checked: false,
      description: "",
      withInput: false,
    },
    {
      id: 6,
      label: "Social Opportunities",
      value: "social_opportunities",
      checked: false,
      description: "",
      withInput: true,
    },
    {
      id: 7,
      label: "CSR",
      value: "csr",
      checked: false,
      description: "",
      withInput: false,
    },
    {
      id: 8,
      label: "Corporate Governance",
      value: "corporate_governance",
      checked: false,
      description: "",
      withInput: false,
    },
    {
      id: 9,
      label: "Corporate Behaviour",
      value: "corporate_behaviour",
      checked: false,
      description: "",
      withInput: true,
    },
  ];

  const [options, setOptions] = useState(regionData);

  const handleOptionsChange = (updatedOptions: Option[]) => {
    setOptions(updatedOptions);
  };

  return (
    <PageWrapper $isRTL={isRTL}>
      <Card $isRTL={isRTL}>
        <>
          <BusinessActivityRow />
          /* Entity Information */
          <Section>
            <SectionTitle>{t("entityInformation.entityInfo")}</SectionTitle>
            <Row>
              <InputWrapper>
                <Label>
                  <span>*</span> {t("entityInformation.entityType")}
                </Label>
                <Select
                  name="entity_type"
                  value={formData.entity_type}
                  onChange={handleChange}
                  $isRTL={isRTL}
                >
                  <option value="" disabled hidden>
                    {t("entityInformation.choose", {
                      field: t("entityInformation.city"),
                    })}
                  </option>
                  {cities.map((city) => (
                    <option key={city.id} value={city.id}>
                      {city.name}
                    </option>
                  ))}
                </Select>
                {errors.entity_type && (
                  <ErrorText>{errors.entity_type}</ErrorText>
                )}
              </InputWrapper>

              <InputWrapper>
                <Label>
                  <span>*</span> {t("entityInformation.crNumber")}
                </Label>
                <Input
                  name="crNumber"
                  value={formData.crNumber}
                  onChange={handleChange}
                  placeholder={t("common.inputPlaceholder", {
                    field: t("entityInformation.crNumber"),
                  })}
                  $isRTL={isRTL}
                />
                {errors.crNumber && <ErrorText>{errors.crNumber}</ErrorText>}
              </InputWrapper>
            </Row>

            <Row>
              <InputWrapper>
                <Label>
                  <span>*</span> {t("entityInformation.legalNameEn")}
                </Label>
                <Input
                  name="legal_name_english"
                  value={formData.legal_name_english}
                  onChange={handleChange}
                  placeholder={t("common.inputPlaceholder", {
                    field: t("entityInformation.legalNameEn"),
                  })}
                  $isRTL={isRTL}
                />
                {errors.legal_name_english && (
                  <ErrorText>{errors.legal_name_english}</ErrorText>
                )}
              </InputWrapper>

              <InputWrapper>
                <Label>
                  <span>*</span> {t("entityInformation.companyLegalStructure")}
                </Label>
                <Select
                  name="company_legal_structure"
                  value={formData.company_legal_structure}
                  onChange={handleChange}
                  $isRTL={isRTL}
                >
                  <option value="" disabled hidden>
                    {t("entityInformation.choose", {
                      field: t("entityInformation.companyLegalStructure"),
                    })}
                  </option>
                  {cities.map((city) => (
                    <option key={city.id} value={city.id}>
                      {city.name}
                    </option>
                  ))}
                </Select>
                {errors.company_legal_structure && (
                  <ErrorText>{errors.company_legal_structure}</ErrorText>
                )}
              </InputWrapper>
            </Row>

            <Row>
              <InputWrapper style={{ maxWidth: "550px" }}>
                <Label>
                  <span>*</span> {t("entityInformation.country")}
                </Label>
                <Select
                  name="country_id"
                  value={formData.country_id}
                  onChange={handleChange}
                  $isRTL={isRTL}
                >
                  <option value="" disabled hidden>
                    {t("entityInformation.selectCountry", {
                      field: t("entityInformation.country"),
                    })}
                  </option>
                  {cities.map((city) => (
                    <option key={city.id} value={city.id}>
                      {city.name}
                    </option>
                  ))}
                </Select>
                {errors.country_id && (
                  <ErrorText>{errors.country_id}</ErrorText>
                )}
              </InputWrapper>
            </Row>
          </Section>
          /* Contact Details */
          <Section>
            <SectionTitle>{t("contact_details.heading")}</SectionTitle>
            <Row>
              <InputWrapper>
                <Label>
                  <span>*</span> {t("contact_details.address")}
                </Label>
                <Input
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder={t("common.inputPlaceholder", {
                    field: t("contact_details.address"),
                  })}
                  $isRTL={isRTL}
                />
                {errors.address && <ErrorText>{errors.address}</ErrorText>}
              </InputWrapper>

              <InputWrapper>
                <Label>
                  <span>*</span> {t("contact_details.company_representative")}
                </Label>
                <Input
                  name="company_representative"
                  value={formData.company_representative}
                  onChange={handleChange}
                  placeholder={t("common.inputPlaceholder", {
                    field: t("contact_details.company_representative"),
                  })}
                  $isRTL={isRTL}
                />
                {errors.company_representative && (
                  <ErrorText>{errors.company_representative}</ErrorText>
                )}
              </InputWrapper>
            </Row>

            <Row>
              <InputWrapper style={{ maxWidth: "550px" }}>
                <Label>
                  <span>*</span> {t("contact_details.email")}
                </Label>
                <Input
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder={t("contact_details.enterPlaceholder", {
                    field: t("contact_details.email"),
                  })}
                  $isRTL={isRTL}
                />
                {errors.email && <ErrorText>{errors.email}</ErrorText>}
              </InputWrapper>

              <div style={{ display: "flex", flexDirection: "column" }}>
                <Label>
                  <span>*</span> {t("contact_details.mobile_number")}
                </Label>
                <InputWrapper style={{ flexDirection: "row", width: "100%" }}>
                  <Select
                    name="phone_code"
                    value={formData.phone_code}
                    onChange={handleChange}
                    $isRTL={isRTL}
                  >
                    <option value="" disabled hidden>
                      {t("common.choose", {
                        field: t("contact_details.phone_code"),
                      })}
                    </option>
                    {cities.map((city) => (
                      <option key={city.id} value={city.id}>
                        {city.name}
                      </option>
                    ))}
                  </Select>
                  {errors.phone_code && (
                    <ErrorText>{errors.phone_code}</ErrorText>
                  )}
                  <Input
                    name="mobile_number"
                    value={formData.mobile_number}
                    onChange={handleChange}
                    placeholder={t("common.inputPlaceholder", {
                      field: t("contact_details.mobile_number"),
                    })}
                    $isRTL={isRTL}
                  />
                  {errors.mobile_number && (
                    <ErrorText>{errors.mobile_number}</ErrorText>
                  )}
                </InputWrapper>
              </div>
            </Row>
          </Section>
          /* Other Program MemberShip */
          <Section>
            <SectionTitle>{t("program_membership.heading")}</SectionTitle>
            <Row>
              <InputWrapper>
                <Label>
                  <span>*</span> {t("program_membership.program_member_label")}
                </Label>
                <Select
                  name="program_member"
                  value={formData.program_member}
                  onChange={handleChange}
                  $isRTL={isRTL}
                >
                  <option value="" disabled hidden>
                    {t("common.choose", {
                      field: t("program_membership.program_member"),
                    })}
                  </option>
                  {cities.map((city) => (
                    <option key={city.id} value={city.id}>
                      {city.name}
                    </option>
                  ))}
                </Select>
                {errors.program_member && (
                  <ErrorText>{errors.program_member}</ErrorText>
                )}
              </InputWrapper>
            </Row>
          </Section>
          /* Financial and Operational Information */
          <Section>
            <SectionTitle>
              {t("financial_operational_info.heading")}
            </SectionTitle>
            <Row>
              <InputWrapper>
                <Label>
                  <span>*</span>{" "}
                  {t("financial_operational_info.sector_of_operation.label")}
                </Label>
                <Select
                  name="sector_of_operation"
                  value={formData.sector_of_operation}
                  onChange={handleChange}
                  $isRTL={isRTL}
                >
                  <option value="" disabled hidden>
                    {t(
                      "inancial_operational_info.sector_of_operation.placeholder",
                      {
                        field: t(
                          "financial_operational_info.sector_of_operation.label"
                        ),
                      }
                    )}
                  </option>
                  {cities.map((city) => (
                    <option key={city.id} value={city.id}>
                      {city.name}
                    </option>
                  ))}
                </Select>
                {errors.sector_of_operation && (
                  <ErrorText>{errors.sector_of_operation}</ErrorText>
                )}
              </InputWrapper>
            </Row>
            <Row>
              <InputWrapper>
                <Label>
                  <span>*</span>{" "}
                  {t(
                    "financial_operational_info.annual_revenue_past_two_years.label"
                  )}
                </Label>
                <Input
                  name="annual_revenue_past_two_years"
                  value={formData.annual_revenue_past_two_years}
                  onChange={handleChange}
                  placeholder={t(
                    "financial_operational_info.placeholders.two_years_ago",
                    {
                      field: t(
                        "financial_operational_info.annual_revenue_past_two_years.label"
                      ),
                    }
                  )}
                  $isRTL={isRTL}
                />
                {errors.annual_revenue_past_two_years && (
                  <ErrorText>{errors.annual_revenue_past_two_years}</ErrorText>
                )}
                <Input
                  name="annual_revenue_past_last_year"
                  value={formData.annual_revenue_past_last_year}
                  onChange={handleChange}
                  placeholder={t(
                    "financial_operational_info.placeholders.last_year",
                    {
                      field: t(
                        "financial_operational_info.annual_revenue_past_two_years.label"
                      ),
                    }
                  )}
                  $isRTL={isRTL}
                />
                {errors.annual_revenue_past_last_year && (
                  <ErrorText>{errors.annual_revenue_past_last_year}</ErrorText>
                )}
              </InputWrapper>
            </Row>
            <Row>
              <InputWrapper>
                <Label>
                  <span>*</span>{" "}
                  {t(
                    "financial_operational_info.total_employees_past_two_years.label"
                  )}
                </Label>
                <Input
                  name="total_employees_past_two_years_ago"
                  value={formData.total_employees_past_two_years_ago}
                  onChange={handleChange}
                  placeholder={t(
                    "financial_operational_info.total_employees_past_two_years.placeholders.two_years_ago",
                    {
                      field: t(
                        "financial_operational_info.total_employees_past_two_years.label"
                      ),
                    }
                  )}
                  $isRTL={isRTL}
                />
                {errors.total_employees_past_two_years_ago && (
                  <ErrorText>
                    {errors.total_employees_past_two_years_ago}
                  </ErrorText>
                )}
                <Input
                  name="total_employees_last_year"
                  value={formData.total_employees_last_year}
                  onChange={handleChange}
                  placeholder={t(
                    "financial_operational_info.total_employees_past_two_years.placeholders.two_years_ago",
                    {
                      field: t(
                        "financial_operational_info.total_employees_past_two_years.label"
                      ),
                    }
                  )}
                  $isRTL={isRTL}
                />
                {errors.total_employees_last_year && (
                  <ErrorText>{errors.total_employees_last_year}</ErrorText>
                )}
              </InputWrapper>
            </Row>
            <Row>
              <InputWrapper>
                <Label>
                  <span>*</span>{" "}
                  {t(
                    "financial_operational_info.saudi_employees_past_two_years.label"
                  )}
                </Label>
                <Input
                  name="saudi_employees_past_two_years_ago"
                  value={formData.saudi_employees_past_two_years_ago}
                  onChange={handleChange}
                  placeholder={t(
                    "financial_operational_info.saudi_employees_past_two_years.placeholders.two_years_ago",
                    {
                      field: t(
                        "financial_operational_info.saudi_employees_past_two_years.label"
                      ),
                    }
                  )}
                  $isRTL={isRTL}
                />
                {errors.saudi_employees_past_two_years_ago && (
                  <ErrorText>
                    {errors.saudi_employees_past_two_years_ago}
                  </ErrorText>
                )}
                <Input
                  name="saudi_employees_last_year"
                  value={formData.saudi_employees_last_year}
                  onChange={handleChange}
                  placeholder={t(
                    "financial_operational_info.saudi_employees_past_two_years.placeholders.last_year",
                    {
                      field: t(
                        "financial_operational_info.saudi_employees_past_two_years.label"
                      ),
                    }
                  )}
                  $isRTL={isRTL}
                />
                {errors.saudi_employees_last_year && (
                  <ErrorText>{errors.saudi_employees_last_year}</ErrorText>
                )}
              </InputWrapper>
            </Row>
            <Row>
              <InputWrapper>
                <Label>
                  <span>*</span>{" "}
                  {t(
                    "financial_operational_info.total_salaries_saudi_employees.label"
                  )}
                </Label>
                <Input
                  name="total_salaries_saudi_employees_two_years_ago"
                  value={formData.total_salaries_saudi_employees_two_years_ago}
                  onChange={handleChange}
                  placeholder={t(
                    "financial_operational_info.total_salaries_saudi_employees.placeholders.two_years_ago",
                    {
                      field: t(
                        "financial_operational_info.total_salaries_saudi_employees.label"
                      ),
                    }
                  )}
                  $isRTL={isRTL}
                />
                {errors.total_salaries_saudi_employees_two_years_ago && (
                  <ErrorText>
                    {errors.total_salaries_saudi_employees_two_years_ago}
                  </ErrorText>
                )}
                <Input
                  name="total_salaries_saudi_employees_last_year"
                  value={formData.total_salaries_saudi_employees_last_year}
                  onChange={handleChange}
                  placeholder={t(
                    "financial_operational_info.total_salaries_saudi_employees.placeholders.last_year",
                    {
                      field: t(
                        "financial_operational_info.total_salaries_saudi_employees.label"
                      ),
                    }
                  )}
                  $isRTL={isRTL}
                />
                {errors.total_salaries_saudi_employees_last_year && (
                  <ErrorText>
                    {errors.total_salaries_saudi_employees_last_year}
                  </ErrorText>
                )}
              </InputWrapper>
            </Row>
          </Section>
          /* Strategic Information */
          <Section>
            <SectionTitle>{t("strategic_information.heading")}</SectionTitle>
            <Row>
              <InputWrapper>
                <Label>
                  <span>*</span>{" "}
                  {t("strategic_information.sector_operation.label")}
                </Label>
                <Select
                  name="sector_operation"
                  value={formData.sector_operation}
                  onChange={handleChange}
                  $isRTL={isRTL}
                >
                  <option value="" disabled hidden>
                    {t("strategic_information.sector_operation.placeholder", {
                      field: t("strategic_information.sector_operation.label"),
                    })}
                  </option>
                  {cities.map((city) => (
                    <option key={city.id} value={city.id}>
                      {city.name}
                    </option>
                  ))}
                </Select>
                {errors.sector_operation && (
                  <ErrorText>{errors.sector_operation}</ErrorText>
                )}
              </InputWrapper>
            </Row>
            <Row>
              <InputWrapper>
                <Label>
                  <span>*</span>{" "}
                  {t("strategic_information.hs_codes_top_products.label")}
                </Label>
                <Row>
                  <Input
                    name="hs_codes_top_product_one"
                    value={formData.hs_codes_top_product_one}
                    onChange={handleChange}
                    placeholder={t(
                      "strategic_information.hs_codes_top_products.placeholders.product_one",
                      {
                        field: t(
                          "strategic_information.hs_codes_top_products.label"
                        ),
                      }
                    )}
                    $isRTL={isRTL}
                  />
                  {errors.hs_codes_top_product_one && (
                    <ErrorText>{errors.hs_codes_top_product_one}</ErrorText>
                  )}
                  <Input
                    name="hs_codes_top_product_two"
                    value={formData.hs_codes_top_product_two}
                    onChange={handleChange}
                    placeholder={t(
                      "strategic_information.hs_codes_top_products.placeholders.product_two",
                      {
                        field: t(
                          "strategic_information.hs_codes_top_products.label"
                        ),
                      }
                    )}
                    $isRTL={isRTL}
                  />
                  {errors.hs_codes_top_product_two && (
                    <ErrorText>{errors.hs_codes_top_product_two}</ErrorText>
                  )}
                </Row>
                <Input
                  name="hs_codes_top_product_three"
                  value={formData.hs_codes_top_product_three}
                  onChange={handleChange}
                  placeholder={t(
                    "strategic_information.hs_codes_top_products.placeholders.product_three",
                    {
                      field: t(
                        "strategic_information.hs_codes_top_products.label"
                      ),
                    }
                  )}
                  $isRTL={isRTL}
                />
                {errors.hs_codes_top_product_three && (
                  <ErrorText>{errors.hs_codes_top_product_three}</ErrorText>
                )}
              </InputWrapper>
            </Row>
            <Row>
              <InputWrapper>
                <Label>
                  <span>*</span>{" "}
                  {t("strategic_information.technologies_used.label")}
                </Label>
                <Input
                  name="technologies_used_select"
                  value={formData.technologies_used_select}
                  onChange={handleChange}
                  placeholder={t(
                    "strategic_information.technologies_used.placeholder",
                    {
                      field: t("strategic_information.technologies_used.label"),
                    }
                  )}
                  $isRTL={isRTL}
                />
                {errors.technologies_used_select && (
                  <ErrorText>{errors.technologies_used_select}</ErrorText>
                )}
                <Input
                  name="technologies_used_description"
                  value={formData.technologies_used_description}
                  onChange={handleChange}
                  placeholder={t(
                    "strategic_information.technologies_used.description_placeholder",
                    {
                      field: t("strategic_information.technologies_used.label"),
                    }
                  )}
                  $isRTL={isRTL}
                />
                {errors.technologies_used_description && (
                  <ErrorText>{errors.technologies_used_description}</ErrorText>
                )}
              </InputWrapper>
            </Row>
            <Row>
              <Label>
                <span>*</span> {t("strategic_information.ksa_regions.label")}
              </Label>
              <CheckboxGroup
                options={options}
                onOptionsChange={handleOptionsChange}
              />
            </Row>
            <Row>
              <InputWrapper>
                <Label>
                  <span>*</span>{" "}
                  {t("strategic_information.saudi_made_program.label")}
                </Label>
                <Select
                  name="saudi_made_program"
                  value={formData.saudi_made_program}
                  onChange={handleChange}
                  $isRTL={isRTL}
                >
                  <option value="" disabled hidden>
                    {t("strategic_information.saudi_made_program.placeholder", {
                      field: t(
                        "strategic_information.saudi_made_program.label"
                      ),
                    })}
                  </option>
                  {cities.map((city) => (
                    <option key={city.id} value={city.id}>
                      {city.name}
                    </option>
                  ))}
                </Select>
                {errors.saudi_made_program && (
                  <ErrorText>{errors.saudi_made_program}</ErrorText>
                )}
              </InputWrapper>
            </Row>
            <Row>
              <InputWrapper>
                <Label>
                  <span>*</span>{" "}
                  {t("strategic_information.local_content_score.label")}
                </Label>
                <Input
                  name="local_content_score"
                  value={formData.local_content_score}
                  onChange={handleChange}
                  placeholder={t(
                    "strategic_information.local_content_score.placeholder",
                    {
                      field: t(
                        "strategic_information.local_content_score.label"
                      ),
                    }
                  )}
                  $isRTL={isRTL}
                />
                {errors.local_content_score && (
                  <ErrorText>{errors.local_content_score}</ErrorText>
                )}
              </InputWrapper>
              <Label>
                {t("strategic_information.local_content_score.note")}
              </Label>
            </Row>
            <Row>
              <Label>
                <span>*</span>{" "}
                {t("strategic_information.esg_description.label")}
              </Label>
              <CheckboxGroup
                options={companyAgendaData}
                onOptionsChange={handleOptionsChange}
              />
            </Row>
            <Row>
              <InputWrapper>
                <Label>
                  <span>*</span>{" "}
                  {t("strategic_information.non_oil_exporter.label")}
                </Label>
                <Select
                  name="non_oil_exporter"
                  value={formData.non_oil_exporter}
                  onChange={handleChange}
                  $isRTL={isRTL}
                >
                  <option value="" disabled hidden>
                    {t("strategic_information.non_oil_exporter.placeholder", {
                      field: t("strategic_information.non_oil_exporter.label"),
                    })}
                  </option>
                  {cities.map((city) => (
                    <option key={city.id} value={city.id}>
                      {city.name}
                    </option>
                  ))}
                </Select>
                {errors.non_oil_exporter && (
                  <ErrorText>{errors.non_oil_exporter}</ErrorText>
                )}
              </InputWrapper>
            </Row>
            <Row>
              <InputWrapper>
                <Label>
                  <span>*</span>{" "}
                  {t("strategic_information.average_yearly_salary.label")}
                </Label>
                <Input
                  name="average_yearly_salary"
                  value={formData.average_yearly_salary}
                  onChange={handleChange}
                  placeholder={t(
                    "strategic_information.average_yearly_salary.placeholder",
                    {
                      field: t(
                        "strategic_information.average_yearly_salary.label"
                      ),
                    }
                  )}
                  $isRTL={isRTL}
                />
                {errors.average_yearly_salary && (
                  <ErrorText>{errors.average_yearly_salary}</ErrorText>
                )}
              </InputWrapper>
            </Row>
            <Row>
              <InputWrapper>
                <Label>
                  <span>*</span>{" "}
                  {t(
                    "strategic_information.financial_metrics_description.label"
                  )}
                </Label>
                <Input
                  name="financial_metrics_description"
                  value={formData.financial_metrics_description}
                  onChange={handleChange}
                  placeholder={t(
                    "strategic_information.financial_metrics_description.placeholder",
                    {
                      field: t(
                        "strategic_information.financial_metrics_description.label"
                      ),
                    }
                  )}
                  $isRTL={isRTL}
                />
                {errors.financial_metrics_description && (
                  <ErrorText>{errors.financial_metrics_description}</ErrorText>
                )}
              </InputWrapper>
            </Row>
          </Section>
          /* Attachment */
          <Section>
            <SectionTitle>{t("attachment.title")}</SectionTitle>
            <Label>
              <strong>
                {t("attachment.registrationAttachments.headingOne")}
              </strong>
            </Label>
            <Row>
              {companyProfileAttachments.map(({ key, file, setFile }) => (
                <FileAttachment
                  key={key}
                  file={file}
                  setFile={setFile}
                  labelKey={key}
                />
              ))}
            </Row>
            <Label>
              <strong>
                {t("attachment.registrationAttachments.headingTwo")}
              </strong>
            </Label>
            <Row>
              {financialStatementsAttachments.map(({ key, file, setFile }) => (
                <FileAttachment
                  key={key}
                  file={file}
                  setFile={setFile}
                  labelKey={key}
                />
              ))}
            </Row>
            <Label>
              <strong>
                {t("attachment.registrationAttachments.headingThree")}
              </strong>
            </Label>
            <Row>
              {operationalInformationAttachments.map(
                ({ key, file, setFile }) => (
                  <FileAttachment
                    key={key}
                    file={file}
                    setFile={setFile}
                    labelKey={key}
                  />
                )
              )}
            </Row>
          </Section>
        </>
      </Card>
    </PageWrapper>
  );
};

export default RegistrationTypeStep;
