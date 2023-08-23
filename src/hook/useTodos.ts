import { ChangeEvent, FormEvent, useCallback, useEffect, useState } from 'react';
import { DeleteTodoParams, GetTodosResponse, UpdateTodoParams, createTodo, deleteTodo, getTodos, updateTodo } from '../service/todo';

function useTodos() {
  const [text, setText] = useState('');
  const [todos, setTodos] = useState<GetTodosResponse>([]);

  useEffect(() => {
    async function fetchTodos() {
      const res = await getTodos();
      setTodos(res);
    }
    fetchTodos();
  }, []);

  const handleChangeText = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  }, []);

  const handleCreateTodo = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      try {
        const res = await createTodo({ todo: text });
        setTodos((todos) => [...todos, res]);
        setText('');
      } catch (e) {}
    },
    [text]
  );

  const handleUpdateTodo = useCallback(async (todo: UpdateTodoParams) => {
    const { id } = todo;
    try {
      await updateTodo(todo);
      setTodos((todos) => todos.map((todo) => (todo.id === id ? { ...todo } : todo)));
    } catch (e) {}
  }, []);

  const handleDeleteTodo = useCallback(async (todo: DeleteTodoParams) => {
    const { id } = todo;
    try {
      await deleteTodo({ id });
      setTodos((todos) => todos.filter((todo) => todo.id !== id));
    } catch (e) {}
  }, []);

  return { text, todos, handleChangeText, handleCreateTodo, handleUpdateTodo, handleDeleteTodo };
}

export default useTodos;
