import { Todo } from '@/types/Todo.type';
import styles from './TodoItem.module.css';
import { Checkbox } from '@/UI';

type Props = {
  todo: Todo;
  handleTodoCheck: (todo: Todo) => void;
};

const TodoItem = ({ todo, handleTodoCheck }: Props) => {
  return (
    <div className={styles.container}>
      <Checkbox
        checked={todo.completed}
        onChange={() => handleTodoCheck(todo)}
        id={`${todo.id} - ${todo.title}`}
      />
      <label
        htmlFor={`${todo.id} - ${todo.title}`}
        className={todo.completed ? styles.completed : ''}
      >
        {todo.title}
      </label>
    </div>
  );
};

export default TodoItem;
