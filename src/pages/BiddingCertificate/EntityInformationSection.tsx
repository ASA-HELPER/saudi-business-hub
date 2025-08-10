import React, { useImperativeHandle, useState } from "react";
import styled from "styled-components";
import SectionTitle from "../../components/common/SectionTitle";
import { Country } from "../../store/types/countryTypes";
import { Region } from "../../store/types/regionTypes";
import { LegalStatus } from "../../store/types/legalStatus";
import { store } from "../../store";
import { selectCities } from "../../store/selectors/citySelectors";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import AttachmentSection from "./AttachmentSection";

const PageWrapper = styled.div<{ $isRTL?: boolean }>`
  background: #f5f5f5;
  min-height: 60vh;
  padding: 10px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  direction: ${(props) => (props.$isRTL ? "rtl" : "ltr")};
`;

const Card = styled.div<{ $isRTL?: boolean }>`
  background: white;
  border-radius: 16px;
  padding: 0px 14px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
  width: 100%;
  font-family: ${(props) =>
    props.$isRTL && "'IBM Plex Sans Arabic', sans-serif"};
`;

const ErrorText = styled.div`
  color: red;
  font-size: 12px;
  margin-top: 4px;
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

const InputWrapper = styled.div`
  flex: 1;
  min-width: 280px;
  min-height: 50px;
  display: flex;
  flex-direction: column;
  gap: 6px; /* spacing between label and input */
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
  padding: 6px 0;
  border: none;
  border-bottom: 1px solid #cfd4dc;
  font-size: 11px;
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

const Select = styled.select<{ $isRTL?: boolean }>`
  border: none;
  border-bottom: 1px solid #cfd4dc;
  background: transparent;
  font-size: 11px;
  color: #94a3b8;
  width: 100%;
  height: 28px;
  transition: border-color 0.3s ease;

  &:focus {
    outline: none;
    border-bottom-color: #007c92;
  }
`;

type EntityInformationSectionProps = {
  bidEntityFormRef: React.Ref<{ submit: () => void }>;
  onSuccess: () => void;
};

const EntityInformationSection: React.FC<EntityInformationSectionProps> = ({
  bidEntityFormRef,
  onSuccess,
}) => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === "ar";
  const cities = useSelector(selectCities);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const [formData, setFormData] = useState({
    company_name_arabic: "",
    company_name_english: "",
    project_name_arabic: "",
    project_name_english: "",
    capital: "",
    government_entity: "",
    country_id: "",
    city: "",
    po_box: "",
    postal_code: "",
    mobile_country_code: "",
    mobile_number: "",
    telephone_country_code: "",
    telephone_number: "",
    email: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
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

  useImperativeHandle(bidEntityFormRef, () => ({
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
                <span>*</span> {t("entityInformation.company_name_arabic")}
              </Label>
              <Input
                name="company_name_arabic"
                placeholder={t("common.inputPlaceholder", {
                  field: t("entityInformation.company_name_arabic"),
                })}
                value={formData.company_name_arabic}
                onChange={handleChange}
                $isRTL={isRTL}
              />
              {errors.company_name_arabic && (
                <ErrorText>{errors.company_name_arabic}</ErrorText>
              )}
            </InputWrapper>
            <InputWrapper>
              <Label>
                <span>*</span> {t("entityInformation.company_name_english")}
              </Label>
              <Input
                name="company_name_english"
                placeholder={t("common.inputPlaceholder", {
                  field: t("entityInformation.company_name_english"),
                })}
                value={formData.company_name_english}
                onChange={handleChange}
                $isRTL={isRTL}
              />
              {errors.company_name_english && (
                <ErrorText>{errors.company_name_english}</ErrorText>
              )}
            </InputWrapper>
          </Row>

          <Row>
            <InputWrapper>
              <Label>
                <span>*</span> {t("entityInformation.project_name_arabic")}
              </Label>
              <Input
                name="project_name_arabic"
                placeholder={t("common.inputPlaceholder", {
                  field: t("entityInformation.project_name_arabic"),
                })}
                value={formData.project_name_arabic}
                onChange={handleChange}
                $isRTL={isRTL}
              />
              {errors.project_name_arabic && (
                <ErrorText>{errors.project_name_arabic}</ErrorText>
              )}
            </InputWrapper>
            <InputWrapper>
              <Label>
                <span>*</span> {t("entityInformation.project_name_english")}
              </Label>
              <Input
                name="project_name_english"
                placeholder={t("common.inputPlaceholder", {
                  field: t("entityInformation.project_name_english"),
                })}
                value={formData.project_name_english}
                onChange={handleChange}
                $isRTL={isRTL}
              />
              {errors.project_name_english && (
                <ErrorText>{errors.project_name_english}</ErrorText>
              )}
            </InputWrapper>
          </Row>

          <Row>
            <InputWrapper>
              <Label>
                <span>*</span> {t("entityInformation.capitalSr.label")}
              </Label>
              <Input
                name="capital"
                placeholder={t("entityInformation.capitalSr.placeholder", {
                  field: t("entityInformation.capitalSr.placeholder"),
                })}
                value={formData.capital}
                onChange={handleChange}
                $isRTL={isRTL}
              />
              {errors.capital && <ErrorText>{errors.capital}</ErrorText>}
            </InputWrapper>
            <InputWrapper>
              <Label>
                <span>*</span> {t("entityInformation.government_entity")}
              </Label>
              <Select
                name="government_entity"
                value={formData.government_entity}
                onChange={handleChange}
                $isRTL={isRTL}
              >
                <option value="" disabled hidden>
                  {t("common.choose", {
                    field: t("entityInformation.government_entity"),
                  })}
                </option>
                {cities.map((city) => (
                  <option key={city.id} value={city.id}>
                    {city.name}
                  </option>
                ))}
              </Select>
              {errors.government_entity && (
                <ErrorText>{errors.government_entity}</ErrorText>
              )}
            </InputWrapper>
          </Row>

          <Row>
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
                  {t("common.choose", {
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
            <InputWrapper>
              <Label>
                <span>*</span> {t("entityInformation.city")}
              </Label>
              <Input
                name="city"
                placeholder={t("common.inputPlaceholder", {
                  field: t("entityInformation.city"),
                })}
                value={formData.city}
                onChange={handleChange}
                $isRTL={isRTL}
              />
              {errors.city && <ErrorText>{errors.city}</ErrorText>}
            </InputWrapper>
          </Row>

          <Row>
            <InputWrapper>
              <Label>
                <span>*</span> {t("entityInformation.postal_code")}
              </Label>
              <Select
                name="postal_code"
                value={formData.postal_code}
                onChange={handleChange}
                $isRTL={isRTL}
              >
                <option value="" disabled hidden>
                  {t("common.choose", {
                    field: t("entityInformation.postal_code"),
                  })}
                </option>
                {cities.map((city) => (
                  <option key={city.id} value={city.id}>
                    {city.name}
                  </option>
                ))}
              </Select>
              {errors.postal_code && (
                <ErrorText>{errors.postal_code}</ErrorText>
              )}
            </InputWrapper>
            <InputWrapper>
              <Label>
                <span>*</span> {t("entityInformation.po_box")}
              </Label>
              <Input
                name="po_box"
                placeholder={t("common.inputPlaceholder", {
                  field: t("entityInformation.po_box"),
                })}
                value={formData.po_box}
                onChange={handleChange}
                $isRTL={isRTL}
              />
              {errors.po_box && <ErrorText>{errors.po_box}</ErrorText>}
            </InputWrapper>
          </Row>

          <Row>
            <InputWrapper>
              <Label>
                <span>*</span> {t("entityInformation.mobile_number.label")}
              </Label>
              <Input
                name="mobile_number"
                placeholder={t("entityInformation.mobile_number.placeholder", {
                  field: t("entityInformation.mobile_number.label"),
                })}
                value={formData.mobile_number}
                onChange={handleChange}
                $isRTL={isRTL}
              />
              {errors.mobile_number && (
                <ErrorText>{errors.mobile_number}</ErrorText>
              )}
            </InputWrapper>
            <InputWrapper>
              <Label>
                <span>*</span> {t("entityInformation.telephone_number.label")}
              </Label>
              <Input
                name="telephone_number"
                placeholder={t(
                  "entityInformation.telephone_number.placeholder",
                  {
                    field: t("entityInformation.telephone_number.label"),
                  }
                )}
                value={formData.telephone_number}
                onChange={handleChange}
                $isRTL={isRTL}
              />
              {errors.telephone_number && (
                <ErrorText>{errors.telephone_number}</ErrorText>
              )}
            </InputWrapper>
          </Row>

          <Row style={{ width: "50%", paddingRight: "12px" }}>
            <InputWrapper>
              <Label>
                <span>*</span> {t("entityInformation.email")}
              </Label>
              <Input
                name="email"
                placeholder={t("common.inputPlaceholder", {
                  field: t("entityInformation.email"),
                })}
                value={formData.email}
                onChange={handleChange}
                $isRTL={isRTL}
              />
              {errors.email && <ErrorText>{errors.email}</ErrorText>}
            </InputWrapper>
          </Row>
        </Section>
        <AttachmentSection />
      </Card>
    </PageWrapper>
  );
};

export default EntityInformationSection;
