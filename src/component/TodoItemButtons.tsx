type TodoItemButtonsProps = {
  onModify: () => void;
  onDelete: () => void;
};
function TodoItemButtons({ onModify, onDelete }: TodoItemButtonsProps) {
  return (
    <>
      <button data-testid='modify-button' onClick={onModify}>
        수정
      </button>
      <button className='delete' data-testid='delete-button' onClick={onDelete}>
        삭제
      </button>
    </>
  );
}

export default TodoItemButtons;
