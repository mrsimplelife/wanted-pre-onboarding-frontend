import { useTodoContext } from '../../../context/TodoProvider';
import TodoItem from './TodoItem';

function TodoList() {
  const { todos } = useTodoContext();
  return (
    <ul>
      {todos.map((todo) => (
        <TodoItem key={todo.id} todoItem={todo} />
      ))}
    </ul>
  );
}

export default TodoList;
