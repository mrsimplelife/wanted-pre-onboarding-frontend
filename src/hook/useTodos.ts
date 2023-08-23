import { useCallback, useEffect, useState } from 'react';
import { DeleteTodoParams, GetTodosResponse, UpdateTodoParams, postTodo, deleteTodo, getTodos, putTodo } from '../service/todo';

function useTodos() {
  const [todos, setTodos] = useState<GetTodosResponse>([]);

  useEffect(() => {
    getTodos().then(setTodos);
  }, []);

  const handleCreateTodo = useCallback(async (text: string) => {
    try {
      const res = await postTodo({ todo: text });
      setTodos((todos) => [...todos, res]);
    } catch (e) {}
  }, []);

  const handleUpdateTodo = useCallback(async (_todo: UpdateTodoParams) => {
    const { id } = _todo;
    try {
      await putTodo(_todo);
      setTodos((todos) => todos.map((todo) => (todo.id === id ? { ...todo, ..._todo } : todo)));
    } catch (e) {}
  }, []);

  const handleDeleteTodo = useCallback(async (_todo: DeleteTodoParams) => {
    const { id } = _todo;
    try {
      await deleteTodo({ id });
      setTodos((todos) => todos.filter((todo) => todo.id !== id));
    } catch (e) {}
  }, []);

  return { todos, handleCreateTodo, handleUpdateTodo, handleDeleteTodo };
}

export default useTodos;

export type UseTodos = ReturnType<typeof useTodos>;
