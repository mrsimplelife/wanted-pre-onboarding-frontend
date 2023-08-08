import { memo, useCallback, useEffect, useState } from 'react';
import { DeleteTodoParams, GetTodosResponse, UpdateTodoParams, createTodo, deleteTodo, getTodos, updateTodo } from '../api/todo';

function Todo() {
  const [text, setText] = useState('');
  const [todos, setTodos] = useState<GetTodosResponse>([]);
  useEffect(() => {
    async function fetchTodos() {
      const res = await getTodos();
      setTodos(res);
    }
    fetchTodos();
  }, []);

  const handleCheckTodo = useCallback(async (todo: UpdateTodoParams) => {
    const { id } = todo;
    try {
      await updateTodo(todo);
      setTodos((todos) => todos.map((todo) => (todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo)));
    } catch (e) {}
  }, []);
  const handleModifyTodo = useCallback(async (todo: UpdateTodoParams) => {
    const { id, todo: todoText } = todo;
    try {
      await updateTodo(todo);
      setTodos((todos) => todos.map((todo) => (todo.id === id ? { ...todo, todo: todoText } : todo)));
    } catch (e) {}
  }, []);
  const handleDeleteTodo = useCallback(async (todo: DeleteTodoParams) => {
    const { id } = todo;
    try {
      await deleteTodo({ id });
      setTodos((todos) => todos.filter((todo) => todo.id !== id));
    } catch (e) {}
  }, []);

  return (
    <div>
      <h1>TODO</h1>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          try {
            const res = await createTodo({ todo: text });
            setTodos((todos) => [...todos, res]);
            setText('');
          } catch (e) {}
        }}
      >
        <input data-testid='new-todo-input' name='todo' value={text} onChange={(e) => setText(e.target.value)} />
        <button data-testid='new-todo-add-button'>추가</button>
      </form>
      <ul>
        {todos.map((todo) => (
          <TodoItem key={todo.id} todo={todo} onCheckTodo={handleCheckTodo} onModifyTodo={handleModifyTodo} onDeleteTodo={handleDeleteTodo} />
        ))}
      </ul>
    </div>
  );
}

export default Todo;

type TodoItemProps = {
  todo: UpdateTodoParams;
  onCheckTodo: (todo: UpdateTodoParams) => void;
  onModifyTodo: (todo: UpdateTodoParams) => void;
  onDeleteTodo: (todo: DeleteTodoParams) => void;
};

const TodoItem = memo(function TodoItem({ todo, onCheckTodo, onModifyTodo, onDeleteTodo }: TodoItemProps) {
  const { isCompleted, todo: todoText } = todo;
  const [isModify, setIsModify] = useState(false);
  const [text, setText] = useState(todoText);
  useEffect(() => {
    if (isModify) {
      setText(todoText);
    }
  }, [isModify, todoText]);
  return (
    <li className='todo'>
      <label>
        <input type='checkbox' checked={isCompleted} onChange={(e) => onCheckTodo({ ...todo, isCompleted: e.target.checked })} />
        {!isModify && <span>{todoText}</span>}
      </label>
      {!isModify && (
        <>
          <button data-testid='modify-button' onClick={() => setIsModify(true)}>
            수정
          </button>
          <button className='delete' data-testid='delete-button' onClick={() => onDeleteTodo(todo)}>
            삭제
          </button>
        </>
      )}
      {isModify && (
        <>
          <form
            onSubmit={() => {
              onModifyTodo({ ...todo, todo: text });
              setIsModify(false);
            }}
          >
            <input data-testid='modify-input' value={text} onChange={(e) => setText(e.target.value)} />
            <button data-testid='submit-button'>제출</button>
          </form>
          <button data-testid='cancel-button' onClick={() => setIsModify(false)}>
            취소
          </button>
        </>
      )}
    </li>
  );
});
