import { ChangeEvent, memo, useEffect, useRef, useState } from 'react';
import { DeleteTodoParams, UpdateTodoParams } from '../service/todo';

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

  const handleChangeCheck = (e: ChangeEvent<HTMLInputElement>) => onModifyTodo({ ...todo, isCompleted: e.target.checked });

  const handleModify = () => setIsModify(true);

  const handleSubmit = () => {
    onModifyTodo({ ...todo, todo: text });
    setIsModify(false);
  };

  const handleDelete = () => onDeleteTodo(todo);

  const handleChangeText = (e: ChangeEvent<HTMLInputElement>) => setText(e.target.value);

  const handleCancel = () => setIsModify(false);

  return (
    <li className='todo'>
      <label>
        <input type='checkbox' checked={isCompleted} onChange={handleChangeCheck} />
        {!isModify && <span>{todoText}</span>}
      </label>
      {!isModify && (
        <>
          <button data-testid='modify-button' onClick={handleModify}>
            수정
          </button>
          <button className='delete' data-testid='delete-button' onClick={handleDelete}>
            삭제
          </button>
        </>
      )}
      {isModify && (
        <>
          <form onSubmit={handleSubmit}>
            <input ref={inputRef} data-testid='modify-input' value={text} onChange={handleChangeText} />
            <button data-testid='submit-button'>제출</button>
          </form>
          <button data-testid='cancel-button' onClick={handleCancel}>
            취소
          </button>
        </>
      )}
    </li>
  );
});

export default TodoItem;
