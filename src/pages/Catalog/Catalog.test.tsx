import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Catalog from './Catalog';

describe('Catalog', () => {
  it('renders without errors', () => {
    render(
      <MemoryRouter>
        <Catalog />
      </MemoryRouter>,
    );

    expect(screen.getByText('Catalog')).toBeInTheDocument();
  });
});
