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

  it('renders the footer with internal, external, and email links', () => {
    render(
      <MemoryRouter>
        <About />
      </MemoryRouter>,
    );

    expect(
      screen.getByRole('link', { name: 'Читать политику конфиденциальности' }),
    ).toHaveAttribute('href', '/legal');

    expect(screen.getByRole('link', { name: 'Репозиторий frontend' })).toHaveAttribute(
      'href',
      'https://github.com/amgSTRIDeR/Steam-Doma-Frontend',
    );
    expect(screen.getByRole('link', { name: 'Репозиторий backend' })).toHaveAttribute(
      'href',
      'https://github.com/amgSTRIDeR/Steam-Doma-Backend',
    );

    expect(screen.getByRole('link', { name: 'Steam Dataset 2025' })).toHaveAttribute(
      'href',
      'https://github.com/vintagedon/steam-dataset-2025',
    );
    expect(
      screen.getByRole('link', {
        name: 'Creative Commons Attribution 4.0 International (CC BY 4.0)',
      }),
    ).toHaveAttribute('href', 'https://creativecommons.org/licenses/by/4.0/');

    expect(screen.getByRole('link', { name: 'alex.ovchinnikov.dev@gmail.com' })).toHaveAttribute(
      'href',
      'mailto:alex.ovchinnikov.dev@gmail.com',
    );
  });
});
