import { ChangeEvent, memo, useState } from 'react';
import { TodoContextType } from '../context/TodoProvider';
import TodoItemButtons from './TodoItemButtons';
import TodoItemInput from './TodoItemInput';

type TodoItemProps = {
  todoItem: TodoContextType['todos'][number];
  onDelete: TodoContextType['handleDeleteTodo'];
  onUpdate: TodoContextType['handleUpdateTodo'];
};

const TodoItem = memo(function TodoItem({ todoItem: { id, isCompleted, todo }, onDelete, onUpdate }: TodoItemProps) {
  const handleChangeCheck = (e: ChangeEvent<HTMLInputElement>) => onUpdate({ id, todo, isCompleted: e.target.checked });

  const [isModify, setIsModify] = useState(false);

  const handleModify = () => setIsModify(true);
  const handleCancel = () => setIsModify(false);

  const handleDelete = () => onDelete({ id });

  const handleSubmit = async (todo: string) => {
    await onUpdate({ id, isCompleted, todo });
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
});

export default TodoItem;
