import { AxiosResponse } from 'axios';
import axiosInstance from '../../axios';

export type CreateTodoParams = {
  todo: string;
};

export type CreateTodoResponse = {
  id: number;
  todo: string;
  isCompleted: boolean;
  userId: number;
};

export const createTodo = async (params: CreateTodoParams) => {
  const res: AxiosResponse<CreateTodoResponse> = await axiosInstance.post('/todos', params);
  return res.data;
};

export type GetTodosResponse = {
  id: number;
  todo: string;
  isCompleted: boolean;
  userId: number;
}[];

export const getTodos = async () => {
  const res: AxiosResponse<GetTodosResponse> = await axiosInstance.get('/todos');
  return res.data;
};

export type UpdateTodoParams = {
  id: number;
  todo: string;
  isCompleted: boolean;
};

export type UpdateTodoResponse = {
  id: number;
  todo: string;
  isCompleted: boolean;
  userId: number;
};

export const updateTodo = async ({ id, ...params }: UpdateTodoParams) => {
  const res: AxiosResponse<UpdateTodoResponse> = await axiosInstance.put(`/todos/${id}`, params);
  return res.data;
};

export type DeleteTodoParams = {
  id: number;
};

export const deleteTodo = async ({ id }: DeleteTodoParams) => {
  return await axiosInstance.delete(`/todos/${id}`);
};
