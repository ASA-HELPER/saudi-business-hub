import axiosClient from "../../api/axiosClient";

export const fetchTitles = async () => {
  const response = await axiosClient.get("/titles");
  return response.data;
};
