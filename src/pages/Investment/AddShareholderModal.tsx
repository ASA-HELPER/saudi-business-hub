import React, { useEffect, useState } from "react";
import styled from "styled-components";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import SectionTitle from "../../components/common/SectionTitle";
import exp from "constants";
import { fetchShareholderIdTypesRequest } from "../../store/actions/shareHolderIdActions";
import { useDispatch, useSelector } from "react-redux";
import {
  selectShareholderIdTypes,
  selectShareholderIdTypesError,
  selectShareholderIdTypesLoading,
} from "../../store/selectors/shareHolderIdSelector";
import { fetchCountriesRequest } from "../../store/actions/countryActions";
import { fetchTitlesRequest } from "../../store/actions/titleActions";
import { selectCountryList } from "../../store/selectors/countrySelectors";
import { selectTitleList } from "../../store/selectors/titleSelectors";
import { Country } from "../../store/types/countryTypes";
import { createShareholderRequest } from "../../store/actions/shareHolderCreateAction";
import { ShareholderPersonPayload } from "../../store/types/shareHolderPersonTypes";
import { selectCreateShareholderSuccess } from "../../store/selectors/shareHolderCreateSelector";
const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
`;

const ModalContainer = styled.div`
  background: #fff;
  border-radius: 16px;
  width: 95%;
  max-width: 1600px;
  max-height: 700px;

  display: flex;
  flex-direction: column;
  overflow: hidden;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 24px;
  border-bottom: 1px solid #e0e0e0;
`;

const ModalTitle = styled.h2`
  font-size: 30px;
  font-weight: 600;
  color: #161616;
`;

const CloseButton = styled.button`
  border: 2px solid #000;
  background: #fff;
  color: #000;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  font-size: 18px;
  font-weight: bold;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  transition: background 0.2s;

  &:hover {
    background: #f0f0f0;
  }
`;

const ModalBody = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 24px;
`;

const ModalFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 16px;
  padding: 24px;
  border-top: 1px solid #e0e0e0;
`;

const RadioGroup = styled.div`
  display: flex;
  gap: 32px;
  margin-bottom: 24px;
  align-items: center;
`;

const Circle = styled.div<{ active: boolean }>`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: 2px solid #007d8a;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 8px;
`;

const InnerCircle = styled.div<{ active: boolean }>`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: ${({ active }) => (active ? "#007d8a" : "transparent")};
`;

const RadioButton = styled.div<{ active: boolean }>`
  display: flex;
  align-items: center;
  cursor: pointer;
  font-size: 14px;
  color: ${({ active }) => (active ? "#000" : "#888")};
`;

const ShareholderTypeWrapper = styled.div`
  position: relative;
  margin-bottom: 24px;
`;

// const SubSectionTitle = styled.h3`
//   font-size: 20px;
//   font-weight: 600;
//   margin: 0;
//   padding-bottom: 8px;
//   color: #161616;
// `;

const Indicator = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  height: 2px;
  width: 100%;
  background: linear-gradient(to right, #9333ea 120px, #e5e7eb 120px);
`;

const InputsRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: flex-end;
  gap: 16px;
  margin-top: 20px;
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  min-width: 200px;
  margin-top: 10px;
`;

const Label = styled.label`
  font-size: 14px;
  font-weight: 400;
  margin-bottom: 8px;
  color: #3e4448;
`;

const Input = styled.input`
  padding: 8px 4px;
  border: none;
  border-bottom: 1px solid #cfd4dc;
  outline: none;
  background: transparent;
  font-size: 14px;
`;

const Select = styled.select`
  padding: 8px 4px;
  border: none;
  border-bottom: 1px solid #cfd4dc;
  outline: none;
  background: transparent;
  font-size: 14px;
`;

const ValidateButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
  margin-top: 20px;
`;

const ValidateButton = styled.button`
  background: transparent;
  border: 2px solid #007d8a;
  color: #007d8a;
  padding: 12px 24px;
  border-radius: 8px;
  cursor: pointer;
  height: 48px;
`;

// const ModalFooter = styled.div`
//   display: flex;
//   justify-content: flex-end;
//   gap: 16px;
//   margin-top: 32px;
// `;

const SecondaryButton = styled.button`
  border: 2px solid #007d8a;
  background: white;
  color: #007d8a;
  padding: 12px 24px;
  border-radius: 8px;
  cursor: pointer;
`;

const PrimaryButton = styled.button`
  border: none;
  background: #00778e;
  color: white;
  padding: 12px 24px;
  border-radius: 8px;
  cursor: pointer;
  //opacity: 50%;
`;

const UploadBox = styled.div`
  border: 1px dashed #cfd4dc;
  border-radius: 8px;
  padding: 32px;
  text-align: center;
  background: #fafafa;
`;

const UploadIcon = styled.div`
  font-size: 32px;
  color: #888;
  margin-bottom: 8px;
`;

const UploadText = styled.div`
  font-size: 14px;
  color: #555;
  margin-bottom: 12px;
`;

const UploadButton = styled.button`
  background: none;
  border: none;
  color: #007d8a;
  font-weight: 600;
  cursor: pointer;
  text-decoration: underline;
`;

const UploadedFileBox = styled.div`
  display: flex;
  align-items: center;
  background: #f1f5f9;
  border-radius: 8px;
  padding: 12px;
  //margin-top: 12px;
`;

const CheckIcon = styled.div`
  width: 24px;
  height: 24px;
  background: #00b185;
  color: #fff;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 8px;
  font-size: 14px;
`;

const FileName = styled.span`
  flex: 1;
  font-size: 14px;
  color: #000;
`;

const RemoveButton = styled.button`
  border: none;
  background: none;
  color: #000;
  font-size: 18px;
  cursor: pointer;
`;

const Title = styled.h3`
  font-size: 1.125rem;
  font-weight: 600;
  margin: 1.5rem 0 1rem;
  padding-bottom: 0.5rem;
  color: #000;
`;

const ErrorText = styled.div`
  color: red;
  font-size: 12px;
  margin-top: 4px;
`;

const SelectedFilePreview = styled.div`
  margin-top: 8px;
  color: green;
  font-size: 14px;
`;

const StyledDatePicker = styled(DatePicker)`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 14px;
  width: 100%;
`;

export default function AddShareholderModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const dispatch = useDispatch();

  const [shareholderType, setShareholderType] = useState("new");
  const [personOrOrg, setPersonOrOrg] = useState("person");
  const [isValidated, setIsValidated] = useState(false);
  const [isExistingValidated, setExistingIsValidated] = useState(false);

  const [orgCountry, setOrgCountry] = useState("");
  const [orgValidated, setOrgValidated] = useState(false);
  const [professionalLicense, setProfessionalLicense] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [identityType, setIdentityType] = useState("");
  const [fileError, setFileError] = useState<string>("");

  const allowedTypes = [
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document", // .docx
    "image/jpeg",
    "image/jpg",
    "image/png",
  ];

  const maxSizeInBytes = 2 * 1024 * 1024; // 2MB

  const handleFile = (file: File) => {
    if (!allowedTypes.includes(file.type)) {
      setFileError(
        "Unsupported file type. Only PDF, DOC, DOCX, JPG, PNG allowed."
      );
      setSelectedFile(null);
      return;
    }

    if (file.size > maxSizeInBytes) {
      setFileError("File size exceeds 2MB.");
      setSelectedFile(null);
      return;
    }

    setSelectedFile(file);
    setFileError("");
  };

  type FormDataType = {
    identityType: string;
    title: string;
    firstNameArabic: string;
    lastNameArabic: string;
    fullName: string;
    sharePercentage: string;
    identityNumber: string;
    nationality: string;
    country: string;
    city: string;
    professionalLicense: string;
    mobile_code_country_id: string;
    phoneNumber: string;
    email: string;
    placeOfBirth: string;
    passportIssueDate: string;
    passportExpiryDate: string;
    dateOfBirth: string;
  };

  const [formData, setFormData] = useState<FormDataType>({
    identityType: "",
    title: "",
    firstNameArabic: "",
    lastNameArabic: "",
    fullName: "",
    sharePercentage: "",
    identityNumber: "",
    nationality: "",
    country: "",
    city: "",
    professionalLicense: "",
    mobile_code_country_id: "",
    phoneNumber: "",
    email: "",
    placeOfBirth: "",
    passportIssueDate: "",
    passportExpiryDate: "",
    dateOfBirth: "",
  });

  const [startDate, setStartDate] = useState(new Date());

  const shareholderIdTypes = useSelector(selectShareholderIdTypes);
  const shareholderIdTypesLoading = useSelector(
    selectShareholderIdTypesLoading
  );
  const shareholderIdTypesError = useSelector(selectShareholderIdTypesError);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const countries = useSelector(selectCountryList);
  const titles = useSelector(selectTitleList);
  const isAddedSuccessfully = useSelector(selectCreateShareholderSuccess);

  useEffect(() => {
    dispatch(fetchCountriesRequest());
    dispatch(fetchTitlesRequest());
    dispatch(fetchShareholderIdTypesRequest());
  }, [dispatch]);

  useEffect(() => {
    if (isAddedSuccessfully == true) {
      onClose();
    }
  }, [isAddedSuccessfully]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.title) newErrors.title = "Title is required.";
    if (!formData.fullName) newErrors.fullName = "Full name is required.";
    if (!formData.firstNameArabic)
      newErrors.firstNameArabic = "First name in Arabic is required.";
    if (!formData.lastNameArabic)
      newErrors.lastNameArabic = "Last name in Arabic is required.";
    if (!formData.email) newErrors.email = "Email is required.";
    if (!formData.passportIssueDate)
      newErrors.passportIssueDate = "Passport issue date is required.";
    if (!formData.passportExpiryDate)
      newErrors.passportExpiryDate = "Passport expiry date is required.";
    if (!formData.placeOfBirth)
      newErrors.placeOfBirth = "Place of birth is required.";
    if (!formData.sharePercentage)
      newErrors.sharePercentage = "Share percentage is required.";
    if (!formData.dateOfBirth)
      newErrors.dateOfBirth = "Date of birth is required.";
    if (!formData.passportIssueDate)
      newErrors.passportIssueDate = "Passport Issue Date is required.";
    if (!formData.passportExpiryDate)
      newErrors.passportExpiryDate = "Passport Expiry Date is required.";
    if (!formData.nationality)
      newErrors.nationality = "Nationality is required.";
    if (!formData.identityNumber)
      newErrors.identityNumber = "Identity Number is required.";
    if (!formData.country) newErrors.country = "Country is required.";
    if (!formData.city) newErrors.city = "City is required.";
    if (!formData.professionalLicense)
      newErrors.professionalLicense = "Professional License is required.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    const isValid = validateForm();
    if (!isValid) return;
    const requiredFields: (keyof FormDataType)[] = [
      "title",
      "firstNameArabic",
      "lastNameArabic",
      "fullName",
      "sharePercentage",
      "identityNumber",
      "nationality",
      "country",
      "city",
      "email",
      "placeOfBirth",
      "passportIssueDate",
      "passportExpiryDate",
      "dateOfBirth",
    ];

    const missing = requiredFields.filter((f) => !formData[f]);
    if (missing.length > 0) {
      alert(`Please fill: ${missing.join(", ")}`);
      return;
    }

    const payload: ShareholderPersonPayload = {
      share_holder_type_id: 2,
      share_holder_id_type_id: 3,
      shares_percentage: formData.sharePercentage,
      place_of_birth: formData.placeOfBirth,
      code: "",
      person: {
        current_nationality_id: parseInt(formData.nationality),
        previous_nationality_id: parseInt(formData.nationality),
        country_id: parseInt(formData.country),
        telephone_country_code_id: 1,
        mobile_country_code_id: 1,
        shareholder_title: formData.title,
        academic_title: "",
        first_name_arabic: formData.firstNameArabic,
        last_name_arabic: formData.lastNameArabic,
        full_name: formData.fullName,
        passport_number: formData.identityNumber,
        person_shareholder_city: formData.city,
        po_box: "",
        postal_code: "",
        email: formData.email,
        mofa_number: "",
        mobile_number: formData.phoneNumber,
        telephone_number: "",
        date_of_birth: formData.dateOfBirth,
        passport_issue_date: formData.passportIssueDate,
        passport_expiry_date: formData.passportExpiryDate,
        professional_license: formData.professionalLicense === "yes" ? 1 : 0,
        passport_id_copy: selectedFile!, // non-null asserted if validated
        professional_license_certificate: selectedFile!, // dummy or another file if applicable
      },
    };

    console.log("payload", JSON.stringify(payload));
    dispatch(createShareholderRequest(payload));

    //onClose();
  };

  if (!isOpen) return null;

  return (
    <ModalOverlay>
      <ModalContainer>
        <ModalHeader>
          <ModalTitle>Add Shareholders</ModalTitle>
          <CloseButton onClick={onClose}>✕</CloseButton>
        </ModalHeader>

        <ModalBody>
          <RadioGroup>
            <RadioButton
              active={shareholderType === "new"}
              onClick={() => setShareholderType("new")}
            >
              <Circle active={shareholderType === "new"}>
                <InnerCircle active={shareholderType === "new"} />
              </Circle>
              New Shareholder
            </RadioButton>

            <RadioButton
              active={shareholderType === "existing"}
              onClick={() => setShareholderType("existing")}
            >
              <Circle active={shareholderType === "existing"}>
                <InnerCircle active={shareholderType === "existing"} />
              </Circle>
              Existing Shareholder
            </RadioButton>
          </RadioGroup>

          {shareholderType == "new" && (
            <>
              <ShareholderTypeWrapper>
                <SectionTitle>Shareholder Type</SectionTitle>
              </ShareholderTypeWrapper>

              <RadioGroup>
                <RadioButton
                  active={personOrOrg === "person"}
                  onClick={() => setPersonOrOrg("person")}
                >
                  <Circle active={personOrOrg === "person"}>
                    <InnerCircle active={personOrOrg === "person"} />
                  </Circle>
                  Person
                </RadioButton>
                <RadioButton
                  active={personOrOrg === "organization"}
                  onClick={() => setPersonOrOrg("organization")}
                >
                  <Circle active={personOrOrg === "organization"}>
                    <InnerCircle active={personOrOrg === "organization"} />
                  </Circle>
                  Organization
                </RadioButton>
              </RadioGroup>

              {personOrOrg === "person" && (
                <>
                  <Title>Identity Information</Title>
                  <InputsRow>
                    <InputsRow>
                      <InputGroup>
                        <Label>* Identity Type</Label>
                        <Select
                          name="identityType"
                          value={formData.identityType}
                          onChange={(e) => {
                            console.log("e.target.value", e.target.value);
                            const { name, value } = e.target;
                            setFormData((prev) => ({ ...prev, [name]: value }));
                            setIdentityType("passport");
                            //setIsValidated(e.target.value === "passport");
                          }}
                        >
                          <option value="">Select</option>
                          {shareholderIdTypes.map((idT) => (
                            <option key={idT.id} value={idT.name}>
                              {idT.name}
                            </option>
                          ))}
                        </Select>
                        {errors.identityType && (
                          <ErrorText>{errors.identityType}</ErrorText>
                        )}
                      </InputGroup>
                    </InputsRow>

                    {identityType !== "passport" ? (
                      <>
                        <InputGroup>
                          <Label>* Current Nationality</Label>
                          <Select>
                            <option value="">Select</option>
                            <option value="saudi_arabia">Saudi Arabia</option>
                            <option value="uae">UAE</option>
                          </Select>
                        </InputGroup>

                        <InputGroup>
                          <Label>* Identity Number</Label>
                          <Input placeholder="1 0234 56789" />
                        </InputGroup>

                        <InputGroup>
                          <Label>* Date of Birth</Label>
                          <Input type="date" />
                        </InputGroup>
                      </>
                    ) : (
                      <></>
                    )}
                  </InputsRow>

                  {/* Validate button only shows for National ID/Iqama before validation */}
                  {identityType !== "passport" && !isValidated && (
                    <ValidateButtonWrapper>
                      <ValidateButton onClick={() => setIsValidated(true)}>
                        Validate
                      </ValidateButton>
                    </ValidateButtonWrapper>
                  )}

                  {(isValidated || identityType === "passport") && (
                    <>
                      <Title>Personal Details</Title>
                      <InputsRow>
                        {identityType === "passport" && (
                          <InputGroup>
                            <Label>* Title</Label>
                            <Select
                              name="title"
                              value={formData.title}
                              onChange={handleChange}
                            >
                              <option value="">Select</option>
                              {titles.map((title) => (
                                <option key={title.id} value={title.id}>
                                  {title.token}
                                </option>
                              ))}
                            </Select>
                            {errors.title && (
                              <ErrorText>{errors.title}</ErrorText>
                            )}
                          </InputGroup>
                        )}

                        <InputGroup>
                          <Label>* First Name in Arabic</Label>
                          <>
                            <Input
                              name="firstNameArabic"
                              value={formData.firstNameArabic}
                              onChange={handleChange}
                            />
                            {errors.firstNameArabic && (
                              <ErrorText>{errors.firstNameArabic}</ErrorText>
                            )}
                          </>
                        </InputGroup>

                        <InputGroup>
                          <Label>* Last Name in Arabic</Label>
                          <Input
                            name="lastNameArabic"
                            value={formData.lastNameArabic}
                            onChange={handleChange}
                          />
                          {errors.lastNameArabic && (
                            <ErrorText>{errors.lastNameArabic}</ErrorText>
                          )}
                        </InputGroup>

                        <InputGroup>
                          <Label>* Full Name in English</Label>
                          <Input
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleChange}
                          />
                          {errors.fullName && (
                            <ErrorText>{errors.fullName}</ErrorText>
                          )}
                        </InputGroup>
                      </InputsRow>

                      {identityType === "passport" && (
                        <>
                          {/* Additional passport-specific fields */}
                          <InputsRow>
                            <InputGroup>
                              <Label>* Share Percentage</Label>
                              <Input
                                name="sharePercentage"
                                value={formData.sharePercentage}
                                onChange={handleChange}
                              />
                              {errors.sharePercentage && (
                                <ErrorText>{errors.sharePercentage}</ErrorText>
                              )}
                            </InputGroup>

                            <InputGroup>
                              <Label>* Date of Birth</Label>
                              <Input
                                type="date"
                                name="dateOfBirth"
                                value={formData.dateOfBirth}
                                onChange={handleChange}
                              />
                              {errors.dateOfBirth && (
                                <ErrorText>{errors.dateOfBirth}</ErrorText>
                              )}
                            </InputGroup>

                            <InputGroup>
                              <Label>* Identity Number</Label>
                              <Input
                                name="identityNumber"
                                value={formData.identityNumber}
                                onChange={handleChange}
                              />
                              {errors.identityNumber && (
                                <ErrorText>{errors.identityNumber}</ErrorText>
                              )}
                            </InputGroup>

                            <InputGroup>
                              <Label>*Current Nationality</Label>
                              <Select
                                name="nationality"
                                value={formData.nationality}
                                onChange={handleChange}
                              >
                                <option value="">Select</option>
                                {countries.map((c: Country) => (
                                  <option key={c.id} value={c.id}>
                                    {c.name}
                                  </option>
                                ))}
                              </Select>
                              {errors.nationality && (
                                <ErrorText>{errors.nationality}</ErrorText>
                              )}
                            </InputGroup>
                          </InputsRow>

                          <InputsRow>
                            <InputGroup>
                              <Label>* Country</Label>
                              <Select
                                name="country"
                                value={formData.country}
                                onChange={handleChange}
                              >
                                <option value="">Select</option>
                                {countries.map((c: Country) => (
                                  <option key={c.id} value={c.id}>
                                    {c.name}
                                  </option>
                                ))}
                              </Select>
                              {errors.country && (
                                <ErrorText>{errors.country}</ErrorText>
                              )}
                            </InputGroup>

                            <InputGroup>
                              <Label>* City</Label>
                              <Input
                                name="city"
                                value={formData.city}
                                onChange={handleChange}
                              />
                              {errors.city && (
                                <ErrorText>{errors.city}</ErrorText>
                              )}
                            </InputGroup>

                            <InputGroup>
                              <Label>Professional License</Label>

                              <Select
                                name="professionalLicense"
                                value={formData.professionalLicense}
                                onChange={handleChange}
                                required
                              >
                                <option value="">Select</option>
                                <option value="yes">Yes</option>
                                <option value="no">No</option>
                              </Select>
                              {errors.professionalLicense && (
                                <ErrorText>
                                  {errors.professionalLicense}
                                </ErrorText>
                              )}
                            </InputGroup>

                            <InputGroup>
                              <Label>Mobile Number</Label>
                              <div style={{ display: "flex", gap: "10px" }}>
                                <Select
                                  name="mobile_code_country_id"
                                  value={formData.mobile_code_country_id}
                                  onChange={handleChange}
                                  style={{ width: "25%" }}
                                >
                                  <option value="" disabled hidden>
                                    + Code
                                  </option>
                                  {countries.map((country: Country) => (
                                    <option key={country.id} value={country.id}>
                                      +{country.phone_prefix} ({country.code})
                                    </option>
                                  ))}
                                </Select>

                                <Input
                                  name="phoneNumber"
                                  type="tel"
                                  value={formData.phoneNumber}
                                  onChange={handleChange}
                                  placeholder="5xxxxxxx"
                                />
                              </div>
                              {errors.mobile_code_country_id && (
                                <ErrorText>{errors.mobile_code_country_id}</ErrorText>
                              )}
                              {errors.phoneNumber && (
                                <ErrorText>{errors.phoneNumber}</ErrorText>
                              )}
                            </InputGroup>
                          </InputsRow>

                          <InputsRow>
                            <InputGroup>
                              <Label>* Email</Label>
                              <Input
                                name="email"
                                type="email"
                                value={formData.email}
                                onChange={handleChange}
                              />
                              {errors.email && (
                                <ErrorText>{errors.email}</ErrorText>
                              )}
                            </InputGroup>

                            <InputGroup>
                              <Label>* Place of Birth</Label>
                              <Input
                                name="placeOfBirth"
                                value={formData.placeOfBirth}
                                onChange={handleChange}
                              />
                              {errors.placeOfBirth && (
                                <ErrorText>{errors.placeOfBirth}</ErrorText>
                              )}
                            </InputGroup>
                          </InputsRow>
                        </>
                      )}

                      <Title>Document Data</Title>
                      <InputsRow>
                        <InputGroup>
                          <Label>
                            {identityType === "passport" ? "Passport" : "ID"}{" "}
                            Issue Date
                          </Label>
                          <Input
                            type="date"
                            name="passportIssueDate"
                            value={formData.passportIssueDate}
                            onChange={handleChange}
                          />
                          {errors.passportIssueDate && (
                            <ErrorText>{errors.passportIssueDate}</ErrorText>
                          )}
                        </InputGroup>

                        <InputGroup>
                          <Label>
                            {identityType === "passport" ? "Passport" : "ID"}{" "}
                            Expiry Date
                          </Label>
                          <Input
                            type="date"
                            name="passportExpiryDate"
                            value={formData.passportExpiryDate}
                            onChange={handleChange}
                          />
                          {errors.passportExpiryDate && (
                            <ErrorText>{errors.passportExpiryDate}</ErrorText>
                          )}
                        </InputGroup>
                      </InputsRow>

                      <Title>Attachments</Title>
                      <UploadBox
                        onClick={() =>
                          document.getElementById("fileInput")?.click()
                        }
                        onDragOver={(e) => e.preventDefault()}
                        onDrop={(e) => {
                          e.preventDefault();
                          if (
                            e.dataTransfer.files &&
                            e.dataTransfer.files.length > 0
                          ) {
                            handleFile(e.dataTransfer.files[0]);
                          }
                        }}
                      >
                        <UploadIcon>⤓</UploadIcon>
                        <UploadText>
                          <strong>Drag and drop files here to upload</strong>
                          <br />
                          Maximum file size allowed is 2MB, supported formats:
                          .pdf, .doc, .docx, .jpg, .jpeg, .png.
                        </UploadText>
                        <UploadButton>Browse Files</UploadButton>
                        <input
                          id="fileInput"
                          type="file"
                          accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                          style={{ display: "none" }}
                          onChange={(e) => {
                            if (e.target.files && e.target.files.length > 0) {
                              handleFile(e.target.files[0]);
                            }
                          }}
                        />
                      </UploadBox>

                      {fileError && <ErrorText>{fileError}</ErrorText>}

                      {selectedFile && !fileError && (
                        <SelectedFilePreview>
                          ✅ Selected: {selectedFile.name} (
                          {(selectedFile.size / 1024).toFixed(1)} KB)
                        </SelectedFilePreview>
                      )}
                      {/* <UploadBox
                        onClick={() =>
                          document.getElementById("fileInput")?.click()
                        }
                        onDragOver={(e) => e.preventDefault()}
                        onDrop={(e) => {
                          e.preventDefault();
                          if (
                            e.dataTransfer.files &&
                            e.dataTransfer.files.length > 0
                          ) {
                            setSelectedFile(e.dataTransfer.files[0]);
                          }
                        }}
                      >
                        <UploadIcon>⤓</UploadIcon>
                        <UploadText>
                          <strong>Drag and drop files here to upload</strong>
                          <br />
                          Maximum file size allowed is 2MB, supported formats:
                          .jpg, .png, .pdf.
                        </UploadText>
                        <UploadButton>Browse Files</UploadButton>
                        <input
                          id="fileInput"
                          type="file"
                          style={{ display: "none" }}
                          onChange={(e) => {
                            if (e.target.files && e.target.files.length > 0) {
                              setSelectedFile(e.target.files[0]);
                            }
                          }}
                        />
                      </UploadBox> */}
                    </>
                  )}
                </>
              )}

              {personOrOrg === "organization" && (
                <>
                  <Title>Shareholder Details</Title>
                  <InputsRow>
                    <InputGroup>
                      <Label>* Country</Label>
                      <Select
                        value={orgCountry}
                        onChange={(e) => setOrgCountry(e.target.value)}
                      >
                        <option value="">Select Country</option>
                        <option value="Riyadh">Riyadh</option>
                        <option value="Jeddah">Jeddah</option>
                      </Select>
                    </InputGroup>
                    {orgCountry && (
                      <>
                        <InputGroup>
                          <Label>* Unified Number</Label>
                          <Input placeholder="1 0234 56789" />
                        </InputGroup>

                        <PrimaryButton onClick={() => setOrgValidated(true)}>
                          Validate
                        </PrimaryButton>
                      </>
                    )}
                  </InputsRow>
                  {orgCountry && orgValidated && (
                    <>
                      <InputsRow>
                        <InputGroup>
                          <Label>* Organization Name in English</Label>
                          <Input placeholder="Enter Organization Name in English" />
                        </InputGroup>
                        <InputGroup>
                          <Label>* Organization Name in Arabic</Label>
                          <Input placeholder="Enter Organization Name in Arabic" />
                        </InputGroup>
                        <InputGroup>
                          <Label>* Legal Status</Label>
                          <Select>
                            <option>Select Legal Status</option>
                            <option>LLC</option>
                            <option>Joint Stock</option>
                          </Select>
                        </InputGroup>
                      </InputsRow>

                      <InputsRow>
                        <InputGroup>
                          <Label>
                            * Number of Years Established in Country of Origin
                          </Label>
                          <Select>
                            <option>Select Number of Years</option>
                            <option>1-5</option>
                            <option>5-10</option>
                            <option>10+</option>
                          </Select>
                        </InputGroup>

                        <InputGroup>
                          <Label>Mobile Number</Label>
                          <Input placeholder="+966 Enter Mobile Number" />
                        </InputGroup>

                        <InputGroup>
                          <Label>* Share Percentage</Label>
                          <Input placeholder="Enter Share Percentage" />
                        </InputGroup>
                      </InputsRow>

                      <InputsRow>
                        <InputGroup>
                          <Label>Email Address</Label>
                          <Input placeholder="Enter Email Address" />
                        </InputGroup>

                        <InputGroup>
                          <Label>Website</Label>
                          <Input placeholder="Enter Website" />
                        </InputGroup>
                      </InputsRow>
                      <Title>Attachments</Title>
                      <InputsRow>
                        <InputGroup>
                          <Label>
                            * Commercial Registration Copy (Home Country)
                          </Label>
                          <Input placeholder="Attach file..." type="file" />
                        </InputGroup>

                        <InputGroup>
                          <Label>* Last Year Financial Statement</Label>
                          <Input placeholder="Attach file..." type="file" />
                        </InputGroup>
                      </InputsRow>
                      <InputsRow>
                        <InputGroup>
                          <Label>* Other Attachment 1</Label>
                          <Input placeholder="Attach file..." type="file" />
                        </InputGroup>

                        <InputGroup>
                          <Label>* Other Attachment 2</Label>
                          <Input placeholder="Attach file..." type="file" />
                        </InputGroup>
                      </InputsRow>
                    </>
                  )}
                </>
              )}
            </>
          )}

          {shareholderType === "existing" && (
            <>
              <InputsRow>
                <InputGroup>
                  <Label>* Enter Shareholder Entity Number</Label>
                  <Input placeholder="1 0234 56789" />
                </InputGroup>

                <InputGroup>
                  <Label>Name</Label>
                  <Input placeholder="Omar Majid" />
                </InputGroup>

                <InputGroup>
                  <Label>Parent Company Country</Label>
                  <Select>
                    <option value="">Select Country</option>
                    <option value="Riyadh">Riyadh</option>
                    <option value="Jeddah">Jeddah</option>
                  </Select>
                </InputGroup>
              </InputsRow>

              <InputsRow>
                <InputGroup>
                  <Label>* Share Percentage</Label>
                  <Input placeholder="50%" type="number" />
                </InputGroup>
                <InputGroup>
                  <Label>* Professional License</Label>
                  <Select
                    value={professionalLicense}
                    onChange={(e) => setProfessionalLicense(e.target.value)}
                  >
                    <option value="">Select</option>
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                  </Select>
                </InputGroup>
              </InputsRow>
              {professionalLicense === "yes" && (
                <InputGroup>
                  {!selectedFile && <Label>Upload Professional License</Label>}
                  {!selectedFile && (
                    <UploadBox
                      onClick={() =>
                        document.getElementById("fileInput")?.click()
                      }
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={(e) => {
                        e.preventDefault();
                        if (
                          e.dataTransfer.files &&
                          e.dataTransfer.files.length > 0
                        ) {
                          setSelectedFile(e.dataTransfer.files[0]);
                        }
                      }}
                    >
                      <UploadIcon>⤓</UploadIcon>
                      <UploadText>
                        <strong>Drag and drop files here to upload</strong>
                        <br />
                        Maximum file size allowed is 2MB, supported formats:
                        .jpg, .png, .pdf.
                      </UploadText>
                      <UploadButton>Browse Files</UploadButton>
                      <input
                        id="fileInput"
                        type="file"
                        style={{ display: "none" }}
                        onChange={(e) => {
                          if (e.target.files && e.target.files.length > 0) {
                            setSelectedFile(e.target.files[0]);
                          }
                        }}
                      />
                    </UploadBox>
                  )}
                  {selectedFile && (
                    <InputGroup>
                      <Label>Professional License</Label>
                      <UploadedFileBox>
                        <CheckIcon>✔️</CheckIcon>
                        <FileName>{selectedFile.name}</FileName>
                        <RemoveButton onClick={() => setSelectedFile(null)}>
                          ✕
                        </RemoveButton>
                      </UploadedFileBox>
                    </InputGroup>
                  )}
                </InputGroup>
              )}

              {isExistingValidated && (
                <>
                  <InputsRow>
                    <InputGroup>
                      <Label>* Organization Name in English</Label>
                      <Input placeholder="Enter Organization Name in English" />
                    </InputGroup>
                    <InputGroup>
                      <Label>* Organization Name in Arabic</Label>
                      <Input placeholder="Enter Organization Name in Arabic" />
                    </InputGroup>
                    <InputGroup>
                      <Label>* Legal Status</Label>
                      <Select>
                        <option>Select Legal Status</option>
                        <option>LLC</option>
                        <option>Joint Stock</option>
                      </Select>
                    </InputGroup>
                  </InputsRow>

                  <InputsRow>
                    <InputGroup>
                      <Label>
                        * Number of Years Established in Country of Origin
                      </Label>
                      <Select>
                        <option>Select Number of Years</option>
                        <option>1-5</option>
                        <option>5-10</option>
                        <option>10+</option>
                      </Select>
                    </InputGroup>

                    <InputGroup>
                      <Label>Mobile Number</Label>
                      <Input placeholder="+966 Enter Mobile Number" />
                    </InputGroup>

                    <InputGroup>
                      <Label>* Share Percentage</Label>
                      <Input placeholder="Enter Share Percentage" />
                    </InputGroup>
                  </InputsRow>

                  <InputsRow>
                    <InputGroup>
                      <Label>Email Address</Label>
                      <Input placeholder="Enter Email Address" />
                    </InputGroup>

                    <InputGroup>
                      <Label>Website</Label>
                      <Input placeholder="Enter Website" />
                    </InputGroup>
                  </InputsRow>

                  <InputsRow>
                    <InputGroup>
                      <Label>
                        * Commercial Registration Copy (Home Country)
                      </Label>
                      <Input placeholder="Attach file..." type="file" />
                    </InputGroup>

                    <InputGroup>
                      <Label>* Last Year Financial Statement</Label>
                      <Input placeholder="Attach file..." type="file" />
                    </InputGroup>

                    <InputGroup>
                      <Label>* Other Attachment 1</Label>
                      <Input placeholder="Attach file..." type="file" />
                    </InputGroup>
                  </InputsRow>
                </>
              )}

              <ValidateButtonWrapper>
                <ValidateButton onClick={() => setExistingIsValidated(true)}>
                  Validate
                </ValidateButton>
              </ValidateButtonWrapper>
            </>
          )}
        </ModalBody>

        <ModalFooter>
          <SecondaryButton onClick={onClose}>Cancel</SecondaryButton>
          <PrimaryButton onClick={handleSubmit}>
            Save New Shareholder
          </PrimaryButton>
        </ModalFooter>
      </ModalContainer>
    </ModalOverlay>
  );
}
