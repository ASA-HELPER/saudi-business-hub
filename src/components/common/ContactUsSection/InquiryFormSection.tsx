import React from "react";
import {
  FormCard,
  FormContent,
  FormTitle,
  FormRow,
  FormField,
  FormFieldFull,
  FormLabel,
  InputContainer,
  StyledInput,
  PhoneInputContainer,
  CountryCodeContainer,
  TextareaContainer,
  StyledTextarea,
  AttachmentContainer,
  AttachmentButton,
  AttachmentText,
  ButtonContainer,
  ResetButton,
  SubmitButton,
  PrivacySection
} from "./InquiryFormSection.styles";

export const InquiryFormSection: React.FC = () => {
  return (
    <FormCard>
      <FormContent>
        <FormTitle>
          Contact us right away if you have any questions about Saudi
          Arabia&#39;s sectors, regions or incentives.
        </FormTitle>

        {/* First row - First Name and Last Name */}
        <FormRow>
          <FormField>
            <FormLabel htmlFor="firstName">
              First Name<span className="required">*</span>
            </FormLabel>
            <InputContainer>
              <StyledInput
                id="firstName"
                type="text"
                placeholder="Enter First Name"
              />
            </InputContainer>
          </FormField>

          <FormField>
            <FormLabel htmlFor="lastName">
              Last Name<span className="required">*</span>
            </FormLabel>
            <InputContainer>
              <StyledInput
                id="lastName"
                type="text"
                placeholder="Enter Last Name"
              />
            </InputContainer>
          </FormField>
        </FormRow>

        {/* Second row - Mobile Number and Email Address */}
        <FormRow>
          {/* Mobile Number Field */}
          <FormField>
            <FormLabel htmlFor="mobileNumber">
              Mobile Number<span className="required">*</span>
            </FormLabel>
            <PhoneInputContainer>
              <CountryCodeContainer>
                <div className="country-code">+966</div>
              </CountryCodeContainer>
              <StyledInput
                id="mobileNumber"
                type="tel"
                placeholder="Enter Mobile Number"
              />
            </PhoneInputContainer>
          </FormField>

          {/* Email Address Field */}
          <FormField>
            <FormLabel htmlFor="emailAddress">
              Email Address<span className="required">*</span>
            </FormLabel>
            <InputContainer>
              <StyledInput
                id="emailAddress"
                type="email"
                placeholder="Enter Email Address"
              />
            </InputContainer>
          </FormField>
        </FormRow>

        {/* Subject Field */}
        <FormFieldFull>
          <FormLabel htmlFor="subject">Subject</FormLabel>
          <InputContainer>
            <StyledInput
              id="subject"
              type="text"
              placeholder="Enter Subject"
            />
          </InputContainer>
        </FormFieldFull>

        {/* Message Field */}
        <FormFieldFull>
          <FormLabel htmlFor="message">Your Message</FormLabel>
          <TextareaContainer>
            <StyledTextarea
              id="message"
              placeholder="Enter Subject"
            />
          </TextareaContainer>
        </FormFieldFull>

        {/* Attachment Field */}
        <FormFieldFull>
          <FormLabel htmlFor="attachment">Attachment</FormLabel>
          <AttachmentContainer>
            <AttachmentButton>
              <div className="icon" />
            </AttachmentButton>

            <AttachmentText>
              <div className="text">
                <span className="link">Click here</span>
                <span className="normal"> to upload or drop files here</span>
              </div>
            </AttachmentText>
          </AttachmentContainer>
        </FormFieldFull>

        {/* Action Buttons */}
        <ButtonContainer>
          <ResetButton type="button">Reset</ResetButton>
          <SubmitButton type="submit">Submit</SubmitButton>
        </ButtonContainer>
      </FormContent>

      {/* Privacy Terms Section */}
      <PrivacySection>
        <div className="privacy-content">
          <div className="privacy-icon">
            <img alt="Group" src="/group-1.png" />
          </div>
          <div className="privacy-text">Privacy - Terms</div>
        </div>
      </PrivacySection>
    </FormCard>
  );
};

export default InquiryFormSection;