import React from 'react';
import {
  FooterWrapper,
  FooterContent,
  FooterSection,
  SectionHeading,
  SectionList,
  SectionListItem,
  FooterBottom,
  SocialMedia,
  Accessibility,
  SocialIcons,
  AccessibilityIcons,
  FooterInfo,
  Copyright,
  LegalLinks,
  LogoContainer,
  StyledText,
  StyledLink,
  StyledImage,
  IconButton,
} from './Footer.styles';

interface FooterProps {
  className?: string;
}

const Footer: React.FC<FooterProps> = ({ className }) => {
  const menuItems = {
    opportunities: ['Sectors', 'Regions', 'Giga Projects', 'Special Economic Zones (SEZ)', 'Public Investment Fund (PIF)', 'Success Stories', 'Investor Journey Guide', 'Investment Opportunities', 'Furas Platform', 'Global Supply Chain Resilience Initiative (GSCRI)'],
    services: ['Service Level Agreement', 'Business Visa for "Visiting Investors"', 'MIZA Value-Added Services', 'Strategic Investors Program', 'Regional Headquarters (RHQ)', 'Startup Saudi', 'Standard Incentive for Industrial Sector', 'E-Services'],
    knowledge: ['Reports & Publications', 'Laws & Regulations', 'Tax Laws & Regulations', 'Updated Investment Law', 'International Standard Industrial Classification of all Economic Activities (ISIC)', 'International Investment Agreements', 'Investment Council', 'Updated Investment Regulations'],
    whySaudi: ['About the Kingdom', 'Quality of Life', 'Moving to Saudi Arabia', 'Premium Residency', 'National Investment Strategy', 'Saudi Vision 2030'],
    newsEvents: ['News', 'Events Calendar', 'Multimedia'],
    about: ['About Invest Saudi', 'Partner Organizations', 'Contact']
  };

  const socialIcons = [
    { name: 'Twitter', class: 'twitter' },
    { name: 'LinkedIn', class: 'linkedin' },
    { name: 'YouTube', class: 'youtube' },
    { name: 'Instagram', class: 'instagram' }
  ];

  const accessibilityTools = [
    { name: 'Zoom In', class: 'zoom-in' },
    { name: 'Zoom Out', class: 'zoom-out' },
    { name: 'High Contrast', class: 'contrast' },
    { name: 'Sound', class: 'sound' }
  ];

  return (
    <FooterWrapper className={className}>
      <FooterContent>
        <FooterSection>
          <SectionHeading>Opportunities</SectionHeading>
          <SectionList>
            {menuItems.opportunities.map((item, index) => (
              <SectionListItem key={index}><StyledLink href="#">{item}</StyledLink></SectionListItem>
            ))}
          </SectionList>
        </FooterSection>

        <FooterSection>
          <SectionHeading>Services</SectionHeading>
          <SectionList>
            {menuItems.services.map((item, index) => (
              <SectionListItem key={index}><StyledLink href="#">{item}</StyledLink></SectionListItem>
            ))}
          </SectionList>
        </FooterSection>

        <FooterSection>
          <SectionHeading>Knowledge</SectionHeading>
          <SectionList>
            {menuItems.knowledge.map((item, index) => (
              <SectionListItem key={index}><StyledLink href="#">{item}</StyledLink></SectionListItem>
            ))}
          </SectionList>
        </FooterSection>

        <FooterSection>
          <SectionHeading>Why Saudi?</SectionHeading>
          <SectionList>
            {menuItems.whySaudi.map((item, index) => (
              <SectionListItem key={index}><StyledLink href="#">{item}</StyledLink></SectionListItem>
            ))}
          </SectionList>
        </FooterSection>

        <FooterSection>
          <SectionHeading>News & Events</SectionHeading>
          <SectionList>
            {menuItems.newsEvents.map((item, index) => (
              <SectionListItem key={index}><StyledLink href="#">{item}</StyledLink></SectionListItem>
            ))}
          </SectionList>
          <SectionHeading>About</SectionHeading>
          <SectionList>
            {menuItems.about.map((item, index) => (
              <SectionListItem key={index}><StyledLink href="#">{item}</StyledLink></SectionListItem>
            ))}
          </SectionList>
        </FooterSection>
        
         <FooterSection>
        <SocialMedia>
          <SectionHeading>Social Media</SectionHeading>
          <SocialIcons>
            {socialIcons.map((icon, index) => (
              <IconButton key={index} className={icon.class}>
                <span className="sr-only">{icon.name}</span>
              </IconButton>
            ))}
          </SocialIcons>
        </SocialMedia>

        <Accessibility>
          <SectionHeading>Accessibility Tools</SectionHeading>
          <AccessibilityIcons>
            {accessibilityTools.map((tool, index) => (
              <IconButton key={index} className={tool.class}>
                <span className="sr-only">{tool.name}</span>
              </IconButton>
            ))}
          </AccessibilityIcons>
        </Accessibility>
        </FooterSection>
      </FooterContent>

      <FooterBottom>
        

        {/* <FooterInfo>
          <Copyright>
            <StyledText>All Rights Reserved to Invest Saudi © 2025</StyledText>
          </Copyright>
          <LegalLinks>
            <StyledLink href="#">Terms & Conditions</StyledLink>
            <StyledLink href="#">Privacy Policy</StyledLink>
          </LegalLinks>
          <LogoContainer>
            <StyledImage src="" alt="Vision 2030" />
            <StyledImage src="" alt="Invest Saudi" />
          </LogoContainer>
        </FooterInfo> */}
      </FooterBottom>
    </FooterWrapper>
  );
};


export default Footer;
