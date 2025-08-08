import React from "react";
import {
  ContactSection,
  ContactContainer,
  BackgroundPattern,
  SectionTitle,
  ContactCardsContainer,
  ContactCard,
  CardContent,
  IconContainer,
  ContactInfo,
  ContactTitle,
  ContactValue,
  BottomDecoration
} from "./ContactInfoSection.styles";
import phoneIcon from "../../../assets/images/contact-us/phone.png";
import twitterIcon from "../../../assets/images/contact-us/Vector.png"
import mailIcon from "../../../assets/images/contact-us/mail.png";


// Contact information data for mapping
const contactInfo = [
  {
    title: "Local Phone Number",
    value: "8002449990",
     icon: phoneIcon,
  },
  {
    title: "International Phone Number",
    value: "+966115065777",
    icon: phoneIcon,
  },
  {
    title: "Email",
    value: "InvestorCare@misa.gov.sa",
    icon: mailIcon,
  },
  {
    title: "X Platform",
    value: "Investors care",
    icon: twitterIcon,
  },
];

const ContactInfoSection: React.FC = () => {

  return (
    <ContactSection>
      <ContactContainer>
        {/* Background pattern */}
        {/* <BackgroundPattern
          alt="Abstract pattern"
          src="../../../assets/images/contact-us/Abstract-Pattern.png"
        /> */}

        {/* Section title */}
        <SectionTitle>
          Contact Us
        </SectionTitle>

        {/* Contact cards container */}
        <ContactCardsContainer>
          {contactInfo.map((item, index) => (
            <ContactCard key={index}>
              <CardContent>
                <IconContainer>
                  <img src={item.icon} alt={item.title} />
                </IconContainer>

                <ContactInfo>
                  <ContactTitle>
                    {item.title}
                  </ContactTitle>

                  <ContactValue>
                    {item.value}
                  </ContactValue>
                </ContactInfo>
              </CardContent>
            </ContactCard>
          ))}
        </ContactCardsContainer>

        {/* Bottom abstract decoration */}
        {/* <BottomDecoration
          alt="Abstract"
          src="/abstract.svg"
        /> */}
      </ContactContainer>
    </ContactSection>
  );
};

export default ContactInfoSection;
