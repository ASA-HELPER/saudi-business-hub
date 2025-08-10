import React, { useImperativeHandle, useState } from "react";
import styled from "styled-components";
import SectionTitle from "../../components/common/SectionTitle";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { store } from "../../store";
import { selectCities } from "../../store/selectors/citySelectors";
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

const Card = styled.div<{ $isRTL?: boolean }>`
  background: white;
  border-radius: 16px;
  padding: 32px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
  width: 100%;
  font-family: ${(props) =>
    props.$isRTL && "'IBM Plex Sans Arabic', sans-serif"};
`;

const Section = styled.div`
  margin-bottom: 1px;
`;

const Row = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 24px;
  margin-bottom: 10px;
`;

const Divider = styled.hr`
  border: none;
  border-top: 1.5px solid #d1d5db;
`;

const InputsRow = styled.div`
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
`;

const InputWithErrorWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  min-width: 120px;
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
`;

const AttachmentWrapper = styled.div`
  flex: 0 0 100%;

  @media (min-width: 768px) {
    flex: 0 0 calc(50% - 1rem);
  }
`;

const ErrorText = styled.div`
  color: red;
  font-size: 12px;
  margin-top: 4px;
`;

const Select = styled.select<{ $isRTL?: boolean }>`
  border: none;
  border-bottom: 1px solid #cfd4dc;
  background: transparent;
  font-size: 10px;
  color: #1f2937;
  width: 100%;
  height: 33px;
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

const Label = styled.label`
  font-weight: 400;
  margin-bottom: 8px;
  font-size: 10px;
  color: #384250;

  span {
    color: red;
    margin-left: 2px;
  }
`;

const Input = styled.input<{ $isRTL?: boolean }>`
  padding: 10px 0;
  border: none;
  border-bottom: 1px solid #cfd4dc;
  font-size: 10px;
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

type StrategicInvestorEntityStepProps = {
  entityFormRef: React.Ref<{ submit: () => void }>;
  onSuccess: () => void;
};

const StrategicInvestorEntityStep: React.FC<
  StrategicInvestorEntityStepProps
> = ({ entityFormRef, onSuccess }) => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === "ar";
  const cities = useSelector(selectCities);
  const [errors, setErrors] = useState<Record<string, string>>({});
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
    legal_name_english: "",
    company_legal_structure: "",
    non_oil_exporter: "",
    program_member: "",
    country_id: "",
    phone_code: "",
    email: "",
    mobile_number: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
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
      withInput: true,
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
      withInput: true,
    },
    {
      id: 5,
      label: "Product responsibility",
      value: "product_responsibility",
      checked: false,
      description: "",
      withInput: true,
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
      withInput: true,
    },
    {
      id: 8,
      label: "Corporate Governance",
      value: "corporate_governance",
      checked: false,
      description: "",
      withInput: true,
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

  const [regionOptions, setRegionOptions] = useState(regionData);
  const [companyAgendaOptions, setCompanyAgendaOptions] =
    useState(companyAgendaData);

  const handleRegionOptionsChange = (updatedOptions: Option[]) => {
    setRegionOptions(updatedOptions);
  };

  const handleCompanyAgendaOptionsChange = (updatedOptions: Option[]) => {
    setCompanyAgendaOptions(updatedOptions);
  };

  const handleSubmit = () => {
    const newErrors: Record<string, string> = {};
    Object.keys(formData).forEach((key) => {
      if (!formData[key as keyof typeof formData]) {
        newErrors[key] = t("entityInformation.requiredField");
      }
    });

    setErrors(newErrors);
    if (Object.keys(newErrors).length !== 0) {
      return false;
    }
    onSuccess();
  };

  useImperativeHandle(entityFormRef, () => ({
    submit: () => handleSubmit(),
    getFormData: () => ({
      ...formData,
    }),
  }));

  return (
    <PageWrapper $isRTL={isRTL}>
      <Card $isRTL={isRTL}>
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
                    field: t("entityInformation.entityType"),
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

          <Row style={{ width: "50%", paddingRight: "12px" }}>
            <InputWrapper>
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
              {errors.country_id && <ErrorText>{errors.country_id}</ErrorText>}
            </InputWrapper>
          </Row>
        </Section>
        <Divider />
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
            <InputWrapper>
              <Label>
                <span>*</span> {t("contact_details.email")}
              </Label>
              <Input
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder={t("common.inputPlaceholder", {
                  field: t("contact_details.email"),
                })}
                $isRTL={isRTL}
              />
              {errors.email && <ErrorText>{errors.email}</ErrorText>}
            </InputWrapper>
            <InputWrapper>
              <Label>
                <span>*</span> {t("contact_details.mobile_number")}
              </Label>
              <div
                style={{
                  display: "flex",
                  gap: "12px",
                  alignItems: "flex-end",
                }}
              >
                <div
                  style={{
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
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
                </div>

                <div
                  style={{
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
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
                </div>
              </div>
            </InputWrapper>
          </Row>
        </Section>
        <Divider />
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
        <Divider />
        <Section>
          <SectionTitle>{t("financial_operational_info.heading")}</SectionTitle>
          <Row style={{ width: "50%", paddingRight: "12px" }}>
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
                    "financial_operational_info.sector_of_operation.placeholder",
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
              <InputsRow>
                <InputWithErrorWrapper>
                  <Input
                    name="annual_revenue_past_two_years"
                    value={formData.annual_revenue_past_two_years}
                    onChange={handleChange}
                    placeholder={t(
                      "financial_operational_info.annual_revenue_past_two_years.placeholders.two_years_ago",
                      {
                        field: t(
                          "financial_operational_info.annual_revenue_past_two_years.label"
                        ),
                      }
                    )}
                    $isRTL={isRTL}
                  />
                  {errors.annual_revenue_past_two_years && (
                    <ErrorText>
                      {errors.annual_revenue_past_two_years}
                    </ErrorText>
                  )}
                </InputWithErrorWrapper>
                <InputWithErrorWrapper>
                  <Input
                    name="annual_revenue_past_last_year"
                    value={formData.annual_revenue_past_last_year}
                    onChange={handleChange}
                    placeholder={t(
                      "financial_operational_info.annual_revenue_past_two_years.placeholders.last_year",
                      {
                        field: t(
                          "financial_operational_info.annual_revenue_past_two_years.label"
                        ),
                      }
                    )}
                    $isRTL={isRTL}
                  />
                  {errors.annual_revenue_past_last_year && (
                    <ErrorText>
                      {errors.annual_revenue_past_last_year}
                    </ErrorText>
                  )}
                </InputWithErrorWrapper>
              </InputsRow>
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

              <InputsRow>
                <InputWithErrorWrapper>
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
                </InputWithErrorWrapper>

                <InputWithErrorWrapper>
                  <Input
                    name="total_employees_last_year"
                    value={formData.total_employees_last_year}
                    onChange={handleChange}
                    placeholder={t(
                      "financial_operational_info.total_employees_past_two_years.placeholders.last_year",
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
                </InputWithErrorWrapper>
              </InputsRow>
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
              <InputsRow>
                <InputWithErrorWrapper>
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
                </InputWithErrorWrapper>
                <InputWithErrorWrapper>
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
                </InputWithErrorWrapper>
              </InputsRow>
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
              <InputsRow>
                <InputWithErrorWrapper>
                  <Input
                    name="total_salaries_saudi_employees_two_years_ago"
                    value={
                      formData.total_salaries_saudi_employees_two_years_ago
                    }
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
                </InputWithErrorWrapper>
                <InputWithErrorWrapper>
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
                </InputWithErrorWrapper>
              </InputsRow>
            </InputWrapper>
          </Row>
        </Section>
        <Divider />
        <Section>
          <SectionTitle>{t("strategic_information.heading")}</SectionTitle>
          <Row style={{ width: "50%", paddingRight: "12px" }}>
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
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "24px",
                  marginBottom: "24px",
                }}
              >
                <div style={{ flex: 1 }}>
                  <Input
                    name="hs_codes_top_product_one"
                    value={formData.hs_codes_top_product_one}
                    onChange={handleChange}
                    placeholder={t(
                      "strategic_information.hs_codes_top_products.placeholders.product_one"
                    )}
                    $isRTL={isRTL}
                  />
                  {errors.hs_codes_top_product_one && (
                    <ErrorText>{errors.hs_codes_top_product_one}</ErrorText>
                  )}
                </div>

                <div style={{ flex: 1 }}>
                  <Input
                    name="hs_codes_top_product_two"
                    value={formData.hs_codes_top_product_two}
                    onChange={handleChange}
                    placeholder={t(
                      "strategic_information.hs_codes_top_products.placeholders.product_two"
                    )}
                    $isRTL={isRTL}
                  />
                  {errors.hs_codes_top_product_two && (
                    <ErrorText>{errors.hs_codes_top_product_two}</ErrorText>
                  )}
                </div>
              </div>
              <div style={{ width: "50%", paddingRight: "12px" }}>
                <Input
                  name="hs_codes_top_product_three"
                  value={formData.hs_codes_top_product_three}
                  onChange={handleChange}
                  placeholder={t(
                    "strategic_information.hs_codes_top_products.placeholders.product_three"
                  )}
                  $isRTL={isRTL}
                />
                {errors.hs_codes_top_product_three && (
                  <ErrorText>{errors.hs_codes_top_product_three}</ErrorText>
                )}
              </div>
            </InputWrapper>
          </Row>

          <Row>
            <InputWrapper>
              <Label>
                <span>*</span>{" "}
                {t("strategic_information.technologies_used.label")}
              </Label>
              <InputsRow>
                <InputWithErrorWrapper>
                  <Input
                    name="technologies_used_select"
                    value={formData.technologies_used_select}
                    onChange={handleChange}
                    placeholder={t(
                      "strategic_information.technologies_used.placeholder",
                      {
                        field: t(
                          "strategic_information.technologies_used.label"
                        ),
                      }
                    )}
                    $isRTL={isRTL}
                  />
                  {errors.technologies_used_select && (
                    <ErrorText>{errors.technologies_used_select}</ErrorText>
                  )}
                </InputWithErrorWrapper>
                <InputWithErrorWrapper>
                  <Input
                    name="technologies_used_description"
                    value={formData.technologies_used_description}
                    onChange={handleChange}
                    placeholder={t(
                      "strategic_information.technologies_used.description_placeholder",
                      {
                        field: t(
                          "strategic_information.technologies_used.label"
                        ),
                      }
                    )}
                    $isRTL={isRTL}
                  />
                  {errors.technologies_used_description && (
                    <ErrorText>
                      {errors.technologies_used_description}
                    </ErrorText>
                  )}
                </InputWithErrorWrapper>
              </InputsRow>
            </InputWrapper>
          </Row>
          <Row style={{ gap: "0px", flexDirection: "column" }}>
            <Label>
              <span>*</span> {t("strategic_information.ksa_regions.label")}
            </Label>
            <CheckboxGroup
              options={regionOptions}
              onOptionsChange={handleRegionOptionsChange}
              containerStyles={{
                display: "grid",
                gridTemplateColumns: "repeat(5, 1fr)",
              }}
            />
          </Row>
          <Row style={{ width: "50%", paddingRight: "12px" }}>
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
                    field: t("strategic_information.saudi_made_program.label"),
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
          <Row style={{ width: "50%", paddingRight: "12px" }}>
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
                    field: t("strategic_information.local_content_score.label"),
                  }
                )}
                $isRTL={isRTL}
              />
              {errors.local_content_score && (
                <ErrorText>{errors.local_content_score}</ErrorText>
              )}
            </InputWrapper>
          </Row>
          <Row>
            <Label>
              <span
                style={{
                  display: "inline-flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "10px",
                  width: "10px",
                  border: "1px solid #384250",
                  borderRadius: "50%",
                  color: "#384250",
                  marginRight: "5px",
                }}
              >
                &#x003F;
              </span>
              {t("strategic_information.local_content_score.note")}
            </Label>
          </Row>
          <Row style={{ gap: "5px" }}>
            <Label>
              <span>*</span> {t("strategic_information.esg_description.label")}
            </Label>
            <CheckboxGroup
              options={companyAgendaOptions}
              onOptionsChange={handleCompanyAgendaOptionsChange}
              checkboxInputPlaceholder={t("common.checkboxInputPlaceholder")}
              containerStyles={{ justifyContent: "space-between" }}
            />
          </Row>
          <Row style={{ width: "50%", paddingRight: "12px" }}>
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
          <Row style={{ width: "50%", paddingRight: "12px" }}>
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
                {t("strategic_information.financial_metrics_description.label")}
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
        <Divider />
        <Section>
          <SectionTitle>{t("attachment.title")}</SectionTitle>
          <Label style={{ fontSize: "12px" }}>
            <strong>
              {t("attachment.registrationAttachments.headingOne")}
            </strong>
          </Label>
          <Row style={{ marginTop: "10px" }}>
            {companyProfileAttachments.map(({ key, file, setFile }) => (
              <AttachmentWrapper>
                <FileAttachment
                  key={key}
                  file={file}
                  setFile={setFile}
                  labelKey={key}
                />
              </AttachmentWrapper>
            ))}
          </Row>
          <Label style={{ fontSize: "12px" }}>
            <strong>
              {t("attachment.registrationAttachments.headingTwo")}
            </strong>
          </Label>
          <Row style={{ marginTop: "10px" }}>
            {financialStatementsAttachments.map(({ key, file, setFile }) => (
              <AttachmentWrapper>
                <FileAttachment
                  key={key}
                  file={file}
                  setFile={setFile}
                  labelKey={key}
                />
              </AttachmentWrapper>
            ))}
          </Row>
          <Label style={{ fontSize: "12px" }}>
            <strong>
              {t("attachment.registrationAttachments.headingThree")}
            </strong>
          </Label>
          <Row style={{ marginTop: "10px" }}>
            {operationalInformationAttachments.map(({ key, file, setFile }) => (
              <AttachmentWrapper>
                <FileAttachment
                  key={key}
                  file={file}
                  setFile={setFile}
                  labelKey={key}
                />
              </AttachmentWrapper>
            ))}
          </Row>
        </Section>
      </Card>
    </PageWrapper>
  );
};

export default StrategicInvestorEntityStep;
