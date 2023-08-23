import { PropsWithChildren, createContext, useContext } from 'react';
import useTodos, { UseTodos } from '../hook/useTodos';

const TodoContext = createContext<UseTodos | null>(null);

export function TodoProvider({ children }: PropsWithChildren) {
  const { todos, handleCreateTodo, handleUpdateTodo, handleDeleteTodo } = useTodos();

  return <TodoContext.Provider value={{ todos, handleCreateTodo, handleUpdateTodo, handleDeleteTodo }}>{children}</TodoContext.Provider>;
}

export function useTodoContext() {
  return useContext(TodoContext)!;
}

export type TodoContextType = ReturnType<typeof useTodoContext>;
