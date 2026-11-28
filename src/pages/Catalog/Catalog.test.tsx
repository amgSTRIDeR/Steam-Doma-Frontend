import { gql } from '@apollo/client';
import { MockedProvider } from '@apollo/client/testing/react';
import { fireEvent, render, screen, within } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import '../../i18n/i18n';
import i18n from '../../i18n/i18n';
import Catalog from './Catalog';

const CATALOG_FILTERS_QUERY = gql`
  query GetCategories {
    catalogFilters {
      genres {
        id
        name
      }
      categories {
        id
        name
      }
      platforms {
        id
        name
      }
    }
  }
`;

const mocks = [
  {
    request: { query: CATALOG_FILTERS_QUERY },
    result: {
      data: {
        catalogFilters: {
          genres: [{ id: 'genre-1', name: 'RPG' }],
          categories: [{ id: 'category-1', name: 'Single-player' }],
          platforms: [{ id: 'platform-1', name: 'Windows' }],
        },
      },
    },
  },
];

const failedMocks = [
  {
    request: { query: CATALOG_FILTERS_QUERY },
    error: new Error('Catalog filters unavailable'),
  },
];

const originalShowModal = Object.getOwnPropertyDescriptor(HTMLDialogElement.prototype, 'showModal');
const originalClose = Object.getOwnPropertyDescriptor(HTMLDialogElement.prototype, 'close');
const originalScrollTo = Object.getOwnPropertyDescriptor(HTMLElement.prototype, 'scrollTo');

afterEach(async () => {
  if (originalShowModal) {
    Object.defineProperty(HTMLDialogElement.prototype, 'showModal', originalShowModal);
  } else {
    delete (HTMLDialogElement.prototype as Partial<HTMLDialogElement>).showModal;
  }
  if (originalClose) {
    Object.defineProperty(HTMLDialogElement.prototype, 'close', originalClose);
  } else {
    delete (HTMLDialogElement.prototype as Partial<HTMLDialogElement>).close;
  }
  if (originalScrollTo) {
    Object.defineProperty(HTMLElement.prototype, 'scrollTo', originalScrollTo);
  } else {
    delete (HTMLElement.prototype as Partial<HTMLElement>).scrollTo;
  }
  vi.restoreAllMocks();
  await i18n.changeLanguage('ru');
});

describe('Catalog', () => {
  it('loads filter options on entry and opens the filter modal', async () => {
    await i18n.changeLanguage('ru');
    Object.defineProperty(HTMLDialogElement.prototype, 'showModal', {
      configurable: true,
      value() {
        this.setAttribute('open', '');
      },
    });
    Object.defineProperty(HTMLDialogElement.prototype, 'close', {
      configurable: true,
      value() {
        this.removeAttribute('open');
      },
    });
    Object.defineProperty(HTMLElement.prototype, 'scrollTo', {
      configurable: true,
      value() {},
    });

    render(
      <MockedProvider mocks={mocks}>
        <MemoryRouter>
          <Catalog />
        </MemoryRouter>
      </MockedProvider>,
    );

    expect(screen.getByRole('button', { name: 'Загружаем фильтры…' })).toBeDisabled();
    const filterButton = await screen.findByRole('button', { name: 'Фильтры' });
    expect(filterButton).toBeEnabled();
    fireEvent.click(filterButton);

    const dialog = screen.getByRole('dialog', { name: 'Фильтры' });
    expect(within(dialog).getByRole('button', { name: 'RPG' })).toBeInTheDocument();
    expect(within(dialog).getByRole('button', { name: 'Single-player' })).toBeInTheDocument();
    expect(within(dialog).getByRole('button', { name: 'Windows' })).toBeInTheDocument();

    await i18n.changeLanguage('en');
    const translatedDialog = screen.getByRole('dialog', { name: 'Filters' });
    expect(
      within(translatedDialog).getByRole('heading', { name: 'Categories' }),
    ).toBeInTheDocument();
    expect(
      within(translatedDialog).getByRole('searchbox', { name: 'Find a category' }),
    ).toBeInTheDocument();
    expect(within(translatedDialog).getByRole('button', { name: 'Apply' })).toBeInTheDocument();
    await i18n.changeLanguage('ru');
  });

  it('keeps filters disabled without an error message after the query fails', async () => {
    render(
      <MockedProvider mocks={failedMocks}>
        <MemoryRouter>
          <Catalog />
        </MemoryRouter>
      </MockedProvider>,
    );

    const filterButton = await screen.findByRole('button', { name: 'Фильтры' });
    expect(filterButton).toBeDisabled();
    expect(filterButton).not.toHaveClass('catalog__filter-button--loading');
    expect(screen.queryByRole('alert')).not.toBeInTheDocument();
  });
});
