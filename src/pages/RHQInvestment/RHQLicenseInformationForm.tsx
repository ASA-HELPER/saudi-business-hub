import React from "react";
import styled from "styled-components";
import SectionTitle from "../../components/common/SectionTitle";
import { useDispatch, useSelector } from "react-redux";
import { fetchCountriesRequest } from "../../store/actions/countryActions";
import { fetchCitiesRequest } from "../../store/actions/cityActions";
import { fetchRegionsRequest } from "../../store/actions/regionActions";
import { fetchLegalStatusRequest } from "../../store/actions/legalStatusActions";

import { RootState } from "../../store";

// Import section components
import DisclaimerSection from "./DisclaimerSection";
import BasicInformationSection from "./BasicInformationSection";
import GlobalInformationSection from "./GlobalInformationSection";
import ActivitiesSection from "./ActivitiesSection";
import AttachmentSection from "./AttachmentSection";
import EntityInformationSection from "./EntityInformationSection";
import PaymentYearsSection from "./PaymentYearsSection";


type RHQLicenseInformationFormProps = {
  registrationTypeId: number | null;
};

export const RHQLicenseInformationForm: React.FC<RHQLicenseInformationFormProps> = ({
  registrationTypeId,
}) => {
  const [formData, setFormData] = React.useState({
    entity_name: "",
    entity_name_arabic: "",
    legal_status_id: "",
    capital: "",
    country_id: "",
    region_id: "",
    city_id: "",
    is_multinational: false,
    global_revenue: "",
    global_employees: "",
    global_capital: "",
    global_assets: "",
    payment_years: ""
  });

  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(fetchCountriesRequest());
    dispatch(fetchCitiesRequest());
    dispatch(fetchRegionsRequest());
  }, [dispatch]);

  React.useEffect(() => {
    if (registrationTypeId) {
      dispatch(fetchLegalStatusRequest(registrationTypeId));
    }
  }, [dispatch, registrationTypeId]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    const checked = type === "checkbox" ? (e.target as HTMLInputElement).checked : undefined;
    
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  return (
    <PageWrapper>
      <Card>
        <EntityInformationSection />
        <DisclaimerSection handleChange={handleChange} />
        <ActivitiesSection />
        <BasicInformationSection 
          formData={formData} 
          handleChange={handleChange} 
        />
        <PaymentYearsSection 
      formData={formData} 
      handleChange={handleChange} 
    />
        <GlobalInformationSection 
          formData={formData} 
          handleChange={handleChange} 
        />
        <AttachmentSection />
      </Card>
    </PageWrapper>
  );
};

const PageWrapper = styled.div`
  background: #f5f5f5;
  min-height: 100vh;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const Card = styled.div`
  background: white;
  border-radius: 16px;
  padding: 32px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
  width: 100%;
`;

export default RHQLicenseInformationForm;