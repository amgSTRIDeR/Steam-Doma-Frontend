export interface ListItemData {
  id: string;
  title: string;
  text?: string;
}

export const GOALS_DATA: ListItemData[] = [
  {
    id: 'catalog',
    title: 'Каталог игр',
    text: 'Удобный просмотр игр с подборками, категориями и подробными страницами.',
  },
  {
    id: 'search',
    title: 'Удобный поиск',
    text: 'Быстрый поиск по названию, фильтры и сортировка для комфортного выбора.',
  },
  {
    id: 'ui',
    title: 'Современный интерфейс',
    text: 'Единый стиль, адаптивные экраны и удобный пользовательский опыт.',
  },
];

export const TEAM_DATA: ListItemData[] = [
  {
    id: 'aleksei',
    title: 'Aleksei Ovchinnikov',
    text: 'Настройка frontend-инфраструктуры, архитектура проекта, интеграция интерфейса.',
  },
  {
    id: 'nataliya',
    title: 'Nataliya Krylova',
    text: 'UI/UX, дизайн-система, проработка экранов и пользовательского опыта.',
  },
];

export const TECH_STACK_DATA: ListItemData[] = [
  { id: 'react', title: 'React' },
  { id: 'ts', title: 'TypeScript' },
  { id: 'vite', title: 'Vite' },
  { id: 'mui', title: 'Material UI' },
  { id: 'scss', title: 'SCSS' },
  { id: 'graphql', title: 'GraphQL' },
  { id: 'python', title: 'Python' },
  { id: 'postgres', title: 'PostgreSQL' },
];
