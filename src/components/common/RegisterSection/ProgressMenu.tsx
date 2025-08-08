import React from 'react';
import {
  RegisterContainer,
  StepperWrapper,
  StepBlock,
  StepCircle,
  StepTitle,
  StepLine,
} from './styles/ProgressMenu.styles';
import { useTranslation } from 'react-i18next';
import BasicDetailsActive from '../../../assets/images/register/progress-menu/basic-details-active.png';
import UserNameandPasswordInActive from '../../../assets/images/register/progress-menu/username-password-in-active.png';
import UserNameandPasswordActive from '../../../assets/images/register/progress-menu/username-password-active.png';

interface ProgressMenuProps {
  currentStep: number; 
}

const ProgressMenu: React.FC<ProgressMenuProps> = ({ currentStep }) => {
  const { t } = useTranslation();
  return (
    <RegisterContainer>
      <StepperWrapper>
        {/* Step 1 */}
        <StepBlock>
          <StepCircle isActive={currentStep >= 1}>
            <img src={BasicDetailsActive} alt={t('register.step1_title')} />
          </StepCircle>
          <StepTitle isActive={currentStep >= 1}>
            {t('register.step1_title')}
          </StepTitle>
        </StepBlock>

        {/* Step 2 */}
        <StepBlock>
          <StepCircle isActive={currentStep === 2}>
            <img
              src={
                currentStep === 2
                  ? UserNameandPasswordActive
                  : UserNameandPasswordInActive
              }
              alt={t('register.step2_title')}
            />
          </StepCircle>
          <StepTitle isActive={currentStep === 2}>
            {t('register.step2_title')}
          </StepTitle>
        </StepBlock>

        {/* Connecting Line */}
        <StepLine isActive={currentStep > 1} />
      </StepperWrapper>
    </RegisterContainer>
  );
};

export default ProgressMenu;
