import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import Navigation from './Navigation';

function renderNavigation(initialEntry = '/') {
  return render(
    <MemoryRouter initialEntries={[initialEntry]}>
      <Navigation />

      <Routes>
        <Route path="/" element={<h1>About page</h1>} />
        <Route path="/home" element={<h1>Home page</h1>} />
        <Route path="/catalog" element={<h1>Catalog page</h1>} />
        <Route path="/cart" element={<h1>Cart page</h1>} />
      </Routes>
    </MemoryRouter>,
  );
}

describe('Navigation', () => {
  it('should render all navigation links', () => {
    renderNavigation();

    expect(screen.getByRole('link', { name: 'About' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Home' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Catalog' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Cart' })).toBeInTheDocument();
  });

  it('should have correct URLs', () => {
    renderNavigation();

    expect(screen.getByRole('link', { name: 'About' })).toHaveAttribute('href', '/');
    expect(screen.getByRole('link', { name: 'Home' })).toHaveAttribute('href', '/home');
    expect(screen.getByRole('link', { name: 'Catalog' })).toHaveAttribute('href', '/catalog');
    expect(screen.getByRole('link', { name: 'Cart' })).toHaveAttribute('href', '/cart');
  });

  it('should mark About as the active page by default', () => {
    renderNavigation('/');

    expect(screen.getByRole('link', { name: 'About' })).toHaveAttribute('aria-current', 'page');
  });

  it('should navigate to Catalog when its link is clicked', async () => {
    const user = userEvent.setup();

    renderNavigation();

    await user.click(screen.getByRole('link', { name: 'Catalog' }));

    expect(screen.getByRole('heading', { name: 'Catalog page' })).toBeInTheDocument();
  });

  it('should mark Catalog as active on the Catalog page', () => {
    renderNavigation('/catalog');

    expect(screen.getByRole('link', { name: 'Catalog' })).toHaveAttribute('aria-current', 'page');
  });
});
