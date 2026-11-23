import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Logo from '../Logo/Logo';
import Search from '../Search/Search';
import ThemeSwitcher from '../ThemeSwitcher/ThemeSwitcher';
import LanguageSwitcher from '../LanguageSwitcher/LanguageSwitcher';
import Icon from '../Icon/Icon';

export default function Navigation() {
  const { t } = useTranslation();

  return (
    <nav aria-label="Main navigation" className="nav">
      <Logo />
      <ul className="nav__list">
        <li className="nav__item">
          <NavLink to="/" className="nav__link">
            {t('navigation.about')}
          </NavLink>
        </li>
        <li className="nav__item">
          <NavLink to="/home" className="nav__link">
            {t('navigation.shop')}
          </NavLink>
        </li>
        <li className="nav__item">
          <NavLink to="/catalog" className="nav__link">
            {t('navigation.catalog')}
          </NavLink>
        </li>
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
        <Icon className="nav__cart-icon" name="icon-shopping-cart" />
        <span className="nav__cart-count">2</span>
      </NavLink>
      <NavLink to="/profile" className="nav__user" aria-label={t('navigation.user')}>
        <Icon className="nav__user-icon" name="icon-user" />
      </NavLink>
    </nav>
  );
}
