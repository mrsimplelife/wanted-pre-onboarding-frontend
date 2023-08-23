import { ChangeEvent, FormEvent, useEffect, useRef, useState } from 'react';

type TodoItemInputProps = {
  todoText: string;
  onSubmit: (text: string) => void;
  onCancel: () => void;
};

function TodoItemInput({ todoText, onSubmit, onCancel }: TodoItemInputProps) {
  const [text, setText] = useState(todoText);
  const handleChangeText = (e: ChangeEvent<HTMLInputElement>) => setText(e.target.value);
  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSumit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(text);
  };

  return (
    <>
      <form onSubmit={handleSumit}>
        <input ref={inputRef} data-testid='modify-input' name='todo' value={text} onChange={handleChangeText} />
        <button data-testid='submit-button'>제출</button>
      </form>
      <button data-testid='cancel-button' onClick={onCancel}>
        취소
      </button>
    </>
  );
}

export default TodoItemInput;
