import TodoInput from '../../component/todo/TodoInput';
import TodoList from '../../component/todo/TodoList';
import { TodoProvider } from '../../context/TodoProvider';

function Todo() {
  return (
    <TodoProvider>
      <TodoInput />
      <TodoList />
    </TodoProvider>
  );
}

export default Todo;
