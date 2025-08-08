// components/Actions.tsx
import styled from 'styled-components';

const ActionsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 32px;
  gap: 16px;
`;

const Button = styled.button<{ primary?: boolean }>`
  padding: 12px 28px;
  border-radius: 8px;
  font-weight: 600;
  font-size: 14px;
  border: ${(props) => (props.primary ? 'none' : '2px solid #0891b2')};
  background: ${(props) => (props.primary ? '#0891b2' : '#ffffff')};
  color: ${(props) => (props.primary ? '#ffffff' : '#0891b2')};
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    opacity: 0.9;
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(0);
  }
`;

interface ActionsProps {
  onBack: () => void;
  onSubmit?: () => void;
  submitText?: string;
}

export const Actions: React.FC<ActionsProps> = ({ 
  onBack, 
  onSubmit, 
  submitText = 'Submit' 
}) => {
  return (
    <ActionsContainer>
      <Button onClick={onBack}>Back</Button>
      {onSubmit && (
        <Button primary onClick={onSubmit}>
          {submitText}
        </Button>
      )}
    </ActionsContainer>
  );
};