import useTodos from '../useTodos';
import { renderHook, act } from '@testing-library/react';

describe('useTodos Hook', () => {
  it('should initialize with empty todos', () => {
    const { result } = renderHook(useTodos);

    expect(result.current.todos).toEqual([]);
  });

  it('should change title of future todo', () => {
    const { result } = renderHook(useTodos);

    act(() =>
      result.current.handleChangeTodoTitle({
        target: { value: 'Hello' },
      } as React.ChangeEvent<HTMLInputElement>)
    );

    expect(result.current.title).toBe('Hello');
  });

  it('should change title and add new todo', () => {
    const { result } = renderHook(useTodos);

    act(() =>
      result.current.handleChangeTodoTitle({
        target: { value: 'Go Jym' },
      } as React.ChangeEvent<HTMLInputElement>)
    );

    expect(result.current.title).toBe('Go Jym');

    const event = {
      preventDefault: vi.fn(),
    } as unknown as React.FormEvent<HTMLFormElement>;

    act(() => result.current.handleAddTodo(event));

    expect(result.current.title).toBe('');
    expect(result.current.todos).toHaveLength(1);
  });

  it('should update todo completion status', () => {
    const { result } = renderHook(useTodos);

    act(() =>
      result.current.handleChangeTodoTitle({
        target: { value: 'Go Jym' },
      } as React.ChangeEvent<HTMLInputElement>)
    );

    const event = {
      preventDefault: vi.fn(),
    } as unknown as React.FormEvent<HTMLFormElement>;

    act(() => result.current.handleAddTodo(event));

    act(() => result.current.handleTodoCheck({ ...result.current.todos[0] }));

    expect(result.current.todos[0].completed).toBe(true);
  });

  it('should clear completed todos', () => {
    const { result } = renderHook(useTodos);

    act(() =>
      result.current.handleChangeTodoTitle({
        target: { value: 'Go Jym' },
      } as React.ChangeEvent<HTMLInputElement>)
    );

    const event = {
      preventDefault: vi.fn(),
    } as unknown as React.FormEvent<HTMLFormElement>;

    act(() => result.current.handleAddTodo(event));
    act(() => result.current.handleTodoCheck({ ...result.current.todos[0] }));

    act(() => result.current.handleClearCompletedTodos());

    expect(result.current.todos.length).toBe(0);
  });
});
