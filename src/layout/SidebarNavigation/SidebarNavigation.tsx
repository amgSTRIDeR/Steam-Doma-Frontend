import { useTranslation } from 'react-i18next';
import SidebarLink from '../../components/SidebarLink/SidebarLink';

type SidebarLinks = 'home' | 'catalog' | 'cart' | 'about';

export default function SidebarNavigation() {
  const links: SidebarLinks[] = ['home', 'catalog', 'cart', 'about'];
  const { t } = useTranslation();
  return (
    <nav className="sidebar__nav" aria-label="Sidebar Navigatin">
      <h2 className="sidebar__title">{t('sidebar.title')}</h2>
      <ul className="sidebar__list">
        {links.map((link) => (
          <SidebarLink
            text={t(`navigation.${link}`)}
            name={`icon-${link}`}
            path={link === 'about' ? '/' : link}
            key={link}
          />
        ))}
      </ul>
    </nav>
  );
}
