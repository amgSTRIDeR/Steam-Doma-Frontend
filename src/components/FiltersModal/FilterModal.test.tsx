import { fireEvent, render, screen, within } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import '../../i18n/i18n';
import i18n from '../../i18n/i18n';
import { FilterModal } from './FilterModal';
import { createDefaultFilters } from './filterTypes';
import type { CatalogFilters, FilterOptions } from './filterTypes';

const options: FilterOptions = {
  categories: [
    { id: 'category-1', label: 'Action' },
    { id: 'category-2', label: 'Adventure' },
    { id: 'category-3', label: 'Puzzle' },
  ],
  genres: [{ id: 'genre-1', label: 'RPG' }],
  platforms: [{ id: 'platform-1', label: 'Windows' }],
};

const originalShowModal = Object.getOwnPropertyDescriptor(HTMLDialogElement.prototype, 'showModal');
const originalClose = Object.getOwnPropertyDescriptor(HTMLDialogElement.prototype, 'close');
const originalScrollTo = Object.getOwnPropertyDescriptor(HTMLElement.prototype, 'scrollTo');
const originalClientWidth = Object.getOwnPropertyDescriptor(HTMLElement.prototype, 'clientWidth');
const originalBoundingRect = Object.getOwnPropertyDescriptor(
  HTMLElement.prototype,
  'getBoundingClientRect',
);
const originalSetPointerCapture = Object.getOwnPropertyDescriptor(
  HTMLElement.prototype,
  'setPointerCapture',
);

function restoreProperty(
  target: object,
  property: string,
  descriptor: PropertyDescriptor | undefined,
) {
  if (descriptor) Object.defineProperty(target, property, descriptor);
  else Reflect.deleteProperty(target, property);
}

function renderModal({
  open = true,
  value = createDefaultFilters(),
  availableOptions = options,
  onApply = vi.fn(),
  onClose = vi.fn(),
}: {
  open?: boolean;
  value?: CatalogFilters;
  availableOptions?: FilterOptions;
  onApply?: (filters: CatalogFilters) => void;
  onClose?: () => void;
} = {}) {
  const result = render(
    <FilterModal
      open={open}
      options={availableOptions}
      value={value}
      onApply={onApply}
      onClose={onClose}
    />,
  );
  return { ...result, onApply, onClose };
}

beforeEach(async () => {
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
});

afterEach(async () => {
  restoreProperty(HTMLDialogElement.prototype, 'showModal', originalShowModal);
  restoreProperty(HTMLDialogElement.prototype, 'close', originalClose);
  restoreProperty(HTMLElement.prototype, 'scrollTo', originalScrollTo);
  restoreProperty(HTMLElement.prototype, 'clientWidth', originalClientWidth);
  restoreProperty(HTMLElement.prototype, 'getBoundingClientRect', originalBoundingRect);
  restoreProperty(HTMLElement.prototype, 'setPointerCapture', originalSetPointerCapture);
  vi.restoreAllMocks();
  await i18n.changeLanguage('ru');
});

describe('FilterModal', () => {
  it('filters options, expands tags, and clears a search', () => {
    Object.defineProperty(HTMLElement.prototype, 'clientWidth', {
      configurable: true,
      value: 100,
    });
    Object.defineProperty(HTMLElement.prototype, 'getBoundingClientRect', {
      configurable: true,
      value: () => new DOMRect(0, 0, 60, 10),
    });

    renderModal();
    const dialog = screen.getByRole('dialog', { name: 'Фильтры' });
    const categories = within(dialog).getByRole('group', { name: 'Категории' });

    expect(within(categories).queryByRole('button', { name: 'Action' })).not.toBeInTheDocument();
    expect(within(categories).queryByRole('button', { name: 'Adventure' })).not.toBeInTheDocument();
    fireEvent.click(within(dialog).getByRole('button', { name: 'Ещё' }));
    expect(within(categories).getByRole('button', { name: 'Adventure' })).toBeInTheDocument();
    fireEvent.click(within(dialog).getByRole('button', { name: 'Свернуть' }));
    expect(within(categories).queryByRole('button', { name: 'Adventure' })).not.toBeInTheDocument();

    const search = within(dialog).getByRole('searchbox', { name: 'Найти категорию' });
    fireEvent.change(search, { target: { value: 'missing' } });
    expect(within(dialog).getByRole('status')).toHaveTextContent('Ничего не найдено');
    fireEvent.click(within(dialog).getByRole('button', { name: 'Очистить поиск: Категории' }));
    fireEvent.click(within(dialog).getByRole('button', { name: 'Ещё' }));
    expect(
      within(dialog).getByRole('group', { name: 'Категории' }).querySelector('button'),
    ).toHaveTextContent('Action');
  });

  it('shows empty states and handles cancel, close, and backdrop dismissal', () => {
    const emptyOptions: FilterOptions = { categories: [], genres: [], platforms: [] };
    const onClose = vi.fn();
    renderModal({ availableOptions: emptyOptions, onClose });
    const dialog = screen.getByRole('dialog', { name: 'Фильтры' });

    expect(within(dialog).getAllByRole('status')).toHaveLength(3);
    expect(within(dialog).getAllByText('Нет доступных вариантов')).toHaveLength(3);

    fireEvent(dialog, new Event('cancel', { cancelable: true }));
    expect(onClose).toHaveBeenCalledTimes(1);
    fireEvent.click(within(dialog).getByRole('button', { name: 'Закрыть фильтры' }));
    expect(onClose).toHaveBeenCalledTimes(2);

    fireEvent.pointerDown(dialog);
    fireEvent.click(within(dialog).getByRole('heading', { name: 'Фильтры' }));
    expect(onClose).toHaveBeenCalledTimes(2);
    fireEvent.pointerDown(dialog);
    fireEvent.click(dialog);
    expect(onClose).toHaveBeenCalledTimes(3);
  });

  it('toggles selections, resets filters, and applies defaults', () => {
    const value: CatalogFilters = {
      categories: ['category-1'],
      genres: ['genre-1'],
      platforms: [],
      price: { min: 120, max: 640 },
    };
    const onApply = vi.fn();
    const onClose = vi.fn();
    renderModal({ value, onApply, onClose });
    const dialog = screen.getByRole('dialog', { name: 'Фильтры' });
    const categories = within(dialog).getByRole('group', { name: 'Категории' });

    expect(within(categories).getByRole('button', { name: 'Action' })).toHaveAttribute(
      'aria-pressed',
      'true',
    );
    fireEvent.click(within(categories).getByRole('button', { name: 'Action' }));
    fireEvent.click(within(categories).getByRole('button', { name: 'Adventure' }));
    fireEvent.click(within(dialog).getByRole('button', { name: 'Сбросить' }));
    expect(within(categories).getByRole('button', { name: 'Adventure' })).toHaveAttribute(
      'aria-pressed',
      'false',
    );
    fireEvent.click(within(dialog).getByRole('button', { name: 'Применить' }));

    expect(onApply).toHaveBeenCalledWith(createDefaultFilters());
    expect(onClose).toHaveBeenCalledOnce();
  });

  it('normalizes initial prices and reconciles crossed text inputs', () => {
    const value = createDefaultFilters();
    value.price = { min: 1200, max: -10 };
    const onApply = vi.fn();
    renderModal({ value, onApply });
    const dialog = screen.getByRole('dialog', { name: 'Фильтры' });
    const minimum = within(dialog).getByRole('spinbutton', { name: 'От' });
    const maximum = within(dialog).getByRole('spinbutton', { name: 'До' });

    expect(minimum).toHaveValue(0);
    expect(maximum).toHaveValue(1000);

    fireEvent.change(minimum, { target: { value: '900' } });
    fireEvent.blur(minimum);
    expect(minimum).toHaveValue(900);
    expect(maximum).toHaveValue(1000);

    fireEvent.change(maximum, { target: { value: '200' } });
    fireEvent.blur(maximum);
    expect(minimum).toHaveValue(900);
    expect(maximum).toHaveValue(900);

    fireEvent.click(within(dialog).getByRole('button', { name: 'Применить' }));
    expect(onApply).toHaveBeenCalledWith(
      expect.objectContaining({ price: { min: 900, max: 900 } }),
    );
  });

  it('applies valid price edits and ignores invalid bounds until commit', () => {
    const value = createDefaultFilters();
    value.price = { min: 100, max: 800 };
    const onApply = vi.fn();
    renderModal({ value, onApply });
    const dialog = screen.getByRole('dialog', { name: 'Фильтры' });
    const minimum = within(dialog).getByRole('spinbutton', { name: 'От' });
    const maximum = within(dialog).getByRole('spinbutton', { name: 'До' });

    fireEvent.change(minimum, { target: { value: '250.258' } });
    expect(minimum).toHaveValue(250.258);
    fireEvent.change(maximum, { target: { value: '1100' } });
    fireEvent.blur(maximum);
    expect(minimum).toHaveValue(250.26);
    expect(maximum).toHaveValue(1000);
    fireEvent.click(within(dialog).getByRole('button', { name: 'Применить' }));

    expect(onApply).toHaveBeenCalledWith(
      expect.objectContaining({ price: { min: 250.26, max: 1000 } }),
    );
  });

  it('updates the price range by pointer and native slider controls', () => {
    Object.defineProperty(HTMLElement.prototype, 'setPointerCapture', {
      configurable: true,
      value: vi.fn(),
    });
    const value = createDefaultFilters();
    value.price = { min: 100, max: 800 };
    const onApply = vi.fn();
    renderModal({ value, onApply });
    const dialog = screen.getByRole('dialog', { name: 'Фильтры' });
    const track = dialog.querySelector<HTMLElement>('[class*="rangeTrack"]');
    if (!track) throw new Error('Price range track was not rendered');
    vi.spyOn(track, 'getBoundingClientRect').mockReturnValue(new DOMRect(0, 0, 100, 10));

    fireEvent.pointerDown(track, { button: 2, isPrimary: true, pointerId: 1, clientX: 20 });
    fireEvent.pointerDown(track, { button: 0, isPrimary: false, pointerId: 1, clientX: 20 });
    fireEvent.pointerDown(track, { button: 0, isPrimary: true, pointerId: 1, clientX: 20 });
    fireEvent.pointerMove(track, { pointerId: 2, clientX: 40 });
    fireEvent.pointerMove(track, { pointerId: 1, clientX: 40 });
    fireEvent.pointerUp(track, { pointerId: 2 });
    fireEvent.pointerCancel(track, { pointerId: 1 });
    fireEvent.pointerMove(track, { pointerId: 1, clientX: 80 });

    expect(within(dialog).getByRole('spinbutton', { name: 'От' })).toHaveValue(400);
    fireEvent.change(within(dialog).getByRole('slider', { name: 'Максимальная цена, USD' }), {
      target: { value: '700' },
    });
    fireEvent.click(within(dialog).getByRole('button', { name: 'Применить' }));

    expect(onApply).toHaveBeenCalledWith(
      expect.objectContaining({ price: { min: 400, max: 700 } }),
    );
  });

  it('locks page scrolling while open and restores it when closed', () => {
    document.body.style.overflow = 'auto';
    document.body.style.paddingRight = '8px';
    const value = createDefaultFilters();
    const { rerender } = renderModal({ value });

    expect(document.body.style.overflow).toBe('hidden');
    expect(document.body.style.paddingRight).not.toBe('8px');

    rerender(
      <FilterModal
        open={false}
        options={options}
        value={value}
        onApply={vi.fn()}
        onClose={vi.fn()}
      />,
    );

    expect(document.body.style.overflow).toBe('auto');
    expect(document.body.style.paddingRight).toBe('8px');
  });
});
