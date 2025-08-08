import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styled from 'styled-components';
import addIcon from "../../../assets/images/contact-us/add-square-green.png"
import minusIcon from "../../../assets/images/contact-us/minus-square.png"
import locationcon from "../../../assets/images/contact-us/location.png"
import  phoneIcon from "../../../assets/images/contact-us/call-calling.png"

interface AddressInfo {
  location: string;
  subRegions: string;
  phoneNumber: string;
}

const defaultAddresses: AddressInfo[] = [
  {
    location: 'USA',
    subRegions: 'Mexico, Canada, Brazil',
    phoneNumber: '+44 7387 976667',

  },
  {
    location: 'London, United Kingdom',
    subRegions: 'Ireland, Norway, Sweden, Denmark, Finland, Estonia, Lithuania, Latvia, Iceland, Greece (temporary)',
    phoneNumber: '+44 7387 976667',

  },
  {
    location: 'Paris, France',
    subRegions: 'Spain, Portugal, Italy, Belgium, Netherlands, Luxembourg',
    phoneNumber: '+44 7387 976667',

  },
  {
    location: 'Berlin, Germany',
    subRegions: 'Switzerland, Austria, Hungary, Bulgaria, Poland, Romania, Czech Republic, Croatia, Slovakia, Ukraine, Moldova',
    phoneNumber: '+966 115056777',

  },
  {
    location: 'Moscow, Russia',
    subRegions: '',
    phoneNumber: '+44 7387 976667',

  },
  {
    location: 'Beijing, China',
    subRegions: 'Taiwan, Hong Kong, Macao',
    phoneNumber: '+8613636664163',

  },
  {
    location: 'Seoul, South Korea',
    subRegions: 'Taiwan, Hong Kong, Macao',
    phoneNumber: '+966 115056777',

  },
  {
    location: 'Tokyo, Japan',
    subRegions: 'Taiwan, Hong Kong, Macao',
    phoneNumber: '+81 704 566 3033',

  },
  {
    location: 'Singapore',
    subRegions: 'Taiwan, Hong Kong, Macao',
    phoneNumber: '+966 115056777',

  }
];

const AddressCardContainer = styled.div`
  background: #deebedff;
  border-radius: 16px;
  padding: 60px;
  display: flex;
  flex-direction: column;
  gap: 24px;
  min-width: 320px;
  width: 100%;
  box-sizing: border-box;
`;

const Header = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  gap: 24px;
`;

const Title = styled.h2`
  font-family: '29LT Bukra', sans-serif;
  font-weight: 600;
  font-size: 24px;
  line-height: 146%;
  color: #121212ff;
  margin: 0;
  flex: 1;
`;

const ToggleButton = styled.button`
   width: 60px;
  height: 60px;
  background-color: #ffffff;
  border-radius: 50%;
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: transform 0.2s ease;

  &:hover {
    transform: scale(1.05);
  }

  &:active {
    transform: scale(0.95);
  }
;
`;

const AddressList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const AddressItem = styled.div`
  background: #ffffff;
  border: 1px solid #dcdcdcff;
  border-radius: 16px;
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const InfoRow = styled.div`
  display: flex;
  flex-direction: row;
  gap: 8px;
  align-items: flex-start;
`;

const Icon = styled.img`
  width: 24px;
  height: 24px;
`;

const Details = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-left: 32px;
`;

const LocationName = styled.div`
  font-family: '29LT Bukra', sans-serif;
  font-weight: 500;
  font-size: 18px;
  line-height: 146%;
  color: #121212ff;
`;

const SubRegions = styled.div`
  font-family: '29LT Bukra', sans-serif;
  font-weight: 400;
  font-size: 16px;
  line-height: 146%;
  color: #555555ff;
`;

const PhoneLabel = styled.div`
  font-family: '29LT Bukra', sans-serif;
  font-weight: 500;
  font-size: 18px;
  line-height: 146%;
  color: #121212ff;
`;

const PhoneNumber = styled.div`
  font-family: '29LT Bukra', sans-serif;
  font-weight: 500;
  font-size: 16px;
  line-height: 146%;
  color: #555555ff;
`;

const AnimatedAddressList = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const InternationalAddress_AddressCard: React.FC = () => {
  const [isExpanded, setIsExpanded] = React.useState(true);

  return (
    <AddressCardContainer>
      <Header>
        <Title>Local Address</Title>
        <ToggleButton onClick={() => setIsExpanded(!isExpanded)}>
          <Icon src={isExpanded ? minusIcon : addIcon} alt="toggle" />
        </ToggleButton>
      </Header>

      <AnimatePresence initial={false}>
        {isExpanded && (
          <AnimatedAddressList
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
          >
            {defaultAddresses.map((address, index) => (
              <AddressItem key={index}>
                <InfoRow>
                  <Icon src={locationcon} alt="location" />
                  <Details>
                    <LocationName>{address.location}</LocationName>
                    {address.subRegions && <SubRegions>{address.subRegions}</SubRegions>}
                  </Details>
                </InfoRow>
                <InfoRow>
                  <Icon src={phoneIcon} alt="phone" />
                  <Details>
                    <PhoneLabel>Phone Number</PhoneLabel>
                    <PhoneNumber>{address.phoneNumber}</PhoneNumber>
                  </Details>
                </InfoRow>
              </AddressItem>
            ))}
          </AnimatedAddressList>
        )}
      </AnimatePresence>
    </AddressCardContainer>
  );
};
export default InternationalAddress_AddressCard;

