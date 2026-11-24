export interface Genre {
  name: string;
  subgenres?: string[];
}

export const genres: Genre[] = [
  {
    name: 'action',
    subgenres: ['Шутеры', 'Файтинг', 'Beat-em-up'],
  },
  {
    name: 'RPG',
    subgenres: ['JRPG', 'Action RPG', 'CRPG'],
  },
  {
    name: 'adventures',
  },
  {
    name: 'strategy',
    subgenres: ['RTS', 'Пошаговые'],
  },
  {
    name: 'indie',
  },
  {
    name: 'simulation',
  },
];
