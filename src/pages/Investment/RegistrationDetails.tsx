import React from "react";
import styled from "styled-components";
import SectionTitle from "../../components/common/SectionTitle";
import editIcon from "../../assets/images/investment/edit_icon.svg";
import { useNavigate } from "react-router-dom";

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


const StyledCard = styled.div`
  width: 100%;
  max-width: 1152px;
  margin: 0;
  background-color: white;
  border: 1px solid #fff;
  border-radius: 8px;
  overflow: hidden;
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

const StyledTableCell = styled.td<{ $isArabic?: boolean }>`
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

const CellValue = styled.div<{ $isArabic?: boolean }>`
  font-size: 18px;
  font-weight: 500;
  color: #161616;
  font-family: "29LT_Bukra-SmBd", Helvetica, sans-serif;
  direction: ${(props) => (props.$isArabic ? "rtl" : "ltr")};
`;

const BusinessActivitiesSection = styled.div`
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

const ActivitiesContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
`;

const ActivityTag = styled.div`
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

  &:hover {
    background-color: #99f6e4;
    border-color: #2dd4bf;
    transform: translateY(-1px);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
`;

const TitleContainer = styled.div`
  padding-left: 16px;
  padding-right: 16px;
`;

const TitleWrapper = styled.div`
  position: relative;
  margin-top: 26px;
  margin-bottom: 16px;
`;

const TitleText = styled.div`
  display: inline-block;
  border-bottom: 2px solid #884699;
  font-size: 20px;
  font-weight: 600;
  color: #161616;
  padding-bottom: 15px;
  position: relative;
  z-index: 1;
  margin-left: -12px;
`;

const EditButton = styled.div`
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  align-items: center;
  cursor: pointer;
  z-index: 2;
    img {
    width: 24px;
    height: 24px;
  }

`;

const EditText = styled.span`
  color: #00778E;
  font-weight: 700;
  font-size: 18px;
  margin-left: 4px;
`;

const TitleUnderline = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  height: 2px;
  width: 100%;
  background: linear-gradient(to right, #884699 0 140px, #d1d5db 140px 100%);
  z-index: 0;
`;

const FullWidthCard = styled(StyledCard)`
  width: 100%;
  max-width: none;
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
  data,
}) => {
  const navigate = useNavigate();

  if (!data) return null;
  const TableCell: React.FC<{
    label: string;
    value: string;
    isArabic?: boolean;
  }> = ({ label, value, isArabic = false }) => (
    <StyledTableCell $isArabic={isArabic}>
      <CellContainer>
        <CellLabel>{label}</CellLabel>
        <CellValue $isArabic={isArabic}>{value}</CellValue>
      </CellContainer>
    </StyledTableCell>
  );

  return (
    <FullWidthCard>
      <TitleContainer>
        <TitleWrapper>
          <TitleText>Entity Information</TitleText>
            <EditButton onClick={() => navigate("/investment-registration?step=0")}>
              <img src={editIcon} alt="Edit" />
            <EditText>Edit</EditText>
          </EditButton>
          <TitleUnderline />
        </TitleWrapper>
      </TitleContainer>

      <FullWidthTable>
        <tbody>
          <StyledTableRow>
            <TableCell label="Registration Type" value={data.registrationType} />
            <TableCell
              label="Number of years required to pay the fee"
              value={data.yearsRequired}
            />
            <TableCell label="Entity Name" value={data.entityName} />
            <TableCell
              label="Entity Name in Arabic"
              value={data.entityNameArabic}
              isArabic={true}
            />
          </StyledTableRow>

          <StyledTableRow>
            <TableCell label="Legal Status" value={data.legalStatus} />
            <TableCell label="Capital" value={data.capital} />
            <TableCell label="Email" value={data.email} />
            <TableCell label="Mobile Number" value={data.mobileNumber} />
          </StyledTableRow>

          <StyledTableRow>
            <TableCell label="Country" value={data.country} />
            <TableCell label="Region" value={data.region} />
            <TableCell label="City" value={data.city} />
            <TableCell
              label="Expected Investment"
              value={data.expectedInvestment}
            />
          </StyledTableRow>
        </tbody>
      </FullWidthTable>

      <BusinessActivitiesSection>
        <BusinessActivitiesLabel>
          Registration Business Activities
        </BusinessActivitiesLabel>
        <ActivitiesContainer>
          {data.businessActivities.map((activity, index) => (
            <ActivityTag key={index}>{activity}</ActivityTag>
          ))}
        </ActivitiesContainer>
      </BusinessActivitiesSection>

      <Divider />
    </FullWidthCard>
  );
};