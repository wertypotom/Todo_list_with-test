import { useState } from 'react';
import styles from './App.module.css';
import { Input } from './UI';
import Todos from './components/Todos/Todos';
import useTodos from './hooks/useTodos';

function App() {
  const [showList, setShowList] = useState(true);
  const {
    handleAddTodo,
    handleChangeTodoTitle,
    handleClearCompletedTodos,
    handleTodoCheck,
    todos,
    title,
  } = useTodos();

  const toggleTodosShow = () => {
    setShowList((prev) => !prev);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>todos</h1>

      <div className={styles['todos-container']}>
        <Input
          onFormSubmit={handleAddTodo}
          onChange={handleChangeTodoTitle}
          value={title}
          placeholder='What needs to be done ?'
          onArrowClick={toggleTodosShow}
        />
        {showList && (
          <Todos
            handleClearCompletedTodos={handleClearCompletedTodos}
            todos={todos}
            handleTodoCheck={handleTodoCheck}
          />
        )}
      </div>
    </div>
  );
}

export default App;
