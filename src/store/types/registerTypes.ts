export interface RegisterPayload {
  sector_id: number;
  title: number;
  country_id: number;
  mobilecountrycode_id: number;
  first_name: string;
  last_name: string;
  national_id: string;
  company: string;
  mobile_number: string;
  email: string;
  username: string;
  password: string;
}

export interface RegisterResponse {
  success: boolean;
  message: string;
  data: {
    username: string;
    mobile_number: string;
    email: string;
    role_id: number;
    id: number;
    token: string;
    customer: any; // You can define customer structure as well if needed
  };
}
