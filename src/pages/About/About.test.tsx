import '../../i18n/i18n';
import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import About from './About';

describe('About', () => {
  it('renders without errors', () => {
    render(
      <MemoryRouter>
        <About />
      </MemoryRouter>,
    );

    expect(screen.getByText('О нас')).toBeInTheDocument();
  });
});
