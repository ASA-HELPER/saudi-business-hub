import axiosClient from "../../api/axiosClient";

export const createContactPerson = async (payload: FormData) => {
  const response = await axiosClient.post(
    "/investment/registration/contact-person",
    payload
  );
  return response.data;
};

export const updateContactPerson = async (
  id: string | number,
  data: FormData
) => {
  const response = await axiosClient.put(
    `/investment/registration/contact-person/${id}`,
    data
  );
  return response.data;
};
