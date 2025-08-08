import React from 'react';
import { BackgroundWrapper, TopRight, Container, CenterCard} from './AuthLayout.styles';

interface AuthLayoutProps {
  children: React.ReactNode;
  LanguageSwitcher?: React.ReactNode;
  leftSpace?: string;
  rightSpace?: string;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({
  children,
  LanguageSwitcher,
  leftSpace = '25%',
  rightSpace = '25%',
}) => {
  console.log(leftSpace);

  return (
    
    <BackgroundWrapper>
      {LanguageSwitcher && <TopRight>{LanguageSwitcher}</TopRight>}
      <Container initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -40 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
      >
        <CenterCard
          $leftSpace={leftSpace}
          $rightSpace={rightSpace}
        >
          {children}
        </CenterCard>
      </Container>
    </BackgroundWrapper>
  );
};

export default AuthLayout;



