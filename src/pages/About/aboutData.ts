export interface ListItemData {
  id: string;
  title: string;
  text?: string;
}

export const GOALS_DATA: ListItemData[] = [
  {
    id: 'catalog',
    title: 'about.goalHeading1',
    text: 'about.goalDescription1',
  },
  {
    id: 'search',
    title: 'about.goalHeading2',
    text: 'about.goalDescription1',
  },
  {
    id: 'ui',
    title: 'about.goalHeading3',
    text: 'about.goalDescription1',
  },
];

export const TEAM_DATA: ListItemData[] = [
  {
    id: 'aleksei',
    title: 'about.teamHeading1',
    text: 'about.teamDescription1',
  },
  {
    id: 'nataliya',
    title: 'about.teamHeading2',
    text: 'about.teamDescription2',
  },
];

export const TECH_STACK_DATA: ListItemData[] = [
  { id: 'react', title: 'about.techTitle1' },
  { id: 'ts', title: 'about.techTitle2' },
  { id: 'vite', title: 'about.techTitle3' },
  { id: 'mui', title: 'about.techTitle4' },
  { id: 'scss', title: 'about.techTitle5' },
  { id: 'graphql', title: 'about.techTitle6' },
  { id: 'python', title: 'about.techTitle7' },
  { id: 'postgres', title: 'about.techTitle8' },
];
