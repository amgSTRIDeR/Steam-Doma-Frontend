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

export type FooterSectionId = 'edu' | 'globe' | 'shield-check' | 'database' | 'info' | 'mail';

export interface FooterLink {
  labelKey: string;
  url: string;
  isExternal?: boolean;
}

export interface FooterSection {
  id: FooterSectionId;
  hasDescription?: boolean;
  links: FooterLink[];
}

export const FOOTER_SECTIONS: FooterSection[] = [
  {
    id: 'edu',
    hasDescription: true,
    links: [
      {
        labelKey: 'RS School',
        url: 'https://rs.school',
        isExternal: true,
      },
    ],
  },
  {
    id: 'globe',
    links: [
      {
        labelKey: 'footer.globeFrontend',
        url: 'https://github.com...',
        isExternal: true,
      },
      {
        labelKey: 'footer.globeBackend',
        url: 'https://github.com...',
        isExternal: true,
      },
    ],
  },
  {
    id: 'shield-check',
    hasDescription: true,
    links: [
      {
        labelKey: 'footer.shieldCheckLink',
        url: '/privacy-policy',
        isExternal: false,
      },
    ],
  },
  {
    id: 'database',
    hasDescription: true,
    links: [
      {
        labelKey: 'Steam Dataset 2025',
        url: 'https://...',
        isExternal: true,
      },
      {
        labelKey: 'Creative Commons Attribution 4.0 International (CC BY 4.0)',
        url: 'https://creativecommons.org',
        isExternal: true,
      },
    ],
  },
  {
    id: 'info',
    hasDescription: true,
    links: [],
  },
  {
    id: 'mail',
    links: [
      {
        labelKey: 'alex.ovchinnikov.dev@gmail.com',
        url: 'mailto:alex.ovchinnikov.dev@gmail.com',
        isExternal: true,
      },
    ],
  },
];
