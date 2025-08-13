import axiosClient from "../../api/axiosClient";

export const getShareholderByIdApi = async (id: number) => {
  const response = await axiosClient.get(
    `/investment/registration/shareholder/${id}`
  );
  return response.data;
};
