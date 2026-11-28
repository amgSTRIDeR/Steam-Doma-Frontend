export interface FilterOption {
  id: string;
  label: string;
}

export type FilterGroup = 'categories' | 'genres' | 'platforms';
export type FilterOptions = Record<FilterGroup, readonly FilterOption[]>;

export interface PriceRange {
  min: number;
  max: number;
}

export interface CatalogFilters {
  categories: string[];
  genres: string[];
  platforms: string[];
  price: PriceRange;
}

export const MIN_PRICE = 0;
export const MAX_PRICE = 1000;

export function createDefaultFilters(): CatalogFilters {
  return {
    categories: [],
    genres: [],
    platforms: [],
    price: { min: MIN_PRICE, max: MAX_PRICE },
  };
}
