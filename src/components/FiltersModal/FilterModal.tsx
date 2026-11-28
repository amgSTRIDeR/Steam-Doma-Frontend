import { useEffect, useId, useLayoutEffect, useMemo, useRef, useState } from 'react';
import type { CSSProperties, FormEvent, PointerEvent } from 'react';
import { useTranslation } from 'react-i18next';
import styles from './_filter-modal.module.scss';
import { createDefaultFilters, MAX_PRICE, MIN_PRICE } from './filterTypes';
import type {
  CatalogFilters,
  FilterGroup,
  FilterOption,
  FilterOptions,
  PriceRange,
} from './filterTypes';

interface FilterModalProps {
  open: boolean;
  options: FilterOptions;
  value: CatalogFilters;
  onApply: (filters: CatalogFilters) => void;
  onClose: () => void;
}

const PRICE_STEP = 0.01;
const GROUPS = [
  {
    key: 'categories',
    titleKey: 'filtersModal.categories',
    searchKey: 'filtersModal.searchCategory',
  },
  { key: 'genres', titleKey: 'filtersModal.genres', searchKey: 'filtersModal.searchGenre' },
  {
    key: 'platforms',
    titleKey: 'filtersModal.platforms',
    searchKey: 'filtersModal.searchPlatform',
  },
] as const;

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function roundPrice(value: number) {
  return Math.round(value * 100) / 100;
}

function parsePrice(text: string, fallback: number) {
  if (!text.trim()) return fallback;
  const value = Number(text);
  return Number.isFinite(value) ? roundPrice(clamp(value, MIN_PRICE, MAX_PRICE)) : fallback;
}

function normalizePrice(price: PriceRange): PriceRange {
  const min = parsePrice(String(price.min), MIN_PRICE);
  const max = parsePrice(String(price.max), MAX_PRICE);
  return { min: Math.min(min, max), max: Math.max(min, max) };
}

function copyFilters(value: CatalogFilters): CatalogFilters {
  return {
    categories: [...value.categories],
    genres: [...value.genres],
    platforms: [...value.platforms],
    price: normalizePrice(value.price),
  };
}

const toPriceText = (price: PriceRange) => ({
  min: price.min.toFixed(2),
  max: price.max.toFixed(2),
});

function SearchIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="11" cy="11" r="6.5" stroke="currentColor" strokeWidth="1.7" />
      <path d="m16 16 4 4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="m6 6 12 12M18 6 6 18"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

interface FilterSectionProps {
  title: string;
  searchLabel: string;
  options: readonly FilterOption[];
  selected: readonly string[];
  query: string;
  onQueryChange: (query: string) => void;
  onToggle: (id: string) => void;
}

function FilterSection({
  title,
  searchLabel,
  options,
  selected,
  query,
  onQueryChange,
  onToggle,
}: FilterSectionProps) {
  const { t } = useTranslation();
  const titleId = useId();
  const [expanded, setExpanded] = useState(false);
  const [collapsedCount, setCollapsedCount] = useState(0);
  const optionsViewportRef = useRef<HTMLDivElement>(null);
  const measureRef = useRef<HTMLDivElement>(null);
  const normalizedQuery = query.trim().toLocaleLowerCase();
  const visibleOptions = useMemo(
    () => options.filter(({ label }) => label.toLocaleLowerCase().includes(normalizedQuery)),
    [options, normalizedQuery],
  );
  const displayedOptions = expanded ? visibleOptions : visibleOptions.slice(0, collapsedCount);

  useLayoutEffect(() => {
    if (expanded || !visibleOptions.length) return;
    const viewport = optionsViewportRef.current;
    const measure = measureRef.current;
    if (!viewport || !measure) return;

    function updateVisibleCount(viewportElement: HTMLDivElement, measureElement: HTMLDivElement) {
      const availableWidth = viewportElement.clientWidth;
      const widths = Array.from(measureElement.children)
        .slice(0, visibleOptions.length)
        .map((item) => item.getBoundingClientRect().width);

      if (!availableWidth || typeof ResizeObserver === 'undefined') {
        setCollapsedCount(visibleOptions.length);
        return;
      }

      const itemGap = Number.parseFloat(window.getComputedStyle(measureElement).columnGap) || 0;
      const totalItemsWidth =
        widths.reduce((total, width) => total + width, 0) +
        itemGap * Math.max(0, widths.length - 1);
      let nextCount = widths.length;

      if (totalItemsWidth > availableWidth) {
        const moreWidth = measureElement.lastElementChild?.getBoundingClientRect().width ?? 0;
        const viewportGap =
          Number.parseFloat(window.getComputedStyle(viewportElement).columnGap) || 0;
        const itemsAvailableWidth = availableWidth - moreWidth - viewportGap;
        let usedWidth = 0;
        nextCount = 0;

        for (const width of widths) {
          const nextWidth = usedWidth + (nextCount ? itemGap : 0) + width;
          if (nextWidth > itemsAvailableWidth) break;
          usedWidth = nextWidth;
          nextCount += 1;
        }
      }

      setCollapsedCount((previous) => (previous === nextCount ? previous : nextCount));
    }

    updateVisibleCount(viewport, measure);
    const observer = new ResizeObserver(() => updateVisibleCount(viewport, measure));
    observer.observe(viewport);
    observer.observe(measure);
    return () => observer.disconnect();
  }, [expanded, t, visibleOptions]);

  return (
    <section className={styles.section} aria-labelledby={titleId}>
      <div className={styles.sectionHeading}>
        <h3 id={titleId}>{title}</h3>
        {selected.length > 0 && (
          <span className={styles.count}>
            {t('filtersModal.selected', { count: selected.length })}
          </span>
        )}
      </div>
      <div className={styles.search}>
        <SearchIcon />
        <input
          type="search"
          aria-label={searchLabel}
          placeholder={searchLabel}
          value={query}
          onChange={(event) => onQueryChange(event.target.value)}
          autoComplete="off"
        />
        {query && (
          <button
            className={styles.clearSearch}
            type="button"
            aria-label={t('filtersModal.clearSearch', { title })}
            onClick={() => onQueryChange('')}
          >
            <CloseIcon />
          </button>
        )}
      </div>
      <div
        className={`${styles.optionsViewport} ${expanded ? styles.optionsExpanded : ''}`}
        ref={optionsViewportRef}
      >
        {visibleOptions.length ? (
          <div className={styles.options} role="group" aria-labelledby={titleId}>
            {displayedOptions.map(({ id, label }) => (
              <button
                key={id}
                type="button"
                className={styles.chip}
                aria-pressed={selected.includes(id)}
                onClick={() => onToggle(id)}
              >
                {label}
              </button>
            ))}
          </div>
        ) : (
          <p className={styles.empty} role="status">
            {query.trim() ? t('filtersModal.noResults') : t('filtersModal.noOptions')}
          </p>
        )}
        {visibleOptions.length > 0 && (expanded || collapsedCount < visibleOptions.length) && (
          <button
            type="button"
            className={styles.expand}
            aria-expanded={expanded}
            onClick={() => setExpanded((previous) => !previous)}
          >
            {expanded ? t('filtersModal.showLess') : t('filtersModal.showMore')}
          </button>
        )}
        {!!visibleOptions.length && !expanded && (
          <div className={styles.measure} ref={measureRef} aria-hidden="true">
            {visibleOptions.map(({ id, label }) => (
              <span key={id} className={styles.chip}>
                {label}
              </span>
            ))}
            <span className={styles.expand}>{t('filtersModal.showMore')}</span>
          </div>
        )}
      </div>
    </section>
  );
}

interface PriceFilterProps {
  price: PriceRange;
  text: Record<keyof PriceRange, string>;
  onTextChange: (bound: keyof PriceRange, text: string) => void;
  onCommit: () => void;
  onRangeChange: (bound: keyof PriceRange, value: number) => void;
}

function PriceFilter({ price, text, onTextChange, onCommit, onRangeChange }: PriceFilterProps) {
  const { t } = useTranslation();
  const titleId = useId();
  const activePointer = useRef<{ id: number; bound: keyof PriceRange } | null>(null);
  const minPercent = ((price.min - MIN_PRICE) / (MAX_PRICE - MIN_PRICE)) * 100;
  const maxPercent = ((price.max - MIN_PRICE) / (MAX_PRICE - MIN_PRICE)) * 100;
  const rangeStyle = {
    '--range-min': `${minPercent}%`,
    '--range-max': `${maxPercent}%`,
  } as CSSProperties;

  function getTrackValue(event: PointerEvent<HTMLDivElement>) {
    const { left, width } = event.currentTarget.getBoundingClientRect();
    if (!width) return null;
    const ratio = clamp((event.clientX - left) / width, 0, 1);
    return roundPrice(MIN_PRICE + ratio * (MAX_PRICE - MIN_PRICE));
  }

  function handleTrackPointerDown(event: PointerEvent<HTMLDivElement>) {
    if (event.button !== 0 || event.isPrimary === false) return;
    const next = getTrackValue(event);
    if (next === null) return;
    const bound =
      price.min === price.max
        ? next < price.min
          ? 'min'
          : 'max'
        : Math.abs(next - price.min) <= Math.abs(next - price.max)
          ? 'min'
          : 'max';
    activePointer.current = { id: event.pointerId, bound };
    event.currentTarget.setPointerCapture(event.pointerId);
    onRangeChange(bound, next);
  }

  function handleTrackPointerMove(event: PointerEvent<HTMLDivElement>) {
    const active = activePointer.current;
    if (active?.id !== event.pointerId) return;
    const next = getTrackValue(event);
    if (next !== null) onRangeChange(active.bound, next);
  }

  function handleTrackPointerEnd(event: PointerEvent<HTMLDivElement>) {
    if (activePointer.current?.id === event.pointerId) activePointer.current = null;
  }

  return (
    <section className={styles.section} aria-labelledby={titleId}>
      <div className={styles.sectionHeading}>
        <h3 id={titleId}>{t('filtersModal.price')}</h3>
      </div>
      <div className={styles.range} style={rangeStyle}>
        <div
          className={styles.rangeTrack}
          aria-hidden="true"
          onPointerDown={handleTrackPointerDown}
          onPointerMove={handleTrackPointerMove}
          onPointerUp={handleTrackPointerEnd}
          onPointerCancel={handleTrackPointerEnd}
          onLostPointerCapture={handleTrackPointerEnd}
        />
        <input
          className={`${styles.rangeInput} ${styles.rangeMin} ${price.min === price.max && price.max === MAX_PRICE ? styles.rangeOnTop : ''}`}
          type="range"
          min={MIN_PRICE}
          max={MAX_PRICE}
          step={PRICE_STEP}
          value={price.min}
          aria-label={t('filtersModal.minimumPrice')}
          aria-valuetext={t('filtersModal.priceValue', { value: price.min.toFixed(2) })}
          onChange={(event) => onRangeChange('min', Number(event.target.value))}
        />
        <input
          className={`${styles.rangeInput} ${styles.rangeMax}`}
          type="range"
          min={MIN_PRICE}
          max={MAX_PRICE}
          step={PRICE_STEP}
          value={price.max}
          aria-label={t('filtersModal.maximumPrice')}
          aria-valuetext={t('filtersModal.priceValue', { value: price.max.toFixed(2) })}
          onChange={(event) => onRangeChange('max', Number(event.target.value))}
        />
      </div>
      <div className={styles.rangeLabels} aria-hidden="true">
        <span>$0</span>
        <span>$1000</span>
      </div>
      <div className={styles.priceInputs}>
        {(['min', 'max'] as const).map((bound) => (
          <label key={bound} className={styles.priceField}>
            <span>{bound === 'min' ? t('filtersModal.from') : t('filtersModal.to')}</span>
            <span className={styles.priceInputWrap}>
              <span aria-hidden="true">$</span>
              <input
                type="number"
                inputMode="decimal"
                min={MIN_PRICE}
                max={MAX_PRICE}
                step={PRICE_STEP}
                value={text[bound]}
                onChange={(event) => onTextChange(bound, event.target.value)}
                onBlur={onCommit}
              />
            </span>
          </label>
        ))}
      </div>
    </section>
  );
}

const emptyQueries = (): Record<FilterGroup, string> => ({
  categories: '',
  genres: '',
  platforms: '',
});

export function FilterModal({ open, options, value, onApply, onClose }: FilterModalProps) {
  const { t } = useTranslation();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const backdropDown = useRef(false);
  const lastEdited = useRef<keyof PriceRange>('min');
  const titleId = useId();
  const [draft, setDraft] = useState(() => copyFilters(value));
  const [queries, setQueries] = useState(emptyQueries);
  const [priceText, setPriceText] = useState(() => toPriceText(normalizePrice(value.price)));

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open && !dialog.open) {
      const initial = copyFilters(value);
      setDraft(initial);
      setPriceText(toPriceText(initial.price));
      setQueries(emptyQueries());
      lastEdited.current = 'min';
      backdropDown.current = false;
      dialog.showModal();
      contentRef.current?.scrollTo({ top: 0 });
    } else if (!open && dialog.open) {
      dialog.close();
    }
  }, [open, value]);

  useEffect(() => {
    if (!open) return;
    const body = document.body;
    const previousOverflow = body.style.overflow;
    const previousPaddingRight = body.style.paddingRight;
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    const currentPaddingRight = Number.parseFloat(window.getComputedStyle(body).paddingRight) || 0;

    body.style.overflow = 'hidden';
    if (scrollbarWidth > 0) {
      body.style.paddingRight = `${currentPaddingRight + scrollbarWidth}px`;
    }

    return () => {
      body.style.overflow = previousOverflow;
      body.style.paddingRight = previousPaddingRight;
    };
  }, [open]);

  function toggle(group: FilterGroup, id: string) {
    setDraft((previous) => ({
      ...previous,
      [group]: previous[group].includes(id)
        ? previous[group].filter((item) => item !== id)
        : [...previous[group], id],
    }));
  }

  function resolvePrice(): PriceRange {
    let min = parsePrice(priceText.min, draft.price.min);
    let max = parsePrice(priceText.max, draft.price.max);
    if (min > max) {
      if (lastEdited.current === 'min') min = max;
      else max = min;
    }
    return { min, max };
  }

  function setPrice(price: PriceRange) {
    setDraft((previous) => ({ ...previous, price }));
    setPriceText(toPriceText(price));
  }

  function changePriceText(bound: keyof PriceRange, text: string) {
    lastEdited.current = bound;
    setPriceText((previous) => ({ ...previous, [bound]: text }));
    const next = Number(text);
    if (!text.trim() || !Number.isFinite(next) || next < MIN_PRICE || next > MAX_PRICE) return;
    if ((bound === 'min' && next > draft.price.max) || (bound === 'max' && next < draft.price.min))
      return;
    setDraft((previous) => ({
      ...previous,
      price: { ...previous.price, [bound]: roundPrice(next) },
    }));
  }

  function changeRange(bound: keyof PriceRange, value: number) {
    const price = resolvePrice();
    const next = roundPrice(clamp(value, MIN_PRICE, MAX_PRICE));
    setPrice(
      bound === 'min'
        ? { ...price, min: Math.min(next, price.max) }
        : { ...price, max: Math.max(next, price.min) },
    );
  }

  function reset() {
    const initial = createDefaultFilters();
    setDraft(initial);
    setPriceText(toPriceText(initial.price));
    setQueries(emptyQueries());
    lastEdited.current = 'min';
  }

  function apply(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    onApply(copyFilters({ ...draft, price: resolvePrice() }));
    onClose();
  }

  return (
    <dialog
      ref={dialogRef}
      className={styles.dialog}
      aria-labelledby={titleId}
      onCancel={(event) => {
        event.preventDefault();
        onClose();
      }}
      onPointerDown={(event) => {
        backdropDown.current = event.target === event.currentTarget;
      }}
      onClick={(event) => {
        if (backdropDown.current && event.target === event.currentTarget) onClose();
        backdropDown.current = false;
      }}
    >
      <form className={styles.form} onSubmit={apply} noValidate>
        <header className={styles.header}>
          <h2 id={titleId}>{t('filtersModal.title')}</h2>
          <button
            type="button"
            className={styles.close}
            aria-label={t('filtersModal.close')}
            onClick={onClose}
          >
            <CloseIcon />
          </button>
        </header>
        <div className={styles.content} ref={contentRef}>
          {GROUPS.map(({ key, titleKey, searchKey }) => (
            <FilterSection
              key={key}
              title={t(titleKey)}
              searchLabel={t(searchKey)}
              options={options[key]}
              selected={draft[key]}
              query={queries[key]}
              onQueryChange={(query) => setQueries((previous) => ({ ...previous, [key]: query }))}
              onToggle={(id) => toggle(key, id)}
            />
          ))}
          <PriceFilter
            price={draft.price}
            text={priceText}
            onTextChange={changePriceText}
            onCommit={() => setPrice(resolvePrice())}
            onRangeChange={changeRange}
          />
        </div>
        <footer className={styles.footer}>
          <button className={styles.reset} type="button" onClick={reset}>
            {t('filtersModal.reset')}
          </button>
          <button className={styles.apply} type="submit">
            {t('filtersModal.apply')}
          </button>
        </footer>
      </form>
    </dialog>
  );
}
