import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Logo from '../../components/Logo/Logo';
import Search from '../../components/Search/Search';
import Icon from '../../components/Icon/Icon';
import BurgerButton from '../../components/BurgerBtn/BurgerBtn';
import NavMenu from './NavMenu';

export default function Navigation() {
  const { t } = useTranslation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    document.body.classList.toggle('body_locked', isMenuOpen);

    return () => {
      document.body.classList.remove('body_locked');
    };
  }, [isMenuOpen]);

  return (
    <nav aria-label="Main navigation" className="nav">
      <BurgerButton isOpen={isMenuOpen} onClick={() => setIsMenuOpen((prev) => !prev)} />
      <Logo />
      <NavMenu isMenuOpen={isMenuOpen} />
      <Search
        labelText="Введите название игры"
        placeholder="Поиск по играм..."
        name="game-search"
        onChangeHandler={() => console.log('game search')}
      />
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
