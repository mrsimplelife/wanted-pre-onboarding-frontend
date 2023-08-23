import { ChangeEvent, memo, useState } from 'react';
import { TodoContextType, useTodoMethodContext } from '../../../../context/TodoProvider';
import TodoItemButtons from './TodoItemButtons';
import TodoItemInput from './TodoItemInput';

type TodoItemProps = {
  todoItem: TodoContextType['todos'][number];
};

function TodoItem({ todoItem: { id, isCompleted, todo } }: TodoItemProps) {
  const { handleDeleteTodo, handleUpdateTodo } = useTodoMethodContext();

  const handleChangeCheck = (e: ChangeEvent<HTMLInputElement>) => handleUpdateTodo({ id, todo, isCompleted: e.target.checked });

  const [isModify, setIsModify] = useState(false);

  const handleModify = () => setIsModify(true);
  const handleCancel = () => setIsModify(false);

  const handleDelete = () => handleDeleteTodo({ id });

  const handleSubmit = async (todo: string) => {
    await handleUpdateTodo({ id, isCompleted, todo });
    handleCancel();
  };

  return (
    <li className='todo'>
      <label>
        <input type='checkbox' checked={isCompleted} onChange={handleChangeCheck} />
        {!isModify && <span>{todo}</span>}
      </label>
      {!isModify && <TodoItemButtons onModify={handleModify} onDelete={handleDelete} />}
      {isModify && <TodoItemInput todoText={todo} onSubmit={handleSubmit} onCancel={handleCancel} />}
    </li>
  );
}

export default memo(TodoItem);
