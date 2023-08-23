import { ChangeEvent, FormEvent, PropsWithChildren, createContext, useContext } from 'react';
import useTodos from '../hook/useTodos';
import { DeleteTodoParams, GetTodosResponse, UpdateTodoParams } from '../service/todo';

type TodoContextType = {
  text: string;
  todos: GetTodosResponse;
  handleChangeText: (e: ChangeEvent<HTMLInputElement>) => void;
  handleCreateTodo: (e: FormEvent<HTMLFormElement>) => void;
  handleUpdateTodo: (_todo: UpdateTodoParams) => void;
  handleDeleteTodo: (_todo: DeleteTodoParams) => void;
};

const TodoContext = createContext<TodoContextType | null>(null);

export function TodoProvider({ children }: PropsWithChildren) {
  const { text, todos, handleChangeText, handleCreateTodo, handleUpdateTodo, handleDeleteTodo } = useTodos();

  return (
    <TodoContext.Provider value={{ text, todos, handleChangeText, handleCreateTodo, handleUpdateTodo, handleDeleteTodo }}>{children}</TodoContext.Provider>
  );
}

export function useTodoContext() {
  return useContext(TodoContext)!;
}
