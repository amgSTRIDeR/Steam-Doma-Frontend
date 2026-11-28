import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import Search from './Search';

describe('Search', () => {
  it('should call onChangeHandler when user types', async () => {
    const user = userEvent.setup();
    const onChangeHandler = vi.fn();

    render(
      <Search
        name="game-search"
        labelText="Введите название игры"
        placeholder="Поиск по играм..."
        onChangeHandler={onChangeHandler}
      />,
    );

    const searchInput = screen.getByRole('searchbox', {
      name: 'Введите название игры',
    });

    await user.type(searchInput, 'abc');

    expect(onChangeHandler).toHaveBeenCalledTimes(3);
    expect(onChangeHandler).toHaveBeenLastCalledWith(
      expect.objectContaining({
        target: expect.objectContaining({
          value: 'abc',
        }),
      }),
    );
  });
});
