import '../../i18n/i18n';
import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SidebarGenres from './SidebarGenres';
import type { Genre } from '../../types/genres';

const mockGenres: Genre[] = [
  {
    name: 'action',
    subgenres: ['shooters', 'fighting'],
  },
  {
    name: 'rpg',
    subgenres: ['jrpg', 'action-rpg'],
  },
  {
    name: 'indie',
  },
];

function renderSidebarGenres() {
  return render(<SidebarGenres genres={mockGenres} />);
}

describe('Navigation', () => {
  it('should render the title and all genres', () => {
    renderSidebarGenres();

    expect(screen.getByRole('heading', { name: 'ЖАНРЫ' })).toBeInTheDocument();
    console.log(screen.getByRole('heading').textContent);
    expect(screen.getByRole('button', { name: 'Экшен' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'RPG' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Инди' })).toBeInTheDocument();
  });

  it('should not render subgenres initially', () => {
    renderSidebarGenres();

    expect(screen.queryByRole('button', { name: 'Шутеры' })).not.toBeInTheDocument();
    expect(screen.queryByRole('button', { name: 'Файтинг' })).not.toBeInTheDocument();
    expect(screen.queryByRole('button', { name: 'JRPG' })).not.toBeInTheDocument();
  });

  it('should expand a genre when clicked', async () => {
    const user = userEvent.setup();
    renderSidebarGenres();

    const actionButton = screen.getByRole('button', { name: 'Экшен' });

    expect(actionButton).toHaveAttribute('aria-expanded', 'false');

    await user.click(actionButton);

    expect(actionButton).toHaveAttribute('aria-expanded', 'true');

    expect(screen.getByRole('button', { name: 'Шутеры' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Файтинг' })).toBeInTheDocument();
  });

  it('should collapse a genre when clicked again', async () => {
    const user = userEvent.setup();
    renderSidebarGenres();

    const actionButton = screen.getByRole('button', { name: 'Экшен' });

    await user.click(actionButton);

    expect(screen.getByRole('button', { name: 'Шутеры' })).toBeInTheDocument();

    await user.click(actionButton);

    expect(actionButton).toHaveAttribute('aria-expanded', 'false');

    expect(screen.queryByRole('button', { name: 'Шутеры' })).not.toBeInTheDocument();
    expect(screen.queryByRole('button', { name: 'Файтинг' })).not.toBeInTheDocument();
  });

  it('should collapse the previously expanded genre when another genre is clicked', async () => {
    const user = userEvent.setup();
    renderSidebarGenres();

    const actionButton = screen.getByRole('button', { name: 'Экшен' });
    const rpgButton = screen.getByRole('button', { name: 'RPG' });

    await user.click(actionButton);

    expect(screen.getByRole('button', { name: 'Шутеры' })).toBeInTheDocument();

    await user.click(rpgButton);

    expect(rpgButton).toHaveAttribute('aria-expanded', 'true');
    expect(actionButton).toHaveAttribute('aria-expanded', 'false');

    expect(screen.getByRole('button', { name: 'JRPG' })).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: 'Шутеры' })).not.toBeInTheDocument();
  });

  it('should not have aria-expanded on a genre without subgenres', () => {
    renderSidebarGenres();

    const indieButton = screen.getByRole('button', { name: 'Инди' });

    expect(indieButton).not.toHaveAttribute('aria-expanded');
  });
});
