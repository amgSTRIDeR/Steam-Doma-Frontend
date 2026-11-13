import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import GameDetails from './GameDetails';

describe('GameDetails', () => {
  it('renders without errors', () => {
    render(
      <MemoryRouter>
        <GameDetails />
      </MemoryRouter>,
    );

    expect(screen.getByText('GameDetails')).toBeInTheDocument();
  });
});
