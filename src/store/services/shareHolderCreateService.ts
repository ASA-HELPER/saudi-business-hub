import axiosClient from "../../api/axiosClient";
import { ShareholderPersonPayload } from "../types/shareHolderPersonTypes";

export const createShareholder = async (payload: ShareholderPersonPayload) => {
  const formData = new FormData();

  //   Object.entries(payload).forEach(([key, value]) => {
  //     if (key === "person") {
  //       Object.entries(value).forEach(([subKey, subValue]) => {
  //         if (subValue instanceof File) {
  //           formData.append(`person[${subKey}]`, subValue);
  //         } else {
  //           formData.append(`person[${subKey}]`, subValue.toString());
  //         }
  //       });
  //     } else {
  //       formData.append(key, value.toString());
  //     }
  //   });

  Object.entries(payload).forEach(([key, value]) => {
    if (key === "person") {
      Object.entries(value).forEach(([subKey, subValue]) => {
        if (subValue instanceof File) {
          formData.append(`person[${subKey}]`, subValue);
        } else if (
          typeof subValue === "string" ||
          typeof subValue === "number" ||
          typeof subValue === "boolean"
        ) {
          formData.append(`person[${subKey}]`, subValue.toString());
        } else {
          console.warn(`Skipped unsupported type for: person[${subKey}]`);
        }
      });
    } else {
      if (
        typeof value === "string" ||
        typeof value === "number" ||
        typeof value === "boolean"
      ) {
        formData.append(key, value.toString());
      } else {
        console.warn(`Skipped unsupported type for: ${key}`);
      }
    }
  });

  const response = await axiosClient.post(
    "/investment/registration/shareholder",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data;
};
