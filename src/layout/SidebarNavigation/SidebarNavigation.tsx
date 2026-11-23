import { useTranslation } from 'react-i18next';
import NavigationLink from '../../components/NavigationLink/NavigationLink';

type SidebarLinks = 'home' | 'catalog' | 'cart' | 'about';

export default function SidebarNavigation() {
  const { t } = useTranslation();
  const links: SidebarLinks[] = ['home', 'catalog', 'cart', 'about'];
  const paths: Record<SidebarLinks, string> = {
    about: '/',
    home: '/home',
    catalog: '/catalog',
    cart: '/cart',
  };

  return (
    <nav className="sidebar__nav" aria-label="Sidebar Navigatin">
      <h2 className="sidebar__title">{t('sidebar.title')}</h2>
      <ul className="sidebar__list">
        {links.map((link) => (
          <NavigationLink
            text={t(`navigation.${link}`)}
            name={`icon-${link}`}
            path={paths[link]}
            key={link}
          />
        ))}
      </ul>
    </nav>
  );
}
