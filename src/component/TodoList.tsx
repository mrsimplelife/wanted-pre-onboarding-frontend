import { useTodoContext } from '../context/TodoProvider';
import TodoItem from './TodoItem';

function TodoList() {
  const { todos, handleUpdateTodo, handleDeleteTodo } = useTodoContext();
  return (
    <ul>
      {todos.map((todo) => (
        <TodoItem key={todo.id} todoItem={todo} onUpdate={handleUpdateTodo} onDelete={handleDeleteTodo} />
      ))}
    </ul>
  );
}

export default TodoList;
