import axiosClient from "../../api/axiosClient";

export const loginUser = async (payload: {
  username: string;
  password: string;
}) => {
  const response = await axiosClient.post("/login", payload, {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });
  console.log(response.data);

  return response.data;
};
