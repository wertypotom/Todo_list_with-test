import { Todo } from '@/types/Todo.type';
import { render } from '@testing-library/react';
import Todos from './Todos';
import userEvent from '@testing-library/user-event';

const todos: Todo[] = [
  {
    completed: false,
    id: '0',
    title: 'Hello',
  },
  {
    completed: true,
    id: '1',
    title: 'World',
  },
];

describe('Todo Component', () => {
  it('Should render Todo list', () => {
    const { container } = render(
      <Todos
        handleClearCompletedTodos={() => {}}
        handleTodoCheck={() => {}}
        todos={[]}
      />
    );

    expect(container).toMatchSnapshot();
  });

  it('Should render Todo list with items', () => {
    const { getByText } = render(
      <Todos
        handleClearCompletedTodos={() => {}}
        handleTodoCheck={() => {}}
        todos={todos}
      />
    );

    const text = getByText(/hello/i);
    expect(text).toBeInTheDocument();
  });

  it('handleClearCompletedTodos should be clickable', async () => {
    const handleClearCompletedTodosMock = vi.fn();

    const { getByTestId } = render(
      <Todos
        handleClearCompletedTodos={handleClearCompletedTodosMock}
        handleTodoCheck={() => {}}
        todos={[]}
      />
    );

    const clearBtn = getByTestId('clear-btn');
    await userEvent.click(clearBtn);
    expect(handleClearCompletedTodosMock).toHaveBeenCalledOnce();
  });

  it('Should correctly dislay remaining Todos', async () => {
    const { getByText } = render(
      <Todos
        handleClearCompletedTodos={() => {}}
        handleTodoCheck={() => {}}
        todos={todos}
      />
    );

    const remainingItems = getByText(/1 items left/i);
    expect(remainingItems).toBeInTheDocument();
  });
});
