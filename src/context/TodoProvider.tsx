import { PropsWithChildren, createContext, useContext, useMemo, useState } from 'react';
import useTodos, { UseTodos } from '../hook/useTodos';

export type TodoContextType = Pick<UseTodos, 'todos'>;
export type TodoMethodContextType = Pick<UseTodos, 'handleCreateTodo' | 'handleDeleteTodo' | 'handleUpdateTodo'>;

const TodoContext = createContext<TodoContextType | null>(null);
const TodoMethodContext = createContext<TodoMethodContextType | null>(null);

export function TodoProvider({ children }: PropsWithChildren) {
  const { todos, handleCreateTodo, handleDeleteTodo, handleUpdateTodo } = useTodos();
  const value = useMemo(() => ({ todos }), [todos]);
  const [method] = useState({ handleCreateTodo, handleDeleteTodo, handleUpdateTodo });

  return (
    <TodoContext.Provider value={value}>
      <TodoMethodContext.Provider value={method}>{children}</TodoMethodContext.Provider>
    </TodoContext.Provider>
  );
}

export function useTodoContext() {
  return useContext(TodoContext)!;
}

export function useTodoMethodContext() {
  return useContext(TodoMethodContext)!;
}
