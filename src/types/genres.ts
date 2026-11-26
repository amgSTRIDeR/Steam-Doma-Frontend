export interface Genre {
  name: string;
  subgenres?: string[];
}

export const genres: Genre[] = [
  {
    name: 'action',
    subgenres: ['shooters', 'fighting', 'beat-em-up'],
  },
  {
    name: 'RPG',
    subgenres: ['jrpg', 'action-rpg', 'crpg'],
  },
  {
    name: 'adventures',
  },
  {
    name: 'strategy',
    subgenres: ['rts', 'turnBased'],
  },
  {
    name: 'indie',
  },
  {
    name: 'simulation',
  },
];
