import TodoItem from '../../component/TodoItem';
import useTodos from '../../hook/useTodos';

function Todo() {
  const { text, todos, handleChangeText, handleCreateTodo, handleUpdateTodo, handleDeleteTodo } = useTodos();
  return (
    <div>
      <h1>TODO</h1>
      <form onSubmit={handleCreateTodo}>
        <input data-testid='new-todo-input' name='todo' value={text} onChange={handleChangeText} />
        <button data-testid='new-todo-add-button'>추가</button>
      </form>
      <ul>
        {todos.map((todo) => (
          <TodoItem key={todo.id} todo={todo} onModifyTodo={handleUpdateTodo} onDeleteTodo={handleDeleteTodo} />
        ))}
      </ul>
    </div>
  );
}

export default Todo;
