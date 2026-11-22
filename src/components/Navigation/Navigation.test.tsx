import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import Navigation from './Navigation';
import { ThemeProvider } from '../../provider/ThemeProvider';

function renderNavigation(initialEntry = '/') {
  return render(
    <ThemeProvider>
      <MemoryRouter initialEntries={[initialEntry]}>
        <Navigation />

        <Routes>
          <Route path="/" element={<h1>О нас</h1>} />
          <Route path="/home" element={<h1>Магазин</h1>} />
          <Route path="/catalog" element={<h1>Каталог</h1>} />
        </Routes>
      </MemoryRouter>
    </ThemeProvider>,
  );
}

describe('Navigation', () => {
  it('should render all navigation links', () => {
    renderNavigation();

    expect(screen.getByRole('link', { name: 'О нас' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Магазин' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Каталог' })).toBeInTheDocument();
    //expect(screen.getByRole('link', { name: 'Корзина' })).toBeInTheDocument();
  });

  it('should have correct URLs', () => {
    renderNavigation();

    expect(screen.getByRole('link', { name: 'О нас' })).toHaveAttribute('href', '/');
    expect(screen.getByRole('link', { name: 'Магазин' })).toHaveAttribute('href', '/home');
    expect(screen.getByRole('link', { name: 'Каталог' })).toHaveAttribute('href', '/catalog');
    //expect(screen.getByRole('link', { name: 'Корзина' })).toHaveAttribute('href', '/cart');
  });

  it('should mark About as the active page by default', () => {
    renderNavigation('/');

    expect(screen.getByRole('link', { name: 'О нас' })).toHaveAttribute('aria-current', 'page');
  });

  it('should navigate to Catalog when its link is clicked', async () => {
    const user = userEvent.setup();

    renderNavigation();

    await user.click(screen.getByRole('link', { name: 'Каталог' }));

    expect(screen.getByRole('heading', { name: 'Каталог' })).toBeInTheDocument();
  });

  it('should mark Catalog as active on the Catalog page', () => {
    renderNavigation('/catalog');

    expect(screen.getByRole('link', { name: 'Каталог' })).toHaveAttribute('aria-current', 'page');
  });

  it('should render search input with correct placeholder', () => {
    renderNavigation();

    expect(screen.getByRole('searchbox', { name: 'Введите название игры' })).toBeInTheDocument();

    expect(screen.getByRole('searchbox', { name: 'Введите название игры' })).toHaveAttribute(
      'placeholder',
      'Поиск по играм...',
    );
  });

  /* it('should call onChangeHandler when user types', async () => {
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

    await user.type(searchInput, 'The Witcher');

    expect(onChangeHandler).toHaveBeenCalled();
  }); */
});
