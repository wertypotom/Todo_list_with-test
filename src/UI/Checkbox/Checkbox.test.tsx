import { fireEvent, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Checkbox } from '..';
import { Todo } from '@/types/Todo.type';
import { useState } from 'react';

describe('UI Checkbox', () => {
  it('renders correctly', () => {
    const { container } = render(<Checkbox />);
    expect(container).toMatchSnapshot();
  });

  it('correctly checks the checkbox', async () => {
    const { container } = render(<Checkbox />);

    const input = container.querySelector('input')!;

    await userEvent.click(input);
    expect(input).toBeChecked();
    await userEvent.click(input);
    expect(input).not.toBeChecked();
  });

  it('changes correctly based on state', async () => {
    const Wrap = () => {
      const [todo, setTodo] = useState<Todo>({
        completed: false,
        id: '0',
        title: '',
      });

      return (
        <Checkbox
          checked={todo.completed}
          onChange={() =>
            setTodo((prev) => ({ ...prev, completed: !prev.completed }))
          }
        />
      );
    };

    const { container } = render(<Wrap />);
    const checkbox = container.querySelector(
      "input[type='checkbox']"
    ) as HTMLInputElement;

    fireEvent.click(checkbox);
    expect(checkbox.checked).toBeTruthy();
    fireEvent.click(checkbox);
    expect(checkbox.checked).toBeFalsy();
  });
});
