import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";
import styled from "styled-components";
import SectionTitle from "../../components/common/SectionTitle";
import AddShareholderModal from "./AddShareholderModal";
import success from "../../assets/images/success.svg";
import { useDispatch } from "react-redux";
import { fetchContactPersonsListRequest } from "../../store/actions/contactPersonListActions";
import { useSelector } from "react-redux";
import {
  selectContactPersons,
  selectContactPersonsError,
  selectContactPersonsLoading,
} from "../../store/selectors/contactPersonListSelectors";
import { ContactPersonFormData } from "../../store/types/contactPersonTypes";
import {
  createContactPersonRequest,
  updateContactPersonRequest,
} from "../../store/actions/contactPersonActions";
import { fetchCountriesRequest } from "../../store/actions/countryActions";
import { fetchCitiesRequest } from "../../store/actions/cityActions";
import { selectCountryList } from "../../store/selectors/countrySelectors";
import { selectCities } from "../../store/selectors/citySelectors";
import { Country } from "../../store/types/countryTypes";
import { selectShareholderPersons } from "../../store/selectors/shareholderPersonListSelectors";
import { fetchShareholderPersonsRequest } from "../../store/actions/shareholderPersonListActions";
import { selectTitleList } from "../../store/selectors/titleSelectors";
import { fetchTitlesRequest } from "../../store/actions/titleActions";
import { selectShareholderIdTypes } from "../../store/selectors/shareHolderIdSelector";
import { fetchShareholderIdTypesRequest } from "../../store/actions/shareHolderIdActions";
import { selectContactPersonData } from "../../store/selectors/contactPersonSelectors";
import { useTranslation } from "react-i18next";
// Card Wrapper
const Card = styled.div`
  background: #ffffff;
  border-radius: 12px;
  padding: 32px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.06);
  width: 80%;
  margin: 0 auto;
  border: 1px solid #e5e7eb;
  margin-top: 2rem;
`;

// Section Headers
const SubSectionTitle = styled.h4`
  font-size: 22px;
  font-weight: 600;
  margin-bottom: 1.5rem;
  background: linear-gradient(90deg, #cedfe3, #cedfe300);
  padding: 1rem;
  border-radius: 8px 8px 0 0;
`;

// Layout
const FieldGroup = styled.div`
  display: flex;
  gap: 24px;
  margin-bottom: 16px;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const Field = styled.div`
  flex: 1;

  &.validation-field {
    display: flex;
    align-items: flex-end;
    justify-content: flex-start;
    gap: 8px;
    min-height: 44px;
  }
`;

const Label = styled.label`
  font-size: 14px;
  font-weight: 600;
  display: block;
  margin-bottom: 6px;
  color: #3e4448;
  &::before {
    content: "*";
    color: red;
    margin-left: 4px;
  }
`;

const Input = styled.input`
  width: 100%;
  padding: 12px 0;
  border: none;
  border-bottom: 2px solid #d1d5db;
  background: transparent;
  outline: none;
`;

const Select = styled.select`
  width: 100%;
  padding: 12px 0;
  border: none;
  border-bottom: 2px solid #d1d5db;
  background: transparent;
  outline: none;
`;

const RadioGroup = styled.div`
  display: flex;
  gap: 24px;
  margin: 8px 0 20px;
  align-items: center;

  label {
    display: flex;
    align-items: center;
    gap: 6px;
    font-weight: 500;
    color: black;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  margin-top: 32px;
`;

const Button = styled.button<{ primary?: boolean }>`
  padding: 12px 28px;
  border-radius: 8px;
  font-weight: 600;
  font-size: 14px;
  border: ${(props) => (props.primary ? "none" : "2px solid #0891b2")};
  background: ${(props) => (props.primary ? "#0891b2" : "#ffffff")};
  color: ${(props) => (props.primary ? "#ffffff" : "#0891b2")};
  cursor: pointer;
`;

const TitleRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Title = styled.h2`
  font-size: 20px;
  font-weight: 600;
  color: #161616;
`;

type ContactPersonFormProps = {
  onSuccess?: () => void;
};

export const ContactPersonForm = forwardRef<
  { submit: () => void },
  ContactPersonFormProps
>(({ onSuccess }, ref) => {
  const [selectedContact, setSelectedContact] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showValidationFields, setShowValidationFields] = useState(false);
  const [idNumber, setIdNumber] = useState("");
  const [dob, setDob] = useState("");
  const [idType, setIdType] = useState("National ID");
  const [isValidated, setIsValidated] = useState(false);
  const dispatch = useDispatch();

  const contactPersonList = useSelector(selectContactPersons);
  const contactPersonListLoading = useSelector(selectContactPersonsLoading);
  const contactPersonListError = useSelector(selectContactPersonsError);

  const shareHolderPersonList = useSelector(selectShareholderPersons);
  const shareholderIdTypes = useSelector(selectShareholderIdTypes);

  const contactPersonCreated = useSelector(selectContactPersonData);

  const countries = useSelector(selectCountryList);
  const cities = useSelector(selectCities);

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const [isOtherPerson, setIsOtherPerson] = useState<boolean>(false);

  const titles = useSelector(selectTitleList);

  const [isContactEdit, setIsContactEdit] = useState(false);
  const { t } = useTranslation();

  const defaultFormData: ContactPersonFormData = {
    nationality_id: "",
    country_id: "",
    id_type: "",
    title_id: "",
    telephone_code_country_id: "",
    mobile_code_country_id: "",
    first_name_arabic: "",
    last_name_arabic: "",
    role: "",
    education: "",
    date_of_birth: "",
    passport_number: "",
    passport_issue_date: "",
    passport_expiry_date: "",
    contact_person_city: "",
    address: "",
    po_box: "",
    postal_code: "",
    telephone_number: "",
    mobile_number: "",
    email: "",
    origin_contact: "",
    full_name: "",
  };

  const [formData, setFormData] =
    useState<ContactPersonFormData>(defaultFormData);

  useEffect(() => {
    dispatch(fetchContactPersonsListRequest());
    dispatch(fetchShareholderIdTypesRequest());
    dispatch(fetchCountriesRequest());
    dispatch(fetchTitlesRequest());
    dispatch(fetchCitiesRequest());
  }, [dispatch]);

  useEffect(() => {
    const checkContactEdit = async () => {
      const editFlag = await localStorage.getItem("isContactEdit");
      console.log("editFlag", editFlag);
      setIsContactEdit(editFlag === "true");
    };
    checkContactEdit();
  }, []);

  const clearForm = () => {
    setFormData(defaultFormData);
  };

  useEffect(() => {
    const fetchShareHolderPersonListData = async () => {
      try {
        const userId = await localStorage.getItem("userId");
        if (userId) {
          console.log("fetchShareholderPersonsRequest", userId);
          dispatch(fetchShareholderPersonsRequest(parseInt(userId)));
        }
      } catch (error) {
        console.error("Failed to fetch initial data:", error);
      }
    };
    console.log("contactPersonList", contactPersonList.length);
    if (contactPersonList.length == 0) {
      fetchShareHolderPersonListData();
    } else {
      setContactPersonItem();
    }
  }, [contactPersonList]);

  const handleContactChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    clearForm();
    const value = e.target.value;
    setSelectedContact(value);

    if (value === "Other Person") {
      setShowValidationFields(true);
      setIsOtherPerson(true);
      setIsValidated(false);
      setFormData({
        nationality_id: "",
        country_id: "",
        id_type: "",
        title_id: "",
        telephone_code_country_id: "",
        mobile_code_country_id: "",
        first_name_arabic: "",
        last_name_arabic: "",
        role: "",
        education: "",
        date_of_birth: "",
        passport_number: "",
        passport_issue_date: "",
        passport_expiry_date: "",
        contact_person_city: "",
        address: "",
        po_box: "",
        postal_code: "",
        telephone_number: "",
        mobile_number: "",
        email: "",
        origin_contact: "",
        full_name: "",
      });
    } else {
      const contact = shareHolderPersonList.find((c) => String(c.id) === value);
      console.log("contact", JSON.stringify(contact));
      if (contact) {
        setIsOtherPerson(false);
        setFormData({
          nationality_id: String(contact.nationality_id),
          country_id: String(contact.country_id),
          id_type: String(contact.id_type),
          title_id: String(contact.title_id),
          telephone_code_country_id: String(contact.telephone_code_country_id),
          mobile_code_country_id: String(contact.mobile_code_country_id),
          first_name_arabic: contact.first_name_arabic ?? "",
          last_name_arabic: contact.last_name_arabic ?? "",
          role: contact.role ?? "",
          education: contact.education ?? "",
          date_of_birth: contact.date_of_birth ?? "",
          passport_number: contact.passport_number ?? "",
          passport_issue_date: contact.passport_issue_date ?? "",
          passport_expiry_date: contact.passport_expiry_date ?? "",
          contact_person_city: contact.contact_person_city ?? "",
          address: contact.address ?? "",
          po_box: String(contact.po_box ?? ""),
          postal_code: contact.postal_code ?? "",
          telephone_number: contact.telephone_number ?? "",
          mobile_number: contact.mobile_number ?? "",
          email: contact.email ?? "",
          origin_contact: contact.origin_contact ?? "",
          full_name: contact.full_name ?? "",
        });
      }
    }
  };

  const setContactPersonItem = () => {
    const contact = contactPersonList[0];
    if (contact) {
      setIsOtherPerson(false);
      setFormData({
        nationality_id: String(contact.nationality_id),
        country_id: String(contact.country_id),
        id_type: String(contact.id_type),
        title_id: String(contact.title_id),
        telephone_code_country_id: String(contact.telephone_code_country_id),
        mobile_code_country_id: String(contact.mobile_code_country_id),
        first_name_arabic: contact.first_name_arabic ?? "",
        last_name_arabic: contact.last_name_arabic ?? "",
        role: contact.role ?? "",
        education: contact.education ?? "",
        date_of_birth: contact.date_of_birth ?? "",
        passport_number: contact.passport_number ?? "",
        passport_issue_date: contact.passport_issue_date ?? "",
        passport_expiry_date: contact.passport_expiry_date ?? "",
        contact_person_city: contact.contact_person_city ?? "",
        address: contact.address ?? "",
        po_box: String(contact.po_box ?? ""),
        postal_code: contact.postal_code ?? "",
        telephone_number: contact.telephone_number ?? "",
        mobile_number: contact.mobile_number ?? "",
        email: contact.email ?? "",
        origin_contact: contact.origin_contact ?? "",
        full_name: contact.full_name ?? "",
      });
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleValidate = () => {
    if (formData.id_type === "Passport") {
      setIsValidated(true);
      return;
    }

    // For other ID types, require number and DOB
    if (!formData.passport_number || !formData.date_of_birth) {
      alert("Please fill all required fields");
      return;
    }
    setIsValidated(true);
  };

  const showAdditionalFields =
    selectedContact !== "Other Person" || isValidated;

  const validateForm = () => {
    const requiredFields = [
      "nationality_id",
      "country_id",
      "id_type",
      "title_id",
      "first_name_arabic",
      "last_name_arabic",
      "date_of_birth",
      "passport_number",
      "passport_issue_date",
      "passport_expiry_date",
      "contact_person_city",
      "email",
      "full_name",
    ];

    const newErrors: { [key: string]: string } = {};
    requiredFields.forEach((field) => {
      if (!formData[field as keyof ContactPersonFormData]) {
        newErrors[field] = "This field is required";
      }
    });
    console.log("newErrors", JSON.stringify(newErrors));
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    console.log("handleSubmit");
    if (!isContactEdit && contactPersonList.length > 0) {
      onSuccess?.();
      return;
    }
    if (!validateForm()) return;

    const payload = buildFormData(formData);

    if (isContactEdit) {
      console.log("if called");
      const id = await localStorage.getItem("contactId");
      console.log("contactId--->", id);
      if (id) {
        dispatch(updateContactPersonRequest({ data: payload, id: id }));
      }
    } else {
      console.log("else called");

      dispatch(createContactPersonRequest(payload));
    }
    onSuccess?.();
  };

  const buildFormData = (data: Record<string, any>) => {
    const form = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      form.append(key, value ?? "");
    });
    return form;
  };

  useImperativeHandle(ref, () => ({
    submit: () => handleSubmit(),
  }));

  const isReadOnly = !(isOtherPerson || isContactEdit);

  console.log("isContactEdit", isContactEdit);

  return (
    <>
      <FieldGroup>
        <Field style={{ flex: 0.49 }}>
          <Label>{t("contactForm.contactPerson")}</Label>
          <Select value={selectedContact} onChange={handleContactChange}>
            <option>{t("contactForm.selectOption")}</option>
            {shareHolderPersonList.map((contact) => (
              <option key={contact.id} value={contact.id}>
                {contact.full_name}
              </option>
            ))}
            <option value={"Other Person"}>
              {t("contactForm.otherPerson")}
            </option>
          </Select>
        </Field>
      </FieldGroup>

      {showValidationFields && (
        <>
          <FieldGroup>
            <Field
              style={{ flex: formData.id_type === "Passport" ? 0.5 : 0.5 }}
            >
              <Label>{t("contactForm.identityType")}</Label>
              <Select
                value={formData.id_type}
                onChange={(e) => {
                  setFormData({
                    ...formData,
                    id_type: e.target.value,
                    passport_number: "",
                  });
                  if (e.target.value === "Passport") {
                    setIsValidated(true);
                  } else {
                    setIsValidated(false);
                  }
                }}
                disabled={!isOtherPerson}
              >
                <option value="">{t("contactForm.selectOption")}</option>
                {shareholderIdTypes.map((idT) => (
                  <option key={idT.id} value={idT.name}>
                    {idT.name}
                  </option>
                ))}
              </Select>
            </Field>

            {formData.id_type === "Passport" ? (
              <Field style={{ flex: 0.49, visibility: "hidden" }}></Field>
            ) : (
              <Field style={{ flex: 0.49 }}>
                <Label>{t("contactForm.identityNumber")}</Label>
                <Input
                  value={formData.passport_number}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      passport_number: e.target.value,
                    })
                  }
                  readOnly={isReadOnly}
                  placeholder={t("contactForm.enterIdentityNumber")}
                />
              </Field>
            )}
          </FieldGroup>

          <FieldGroup>
            {formData.id_type !== "Passport" && (
              <Field style={{ flex: 0.49 }}>
                <Label>{t("contactForm.dateOfBirth")}</Label>
                <Input
                  type="date"
                  value={formData.date_of_birth}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      date_of_birth: e.target.value,
                    })
                  }
                  readOnly={!isOtherPerson}
                />
              </Field>
            )}

            {isOtherPerson &&
              !isValidated &&
              formData.id_type !== "Passport" && (
                <Field
                  style={{
                    display: "flex",
                    alignItems: "flex-end",
                    justifyContent: "flex-start",
                    gap: "8px",
                    flex: formData.id_type === "Passport" ? 1 : 0.49,
                  }}
                >
                  <Button onClick={handleValidate}>
                    {t("contactForm.validate")}
                  </Button>
                </Field>
              )}
          </FieldGroup>
        </>
      )}

      {showAdditionalFields && (
        <>
          <FieldGroup>
            <Field>
              <Label>{t("contactForm.title")}</Label>
              <Select
                name="title"
                value={formData.title_id}
                onChange={(e) =>
                  setFormData({ ...formData, title_id: e.target.value })
                }
                disabled={isReadOnly}
              >
                <option value="">{t("contactForm.selectOption")}</option>
                {titles.map((title) => (
                  <option key={title.id} value={title.id}>
                    {title.token}
                  </option>
                ))}
              </Select>
              {errors.title && (
                <span style={{ color: "red", fontSize: 12 }}>
                  {t("contactForm.requiredField")}
                </span>
              )}
            </Field>
          </FieldGroup>

          <FieldGroup>
            <Field>
              <Label>{t("contactForm.firstNameArabic")}</Label>
              <Input
                value={formData.first_name_arabic}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    first_name_arabic: e.target.value,
                  })
                }
                readOnly={isReadOnly}
              />
              {errors.first_name_arabic && (
                <span style={{ color: "red", fontSize: 12 }}>
                  {t("contactForm.requiredField")}
                </span>
              )}
            </Field>
            <Field>
              <Label>{t("contactForm.lastNameArabic")}</Label>
              <Input
                value={formData.last_name_arabic}
                onChange={(e) =>
                  setFormData({ ...formData, last_name_arabic: e.target.value })
                }
                readOnly={isReadOnly}
              />
              {errors.last_name_arabic && (
                <span style={{ color: "red", fontSize: 12 }}>
                  {t("contactForm.requiredField")}
                </span>
              )}
            </Field>
          </FieldGroup>

          <FieldGroup>
            <Field>
              <Label>{t("contactForm.fullNameEnglish")}</Label>
              <Input
                value={formData.full_name}
                onChange={(e) =>
                  setFormData({ ...formData, full_name: e.target.value })
                }
                readOnly={isReadOnly}
              />
              {errors.full_name && (
                <span style={{ color: "red", fontSize: 12 }}>
                  {t("contactForm.requiredField")}
                </span>
              )}
            </Field>
            <Field>
              <Label>{t("contactForm.currentNationality")}</Label>
              <Select
                value={formData.nationality_id}
                onChange={(e) =>
                  setFormData({ ...formData, nationality_id: e.target.value })
                }
                disabled={isReadOnly}
              >
                <option value="">{t("contactForm.selectOption")}</option>
                {countries.map((country: Country) => (
                  <option key={country.id} value={country.id}>
                    {country.name}
                  </option>
                ))}
              </Select>
              {errors.nationality_id && (
                <span style={{ color: "red", fontSize: 12 }}>
                  {t("contactForm.requiredField")}
                </span>
              )}
            </Field>
          </FieldGroup>

          <FieldGroup>
            <Field>
              <Label>{t("contactForm.dateOfBirth")}</Label>
              <Input
                type="date"
                value={formData.date_of_birth}
                onChange={(e) =>
                  setFormData({ ...formData, date_of_birth: e.target.value })
                }
                readOnly={isReadOnly}
              />
              {errors.date_of_birth && (
                <span style={{ color: "red", fontSize: 12 }}>
                  {t("contactForm.requiredField")}
                </span>
              )}
            </Field>
            <Field>
              <Label>{t("contactForm.identityNumber")}</Label>
              <Input
                value={formData.passport_number}
                onChange={(e) =>
                  setFormData({ ...formData, passport_number: e.target.value })
                }
                readOnly={isReadOnly}
              />
              {errors.passport_number && (
                <span style={{ color: "red", fontSize: 12 }}>
                  {t("contactForm.requiredField")}
                </span>
              )}
            </Field>
          </FieldGroup>
          <FieldGroup>
            <Field>
              <Label>{t("contactForm.idIssueDate")}</Label>
              <Input
                type="date"
                value={formData.passport_issue_date}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    passport_issue_date: e.target.value,
                  })
                }
                readOnly={isReadOnly}
              />
              {errors.passport_issue_date && (
                <span style={{ color: "red", fontSize: 12 }}>
                  {t("contactForm.requiredField")}
                </span>
              )}
            </Field>

            <Field>
              <Label>{t("contactForm.idExpiryDate")}</Label>
              <Input
                type="date"
                value={formData.passport_expiry_date}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    passport_expiry_date: e.target.value,
                  })
                }
                readOnly={isReadOnly}
              />
              {errors.passport_expiry_date && (
                <span style={{ color: "red", fontSize: 12 }}>
                  {t("contactForm.requiredField")}
                </span>
              )}
            </Field>
          </FieldGroup>

          <SectionTitle>{t("contactForm.contactInformation")}</SectionTitle>

          <FieldGroup>
            <Field>
              <Label>{t("contactForm.country")}</Label>
              <Select
                value={formData.country_id}
                onChange={(e) =>
                  setFormData({ ...formData, country_id: e.target.value })
                }
                disabled={isReadOnly}
              >
                <option value="">{t("contactForm.selectCountry")}</option>
                {countries.map((country: Country) => (
                  <option key={country.id} value={country.id}>
                    {country.name}
                  </option>
                ))}
              </Select>
              {errors.country_id && (
                <span style={{ color: "red", fontSize: 12 }}>
                  {t("contactForm.requiredField")}
                </span>
              )}
            </Field>
            <Field>
              <Label>{t("contactForm.city")}</Label>
              <Input
                value={formData.contact_person_city}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    contact_person_city: e.target.value,
                  })
                }
                readOnly={isReadOnly}
                placeholder={t("contactForm.enterCity")}
              />
              {errors.contact_person_city && (
                <span style={{ color: "red", fontSize: 12 }}>
                  {t("contactForm.requiredField")}
                </span>
              )}
            </Field>
          </FieldGroup>

          <FieldGroup>
            <Field>
              <Label>{t("contactForm.mobileNumber")}</Label>
              <Input
                placeholder={t("contactForm.enterMobileNumber")}
                value={formData.mobile_number}
                onChange={(e) =>
                  setFormData({ ...formData, mobile_number: e.target.value })
                }
                disabled={isReadOnly}
              />
              {errors.mobile_number && (
                <span style={{ color: "red", fontSize: 12 }}>
                  {t("contactForm.requiredField")}
                </span>
              )}
            </Field>

            <Field>
              <Label>{t("contactForm.emailAddress")}</Label>
              <Input
                placeholder={t("contactForm.enterEmailAddress")}
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                disabled={isReadOnly}
              />
              {errors.email && (
                <span style={{ color: "red", fontSize: 12 }}>
                  {t("contactForm.requiredField")}
                </span>
              )}
            </Field>
          </FieldGroup>
        </>
      )}

      {showModal && (
        <AddShareholderModal
          isOpen={true}
          onClose={handleCloseModal}
          shareHolderId={0}
          customerId={0}
          sharePercentage=""
        />
      )}
    </>
  );
});

export default ContactPersonForm;
