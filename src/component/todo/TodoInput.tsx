import { ChangeEvent, FormEvent, memo, useCallback, useState } from 'react';
import { useTodoMethodContext } from '../../context/TodoProvider';

function TodoInput() {
  const { handleCreateTodo } = useTodoMethodContext();
  const [text, setText] = useState('');

  const handleChangeText = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value);
  }, []);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await handleCreateTodo(text);
    setText('');
  };

  return (
    <>
      <h1>TODO</h1>
      <form onSubmit={handleSubmit}>
        <input data-testid='new-todo-input' name='todo' value={text} onChange={handleChangeText} />
        <button data-testid='new-todo-add-button'>추가</button>
      </form>
    </>
  );
}

export default memo(TodoInput);
