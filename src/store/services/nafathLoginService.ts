import axiosClient from "../../api/axiosClient";

export const NafathLoginUser = async (payload: { nafathID: string }) => {
  const { nafathID } = payload;
  const response = await axiosClient.post(
    `/auth/nafath/request/${nafathID}`,
    {},
    {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    }
  );

  return response.data;
};
