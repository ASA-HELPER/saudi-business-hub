import axiosClient from "../../api/axiosClient";
import { ApiResponse } from "../types/ApiResponse";
import { ShareholderIdType } from "../types/shareHolderIdTypes";

export const fetchShareholderIdTypes = async (): Promise<
  ApiResponse<ShareholderIdType[]>
> => {
  const response = await axiosClient.get(
    "/investment/registration/shareholder/id-types"
  );
  return response.data;
};
