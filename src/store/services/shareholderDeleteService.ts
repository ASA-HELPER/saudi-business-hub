import axiosClient from "../../api/axiosClient";

export const deleteShareholder = async (id: number) => {
  const response = await axiosClient.delete(
    `/investment/registration/shareholder/${id}`
  );
  return response.data;
};
