import React from "react";
import styled from "styled-components";
import SectionTitle from "../../components/common/SectionTitle";
import { Country } from "../../store/types/countryTypes";
import { Region } from "../../store/types/regionTypes";
import { LegalStatus } from "../../store/types/legalStatus";

type BasicInformationSectionProps = {
  formData: {
    entity_name: string;
    entity_name_arabic: string;
    legal_status_id: string;
    capital: string;
    country_id: string;
    region_id: string;
    city_id: string;
  };
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  countries?: Country[];
  regions?: Region[];
  cities?: any[];
  legalStatuses?: LegalStatus[];
};

const BasicInformationSection: React.FC<BasicInformationSectionProps> = ({
  formData,
  handleChange,
  countries = [],
  regions = [],
  cities = [],
  legalStatuses = []
}) => {
  return (
    <Section>
      <SectionTitle>Basic Information</SectionTitle>
      <Row>
        <InputWrapper>
          <Label>
            <span>*</span> Entity Name in English
          </Label>
          <Input
            name="entity_name"
            placeholder="Enter Entity Name in English"
            value={formData.entity_name}
            onChange={handleChange}
          />
        </InputWrapper>
        <InputWrapper>
          <Label>
            <span>*</span> Entity Name in Arabic
          </Label>
          <Input
            name="entity_name_arabic"
            placeholder="Enter Entity Name in Arabic"
            value={formData.entity_name_arabic}
            onChange={handleChange}
          />
        </InputWrapper>
      </Row>

      <Row>
        <InputWrapper>
          <Label>
            <span>*</span> Legal Status
          </Label>
          <Select
            required
            defaultValue=""
            name="legal_status_id"
            onChange={handleChange}
          >
            <option value="" disabled hidden>
              Select Legal Status
            </option>
            {legalStatuses?.map((legal: LegalStatus) => (
              <option key={legal.id} value={legal.id}>
                {legal.name}
              </option>
            ))}
          </Select>
        </InputWrapper>
        <InputWrapper>
          <Label>
            <span>*</span> Capital
          </Label>
          <CurrencyWrapper>
            <Currency>SAR</Currency>
            <Input
              name="capital"
              placeholder="Enter the Capital"
              value={formData.capital}
              onChange={handleChange}
            />
          </CurrencyWrapper>
        </InputWrapper>
      </Row>

      <Row>
        <InputWrapper>
          <Label>
            <span>*</span> Country
          </Label>
          <Select
            required
            defaultValue=""
            name="country_id"
            onChange={handleChange}
          >
            <option value="" disabled hidden>
              Select Country
            </option>
            {countries.map((country: Country) => (
              <option key={country.id} value={country.id}>
                {country.name}
              </option>
            ))}
          </Select>
        </InputWrapper>

        <InputWrapper>
          <Label>
            <span>*</span> Region
          </Label>
          <Select required name="region_id" onChange={handleChange}>
            <option value="" disabled hidden>
              Select Region
            </option>
            {regions.map((region: Region) => (
              <option key={region.id} value={region.id}>
                {region.name}
              </option>
            ))}
          </Select>
        </InputWrapper>
      </Row>

      <Row>
        <InputWrapper>
          <Label>
            <span>*</span> City
          </Label>
          <Select
            required
            defaultValue=""
            name="city_id"
            onChange={handleChange}
          >
            <option value="" disabled hidden>
              Select City
            </option>
            {cities.map((city) => (
              <option key={city.id} value={city.id}>
                {city.name}
              </option>
            ))}
          </Select>
        </InputWrapper>
      </Row>
    </Section>
  );
};

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
  margin-bottom: 20px; /* space between fields */
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

const Input = styled.input`
  padding: 6px 0;
  border: none;
  border-bottom: 2px solid #cfd4dc;
  font-size: 13px;
  background-color: transparent;
  width: 100%;
  transition: border-color 0.3s ease;

  &:focus {
    outline: none;
    border-bottom-color: #007c92;
  }

  &::placeholder {
    color: #94a3b8;
  }
`;

const Select = styled.select`
  border: none;
  border-bottom: 2px solid #cfd4dc;
  background: transparent;
  font-size: 13px;
  color: #1f2937;
  width: 100%;
  height: 36px;
  padding: 0 6px;
  transition: border-color 0.3s ease;

  &:focus {
    outline: none;
    border-bottom-color: #007c92;
  }
`;

const CurrencyWrapper = styled.div`
  display: flex;
  align-items: center;
  border-bottom: 2px solid #cfd4dc;
  width: 100%;
  height: 36px;
  padding: 0 6px;
  gap: 6px;

  input {
    border: none;
    outline: none;
    font-size: 13px;
    background: transparent;
    flex: 1;
    padding: 0;
    height: 100%;
  }

  &:focus-within {
    border-bottom-color: #007c92;
  }
`;

const Currency = styled.div`
  margin-right: 8px;
  color: #1f2937;
  font-size: 14px;
  white-space: nowrap;
`;

export default BasicInformationSection;