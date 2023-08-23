import { ChangeEvent, FormEvent, memo, useCallback, useEffect, useRef, useState } from 'react';
import { DeleteTodoParams, GetTodosResponse, UpdateTodoParams, createTodo, deleteTodo, getTodos, updateTodo } from '../api/todo';

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

function useTodos() {
  const [text, setText] = useState('');
  const [todos, setTodos] = useState<GetTodosResponse>([]);

  useEffect(() => {
    async function fetchTodos() {
      const res = await getTodos();
      setTodos(res);
    }
    fetchTodos();
  }, []);

  const handleChangeText = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  }, []);

  const handleCreateTodo = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      try {
        const res = await createTodo({ todo: text });
        setTodos((todos) => [...todos, res]);
        setText('');
      } catch (e) {}
    },
    [text]
  );

  const handleUpdateTodo = useCallback(async (todo: UpdateTodoParams) => {
    const { id } = todo;
    try {
      await updateTodo(todo);
      setTodos((todos) => todos.map((todo) => (todo.id === id ? { ...todo } : todo)));
    } catch (e) {}
  }, []);

  const handleDeleteTodo = useCallback(async (todo: DeleteTodoParams) => {
    const { id } = todo;
    try {
      await deleteTodo({ id });
      setTodos((todos) => todos.filter((todo) => todo.id !== id));
    } catch (e) {}
  }, []);

  return { text, todos, handleChangeText, handleCreateTodo, handleUpdateTodo, handleDeleteTodo };
}

type TodoItemProps = {
  todo: UpdateTodoParams;
  onModifyTodo: (todo: UpdateTodoParams) => void;
  onDeleteTodo: (todo: DeleteTodoParams) => void;
};

const TodoItem = memo(function TodoItem({ todo, onModifyTodo, onDeleteTodo }: TodoItemProps) {
  const { isCompleted, todo: todoText } = todo;
  const [isModify, setIsModify] = useState(false);
  const [text, setText] = useState(todoText);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isModify) {
      setText(todoText);
      inputRef.current?.focus();
    }
  }, [isModify, todoText]);

  const handleSubmit = () => {
    onModifyTodo({ ...todo, todo: text });
    setIsModify(false);
  };

  return (
    <li className='todo'>
      <label>
        <input type='checkbox' checked={isCompleted} onChange={(e) => onModifyTodo({ ...todo, isCompleted: e.target.checked })} />
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
          <form onSubmit={handleSubmit}>
            <input ref={inputRef} data-testid='modify-input' value={text} onChange={(e) => setText(e.target.value)} />
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
