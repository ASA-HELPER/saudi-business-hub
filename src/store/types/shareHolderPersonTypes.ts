export interface ShareholderPersonPayload {
  share_holder_type_id: number;
  share_holder_id_type_id: number;
  shares_percentage: string;
  place_of_birth: string;
  code: string;
  _method: string;
  shareHolderId: number;
  person: {
    current_nationality_id: number;
    previous_nationality_id: number;
    country_id: number;
    telephone_country_code_id: number;
    mobile_country_code_id: number;
    shareholder_title: string;
    academic_title: string;
    first_name_arabic: string;
    last_name_arabic: string;
    full_name: string;
    passport_number: string;
    person_shareholder_city: string;
    po_box: string;
    postal_code: string;
    email: string;
    mofa_number: string;
    mobile_number: string;
    telephone_number: string;
    date_of_birth: string;
    passport_issue_date: string;
    passport_expiry_date: string;
    professional_license: number;

    passport_id_copy: File;
    professional_license_certificate: File;
  };
}
