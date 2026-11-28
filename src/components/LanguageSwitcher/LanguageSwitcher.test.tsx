import { describe, expect, it } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import LanguageSwitcher from './LanguageSwitcher';

describe('About', () => {
  it('should render switcher and current language', () => {
    render(<LanguageSwitcher />);

    const trigger = screen.getByRole('button', { name: 'Выбрать язык' });

    expect(within(trigger).getByText(/EN|RU/i)).toBeInTheDocument();
  });

  it('should open language list after click', async () => {
    const user = userEvent.setup();
    render(<LanguageSwitcher />);

    const trigger = screen.getByRole('button', { name: 'Выбрать язык' });
    expect(screen.queryByRole('list')).not.toBeInTheDocument();

    await user.click(trigger);

    expect(screen.getByRole('list')).toBeInTheDocument();
    expect(trigger).toHaveAttribute('aria-expanded', 'true');
  });
});
