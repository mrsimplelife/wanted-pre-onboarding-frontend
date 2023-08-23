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
        setText('');
        setTodos((todos) => [...todos, res]);
        const res = await createTodo({ todo: text });
      } catch (e) {}
    },
    [text]
  );

  const handleUpdateTodo = useCallback(async (_todo: UpdateTodoParams) => {
    const { id } = _todo;
    try {
      setTodos((todos) => todos.map((todo) => (todo.id === id ? { ...todo, ..._todo } : todo)));
      await updateTodo(_todo);
    } catch (e) {}
  }, []);

  const handleDeleteTodo = useCallback(async (_todo: DeleteTodoParams) => {
    const { id } = _todo;
    try {
      setTodos((todos) => todos.filter((todo) => todo.id !== id));
      await deleteTodo({ id });
    } catch (e) {}
  }, []);

  return { text, todos, handleChangeText, handleCreateTodo, handleUpdateTodo, handleDeleteTodo };
}

export default useTodos;
