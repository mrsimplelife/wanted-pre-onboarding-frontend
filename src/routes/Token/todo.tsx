import TodoInput from '../../component/TodoInput';
import TodoList from '../../component/TodoList';
import { TodoProvider } from '../../context/TodoProvider';

function Todo() {
  return (
    <TodoProvider>
      <h1>TODO</h1>
      <TodoInput />
      <TodoList />
    </TodoProvider>
  );
}

export default Todo;
