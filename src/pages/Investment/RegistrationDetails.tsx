import React from "react";
import styled from "styled-components";
import SectionTitle from "../../components/common/SectionTitle";
import editIcon from "../../assets/images/investment/edit_icon.svg";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

export interface RegistrationData {
  registrationType: string;
  entityName: string;
  entityNameArabic: string;
  email: string;
  region: string;
  yearsRequired: string;
  legalStatus: string;
  mobileNumber: string;
  city: string;
  capital: string;
  country: string;
  expectedInvestment: string;
  businessActivities: string[];
}

interface RegistrationDetailsProps {
  data?: RegistrationData;
}

const StyledCard = styled.div<{ dir?: "rtl" | "ltr" }>`
  width: 100%;
  max-width: 1152px;
  margin: 0;
  background-color: white;
  border: 1px solid #fff;
  border-radius: 8px;
  overflow: hidden;
  direction: ${props => props.dir || "ltr"};
`;

export const Divider = styled.hr`
  border: none;
  height: 1px;
  width: 100%;
  margin: 24px 0;
  background: linear-gradient(
    to right,
    #d1d5db 0%,
    #d1d5db 120px,
    #d1d5db 120px,
    #d1d5db 100%
  );
  border-radius: 1px;
`;

const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

export const StyledTableCell = styled.td<{ dir?: "rtl" | "ltr" }>`
  text-align: ${({ dir }) => (dir === "rtl" ? "right" : "left")};
  direction: ${({ dir }) => dir || "ltr"};
  padding: 16px;
  vertical-align: top;
  border-bottom: 1px solid #d1d5db;
  border-right: 1px solid #d1d5db;

  &:last-child {
    border-right: none;
  }

  &:hover {
    background-color: #f3f4f6;
    transition: background-color 0.2s ease;
  }
`;

const StyledTableRow = styled.tr`
  &:hover {
    background-color: #f9fafb;
  }

  &:last-child td {
    border-bottom: none;
  }
`;

const CellContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const CellLabel = styled.div`
  font-size: 14px;
  font-weight: 400;
  color: #384250;
  font-family: "29LT_Bukra-SmBd", Helvetica, sans-serif;
`;

const CellValue = styled.div<{ dir?: "rtl" | "ltr" }>`
  font-size: 18px;
  font-weight: 500;
  color: #161616;
  font-family: "29LT_Bukra-SmBd", Helvetica, sans-serif;
  direction: ${(props) => props.dir || "ltr"};
  text-align: ${(props) => (props.dir === "rtl" ? "right" : "left")};
`;

const BusinessActivitiesSection = styled.div<{ dir?: "rtl" | "ltr" }>`
  padding: 24px;
  background-color: #fff;
`;

const BusinessActivitiesLabel = styled.div`
  margin-bottom: 16px;
  font-size: 14px;
  font-weight: 500;
  color: #6b7280;
  font-family: "29LT_Bukra-Medium", Helvetica, sans-serif;
`;

const ActivitiesContainer = styled.div<{ dir?: "rtl" | "ltr" }>`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  direction: ${(props) => props.dir || "ltr"};
  justify-content: ${(props) => (props.dir === "rtl" ? "flex-end" : "flex-start")};
  flex-direction: ${(props) => (props.dir === "rtl" ? "row-reverse" : "row")};
`;

const ActivityTag = styled.div<{ dir?: "rtl" | "ltr" }>`
  display: inline-flex;
  align-items: center;
  padding: 8px 16px;
  background-color: #CAE4E9;
  border: 1px solid #CAE4E9;
  border-radius: 9999px;
  font-size: 14px;
  font-weight: 500;
  color: #161616;
  font-family: "29LT_Bukra-Medium", Helvetica, sans-serif;
  transition: all 0.2s ease;
  direction: ${(props) => props.dir || "ltr"};

  &:hover {
    background-color: #99f6e4;
    border-color: #2dd4bf;
    transform: translateY(-1px);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
`;

const TitleContainer = styled.div<{ dir?: "rtl" | "ltr" }>`
  padding: ${props => props.dir === "rtl" ? "0 16px 0 0" : "0 0 0 16px"};
`;

const TitleWrapper = styled.div<{ dir?: "rtl" | "ltr" }>`
  position: relative;
  margin-top: 26px;
  margin-bottom: 16px;
  text-align: ${props => props.dir === "rtl" ? "right" : "left"};
`;

const TitleText = styled.div<{ dir?: "rtl" | "ltr" }>`
  display: inline-block;
  border-bottom: 2px solid #884699;
  font-size: 20px;
  font-weight: 600;
  color: #161616;
  padding-bottom: 15px;
  position: relative;
  z-index: 1;
  margin-${props => props.dir === "rtl" ? "right" : "left"}: -12px;
`;

const EditButton = styled.div<{ dir?: "rtl" | "ltr" }>`
  position: absolute;
  ${props => props.dir === "rtl" ? "left" : "right"}: 0;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  align-items: center;
  cursor: pointer;
  z-index: 2;
  flex-direction: ${props => props.dir === "rtl" ? "row-reverse" : "row"};
  
  img {
    width: 32px;
    height: 32px;
  }
`;

const EditText = styled.span<{ dir?: "rtl" | "ltr" }>`
  color: #00778E;
  font-weight: 700;
  font-size: 18px;
  margin-${props => props.dir === "rtl" ? "right" : "left"}: 4px;
`;

const TitleUnderline = styled.div<{ dir?: "rtl" | "ltr" }>`
  position: absolute;
  bottom: 0;
  ${props => props.dir === "rtl" ? "right" : "left"}: 0;
  height: 2px;
  width: 100%;
  background: ${props => props.dir === "rtl" 
    ? "linear-gradient(to left, #884699 0 140px, #d1d5db 140px 100%)" 
    : "linear-gradient(to right, #884699 0 140px, #d1d5db 140px 100%)"};
  z-index: 0;
`;

export const FullWidthCard = styled.div<{ dir?: "rtl" | "ltr" }>`
  width: 100%;
  max-width: none;
  direction: ${(props) => props.dir || "ltr"};
`;

const FullWidthTable = styled(StyledTable)`
  width: 100%;
`;

const defaultData: RegistrationData = {
  registrationType: "Entrepreneur",
  entityName: "Omar Majid",
  entityNameArabic: "عمر ماجد",
  email: "omarmajid@gmail.com",
  region: "Riyadh",
  yearsRequired: "2 Years",
  legalStatus: "Simplified Joint Stock Company",
  mobileNumber: "+966 546 568 4555",
  city: "Hureimla'a",
  capital: "50,000,00",
  country: "Saudi Arabia",
  expectedInvestment: "Between SAR 1,000,000 - 5,000,000",
  businessActivities: [
    "561039 - Other Activities of fast - food and pizza delivery restaurants",
    "561039 - Other Activities of fast - food and pizza delivery restaurants",
  ],
};

export const RegistrationDetails: React.FC<RegistrationDetailsProps> = ({
  data = defaultData,
}) => {
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === "ar";
  const dir = isArabic ? "rtl" : "ltr";
  const navigate = useNavigate();

  const TableCell: React.FC<{
    label: string;
    value: string;
    isArabic?: boolean;
  }> = ({ label, value, isArabic = false }) => (
    <StyledTableCell dir={dir}>
      <CellContainer>
        <CellLabel>{label}</CellLabel>
        <CellValue dir={dir}>
          {value}
        </CellValue>
      </CellContainer>
    </StyledTableCell>
  );

  return (
    <FullWidthCard dir={dir}>
      <TitleContainer dir={dir}>
        <TitleWrapper dir={dir}>
          <TitleText dir={dir}>{t("preview.registration.entityInformation")}</TitleText>
          <EditButton 
            dir={dir}
            onClick={() => navigate("/investment-registration?step=0")}
          >
            <img src={editIcon} alt={t("preview.registration.edit")} />
            <EditText dir={dir}>{t("preview.registration.edit")}</EditText>
          </EditButton>
          <TitleUnderline dir={dir} />
        </TitleWrapper>
      </TitleContainer>

      <FullWidthTable dir={dir}>
        <tbody>
          <StyledTableRow>
            <TableCell
              label={t("preview.registration.registrationType")}
              value={data.registrationType}
            />
            <TableCell
              label={t("preview.registration.yearsRequired")}
              value={data.yearsRequired}
            />
            <TableCell
              label={t("preview.registration.entityName")}
              value={data.entityName}
            />
            <TableCell
              label={t("preview.registration.entityNameArabic")}
              value={data.entityNameArabic}
              isArabic={true}
            />
          </StyledTableRow>
          <StyledTableRow>
            <TableCell
              label={t("preview.registration.email")}
              value={data.email}
            />
            <TableCell
              label={t("preview.registration.mobileNumber")}
              value={data.mobileNumber}
            />
            <TableCell
              label={t("preview.registration.region")}
              value={data.region}
            />
            <TableCell
              label={t("preview.registration.city")}
              value={data.city}
            />
          </StyledTableRow>
          <StyledTableRow>
            <TableCell
              label={t("preview.registration.country")}
              value={data.country}
            />
            <TableCell
              label={t("preview.registration.capital")}
              value={data.capital}
            />
            <TableCell
              label={t("preview.registration.expectedInvestment")}
              value={data.expectedInvestment}
            />
            <TableCell
              label={t("preview.registration.legalStatus")}
              value={data.legalStatus}
            />
          </StyledTableRow>
        </tbody>
      </FullWidthTable>

      <BusinessActivitiesSection dir={dir}>
        <BusinessActivitiesLabel dir={dir}>
          {t("preview.registration.businessActivities")}
        </BusinessActivitiesLabel>
        <ActivitiesContainer dir={dir}>
          {data.businessActivities.map((activity, index) => (
            <ActivityTag key={index} dir={dir}>
              {activity}
            </ActivityTag>
          ))}
        </ActivitiesContainer>
      </BusinessActivitiesSection>

      <Divider />
    </FullWidthCard>
  );
};
