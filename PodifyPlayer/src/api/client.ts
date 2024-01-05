import {getFromAsyncStorage, Keys} from '@utils/asyncStorage';
import axios, {CreateAxiosDefaults} from 'axios';

const client = axios.create({
  baseURL: 'https://api.podifyapp.com',
});

const baseURL = 'https://api.podifyapp.com';

type headers = CreateAxiosDefaults<any>['headers'];

export const getClient = async (headers?: headers) => {
  const token = await getFromAsyncStorage(Keys.AUTH_TOKEN);

  if (!token) return axios.create({baseURL});

  const defaultHeaders = {
    Authorization: 'Bearer ' + token,
    ...headers,
  };

  return axios.create({baseURL, headers: defaultHeaders});
};

export default client;
