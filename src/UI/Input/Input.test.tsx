import { fireEvent, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Input from './Input';

describe('UI Input', () => {
  it('renders correctly', () => {
    const { container } = render(<Input />);
    expect(container).toMatchSnapshot();
  });

  it('correctly inputs data', async () => {
    const onChange = vi.fn();
    const { container } = render(<Input onChange={onChange} />);

    const input = container.querySelector('input')!;

    await userEvent.type(input, 'Hello');

    expect(onChange).toHaveBeenCalledTimes(5);
    expect(input).toHaveValue('Hello');
  });

  it('calls onFormSubmit when form is submitted', async () => {
    const onFormSubmitMock = vi.fn();
    const { container } = render(<Input onFormSubmit={onFormSubmitMock} />);

    const form = container.querySelector('form') as HTMLElement;

    fireEvent.submit(form);
    expect(onFormSubmitMock).toHaveBeenCalledTimes(1);
  });

  it('calls onArrowClick when arrow icon is clicked', async () => {
    const onArrowClickMock = vi.fn();
    const { getByTestId } = render(<Input onArrowClick={onArrowClickMock} />);

    const arrowIcon = getByTestId('arrow-down');

    await userEvent.click(arrowIcon);
    expect(onArrowClickMock.mock.calls.length).toBe(1);
  });
});
