import { useTranslation } from 'react-i18next';
import NavigationLink from '../../components/NavigationLink/NavigationLink';
import ThemeSwitcher from '../../components/ThemeSwitcher/ThemeSwitcher';
import LanguageSwitcher from '../../components/LanguageSwitcher/LanguageSwitcher';

type HeaderLinks = 'home' | 'catalog' | 'about';

interface NamMenuProps {
  isMenuOpen: boolean;
}

export default function NavMenu({ isMenuOpen }: NamMenuProps) {
  const { t } = useTranslation();
  const links: HeaderLinks[] = ['about', 'home', 'catalog'];
  const paths: Record<HeaderLinks, string> = {
    about: '/',
    home: '/home',
    catalog: '/catalog',
  };
  return (
    <div className={`nav__menu ${isMenuOpen ? 'nav__menu_open' : ''}`}>
      <ul className="nav__list">
        {links.map((link) => (
          <NavigationLink text={t(`navigation.${link}`)} path={paths[link]} key={link} />
        ))}
      </ul>
      <ThemeSwitcher />
      <LanguageSwitcher />
    </div>
  );
}
