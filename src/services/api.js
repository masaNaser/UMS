import axios from "axios";

export const GetAllUser = async () => {
  const response = await axios.get(`http://ums12.runasp.net/api/users`);
  return response;
};

export const GetUser = async (id) => {
  const response = await axios.get(`http://ums12.runasp.net/api/users/${id}`);
  return response;
};

export const CreateUser = async (user) => {
  const response = await axios.post(`http://ums12.runasp.net/api/users`, user);
  return response;
}

export const UpdateUser = async (id, user) => {
  const response = await axios.patch(`http://ums12.runasp.net/api/users/${id}`, user);
  return response;
}

export const DeleteUser = async (id) => {
  const response = await axios.delete(`http://ums12.runasp.net/api/users/${id}`);
  return response;
}
