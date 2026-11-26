import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import Logo from '../../components/Logo/Logo';
import Search from '../../components/Search/Search';
import ThemeSwitcher from '../../components/ThemeSwitcher/ThemeSwitcher';
import LanguageSwitcher from '../../components/LanguageSwitcher/LanguageSwitcher';
import Icon from '../../components/Icon/Icon';
import NavigationLink from '../../components/NavigationLink/NavigationLink';
import BurgerButton from '../../components/BurgerBtn/BurgerBtn';

type HeaderLinks = 'home' | 'catalog' | 'about';

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const { t } = useTranslation();
  const links: HeaderLinks[] = ['about', 'home', 'catalog'];
  const paths: Record<HeaderLinks, string> = {
    about: '/',
    home: '/home',
    catalog: '/catalog',
  };

  return (
    <nav aria-label="Main navigation" className="nav">
      <BurgerButton isOpen={isMenuOpen} onClick={() => setIsMenuOpen((prev) => !prev)} />
      <Logo />
      <ul className="nav__list">
        {links.map((link) => (
          <NavigationLink text={t(`navigation.${link}`)} path={paths[link]} key={link} />
        ))}
      </ul>
      <Search
        labelText="Введите название игры"
        placeholder="Поиск по играм..."
        name="game-search"
        onChangeHandler={() => console.log('game search')}
      />
      <ThemeSwitcher />
      <LanguageSwitcher />
      <NavLink to="/cart" className="nav__cart" aria-label={t('navigation.cart')}>
        <Icon className="nav__cart-icon" name="icon-cart" />
        <span className="nav__cart-count">2</span>
      </NavLink>
      <NavLink to="/profile" className="nav__user" aria-label={t('navigation.user')}>
        <Icon className="nav__user-icon" name="icon-user" />
      </NavLink>
    </nav>
  );
}
