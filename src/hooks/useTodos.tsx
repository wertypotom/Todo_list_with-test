import { Todo } from '@/types/Todo.type';
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import React from 'react';

const useTodos = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [title, setTitle] = useState('');

  const handleClearCompletedTodos = () => {
    const filteredTodos = todos.filter((todo) => !todo.completed);

    setTodos(filteredTodos);
  };

  const handleTodoCheck = (todo: Todo) => {
    const updatedTodos = todos.map((t) =>
      t.id === todo.id ? { ...t, completed: !t.completed } : t
    );

    setTodos(updatedTodos);
  };

  const handleAddTodo = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!title) return;

    const todo: Todo = {
      completed: false,
      title,
      id: uuidv4(),
    };

    setTitle('');
    setTodos((prev) => [todo, ...prev]);
  };

  const handleChangeTodoTitle = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setTitle(event.target.value);
  };

  return {
    todos,
    handleClearCompletedTodos,
    handleTodoCheck,
    handleAddTodo,
    handleChangeTodoTitle,
    title,
  };
};

export default useTodos;
