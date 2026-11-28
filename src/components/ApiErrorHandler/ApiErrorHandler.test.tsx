import { fireEvent, render, screen } from '@testing-library/react';
import { I18nextProvider } from 'react-i18next';
import { MemoryRouter, useLocation } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import { ACCESS_DENIED_EVENT, AUTH_REQUIRED_EVENT } from '../../config/apollo';
import i18n from '../../i18n/i18n';
import ApiErrorHandler from './ApiErrorHandler';

function CurrentPath() {
  const location = useLocation();

  return <span>{location.pathname}</span>;
}

describe('ApiErrorHandler', () => {
  it('redirects unauthorized users to the login route', async () => {
    render(
      <I18nextProvider i18n={i18n}>
        <MemoryRouter initialEntries={['/cart']}>
          <ApiErrorHandler />
          <CurrentPath />
        </MemoryRouter>
      </I18nextProvider>,
    );

    window.dispatchEvent(new Event(AUTH_REQUIRED_EVENT));

    expect(await screen.findByText('/login')).toBeInTheDocument();
  });

  it('shows and dismisses an access denied notice', async () => {
    render(
      <I18nextProvider i18n={i18n}>
        <MemoryRouter>
          <ApiErrorHandler />
        </MemoryRouter>
      </I18nextProvider>,
    );

    window.dispatchEvent(new Event(ACCESS_DENIED_EVENT));

    expect(await screen.findByRole('alert')).toHaveTextContent(
      'У вас нет доступа к этому разделу.',
    );
    fireEvent.click(screen.getByRole('button', { name: 'Закрыть' }));
    expect(screen.queryByRole('alert')).not.toBeInTheDocument();
  });
});
