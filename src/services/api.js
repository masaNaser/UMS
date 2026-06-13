import axios from "axios";

export const GetAllUser = async () => {
  const response = await axios.get(`https://ums12.runasp.net/api/users`);
  return response;
};

export const GetUser = async (id) => {
  const response = await axios.get(`https://ums12.runasp.net/api/users/${id}`);
  return response;
};

export const CreateUser = async (user) => {
  const response = await axios.post(`https://ums12.runasp.net/api/users`, user);
  return response;
}

export const UpdateUser = async (id, user) => {
  const response = await axios.patch(`https://ums12.runasp.net/api/users/${id}`, user);
  return response;
}

export const DeleteUser = async (id) => {
  const response = await axios.delete(`https://ums12.runasp.net/api/users/${id}`);
  return response;
}
