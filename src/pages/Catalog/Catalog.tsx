import { gql, type TypedDocumentNode } from '@apollo/client';
import { useQuery } from '@apollo/client/react';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { FilterModal } from '../../components/FiltersModal/FilterModal';
import { createDefaultFilters } from '../../components/FiltersModal/filterTypes';
import type { CatalogFilters, FilterOptions } from '../../components/FiltersModal/filterTypes';
import './_catalog.scss';

interface FilterItem {
  id: string;
  name: string;
}

interface CatalogFiltersData {
  catalogFilters: {
    genres: FilterItem[];
    categories: FilterItem[];
    platforms: FilterItem[];
  };
}

const CATALOG_FILTERS_QUERY: TypedDocumentNode<CatalogFiltersData> = gql`
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

function FilterIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M4 7h6m4 0h6M4 17h2m4 0h10"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <circle cx="12" cy="7" r="2" fill="currentColor" />
      <circle cx="8" cy="17" r="2" fill="currentColor" />
    </svg>
  );
}

export default function Catalog() {
  const { t } = useTranslation();
  const { data, loading, error } = useQuery(CATALOG_FILTERS_QUERY);
  const [modalOpen, setModalOpen] = useState(false);
  const [filters, setFilters] = useState<CatalogFilters>(createDefaultFilters);

  const options: FilterOptions | undefined = data
    ? {
        genres: data.catalogFilters.genres.map(({ id, name }) => ({ id, label: name })),
        categories: data.catalogFilters.categories.map(({ id, name }) => ({ id, label: name })),
        platforms: data.catalogFilters.platforms.map(({ id, name }) => ({ id, label: name })),
      }
    : undefined;

  return (
    <section className="catalog" aria-labelledby="catalog-title">
      <header className="catalog__header">
        <p className="catalog__eyebrow">{t('catalog.eyebrow')}</p>
        <h1 className="catalog__title" id="catalog-title">
          {t('catalog.title')}
        </h1>
        <p className="catalog__description">{t('catalog.description')}</p>
      </header>
      <div className="catalog__toolbar">
        <button
          className={[
            'catalog__filter-button',
            loading && 'catalog__filter-button--loading',
            error && 'catalog__filter-button--error',
          ]
            .filter(Boolean)
            .join(' ')}
          type="button"
          aria-label={loading ? t('catalog.loadingFilters') : t('catalog.filterButton')}
          aria-busy={loading}
          disabled={loading || !options}
          onClick={() => setModalOpen(true)}
        >
          <FilterIcon />
          <span>{t('catalog.filterButton')}</span>
        </button>
      </div>
      {options && (
        <FilterModal
          open={modalOpen}
          options={options}
          value={filters}
          onApply={setFilters}
          onClose={() => setModalOpen(false)}
        />
      )}
    </section>
  );
}
