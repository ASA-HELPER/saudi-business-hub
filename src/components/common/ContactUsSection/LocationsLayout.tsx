import React from 'react';
import styled from 'styled-components';
import LocationHeader from './LocationHeader';
import LocalAddress from './LocalAddress';
import InternationalAddress_AddressCard from './InternationalAddress_AddressCard';

const LocationsLayout: React.FC = () => {
  return (
    <LayoutContainer>
      <LocationHeader />
      <AddressesContainer>
        <LocalAddress />
        <InternationalAddress_AddressCard />
      </AddressesContainer>
    </LayoutContainer>
  );
};

const LayoutContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  width: 100%;
  padding: 32px;
  box-sizing: border-box;
`;

const AddressesContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

export default LocationsLayout;

