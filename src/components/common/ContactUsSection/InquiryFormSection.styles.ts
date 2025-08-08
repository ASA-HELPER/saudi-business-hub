import styled from 'styled-components';

export const FormCard = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: flex-start;
  gap: 2.25rem;
  padding: 2.25rem;
  position: relative;
  background-color: white;
  border-radius: 1rem;
  border: 1px solid #bdd7db;
`;

export const FormContent = styled.div`
  padding: 0;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 2.25rem;
`;

export const FormTitle = styled.h2`
  position: relative;
  align-self: stretch;
  margin-top: -0.0625rem;
  font-family: '29LT_Bukra-SmBd', Helvetica;
  font-weight: normal;
  color: black;
  font-size: 1.5rem;
  line-height: 2.1875rem;
  letter-spacing: 0;
`;

export const FormRow = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 1.5rem;
  position: relative;
  align-self: stretch;
  width: 100%;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

export const FormField = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.375rem;
  position: relative;
  flex: 1;
  flex-grow: 1;
`;

export const FormFieldFull = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: flex-start;
  gap: 0.375rem;
  position: relative;
`;

export const FormLabel = styled.label`
  position: relative;
  align-self: stretch;
  margin-top: -0.0625rem;
  font-family: '29LT_Bukra-Medium', Helvetica;
  font-weight: 500;
  color: #3e4347;
  font-size: 1rem;
  line-height: normal;
  letter-spacing: 0;

  .required {
    color: #cb3333;
  }
`;

export const InputContainer = styled.div`
  display: flex;
  height: 3.5rem;
  align-items: center;
  gap: 0.5rem;
  padding: 0.625rem 1rem;
  position: relative;
  align-self: stretch;
  width: 100%;
  border-radius: 0.375rem;
  border: 1.6px solid #929da7;
`;

export const StyledInput = styled.input`
  border: 0;
  padding: 0;
  height: 1rem;
  font-family: '29LT_Bukra-Medium', Helvetica;
  font-weight: 500;
  color: #585e61;
  font-size: 1rem;
  line-height: normal;
  letter-spacing: 0;
  white-space: nowrap;
  background: transparent;
  outline: none;
  width: 100%;

  &::placeholder {
    color: #585e61;
  }
`;

export const PhoneInputContainer = styled.div`
  height: 3.5rem;
  align-items: center;
  gap: 0.5rem;
  padding: 0.625rem 0.75rem;
  align-self: stretch;
  width: 100%;
  border-radius: 0.375rem;
  border: 1.6px solid #929da7;
  display: flex;
  position: relative;
`;

export const CountryCodeContainer = styled.div`
  display: flex;
  width: 4.75rem;
  height: 2rem;
  align-items: center;
  justify-content: space-between;
  padding: 0.375rem 0.5rem;
  position: relative;
  background-color: #eff3f5;
  border-radius: 0.25rem;

  .country-code {
    position: relative;
    width: 3rem;
    height: 1.0625rem;
    font-family: '29LT_Bukra-Regular', Helvetica;
    font-weight: normal;
    color: black;
    font-size: 0.875rem;
    line-height: normal;
    letter-spacing: 0;
  }

  svg {
    width: 0.729rem;
    height: 0.4375rem;
  }
`;

export const TextareaContainer = styled.div`
  height: 7.5rem;
  align-items: flex-start;
  gap: 0.5rem;
  padding: 0.625rem 1rem;
  align-self: stretch;
  width: 100%;
  border-radius: 0.375rem;
  border: 1.6px solid #929da7;
  display: flex;
  position: relative;
`;

export const StyledTextarea = styled.textarea`
  border: 0;
  padding: 0;
  height: 100%;
  resize: none;
  font-family: '29LT_Bukra-Medium', Helvetica;
  font-weight: 500;
  color: #585e61;
  font-size: 1rem;
  line-height: normal;
  letter-spacing: 0;
  background: transparent;
  outline: none;
  width: 100%;

  &::placeholder {
    color: #585e61;
  }
`;

export const AttachmentContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 15rem;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  padding: 3.125rem 2rem;
  position: relative;
  align-self: stretch;
  width: 100%;
  background-color: rgba(250, 250, 250, 0.7);
  border-radius: 0.54125rem;
  border: 1px dashed #9e9e9e;
`;

export const AttachmentButton = styled.div`
  display: inline-flex;
  height: 3.5rem;
  align-items: center;
  justify-content: center;
  gap: 0.625rem;
  padding: 0.5rem 2.25rem;
  position: relative;
  background-color: #f2f4f7;
  border-radius: 0.5rem;

  .icon {
    position: relative;
    width: 1.5rem;
    height: 1.5rem;
    background-image: url(/group.png);
    background-size: 100% 100%;
  }
`;

export const AttachmentText = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.68313rem;
  padding: 0.625rem 0;
  position: relative;
  align-self: stretch;
  width: 100%;

  .text {
    position: relative;
    width: fit-content;
    margin-top: -0.0425rem;
    font-family: '29LT_Bukra-Medium', Helvetica;
    font-weight: normal;
    text-align: center;
    letter-spacing: 0;
    line-height: 1rem;

    .link {
      font-weight: 500;
      color: #00778e;
      line-height: 2rem;
    }

    .normal {
      font-weight: 500;
      color: #4b4b4b;
      line-height: 0.00625rem;
    }
  }
`;

export const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 1.5rem;
  padding: 0 0 0 8.75rem;
  position: relative;
  align-self: stretch;
  width: 100%;

  @media (max-width: 768px) {
    padding: 0;
    flex-direction: column;
  }
`;

export const ResetButton = styled.button`
  width: 13.75rem;
  height: 3.5rem;
  border: 1.6px solid #00778e;
  font-family: '29LT_Bukra-SmBd', Helvetica;
  font-weight: normal;
  color: #00778e;
  font-size: 1.125rem;
  opacity: 0.5;
  border-radius: 0.375rem;
  background: transparent;
  cursor: pointer;

  &:hover {
    opacity: 0.7;
  }

  @media (max-width: 768px) {
    width: 100%;
  }
`;

export const SubmitButton = styled.button`
  width: 13.75rem;
  height: 3.5rem;
  background-color: #00778e;
  font-family: '29LT_Bukra-SmBd', Helvetica;
  font-weight: normal;
  color: white;
  font-size: 1.125rem;
  border-radius: 0.375rem;
  border: none;
  cursor: pointer;

  &:hover {
    background-color: #00667a;
  }

  @media (max-width: 768px) {
    width: 100%;
  }
`;

export const PrivacySection = styled.div`
  position: absolute;
  width: 7.1875rem;
  height: 5.9375rem;
  top: 60.8125rem;
  left: 0.0625rem;
  background-color: white;
  border-radius: 0.4375rem 0 0 0.4375rem;
  border-top: 1px solid #bdd7db;
  border-bottom: 1px solid #bdd7db;
  border-left: 1px solid #bdd7db;
  transform: rotate(180deg);

  .privacy-content {
    display: inline-flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 0.3175rem;
    position: relative;
    top: 0.5625rem;
    left: 1.375rem;
    transform: rotate(180deg);

    .privacy-icon {
      position: relative;
      width: 3.81375rem;
      height: 3.65438rem;

      img {
        position: absolute;
        width: 3.75rem;
        height: 3.5625rem;
        top: 0.0625rem;
        left: 0.0625rem;
        transform: rotate(-180deg);
      }
    }

    .privacy-text {
      position: relative;
      width: fit-content;
      margin-top: -0.07938rem;
      font-family: 'Roboto', Helvetica;
      font-weight: 500;
      color: #a6a6a6;
      font-size: 0.6375rem;
      text-align: center;
      letter-spacing: 0;
      line-height: normal;
      white-space: nowrap;
    }
  }
`;