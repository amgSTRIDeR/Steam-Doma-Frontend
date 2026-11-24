import { useTranslation } from 'react-i18next';
import NavigationLink from '../../components/NavigationLink/NavigationLink';

type SidebarAccountLinks = 'user' | 'settings';

export default function SidebarAccount() {
  const { t } = useTranslation();
  const links: SidebarAccountLinks[] = ['user', 'settings'];
  const paths: Record<SidebarAccountLinks, string> = {
    user: '/profile',
    settings: '/settings',
  };

  return (
    <div className="sidebar__item">
      <h2 className="sidebar__title">{t('sidebar.accountTitle')}</h2>
      <ul className="sidebar__list">
        {links.map((link) => (
          <NavigationLink
            text={t(`sidebar.${link}`)}
            name={`icon-${link}`}
            path={paths[link]}
            key={link}
          />
        ))}
      </ul>
    </div>
  );
}
