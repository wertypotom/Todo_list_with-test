import { useMemo, useState } from 'react';
import { Filters, Todo } from '@/types/Todo.type';
import TodoItem from './TodoItem/TodoItem';
import styles from './Todos.module.css';

type Props = {
  todos: Todo[];
  handleTodoCheck: (todo: Todo) => void;
  handleClearCompletedTodos: () => void;
};

const Todos = ({
  todos,
  handleTodoCheck,
  handleClearCompletedTodos,
}: Props) => {
  const [activeFiter, setActiveFilter] = useState<Filters>('All');

  const todosToRender = useMemo(() => {
    switch (activeFiter) {
      case 'Active':
        return todos.filter((t) => !t.completed);
      case 'Completed':
        return todos.filter((t) => t.completed);
      default:
        return todos;
    }
  }, [activeFiter, todos]);

  const activeTodos = useMemo(() => todos.filter((t) => !t.completed), [todos]);

  return (
    <section className={styles.container}>
      <div className={styles['todo-container']}>
        {todosToRender.map((todo) => (
          <TodoItem
            todo={todo}
            key={todo.id}
            handleTodoCheck={handleTodoCheck}
          />
        ))}
      </div>
      <footer className={styles.footer}>
        <div>{activeTodos.length} items left</div>
        <div className={styles.filters}>
          <div
            onClick={() => setActiveFilter('All')}
            className={`${styles.btn} ${
              activeFiter === 'All' ? styles.active : ''
            }`}
          >
            All
          </div>
          <div
            onClick={() => setActiveFilter('Active')}
            className={`${styles.btn} ${
              activeFiter === 'Active' ? styles.active : ''
            }`}
          >
            Active
          </div>
          <div
            className={`${styles.btn} ${
              activeFiter === 'Completed' ? styles.active : ''
            }`}
            onClick={() => setActiveFilter('Completed')}
          >
            Completed
          </div>
        </div>
        <div
          data-testid='clear-btn'
          className={styles.btn}
          onClick={handleClearCompletedTodos}
        >
          Clear completed
        </div>
      </footer>
    </section>
  );
};

export default Todos;
