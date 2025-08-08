import React from 'react';
import styled from 'styled-components';

const TopBarContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100px;
  padding: 0 120px;
  background: rgba(0, 0, 0, 0.4);
  min-width: 1200px;
  @media (max-width: 768px) {
    flex-direction: column;
    height: auto;
    padding: 10px;
  }
`;

const LogoSection = styled.div`
  display: flex;
  align-items: center;
  gap: 30px;
`;

const MinistryLogo = styled.img`
  width: 218px;
  height: 62px;
`;

const HeaderLogo = styled.img`
  width: 92.68px;
  height: 62px;
`;

const Divider = styled.div`
  width: 2px;
  height: 30px;
  background: rgba(255, 255, 255, 0.5);
`;

const NavMenu = styled.nav`
  display: flex;
  gap: 0;
`;

const NavItem = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 15px 18px;
  cursor: pointer;
  color: #fff;
  font-family: '29LT Bukra', sans-serif;
  font-size: 18px;
  font-weight: 400;

  img {
    width: 20px;
    height: 20px;
  }
`;

const RightSection = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

const UserProfile = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
`;

const Avatar = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 66.67px;
  background: rgba(255, 255, 255, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    width: 20px;
    height: 20px;
  }
`;

const Username = styled.span`
  color: #fff;
  font-family: '29LT Bukra', sans-serif;
  font-size: 18px;
  font-weight: 500;
`;

const ArrowDown = styled.img`
  width: 20px;
  height: 20px;
`;

const LanguageSelector = styled.div`
  display: flex;
  background: rgba(15, 30, 35, 0.5);
  border-radius: 6px;
  height: 36px;
`;

const LangBtn = styled.div<{ active?: boolean }>`
  display: flex;
  align-items: center;
  padding: 10px 8px;
  cursor: pointer;
  color: #fff;
  font-family: 'Inter', sans-serif;
  font-size: 14px;
  font-weight: ${({ active }) => (active ? 600 : 500)};
  background: ${({ active }) => (active ? 'rgba(220, 220, 220, 0.1)' : 'transparent')};
  border-radius: 6px;
`;

const MenuButton = styled.div`
  width: 36px;
  height: 36px;
  background: rgba(15, 30, 35, 0.5);
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  img {
    width: 24px;
    height: 24px;
  }
`;

const TopBar: React.FC = () => {
  return (
    <TopBarContainer>
      <LogoSection>
        <MinistryLogo src="/assets/images/fe00a6dc-915c-405a-92e6-b2b3602c1647.png" alt="Ministry Logo" />
        <Divider />
        <HeaderLogo src="/assets/images/header-logo.png" alt="Header Logo" />
      </LogoSection>

      <NavMenu>
        <NavItem>
          <span>Home</span>
          <img src="/assets/images/top-bar-arrow.png" alt="arrow" />
        </NavItem>
        <NavItem>
          <span>Opportunities</span>
          <img src="/assets/images/top-bar-arrow.png" alt="arrow" />
        </NavItem>
        <NavItem>
          <span>Service</span>
          <img src="/assets/images/top-bar-arrow.png" alt="arrow" />
        </NavItem>
        <NavItem>
          <span>Contacts</span>
          <img src="/assets/images/top-bar-arrow.png" alt="arrow" />
        </NavItem>
      </NavMenu>

      <RightSection>
        <UserProfile>
          <Avatar>
            <img src="/assets/images/top-bar-arrow.png" alt="User" />
          </Avatar>
          <Username>Omar Majid</Username>
          <ArrowDown src="h/assets/images/top-bar-arrow.png" alt="arrow" />
        </UserProfile>
        <Divider />
        <LanguageSelector>
          <LangBtn active>
            <span>English</span>
          </LangBtn>
          <LangBtn>
            <span>العربية</span>
          </LangBtn>
        </LanguageSelector>
        <MenuButton>
          <img src="/assets/images/top-bar-arrow.png" alt="Menu" />
        </MenuButton>
      </RightSection>
    </TopBarContainer>
  );
};

export default TopBar;
