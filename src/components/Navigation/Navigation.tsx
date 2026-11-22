import { NavLink } from 'react-router-dom';
import Logo from '../Logo/Logo';
import Search from '../Search/Search';
import ThemeSwitcher from '../ThemeSwitcher/ThemeSwitcher';
import LanguageSwitcher from '../LanguageSwitcher/LanguageSwitcher';
import { useTranslation } from 'react-i18next';

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
    </nav>
  );
}
