import { AxiosResponse } from 'axios';
import axiosInstance from '../../axios';

type SignupParams = {
  email: string;
  password: string;
};

export const signup = async (params: SignupParams) => {
  const res = await axiosInstance.post('/auth/signup', params);
  return res.data;
};

type SigninParams = {
  email: string;
  password: string;
};

type SigninResponse = {
  access_token: string;
};

export const signin = async (params: SigninParams) => {
  const res: AxiosResponse<SigninResponse> = await axiosInstance.post('/auth/signin', params);
  return res.data;
};
