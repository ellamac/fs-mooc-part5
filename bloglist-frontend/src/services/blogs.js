import axios from 'axios';
const baseUrl = '/api/blogs';

let token = null;

const setToken = (newToken) => {
  token = `bearer ${newToken}`;
};

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const create = async (newObject) => {
  console.log('create prop', newObject);
  const config = {
    headers: { Authorization: token },
  };
  console.log('create config', config);
  const response = await axios.post(baseUrl, newObject, config);
  console.log('create response', response);
  console.log('create responsedata', response.data);
  return response.data;
};

const update = async (updatedObject) => {
  const response = await axios.put(
    `${baseUrl}/${updatedObject.id}`,
    updatedObject
  );
  return response.data;
};

const remove = async (removableObjectId) => {
  const config = {
    headers: { Authorization: token },
  };

  const response = await axios.delete(
    `${baseUrl}/${removableObjectId}`,
    config
  );
  return response.data;
};

export default { getAll, create, setToken, update, remove };
