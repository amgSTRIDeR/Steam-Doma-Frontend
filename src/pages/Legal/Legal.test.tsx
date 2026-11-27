import '../../i18n/i18n';
import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import Legal from './Legal';

describe('Legal', () => {
  it('renders the privacy policy sections', () => {
    render(<Legal />);

    expect(
      screen.getByRole('heading', { name: 'Политика конфиденциальности' }),
    ).toBeInTheDocument();
    expect(screen.getByText('Дата вступления в силу: 26 ноября 2026 года')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Контролер данных' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Обработка данных' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Хостинг' })).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: 'Cookie и локальное хранилище' }),
    ).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Ваши права' })).toBeInTheDocument();
  });

  it('turns email addresses in policy text into mailto links', () => {
    render(<Legal />);

    const emailLinks = screen.getAllByRole('link', { name: 'alex.ovchinnikov.dev@gmail.com' });

    expect(emailLinks.length).toBeGreaterThanOrEqual(1);
    emailLinks.forEach((link) => {
      expect(link).toHaveAttribute('href', 'mailto:alex.ovchinnikov.dev@gmail.com');
    });
  });
});
