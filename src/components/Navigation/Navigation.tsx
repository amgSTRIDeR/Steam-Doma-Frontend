import { NavLink } from 'react-router-dom';
import Logo from '../Logo/Logo';
import Search from '../Search/Search';
import ThemeSwitcher from '../ThemeSwitcher/ThemeSwitcher';

export default function Navigation() {
  return (
    <nav aria-label="Main navigation" className="nav">
      <Logo />
      <ul className="nav__list">
        <li className="nav__item">
          <NavLink to="/" className="nav__link">
            О нас
          </NavLink>
        </li>
        <li className="nav__item">
          <NavLink to="/home" className="nav__link">
            Магазин
          </NavLink>
        </li>
        <li className="nav__item">
          <NavLink to="/catalog" className="nav__link">
            Каталог
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
    </nav>
  );
}
