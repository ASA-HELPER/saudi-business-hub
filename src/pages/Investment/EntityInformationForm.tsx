import React, {
  useState,
  useEffect,
  forwardRef,
  useImperativeHandle,
} from "react";
import styled from "styled-components";
import SectionTitle from "../../components/common/SectionTitle";
import fileUpload from "../../assets/images/investment/file-upload.svg";
import RegistrationActivityModal from "./RegistrationActivityModal";
import { useNavigate } from "react-router-dom";
import businessActivityLogo from "../../assets/images/investment/business/empty_state_icon.svg";
import { useDispatch, useSelector } from "react-redux";
import { fetchCountriesRequest } from "../../store/actions/countryActions";
import { selectCountryList } from "../../store/selectors/countrySelectors";
import { Country } from "../../store/types/countryTypes";
import {
  selectCities,
  selectCityError,
  selectCityLoading,
} from "../../store/selectors/citySelectors";
import { fetchCitiesRequest } from "../../store/actions/cityActions";
import { selectRegions } from "../../store/selectors/regionSelectors";
import { fetchRegionsRequest } from "../../store/actions/regionActions";
import { Region } from "../../store/types/regionTypes";
import {
  addActivityRows,
  resetBusinessActivity,
} from "../../store/reducers/businessActivitySlice";
import { fetchLegalStatusRequest } from "../../store/actions/legalStatusActions";
import {
  selectLegalStatusError,
  selectLegalStatuses,
  selectLegalStatusLoading,
} from "../../store/selectors/legalStatusSelectors";
import { LegalStatus } from "../../store/types/legalStatus";
import { fetchExpectedInvestmentsRequest } from "../../store/actions/expectedInvestmentActions";
import {
  selectExpectedInvestmentError,
  selectExpectedInvestmentList,
  selectExpectedInvestmentLoading,
} from "../../store/selectors/expectedInvestmentSelectors";
import { registerEntityRequest } from "../../store/actions/entityRegistrationActions";
import { BusinessActivityRowItem } from "../../store/types/businessActivity";
import { RootState, store } from "../../store";
import { selectEntityRegistrationLoading } from "../../store/selectors/entityRegistrationSelectors";
import { EntityInformation } from "../../store/types/getEntityList";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Attachment from "./modal/Attachment";
import { useTranslation } from "react-i18next";

type EntityInformationFormProps = {
  registrationTypeId: number | null;
  onSuccess?: () => void;
  entityInfo: EntityInformation | null;
};

export const EntityInformationForm = forwardRef<
  { submit: () => void },
  EntityInformationFormProps
>(({ registrationTypeId, onSuccess, entityInfo }, ref) => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === "ar";
  const [showModal, setShowModal] = useState(false);

  const [formData, setFormData] = useState({
    entity_name: "",
    entity_name_arabic: "",
    legal_status_id: "",
    capital: "",
    country_id: "",
    region_id: "",
    city_id: "",
    email: "",
    mobile_country_code_id: "",
    mobile_phone: "",
    investment_id: "",
    license_duration: "1",
    list_of_rhq_corporate_activties: [] as string[],
    activity_ids: [] as number[],
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const countries = useSelector(selectCountryList);
  const cities = useSelector(selectCities);
  const regions = useSelector(selectRegions);
  const legalStatuses = useSelector(selectLegalStatuses);
  const expectedInvestments = useSelector(selectExpectedInvestmentList);
  const [boardResolutionFile, setBoardResolutionFile] = useState<File | null>(
    null
  );
  const [letterOfSupportFile, setLetterOfSupportFile] = useState<File | null>(
    null
  );

  const activityRows: BusinessActivityRowItem[] = useSelector(
    (state: RootState) => state.businessActivity.activityRows
  );
  const activityIds = activityRows.map((row) => row.activity.id);
  const registrationSuccess = useSelector(selectEntityRegistrationLoading);

  useEffect(() => {
    if (entityInfo) {
      setFormData({
        entity_name: entityInfo.entity_name ?? "",
        entity_name_arabic: entityInfo.entity_name_arabic ?? "",
        legal_status_id: entityInfo.legal_status_id?.toString() ?? "",
        capital: entityInfo.capital?.toString() ?? "",
        country_id: entityInfo.country_id?.toString() ?? "",
        region_id: entityInfo.region_id?.toString() ?? "",
        email: entityInfo.email?.toString() ?? "",
        mobile_country_code_id:
          entityInfo.mobile_country_code_id?.toString() ?? "",
        mobile_phone: entityInfo.mobile_phone?.toString() ?? "",
        city_id: entityInfo.city_id?.toString() ?? "",
        license_duration: entityInfo.license_duration?.toString() ?? "1",
        investment_id: entityInfo?.investment_id?.toString() ?? "",
        list_of_rhq_corporate_activties: [],
        activity_ids: entityInfo.activities?.map((a) => a.id) ?? [],
      });
    }
  }, [entityInfo]);

  useEffect(() => {
    dispatch(fetchCountriesRequest());
    dispatch(fetchCitiesRequest());
    dispatch(fetchRegionsRequest());
    dispatch(fetchExpectedInvestmentsRequest());
  }, [dispatch]);

  useEffect(() => {
    if (registrationTypeId) {
      dispatch(fetchLegalStatusRequest(registrationTypeId));
    }
  }, [dispatch, registrationTypeId]);

  useEffect(() => {
    if (registrationSuccess) {
      onSuccess?.();
    }
  }, [registrationSuccess]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    const requiredFields: (keyof typeof formData)[] = [
      "entity_name",
      "entity_name_arabic",
      "legal_status_id",
      "capital",
      "country_id",
      "region_id",
      "city_id",
      "investment_id",
      "license_duration",
    ];

    for (const field of requiredFields) {
      if (!formData[field]) {
        newErrors[field] = t("entityInformation.requiredField");
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  useImperativeHandle(ref, () => ({
    submit: () => handleSubmit(),
  }));

  const handleSubmit = () => {
    if (!registrationTypeId) return;

    const isValid = validate();
    if (!isValid) return;

    if (activityIds.length === 0) {
      toast.error(t("entityInformation.validation.minActivities"));
      return;
    }

    const payload = {
      ...formData,
      mobile_phone: formData.mobile_phone,
      mobile_country_code_id: formData.mobile_country_code_id,
      investment_registration_type_id: registrationTypeId,
      activity_ids: activityIds,
      board_resolution_file: boardResolutionFile,
      letter_of_support_file: letterOfSupportFile,
    };

    if (entityInfo?.id) {
      const updatePayload = {
        ...payload,
        _method: "PUT",
        id: entityInfo.id,
      };
      dispatch(registerEntityRequest(updatePayload));
    } else {
      dispatch(registerEntityRequest(payload));
    }
  };

  return (
    <>
      <OuterCard $isRTL={isRTL}>
        {activityRows.length === 0 && (
          <InnerCard>
            <EmptyState>
              <Icon>
                <img
                  src={businessActivityLogo}
                  alt={t("entityInformation.addActivitiesButton")}
                />
              </Icon>
              <EmptyText>
                {t("entityInformation.noRecords")}
                <br />
                {t("entityInformation.addActivitiesPrompt")}
              </EmptyText>
              <AddButton
                onClick={() => {
                  dispatch(resetBusinessActivity());
                  navigate("/businessReg", {
                    state: { registrationTypeId },
                  });
                }}
              >
                {t("entityInformation.addActivitiesButton")}
              </AddButton>
            </EmptyState>
          </InnerCard>
        )}

        <Section>
          <SectionTitle>{t("entityInformation.basicInfo")}</SectionTitle>
          <Row>
            <InputWrapper>
              <Label>
                <span>*</span> {t("entityInformation.entityNameEn")}
              </Label>
              <Input
                name="entity_name"
                value={formData.entity_name}
                onChange={handleChange}
                placeholder={t("entityInformation.enterPlaceholder", {
                  field: t("entityInformation.entityNameEn"),
                })}
                $isRTL={isRTL}
              />
              {errors.entity_name && (
                <ErrorText>{errors.entity_name}</ErrorText>
              )}
            </InputWrapper>

            <InputWrapper>
              <Label>
                <span>*</span> {t("entityInformation.entityNameAr")}
              </Label>
              <Input
                name="entity_name_arabic"
                value={formData.entity_name_arabic}
                onChange={handleChange}
                placeholder={t("entityInformation.enterPlaceholder", {
                  field: t("entityInformation.entityNameAr"),
                })}
                $isRTL={isRTL}
              />
              {errors.entity_name_arabic && (
                <ErrorText>{errors.entity_name_arabic}</ErrorText>
              )}
            </InputWrapper>
          </Row>

          <Row>
            <InputWrapper>
              <Label>
                <span>*</span> {t("entityInformation.legalStatus")}
              </Label>
              <Select
                name="legal_status_id"
                value={formData.legal_status_id}
                onChange={handleChange}
                $isRTL={isRTL}
              >
                <option value="" disabled hidden>
                  {t("entityInformation.selectPlaceholder", {
                    field: t("entityInformation.legalStatus"),
                  })}
                </option>
                {legalStatuses.map((legal) => (
                  <option key={legal.id} value={legal.id}>
                    {legal.name}
                  </option>
                ))}
              </Select>
              {errors.legal_status_id && (
                <ErrorText>{errors.legal_status_id}</ErrorText>
              )}
            </InputWrapper>

            <InputWrapper>
              <Label>
                <span>*</span> {t("entityInformation.capital")}
              </Label>
              <CurrencyWrapper $isRTL={isRTL}>
                <Currency>{t("common.currency")}</Currency>
                <Input
                  name="capital"
                  value={formData.capital}
                  onChange={handleChange}
                  placeholder={t("entityInformation.enterPlaceholder", {
                    field: t("entityInformation.capital"),
                  })}
                  $isRTL={isRTL}
                />
              </CurrencyWrapper>
              {errors.capital && <ErrorText>{errors.capital}</ErrorText>}
            </InputWrapper>
          </Row>

          <Row>
            <InputWrapper>
              <Label>
                <span>*</span> {t("entityInformation.email")}
              </Label>
              <Input
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder={t("entityInformation.enterPlaceholder", {
                  field: t("entityInformation.email"),
                })}
                $isRTL={isRTL}
              />
              {errors.email && <ErrorText>{errors.email}</ErrorText>}
            </InputWrapper>

            <InputWrapper>
              <Label>
                <span>*</span> {t("entityInformation.mobileNumber")}
              </Label>
              <div style={{ display: "flex", gap: "10px" }}>
                <Select
                  name="mobile_country_code_id"
                  value={formData.mobile_country_code_id}
                  onChange={handleChange}
                  style={{ width: "25%" }}
                >
                  <option value="" disabled hidden>
                    + Code
                  </option>
                  {countries.map((country: Country) => (
                    <option key={country.id} value={country.id}>
                      +{country.phone_prefix} ({country.name})
                    </option>
                  ))}
                </Select>

                <Input
                  name="mobile_phone"
                  type="tel"
                  value={formData.mobile_phone}
                  onChange={handleChange}
                  placeholder={t("entityInformation.enterPlaceholder", {
                    field: t("entityInformation.mobileNumber"),
                  })}
                  $isRTL={isRTL}
                />
              </div>
              {errors.mobile_country_code_id && (
                <ErrorText>{errors.mobile_country_code_id}</ErrorText>
              )}
              {errors.mobile_phone && (
                <ErrorText>{errors.mobile_phone}</ErrorText>
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
                  {t("entityInformation.selectPlaceholder", {
                    field: t("entityInformation.country"),
                  })}
                </option>
                {countries.map((country: Country) => (
                  <option key={country.id} value={country.id}>
                    {country.name}
                  </option>
                ))}
              </Select>
              {errors.country_id && <ErrorText>{errors.country_id}</ErrorText>}
            </InputWrapper>

            <InputWrapper>
              <Label>
                <span>*</span> {t("entityInformation.region")}
              </Label>
              <Select
                name="region_id"
                value={formData.region_id}
                onChange={handleChange}
                $isRTL={isRTL}
              >
                <option value="" disabled hidden>
                  {t("entityInformation.selectPlaceholder", {
                    field: t("entityInformation.region"),
                  })}
                </option>
                {regions.map((region) => (
                  <option key={region.id} value={region.id}>
                    {region.name}
                  </option>
                ))}
              </Select>
              {errors.region_id && <ErrorText>{errors.region_id}</ErrorText>}
            </InputWrapper>
          </Row>

          <Row>
            <InputWrapper>
              <Label>
                <span>*</span> {t("entityInformation.city")}
              </Label>
              <Select
                name="city_id"
                value={formData.city_id}
                onChange={handleChange}
                $isRTL={isRTL}
              >
                <option value="" disabled hidden>
                  {t("entityInformation.selectPlaceholder", {
                    field: t("entityInformation.city"),
                  })}
                </option>
                {cities.map((city) => (
                  <option key={city.id} value={city.id}>
                    {city.name}
                  </option>
                ))}
              </Select>
              {errors.city_id && <ErrorText>{errors.city_id}</ErrorText>}
            </InputWrapper>

            <InputWrapper>
              <Label>
                <span>*</span> {t("entityInformation.investmentSpending")}
              </Label>
              <Select
                name="investment_id"
                value={formData.investment_id}
                onChange={handleChange}
                $isRTL={isRTL}
              >
                <option value="" disabled hidden>
                  {t("entityInformation.selectPlaceholder", {
                    field: t("entityInformation.investmentSpending"),
                  })}
                </option>
                {expectedInvestments.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.name}
                  </option>
                ))}
              </Select>
              {errors.investment_id && (
                <ErrorText>{errors.investment_id}</ErrorText>
              )}
            </InputWrapper>
          </Row>
        </Section>

        <Section>
          <SectionTitle>{t("entityInformation.feeDuration")}</SectionTitle>
          <InputWrapper style={{ maxWidth: "600px" }}>
            <Label>
              <span>*</span> {t("entityInformation.licenseDuration")}
            </Label>
            <Select
              name="license_duration"
              value={formData.license_duration}
              onChange={handleChange}
              $isRTL={isRTL}
            >
              <option value="" disabled hidden>
                {t("entityInformation.selectPlaceholder", {
                  field: t("entityInformation.licenseDuration"),
                })}
              </option>
              {[1, 2, 3, 4, 5].map((val) => (
                <option key={val} value={val}>
                  {val}
                </option>
              ))}
            </Select>
            {errors.license_duration && (
              <ErrorText>{errors.license_duration}</ErrorText>
            )}
          </InputWrapper>
        </Section>

        <Attachment
          boardResolutionFile={boardResolutionFile}
          setBoardResolutionFile={setBoardResolutionFile}
          letterOfSupportFile={letterOfSupportFile}
          setLetterOfSupportFile={setLetterOfSupportFile}
        />
      </OuterCard>

      {showModal && (
        <RegistrationActivityModal onClose={() => setShowModal(false)} />
      )}
    </>
  );
});

// Styled Components
const OuterCard = styled.div<{ $isRTL?: boolean }>`
  background: #ffffff;
  padding: 20px;
  border-radius: 12px;
  border: 0.5px solid #bdd7db;
  margin-top: 20px;
  direction: ${(props) => (props.$isRTL ? "rtl" : "ltr")};
`;

const InnerCard = styled.div`
  background: #ffffff;
  padding: 24px;
  border-radius: 12px;
  border: 1px solid #cac4d0;
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
  gap: 6px;
  margin-bottom: 20px;
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

const Currency = styled.div`
  margin-right: 8px;
  color: #1f2937;
  font-size: 14px;
  white-space: nowrap;
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 40px;
  border-radius: 8px;
`;

const Icon = styled.div`
  font-size: 48px;
  margin-bottom: 12px;
  text-align: center;
`;

const EmptyText = styled.div`
  font-size: 14px;
  margin-bottom: 16px;
  color: #666;
`;

const AddButton = styled.button`
  background-color: #007c92;
  color: white;
  padding: 10px 20px;
  border-radius: 6px;
  border: none;
  cursor: pointer;
`;

const ErrorText = styled.div`
  color: red;
  font-size: 12px;
  margin-top: 4px;
`;

export default EntityInformationForm;
