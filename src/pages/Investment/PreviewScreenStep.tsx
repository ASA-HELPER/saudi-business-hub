import React, { useEffect } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { getPreviewRequest } from "../../store/actions/previewActions";
import { selectPreviewData } from "../../store/selectors/previewSelectors";
import { RegistrationDetails, RegistrationData } from "./RegistrationDetails";
import { ShareholdersTable } from "./ShareholdersTable";
import { TermsAcknowledgment } from "./TermsAcknowledgment";
import ContactsDetails, { ContactPersonProps } from "./ContactsDetails";
import SectionTitle from "../../components/common/SectionTitle";
import {
  Customer,
  EntityInformation,
  PersonShareholder,
  ShareHolderType,
} from "../../store/types/previewTypes";
import { deleteContactPersonRequest } from "../../store/actions/deleteContactAction";
import { selectDeleteContactPersonSuccess } from "../../store/selectors/deleteContactPersonSelector";

// Styled Components
const PageWrapper = styled.div`
  background: #fafafa;
  min-height: 100vh;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Card = styled.div`
  background: #ffffff;
  padding: 24px;
  border-radius: 12px;
  border: 1px solid #cac4d0;
  width: 90%;
`;

// Shareholder interface
export interface Shareholder {
  full_name: string;
  id: number;
  customer_id: number;
  share_holder_type_id: number;
  shares_percentage: string;
  customer: Customer;
  share_holder_type: ShareHolderType;
  person_shareholders: PersonShareholder[];
  organization_shareholders: any[];
}

type PreviewStepProps = {
  previewRef: React.Ref<{ submit: () => void }>;
  onEditClick: () => void;
};

const PreviewScreenStep: React.FC<PreviewStepProps> = ({
  previewRef,
  onEditClick,
}) => {
  const dispatch = useDispatch();
  const previewData = useSelector(selectPreviewData);
  const deleteContactPersonSuccess = useSelector(
    selectDeleteContactPersonSuccess
  );

  useEffect(() => {
    dispatch(getPreviewRequest());
  }, [dispatch, deleteContactPersonSuccess]);

  const onDeleteClick = (id: number) => {
    dispatch(deleteContactPersonRequest(id));
  };

  const shareholders = previewData?.shareholders ?? [];

  // Convert entity_information to RegistrationData
  const mapEntityInfoToRegistrationData = (
    entity: EntityInformation
  ): RegistrationData => ({
    registrationType: entity.investment_registration_type?.name ?? "",
    entityName: entity.entity_name,
    entityNameArabic: entity.entity_name_arabic,
    email: entity.email ?? "",
    region: entity.region?.name ?? "",
    yearsRequired: entity.license_duration,
    legalStatus: entity.legal_status?.name ?? "",
    mobileNumber:
      (entity.mobile_country_code?.code ?? "") +
      " " +
      (entity.mobile_phone ?? ""),
    city: entity.city?.name ?? "",
    capital: entity.capital,
    country: entity.country?.name ?? "",
    expectedInvestment: entity.investment?.name ?? "",
    businessActivities: entity.activities?.map((act) => act.description) ?? [],
  });

  const mapShareholderToTableData = (
    shareholder: any
  ): {
    id: number;
    name: string;
    type: "Person" | "Organization";
    percentage: string;
    nationality: string;
    legalStatus: string;
    identityNumber: string;
  } => {
    return {
      id: shareholder?.id ?? 0,
      name: shareholder?.full_name || shareholder?.customer?.first_name || "—",
      type: shareholder?.type === "Person" ? "Person" : "Organization",
      percentage: `${shareholder?.shares_percentage ?? 0}%`,
      nationality: shareholder?.nationality || "—",
      legalStatus: shareholder?.legal_status || "—",
      identityNumber: shareholder?.identity_number || "—",
    };
  };

  const registrationData: RegistrationData | undefined =
    previewData?.entity_information
      ? mapEntityInfoToRegistrationData(previewData.entity_information)
      : undefined;

  const mappedShareholders = shareholders.map(mapShareholderToTableData);

  // ✅ Convert contact_person to ContactPersonProps
  const contactPersonData: ContactPersonProps | undefined =
    previewData?.contact_person
      ? {
          contactId: previewData.contact_person.id,
          fullName:`${previewData.contact_person.first_name_arabic} ${previewData.contact_person.last_name_arabic}`,
          fullNameEn: previewData.contact_person.full_name,
          nationalId: previewData.contact_person.national_id,
          passportNumber: previewData.contact_person.passport_number,
          issueDate: previewData.contact_person.passport_issue_date,
          expiryDate: previewData.contact_person.passport_expiry_date,
          nationality: previewData.contact_person.nationality?.name ?? "",
          city: previewData.contact_person.contact_person_city,
          country: previewData.contact_person.country?.name ?? "",
          mobile_number: previewData.contact_person.mobile_number,
          email: previewData.contact_person.email,
        }
      : undefined;

  return (
    <PageWrapper>
      <Card>
        <RegistrationDetails data={registrationData} />

        <SectionTitle>Shareholder Information</SectionTitle>
        <ShareholdersTable shareholders={mappedShareholders} />

        {contactPersonData && (
          <>
            <ContactsDetails
              data={contactPersonData}
              ref={previewRef}
              onEditClick={onEditClick}
              onDeleteClick={onDeleteClick}
            />
          </>
        )}

        <TermsAcknowledgment />
      </Card>
    </PageWrapper>
  );
};

export default PreviewScreenStep;
