import { Todo } from '@/types/Todo.type';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import TodoItem from './TodoItem';
import styles from './TodoItem.module.css';

vi.mock('./TodoItem.module.css', () => ({
  default: new Proxy(new Object(), {
    get(_, style) {
      return style;
    },
  }),
}));

const todo: Todo = {
  completed: true,
  id: '0',
  title: 'Hello',
};

describe('TodoItem Component', () => {
  it('Should render Todo Item', () => {
    const { container } = render(
      <TodoItem todo={todo} handleTodoCheck={() => {}} />
    );

    expect(container).toMatchSnapshot();
  });

  it('Should render TodoItem with passed todo', () => {
    const { getByText } = render(
      <TodoItem todo={todo} handleTodoCheck={() => {}} />
    );

    const item = getByText(/hello/i);
    expect(item).toBeInTheDocument();
  });

  it('handleTodoCheck should be called', async () => {
    const handleTodoCheck = vi.fn();

    const { getByRole } = render(
      <TodoItem handleTodoCheck={handleTodoCheck} todo={todo} />
    );

    const checkBox = getByRole('checkbox');
    await userEvent.click(checkBox);
    expect(handleTodoCheck).toHaveBeenCalledOnce();
  });

  it('should have completed class if checked', async () => {
    const handleTodoCheck = vi.fn();

    const { getByText } = render(
      <TodoItem handleTodoCheck={handleTodoCheck} todo={todo} />
    );

    const item = getByText(/hello/i);
    expect(item).toBeInTheDocument();
    expect(item).toHaveClass(styles.completed);
  });
});
