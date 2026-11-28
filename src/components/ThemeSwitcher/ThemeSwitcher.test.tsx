import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import ThemeSwitcher from './ThemeSwitcher';
import { ThemeProvider } from '../../provider/ThemeProvider';

function renderThemeSwitcher() {
  return render(
    <ThemeProvider>
      <ThemeSwitcher />
    </ThemeProvider>,
  );
}

describe('ThemeProvider', () => {
  it('should a button with the correct accessible name', async () => {
    renderThemeSwitcher();

    expect(screen.getByRole('button', { name: 'Switch theme to dark' })).toBeInTheDocument();
  });

  it('should display the sub icon initially', () => {
    renderThemeSwitcher();

    const button = screen.getByRole('button', { name: 'Switch theme to dark' });
    const icon = button.querySelector('svg use');

    expect(screen.getByRole('button')).toHaveAccessibleName('Switch theme to dark');
    expect(icon).toHaveAttribute('href', expect.stringContaining('#icon-moon'));
  });

  it('should switch to dark theme when clicked', async () => {
    const user = userEvent.setup();
    renderThemeSwitcher();
    const button = screen.getByRole('button', { name: 'Switch theme to dark' });
    const icon = button.querySelector('svg use');
    await user.click(button);

    expect(screen.getByRole('button')).toHaveAccessibleName('Switch theme to light');
    expect(icon).toHaveAttribute('href', expect.stringContaining('#icon-sun'));
  });
});
