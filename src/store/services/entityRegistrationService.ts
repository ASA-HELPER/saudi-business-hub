import axiosClient from "../../api/axiosClient";

interface EntityRegistrationPayload {
  id: number;
  _method: string;
  investment_registration_type_id: number;
  entity_name: string;
  entity_name_arabic: string;
  legal_status_id: number;
  capital: number;
  country_id: number;
  region_id: number;
  city_id: number;
  license_duration: number;
  basic_info_extended_multinational_company: boolean;
  list_of_rhq_corporate_activties: string[];
  activity_ids: number[];
  board_resolution_file?: File;
  letter_of_support_file?: File;
}

export const registerEntity = async (payload: EntityRegistrationPayload) => {
  const formData = new FormData();

  Object.entries(payload).forEach(([key, value]) => {
    if (value === undefined || value === null) return;

    if (key === "board_resolution_file" || key === "letter_of_support_file") {
      formData.append(key, value); // File object
    } else if (Array.isArray(value)) {
      value.forEach((item) => formData.append(`${key}[]`, item));
    } else {
      formData.append(key, value.toString());
    }
  });

  const response = await axiosClient.post(
    payload._method
      ? `/investment/registration/entity/${payload.id}`
      : "/investment/registration/entity",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data;
};

// export const registerEntity = async (payload: EntityRegistrationPayload) => {
//   const formData = new FormData();

//   Object.entries(payload).forEach(([key, value]) => {
//     if (Array.isArray(value)) {
//       value.forEach((item) => formData.append(`${key}[]`, item));
//     } else {
//       formData.append(key, value.toString());
//     }
//   });

//   const response = await axiosClient.post(
//     "/investment/registration/entity",
//     formData,
//     {
//       headers: {
//         "Content-Type": "multipart/form-data",
//       },
//     }
//   );

//   return response.data;
// };
