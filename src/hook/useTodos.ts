import { useCallback, useEffect, useState } from 'react';
import { DeleteTodoParams, GetTodosResponse, UpdateTodoParams, deleteTodo, getTodos, postTodo, putTodo } from '../service/todo';

function useTodos() {
  const [todos, setTodos] = useState<GetTodosResponse>([]);

  useEffect(() => {
    getTodos().then(setTodos);
  }, []);

  const handleCreateTodo = useCallback(async (todo: string) => {
    try {
      const res = await postTodo({ todo });
      setTodos((prevs) => [...prevs, res]);
    } catch (e) {}
  }, []);

  const handleUpdateTodo = useCallback(async ({ id, isCompleted, todo }: UpdateTodoParams) => {
    try {
      await putTodo({ id, isCompleted, todo });
      setTodos((prevs) => prevs.map((prev) => (prev.id === id ? { ...prev, id, isCompleted, todo } : prev)));
    } catch (e) {}
  }, []);

  const handleDeleteTodo = useCallback(async ({ id }: DeleteTodoParams) => {
    try {
      await deleteTodo({ id });
      setTodos((prevs) => prevs.filter((prev) => prev.id !== id));
    } catch (e) {}
  }, []);

  return { todos, handleCreateTodo, handleUpdateTodo, handleDeleteTodo };
}

export default useTodos;

export type UseTodos = ReturnType<typeof useTodos>;
