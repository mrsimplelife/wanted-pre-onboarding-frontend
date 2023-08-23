import { useTodoContext } from '../context/TodoProvider';

function TodoInput() {
  const { text, handleChangeText, handleCreateTodo } = useTodoContext();
  return (
    <form onSubmit={handleCreateTodo}>
      <input data-testid='new-todo-input' name='todo' value={text} onChange={handleChangeText} />
      <button data-testid='new-todo-add-button'>추가</button>
    </form>
  );
}

export default TodoInput;
